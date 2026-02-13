# Icon

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Icon component renders SVG icons from the Saleshandy icon library (`@saleshandy/icons`). It supports 7 size variants and multiple layout templates for icon presentation.

## Component Sets (from Figma)

1. **Icon** -- 7 size variants
   - Properties: size
2. **Product Layout Templates** -- Icon presentation containers

---

## Sizes

| Size | Dimensions | Usage |
|------|-----------|-------|
| 12px | 12 x 12 | Inline text indicators, micro badges |
| 14px | 14 x 14 | Small buttons, compact UI elements |
| 16px | 16 x 16 | Standard inline icons, form field icons |
| 18px | 18 x 18 | Medium emphasis icons |
| 20px | 20 x 20 | Navigation icons, action buttons |
| 24px | 24 x 24 | Primary action icons, headers |
| 32px | 32 x 32 | Large feature icons, empty states |

### Common Properties

| Property | Value |
|----------|-------|
| Color | `currentColor` (inherits from parent text color) |
| Display | Inline-flex |
| Vertical Align | Middle |
| Flex Shrink | 0 |

---

## Icon Library

| Property | Value |
|----------|-------|
| Package | `@saleshandy/icons` |
| Format | SVG components (React) |
| Naming Convention | PascalCase (e.g., `ChevronDown`, `MailOpen`, `UserPlus`) |

---

## Product Layout Templates

Icons can be presented within standardized layout containers:

| Template | Description | Usage |
|----------|-------------|-------|
| Default | Icon only, no container | Inline usage, buttons |
| Horizontal | Icon + text, side by side | Menu items, navigation links |
| Vertical | Icon above text | Tab bars, feature grids |
| Square | Icon inside a square container | Tile grids, feature cards |
| Circle | Icon inside a circular container | Status indicators, floating actions |

### Container Properties

| Template | Background | Border Radius | Padding |
|----------|-----------|--------------|---------|
| Square | `#f3f4f6` (gray.100) | 4px | 8px |
| Circle | `#f3f4f6` (gray.100) | 9999px | 8px |

---

## Color Usage

Icons inherit their color from the parent element's `color` property. Common icon colors:

| Context | Color | Token |
|---------|-------|-------|
| Default | `#6b7280` | gray.500 |
| Primary action | `#1d4ed8` | primary.700 |
| Success | `#10b981` | green.500 |
| Warning | `#f59e0b` | amber.500 |
| Error | `#ef4444` | red.500 |
| Disabled | `#9ca3af` | gray.400 |
| Inverse (on dark) | `#ffffff` | white |

---

## Accessibility

- Decorative icons (adjacent to text label): Use `aria-hidden="true"`
- Meaningful icons (standalone, no text label): Use `aria-label` with descriptive text
- Icon buttons: Apply `aria-label` to the button element, not the icon
- Icons should not be focusable on their own (`focusable="false"` on SVG)
- Ensure sufficient size for touch targets when icons are interactive (minimum 24px)
- Do not rely solely on icon color to convey meaning -- pair with text or `aria-label`

---

## Related Components

- [Button](./button.md) - Buttons with leading/trailing icons
- [Avatar](./avatar.md) - Icon type avatar
- [Tooltip](./tooltip.md) - Informational icon with tooltip
- [Labels / Badges / Tags](./labels-badges-tags.md) - Icons inside labels
