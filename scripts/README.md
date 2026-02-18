# Design System Scripts

This directory contains automation scripts for the Saleshandy design system component library.

## Scripts

### `generate-tokens.ts`

Generates design tokens from `tokens.json` into multiple formats:

**Input:**
- `tokens.json` (design tokens)

**Output** (in `generated-tokens/`):
- `tokens.css` — CSS custom properties (--sh-* variables)
- `semantic-tokens.css` — Purpose-driven aliases
- `tailwind.preset.ts` — Tailwind CSS configuration preset
- `index.ts` — Programmatic TypeScript token access

**Usage:**
```bash
# With tsx (recommended)
tsx scripts/generate-tokens.ts

# Or add to package.json:
"scripts": {
  "generate:tokens": "tsx scripts/generate-tokens.ts"
}
```

**When to run:**
- After modifying `tokens.json`
- Before creating the new component library repo
- Any time tokens need to be synced

---

### `scaffold-component.ts`

Generates boilerplate for a new component following the 6-file pattern.

**Usage:**
```bash
tsx scripts/scaffold-component.ts <component-name>

# Examples:
tsx scripts/scaffold-component.ts button
tsx scripts/scaffold-component.ts input-field
tsx scripts/scaffold-component.ts modal
```

**Output** (in `components-code/<component-name>/`):
- `<component>.tsx` — Component implementation
- `<component>.variants.ts` — CVA variant definitions
- `<component>.types.ts` — TypeScript interfaces
- `<component>.stories.tsx` — Storybook stories
- `<component>.test.tsx` — Vitest unit tests
- `index.ts` — Barrel export

**Next steps after scaffolding:**
1. Read the component's `.md` spec from `/components/`
2. Update `.variants.ts` with variants from the spec
3. Update `.types.ts` with component-specific props
4. Implement logic in `.tsx`
5. Add comprehensive stories in `.stories.tsx`
6. Add tests in `.test.tsx`

---

## Installation Requirements

```bash
# Install tsx for running TypeScript scripts
npm install -D tsx

# Or use globally
npm install -g tsx
```

---

## Workflow

### 1. Generate Design Tokens

```bash
tsx scripts/generate-tokens.ts
```

This creates `generated-tokens/` with all token files. Copy these to your new component library repo.

### 2. Scaffold a Component

```bash
tsx scripts/scaffold-component.ts button
```

This creates `components-code/button/` with 6 boilerplate files.

### 3. Implement the Component

1. Read `/components/button.md` (the spec)
2. Update `button.variants.ts` with CVA definitions from the spec tables
3. Update `button.types.ts` with props
4. Implement `button.tsx`
5. Add stories to `button.stories.tsx`
6. Add tests to `button.test.tsx`

### 4. Repeat for All Components

Use the scaffolding script for each of the 26 components in the design system.

---

## Tips

- **Parallelization:** Scaffold multiple components at once and implement them in parallel
- **Template-first:** Build Button first as the gold standard, then use it as a reference
- **Spec-to-CVA:** The `.md` spec files have exact hex values and padding — translate these mechanically into CVA variant definitions
- **Test coverage:** Aim for 90%+ coverage on component logic, 100% on variant rendering

---

## Directory Structure

```
scripts/
├── README.md                   # This file
├── generate-tokens.ts          # Token pipeline
└── scaffold-component.ts       # Component generator

generated-tokens/               # Auto-generated (git-ignored)
├── tokens.css
├── semantic-tokens.css
├── tailwind.preset.ts
└── index.ts

components-code/                # Scaffolded components (future)
├── button/
│   ├── button.tsx
│   ├── button.variants.ts
│   ├── button.types.ts
│   ├── button.stories.tsx
│   ├── button.test.tsx
│   └── index.ts
├── input/
└── ...
```
