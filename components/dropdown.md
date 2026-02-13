# Dropdown

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Dropdown component provides a selectable list of options in a popup overlay. It supports both single-select and multi-select modes with 78 variants covering input colors, sizes, and states.

## Component Sets (from Figma)

1. **Dropdown** -- 78 variants
   - Properties: Input Color, Multiselect, Size, State

---

## Variants

### Selection Mode

| Mode | Behavior | Description |
|------|----------|-------------|
| Single Select (`Multiselect: false`) | One option at a time | Standard dropdown, selection closes popup |
| Multi Select (`Multiselect: true`) | Multiple options | Checkboxes in list, stays open until dismissed |

### Input Color

| Variant | Background | Usage |
|---------|-----------|-------|
| White | `#ffffff` | Default, on colored backgrounds |
| Grey | `#f9fafb` (gray.50) | On white backgrounds for subtle contrast |

---

## Sizes

| Size | Font Size | Usage |
|------|----------|-------|
| Small | 14px | Compact forms, filters, table headers |
| Medium | 14px | Standard forms (default) |
| Large | 14px | Prominent selections, onboarding |

### Common Properties

| Property | Value |
|----------|-------|
| Font Family | Inter |
| Font Weight | 400 |
| Border Radius (trigger) | 4px |

---

## States

### Trigger (Input) States

| State | Border | Background | Text Color | Notes |
|-------|--------|-----------|------------|-------|
| Default | `#e5e7eb` (gray.200) | White or Grey variant | `#9ca3af` (placeholder) | Resting state, shows placeholder |
| Value (Filled) | `#e5e7eb` (gray.200) | White or Grey variant | `#1f2937` (gray.800) | A value has been selected |
| Hover | `#d1d5db` (gray.300) | Same as default | Same as current | Cursor over trigger |
| Focused | `#1d4ed8` (primary.700) | Same as default | Same as current | Popup is open |
| Disabled | `#e5e7eb` (gray.200) | `#f9fafb` (gray.50) | `#9ca3af` (gray.400) | Non-interactive |
| Error | `#b91c1c` (red.700) | Same as default | Same as current | Validation failed |
| No Data | `#e5e7eb` (gray.200) | Same as default | `#9ca3af` (gray.400) | Empty state, no options available |

---

## Popup (Dropdown List)

### Popup Container

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border | 1px solid `#e5e7eb` (gray.200) |
| Border Radius | 8px |
| Box Shadow | `2px 2px 16px rgba(4, 21, 76, 0.16)` |
| Max Height | Scrollable with overflow |

### Dropdown Item

| State | Background | Text Color | Padding (top/right/bottom/left) |
|-------|-----------|------------|------|
| Default | `#ffffff` | `#000000` | 8px / 16px / 8px / 16px |
| Hover | `#f9fafb` (gray.50) | `#000000` | 8px / 16px / 8px / 16px |
| Selected | `#eff6ff` (blue.50) | `#000000` | 8px / 16px / 8px / 16px |
| Disabled | `#ffffff` | `#9ca3af` (gray.400) | 8px / 16px / 8px / 16px |

### No Data State
- Displays an empty state message centered in the popup
- Text: `#9ca3af` (gray.400)
- Usage: When filter returns no results or option list is empty

---

## Multi-Select Behavior

- Each item displays a checkbox indicator
- Selected items shown as tags/chips in the trigger input
- "Select All" option available at the top of the list
- Clear all selection action available

---

## Accessibility

- Trigger uses `role="combobox"` with `aria-expanded`, `aria-haspopup="listbox"`
- Popup list uses `role="listbox"`
- Each option uses `role="option"` with `aria-selected`
- Multi-select options include `aria-checked` state
- Use `aria-activedescendant` for keyboard highlight tracking
- Use `aria-disabled="true"` for disabled states
- Keyboard: Tab to focus trigger, Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)

---

## Related Components

- [Input](./input.md) - For free-text entry
- [Checkbox](./checkbox.md) - Standalone multi-select options
- [Button](./button.md) - For triggering actions
- [Labels / Badges / Tags](./labels-badges-tags.md) - For displaying selected multi-select values
