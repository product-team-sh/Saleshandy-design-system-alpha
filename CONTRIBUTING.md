# Contributing to Saleshandy Design System

This guide explains how to add or update components in the Saleshandy design system.

---

## Adding a New Component

### Step 1: Document the Component

Create a markdown file in `/design-system/components/`:

```bash
touch /Users/malav/design-system/components/[component-name].md
```

**Use this template:**

```markdown
# [Component Name]

**Status:** 🚧 To be populated from Saleshandy screenshots

## Overview

Brief description of what this component does and when to use it.

## Variants

### Variant Name
- **Usage:** When to use this variant
- **Background:** Token or value
- **Text Color:** Token or value
- **States:**
  - Default: [specs]
  - Hover: [specs]
  - Active: [specs]
  - Disabled: [specs]

## Sizes

### Small
- **Height:** [value]
- **Padding:** [value]
- **Font Size:** [value]

### Medium (Default)
- **Height:** [value]
- **Padding:** [value]
- **Font Size:** [value]

### Large
- **Height:** [value]
- **Padding:** [value]
- **Font Size:** [value]

## Code Example

\`\`\`jsx
import ComponentName from './components/ComponentName'

<ComponentName variant="primary" size="medium">
  Content
</ComponentName>
\`\`\`

## Accessibility

- List accessibility requirements
- ARIA attributes needed
- Keyboard navigation

## Usage Guidelines

### Do:
- Best practices

### Don't:
- Anti-patterns to avoid

## Related Components

- [Other Component](./other-component.md)

---

**Next Steps:** Populate this documentation with actual values from Saleshandy screenshots.
```

### Step 2: Implement the Component

Create React component in `/prototype-template/src/components/`:

```bash
touch /Users/malav/prototype-template/src/components/[ComponentName].jsx
touch /Users/malav/prototype-template/src/components/[ComponentName].module.css
```

**Component template:**

```jsx
import React from 'react'
import styles from './ComponentName.module.css'

/**
 * ComponentName Component
 *
 * Matches Saleshandy design system - see /design-system/components/component-name.md
 *
 * @param {Object} props - Component props
 */
function ComponentName({ children, ...props }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default ComponentName
```

**Styles template:**

```css
/**
 * ComponentName Component Styles
 *
 * These styles match the Saleshandy design system
 * See: /design-system/components/component-name.md
 */

.component {
  /* Use design tokens ONLY */
  color: var(--color-text-primary);
  background: var(--color-background-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### Step 3: Export the Component

Add to component index if you create one, or document in README.

---

## Updating an Existing Component

### Step 1: Update Documentation

Edit `/design-system/components/[component-name].md`:

- Update specs to match actual Saleshandy UI
- Add new variants or sizes
- Update code examples
- Document any new props or behaviors

### Step 2: Update Implementation

Edit `/prototype-template/src/components/[ComponentName].jsx` and `.module.css`:

- Update component code to match new specs
- Ensure all design tokens are used
- Test all variants and states

### Step 3: Document Changes

If significant changes:
- Update `/prototype-template/README.md` if examples changed
- Update `/PROTOTYPING_WORKFLOW.md` if workflow affected

---

## Adding Design Tokens

### Step 1: Update tokens.json

Edit `/design-system/tokens.json`:

```json
{
  "colors": {
    "newColor": {
      "500": "#HEXVALUE"
    }
  }
}
```

### Step 2: Update tokens.css

Edit `/prototype-template/src/styles/tokens.css`:

```css
:root {
  --color-new-color-500: #HEXVALUE;
}
```

### Step 3: Document Usage

Add note to `/design-system/README.md` about new tokens.

---

## Populating from Screenshots

When you receive Saleshandy screenshots:

### 1. Extract Colors

Use a color picker to extract:
- Primary colors (brand colors)
- Gray scale (backgrounds, text, borders)
- Status colors (success, error, warning, info)
- Text colors (primary, secondary, tertiary)
- Border colors

Update `/design-system/tokens.json` and `/src/styles/tokens.css`.

### 2. Extract Spacing

Measure spacing between elements:
- Padding inside components
- Margins between elements
- Gaps in layouts

Verify spacing scale (4px, 8px, 12px, etc.) and update tokens if needed.

### 3. Extract Typography

Identify:
- Font families (primary, monospace)
- Font sizes (headings, body text, small text)
- Font weights (normal, medium, semibold, bold)
- Line heights

Update tokens.json.

### 4. Extract Component Specs

For each component:
- Measure dimensions (width, height, padding)
- Identify colors for each state (default, hover, active, disabled)
- Document border radius, shadows
- Note transition timings

Update component documentation.

### 5. Document Interaction Patterns

Observe:
- How buttons respond to hover
- How inputs show focus
- How loading states appear
- How errors are displayed

Update `/design-system/patterns/interactions.md`.

### 6. Update Components

Update `/prototype-template/src/components/` to match extracted specs.

---

## Documenting Patterns

### Adding an Interaction Pattern

Edit `/design-system/patterns/interactions.md`:

```markdown
### New Pattern Name

**Context:** When this pattern is used

**Specifications:**
- Property: Value
- Transition: Duration and easing

**Example:**
\`\`\`css
.element:hover {
  /* CSS */
}
\`\`\`
```

### Adding a Layout Pattern

Edit `/design-system/patterns/layouts.md`:

```markdown
### New Layout Pattern

**Description:** What this layout does

**Structure:**
\`\`\`
┌─────────────┐
│   Layout    │
└─────────────┘
\`\`\`

**Specifications:**
- Spacing: Values
- Breakpoints: Values

**Code Example:**
\`\`\`jsx
// React code
\`\`\`
```

### Adding a Form Pattern

Edit `/design-system/patterns/forms.md`:

---

## Best Practices

### Do:

- ✅ **Document before implementing** - Write specs first, then code
- ✅ **Use design tokens** - Never hardcode values
- ✅ **Test all states** - Verify hover, focus, active, disabled, error states
- ✅ **Add accessibility** - Include ARIA attributes, keyboard navigation
- ✅ **Write clear examples** - Show how to use components properly
- ✅ **Keep documentation updated** - When code changes, update docs

### Don't:

- ❌ **Don't guess** - If you're unsure about a spec, ask for screenshots
- ❌ **Don't invent** - Only document what exists in actual Saleshandy UI
- ❌ **Don't hardcode** - Always use design tokens
- ❌ **Don't skip documentation** - Undocumented = doesn't exist for Claude Code
- ❌ **Don't create inconsistent patterns** - Match existing conventions

---

## Review Checklist

Before considering a component "done":

- [ ] Component is documented in `/design-system/components/`
- [ ] Component is implemented in `/prototype-template/src/components/`
- [ ] All variants are documented and implemented
- [ ] All states are documented (default, hover, focus, active, disabled, error)
- [ ] All sizes are documented
- [ ] Design tokens are used (no hardcoded values)
- [ ] Code examples are provided in documentation
- [ ] Accessibility guidelines are documented
- [ ] Usage guidelines (do's and don'ts) are included
- [ ] Component is tested in a prototype

---

## Questions?

If you're unsure about anything:
- Check existing components for reference
- Ask for Saleshandy screenshots to clarify
- Review the prototyping workflow: `/PROTOTYPING_WORKFLOW.md`
- Consult the design system README: `/design-system/README.md`
