# Progress Bar

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Progress Bar component visually communicates the completion percentage of a task or metric. Saleshandy provides two styles: a circular progress indicator and a linear bar, each with color-coded states for quality/status indication.

## Component Sets (from Figma)

1. **Circle Progress Bar** -- 6 variants
2. **Line Progress Bar** -- 6 variants

---

## Circle Progress Bar

### States

| State | Text Color | Arc Color | Usage |
|-------|-----------|-----------|-------|
| Poor | `#ef4444` (red.500) | `#ef4444` | Low score (0-33%) |
| Average | `#fb923c` (orange.400) | `#fb923c` | Medium score (34-66%) |
| Excellent | `#10b981` (green.500) | `#10b981` | High score (67-100%) |

### Sizes

| Size | Dimensions | Stroke Width | Font Size | Usage |
|------|-----------|-------------|-----------|-------|
| Small | 40px | 4px | 12px | Inline metrics, table cells |
| Large | 80px | 6px | 18px | Dashboard cards, detail views |

### Common Properties

| Property | Value |
|----------|-------|
| Track (background arc) | `#f3f4f6` (gray.100) |
| Shape | Circle (SVG-based) |
| Start Angle | 12 o'clock (top) |
| Direction | Clockwise |
| Center Text | Percentage value |

---

## Line Progress Bar

### Colors

| Color | Active Track | Usage |
|-------|------------|-------|
| Blue | `#dbeafe` (blue.100) | Default/neutral progress |
| Red | `#fecaca` (red.200) | Poor/negative progress |
| Orange | `#fed7aa` (orange.200) | Average/warning progress |

### Common Properties

| Property | Value |
|----------|-------|
| Track Background | `#f3f4f6` (gray.100) |
| Border Radius | 9999px (pill) |
| Height | 8px |
| Active Bar Radius | 9999px (pill) |

---

## Animation

| Property | Value |
|----------|-------|
| Transition | Width/stroke-dashoffset 300ms ease |
| Initial Load | Animate from 0 to current value |

---

## Accessibility

- Use `role="progressbar"` on the progress element
- Set `aria-valuenow` to the current percentage (0-100)
- Set `aria-valuemin="0"` and `aria-valuemax="100"`
- Provide `aria-label` describing what the progress represents (e.g., "Email health score")
- Color-coded states must be accompanied by text labels or values (do not rely on color alone)
- For circle progress, the center percentage text provides redundant information
- Ensure animation respects `prefers-reduced-motion`

---

## Related Components

- [Spinner](./spinner.md) - For indeterminate loading (no known percentage)
- [Skeleton](./skeleton.md) - For content placeholder loading
- [Labels / Badges / Tags](./labels-badges-tags.md) - Score states pair with progress indicators
