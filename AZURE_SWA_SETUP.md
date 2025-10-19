# Azure Static Web Apps Setup Guide

## Option 1: Create via Azure Portal (Recommended)

Since the Azure CLI is having authentication issues on your system, the easiest way is to create the Static Web App through the Azure Portal:

### Steps:

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create a Static Web App**:
   - Click "Create a resource"
   - Search for "Static Web Apps"
   - Click "Create"

3. **Configuration**:
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing
   - **Name**: `learn-with-365` (or your preferred name)
   - **Plan type**: Free (for development)
   - **Source**: GitHub
   - **GitHub account**: Connect your GitHub account
   - **Organization**: 365Evergreen
   - **Repository**: learn-with-365
   - **Branch**: main

4. **Build Details**:
   - **Build Presets**: React
   - **App location**: `/` (root)
   - **API location**: (leave empty)
   - **Output location**: `build`

5. **Review and Create**:
   - Click "Review + create"
   - Click "Create"

### What happens next:

1. Azure will create the Static Web App resource
2. It will automatically add a GitHub Actions workflow to your repository
3. The workflow will build and deploy your app automatically
4. You'll get a URL like: `https://your-app-name.azurestaticapps.net`

### GitHub Secrets to Add:

✅ **COMPLETED** - All secrets have been added to your GitHub repository.

Your Azure Static Web App is now deployed at: **https://polite-grass-06e281c0f.3.azurestaticapps.net/**

The following secrets are configured:
```
REACT_APP_AZURE_AD_CLIENT_ID=bb92b17e-d6d8-4a7b-84b3-b37aa9dceadb
REACT_APP_AZURE_AD_TENANT_ID=7a5bf294-6ae8-47c4-b0c4-b2f9166d7a3f
REACT_APP_B2C_CLIENT_ID=bb92b17e-d6d8-4a7b-84b3-b37aa9dceadb
REACT_APP_B2C_AUTHORITY=https://365evergreenb2c.b2clogin.com/365evergreenb2c.onmicrosoft.com/B2C_1_signupsignin
REACT_APP_B2C_KNOWN_AUTHORITY=7a5bf294-6ae8-47c4-b0c4-b2f9166d7a3f
```

**Additional secrets you may want to add:**
```
REACT_APP_REDIRECT_URI=https://polite-grass-06e281c0f.3.azurestaticapps.net/
REACT_APP_POST_LOGOUT_REDIRECT_URI=https://polite-grass-06e281c0f.3.azurestaticapps.net/
```

**Note**: The `AZURE_STATIC_WEB_APPS_API_TOKEN` will be automatically added by Azure when you create the Static Web App.

## Option 2: Manual CLI Setup (Alternative)

If you want to fix the CLI authentication issue:

1. **Reinstall Azure CLI**:
   ```powershell
   # Uninstall current version
   winget uninstall Microsoft.AzureCLI
   
   # Install fresh version
   winget install Microsoft.AzureCLI
   ```

2. **Restart PowerShell** and try authentication again:
   ```powershell
   az login
   swa deploy --env production
   ```

## Recommended Approach

**Use Option 1 (Azure Portal)** - it's more reliable and creates the proper CI/CD pipeline automatically.