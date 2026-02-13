# Input Field

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Input Field component is used for single-line text entry, form fields, and user data collection. It has 54 variants spanning multiple sizes, states, and field color options.

## Component Sets (from Figma)

1. **Input Field** -- 54 variants total
   - Properties: Default, Field Color, Size, State

---

## Variants

### Field Color

| Variant | Background | Usage |
|---------|-----------|-------|
| White | `#ffffff` | Default input on colored/gray backgrounds |
| Grey | `#f9fafb` (gray.50) | Input on white backgrounds for subtle contrast |

---

## Sizes

| Size | Font | Notes |
|------|------|-------|
| Small | Inter / 14px / 400 | Compact forms, table inline editing |
| Medium (Default) | Inter / 14px / 400 | Standard form fields |
| Large | Inter / 14px / 400 | Prominent inputs, onboarding flows |

### Common Properties

| Property | Value |
|----------|-------|
| Font Family | Inter |
| Font Size | 14px |
| Font Weight | 400 |
| Border Radius | 4px |
| Placeholder Color | `#9ca3af` (gray.400) |

---

## States

| State | Border | Background | Text Color | Notes |
|-------|--------|-----------|------------|-------|
| Default | `#e5e7eb` (gray.200) | White or Grey variant | `#1f2937` (gray.800) | Resting state |
| Hover | `#d1d5db` (gray.300) | Same as default | `#1f2937` | Cursor over field |
| Focused | `#1d4ed8` (primary.700) | Same as default | `#1f2937` | Active typing cursor shown |
| Writing | `#1d4ed8` (primary.700) | Same as default | `#1f2937` | User is actively typing |
| Filled | `#e5e7eb` (gray.200) | Same as default | `#1f2937` | Value present, not focused |
| Disabled | `#e5e7eb` (gray.200) | `#f9fafb` (gray.50) | `#9ca3af` (gray.400) | Non-interactive, `cursor: not-allowed` |
| Error | `#b91c1c` (red.700) | Same as default | `#1f2937` | Validation failed |
| Success | `#15803d` (green.700) | Same as default | `#1f2937` | Validation passed |

---

## Icons & Prefix/Suffix

### Icon Position
- **Left Icon:** Positioned inside input, left side with 12px padding
- **Right Icon:** Positioned inside input, right side with 12px padding

### Prefix/Suffix Text
- **Prefix:** Text before input (e.g., "$", "https://")
- **Suffix:** Text after input (e.g., ".com", "kg")
- **Style:** `#6b7280` (gray.500), 14px

---

## Label

- **Position:** Above input with 8px gap
- **Font Size:** 14px
- **Font Weight:** 500
- **Color:** `#1f2937` (gray.800)
- **Required Indicator:** Red asterisk "*" when field is required

## Helper Text

- **Position:** Below input with 4px gap
- **Font Size:** 12px
- **Color:** `#6b7280` (gray.500)

## Error Message

- **Position:** Below input with 4px gap
- **Font Size:** 12px
- **Color:** `#b91c1c` (red.700)
- **Icon:** Error icon to the left of message

---

## Accessibility

- All inputs must have associated `<label>` with matching `htmlFor` and `id`
- Use `aria-describedby` to link helper text and error messages
- Use `aria-invalid="true"` for inputs in error state
- Use `aria-required="true"` for required fields
- Disabled inputs should have `disabled` attribute and `aria-disabled="true"`
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)
- Keyboard: Tab to focus, standard text editing keys

---

## Related Components

- [Dropdown](./dropdown.md) - For selection from a list
- [Text Area](./text-area.md) - For multi-line text input
- [Checkbox](./checkbox.md) - For boolean inputs
- [Button](./button.md) - For form submission actions
