import React from 'react';
import {
  Badge as FluentBadge,
  CounterBadge,
  PresenceBadge,
  makeStyles
} from '@fluentui/react-components';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'filled' | 'outline' | 'tint' | 'ghost';
  color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  className?: string;
}

export interface CounterBadgeProps {
  count: number;
  max?: number;
  showZero?: boolean;
  className?: string;
}

export interface PresenceBadgeProps {
  status: 'available' | 'away' | 'busy' | 'do-not-disturb' | 'offline' | 'out-of-office';
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  className?: string;
}

const useStyles = makeStyles({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

const Badge: React.FC<BadgeProps> & {
  Counter: React.FC<CounterBadgeProps>;
  Presence: React.FC<PresenceBadgeProps>;
} = ({
  children,
  variant = 'filled',
  color = 'brand',
  size = 'medium',
  className = '',
}) => {
  const styles = useStyles();
  
  return (
    <FluentBadge
      appearance={variant}
      color={color}
      size={size}
      className={`${styles.badge} ${className}`}
    >
      {children}
    </FluentBadge>
  );
};

const Counter: React.FC<CounterBadgeProps> = ({
  count,
  max = 99,
  showZero = false,
  className = '',
}) => {
  return (
    <CounterBadge
      count={count}
      overflowCount={max}
      showZero={showZero}
      className={className}
    />
  );
};

const Presence: React.FC<PresenceBadgeProps> = ({
  status,
  size = 'medium',
  className = '',
}) => {
  return (
    <PresenceBadge
      status={status}
      size={size}
      className={className}
    />
  );
};

Badge.Counter = Counter;
Badge.Presence = Presence;

export default Badge;
export { Counter as CounterBadge, Presence as PresenceBadge };