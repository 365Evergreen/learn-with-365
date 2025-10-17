import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  Dropdown, 
  Avatar, 
  Badge, 
  ProgressBar, 
  Spinner 
} from '../components/ui';
import { makeStyles, tokens, Title2, Body1, Subtitle1 } from '@fluentui/react-components';
import { Add24Regular, Edit24Regular, Delete24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalXL,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
  },
  demoCard: {
    padding: tokens.spacingVerticalL,
  },
  componentDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    alignItems: 'flex-start',
  },
  inlineDemo: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const ComponentShowcase: React.FC = () => {
  const styles = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>();

  const dropdownOptions = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Title2>Design System Components</Title2>
        <Body1>Ready-to-use React components built with Fluent UI for app owners.</Body1>

        {/* Buttons Section */}
        <section className={styles.section}>
          <Subtitle1>Buttons</Subtitle1>
          <div className={styles.componentGrid}>
            <Card className={styles.demoCard}>
              <Body1>Button Variants</Body1>
              <div className={styles.componentDemo}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="subtle">Subtle Button</Button>
                <Button loading>Loading Button</Button>
              </div>
            </Card>
            
            <Card className={styles.demoCard}>
              <Body1>Button Sizes & Icons</Body1>
              <div className={styles.componentDemo}>
                <Button size="small" icon={<Add24Regular />}>Small</Button>
                <Button size="medium" icon={<Edit24Regular />}>Medium</Button>
                <Button size="large" icon={<Delete24Regular />}>Large</Button>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Form Components */}
        <section className={styles.section}>
          <Subtitle1>Form Components</Subtitle1>
          <div className={styles.componentGrid}>
            <Card className={styles.demoCard}>
              <Body1>Input Field</Body1>
              <div className={styles.componentDemo}>
                <Input 
                  label="Email Address"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  type="email"
                  helperText="We'll never share your email"
                />
                <Input 
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  required
                />
                <Input 
                  placeholder="Input with error"
                  error="This field is required"
                />
              </div>
            </Card>
            
            <Card className={styles.demoCard}>
              <Body1>Dropdown</Body1>
              <div className={styles.componentDemo}>
                <Dropdown
                  label="Select an option"
                  placeholder="Choose..."
                  options={dropdownOptions}
                  value={selectedOption}
                  onChange={setSelectedOption}
                />
                <Dropdown
                  placeholder="Dropdown with error"
                  options={dropdownOptions}
                  error="Please select an option"
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Display Components */}
        <section className={styles.section}>
          <Subtitle1>Display Components</Subtitle1>
          <div className={styles.componentGrid}>
            <Card className={styles.demoCard}>
              <Body1>Avatars & Badges</Body1>
              <div className={styles.inlineDemo}>
                <Avatar name="John Doe" size={32} />
                <Avatar name="Jane Smith" size={40} />
                <Avatar name="Bob Johnson" size={48} shape="square" />
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
                <Badge color="danger">Error</Badge>
              </div>
            </Card>
            
            <Card className={styles.demoCard}>
              <Body1>Progress & Loading</Body1>
              <div className={styles.componentDemo}>
                <ProgressBar 
                  label="Upload Progress" 
                  value={0.65} 
                  description="65% complete"
                />
                <ProgressBar 
                  label="Processing" 
                  indeterminate 
                  description="Please wait..."
                />
                <div className={styles.inlineDemo}>
                  <Spinner size="small" label="Loading..." />
                  <Spinner size="medium" />
                  <Spinner size="large" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Interactive Components */}
        <section className={styles.section}>
          <Subtitle1>Interactive Components</Subtitle1>
          <div className={styles.componentGrid}>
            <Card className={styles.demoCard}>
              <Body1>Modal Dialog</Body1>
              <div className={styles.componentDemo}>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Example Modal"
                  actions={
                    <>
                      <Button variant="outline" onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setModalOpen(false)}>
                        Save
                      </Button>
                    </>
                  }
                >
                  <Body1>
                    This is an example modal dialog with customizable content, 
                    title, and action buttons.
                  </Body1>
                </Modal>
              </div>
            </Card>
            
            <Card className={styles.demoCard} interactive>
              <Body1>Interactive Card</Body1>
              <div className={styles.componentDemo}>
                <Body1>This card has hover effects and can be clicked.</Body1>
                <Button size="small" variant="outline">Card Action</Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentShowcase;