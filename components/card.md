# Card

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Card component provides selectable containers used for choosing options. Saleshandy uses two card types: Radio Card (single-select) and Check Card (multi-select), each with 24 variants across sizes and states.

## Component Sets (from Figma)

1. **Radio Card** -- 24 variants (single selection, radio behavior)
2. **Check Card** -- 24 variants (multi selection, checkbox behavior)
   - Properties: customCard, size, state

---

## Variants

### Radio Card
- **Behavior:** Only one card in a group can be selected at a time
- **Selection indicator:** Radio circle on the card
- **Usage:** Plan selection, single-option pickers

### Check Card
- **Behavior:** Multiple cards in a group can be selected simultaneously
- **Selection indicator:** Checkbox on the card
- **Usage:** Feature toggles, multi-option pickers

---

## Sizes

| Size | Padding (top/right/bottom/left) | Usage |
|------|------|-------|
| Small (Default) | 12px / 16px / 12px / 16px | Compact option lists, settings |
| Large | 16px / 24px / 16px / 24px | Prominent selection cards, onboarding |

### Common Properties

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border Radius | 4px |
| Border Width | 1px |

---

## States

| State | Border | Background | Text Color | Notes |
|-------|--------|-----------|------------|-------|
| Default | `#e5e7eb` (gray.200) | `#ffffff` | `#1f2937` (gray.800) | Resting state |
| Hover | `#d1d5db` (gray.300) | `#ffffff` | `#1f2937` | Cursor over card |
| Selected | `#1d4ed8` (primary.700) | `#ffffff` | `#1f2937` | Active selection, border changes to primary |
| Disabled | `#e5e7eb` (gray.200) | `#f9fafb` (gray.50) | `#9ca3af` (gray.400) | Non-interactive, reduced opacity |
| Error | `#b91c1c` (red.700) | `#ffffff` | `#1f2937` | Validation error state |

---

## Custom Card Content

The `customCard` property allows injecting custom content inside the card container. Cards support:

- **Title:** Primary label text
- **Description:** Secondary description text
- **Icon/Image:** Optional leading visual element
- **Badge:** Optional status indicator

---

## Accessibility

- Radio Cards should use `role="radiogroup"` on the container and `role="radio"` on each card
- Check Cards should use `role="group"` on the container and `role="checkbox"` on each card
- Use `aria-checked` to indicate selection state
- Use `aria-disabled="true"` for disabled cards
- Keyboard: Tab to focus, Space/Enter to select, Arrow keys to navigate within radio groups
- Selected state must be visually distinct (border color change to `#1d4ed8`)
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)

---

## Related Components

- [Checkbox](./checkbox.md) - Standalone checkbox inputs
- [Toggle Button](./toggle-button.md) - On/off toggle switches
- [Input](./input.md) - Text entry fields
- [Dropdown](./dropdown.md) - Selection from a list
