# Divider

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Divider component visually separates content sections with a horizontal or vertical line. It provides 8 variants across orientations and thickness sizes.

## Component Sets (from Figma)

1. **Divider** -- 8 variants
   - Properties: orientation, size

---

## Variants

### Orientations

| Orientation | Description | Usage |
|------------|-------------|-------|
| Horizontal | Full-width horizontal line | Separating stacked sections, list items, form groups |
| Vertical | Full-height vertical line | Separating side-by-side elements, toolbar groups |

---

## Sizes (Thickness)

| Size | Thickness | Usage |
|------|-----------|-------|
| 2 | 2px | Subtle separation (default) |
| 3 | 3px | Medium emphasis separation |
| 4 | 4px | Strong visual separation |

### Common Properties

| Property | Value |
|----------|-------|
| Background | `#ffffff` (rendered as border on parent) |
| Color | `#e5e7eb` (gray.200) |
| Border Radius | 4px |

---

## Layout Behavior

### Horizontal Divider
- **Width:** 100% of parent container
- **Height:** Size value (2px, 3px, or 4px)
- **Margin:** Typically 8px-16px vertical spacing from surrounding content

### Vertical Divider
- **Width:** Size value (2px, 3px, or 4px)
- **Height:** 100% of parent container (or explicit height)
- **Margin:** Typically 8px-16px horizontal spacing from surrounding content

---

## Accessibility

- Use `<hr>` element for horizontal dividers (semantic separator)
- For vertical dividers, use `role="separator"` with `aria-orientation="vertical"`
- Decorative dividers (purely visual) should use `role="presentation"` or `aria-hidden="true"`
- Dividers should not be focusable
- Ensure sufficient contrast between divider color and background (WCAG AA)

---

## Related Components

- [Card](./card.md) - Cards may contain internal dividers
- [Dropdown](./dropdown.md) - Dropdown lists may use dividers between groups
