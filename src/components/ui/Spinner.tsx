import React from 'react';
import {
  Spinner as FluentSpinner,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface SpinnerProps {
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  label?: string;
  labelPosition?: 'above' | 'below' | 'before' | 'after';
  className?: string;
}

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  vertical: {
    flexDirection: 'column',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
});

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  label,
  labelPosition = 'after',
  className = '',
}) => {
  const styles = useStyles();
  
  const isVertical = labelPosition === 'above' || labelPosition === 'below';
  const labelFirst = labelPosition === 'above' || labelPosition === 'before';
  
  const containerClass = [
    styles.container,
    isVertical && styles.vertical,
    className,
  ].filter(Boolean).join(' ');
  
  const spinner = <FluentSpinner size={size} />;
  const labelElement = label ? <span className={styles.label}>{label}</span> : null;
  
  if (!label) {
    return spinner;
  }
  
  return (
    <div className={containerClass}>
      {labelFirst && labelElement}
      {spinner}
      {!labelFirst && labelElement}
    </div>
  );
};

export default Spinner;