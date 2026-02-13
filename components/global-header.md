# Global Header & Sidebar Navigation

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Global Header and Sidebar Navigation define Saleshandy's persistent navigation chrome. The header runs across the top; the sidebar provides primary navigation on the left. Together they frame every authenticated page.

## Component Sets (from Figma)

1. **With Grouping** — 2 variants (Minimised / Full view)
   - Properties: Property 1

---

## Header

### Specs

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border Bottom | 1px solid `#e5e7eb` (gray.200) |
| Shadow | `shadows.header` — 0 2px 4px rgba(229, 231, 235, 1.0) |
| Height | ~48-56px |
| Padding | 12px 24px |
| Position | Sticky, top: 0 |
| z-index | 1100 (`zIndex.sticky`) |

### Structure (left to right)

| Zone | Content |
|------|---------|
| Left | Logo + sidebar toggle (hamburger) |
| Center | Page title / breadcrumb / search |
| Right | Notifications, help, profile dropdown |

---

## Sidebar Navigation

### Specs

| Property | Full View | Minimised |
|----------|-----------|-----------|
| Width | ~220px | ~60px |
| Background | `#ffffff` |
| Border Right | 1px solid `#e5e7eb` (gray.200) |
| Padding | 12px |
| Border Radius | — (flush to edge) |
| Transition | `transitions.slow` (300ms) |

### Structure (top to bottom)

| Zone | Content |
|------|---------|
| Top | Primary navigation links (Sequences, Prospects, etc.) |
| Middle | Secondary navigation (Templates, Reports, etc.) |
| Bottom | Settings, Help, Profile |

### Navigation Item States

| State | Background | Text | Icon |
|-------|-----------|------|------|
| Default | transparent | `#6b7280` (gray.500) | gray.500 |
| Hover | `#f3f4f6` (gray.100) | `#1f2937` (gray.800) | gray.800 |
| Active/Selected | `#eff6ff` (blue.50) | `#1d4ed8` (primary.700) | primary.700 |
| Disabled | transparent | `#9ca3af` (gray.400) | gray.400 |

### Navigation Item Specs

| Property | Value |
|----------|-------|
| Padding | 8px 12px |
| Border Radius | 4px |
| Icon Size | 20px |
| Font Size | 14px |
| Font Weight | 400 (default), 500 (active) |
| Gap (icon to label) | 12px |
| Gap (between items) | 2px |

---

## Page Screens (from Figma)

The Global Header page includes dev-ready page layouts for:

| Screen | Background | Content Area |
|--------|-----------|-------------|
| Sequence Listing | `#ffffff` | Table + pagination + bulk actions |
| Email Accounts | `#ffffff` | Table with shadow card (r=8, shadow 0 2 20) |
| Analytics | `#f9fafb` (gray.50) | Dashboard cards |
| Unified Inbox | `#ffffff` | Split view (list + detail) |
| Templates | `#ffffff` | List view |
| Email Warm-up | `#f9fafb` / `#ffffff` | Mixed layout |
| Onboarding Steps | `#ffffff` | Step wizard |
| Tasks | `#ffffff` | List + pagination |
| Dialer Module | `#ffffff` | Communication interface |
| 1:1 Email Insight | `#ffffff` | Detail view |

### Content Area Common Specs

| Property | Value |
|----------|-------|
| Main content padding | 40px all sides |
| Content card radius | 8px |
| Content card shadow | 0 2px 20px (subtle) |
| Pagination shadow | 0 0 10px rgba(4,21,76,0.08) |

---

## Accessibility

- Navigation uses `<nav>` element with `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Sidebar toggle: `aria-expanded="true/false"`, `aria-controls="sidebar"`
- Skip navigation link: First focusable element, hidden until focused
- Keyboard: Tab through nav items, Enter to activate, Escape to collapse
- Minimised state: Icons retain `aria-label` with full navigation name

---

## Related Components

- [Banner](./banner.md) — Displayed below header, above content
- [Avatar](./avatar.md) — User avatar in profile dropdown
- [Dropdown](./dropdown.md) — Profile and notification dropdowns
- [Tooltip](./tooltip.md) — Navigation tooltips in minimised mode
- [Icon](./icon.md) — Navigation icons
