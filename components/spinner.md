# Spinner

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Spinner component provides a loading indicator to communicate that a process is in progress. It supports 10 variants with two appearance modes and five sizes.

## Component Sets (from Figma)

1. **Spinner** -- 10 variants
   - Properties: appearance, size

---

## Variants

### Appearances

| Appearance | Color | Usage |
|-----------|-------|-------|
| Inherit | Matches the current text/context color | Default -- used inside buttons, inline with content |
| Inverted | `#ffffff` (white) | Used on dark backgrounds, primary-fill buttons |

---

## Sizes

| Size | Dimensions | Stroke Width | Usage |
|------|-----------|-------------|-------|
| XSmall | 12px | 1.5px | Inline text, small buttons |
| Small | 16px | 2px | Buttons, input suffixes |
| Medium | 24px | 2.5px | Card loading, section indicators |
| Large | 32px | 3px | Page section loading |
| XLarge | 48px | 3.5px | Full-page loading overlays |

---

## Animation

| Property | Value |
|----------|-------|
| Type | Circular rotation |
| Duration | 750ms per rotation |
| Timing Function | Linear (constant speed) |
| Track | Partial arc (approximately 270 degrees visible) |

---

## Accessibility

- Use `role="status"` on the spinner container
- Include visually hidden text: "Loading" via `aria-label="Loading"` or a `<span class="sr-only">`
- When used inside a button, the button should have `aria-busy="true"` and be disabled
- When loading replaces content, use `aria-live="polite"` on the container
- Do not rely solely on the spinner -- pair with descriptive loading text when possible

---

## Related Components

- [Button](./button.md) - Loading state uses Spinner
- [Toast](./toast.md) - Loading toast variant uses Spinner
- [Skeleton](./skeleton.md) - Alternative loading pattern for content placeholders
- [Progress Bar](./progress-bar.md) - For determinate loading progress
