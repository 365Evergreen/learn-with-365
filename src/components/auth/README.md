# Authentication System Documentation

## Overview

This e-learning platform supports **dual authentication** for two types of users with different SharePoint permissions:

1. **Host Tenant Users** - Organizational content editors (Azure AD) with read/write SharePoint access
2. **B2C Tenant Users** - External content consumers (Azure B2C) with read-only access via service principal

## 🔐 API Permissions & Access Levels

### Host Tenant Users (Content Editors)
**Purpose**: Create, edit, and manage SharePoint learning content

**Required API Permissions**:
- `User.Read` - Basic profile access
- `Sites.ReadWrite.All` - SharePoint sites read/write access
- `Files.ReadWrite.All` - SharePoint files read/write access  
- `Group.ReadWrite.All` - SharePoint groups management
- `Directory.Read.All` - User lookup and assignment

**What they can do**:
- ✅ Create learning modules and courses
- ✅ Upload and manage course materials
- ✅ Manage user access and permissions
- ✅ Edit course pages and content
- ✅ Organize content with categories and tags

### B2C Users (Content Consumers)
**Purpose**: View and consume published learning content (read-only)

**Authentication Scopes**:
- `openid` - Basic authentication
- `profile` - User profile information

**Access Pattern**:
```
B2C User → Azure B2C → App Backend → Service Principal → SharePoint (Read-Only)
```

**What they can do**:
- ✅ View published learning content
- ✅ Access approved course materials  
- ✅ Track learning progress
- ❌ Cannot edit or create content
- ❌ No direct SharePoint access

### Service Principal (for B2C users)
**Required Permissions**:
- `Sites.Read.All` - Read SharePoint sites for published content
- `Files.Read.All` - Read learning materials and documents
- `Group.Read.All` - Read group memberships for content filtering

> **📖 For detailed API permissions documentation, see**: [API_PERMISSIONS.md](../../docs/API_PERMISSIONS.md)

## 🔧 Authentication Architecture

### Key Components

- **AuthContext** - Central authentication state management
- **AuthGuard** - Route protection component
- **Login** - Authentication UI with provider selection
- **UserProfile** - User profile management and provider switching
- **MSAL Integration** - Microsoft Authentication Library for both Azure AD and B2C

### User Types

```typescript
enum UserType {
  HostTenant = 'host',    // Azure AD organizational users
  B2CTenant = 'b2c',      // Azure AD B2C personal users
}

enum AuthProvider {
  AzureAD = 'azuread',    // Host tenant authentication
  AzureB2C = 'azureb2c',  // B2C tenant authentication
}
```

## 🚀 Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Azure AD (Host Tenant)
REACT_APP_AZURE_AD_CLIENT_ID=your-azure-ad-client-id
REACT_APP_AZURE_AD_TENANT_ID=your-azure-ad-tenant-id

# Azure AD B2C
REACT_APP_B2C_CLIENT_ID=your-b2c-client-id
REACT_APP_B2C_AUTHORITY=https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_signupsignin
REACT_APP_B2C_KNOWN_AUTHORITY=tenant.b2clogin.com

# Redirect URIs
REACT_APP_REDIRECT_URI=http://localhost:3000
REACT_APP_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
```

### 2. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Create **New registration**
4. Configure:
   - **Name**: E-Learning Platform
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: `http://localhost:3000` (SPA)
5. Note the **Application (client) ID** and **Directory (tenant) ID**
6. Under **Authentication**:
   - Enable **Access tokens** and **ID tokens**
   - Add redirect URIs for production
7. Under **API permissions**:
   - Add **Microsoft Graph** > **User.Read** (delegated)

### 3. Azure AD B2C Setup

1. Create B2C Tenant:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create **Azure AD B2C** resource
   - Switch to B2C directory

2. Create User Flow:
   - Go to **User flows** > **New user flow**
   - Select **Sign up and sign in**
   - Configure attributes and claims

3. Register Application:
   - Go to **App registrations** > **New registration**
   - Configure redirect URIs
   - Note **Application ID**

4. Get Authority URL:
   - Format: `https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}`

## 📱 Usage Examples

### Basic Authentication Check

```tsx
import { useAuth } from './components/auth';

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={() => login(AuthProvider.AzureAD)}>Login</button>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Account Type: {user.userType}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

```tsx
import { AuthGuard } from './components/auth';

function App() {
  return (
    <Routes>
      <Route path="/public" element={<PublicPage />} />
      <Route 
        path="/private" 
        element={
          <AuthGuard>
            <PrivatePage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <AuthGuard allowedUserTypes={['host']}>
            <AdminPage />
          </AuthGuard>
        } 
      />
    </Routes>
  );
}
```

### Provider-Specific Authentication

```tsx
function LoginButtons() {
  const { login } = useAuth();
  
  return (
    <div>
      <button onClick={() => login(AuthProvider.AzureAD)}>
        Organization Account
      </button>
      <button onClick={() => login(AuthProvider.AzureB2C)}>
        Personal Account
      </button>
    </div>
  );
}
```

### User Profile with Provider Switching

```tsx
import { UserProfile } from './components/auth';

function Header() {
  return (
    <header>
      <nav>...</nav>
      <UserProfile /> {/* Includes provider switching */}
    </header>
  );
}
```

## 🔒 Security Features

### Token Management

- **Automatic Token Renewal** - MSAL handles token refresh
- **Secure Storage** - Tokens stored in localStorage with encryption
- **Silent Authentication** - Seamless re-authentication on app reload

### Authorization

- **Role-Based Access** - Support for user roles and permissions
- **Route Protection** - AuthGuard component for protected routes
- **Provider-Specific Access** - Restrict features by user type

### Error Handling

- **Network Failures** - Graceful handling of connection issues
- **Invalid Tokens** - Automatic re-authentication flow
- **Permission Denied** - Clear error messages and fallbacks

## 🎨 UI Components

### Login Component

```tsx
<Login />
```

- Provider selection (Azure AD vs B2C)
- Error handling and loading states
- Responsive design with Fluent UI

### User Profile Component

```tsx
<UserProfile compact={false} />
```

- User information display
- Provider switching
- Logout functionality
- Settings access

### Auth Guard Component

```tsx
<AuthGuard 
  requireAuth={true}
  allowedUserTypes={['host', 'b2c']}
  fallback={<CustomLogin />}
>
  <ProtectedContent />
</AuthGuard>
```

## 🔄 Authentication Flows

### Initial App Load

1. Check for existing tokens in both providers
2. Attempt silent authentication
3. Redirect to login if no valid tokens

### Login Flow

1. User selects provider (Azure AD or B2C)
2. Redirect to Microsoft authentication
3. Return with tokens
4. Fetch user profile information
5. Set authentication state

### Provider Switching

1. User initiates provider switch
2. Clear current authentication
3. Redirect to new provider login
4. Complete authentication with new provider

### Logout Flow

1. Clear MSAL tokens
2. Clear application state
3. Redirect to logout endpoint
4. Return to application

## 🛠️ Development Tips

### Testing Authentication

```bash
# Run with environment variables
REACT_APP_AZURE_AD_CLIENT_ID=test-id npm start

# Test both providers locally
# Set up localhost redirect URIs in Azure
```

### Debugging

- Enable MSAL logging in development
- Check browser console for authentication errors
- Use Azure AD logs for troubleshooting

### Common Issues

1. **Redirect URI Mismatch** - Ensure URIs match in Azure and code
2. **CORS Errors** - Configure allowed origins in Azure
3. **Token Refresh Failures** - Check token lifetime settings
4. **B2C Policy Issues** - Verify user flow configuration

## 📚 Additional Resources

- [Microsoft Authentication Library (MSAL) Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
- [Azure AD B2C Documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/)
- [Fluent UI Components](https://react.fluentui.dev/)

## 🔄 Migration Guide

### From Basic Auth

1. Wrap app with `AuthContextProvider`
2. Replace login forms with `<Login />` component
3. Add `<AuthGuard>` to protected routes
4. Update user state management to use `useAuth()`

### Adding New Providers

1. Update `AuthProvider` enum in `authConfig.ts`
2. Add configuration for new provider
3. Update `AuthContext` to handle new provider
4. Add UI options in Login component
