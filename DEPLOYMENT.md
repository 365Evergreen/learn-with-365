# 🚀 E-Learning Platform Deployment Guide

This guide covers multiple deployment options for the e-learning platform with dual Azure AD and B2C authentication.

## 📋 Prerequisites

### Required Tools

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** - Included with Node.js
- **PowerShell** - For deployment scripts
- **Git** - For version control

### Azure Requirements

- **Azure Subscription** - For Static Web Apps or App Service
- **Azure AD Tenant** - For organizational authentication
- **Azure AD B2C Tenant** - For consumer authentication

## ⚙️ Environment Setup

### 1. Clone and Install

```bash
git clone <your-repository>
cd learn-with-fletch
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Copy environment template:

```bash
cp .env.example .env.production
```

Update `.env.production` with your values:

```env
# Azure AD (Host Tenant)
REACT_APP_AZURE_AD_CLIENT_ID=your-azure-ad-client-id
REACT_APP_AZURE_AD_TENANT_ID=your-tenant-id

# Azure AD B2C
REACT_APP_B2C_CLIENT_ID=your-b2c-client-id
REACT_APP_B2C_AUTHORITY=https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_signupsignin
REACT_APP_B2C_KNOWN_AUTHORITY=tenant.b2clogin.com

# Production URLs
REACT_APP_REDIRECT_URI=https://yourdomain.com
REACT_APP_POST_LOGOUT_REDIRECT_URI=https://yourdomain.com
```

## 🎯 Deployment Options

### Option 1: Azure Static Web Apps (Recommended)

#### Benefits

- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Integrated Azure AD**
- ✅ **CI/CD with GitHub Actions**
- ✅ **Custom domains**
- ✅ **Staging environments**

#### Setup Steps

1. **Create Static Web App in Azure**

   ```bash
   # Using Azure CLI
   az staticwebapp create \
     --name elearning-platform \
     --resource-group your-rg \
     --source https://github.com/yourusername/your-repo \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --output-location "build"
   ```

2. **Configure GitHub Secrets**
   Go to GitHub Repository → Settings → Secrets and add:

   ```env
   AZURE_STATIC_WEB_APPS_API_TOKEN=<deployment-token>
   AZURE_AD_CLIENT_ID=<client-id>
   AZURE_AD_TENANT_ID=<tenant-id>
   B2C_CLIENT_ID=<b2c-client-id>
   B2C_AUTHORITY=<b2c-authority>
   B2C_KNOWN_AUTHORITY=<b2c-known-authority>
   REDIRECT_URI=<production-url>
   POST_LOGOUT_REDIRECT_URI=<production-url>
   ```

3. **Deploy**

   ```bash
   npm run deploy:azure
   ```

4. **Configure Custom Domain (Optional)**
   - Add CNAME record: `www.yourdomain.com → <static-app>.azurestaticapps.net`
   - Update redirect URIs in Azure AD and B2C

### Option 2: Netlify

#### Benefits of Netlify

- ✅ **Simple deployment**
- ✅ **Branch previews**
- ✅ **Form handling**
- ✅ **Edge functions**

#### Setup Netlify

1. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

2. **Configure Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:

   ``` text
   REACT_APP_AZURE_AD_CLIENT_ID=<client-id>
   REACT_APP_AZURE_AD_TENANT_ID=<tenant-id>
   REACT_APP_B2C_CLIENT_ID=<b2c-client-id>
   REACT_APP_B2C_AUTHORITY=<b2c-authority>
   REACT_APP_B2C_KNOWN_AUTHORITY=<b2c-known-authority>
   REACT_APP_REDIRECT_URI=<netlify-url>
   REACT_APP_POST_LOGOUT_REDIRECT_URI=<netlify-url>
   ```

3. **Deploy**

   ```bash
   npm run deploy:netlify
   ```

### Option 3: Docker Deployment

#### Benefits of Docker

- ✅ **Consistent environments**
- ✅ **Easy scaling**
- ✅ **Local development**

#### Setup Steps

1. **Build Docker Image**

   ```bash
   npm run build:docker
   ```

2. **Run Container**

   ```bash
   npm run start:docker
   ```

3. **Docker Compose (Development)**

   ```bash
   npm run dev:docker
   ```

4. **Deploy to Cloud**

   ```bash
   # Azure Container Instances
   az container create \
     --resource-group your-rg \
     --name elearning-platform \
     --image elearning-platform:latest \
     --dns-name-label elearning-unique \
     --ports 80
   
   # AWS ECS, Google Cloud Run, etc.
   ```

### Option 4: Traditional Hosting

#### For shared hosting, VPS, or dedicated servers

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Upload Build Folder**
   - Upload contents of `build/` folder to web server
   - Configure web server for SPA routing

3. **Web Server Configuration**

   **Apache (.htaccess)**

   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

   **Nginx**

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## 🔐 Authentication Configuration

### Azure AD App Registration

1. **Register Application**
   - Go to Azure Portal → Azure Active Directory → App registrations
   - New registration → Single-page application (SPA)
   - Redirect URI: `https://yourdomain.com`

2. **Configure Authentication**
   - Add redirect URIs for all environments
   - Enable ID tokens and Access tokens
   - Configure logout URLs

3. **API Permissions**
   - Microsoft Graph → User.Read (Delegated)
   - Grant admin consent

### Azure AD B2C Setup

1. **Create B2C Tenant**
   - Create Azure AD B2C resource
   - Switch to B2C directory

2. **Create User Flow**
   - User flows → Sign up and sign in
   - Configure attributes and claims
   - Test the flow

3. **Register Application**
   - App registrations → New registration
   - Platform: Single-page application
   - Redirect URIs: Add all domains

## 🔄 CI/CD Pipeline

### GitHub Actions (Automatic)

The included workflow (`.github/workflows/deploy.yml`) automatically:

- ✅ Runs on push to main branch
- ✅ Installs dependencies
- ✅ Runs tests
- ✅ Builds application
- ✅ Deploys to Azure Static Web Apps
- ✅ Creates staging environments for PRs

### Manual Deployment Commands

```bash
# Quick deployments
npm run deploy:azure     # Deploy to Azure Static Web Apps
npm run deploy:netlify   # Deploy to Netlify
npm run deploy:docker    # Deploy with Docker
npm run deploy:local     # Run local development server

# Advanced options
pwsh scripts/deploy.ps1 -Target azure -Environment production
pwsh scripts/deploy.ps1 -Target netlify -SkipBuild
pwsh scripts/deploy.ps1 -Target docker -Verbose
```

## 🛠️ Advanced Configuration

### Custom Domain Setup

1. **DNS Configuration**

   ```
   # For Azure Static Web Apps
   CNAME www.yourdomain.com → <app-name>.azurestaticapps.net
   
   # For Netlify
   CNAME www.yourdomain.com → <site-name>.netlify.app
   ```

2. **SSL Certificate**
   - Azure Static Web Apps: Automatic
   - Netlify: Automatic with Let's Encrypt
   - Other hosts: Configure manually

### Environment-Specific Builds

```bash
# Staging environment
cp .env.staging .env.production
npm run build

# Production environment
cp .env.production .env.production
npm run build
```

### Performance Optimization

1. **Bundle Analysis**

   ```bash
   npm run analyze
   ```

2. **Build Optimizations**
   - Source maps disabled in production
   - Code splitting enabled
   - Gzip compression
   - CDN caching

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Redirect Issues**

   ```
   Problem: AADSTS50011 redirect URI mismatch
   Solution: Add exact redirect URI to Azure app registration
   ```

2. **Build Failures**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. **Docker Issues**

   ```bash
   # Check Docker daemon
   docker --version
   
   # Clean Docker cache
   docker system prune -a
   ```

4. **Environment Variables Not Loading**

   ```bash
   # Check environment file exists
   ls -la .env*
   
   # Verify variable names start with REACT_APP_
   ```

### Debug Commands

```bash
# Check build output
npm run build 2>&1 | tee build.log

# Test production build locally
npm run analyze

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

## 📊 Monitoring & Analytics

### Application Insights (Azure)

1. **Add to index.html**

   ```html
   <script>
     var appInsights = window.appInsights || function(config) {
       // Application Insights snippet
     };
   </script>
   ```

2. **Configure in Azure**
   - Create Application Insights resource
   - Copy instrumentation key
   - Add to environment variables

### Health Checks

- **Azure Static Web Apps**: Built-in monitoring
- **Netlify**: Analytics dashboard
- **Docker**: Health check endpoint at `/health`

## 🚀 Production Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Azure AD apps registered with correct redirect URIs
- [ ] B2C user flows tested
- [ ] Build process tested locally
- [ ] Tests passing
- [ ] Security headers configured

### Post-Deployment

- [ ] Application loads correctly
- [ ] Authentication flows work
- [ ] Both Azure AD and B2C login tested
- [ ] Protected routes require authentication
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance metrics monitored

## 📞 Support

For deployment issues:

1. Check this guide first
2. Review Azure/Netlify documentation
3. Check GitHub Issues
4. Contact system administrator

---

**Happy Deploying! 🎉**
