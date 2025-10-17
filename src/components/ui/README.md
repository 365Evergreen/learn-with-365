# Design System Components

A comprehensive collection of React components built with Microsoft Fluent UI for app owners to easily integrate into their applications.

## 📦 Available Components

All components are fully typed with TypeScript and follow Fluent UI design principles.

### Core Components

- **Button** - Customizable button with variants, sizes, icons, and loading states
- **Card** - Flexible card container with header and preview sub-components
- **Input** - Form input field with validation, labels, and helper text
- **Modal** - Dialog modal with customizable sizes and action buttons
- **Dropdown** - Select dropdown with search capabilities and validation
- **Avatar** - User avatar with click handling and badge support
- **Badge** - Status indicators with Counter and Presence variants
- **ProgressBar** - Progress indication with labels and descriptions
- **Spinner** - Loading indicators with configurable labels

## 🚀 Quick Start

### 1. Import Components

```tsx
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  Dropdown, 
  Avatar, 
  Badge, 
  ProgressBar, 
  Spinner 
} from '../components/ui';
```

### 2. Use in Your App

```tsx
function MyApp() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click Me
      </Button>
      
      <Card>
        <Card.Header>
          <h3>Card Title</h3>
        </Card.Header>
        <p>Card content goes here...</p>
      </Card>
      
      <Input 
        label="Email"
        placeholder="Enter your email"
        type="email"
        required
      />
    </div>
  );
}
```

## 📖 Component Usage

### Button

```tsx
// Basic usage
<Button>Default Button</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// With sizes and icons
<Button size="large" icon={<AddIcon />}>
  Add Item
</Button>

// Loading state
<Button loading>Processing...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

### Card

```tsx
// Basic card
<Card>
  <p>Simple card content</p>
</Card>

// Interactive card with hover effects
<Card interactive>
  <p>Clickable card</p>
</Card>

// Card with header
<Card>
  <Card.Header>
    <Avatar name="John Doe" size={32} />
    <div>
      <h4>John Doe</h4>
      <p>Software Developer</p>
    </div>
  </Card.Header>
  <p>Card content...</p>
</Card>
```

### Input

```tsx
// Basic input
<Input 
  label="Name"
  placeholder="Enter your name"
/>

// With validation
<Input 
  label="Email"
  type="email"
  required
  error="Please enter a valid email"
/>

// With helper text
<Input 
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

### Modal

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  size="medium"
  actions={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Dropdown

```tsx
const options = [
  { value: 'option1', label: 'First Option' },
  { value: 'option2', label: 'Second Option' },
];

<Dropdown
  label="Select Option"
  placeholder="Choose..."
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>
```

### Avatar

```tsx
// Basic avatar
<Avatar name="John Doe" size={40} />

// Square avatar
<Avatar name="Company" shape="square" size={48} />

// Clickable avatar
<Avatar 
  name="Jane Smith" 
  onClick={() => console.log('Avatar clicked')}
/>
```

### Badge

```tsx
// Basic badges
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="danger">Error</Badge>

// Counter badge
<Badge.Counter count={5} />

// Presence badge
<Badge.Presence status="available" />
```

### ProgressBar

```tsx
// Determinate progress
<ProgressBar 
  label="Upload Progress"
  value={0.75}
  description="75% complete"
/>

// Indeterminate progress
<ProgressBar 
  label="Processing"
  indeterminate
  description="Please wait..."
/>
```

### Spinner

```tsx
// Basic spinners
<Spinner size="small" />
<Spinner size="medium" label="Loading..." />
<Spinner size="large" label="Processing data..." />

// With label positioning
<Spinner label="Loading..." labelPosition="below" />
```

## 🎨 Customization

All components support custom styling through:

- **className prop** - Add custom CSS classes
- **style prop** - Inline styles for quick customization
- **Fluent UI tokens** - Use design system tokens for consistent theming

```tsx
import { tokens } from '@fluentui/react-components';

<Button 
  style={{ 
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand
  }}
>
  Custom Styled Button
</Button>
```

## 🔧 TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  // ... and more
}
```

## 📁 Component Structure

```txt
src/components/ui/
├── Button.tsx          # Customizable button component
├── Card.tsx            # Flexible card container
├── Input.tsx           # Form input with validation
├── Modal.tsx           # Dialog modal component
├── Dropdown.tsx        # Select dropdown component
├── Avatar.tsx          # User avatar component
├── Badge.tsx           # Status indicator badges
├── ProgressBar.tsx     # Progress indication
├── Spinner.tsx         # Loading indicators
├── types.ts            # Shared TypeScript types
└── index.ts            # Main export file
```

## 🧪 Example Usage

Check out `src/pages/ComponentShowcase.tsx` for a comprehensive example showing all components in action with various configurations and use cases.

## 🚀 Getting Started

1. Components are already available in your project
2. Import the components you need from `'../components/ui'`
3. Use them in your React components with full TypeScript support
4. Customize with props, className, or Fluent UI tokens

## 📝 Best Practices

- Use semantic HTML structure with components
- Leverage TypeScript for better development experience
- Follow Fluent UI design guidelines for consistency
- Use proper error handling with form components
- Implement loading states for better user experience

## 🤝 Contributing

To add new components:

1. Create component file in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Add TypeScript interfaces to `types.ts` if needed
4. Update this README with usage examples

Happy coding! 🎉