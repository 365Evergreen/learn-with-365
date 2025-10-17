import React from 'react';
import {
  Input as FluentInput,
  Field,
  Label,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  contentBefore?: React.ReactElement;
  contentAfter?: React.ReactElement;
}

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS,
  },
  helperText: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS,
  },
});

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  helperText,
  type = 'text',
  size = 'medium',
  fullWidth = false,
  className = '',
  contentBefore,
  contentAfter,
}) => {
  const styles = useStyles();
  
  const hasError = Boolean(error);
  
  const inputElement = (
    <FluentInput
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      type={type}
      size={size}
      className={fullWidth ? styles.fullWidth : ''}
      contentBefore={contentBefore}
      contentAfter={contentAfter}
    />
  );

  if (!label && !error && !helperText) {
    return inputElement;
  }

  return (
    <Field
      className={className}
      required={required}
      validationState={hasError ? 'error' : 'none'}
    >
      {label && <Label>{label}</Label>}
      {inputElement}
      {error && <div className={styles.errorText}>{error}</div>}
      {!error && helperText && <div className={styles.helperText}>{helperText}</div>}
    </Field>
  );
};

export default Input;