import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import {
  azureAdConfig,
  azureB2CConfig,
  azureAdLoginRequest,
  azureB2CLoginRequest,
  AuthProvider,
  UserType,
  AuthUser,
  graphConfig,
} from '../config/authConfig';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authProvider: AuthProvider | null;
  login: (provider: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  switchProvider: (provider: AuthProvider) => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create MSAL instances
const msalInstanceAzureAD = new PublicClientApplication(azureAdConfig);
const msalInstanceB2C = new PublicClientApplication(azureB2CConfig);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authProvider, setAuthProvider] = useState<AuthProvider | null>(null);
  const [currentMsalInstance, setCurrentMsalInstance] = useState<PublicClientApplication>(msalInstanceAzureAD);
  const [error, setError] = useState<string | null>(null);

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check for existing authentication in both providers
      const azureAdAccounts = msalInstanceAzureAD.getAllAccounts();
      const b2cAccounts = msalInstanceB2C.getAllAccounts();

      if (azureAdAccounts.length > 0) {
        // User authenticated with Azure AD
        setAuthProvider(AuthProvider.AzureAD);
        setCurrentMsalInstance(msalInstanceAzureAD);
        await handleSilentLogin(msalInstanceAzureAD, azureAdAccounts[0], UserType.HostTenant);
      } else if (b2cAccounts.length > 0) {
        // User authenticated with B2C
        setAuthProvider(AuthProvider.AzureB2C);
        setCurrentMsalInstance(msalInstanceB2C);
        await handleSilentLogin(msalInstanceB2C, b2cAccounts[0], UserType.B2CTenant);
      } else {
        // No authentication found
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSilentLogin = async (
    msalInstance: PublicClientApplication,
    account: AccountInfo,
    userType: UserType
  ) => {
    try {
      const request = userType === UserType.HostTenant ? azureAdLoginRequest : azureB2CLoginRequest;
      const response = await msalInstance.acquireTokenSilent({
        ...request,
        account,
      });
      
      await processAuthResult(response, userType);
    } catch (error) {
      console.error('Silent login failed:', error);
      // Silent login failed, user needs to login interactively
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async (provider: AuthProvider) => {
    try {
      setIsLoading(true);
      setError(null);

      const msalInstance = provider === AuthProvider.AzureAD ? msalInstanceAzureAD : msalInstanceB2C;
      const loginRequest = provider === AuthProvider.AzureAD ? azureAdLoginRequest : azureB2CLoginRequest;
      const userType = provider === AuthProvider.AzureAD ? UserType.HostTenant : UserType.B2CTenant;

      setCurrentMsalInstance(msalInstance);
      setAuthProvider(provider);

      // First, try silent authentication (SSO)
      const accounts = msalInstance.getAllAccounts();
      
      if (accounts.length > 0) {
        try {
          // Try to acquire token silently (SSO)
          const silentRequest = {
            ...loginRequest,
            account: accounts[0],
            prompt: 'none' // This ensures we don't show login UI if already signed in
          };
          
          const response = await msalInstance.acquireTokenSilent(silentRequest);
          await processAuthResult(response, userType);
          return; // Success! No need for interactive login
        } catch (silentError: any) {
          console.log('Silent login failed, trying interactive login:', silentError);
          // Silent auth failed, fall back to interactive login
        }
      }

      // Interactive login as fallback
      const response = await msalInstance.loginPopup(loginRequest);
      await processAuthResult(response, userType);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (currentMsalInstance) {
        await currentMsalInstance.logoutPopup();
      }

      // Clear all auth state
      setUser(null);
      setIsAuthenticated(false);
      setAuthProvider(null);
      setCurrentMsalInstance(msalInstanceAzureAD);
    } catch (error: any) {
      console.error('Logout error:', error);
      setError(error.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const switchProvider = (provider: AuthProvider) => {
    // Clear current authentication
    logout();
    // The user will need to login again with the new provider
  };

  const processAuthResult = async (result: AuthenticationResult, userType: UserType) => {
    if (result.account) {
      let authUser: AuthUser = {
        id: result.account.homeAccountId || result.account.localAccountId,
        name: result.account.name || 'Unknown User',
        email: result.account.username,
        userType,
        tenantId: result.account.tenantId,
      };

      // For Azure AD users, fetch additional profile information
      if (userType === UserType.HostTenant && result.accessToken) {
        try {
          const graphData = await callMsGraph(result.accessToken);
          authUser = {
            ...authUser,
            name: graphData.displayName || authUser.name,
            email: graphData.mail || graphData.userPrincipalName || authUser.email,
            // Add role information if available
            roles: graphData.roles || [],
            isAdmin: graphData.roles?.includes('Admin') || false,
          };
        } catch (graphError) {
          console.warn('Failed to fetch Graph data:', graphError);
        }
      }

      setUser(authUser);
      setIsAuthenticated(true);
    }
  };

  // Call Microsoft Graph API for additional user info
  const callMsGraph = async (accessToken: string) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const options = {
      method: 'GET',
      headers,
    };

    const response = await fetch(graphConfig.graphMeEndpoint, options);
    return response.json();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    authProvider,
    login,
    logout,
    switchProvider,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      <MsalProvider instance={currentMsalInstance}>
        {children}
      </MsalProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContext;
