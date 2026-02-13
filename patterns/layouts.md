# Layout Patterns

**Status:** Populated from Figma SH-Design-System-2025 + GitHub webui analysis

## Overview

This document defines common layout patterns used throughout the Saleshandy application.

---

## Page Layouts

### Standard Page Layout
```
┌─────────────────────────────────────┐
│          Header/Navbar              │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │      Main Content            │
│ bar  │                              │
│      │                              │
└──────┴──────────────────────────────┘
```

**Specifications:**
- **Header Height:** ~48-56px (sticky, top: 0)
- **Header Shadow:** `shadows.header` — 0 2px 4px rgba(229,231,235,1.0)
- **Header Background:** #ffffff
- **Header Border Bottom:** 1px solid #e5e7eb (gray.200)
- **Sidebar Width:** Variable (collapsible)
- **Sidebar Shadow:** `shadows.sidebar` — 2px 0 10px rgba(243,244,246,1.0)
- **Main Content:** flex: 1, overflow-y: auto
- **Main Content Padding:** 24px (spacing.6)

### Full-Width Layout (No Sidebar)
```
┌─────────────────────────────────────┐
│          Header/Navbar              │
├─────────────────────────────────────┤
│                                     │
│        Main Content                 │
│                                     │
└─────────────────────────────────────┘
```

Used for: Auth pages, onboarding, settings

### Split View Layout
```
┌─────────────────────────────────────┐
│          Header/Navbar              │
├──────────────────┬──────────────────┤
│                  │                  │
│   Left Panel     │   Right Panel    │
│                  │                  │
└──────────────────┴──────────────────┘
```

Used for: Unified Inbox, email preview, prospect details

---

## Grid Guideline (from Figma)

### Screen Breakpoints
| Breakpoint | Width | Columns | Gutter |
|-----------|-------|---------|--------|
| Mobile | < 768px | 4 | 16px |
| Tablet | 768-1024px | 8 | 24px |
| Desktop | 1025-1280px | 12 | 24px |
| Large Desktop | > 1280px | 12 | 32px |

### Content Container
- Max-width: Varies by context (full-width with sidebar, or constrained)
- Padding: 24px (spacing.6) minimum

---

## Drawer Guideline (from Figma)

Drawers slide in from the right side of the screen.

### Drawer Grid
- Drawer overlays main content
- Background overlay: Semi-transparent black
- Drawer width: Variable (small ~400px, medium ~600px, large ~800px)
- Drawer padding: 24px
- Close button: Top-right corner
- Actions bar: Bottom of drawer, sticky

---

## Header/Navbar

### Structure
- **Left:** Logo + Navigation
- **Center:** Search (if applicable)
- **Right:** User menu, notifications, actions

### Specs
- Height: ~48-56px
- Background: #ffffff
- Border-bottom: 1px solid #e5e7eb
- Shadow: `shadows.header`
- Position: sticky, top: 0
- z-index: `zIndex.sticky` (1100)

---

## Sidebar

### Structure
- **Top:** Navigation links (primary)
- **Middle:** Secondary navigation
- **Bottom:** Footer items (settings, help)

### Specs
- Background: #ffffff
- Border-right: 1px solid #e5e7eb
- Shadow: `shadows.sidebar` (optional, used in some views)
- Collapsible: Yes
- Transition: `transitions.slow` (300ms)

---

## Content Spacing

### Vertical Spacing
| Context | Spacing |
|---------|---------|
| Between page sections | 32px (spacing.8) |
| Between content blocks | 24px (spacing.6) |
| Between related elements | 16px (spacing.4) |
| Between tightly coupled items | 8px (spacing.2) |
| Label to input | 8px (spacing.2) |
| Input to helper text | 4px (spacing.1) |

### Horizontal Spacing
| Context | Spacing |
|---------|---------|
| Between columns/cards | 16-24px (spacing.4-6) |
| Inline element spacing | 8px (spacing.2) |
| Button group spacing | 8px (spacing.2) |

---

## Card Grid

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 16px; /* spacing.4 */
```

Responsive: 1 column on mobile, 2 on tablet, 3+ on desktop.

---

## Modal/Dialog Layout

### Structure
```
┌──────────────────────────────┐
│  Title                    ✕  │
├──────────────────────────────┤
│                              │
│         Body Content         │
│                              │
├──────────────────────────────┤
│              Cancel  Submit  │
└──────────────────────────────┘
```

### Specs
- Max-width: Variable (sm ~400px, md ~600px, lg ~800px)
- Border-radius: `borderRadius.md` (8px)
- Shadow: `shadows.modal`
- Backdrop: rgba(0, 0, 0, 0.5)
- z-index: `zIndex.modal` (1200)
- Padding: 24px
- Footer button alignment: right
- Button spacing: 8px between Cancel and Submit

---

## Empty States

### Structure
```
┌──────────────────────────────┐
│           [Icon]             │
│                              │
│       Heading Text           │
│     Description Text         │
│                              │
│      [Action Button]         │
└──────────────────────────────┘
```

### Spacing
- Icon to heading: 16px
- Heading to description: 8px
- Description to button: 24px
- Center-aligned

---

## Table Layout

### Specs
- Header row: sticky (optional), bg=#f9fafb, font-weight=600
- Row height: ~40-48px
- Cell padding: 8px 16px
- Border: 1px solid #e5e7eb between rows
- Hover row: bg=#f9fafb
- Pagination: below table, `shadows.pagination`

### Responsive
- Horizontal scroll on narrow screens
- Or collapse to card layout on mobile
