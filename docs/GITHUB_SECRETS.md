# GitHub Secrets Configuration for Deployment

This document outlines the required GitHub repository secrets for deploying the Learn with 365 platform.

## Required Secrets

Navigate to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** to add these secrets:

### 🔐 Azure AD (Host Tenant) Secrets

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `AZURE_AD_CLIENT_ID` | Azure AD app registration client ID | `12345678-1234-1234-1234-123456789012` |
| `AZURE_AD_TENANT_ID` | Azure AD tenant/directory ID | `87654321-4321-4321-4321-210987654321` |

### 🔐 Azure B2C Secrets

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `B2C_CLIENT_ID` | Azure B2C app registration client ID | `abcdefgh-abcd-abcd-abcd-abcdefghijkl` |
| `B2C_AUTHORITY` | B2C authority URL with policy | `https://yourtenant.b2clogin.com/yourtenant.onmicrosoft.com/B2C_1_signupsignin` |
| `B2C_KNOWN_AUTHORITY` | B2C known authority domain | `yourtenant.b2clogin.com` |

### 🔐 Application Configuration Secrets

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `REDIRECT_URI` | Production redirect URI | `https://your-app-domain.com` |
| `POST_LOGOUT_REDIRECT_URI` | Post-logout redirect URI | `https://your-app-domain.com` |

### 🔐 SharePoint Configuration Secrets

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `SHAREPOINT_SITE_URL` | SharePoint site URL for learning content | `https://yourtenant.sharepoint.com/sites/learning-platform` |
| `SHAREPOINT_LIST_ID` | SharePoint list ID for course content | `12345678-1234-1234-1234-123456789012` |

### 🔐 Deployment Platform Secrets

#### Azure Static Web Apps (Primary)
| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Deployment token for Azure SWA | Azure Portal → Static Web Apps → Manage deployment token |

#### Netlify (Fallback)
| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Netlify Dashboard → User settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify site identifier | Netlify Dashboard → Site settings → General → Site information |

## 🚀 Deployment Process

### Automatic Deployment
- **Trigger**: Push to `main` or `master` branch
- **Primary**: Azure Static Web Apps
- **Fallback**: Netlify (if Azure token not available)

### Pull Request Previews
- **Trigger**: Pull request creation/update
- **Platform**: Azure Static Web Apps
- **Cleanup**: Automatic when PR is closed

## 📋 Setup Checklist

### Azure App Registrations
- [ ] **Azure AD App**: Created with proper redirect URIs
- [ ] **API Permissions**: Configured per [API_PERMISSIONS.md](./API_PERMISSIONS.md)
- [ ] **Admin Consent**: Granted for required permissions
- [ ] **B2C App**: Created with user flow configured

### SharePoint Setup
- [ ] **Learning Site**: Created with appropriate document libraries
- [ ] **Content Lists**: Set up for courses, modules, materials
- [ ] **Permissions**: Configured for host tenant users
- [ ] **Service Principal**: Set up with read permissions for B2C access

### GitHub Repository
- [ ] **All Secrets**: Added to repository settings
- [ ] **Workflow**: Enabled and permissions configured
- [ ] **Branch Protection**: Set up for main/master branch

### Azure Static Web Apps
- [ ] **Resource Created**: In Azure portal
- [ ] **Deployment Token**: Generated and added to GitHub secrets
- [ ] **Custom Domain**: Configured (if applicable)
- [ ] **Authentication**: Configured for redirect URIs

## 🔧 Local Development

For local development, copy `.env.example` to `.env` and populate with your development values:

```bash
cp .env.example .env
# Edit .env with your local development configuration
```

## 🛠️ Troubleshooting

### Common Issues

1. **Deployment Fails with "Invalid Redirect URI"**
   - Ensure `REDIRECT_URI` secret matches Azure app registration
   - Check both production and development redirect URIs

2. **Authentication Errors in Deployed App**
   - Verify all Azure AD and B2C secrets are correctly set
   - Check Azure app registration configurations match secrets

3. **SharePoint Access Issues**
   - Confirm SharePoint secrets are correct
   - Verify service principal has appropriate permissions
   - Check SharePoint site and list configurations

4. **Build Failures**
   - Check if all required dependencies are in package.json
   - Verify environment variables are properly formatted
   - Review GitHub Actions logs for specific error messages

### Debug Steps

1. **Check Secrets**: Ensure all required secrets are set in GitHub
2. **Review Logs**: Check GitHub Actions workflow logs for errors
3. **Test Locally**: Verify the app works with production-like configuration
4. **Azure Portal**: Check Azure Static Web Apps logs and configuration

## 🔄 Updating Secrets

When updating secrets:

1. **Update in GitHub**: Repository settings → Secrets and variables → Actions
2. **Trigger Deployment**: Push to main branch or manually trigger workflow
3. **Verify**: Test authentication and functionality in deployed app

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Static Web Apps Deployment](https://docs.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow)
- [Azure AD App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Azure B2C Setup Guide](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant)