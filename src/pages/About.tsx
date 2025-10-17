import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Header Section */}
        <section className="about-header">
          <h1>About Our Platform</h1>
          <p className="about-intro">
            We're building the future of web applications with cutting-edge Azure technologies 
            and modern development practices.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To provide developers with powerful, scalable, and secure web application 
                solutions using Azure Static Web Apps and modern JavaScript frameworks.
              </p>
              <p>
                We believe in creating fast, reliable, and user-friendly applications that 
                leverage the full power of cloud computing while maintaining simplicity and ease of use.
              </p>
            </div>
            <div className="mission-image">
              <div className="placeholder-image">
                <span>🎯</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="tech-stack">
          <h2>Our Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-icon">⚛️</div>
              <h3>React</h3>
              <p>Modern UI library for building interactive user interfaces</p>
            </div>
            <div className="tech-item">
              <div className="tech-icon">📘</div>
              <h3>TypeScript</h3>
              <p>Type-safe JavaScript for better development experience</p>
            </div>
            <div className="tech-item">
              <div className="tech-icon">☁️</div>
              <h3>Azure Functions</h3>
              <p>Serverless compute service for building scalable APIs</p>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🌐</div>
              <h3>Azure Static Web Apps</h3>
              <p>Global hosting with built-in CI/CD and authentication</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🚀 Innovation</h3>
              <p>Always exploring new technologies and best practices to deliver cutting-edge solutions.</p>
            </div>
            <div className="value-card">
              <h3>🔒 Security</h3>
              <p>Security-first approach with enterprise-grade protection and compliance.</p>
            </div>
            <div className="value-card">
              <h3>⚡ Performance</h3>
              <p>Optimized for speed and efficiency with global content delivery networks.</p>
            </div>
            <div className="value-card">
              <h3>🤝 Collaboration</h3>
              <p>Built for teams with seamless integration and development workflows.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;