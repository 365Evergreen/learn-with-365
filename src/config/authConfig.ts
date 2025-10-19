import { Configuration, LogLevel } from '@azure/msal-browser';

// Azure AD (Host Tenant) Configuration
export const azureAdConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID || 'your-azure-ad-client-id',
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_AD_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI || window.location.origin,
    navigateToLoginRequestUrl: false, // Prevents redirect loops
  },
  cache: {
    cacheLocation: 'sessionStorage', // Better for SSO
    storeAuthStateInCookie: true, // Helps with SSO across browser sessions
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Azure AD B2C Configuration
export const azureB2CConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_B2C_CLIENT_ID || 'your-b2c-client-id',
    authority: process.env.REACT_APP_B2C_AUTHORITY || 'https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_signupsignin',
    redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI || window.location.origin,
    knownAuthorities: [process.env.REACT_APP_B2C_KNOWN_AUTHORITY || 'your-tenant.b2clogin.com'],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Login request scopes for Azure AD (Host Tenant) - Content Editors
export const azureAdLoginRequest = {
  scopes: [
    'User.Read',
    'openid', 
    'profile',
    'Sites.ReadWrite.All',    // SharePoint sites read/write access
    'Files.ReadWrite.All',    // SharePoint files read/write access
    'Group.ReadWrite.All',    // SharePoint groups management
    'Directory.Read.All'      // Directory read access for user lookup
  ],
  prompt: 'none', // Enable true SSO - no prompt if user is already signed in
  extraQueryParameters: {
    domain_hint: 'organizations' // Hint to use organizational accounts first
  }
};

// Additional scopes for SharePoint operations (requested on-demand)
export const sharePointScopes = {
  sitesReadWrite: ['Sites.ReadWrite.All'],
  filesReadWrite: ['Files.ReadWrite.All'],
  listsReadWrite: ['Sites.ReadWrite.All'],
  pagesReadWrite: ['Sites.ReadWrite.All'],
  groupsReadWrite: ['Group.ReadWrite.All'],
  termStoreReadWrite: ['TermStore.ReadWrite.All'],
  searchRead: ['Sites.Read.All']
};

// Login request scopes for Azure B2C - Content Consumers (Read-only)
export const azureB2CLoginRequest = {
  scopes: [
    'openid', 
    'profile',
    // Note: B2C users get read-only access through the application's service principal
    // The app will use its own permissions to fetch SharePoint content for B2C users
  ],
};

// Graph API configuration
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  sharePointSiteEndpoint: 'https://graph.microsoft.com/v1.0/sites',
  sharePointMyFilesEndpoint: 'https://graph.microsoft.com/v1.0/me/drive',
  sharePointSearchEndpoint: 'https://graph.microsoft.com/v1.0/search/query'
};

// Authentication provider types
export enum AuthProvider {
  AzureAD = 'azuread',
  AzureB2C = 'azureb2c',
}

// User types
export enum UserType {
  HostTenant = 'host',
  B2CTenant = 'b2c',
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  roles?: string[];
  tenantId?: string;
  isAdmin?: boolean;
}
