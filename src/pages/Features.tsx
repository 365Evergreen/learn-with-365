import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  return (
    <div className="features">
      <div className="container">
        {/* Header */}
        <section className="features-header">
          <h1>Platform Features</h1>
          <p>Discover the powerful capabilities that make our Azure Static Web App stand out</p>
        </section>

        {/* Main Features */}
        <section className="main-features">
          <div className="feature-highlight">
            <div className="feature-content">
              <h2>⚡ Lightning Fast Performance</h2>
              <p>
                Built on Azure's global CDN network, our applications deliver content at blazing speeds 
                to users worldwide. With optimized bundling and lazy loading, your users experience 
                near-instantaneous page loads.
              </p>
              <ul>
                <li>Global content delivery network</li>
                <li>Optimized asset bundling</li>
                <li>Lazy loading and code splitting</li>
                <li>Progressive Web App capabilities</li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="performance-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{width: '95%'}}></div>
                </div>
                <span>95% Performance Score</span>
              </div>
            </div>
          </div>

          <div className="feature-highlight reverse">
            <div className="feature-content">
              <h2>🔒 Enterprise Security</h2>
              <p>
                Security is built into every layer of our platform. From Azure Active Directory 
                integration to automated security scanning, your applications are protected by 
                enterprise-grade security measures.
              </p>
              <ul>
                <li>Azure AD authentication integration</li>
                <li>Role-based access control</li>
                <li>SSL/TLS encryption by default</li>
                <li>Automated security vulnerability scanning</li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="security-shield">
                <span>🛡️</span>
              </div>
            </div>
          </div>

          <div className="feature-highlight">
            <div className="feature-content">
              <h2>🚀 Seamless Deployment</h2>
              <p>
                Deploy with confidence using our integrated CI/CD pipeline. Every push triggers 
                automated builds, tests, and deployments, ensuring your applications are always 
                up-to-date and reliable.
              </p>
              <ul>
                <li>GitHub Actions integration</li>
                <li>Automated testing and quality checks</li>
                <li>Preview deployments for pull requests</li>
                <li>Zero-downtime deployments</li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="deployment-pipeline">
                <div className="pipeline-step">Code</div>
                <div className="pipeline-arrow">→</div>
                <div className="pipeline-step">Build</div>
                <div className="pipeline-arrow">→</div>
                <div className="pipeline-step">Deploy</div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="features-grid">
          <h2>Additional Capabilities</h2>
          <div className="grid">
            <div className="feature-card">
              <div className="card-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Fully responsive design that works perfectly on all devices and screen sizes.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🔧</div>
              <h3>Easy Configuration</h3>
              <p>Simple configuration files for routing, security, and deployment settings.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">📊</div>
              <h3>Analytics Ready</h3>
              <p>Built-in integration with Azure Application Insights for comprehensive monitoring.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🌍</div>
              <h3>Global Scale</h3>
              <p>Automatically scaled across Azure's global infrastructure for optimal performance.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">💰</div>
              <h3>Cost Effective</h3>
              <p>Pay only for what you use with Azure's consumption-based pricing model.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🔄</div>
              <h3>API Integration</h3>
              <p>Seamless integration with Azure Functions for serverless backend functionality.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;