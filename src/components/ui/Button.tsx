import React from 'react';
import { 
  Button as FluentButton, 
  makeStyles
} from '@fluentui/react-components';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactElement;
  type?: 'button' | 'submit' | 'reset';
}

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  loading: {
    cursor: 'not-allowed',
    opacity: '0.6',
  },
});

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  type = 'button',
}) => {
  const styles = useStyles();
  
  const appearance = variant === 'secondary' ? 'secondary' :
                   variant === 'outline' ? 'outline' :
                   variant === 'subtle' ? 'subtle' :
                   variant === 'transparent' ? 'transparent' :
                   'primary';

  const combinedClassName = [
    className,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
  ].filter(Boolean).join(' ');

  return (
    <FluentButton
      appearance={appearance}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClassName}
      icon={icon}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </FluentButton>
  );
};

export default Button;