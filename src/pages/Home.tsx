import React from 'react';
import { 
  makeStyles, 
  tokens, 
  Button,
  Text,
  Card,
  CardHeader,
  Body1,
  Subtitle1,
  Title2,
  Display
} from '@fluentui/react-components';
import { 
  Flash24Filled, 
  Shield24Filled, 
  Cloud24Filled,
  ArrowRight24Regular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  home: {
    minHeight: '100vh',
  },
  hero: {
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorBrandBackgroundPressed} 100%)`,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: `${tokens.spacingVerticalXXXL} 0`,
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXXXL,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '500px',
  },
  heroTitle: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.spacingVerticalXL,
    lineHeight: '1.2',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase300,
    marginBottom: tokens.spacingVerticalXL,
    opacity: '0.9',
    lineHeight: '1.6',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  heroButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForegroundOnBrand,
    border: `2px solid ${tokens.colorNeutralForegroundOnBrand}`,
  },
  heroImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPlaceholder: {
    width: '300px',
    height: '300px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '6rem',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
  },
  featuresPreview: {
    padding: `${tokens.spacingVerticalXXXL} 0`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground1,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  featureCard: {
    padding: tokens.spacingVerticalXL,
    textAlign: 'center',
    height: 'fit-content',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: tokens.spacingVerticalM,
    display: 'flex',
    justifyContent: 'center',
  },
  cta: {
    background: `linear-gradient(135deg, ${tokens.colorNeutralBackground1} 0%, ${tokens.colorNeutralBackground3} 100%)`,
    padding: `${tokens.spacingVerticalXXXL} 0`,
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  ctaText: {
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground2,
  },
});

const Home: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Display className={styles.heroTitle}>
              Welcome to Your Azure Static Web App
            </Display>
            <Text className={styles.heroSubtitle}>
              Built with React, TypeScript, and Azure Functions for a modern, scalable web experience.
            </Text>
            <div className={styles.heroButtons}>
              <Button 
                appearance="primary" 
                size="large"
                icon={<ArrowRight24Regular />}
                iconPosition="after"
                className={styles.primaryButton}
              >
                Get Started
              </Button>
              <Button 
                appearance="outline" 
                size="large"
                className={styles.outlineButton}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroPlaceholder}>
              <span>🚀</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className={styles.featuresPreview}>
        <div className={styles.container}>
          <Title2 className={styles.sectionTitle}>Key Features</Title2>
          <div className={styles.featuresGrid}>
            <Card className={styles.featureCard}>
              <CardHeader
                header={
                  <div>
                    <div className={styles.featureIcon}>
                      <Flash24Filled color={tokens.colorPaletteYellowForeground2} />
                    </div>
                    <Subtitle1>Fast & Responsive</Subtitle1>
                  </div>
                }
              />
              <Body1>
                Lightning-fast performance with responsive design that works on all devices.
              </Body1>
            </Card>

            <Card className={styles.featureCard}>
              <CardHeader
                header={
                  <div>
                    <div className={styles.featureIcon}>
                      <Shield24Filled color={tokens.colorPaletteGreenForeground2} />
                    </div>
                    <Subtitle1>Secure</Subtitle1>
                  </div>
                }
              />
              <Body1>
                Built-in security features with Azure Active Directory integration support.
              </Body1>
            </Card>

            <Card className={styles.featureCard}>
              <CardHeader
                header={
                  <div>
                    <div className={styles.featureIcon}>
                      <Cloud24Filled color={tokens.colorPaletteBlueForeground2} />
                    </div>
                    <Subtitle1>Cloud-Native</Subtitle1>
                  </div>
                }
              />
              <Body1>
                Leverages Azure's global infrastructure for optimal performance and scalability.
              </Body1>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Title2 className={styles.ctaTitle}>Ready to Get Started?</Title2>
            <Body1 className={styles.ctaText}>
              Explore our features and see how we can help you build amazing web applications.
            </Body1>
            <Button 
              appearance="primary" 
              size="large"
              icon={<ArrowRight24Regular />}
              iconPosition="after"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;