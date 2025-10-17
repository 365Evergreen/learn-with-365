# API Permissions Documentation

This document outlines the Microsoft Graph API permissions required for the Learn with 365 e-learning platform's dual authentication system.

## Overview

The application supports two types of users with different permission levels:

1. **Host Tenant Users (Azure AD)** - Content editors with read/write access to SharePoint
2. **B2C Users** - Content consumers with read-only access to learning materials

## Host Tenant Users (Azure AD) - Content Editors

Host tenant users are employees or members of your organization who can create, edit, and manage learning content in SharePoint.

### Required API Permissions

#### Microsoft Graph Permissions

| Permission | Type | Purpose | Justification |
|------------|------|---------|---------------|
| `User.Read` | Delegated | Read user profile | Basic user authentication and profile information |
| `Sites.ReadWrite.All` | Delegated | SharePoint sites access | Create, edit, and manage learning content sites |
| `Files.ReadWrite.All` | Delegated | SharePoint files access | Upload, edit, and manage learning materials (documents, videos, etc.) |
| `Group.ReadWrite.All` | Delegated | SharePoint groups management | Manage access permissions for learning content |
| `Directory.Read.All` | Delegated | Directory read access | Look up users for content assignment and collaboration |

#### Additional On-Demand Permissions

| Permission | Type | Purpose | When Requested |
|------------|------|---------|----------------|
| `TermStore.ReadWrite.All` | Delegated | Taxonomy management | When managing content categories and tags |
| `Sites.Read.All` | Delegated | Search across sites | When implementing global content search |

### Azure AD App Registration Configuration

```json
{
  "requiredResourceAccess": [
    {
      "resourceAppId": "00000003-0000-0000-c000-000000000000",
      "resourceAccess": [
        {
          "id": "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
          "type": "Scope"
        },
        {
          "id": "9492366f-7969-46a4-8d15-ed1a20078fff",
          "type": "Scope"
        },
        {
          "id": "75359482-378d-4052-8f01-80520e7db3cd",
          "type": "Scope"
        },
        {
          "id": "62a82d76-70ea-41e2-9197-370581804d09",
          "type": "Scope"
        },
        {
          "id": "06da0dbc-49e2-44d2-8312-53f166ab848a",
          "type": "Scope"
        }
      ]
    }
  ]
}
```

### Specific SharePoint Operations

#### Content Creation & Management
- **Create learning modules**: `Sites.ReadWrite.All`
- **Upload course materials**: `Files.ReadWrite.All`
- **Manage course pages**: `Sites.ReadWrite.All`
- **Create document libraries**: `Sites.ReadWrite.All`

#### User & Permission Management
- **Assign content to users**: `Directory.Read.All`
- **Manage learning groups**: `Group.ReadWrite.All`
- **Set content permissions**: `Sites.ReadWrite.All`

#### Advanced Features
- **Content categorization**: `TermStore.ReadWrite.All`
- **Cross-site search**: `Sites.Read.All`

## B2C Users - Content Consumers

B2C users are external learners who access the platform to consume learning content. They have read-only access to published materials.

### Authentication Flow

B2C users authenticate through Azure AD B2C and receive read-only access through the application's service principal, not direct API permissions.

### Access Pattern

```
B2C User → Azure B2C → Application → Service Principal → SharePoint (Read-only)
```

### Required B2C Configuration

| Scope | Purpose | Notes |
|-------|---------|-------|
| `openid` | OpenID Connect authentication | Standard OIDC scope |
| `profile` | Basic profile information | User name, email for personalization |

### Read-Only Access Implementation

B2C users don't receive direct SharePoint permissions. Instead:

1. **Application Service Principal** has read permissions to SharePoint
2. **Backend API** (when implemented) validates B2C tokens
3. **Content is filtered** to show only published/approved materials
4. **No direct Graph API calls** from B2C user sessions

### Service Principal Permissions (for B2C user content access)

| Permission | Type | Purpose |
|------------|------|---------|
| `Sites.Read.All` | Application | Read SharePoint sites for published content |
| `Files.Read.All` | Application | Read learning materials and documents |
| `Group.Read.All` | Application | Read group memberships for content filtering |

## Environment Configuration

### Azure AD (Host Tenant) App Registration

```bash
# Required in .env file
REACT_APP_AZURE_AD_CLIENT_ID=your-azure-ad-client-id
REACT_APP_AZURE_AD_TENANT_ID=your-azure-ad-tenant-id

# Redirect URIs to configure in Azure portal
# Development: http://localhost:3000
# Production: https://your-app-domain.com
```

### Azure B2C App Registration

```bash
# Required in .env file
REACT_APP_B2C_CLIENT_ID=your-b2c-client-id
REACT_APP_B2C_AUTHORITY=https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_signupsignin
REACT_APP_B2C_KNOWN_AUTHORITY=your-tenant.b2clogin.com
```

## Implementation Examples

### Host Tenant User - Creating Content

```typescript
// Request SharePoint access token
const sharePointTokenRequest = {
  scopes: ['Sites.ReadWrite.All'],
  account: msalInstance.getActiveAccount()
};

const tokenResponse = await msalInstance.acquireTokenSilent(sharePointTokenRequest);

// Create learning content
const response = await fetch(`https://graph.microsoft.com/v1.0/sites/{site-id}/lists/{list-id}/items`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${tokenResponse.accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fields: {
      Title: 'New Learning Module',
      Description: 'Module description',
      ContentType: 'Course'
    }
  })
});
```

### B2C User - Consuming Content

```typescript
// B2C user authentication (no direct SharePoint access)
const b2cTokenRequest = {
  scopes: ['openid', 'profile']
};

// Content is fetched through application backend
const learningContent = await fetch('/api/courses', {
  headers: {
    'Authorization': `Bearer ${b2cToken.accessToken}`
  }
});

// Backend validates B2C token and uses service principal for SharePoint access
```

## Security Considerations

### Host Tenant Users
- ✅ Full SharePoint permissions appropriate for content creators
- ✅ Conditional access policies can be applied
- ✅ MFA enforcement through Azure AD
- ✅ Audit logging of all content modifications

### B2C Users
- ✅ No direct SharePoint access prevents unauthorized modifications
- ✅ Content filtering ensures only approved materials are visible
- ✅ Rate limiting can be applied at application level
- ✅ User activity tracking for learning analytics

## Admin Consent Requirements

### Host Tenant App
**Admin consent required** for the following permissions:
- `Sites.ReadWrite.All` - Requires tenant admin approval
- `Directory.Read.All` - Requires tenant admin approval
- `Group.ReadWrite.All` - Requires tenant admin approval

### B2C App
**No admin consent required** - Only uses standard OIDC scopes

## Compliance & Privacy

### Data Access
- **Host tenant users**: Full access to organizational learning content
- **B2C users**: Access only to published, approved learning materials
- **Audit trail**: All content modifications logged through Microsoft 365 audit logs

### Privacy Considerations
- User profile data is minimized to necessary fields only
- B2C users' personal data is isolated from organizational data
- Content access is logged for learning analytics but user privacy is maintained

## Troubleshooting

### Common Permission Issues

1. **"Insufficient privileges" error**
   - Ensure admin consent has been granted for the required permissions
   - Verify the app registration includes all necessary API permissions

2. **B2C users can't access content**
   - Check that the service principal has appropriate read permissions
   - Verify backend API is correctly validating B2C tokens

3. **Host tenant users can't edit content**
   - Confirm `Sites.ReadWrite.All` permission is granted and consented
   - Check SharePoint site-level permissions for the user

### Permission Verification

Use Microsoft Graph Explorer to test permissions:
- **Host tenant**: https://developer.microsoft.com/graph/graph-explorer
- **Service principal**: Use app-only authentication to test B2C content access

## Future Enhancements

### Potential Additional Permissions

| Permission | Use Case | User Type |
|------------|----------|-----------|
| `Reports.Read.All` | Learning analytics dashboard | Host tenant |
| `Calendars.ReadWrite` | Course scheduling | Host tenant |
| `Mail.Send` | Learning notifications | Service principal |
| `OnlineMeetings.ReadWrite` | Virtual classroom integration | Host tenant |

### Granular Permissions

Consider implementing custom permission levels:
- **Course Creator**: Limited to specific site collections
- **Content Reviewer**: Approval workflow permissions  
- **Learning Administrator**: Full platform administration
- **Learner**: Enhanced B2C user with progress tracking