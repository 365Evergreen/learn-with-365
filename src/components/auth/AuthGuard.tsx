import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import { Spinner, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  loadingText: {
    color: tokens.colorNeutralForeground2,
  },
});

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedUserTypes?: string[];
  fallback?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true,
  allowedUserTypes,
  fallback
}) => {
  const styles = useStyles();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If user is not authenticated, show login or fallback
  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : <Login />;
  }

  // Check if user type is allowed
  if (allowedUserTypes && user && !allowedUserTypes.includes(user.userType)) {
    return (
      <div className={styles.loadingContainer}>
        <div>Access Denied</div>
        <div className={styles.loadingText}>
          Your account type is not authorized to access this resource.
        </div>
      </div>
    );
  }

  // User is authenticated and authorized, render children
  return <>{children}</>;
};

export default AuthGuard;
