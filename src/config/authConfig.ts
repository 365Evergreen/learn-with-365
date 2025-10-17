import { Configuration, LogLevel } from '@azure/msal-browser';

// Azure AD (Host Tenant) Configuration
export const azureAdConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID || 'your-azure-ad-client-id',
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_AD_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI || window.location.origin,
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

// Login request scopes
export const azureAdLoginRequest = {
  scopes: ['User.Read', 'openid', 'profile'],
};

export const azureB2CLoginRequest = {
  scopes: ['openid', 'profile'],
};

// Graph API scopes for Azure AD users
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
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
