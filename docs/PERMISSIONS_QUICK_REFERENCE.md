# API Permissions Quick Reference

## Host Tenant Users (Azure AD) - Content Editors ✏️

**Purpose**: Create, edit, and manage SharePoint learning content

### Required Permissions
- `User.Read` - Basic profile access
- `Sites.ReadWrite.All` - SharePoint sites read/write
- `Files.ReadWrite.All` - SharePoint files read/write  
- `Group.ReadWrite.All` - SharePoint groups management
- `Directory.Read.All` - User lookup and assignment

### What they can do:
- ✅ Create learning modules and courses
- ✅ Upload and manage course materials
- ✅ Manage user access and permissions
- ✅ Edit course pages and content
- ✅ Organize content with categories and tags

---

## B2C Users - Content Consumers 👥

**Purpose**: View and consume published learning content (read-only)

### Authentication Scopes
- `openid` - Basic authentication
- `profile` - User profile information

### Access Pattern:
```
B2C User → Azure B2C → App Backend → Service Principal → SharePoint (Read-Only)
```

### What they can do:
- ✅ View published learning content
- ✅ Access approved course materials
- ✅ Track learning progress
- ❌ Cannot edit or create content
- ❌ No direct SharePoint access

---

## Service Principal (Backend API)

**Purpose**: Provide read-only SharePoint access for B2C users

### Required Permissions
- `Sites.Read.All` - Read SharePoint sites
- `Files.Read.All` - Read learning materials
- `Group.Read.All` - Read group memberships

---

## Admin Consent Required ⚠️

The following permissions require tenant administrator consent:

- `Sites.ReadWrite.All` (Host tenant app)
- `Directory.Read.All` (Host tenant app)  
- `Group.ReadWrite.All` (Host tenant app)

---

## Setup Checklist

### Azure AD App Registration (Host Tenant)
- [ ] Configure API permissions listed above
- [ ] Request admin consent
- [ ] Set redirect URIs for your domain
- [ ] Enable implicit flow if needed

### Azure B2C App Registration
- [ ] Configure for OpenID Connect
- [ ] Set redirect URIs
- [ ] Create sign-up/sign-in policy
- [ ] No admin consent required

### SharePoint Configuration
- [ ] Create learning content site
- [ ] Set up document libraries for course materials
- [ ] Configure appropriate SharePoint groups
- [ ] Test content access with both user types

For detailed implementation guidance, see the full [API_PERMISSIONS.md](./API_PERMISSIONS.md) documentation.