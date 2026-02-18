# Quick Start Guide: Build Your Component Library in 30 Minutes

This guide will get you from zero to a working component library with your first component in 30 minutes.

---

## Prerequisites

```bash
node -v    # Should be 18+
npm -v     # Should be 9+
```

---

## Step 1: Test the Tools (5 minutes)

### 1.1 Install dependencies

```bash
cd /Users/malav/design-system
npm install -D tsx clsx tailwind-merge class-variance-authority
```

### 1.2 Generate tokens

```bash
tsx scripts/generate-tokens.ts
```

**Expected output:**
```
🎨 Generating design tokens...

✅ Generated tokens.css
✅ Generated semantic-tokens.css
✅ Generated tailwind.preset.ts
✅ Generated index.ts

🎉 Token generation complete!
📁 Output directory: /Users/malav/design-system/generated-tokens
```

**Verify:** Check that `generated-tokens/` folder exists with 4 files.

### 1.3 Scaffold a test component

```bash
tsx scripts/scaffold-component.ts test-button
```

**Expected output:**
```
🏗️  Scaffolding component: TestButton

✅ Created test-button.types.ts
✅ Created test-button.variants.ts
✅ Created test-button.tsx
✅ Created test-button.stories.tsx
✅ Created test-button.test.tsx
✅ Created index.ts

🎉 Component scaffolding complete!
📁 Component directory: /Users/malav/design-system/components-code/test-button
```

**Verify:** Check that `components-code/test-button/` folder exists with 6 files.

✅ **Checkpoint:** If both commands succeed, your tools are working!

---

## Step 2: Create New Repo (10 minutes)

### 2.1 Initialize with Vite

```bash
cd ~/Projects  # or wherever you keep projects
npm create vite@latest saleshandy-ui -- --template react-ts
cd saleshandy-ui
npm install
```

### 2.2 Install dependencies

```bash
# Styling
npm install tailwindcss@3.4 postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge

# Build
npm install -D vite-plugin-dts

# Testing (optional for now)
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### 2.3 Initialize Tailwind

```bash
npx tailwindcss init -p
```

### 2.4 Copy scaffolding tools

```bash
# Copy scripts
cp -r /Users/malav/design-system/scripts ./

# Copy hooks
mkdir -p src/hooks
cp -r /Users/malav/design-system/hooks/* ./src/hooks/

# Copy utils
mkdir -p src/utils
cp -r /Users/malav/design-system/utils/* ./src/utils/

# Copy generated tokens
mkdir -p src/tokens
cp -r /Users/malav/design-system/generated-tokens/* ./src/tokens/
```

### 2.5 Configure Vite for library mode

Edit `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }), // React 16 compat
    dts({ include: ['src'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
```

### 2.6 Configure Tailwind

Edit `tailwind.config.js`:

```javascript
import saleshandyPreset from './src/tokens/tailwind.preset';

export default {
  presets: [saleshandyPreset],
  content: [
    './src/**/*.{ts,tsx}',
  ],
};
```

### 2.7 Update package.json

Edit `package.json`:

```json
{
  "name": "@saleshandy/ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./tokens.css": "./dist/tokens.css"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "generate:tokens": "tsx scripts/generate-tokens.ts",
    "scaffold": "tsx scripts/scaffold-component.ts"
  }
}
```

✅ **Checkpoint:** Run `npm run build` to verify your setup works (it will be empty for now).

---

## Step 3: Build Your First Component - Button (15 minutes)

### 3.1 Scaffold Button

```bash
npm run scaffold button
```

This creates `src/components/button/` with 6 files.

### 3.2 Read the spec

Open `/Users/malav/design-system/components/button.md` and read through:
- Button Types (10 variants)
- Sizes (2 sizes)
- States (6 states)
- Padding and spacing values

### 3.3 Update button.variants.ts

Replace the contents with:

```typescript
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-sans text-base font-medium',
    'transition-colors duration-base ease-in-out',
    'focus-visible:outline-none focus-visible:shadow-focused',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none',
  ],
  {
    variants: {
      variant: {
        'primary-fill': [
          'bg-primary-700 text-white rounded-sm',
          'hover:bg-primary-800',
          'active:bg-primary-900',
        ],
        'primary-outline': [
          'bg-transparent text-primary-700 border border-primary-700 rounded-sm',
          'hover:bg-primary-100',
          'active:bg-primary-200',
        ],
        'secondary': [
          'bg-transparent text-gray-500 border border-gray-200 rounded-sm',
          'hover:bg-gray-100',
          'active:bg-gray-200',
        ],
        'error': [
          'bg-red-700 text-white rounded-sm',
          'hover:bg-red-800',
          'active:bg-red-900',
        ],
      },
      size: {
        lg: 'px-4 py-1.5 h-10',
        sm: 'px-2 py-0.5 h-8',
      },
    },
    defaultVariants: {
      variant: 'primary-fill',
      size: 'lg',
    },
  }
);
```

### 3.4 Update button.types.ts

```typescript
import { type VariantProps } from 'class-variance-authority';
import { type buttonVariants } from './button.variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Show loading spinner
   */
  isLoading?: boolean;

  /**
   * Leading icon element
   */
  leadingIcon?: React.ReactNode;

  /**
   * Trailing icon element
   */
  trailingIcon?: React.ReactNode;
}
```

### 3.5 Update button.tsx

```typescript
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { buttonVariants } from './button.variants';
import type { ButtonProps } from './button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    isLoading,
    leadingIcon,
    trailingIcon,
    disabled,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 3.6 Create src/index.ts

```typescript
// Export tokens CSS
import './tokens/tokens.css';
import './tokens/semantic-tokens.css';

// Export components
export { Button } from './components/button';
export type { ButtonProps } from './components/button/button.types';

// Export utils
export { cn } from './utils/cn';

// Export hooks
export * from './hooks';
```

### 3.7 Build and test

```bash
npm run build
```

**Expected:** `dist/` folder created with compiled files.

✅ **Checkpoint:** You now have a working component library with Button!

---

## Step 4: Test Your Component (5 minutes)

### 4.1 Create a demo app

In the root of your repo, create `demo.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Demo</title>
  <script type="module" crossorigin src="/src/main.tsx"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

Update `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/button';
import './tokens/tokens.css';
import './tokens/semantic-tokens.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div style={{ padding: '2rem' }}>
    <h1>Saleshandy UI - Button Component</h1>

    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
      <Button variant="primary-fill">Primary Fill</Button>
      <Button variant="primary-outline">Primary Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="error">Error</Button>
    </div>

    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <Button size="lg">Large Button</Button>
      <Button size="sm">Small Button</Button>
    </div>

    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
    </div>
  </div>
);
```

### 4.2 Run dev server

```bash
npm run dev
```

Open http://localhost:5173 and see your buttons!

---

## What's Next?

### Continue building:

1. **Scaffold all components:**
   ```bash
   npm run scaffold input
   npm run scaffold dropdown
   npm run scaffold checkbox
   # ... etc for all 26
   ```

2. **Implement in order:**
   - **Tier 1:** Icon, Spinner, Divider, Skeleton, Progress Bar, Badge
   - **Tier 2:** Input, Checkbox, Radio, Toggle, Text Area, Labels
   - **Tier 3:** Dropdown, Tooltip, Toast, Modal, Tabs, Banner, Avatar
   - **Tier 4:** Card, Table, Global Header, Editor

3. **Set up Storybook:**
   ```bash
   npx storybook@latest init
   ```

4. **Set up testing:**
   - Add tests to each component
   - Run `npm run test`

5. **Publish to npm:**
   ```bash
   npm login
   npm publish
   ```

---

## Troubleshooting

### "tsx: command not found"
```bash
npm install -g tsx
# or use npx:
npx tsx scripts/generate-tokens.ts
```

### "Cannot find module 'clsx'"
```bash
npm install clsx tailwind-merge class-variance-authority
```

### Build errors
- Check that `vite.config.ts` is configured correctly
- Verify `tsconfig.json` has `"jsx": "react"` (for React 16)
- Make sure all imports use correct paths

### Tailwind classes not working
- Import tokens CSS: `import './tokens/tokens.css'`
- Verify `tailwind.config.js` uses the preset
- Check that Tailwind scans `src/**/*.{ts,tsx}`

---

## Summary

✅ You now have:
- Working token pipeline
- Component scaffolding tool
- First component (Button) built and tested
- Development environment ready
- All tools and utilities in place

**Time invested:** ~30 minutes
**Components ready to build:** 25 more

**Next action:** Keep scaffolding and implementing components following the Button pattern!

---

## Need Help?

- **Documentation:** Check README files in `scripts/`, `hooks/`, `utils/`
- **Component specs:** See `/Users/malav/design-system/components/*.md`
- **Design tokens:** See `/Users/malav/design-system/tokens.json`
- **Patterns:** See `/Users/malav/design-system/patterns/*.md`
