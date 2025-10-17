#!/usr/bin/env pwsh

# E-Learning Platform Deployment Script
# Supports Azure Static Web Apps, Netlify, and Docker deployments

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("azure", "netlify", "docker", "local")]
    [string]$Target,
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Verbose = $false
)

# Set error handling
$ErrorActionPreference = "Stop"

# Colors for output
$Green = "\033[32m"
$Red = "\033[31m"
$Yellow = "\033[33m"
$Blue = "\033[34m"
$Reset = "\033[0m"

function Write-ColorOutput {
    param($Message, $Color = $Reset)
    Write-Host "$Color$Message$Reset"
}

function Test-Prerequisites {
    Write-ColorOutput "🔍 Checking prerequisites..." $Blue
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-ColorOutput "✅ Node.js: $nodeVersion" $Green
    } catch {
        Write-ColorOutput "❌ Node.js not found. Please install Node.js 18+" $Red
        exit 1
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-ColorOutput "✅ npm: $npmVersion" $Green
    } catch {
        Write-ColorOutput "❌ npm not found" $Red
        exit 1
    }
    
    # Check environment file
    if ($Environment -eq "production" -and -not (Test-Path ".env.production")) {
        if (Test-Path ".env.example") {
            Write-ColorOutput "⚠️  No .env.production found. Using .env.example as template" $Yellow
            Copy-Item ".env.example" ".env.production"
            Write-ColorOutput "📝 Please update .env.production with your production values" $Yellow
        } else {
            Write-ColorOutput "❌ No environment configuration found" $Red
            exit 1
        }
    }
}

function Install-Dependencies {
    if ($SkipBuild) {
        Write-ColorOutput "⏭️  Skipping dependency installation" $Yellow
        return
    }
    
    Write-ColorOutput "📦 Installing dependencies..." $Blue
    npm ci --legacy-peer-deps
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Failed to install dependencies" $Red
        exit 1
    }
    
    Write-ColorOutput "✅ Dependencies installed" $Green
}

function Build-Application {
    if ($SkipBuild) {
        Write-ColorOutput "⏭️  Skipping application build" $Yellow
        return
    }
    
    Write-ColorOutput "🔨 Building application for $Environment..." $Blue
    
    $env:NODE_ENV = $Environment
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Build failed" $Red
        exit 1
    }
    
    Write-ColorOutput "✅ Application built successfully" $Green
}

function Deploy-Azure {
    Write-ColorOutput "☁️  Deploying to Azure Static Web Apps..." $Blue
    
    if (-not $env:AZURE_STATIC_WEB_APPS_API_TOKEN) {
        Write-ColorOutput "❌ AZURE_STATIC_WEB_APPS_API_TOKEN environment variable not set" $Red
        Write-ColorOutput "💡 Get your token from Azure Portal > Static Web Apps > Manage deployment token" $Yellow
        exit 1
    }
    
    # Install Azure Static Web Apps CLI if not present
    try {
        swa --version | Out-Null
    } catch {
        Write-ColorOutput "📦 Installing Azure Static Web Apps CLI..." $Blue
        npm install -g @azure/static-web-apps-cli
    }
    
    swa deploy --deployment-token $env:AZURE_STATIC_WEB_APPS_API_TOKEN
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Successfully deployed to Azure Static Web Apps" $Green
    } else {
        Write-ColorOutput "❌ Azure deployment failed" $Red
        exit 1
    }
}

function Deploy-Netlify {
    Write-ColorOutput "🌐 Deploying to Netlify..." $Blue
    
    if (-not $env:NETLIFY_AUTH_TOKEN -or -not $env:NETLIFY_SITE_ID) {
        Write-ColorOutput "❌ NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID environment variables required" $Red
        Write-ColorOutput "💡 Get these from Netlify dashboard" $Yellow
        exit 1
    }
    
    # Install Netlify CLI if not present
    try {
        netlify --version | Out-Null
    } catch {
        Write-ColorOutput "📦 Installing Netlify CLI..." $Blue
        npm install -g netlify-cli
    }
    
    netlify deploy --prod --dir=build --site=$env:NETLIFY_SITE_ID --auth=$env:NETLIFY_AUTH_TOKEN
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Successfully deployed to Netlify" $Green
    } else {
        Write-ColorOutput "❌ Netlify deployment failed" $Red
        exit 1
    }
}

function Deploy-Docker {
    Write-ColorOutput "🐳 Building and deploying Docker container..." $Blue
    
    # Check if Docker is available
    try {
        docker --version | Out-Null
    } catch {
        Write-ColorOutput "❌ Docker not found. Please install Docker" $Red
        exit 1
    }
    
    # Build Docker image
    $imageName = "elearning-platform:latest"
    docker build -t $imageName .
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Docker build failed" $Red
        exit 1
    }
    
    # Run container
    Write-ColorOutput "🚀 Starting Docker container..." $Blue
    docker run -d -p 3000:80 --name elearning-platform $imageName
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Docker container started successfully" $Green
        Write-ColorOutput "🌐 Application available at http://localhost:3000" $Blue
    } else {
        Write-ColorOutput "❌ Failed to start Docker container" $Red
        exit 1
    }
}

function Deploy-Local {
    Write-ColorOutput "💻 Starting local development server..." $Blue
    
    Write-ColorOutput "🌐 Application will be available at http://localhost:3000" $Blue
    npm start
}

# Main deployment flow
Write-ColorOutput "🚀 Starting deployment to $Target environment: $Environment" $Blue
Write-ColorOutput "=" * 60 $Blue

Test-Prerequisites
Install-Dependencies
Build-Application

switch ($Target) {
    "azure" { Deploy-Azure }
    "netlify" { Deploy-Netlify }
    "docker" { Deploy-Docker }
    "local" { Deploy-Local }
}

Write-ColorOutput "=" * 60 $Green
Write-ColorOutput "🎉 Deployment completed successfully!" $Green