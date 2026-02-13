# Banner

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Banner component displays persistent, contextual messages at the top of a page or section to communicate status, tips, or important information. Unlike Toasts (which are transient), Banners persist until explicitly dismissed or the condition resolves.

## Component Sets (from Figma)

1. **Main Banners** — 6 variants
   - Properties: state

---

## Variants

| State | Background | Border | Icon | Usage |
|-------|-----------|--------|------|-------|
| Success | `#ecfdf5` (green.50) | `#d1fae5` (green.100) | Green checkmark | Operation completed, positive confirmation |
| Neutral | `#f3f4f6` (gray.100) | `#e5e7eb` (gray.200) | Gray info icon | General information, non-urgent notices |
| Error | `#fef2f2` (red.50) | `#fee2e2` (red.100) | Red alert icon | Errors, failed operations, critical issues |
| Warning | `#fffbeb` (yellow.50) | `#fef3c7` (yellow.100) | Amber warning icon | Caution, potential issues, approaching limits |
| Information | `#eff6ff` (blue.50) | `#dbeafe` (blue.100) | Blue info icon | Feature announcements, helpful context |
| Tips | `#eef2ff` (indigo.50) | `#e0e7ff` (indigo.100) | Indigo lightbulb icon | Pro tips, best practices, suggestions |

---

## Specs

| Property | Value |
|----------|-------|
| Padding | 8px 16px (top/right/bottom/left) |
| Border Radius | 4px |
| Border Width | 1px |
| Font Family | Inter |
| Font Size | 14px |
| Font Weight | 400 (body), 500 (title if present) |
| Text Color | `#1f2937` (gray.800) |
| Icon Size | 16px |
| Icon-to-text gap | 8px |
| Close button | Right-aligned, 16px icon, gray.500 |

---

## Anatomy

```
┌──────────────────────────────────────────────┐
│  [Icon]  Title (optional)              [✕]   │
│          Body message text here              │
│          [Action Link] (optional)            │
└──────────────────────────────────────────────┘
```

### Elements
- **Icon:** Left-aligned, status-specific icon and color
- **Title:** Optional bold heading (font-weight: 500)
- **Body:** Description text (font-weight: 400)
- **Action Link:** Optional inline link (primary.700 color)
- **Close Button:** Optional dismiss button, right-aligned

---

## Behavior

| Property | Value |
|----------|-------|
| Persistence | Stays until dismissed or condition resolves |
| Position | Top of page/section, full-width within container |
| Stacking | Multiple banners stack vertically with 8px gap |
| Dismissible | Optional close button |
| Animation | Slide down on appear, slide up on dismiss |

---

## Banner vs Toast

| | Banner | Toast |
|---|--------|-------|
| Duration | Persistent | Auto-dismiss (5-8s) |
| Position | Inline, top of content | Fixed, top-right corner |
| Interaction | Dismissible, may have actions | Dismissible |
| Use case | Ongoing state, important context | Transient feedback |

---

## Accessibility

- Use `role="alert"` for Error and Warning banners
- Use `role="status"` for Success, Information, Neutral, and Tips
- Close button: `aria-label="Dismiss banner"`
- Ensure text meets WCAG AA contrast against the colored background
- Action links must be keyboard focusable
- Screen readers should announce the banner content on appearance

---

## Related Components

- [Toast](./toast.md) — For transient feedback notifications
- [Labels / Badges / Tags](./labels-badges-tags.md) — For inline status indicators
- [Icon](./icon.md) — Status icons used in banners
