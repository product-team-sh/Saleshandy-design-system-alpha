# Labels, Badges & Tags

**Status:** Populated from Figma SH-Design-System-2025

## Overview

Labels, badges, and tags are compact UI elements used to categorize, indicate status, or highlight information. The Refined Label component provides 238 variants with extensive customization for status, type, shape, and size. A separate Badge component provides dot indicators.

## Component Sets (from Figma)

1. **Refined Label** -- 238 variants
   - Properties: Status, Size, Type, Radius, withBorder, Numeric, State
2. **Badge** -- Dot indicator variants

---

## Refined Label

### Statuses

| Status | Surface Background | Surface Text | Bordered Border | Usage |
|--------|-------------------|-------------|----------------|-------|
| Accent (Blue) | `#eff6ff` (blue.50) | `#1f2937` (gray.800) | `#bfdbfe` (blue.200) | Primary/default label |
| Success (Green) | `#ecfdf5` (green.50) | `#1f2937` (gray.800) | `#a7f3d0` (green.200) | Positive status |
| Warning (Yellow) | `#fffbeb` (amber.50) | `#1f2937` (gray.800) | `#fde68a` (amber.200) | Caution status |
| Error (Red) | `#fef2f2` (red.50) | `#1f2937` (gray.800) | `#fecaca` (red.200) | Negative status |
| Gray | `#f3f4f6` (gray.100) | `#1f2937` (gray.800) | `#e5e7eb` (gray.200) | Neutral/default |

### Types

| Type | Description | Visual |
|------|-------------|--------|
| Surface | Background color only, no border | Filled background with text |
| Bordered | Background color with matching border | Filled background + 1px border |

### Radius

| Radius | Value | Usage |
|--------|-------|-------|
| Cornered | 4px | Standard labels, tags |
| Pill | 9999px | Rounded pill-shaped labels, badges |

---

## Sizes

| Size | Padding (top/right/bottom/left) | Font Size | Usage |
|------|------|-----------|-------|
| Small | 2px / 6px / 2px / 6px | 12px | Inline tags, compact indicators |
| Medium | 4px / 8px / 4px / 8px | 12px | Standard labels (default) |
| Large | 4px / 8px / 4px / 8px | 14px | Prominent labels, headings |

### Common Properties

| Property | Value |
|----------|-------|
| Font Family | Inter |
| Font Weight | 500 |

---

## Score States

Special label variants used for scoring/rating display:

| Score State | Background | Border | Text Color | Usage |
|-------------|-----------|--------|-----------|-------|
| Positive | `#ecfdf5` (green.50) | `#10b981` (green.500) | `#10b981` | High scores, good metrics |
| Warning | `#fffbeb` (amber.50) | `#f59e0b` (amber.500) | `#f59e0b` | Average scores, caution metrics |
| Negative | `#fef2f2` (red.50) | `#ef4444` (red.500) | `#ef4444` | Low scores, poor metrics |

---

## Numeric Labels

When the `Numeric` property is enabled, the label displays a number value (e.g., count badges, notification counts).

---

## Badge (Dot Indicator)

Small dot indicators used to signal status without text.

| Status | Color | Usage |
|--------|-------|-------|
| Success | `#10b981` (green.500) | Online, active, healthy |
| Error | `#ef4444` (red.500) | Offline, failed, critical |
| Processing | `#3b82f6` (blue.500) | In progress, loading |
| Warning | `#f59e0b` (amber.500) | Needs attention, degraded |
| Default | `#9ca3af` (gray.400) | Neutral, inactive |

### Badge Properties

| Property | Value |
|----------|-------|
| Size | 8px diameter |
| Shape | Circle (border-radius: 9999px) |
| Animation (Processing) | Pulse animation |

---

## Accessibility

- Labels/tags should use `<span>` with descriptive text content
- For icon-only labels, provide `aria-label` with the status meaning
- Badges used as status indicators need `aria-label` describing the status (e.g., "Status: Online")
- Color must not be the sole indicator -- combine with text or icons
- Numeric badges on icons should use `aria-label` (e.g., "3 unread notifications")
- Ensure all text meets WCAG AA contrast ratios against their backgrounds

---

## Related Components

- [Toast](./toast.md) - For transient feedback messages
- [Tooltip](./tooltip.md) - For hover-based contextual information
- [Avatar](./avatar.md) - Often paired with status badges
- [Icon](./icon.md) - Often paired with notification badges
