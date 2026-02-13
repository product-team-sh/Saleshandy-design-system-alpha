# Toggle Button

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Toggle Button (switch) component allows users to turn a setting on or off. It provides a visual binary control with 30 variants across sizes and states.

## Component Sets (from Figma)

1. **Toggle Button** -- 30 variants
   - Properties: Switch (on/off), State, Size

---

## Variants

### Switch States

| Switch | Track Background | Knob Position | Description |
|--------|-----------------|---------------|-------------|
| Off | `#d1d5db` (gray.300) | Left | Setting is inactive |
| On | `#1d4ed8` (primary.700) | Right | Setting is active |

---

## Sizes

| Size | Track Dimensions | Knob Dimensions | Usage |
|------|-----------------|----------------|-------|
| Small | 28px x 16px | 12px | Compact settings, table rows |
| Medium | 36px x 20px | 16px | Standard forms (default) |
| Large | 44px x 24px | 20px | Prominent settings |

### Common Properties

| Property | Value |
|----------|-------|
| Border Radius | 9999px (pill shape) |
| Padding | 2px all sides |
| Text Color | `#1f2937` (gray.800) |

---

## States

### Off States

| State | Track Background | Knob | Notes |
|-------|-----------------|------|-------|
| Default | `#d1d5db` (gray.300) | `#ffffff` | Resting off state |
| Hover | `#9ca3af` (gray.400) | `#ffffff` | Darker track on hover |
| Pressed | `#6b7280` (gray.500) | `#ffffff` | Active press |
| Focused | `#d1d5db` (gray.300) | `#ffffff` | Focus ring visible |
| Disabled | `#e5e7eb` (gray.200) | `#ffffff` | Non-interactive, reduced opacity |

### On States

| State | Track Background | Knob | Notes |
|-------|-----------------|------|-------|
| Default | `#1d4ed8` (primary.700) | `#ffffff` | Resting on state |
| Hover | `#1e40af` (primary.800) | `#ffffff` | Darker track on hover |
| Pressed | `#1e3a8a` (primary.900) | `#ffffff` | Active press |
| Focused | `#1d4ed8` (primary.700) | `#ffffff` | Focus ring visible |
| Disabled | `#1d4ed8` at reduced opacity | `#ffffff` | Non-interactive |

---

## Accessibility

- Use `role="switch"` with `aria-checked="true"` or `"false"`
- Use `aria-disabled="true"` for disabled toggles
- Associate a visible label via `aria-labelledby` or adjacent `<label>`
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)
- Keyboard: Tab to focus, Space or Enter to toggle
- Transition between on/off should include smooth animation (150-200ms ease)
- Ensure sufficient contrast between on/off track colors (WCAG AA)

---

## Related Components

- [Checkbox](./checkbox.md) - For multi-select boolean options
- [Card](./card.md) - Check Card and Radio Card for selectable containers
- [Button](./button.md) - For triggering actions
