# Utility Functions

Core utilities for the Saleshandy component library.

---

## `cn` — Class Name Merging

Merges Tailwind CSS classes with conditional logic and conflict resolution.

**Dependencies:**
- `clsx` — Conditional class names
- `tailwind-merge` — Deduplicates conflicting Tailwind classes

**Usage:**
```typescript
import { cn } from './utils/cn';

// Basic merge
cn('px-4 py-2', 'bg-blue-500')
// => 'px-4 py-2 bg-blue-500'

// Conditional classes
cn('px-4', { 'text-white': isActive, 'text-gray-500': !isActive })
// => 'px-4 text-white' (if isActive is true)

// Resolves conflicts (last one wins)
cn('px-2', 'px-4')
// => 'px-4'

cn('text-red-500', 'text-blue-500')
// => 'text-blue-500'

// In components with CVA
<button className={cn(buttonVariants({ variant, size }), className)} />
```

**Why this pattern?**
- `clsx` handles conditional classes elegantly
- `tailwind-merge` prevents Tailwind class conflicts (e.g., multiple padding values)
- This is the standard shadcn/ui pattern

---

## `polymorphic` — Polymorphic Component Types

Type utilities for components that accept an `as` prop to render as different HTML elements.

**Usage:**
```typescript
import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './utils/polymorphic';

type ButtonOwnProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

type ButtonProps<C extends React.ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<C, ButtonOwnProps>;

const Button = forwardRef(
  <C extends React.ElementType = 'button'>(
    { as, variant = 'primary', size = 'md', children, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
    return (
      <Component ref={ref} className={cn(buttonVariants({ variant, size }))} {...props}>
        {children}
      </Component>
    );
  }
);
```

**Example usage:**
```tsx
// Renders as <button>
<Button variant="primary">Click me</Button>

// Renders as <a> with full anchor props
<Button as="a" href="/dashboard">Go to Dashboard</Button>

// Renders as <div>
<Button as="div" onClick={handler}>Not a button</Button>
```

**Types:**
- `PolymorphicComponentProps<C, Props>` — Base polymorphic props
- `PolymorphicComponentPropsWithRef<C, Props>` — With ref support
- `PolymorphicRef<C>` — Ref type for the target element

---

## `keyboard` — Keyboard Event Utilities

Constants and helpers for keyboard event handling.

### Key Constants

```typescript
import { Keys } from './utils/keyboard';

Keys.Enter      // 'Enter'
Keys.Space      // ' '
Keys.Escape     // 'Escape'
Keys.Tab        // 'Tab'
Keys.ArrowUp    // 'ArrowUp'
Keys.ArrowDown  // 'ArrowDown'
Keys.ArrowLeft  // 'ArrowLeft'
Keys.ArrowRight // 'ArrowRight'
Keys.Home       // 'Home'
Keys.End        // 'End'
Keys.PageUp     // 'PageUp'
Keys.PageDown   // 'PageDown'
Keys.Backspace  // 'Backspace'
Keys.Delete     // 'Delete'
```

### Check Specific Key

```typescript
import { isKey, Keys } from './utils/keyboard';

onKeyDown={(e) => {
  if (isKey(e, Keys.Enter)) {
    handleSubmit();
  }
}}
```

### Check Multiple Keys

```typescript
import { isAnyKey, Keys } from './utils/keyboard';

onKeyDown={(e) => {
  if (isAnyKey(e, [Keys.Enter, Keys.Space])) {
    handleActivate();
  }
}}
```

### Activation Keys (Enter or Space)

```typescript
import { isActivationKey } from './utils/keyboard';

onKeyDown={(e) => {
  if (isActivationKey(e)) {
    handleClick();
  }
}}
```

### Arrow Keys

```typescript
import { isArrowKey } from './utils/keyboard';

onKeyDown={(e) => {
  if (isArrowKey(e)) {
    handleNavigation(e.key);
  }
}}
```

### Navigation Keys (arrows + home/end/pageup/pagedown)

```typescript
import { isNavigationKey } from './utils/keyboard';

onKeyDown={(e) => {
  if (isNavigationKey(e)) {
    e.preventDefault();
    handleNavigation(e.key);
  }
}}
```

### Prevent Default for Specific Keys

```typescript
import { preventDefaultForKeys, Keys } from './utils/keyboard';

onKeyDown={(e) => {
  preventDefaultForKeys(e, [Keys.ArrowUp, Keys.ArrowDown]);
  // Handle arrow navigation without scrolling the page
}}
```

### Stop Propagation for Specific Keys

```typescript
import { stopPropagationForKeys, Keys } from './utils/keyboard';

onKeyDown={(e) => {
  stopPropagationForKeys(e, [Keys.Escape]);
  // Prevent Escape from bubbling to parent components
}}
```

### Create Key Handler Map

```typescript
import { createKeyHandler, Keys } from './utils/keyboard';

const handleKeyDown = createKeyHandler({
  [Keys.Enter]: handleSubmit,
  [Keys.Escape]: handleCancel,
  [Keys.ArrowDown]: handleNext,
  [Keys.ArrowUp]: handlePrevious,
});

<div onKeyDown={handleKeyDown}>...</div>
```

---

## Import Patterns

```typescript
// Individual imports
import { cn } from './utils/cn';
import type { PolymorphicComponentPropsWithRef } from './utils/polymorphic';
import { Keys, isActivationKey } from './utils/keyboard';

// Barrel import (from index.ts)
import { cn, Keys, isActivationKey } from './utils';
import type { PolymorphicComponentPropsWithRef } from './utils';
```

---

## Installation

```bash
# Required dependencies
npm install clsx tailwind-merge

# TypeScript is required for type utilities
npm install -D typescript
```

---

## Notes

- **cn utility:** Essential for every component that uses CVA + custom className props
- **polymorphic types:** Optional — only use if you need the `as` prop pattern
- **keyboard utils:** Used extensively in compound components (dropdowns, tabs, modals)
