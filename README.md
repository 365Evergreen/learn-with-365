# Learn with 365 - E-Learning Platform

A modern e-learning platform built with React, TypeScript, and Microsoft 365 integration, featuring dual authentication for content creators and consumers.

## 🚀 Features

- **Dual Authentication System**: Azure AD (host tenant) + Azure B2C (external users)
- **SharePoint Integration**: Content creation and management
- **UI Component Library**: 9 reusable components for app owners
- **Multi-Platform Deployment**: Azure Static Web Apps, Netlify, Docker
- **Modern Tech Stack**: React 18, TypeScript, Fluent UI v9

## 👥 User Types

### Host Tenant Users (Content Editors)
- **Access**: Full read/write permissions to SharePoint
- **Capabilities**: Create courses, manage content, assign permissions
- **Authentication**: Azure AD organizational accounts

### B2C Users (Content Consumers)
- **Access**: Read-only access to published content
- **Capabilities**: View courses, track progress, consume materials
- **Authentication**: Azure B2C personal accounts

## 📚 Documentation

- 🔐 [API Permissions Guide](./docs/API_PERMISSIONS.md) - Complete permission requirements
- 🚀 [Quick Reference](./docs/PERMISSIONS_QUICK_REFERENCE.md) - At-a-glance permissions
- 🔧 [GitHub Secrets Setup](./docs/GITHUB_SECRETS.md) - Deployment configuration
- 🏗️ [Deployment Guide](./DEPLOYMENT.md) - Multi-platform deployment
- 🔑 [Authentication System](./src/components/auth/README.md) - Auth implementation

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- Azure AD tenant (for host users)
- Azure B2C tenant (for external users)
- SharePoint site (for content storage)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/365Evergreen/learn-with-365.git
   cd learn-with-365
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Azure AD, B2C, and SharePoint configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage --ci --watchAll=false
```

## 📦 Building for Production

Build the optimized production bundle:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🚀 Deployment

### GitHub Actions (Recommended)
The project supports multiple deployment targets:

#### GitHub Pages (Demo/Development)
- **URL**: [https://365evergreen.github.io/learn-with-365](https://365evergreen.github.io/learn-with-365)
- **Trigger**: Automatic on push to `main` branch
- **Setup**: No additional configuration required

#### Azure Static Web Apps (Production)
- **URL**: Custom domain supported
- **Trigger**: Manual workflow or on-demand
- **Setup**: Configure Azure secrets in GitHub repository settings

#### Netlify (Alternative)
- **URL**: Custom domain supported  
- **Trigger**: Manual workflow or on-demand
- **Setup**: Configure Netlify secrets in GitHub repository settings

**Setup**: Configure secrets in GitHub repository settings (see [GitHub Secrets Guide](./docs/GITHUB_SECRETS.md))

### Manual Deployment Options

#### GitHub Pages
```bash
npm run deploy
# or
npm run deploy:gh-pages
```

#### Azure Static Web Apps
```bash
npm run deploy:azure
```

#### Netlify
```bash
npm run deploy:netlify
```

#### Docker
```bash
npm run deploy:docker
```

#### Local Testing
```bash
npm run deploy:local
```

## 🔧 Configuration

### Required Environment Variables

```bash
# Azure AD (Host Tenant) - Content Editors
REACT_APP_AZURE_AD_CLIENT_ID=your-azure-ad-client-id
REACT_APP_AZURE_AD_TENANT_ID=your-azure-ad-tenant-id

# Azure B2C - Content Consumers
REACT_APP_B2C_CLIENT_ID=your-b2c-client-id
REACT_APP_B2C_AUTHORITY=https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_signupsignin
REACT_APP_B2C_KNOWN_AUTHORITY=tenant.b2clogin.com

# SharePoint Configuration
REACT_APP_SHAREPOINT_SITE_URL=https://tenant.sharepoint.com/sites/learning-platform
REACT_APP_SHAREPOINT_LIST_ID=your-learning-content-list-id

# Application URLs
REACT_APP_REDIRECT_URI=http://localhost:3000
REACT_APP_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
```

## 🎨 UI Components

The platform includes a comprehensive UI component library:

- **Button** - Various styles and states
- **Card** - Content containers with compound components
- **Input** - Form inputs with validation
- **Modal** - Dialog and modal windows
- **Dropdown** - Selection components
- **Avatar** - User profile images
- **Badge** - Status indicators
- **ProgressBar** - Progress tracking
- **Spinner** - Loading indicators

**Usage**: Import from `src/components/ui`

## 🔐 Security & Permissions

### API Permissions Required

#### Host Tenant Users
- `User.Read` - Basic profile access
- `Sites.ReadWrite.All` - SharePoint sites read/write
- `Files.ReadWrite.All` - SharePoint files read/write
- `Group.ReadWrite.All` - SharePoint groups management
- `Directory.Read.All` - User lookup

#### Service Principal (for B2C users)
- `Sites.Read.All` - Read SharePoint sites
- `Files.Read.All` - Read learning materials
- `Group.Read.All` - Read group memberships

**⚠️ Admin Consent Required** for host tenant permissions.

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow:
- **Automated Testing** on pull requests
- **Multi-Platform Deployment** on main branch pushes
- **Environment Configuration** via GitHub secrets
- **Pull Request Previews** via Azure Static Web Apps

## 🐳 Docker Support

Build and run with Docker:
```bash
# Development
docker-compose --profile dev up

# Production
docker build -t learn-with-365 .
docker run -p 3000:80 learn-with-365
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
