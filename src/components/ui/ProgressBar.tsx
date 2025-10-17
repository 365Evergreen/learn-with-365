import React from 'react';
import {
  ProgressBar as FluentProgressBar,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface ProgressBarProps {
  value?: number; // 0-1 for determinate progress
  max?: number;
  indeterminate?: boolean;
  thickness?: 'medium' | 'large';
  shape?: 'rounded' | 'square';
  color?: 'brand' | 'success' | 'warning' | 'error';
  className?: string;
  label?: string;
  description?: string;
}

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    marginTop: tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
  },
  percentage: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 1,
  indeterminate = false,
  thickness = 'medium',
  shape = 'rounded',
  color = 'brand',
  className = '',
  label,
  description,
}) => {
  const styles = useStyles();
  
  const percentage = value ? Math.round((value / max) * 100) : 0;
  
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <div className={styles.label}>
          <span>{label}</span>
          {!indeterminate && value !== undefined && (
            <span className={styles.percentage}>{percentage}%</span>
          )}
        </div>
      )}
      <FluentProgressBar
        value={indeterminate ? undefined : value}
        max={max}
        thickness={thickness}
        shape={shape}
        color={color}
      />
      {description && (
        <div className={styles.description}>
          {description}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;