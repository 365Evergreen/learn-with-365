import React from 'react';
import {
  Card as FluentCard,
  CardHeader as FluentCardHeader,
  CardPreview as FluentCardPreview,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardPreviewProps {
  children: React.ReactNode;
  className?: string;
}

const useStyles = makeStyles({
  interactive: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow8,
    },
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

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Preview: React.FC<CardPreviewProps>;
} = ({
  children,
  className = '',
  elevation = 'medium',
  interactive = false,
  padding = 'medium',
}) => {
  const styles = useStyles();
  
  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  }[padding];

  const combinedClassName = [
    className,
    interactive && styles.interactive,
    paddingClass,
  ].filter(Boolean).join(' ');

  return (
    <FluentCard className={combinedClassName}>
      {children}
    </FluentCard>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <FluentCardHeader className={className}>
    {children}
  </FluentCardHeader>
);

const CardPreview: React.FC<CardPreviewProps> = ({ children, className = '' }) => (
  <FluentCardPreview className={className}>
    {children}
  </FluentCardPreview>
);

Card.Header = CardHeader;
Card.Preview = CardPreview;

export default Card;
export { CardHeader, CardPreview };