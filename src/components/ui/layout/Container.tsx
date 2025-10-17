import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'small' | 'medium' | 'large';
  centered?: boolean;
  className?: string;
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  maxWidthSm: {
    maxWidth: '576px',
  },
  maxWidthMd: {
    maxWidth: '768px',
  },
  maxWidthLg: {
    maxWidth: '1200px',
  },
  maxWidthXl: {
    maxWidth: '1400px',
  },
  maxWidthFull: {
    maxWidth: '100%',
  },
  paddingNone: {
    padding: '0',
  },
  paddingSmall: {
    padding: tokens.spacingVerticalS,
  },
  paddingMedium: {
    padding: tokens.spacingVerticalM,
  },
  paddingLarge: {
    padding: tokens.spacingVerticalL,
  },
});

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'medium',
  centered = false,
  className = '',
}) => {
  const styles = useStyles();
  
  const maxWidthClass = {
    sm: styles.maxWidthSm,
    md: styles.maxWidthMd,
    lg: styles.maxWidthLg,
    xl: styles.maxWidthXl,
    full: styles.maxWidthFull,
  }[maxWidth];
  
  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  }[padding];
  
  const combinedClassName = [
    styles.container,
    maxWidthClass,
    paddingClass,
    centered && styles.centered,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Container;