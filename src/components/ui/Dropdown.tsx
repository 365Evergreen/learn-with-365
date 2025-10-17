import React from 'react';
import {
  Dropdown as FluentDropdown,
  Option,
  Field,
  Label,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  options: DropdownOption[];
  onChange?: (value: string | undefined) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  multiselect?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  fullWidth?: boolean;
  className?: string;
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

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  defaultValue,
  options,
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
  multiselect = false,
  searchable = false,
  clearable = false,
  fullWidth = false,
  className = '',
}) => {
  const styles = useStyles();
  
  const hasError = Boolean(error);
  
  const handleSelectionChange = (event: any, data: any) => {
    if (onChange) {
      onChange(data.optionValue);
    }
  };
  
  const selectedOption = options.find(opt => opt.value === value);
  
  const dropdownElement = (
    <FluentDropdown
      placeholder={placeholder}
      value={selectedOption?.label || ''}
      onOptionSelect={handleSelectionChange}
      disabled={disabled}
      multiselect={multiselect}
      clearable={clearable}
      className={fullWidth ? styles.fullWidth : ''}
    >
      {options.map((option) => (
        <Option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </Option>
      ))}
    </FluentDropdown>
  );

  if (!label && !error && !helperText) {
    return dropdownElement;
  }

  return (
    <Field
      className={className}
      required={required}
      validationState={hasError ? 'error' : 'none'}
    >
      {label && <Label>{label}</Label>}
      {dropdownElement}
      {error && <div className={styles.errorText}>{error}</div>}
      {!error && helperText && <div className={styles.helperText}>{helperText}</div>}
    </Field>
  );
};

export default Dropdown;