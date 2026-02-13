# Checkbox

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Checkbox component allows users to select one or more options from a set. Saleshandy provides a base checkbox control, a full checkbox item with label, and supports both box and circle shapes with an indeterminate state.

## Component Sets (from Figma)

1. **Checkbox** -- 45 variants (standalone checkbox control)
2. **_Checkbox Base** -- 72 variants (internal base component)
3. **Main Checkbox Item** -- 114 variants (checkbox with label)
   - Properties: Switch (on/off), State, Size, Indeterminate

---

## Variants

### Shapes

| Shape | Border Radius | Usage |
|-------|--------------|-------|
| Box | 4px | Standard checkbox (default) |
| Circle | 9999px | Circular checkbox for stylistic variation |

### Switch States

| Switch | Visual | Description |
|--------|--------|-------------|
| Off (unchecked) | Empty box/circle with border | No selection |
| On (checked) | Filled box/circle with checkmark icon | Selected |
| Indeterminate | Filled box/circle with dash icon | Partial selection (parent of mixed children) |

---

## Sizes

| Size | Checkbox Dimensions | Label Font Size | Usage |
|------|-------------------|----------------|-------|
| Small | 16px | 14px | Compact lists, table rows |
| Medium | 18px | 14px | Standard forms (default) |
| Large | 20px | 14px | Prominent selections |

---

## States

### Unchecked States

| State | Border | Background | Notes |
|-------|--------|-----------|-------|
| Default | `#9ca3af` (gray.400) | transparent | Resting state |
| Hover | `#1d4ed8` (primary.700) | transparent | Border changes to primary on hover |
| Focused | `#9ca3af` (gray.400) | transparent | Focus ring visible |
| Disabled | `#9ca3af` at reduced opacity | transparent | Non-interactive |

### Checked States

| State | Border | Background | Checkmark Color | Notes |
|-------|--------|-----------|----------------|-------|
| Default | `#1d4ed8` (primary.700) | `#1d4ed8` (primary.700) | `#ffffff` | Standard checked state |
| Hover | `#1e40af` (primary.800) | `#1e40af` (primary.800) | `#ffffff` | Darker shade on hover |
| Focused | `#1d4ed8` (primary.700) | `#1d4ed8` (primary.700) | `#ffffff` | Focus ring visible |
| Disabled | Reduced opacity | Reduced opacity | `#ffffff` | Non-interactive |

### Indeterminate States

Same color treatment as Checked states, but displays a horizontal dash instead of a checkmark.

---

## Main Checkbox Item (with Label)

The Main Checkbox Item combines the checkbox control with a text label.

| Property | Value |
|----------|-------|
| Text Color | `#1f2937` (gray.800) |
| Font Family | Inter |
| Font Size | 14px |
| Font Weight | 400 |
| Gap (checkbox to label) | 8px |
| Disabled Text Color | `#9ca3af` (gray.400) |

---

## Accessibility

- Use native `<input type="checkbox">` for proper semantics
- Use `aria-checked="true"`, `"false"`, or `"mixed"` for indeterminate
- Use `aria-disabled="true"` for disabled checkboxes
- Labels must be associated via `htmlFor`/`id` pairing or wrapping `<label>`
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)
- Keyboard: Tab to focus, Space to toggle
- Group related checkboxes with `role="group"` and `aria-labelledby`

---

## Related Components

- [Toggle Button](./toggle-button.md) - For on/off binary toggles
- [Card](./card.md) - Check Card variant for selectable cards
- [Input](./input.md) - Text entry fields
- [Dropdown](./dropdown.md) - For multiselect dropdown lists
