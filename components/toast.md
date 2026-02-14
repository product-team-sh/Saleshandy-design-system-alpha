# Toast Message

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Toast Message component displays brief, non-blocking feedback notifications to the user. It supports 6 variants for different feedback types including success, error, warning, information, neutral, and loading states.

## Component Sets (from Figma)

1. **Toast Message** -- 6 variants
   - Properties: State/Type

---

## Variants

### Toast Types

| Type | Background | Border | Icon Color | Usage |
|------|-----------|--------|-----------|-------|
| Success | `#d1fae5` (green.100) | `#a7f3d0` (green.200) | `#10b981` (green.500) | Action completed successfully |
| Error | `#fee2e2` (red.100) | `#fecaca` (red.200) | `#ef4444` (red.500) | Action failed or error occurred |
| Warning | `#fef3c7` (amber.100) | `#fde68a` (amber.200) | `#f59e0b` (amber.500) | Caution or important notice |
| Information | `#dbeafe` (blue.100) | `#bfdbfe` (blue.200) | `#3b82f6` (blue.500) | Informational feedback |
| Neutral | `#f3f4f6` (gray.100) | `#e5e7eb` (gray.200) | `#6b7280` (gray.500) | Generic notification |
| Loading | `#f3f4f6` (gray.100) | `#e5e7eb` (gray.200) | -- | Async operation in progress (spinner variant) |

---

## Anatomy

| Property | Value |
|----------|-------|
| Padding | 8px 16px |
| Border Radius | 4px |
| Border Width | 1px |
| Font Family | Inter |
| Font Size | 14px |
| Font Weight | 400 |
| Text Color | `#1f2937` (gray.800) |

### Structure
- **Icon:** Left-aligned status icon (or spinner for Loading)
- **Message:** Primary text content
- **Action (optional):** Text link for undo or follow-up action
- **Close Button (optional):** Dismiss the toast manually

---

## Behavior

| Property | Value |
|----------|-------|
| Position | Mid-center at bottom with 24px bottom padding |
| Auto-dismiss | 5000ms (default) |
| Loading variant | Persists until operation completes |
| Stacking | Multiple toasts stack vertically with 8px gap |
| Animation | Slide in from top, fade out |

---

## Accessibility

- Use `role="status"` for non-critical toasts (success, info, neutral)
- Use `role="alert"` for critical toasts (error, warning)
- Use `aria-live="polite"` for status, `aria-live="assertive"` for alerts
- Close button must be keyboard accessible with `aria-label="Dismiss notification"`
- Loading toast should include `aria-busy="true"` and descriptive text
- Toasts should not disappear too quickly (minimum 5 seconds for auto-dismiss)
- Action links must be focusable and clearly labeled
- Ensure color is not the only indicator of toast type (icons provide redundancy)

---

## Related Components

- [Spinner](./spinner.md) - Used in Loading toast variant
- [Tooltip](./tooltip.md) - For hover-based contextual information
- [Labels / Badges / Tags](./labels-badges-tags.md) - For inline status indicators
