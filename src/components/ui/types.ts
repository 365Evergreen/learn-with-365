// Common types used across UI components

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SizeVariant {
  size?: 'small' | 'medium' | 'large';
}

export interface ColorVariant {
  color?: 'brand' | 'success' | 'warning' | 'error' | 'neutral';
}

export interface InteractiveProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export interface LayoutProps {
  fullWidth?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type SelectChangeHandler = (value: string | string[]) => void;

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';
export type Elevation = 'none' | 'low' | 'medium' | 'high';

// Responsive breakpoints
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Animation types
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

// Data table types
export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

export interface FormField {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule;
  required?: boolean;
}

// Navigation types
export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactElement;
  href?: string;
  onClick?: () => void;
  children?: NavigationItem[];
  disabled?: boolean;
}

// Toast/Notification types
export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  actions?: Array<{ label: string; onClick: () => void }>;
}