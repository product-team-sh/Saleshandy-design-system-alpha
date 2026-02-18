#!/usr/bin/env tsx
/**
 * Token Pipeline Generator
 *
 * Reads tokens.json and generates:
 * 1. tokens.css - CSS custom properties (primitive tokens)
 * 2. semantic-tokens.css - Purpose-driven aliases
 * 3. tailwind.preset.ts - Tailwind config preset
 * 4. tokens/index.ts - Programmatic access to tokens
 *
 * Usage:
 *   npm run generate:tokens
 *   or: tsx scripts/generate-tokens.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_PATH = path.join(__dirname, '../tokens.json');
const OUTPUT_DIR = path.join(__dirname, '../generated-tokens');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read tokens.json
const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));

/**
 * Generate CSS Custom Properties
 */
function generateTokensCSS(): string {
  const lines: string[] = [
    '/**',
    ' * Design Tokens - CSS Custom Properties',
    ' * Auto-generated from tokens.json',
    ' * DO NOT EDIT MANUALLY',
    ' */',
    ':root {',
  ];

  // Colors
  lines.push('  /* ===== Colors: Primary ===== */');
  Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
    lines.push(`  --sh-color-primary-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Gray ===== */');
  Object.entries(tokens.colors.gray).forEach(([shade, value]) => {
    lines.push(`  --sh-color-gray-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Red ===== */');
  Object.entries(tokens.colors.red).forEach(([shade, value]) => {
    lines.push(`  --sh-color-red-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Green ===== */');
  Object.entries(tokens.colors.green).forEach(([shade, value]) => {
    lines.push(`  --sh-color-green-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Yellow ===== */');
  Object.entries(tokens.colors.yellow).forEach(([shade, value]) => {
    lines.push(`  --sh-color-yellow-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Purple ===== */');
  Object.entries(tokens.colors.purple).forEach(([shade, value]) => {
    lines.push(`  --sh-color-purple-${shade}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Status ===== */');
  Object.entries(tokens.colors.status).forEach(([name, value]) => {
    lines.push(`  --sh-color-status-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Background ===== */');
  Object.entries(tokens.colors.background).forEach(([name, value]) => {
    lines.push(`  --sh-color-bg-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Text ===== */');
  Object.entries(tokens.colors.text).forEach(([name, value]) => {
    lines.push(`  --sh-color-text-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Colors: Border ===== */');
  Object.entries(tokens.colors.border).forEach(([name, value]) => {
    lines.push(`  --sh-color-border-${name}: ${value};`);
  });

  // Typography
  lines.push('');
  lines.push('  /* ===== Typography: Font Family ===== */');
  Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
    lines.push(`  --sh-font-family-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Typography: Font Size ===== */');
  Object.entries(tokens.typography.fontSize).forEach(([name, value]) => {
    lines.push(`  --sh-font-size-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Typography: Font Weight ===== */');
  Object.entries(tokens.typography.fontWeight).forEach(([name, value]) => {
    lines.push(`  --sh-font-weight-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* ===== Typography: Line Height ===== */');
  Object.entries(tokens.typography.lineHeight).forEach(([name, value]) => {
    lines.push(`  --sh-line-height-${name}: ${value};`);
  });

  // Spacing
  lines.push('');
  lines.push('  /* ===== Spacing ===== */');
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    const safeName = name.replace('.', '-');
    lines.push(`  --sh-spacing-${safeName}: ${value};`);
  });

  // Border Radius
  lines.push('');
  lines.push('  /* ===== Border Radius ===== */');
  Object.entries(tokens.borderRadius).forEach(([name, value]) => {
    lines.push(`  --sh-radius-${name}: ${value};`);
  });

  // Shadows
  lines.push('');
  lines.push('  /* ===== Shadows ===== */');
  Object.entries(tokens.shadows).forEach(([name, value]) => {
    lines.push(`  --sh-shadow-${name}: ${value};`);
  });

  // Transitions
  lines.push('');
  lines.push('  /* ===== Transitions ===== */');
  Object.entries(tokens.transitions).forEach(([name, value]) => {
    lines.push(`  --sh-transition-${name}: ${value};`);
  });

  // Z-Index
  lines.push('');
  lines.push('  /* ===== Z-Index ===== */');
  Object.entries(tokens.zIndex).forEach(([name, value]) => {
    lines.push(`  --sh-z-${name}: ${value};`);
  });

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generate Semantic Tokens CSS
 */
function generateSemanticTokensCSS(): string {
  return `/**
 * Semantic Design Tokens
 * Purpose-driven aliases that reference primitive tokens
 * Auto-generated from tokens.json
 * DO NOT EDIT MANUALLY
 */
:root {
  /* ===== Semantic: Interactive (Buttons, Links) ===== */
  --sh-interactive-primary: var(--sh-color-primary-700);
  --sh-interactive-primary-hover: var(--sh-color-primary-800);
  --sh-interactive-primary-pressed: var(--sh-color-primary-900);
  --sh-interactive-secondary-hover: var(--sh-color-gray-100);
  --sh-interactive-secondary-pressed: var(--sh-color-gray-200);

  /* ===== Semantic: Background ===== */
  --sh-bg-primary: var(--sh-color-primary-700);
  --sh-bg-primary-hover: var(--sh-color-primary-800);
  --sh-bg-primary-pressed: var(--sh-color-primary-900);
  --sh-bg-error: var(--sh-color-red-700);
  --sh-bg-error-hover: var(--sh-color-red-800);
  --sh-bg-error-pressed: var(--sh-color-red-900);
  --sh-bg-surface: var(--sh-color-bg-primary);
  --sh-bg-muted: var(--sh-color-gray-50);
  --sh-bg-subtle: var(--sh-color-gray-100);

  /* ===== Semantic: Text ===== */
  --sh-text-body: var(--sh-color-text-primary);
  --sh-text-muted: var(--sh-color-text-secondary);
  --sh-text-placeholder: var(--sh-color-text-tertiary);
  --sh-text-on-primary: var(--sh-color-text-inverse);
  --sh-text-link: var(--sh-color-text-link);
  --sh-text-link-hover: var(--sh-color-text-linkHover);
  --sh-text-error: var(--sh-color-text-error);

  /* ===== Semantic: Border ===== */
  --sh-border: var(--sh-color-border-default);
  --sh-border-light: var(--sh-color-border-light);
  --sh-border-strong: var(--sh-color-border-dark);
  --sh-border-focus: var(--sh-color-border-focus);
  --sh-border-error: var(--sh-color-border-error);

  /* ===== Semantic: Status ===== */
  --sh-status-success: var(--sh-color-status-success);
  --sh-status-success-bg: var(--sh-color-green-50);
  --sh-status-success-border: var(--sh-color-green-200);
  --sh-status-error: var(--sh-color-status-error);
  --sh-status-error-bg: var(--sh-color-red-50);
  --sh-status-error-border: var(--sh-color-red-200);
  --sh-status-warning: var(--sh-color-status-warning);
  --sh-status-warning-bg: var(--sh-color-yellow-50);
  --sh-status-warning-border: var(--sh-color-yellow-200);
  --sh-status-info: var(--sh-color-status-info);
  --sh-status-info-bg: var(--sh-color-primary-50);
  --sh-status-info-border: var(--sh-color-primary-200);
}
`;
}

/**
 * Generate Tailwind Preset
 */
function generateTailwindPreset(): string {
  return `import type { Config } from 'tailwindcss';

/**
 * Saleshandy Design System - Tailwind CSS Preset
 * Auto-generated from tokens.json
 * DO NOT EDIT MANUALLY
 *
 * Usage in your tailwind.config.ts:
 * import saleshandyPreset from './generated-tokens/tailwind.preset';
 *
 * export default {
 *   presets: [saleshandyPreset],
 *   content: ['./src/**\/*.{ts,tsx}'],
 * };
 */

const saleshandyPreset: Partial<Config> = {
  theme: {
    fontFamily: {
      sans: ${JSON.stringify(tokens.typography.fontFamily.primary.split(', '))},
      mono: ${JSON.stringify(tokens.typography.fontFamily.mono.split(', '))},
    },
    fontSize: {
      xs: ['${tokens.typography.fontSize.xs}', { lineHeight: '${tokens.typography.lineHeight.xs}' }],
      sm: ['${tokens.typography.fontSize.sm}', { lineHeight: '${tokens.typography.lineHeight.sm}' }],
      base: ['${tokens.typography.fontSize.base}', { lineHeight: '${tokens.typography.lineHeight.base}' }],
      lg: ['${tokens.typography.fontSize.lg}', { lineHeight: '${tokens.typography.lineHeight.lg}' }],
      xl: ['${tokens.typography.fontSize.xl}', { lineHeight: '${tokens.typography.lineHeight.xl}' }],
      '2xl': ['${tokens.typography.fontSize['2xl']}', { lineHeight: '${tokens.typography.lineHeight['2xl']}' }],
      '3xl': ['${tokens.typography.fontSize['3xl']}', { lineHeight: '${tokens.typography.lineHeight['3xl']}' }],
      '4xl': ['${tokens.typography.fontSize['4xl']}', { lineHeight: '${tokens.typography.lineHeight['4xl']}' }],
      '5xl': ['${tokens.typography.fontSize['5xl']}', { lineHeight: '${tokens.typography.lineHeight['5xl']}' }],
      '6xl': ['${tokens.typography.fontSize['6xl']}', { lineHeight: '${tokens.typography.lineHeight['6xl']}' }],
    },
    extend: {
      colors: {
        primary: ${JSON.stringify(tokens.colors.primary, null, 10)},
        gray: ${JSON.stringify(tokens.colors.gray, null, 10)},
        red: ${JSON.stringify(tokens.colors.red, null, 10)},
        green: ${JSON.stringify(tokens.colors.green, null, 10)},
        yellow: ${JSON.stringify(tokens.colors.yellow, null, 10)},
        purple: ${JSON.stringify(tokens.colors.purple, null, 10)},
      },
      spacing: {
        '0.5': '${tokens.spacing['0.5']}',
        '1': '${tokens.spacing['1']}',
        '2': '${tokens.spacing['2']}',
        '3': '${tokens.spacing['3']}',
        '4': '${tokens.spacing['4']}',
        '5': '${tokens.spacing['5']}',
        '6': '${tokens.spacing['6']}',
        '8': '${tokens.spacing['8']}',
        '10': '${tokens.spacing['10']}',
        '12': '${tokens.spacing['12']}',
        '16': '${tokens.spacing['16']}',
        '20': '${tokens.spacing['20']}',
      },
      borderRadius: {
        none: '${tokens.borderRadius.none}',
        sm: '${tokens.borderRadius.sm}',
        md: '${tokens.borderRadius.md}',
        lg: '${tokens.borderRadius.lg}',
        xl: '${tokens.borderRadius.xl}',
        full: '${tokens.borderRadius.full}',
      },
      boxShadow: {
        header: '${tokens.shadows.header}',
        sm: '${tokens.shadows.sm}',
        md: '${tokens.shadows.md}',
        dropdown: '${tokens.shadows.dropdown}',
        popover: '${tokens.shadows.popover}',
        tooltip: '${tokens.shadows.tooltip}',
        modal: '${tokens.shadows.modal}',
        sidebar: '${tokens.shadows.sidebar}',
        pagination: '${tokens.shadows.pagination}',
        focused: '${tokens.shadows.focused}',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      zIndex: {
        dropdown: '${tokens.zIndex.dropdown}',
        sticky: '${tokens.zIndex.sticky}',
        modal: '${tokens.zIndex.modal}',
        popover: '${tokens.zIndex.popover}',
        tooltip: '${tokens.zIndex.tooltip}',
      },
    },
  },
};

export default saleshandyPreset;
`;
}

/**
 * Generate TypeScript token exports
 */
function generateTokensTS(): string {
  return `/**
 * Design Tokens - Programmatic Access
 * Auto-generated from tokens.json
 * DO NOT EDIT MANUALLY
 */

export const tokens = ${JSON.stringify(tokens, null, 2)} as const;

export const colors = tokens.colors;
export const spacing = tokens.spacing;
export const typography = tokens.typography;
export const borderRadius = tokens.borderRadius;
export const shadows = tokens.shadows;
export const transitions = tokens.transitions;
export const zIndex = tokens.zIndex;
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating design tokens...\n');

  // Generate tokens.css
  const tokensCSS = generateTokensCSS();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tokens.css'), tokensCSS);
  console.log('✅ Generated tokens.css');

  // Generate semantic-tokens.css
  const semanticCSS = generateSemanticTokensCSS();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'semantic-tokens.css'), semanticCSS);
  console.log('✅ Generated semantic-tokens.css');

  // Generate tailwind.preset.ts
  const tailwindPreset = generateTailwindPreset();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tailwind.preset.ts'), tailwindPreset);
  console.log('✅ Generated tailwind.preset.ts');

  // Generate index.ts
  const tokensTS = generateTokensTS();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), tokensTS);
  console.log('✅ Generated index.ts');

  console.log('\n🎉 Token generation complete!');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

main();
