import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  makeStyles, 
  tokens, 
  Text,
  Toolbar,
  ToolbarButton,
  Badge,
  Button
} from '@fluentui/react-components';
import { 
  Home24Regular, 
  Book24Regular, 
  Info24Regular, 
  Mail24Regular,
  Person24Regular,
  Settings24Regular,
  Apps24Regular
} from '@fluentui/react-icons';
import { useAuth, UserProfile, AuthProvider } from './auth';

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: 0,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: tokens.shadow2,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  brandLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  brandText: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  logoIcon: {
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  navButton: {
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  activeButton: {
    backgroundColor: tokens.colorBrandBackgroundPressed,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
  userActions: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  quickLogin: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
  },
});

const Header: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleQuickLogin = async (provider: AuthProvider) => {
    await login(provider);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home24Regular },
    { path: '/courses', label: 'Courses', icon: Book24Regular },
    { path: '/about', label: 'About', icon: Info24Regular },
    { path: '/contact', label: 'Contact', icon: Mail24Regular },
    ...(isAuthenticated ? [
      { path: '/my-profile', label: 'My Profile', icon: Person24Regular },
      { path: '/components', label: 'Components', icon: Apps24Regular }
    ] : []),
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link to="/" className={styles.brandLink}>
            <span className={styles.logoIcon}>🎓</span>
            <Text className={styles.brandText}>EduPlatform</Text>
          </Link>
        </div>
        <Toolbar className={styles.nav}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path} style={{ textDecoration: 'none' }}>
              <ToolbarButton
                icon={<Icon />}
                className={`${styles.navButton} ${isActive(path) ? styles.activeButton : ''}`}
              >
                {label}
              </ToolbarButton>
            </Link>
          ))}
        </Toolbar>
        
        <div className={styles.userActions}>
          {isAuthenticated && (
            <div className={styles.notificationBadge}>
              <ToolbarButton 
                aria-label="Settings"
                icon={<Settings24Regular />}
                className={styles.navButton}
              />
              <Badge 
                size="small" 
                className={styles.badge}
              >
                3
              </Badge>
            </div>
          )}
          
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <div className={styles.quickLogin}>
              <Button 
                appearance="outline"
                icon={<Person24Regular />}
                size="medium"
                onClick={() => handleQuickLogin(AuthProvider.AzureAD)}
              >
                Organization
              </Button>
              
              <Button 
                appearance="primary"
                size="medium"
                onClick={() => handleQuickLogin(AuthProvider.AzureB2C)}
              >
                Personal
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;