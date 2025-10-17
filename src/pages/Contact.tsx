import React, { useState } from 'react';
import { 
  makeStyles, 
  tokens, 
  Button,
  Card,
  CardHeader,
  Body1,
  Subtitle1,
  Title2,
  Display,
  Input,
  Textarea,
  Label,
  Field
} from '@fluentui/react-components';
import { 
  Mail24Regular, 
  Chat24Regular, 
  Book24Regular,
  Clock24Regular,
  Send24Regular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  contact: {
    padding: `${tokens.spacingVerticalXL} 0`,
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
  },
  contactHeader: {
    textAlign: 'center',
    padding: `${tokens.spacingVerticalXXXL} 0`,
    background: `linear-gradient(135deg, ${tokens.colorNeutralBackground1} 0%, ${tokens.colorNeutralBackground3} 100%)`,
    margin: `-${tokens.spacingVerticalXL} -${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXXXL} -${tokens.spacingHorizontalXL}`,
    borderRadius: `0 0 ${tokens.borderRadiusXLarge} ${tokens.borderRadiusXLarge}`,
  },
  headerTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  headerSubtitle: {
    color: tokens.colorNeutralForeground2,
  },
  contactContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: tokens.spacingHorizontalXXXL,
    marginBottom: tokens.spacingVerticalXXXL,
  },
  formSection: {
    '& h2': {
      marginBottom: tokens.spacingVerticalXL,
      color: tokens.colorNeutralForeground1,
    },
  },
  contactForm: {
    padding: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  formField: {
    marginBottom: tokens.spacingVerticalL,
  },
  submitButton: {
    width: '100%',
    marginTop: tokens.spacingVerticalM,
  },
  contactInfo: {
    '& h2': {
      marginBottom: tokens.spacingVerticalXL,
      color: tokens.colorNeutralForeground1,
    },
  },
  infoCards: {
    marginBottom: tokens.spacingVerticalXL,
  },
  infoCard: {
    padding: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalM,
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  infoIcon: {
    fontSize: '2rem',
    marginBottom: tokens.spacingVerticalS,
    display: 'flex',
    justifyContent: 'center',
  },
  responseTime: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusLarge,
  },
  responseList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    '& li': {
      padding: `${tokens.spacingVerticalS} 0`,
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
      color: tokens.colorNeutralForeground2,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  faqPreview: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXL}`,
    margin: `0 -${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground1,
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  faqItem: {
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
  },
});

const Contact: React.FC = () => {
  const styles = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (field: string) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.contactHeader}>
          <Display className={styles.headerTitle}>Get In Touch</Display>
          <Body1 className={styles.headerSubtitle}>
            Have questions or want to learn more? We'd love to hear from you!
          </Body1>
        </section>

        <div className={styles.contactContent}>
          {/* Contact Form */}
          <section className={styles.formSection}>
            <Title2>Send us a Message</Title2>
            <Card className={styles.contactForm}>
              <form onSubmit={handleSubmit}>
                <Field className={styles.formField}>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                    placeholder="Your full name"
                  />
                </Field>
                
                <Field className={styles.formField}>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    placeholder="your.email@example.com"
                  />
                </Field>
                
                <Field className={styles.formField}>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    required
                    placeholder="What's this about?"
                  />
                </Field>
                
                <Field className={styles.formField}>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange('message')}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                  />
                </Field>
                
                <Button 
                  type="submit" 
                  appearance="primary" 
                  size="large"
                  icon={<Send24Regular />}
                  className={styles.submitButton}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </section>

          {/* Contact Info */}
          <section className={styles.contactInfo}>
            <Title2>Other Ways to Reach Us</Title2>
            
            <div className={styles.infoCards}>
              <Card className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Mail24Regular />
                </div>
                <Subtitle1>Email</Subtitle1>
                <Body1>info@yourswa.com</Body1>
                <Body1>For general inquiries and support</Body1>
              </Card>
              
              <Card className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Chat24Regular />
                </div>
                <Subtitle1>Live Chat</Subtitle1>
                <Body1>Available 24/7</Body1>
                <Body1>Get instant help from our team</Body1>
              </Card>
              
              <Card className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Book24Regular />
                </div>
                <Subtitle1>Documentation</Subtitle1>
                <Body1>Comprehensive guides</Body1>
                <Body1>Learn how to get the most out of our platform</Body1>
              </Card>
            </div>

            <Card className={styles.responseTime}>
              <CardHeader
                header={
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Clock24Regular />
                    <Subtitle1>Response Times</Subtitle1>
                  </div>
                }
              />
              <ul className={styles.responseList}>
                <li><strong>Email:</strong> Within 24 hours</li>
                <li><strong>Live Chat:</strong> Immediate</li>
                <li><strong>Bug Reports:</strong> Within 4 hours</li>
                <li><strong>Feature Requests:</strong> Within 48 hours</li>
              </ul>
            </Card>
          </section>
        </div>

        {/* FAQ Section */}
        <section className={styles.faqPreview}>
          <Title2 className={styles.sectionTitle}>Frequently Asked Questions</Title2>
          <div className={styles.faqGrid}>
            <Card className={styles.faqItem}>
              <Subtitle1>How do I deploy my application?</Subtitle1>
              <Body1>Simply push your code to GitHub and our automated CI/CD pipeline will handle the rest!</Body1>
            </Card>
            <Card className={styles.faqItem}>
              <Subtitle1>Is my data secure?</Subtitle1>
              <Body1>Yes, we use enterprise-grade security with Azure AD integration and SSL encryption.</Body1>
            </Card>
            <Card className={styles.faqItem}>
              <Subtitle1>What's included in the free tier?</Subtitle1>
              <Body1>The free tier includes 100GB bandwidth and 0.5GB storage per month.</Body1>
            </Card>
            <Card className={styles.faqItem}>
              <Subtitle1>Can I use custom domains?</Subtitle1>
              <Body1>Absolutely! You can configure custom domains through the Azure portal.</Body1>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;