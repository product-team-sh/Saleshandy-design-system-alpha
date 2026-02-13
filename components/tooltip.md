# Tooltip

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Tooltip component displays contextual information when users hover over or click on a trigger element. Saleshandy provides two tooltip themes (dark and white) with multiple size and position options totaling 24 variants.

## Component Sets (from Figma)

1. **Tooltip** (Dark) -- 16 variants
2. **White Tooltip** -- 8 variants
   - Properties: Size, Position

---

## Variants

### Dark Tooltip

| Property | Value |
|----------|-------|
| Background | `#1f2937` (gray.800) |
| Text Color | `#ffffff` |
| Border Radius | 4px |
| Font Family | Inter |
| Arrow | Same color as background |

### White Tooltip

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Text Color | `#1f2937` (gray.800) |
| Border Radius | 8px |
| Box Shadow | `0 4px 16px rgba(0, 0, 0, 0.09)` |
| Arrow | Same color as background |

---

## Sizes

| Size | Padding | Max Width | Usage |
|------|---------|-----------|-------|
| S (Small) | 4px 8px | 200px | Short labels, icon descriptions |
| M (Medium) | 8px 12px | 320px | Longer descriptions, help text |

---

## Positions

Tooltips can be placed in 8 positions relative to the trigger element:

| Position | Arrow Location | Description |
|----------|---------------|-------------|
| Top | Bottom center | Above the trigger, centered |
| Top Left | Bottom left | Above the trigger, aligned left |
| Top Right | Bottom right | Above the trigger, aligned right |
| Bottom | Top center | Below the trigger, centered |
| Bottom Left | Top left | Below the trigger, aligned left |
| Bottom Right | Top right | Below the trigger, aligned right |
| Left | Right center | Left of the trigger, centered |
| Right | Left center | Right of the trigger, centered |

---

## Trigger Behavior

| Trigger | Behavior | Usage |
|---------|----------|-------|
| OnHover | Shows on mouseenter, hides on mouseleave | Default -- icon hints, truncated text |
| OnClick | Shows on click, hides on click outside or second click | Interactive tooltips, mobile-friendly |

### Timing

| Property | Value |
|----------|-------|
| Show Delay | 200ms |
| Hide Delay | 100ms |
| Animation | Fade in/out, 150ms ease |

---

## Accessibility

- Trigger element should have `aria-describedby` pointing to the tooltip ID
- Tooltip content uses `role="tooltip"`
- Tooltip must remain visible when hovered (to allow reading/selecting)
- OnHover tooltips should also show on focus for keyboard users
- Escape key dismisses the tooltip
- Avoid placing interactive elements inside tooltips (use a Popover instead)
- Ensure tooltip text meets minimum contrast ratios (WCAG AA)
  - Dark tooltip: white on dark gray passes AAA
  - White tooltip: dark gray on white passes AAA

---

## Related Components

- [Button](./button.md) - Common trigger element for tooltips
- [Icon](./icon.md) - Icon triggers for informational tooltips
- [Toast](./toast.md) - For persistent feedback messages
