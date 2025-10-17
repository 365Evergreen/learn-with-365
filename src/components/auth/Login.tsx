import React, { useState } from 'react';
import {
  Button,
  Card,
  Title1,
  Title3,
  Body1,
  Caption1,
  Spinner,
  RadioGroup,
  Radio,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { AuthProvider } from '../../config/authConfig';
import { useAuth } from '../../contexts/AuthContext';
import {
  Building24Regular,
  People24Regular,
  Shield24Regular,
  ErrorCircle24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalL,
  },
  loginCard: {
    width: '100%',
    maxWidth: '420px',
    padding: tokens.spacingVerticalXXL,
  },
  header: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXL,
  },
  providerSection: {
    marginBottom: tokens.spacingVerticalL,
  },
  providerOption: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalS,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  selectedProvider: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  providerIcon: {
    color: tokens.colorBrandForeground1,
  },
  providerText: {
    flex: 1,
  },
  loginButton: {
    width: '100%',
    marginTop: tokens.spacingVerticalL,
  },
  errorAlert: {
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorPaletteRedBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorPaletteRedBorder2}`,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  description: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground2,
  },
});

const Login: React.FC = () => {
  const styles = useStyles();
  const { login, isLoading, error } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<AuthProvider>(AuthProvider.AzureAD);

  const handleLogin = async () => {
    await login(selectedProvider);
  };

  const providerOptions = [
    {
      value: AuthProvider.AzureAD,
      label: 'Organization Account',
      description: 'Sign in with your organizational Azure AD account',
      icon: <Building24Regular className={styles.providerIcon} />,
    },
    {
      value: AuthProvider.AzureB2C,
      label: 'Personal Account',
      description: 'Sign in with your personal account or create a new one',
      icon: <People24Regular className={styles.providerIcon} />,
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <Shield24Regular 
            style={{ 
              fontSize: '48px', 
              color: tokens.colorBrandForeground1,
              marginBottom: tokens.spacingVerticalM 
            }} 
          />
          <Title1>Welcome Back</Title1>
          <Body1 className={styles.description}>
            Sign in to access your learning platform
          </Body1>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <ErrorCircle24Regular />
            <Body1 className={styles.errorText}>{error}</Body1>
          </div>
        )}

        <div className={styles.providerSection}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>
            Choose your account type
          </Title3>
          
          <RadioGroup
            value={selectedProvider}
            onChange={(_, data) => setSelectedProvider(data.value as AuthProvider)}
          >
            {providerOptions.map((option) => (
              <div
                key={option.value}
                className={`${styles.providerOption} ${
                  selectedProvider === option.value ? styles.selectedProvider : ''
                }`}
                onClick={() => setSelectedProvider(option.value)}
              >
                <Radio value={option.value} />
                {option.icon}
                <div className={styles.providerText}>
                  <Body1>{option.label}</Body1>
                  <Caption1>{option.description}</Caption1>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          appearance="primary"
          size="large"
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner size="tiny" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>

        <Caption1 style={{ textAlign: 'center', marginTop: tokens.spacingVerticalL }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Caption1>
      </Card>
    </div>
  );
};

export default Login;
