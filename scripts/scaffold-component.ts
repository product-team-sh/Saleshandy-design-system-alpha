#!/usr/bin/env tsx
/**
 * Component Scaffolding Script
 *
 * Generates boilerplate files for a new component following the 6-file pattern:
 * - component.tsx
 * - component.variants.ts
 * - component.types.ts
 * - component.stories.tsx
 * - component.test.tsx
 * - index.ts
 *
 * Usage:
 *   npm run scaffold button
 *   or: tsx scripts/scaffold-component.ts button
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.join(__dirname, '../templates/component-template');
const COMPONENTS_DIR = path.join(__dirname, '../components-code'); // Future component code location

// Get component name from command line
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('\nUsage: tsx scripts/scaffold-component.ts <component-name>');
  console.log('Example: tsx scripts/scaffold-component.ts button');
  process.exit(1);
}

// Convert component name to different cases
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

const ComponentName = toPascalCase(componentName);
const componentKebab = toKebabCase(componentName);
const componentDir = path.join(COMPONENTS_DIR, componentKebab);

// Check if component already exists
if (fs.existsSync(componentDir)) {
  console.error(`❌ Error: Component "${componentKebab}" already exists at ${componentDir}`);
  process.exit(1);
}

// Ensure components directory exists
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

console.log(`🏗️  Scaffolding component: ${ComponentName}\n`);

/**
 * Generate component.types.ts
 */
function generateTypes(): string {
  return `import { type VariantProps } from 'class-variance-authority';
import { type ${componentKebab}Variants } from './${componentKebab}.variants';

/**
 * Props for the ${ComponentName} component
 */
export interface ${ComponentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentKebab}Variants> {
  /**
   * The content to display
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  // Add component-specific props here
}
`;
}

/**
 * Generate component.variants.ts
 */
function generateVariants(): string {
  return `import { cva } from 'class-variance-authority';

/**
 * ${ComponentName} component variants
 *
 * Define all visual variants here using CVA.
 * Reference the component's .md spec for exact values.
 */
export const ${componentKebab}Variants = cva(
  // Base styles (shared across all variants)
  [
    'inline-flex',
    'font-sans',
    'transition-colors duration-base',
    // Add more base classes here
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary-700',
          'text-white',
          'hover:bg-primary-800',
          'active:bg-primary-900',
        ],
        // Add more variants here based on the component spec
      },
      size: {
        md: 'px-4 py-2 text-base',
        sm: 'px-2 py-1 text-sm',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
`;
}

/**
 * Generate component.tsx
 */
function generateComponent(): string {
  return `import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ${componentKebab}Variants } from './${componentKebab}.variants';
import type { ${ComponentName}Props } from './${componentKebab}.types';

/**
 * ${ComponentName} Component
 *
 * [Brief description of what this component does]
 *
 * @see /design-system/components/${componentKebab}.md
 *
 * @example
 * <${ComponentName} variant="default" size="md">
 *   Content here
 * </${ComponentName}>
 */
export const ${ComponentName} = forwardRef<HTMLDivElement, ${ComponentName}Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${componentKebab}Variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${ComponentName}.displayName = '${ComponentName}';
`;
}

/**
 * Generate component.stories.tsx
 */
function generateStories(): string {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${ComponentName} } from './${componentKebab}';

/**
 * ${ComponentName} component stories for Storybook
 *
 * Demonstrates all variants, sizes, and states.
 */
const meta: Meta<typeof ${ComponentName}> = {
  title: 'Components/${ComponentName}',
  component: ${ComponentName},
  parameters: {
    docs: {
      description: {
        component: \`
${ComponentName} component for [description].

**Design spec:** \\\`/design-system/components/${componentKebab}.md\\\`
**Figma:** SH-Design-System-2025 > [Component Page]
        \`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'], // Add more variants from component spec
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${ComponentName}>;

/**
 * Default ${ComponentName}
 */
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: '${ComponentName} content',
  },
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <${ComponentName} variant="default">Default</${ComponentName}>
      {/* Add more variants here */}
    </div>
  ),
};

/**
 * All Sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <${ComponentName} size="sm">Small</${ComponentName}>
      <${ComponentName} size="md">Medium</${ComponentName}>
      <${ComponentName} size="lg">Large</${ComponentName}>
    </div>
  ),
};
`;
}

/**
 * Generate component.test.tsx
 */
function generateTests(): string {
  return `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${ComponentName} } from './${componentKebab}';

describe('${ComponentName}', () => {
  it('renders children correctly', () => {
    render(<${ComponentName}>Test content</${ComponentName}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(
      <${ComponentName} variant="default">Content</${ComponentName}>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('bg-primary-700');
  });

  it('applies size classes', () => {
    const { container } = render(
      <${ComponentName} size="sm">Content</${ComponentName}>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('px-2');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<${ComponentName} ref={ref}>Content</${ComponentName}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <${ComponentName} className="custom-class">Content</${ComponentName}>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });
});
`;
}

/**
 * Generate index.ts (barrel export)
 */
function generateIndex(): string {
  return `export { ${ComponentName} } from './${componentKebab}';
export type { ${ComponentName}Props } from './${componentKebab}.types';
export { ${componentKebab}Variants } from './${componentKebab}.variants';
`;
}

/**
 * Main execution
 */
function main() {
  const files = [
    { name: `${componentKebab}.types.ts`, content: generateTypes() },
    { name: `${componentKebab}.variants.ts`, content: generateVariants() },
    { name: `${componentKebab}.tsx`, content: generateComponent() },
    { name: `${componentKebab}.stories.tsx`, content: generateStories() },
    { name: `${componentKebab}.test.tsx`, content: generateTests() },
    { name: 'index.ts', content: generateIndex() },
  ];

  files.forEach(file => {
    const filePath = path.join(componentDir, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created ${file.name}`);
  });

  console.log(`\n🎉 Component scaffolding complete!`);
  console.log(`📁 Component directory: ${componentDir}`);
  console.log(`\n📝 Next steps:`);
  console.log(`  1. Update ${componentKebab}.variants.ts with variants from the component spec`);
  console.log(`  2. Update ${componentKebab}.types.ts with component-specific props`);
  console.log(`  3. Implement component logic in ${componentKebab}.tsx`);
  console.log(`  4. Add comprehensive stories in ${componentKebab}.stories.tsx`);
  console.log(`  5. Add more tests in ${componentKebab}.test.tsx`);
}

main();
