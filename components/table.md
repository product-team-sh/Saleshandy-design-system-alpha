# Table Component

**Status:** Extracted from Saleshandy webui screenshots (2026-02-17)

## Overview

The Table component displays structured data in rows and columns with sorting, pagination, selection, and action capabilities. Used extensively in Sequences, CRM/Prospects, and other list views.

---

## Component Variants

### 1. Standard Data Table
- Multi-column layout with headers
- Row selection (checkboxes)
- Sortable columns
- Pagination controls
- Row actions (kebab menu)

### 2. List View Table
- Simplified single-entity rows
- Toggle between List and Kanban views
- Filters and search

---

## Anatomy

### Table Structure
```
Table
├── Header Row
│   ├── Selection Checkbox (optional)
│   ├── Column Headers (sortable)
│   └── Action Column Header
├── Data Rows (repeating)
│   ├── Selection Checkbox
│   ├── Data Cells
│   └── Action Menu (kebab icon)
└── Footer
    ├── Pagination Info ("Showing X out of Y")
    ├── Rows per page selector
    └── Page navigation
```

---

## Table Header

### Column Header
| Property | Value |
|----------|-------|
| Background | #f9fafb (gray.50) |
| Text Color | #6b7280 (gray.500) |
| Font Size | 12px |
| Font Weight | 500 (medium) |
| Padding | 12px 16px |
| Border Bottom | 1px solid #e5e7eb |
| Height | 40px |

### Sortable Column Header
- Default: No sort indicator
- Ascending: ↑ arrow next to text
- Descending: ↓ arrow next to text
- Hover: Text darkens to #4b5563 (gray.600)

---

## Data Rows

### Row Styles

| State | Background | Border | Text Color |
|-------|-----------|--------|------------|
| Default | #ffffff | 1px solid #e5e7eb (bottom only) | #1f2937 |
| Hover | #f9fafb | Same | Same |
| Selected | #eff6ff (primary.50) | Same | Same |
| Disabled/Draft | #ffffff | Same | #9ca3af (gray.400) |

### Row Height
- **Standard:** 48px
- **Compact:** 40px
- **Comfortable:** 56px

### Cell Padding
- **Standard:** 12px 16px
- **First column (with checkbox):** 12px 16px 12px 24px
- **Last column (actions):** 12px 24px 12px 16px

---

## Cell Types

### 1. Text Cell
- Font Size: 14px
- Font Weight: 400 (regular)
- Text Color: #1f2937 (gray.800)
- Overflow: truncate with ellipsis
- Max lines: 1

### 2. Number Cell
- Font Size: 14px
- Font Weight: 500 (medium)
- Text Align: right
- Format: comma-separated (e.g., "3,761")

### 3. Badge/Status Cell
- Uses Label/Badge component
- Font Size: 12px
- Inline with other content
- Colors: Status-specific (Draft = gray, Paused = red.100)

### 4. Link Cell
- Text Color: #1d4ed8 (primary.700)
- Font Weight: 500 (medium)
- Hover: Underline + darker blue
- Truncate with ellipsis if too long

### 5. Icon + Text Cell
- Icon Size: 16px
- Gap between icon and text: 8px
- Vertical alignment: center

### 6. Score/Metric Cell
- Circular badge with number
- Colors:
  - Red (0-40): #fee2e2 bg, #b91c1c text
  - Yellow (41-70): #fef3c7 bg, #d97706 text
  - Green (71-100): #d1fae5 bg, #047857 text
- Size: 32px diameter
- Font: 12px/600

### 7. Action Cell
- Kebab menu icon (three dots vertical)
- Size: 24x24px clickable area
- Icon color: #6b7280 (gray.500)
- Hover: #1f2937 (gray.800)
- Opens dropdown menu on click

---

## Selection

### Checkbox Column
- Width: 48px
- Checkbox: 16x16px
- Centered vertically and horizontally
- Header checkbox: Select all/deselect all
- Indeterminate state when some selected

### Selected Row Count
- Display: "X selected" text near pagination
- Clear selection button
- Bulk actions toolbar appears when items selected

---

## Sorting

### Sort Indicators
- Unsorted: No icon
- Ascending: ↑ icon (gray.400)
- Descending: ↓ icon (gray.400)
- Active sort: Icon color = #1d4ed8 (primary.700)

### Click Behavior
- First click: Ascending
- Second click: Descending
- Third click: Reset to unsorted

---

## Pagination

### Footer Layout
```
[Showing 25 out of 38] [Rows per page: 25 ▾] [Go to page: 1 /2] [◀ 1 2 ▶]
```

### Pagination Controls

| Element | Style |
|---------|-------|
| "Showing X out of Y" | 14px, gray.500, regular |
| Rows per page dropdown | 14px, gray.700, medium |
| Page input field | 40px height, 60px width, centered text |
| Page buttons | 32x32px, gray.700 text, hover bg gray.100 |
| Active page | Primary.700 bg, white text |
| Arrow buttons | 32x32px, gray icons |

### Rows per Page Options
- 10
- 25 (default)
- 50
- 100

---

## Empty State

### No Data
- Icon: Document/table icon (48x48px, gray.300)
- Heading: "No [entity name] found"
- Subtext: "Add your first [entity] to get started"
- CTA Button: "Add [Entity]" (primary button)
- Center aligned in table area

### No Results (filtered)
- Icon: Search icon
- Heading: "No results found"
- Subtext: "Try adjusting your filters"
- CTA: "Clear filters" (text button)

---

## Filters & Search

### Filter Bar (above table)
- Height: 48px
- Background: #ffffff
- Border bottom: 1px solid #e5e7eb
- Spacing: 16px gap between filter chips

### Filter Chip
- Background: #f3f4f6 (gray.100)
- Border: 1px solid #e5e7eb
- Border Radius: 4px
- Padding: 6px 12px
- Font: 14px/500
- Close icon: 16px, gray.500

### Search Input
- Width: 240px
- Height: 40px
- Placeholder: "Search Name or Email"
- Icon: Magnifying glass (left, 16px)
- Border: 1px solid #e5e7eb
- Border Radius: 4px

---

## Loading State

### Skeleton Rows
- Show 10 skeleton rows while loading
- Skeleton: #f3f4f6 (gray.100) with shimmer animation
- Skeleton blocks mimic cell positions
- Headers remain visible

### Inline Loading (row action)
- Spinner: 16px, gray.400
- Replace action icon temporarily
- Row opacity: 0.6

---

## Responsive Behavior

### Breakpoints
- **Desktop (> 1280px):** All columns visible
- **Laptop (1024-1280px):** Hide lower-priority columns
- **Tablet (768-1024px):** Horizontal scroll, fixed left column
- **Mobile (< 768px):** Switch to card view (not table)

### Column Priority
1. **Always visible:** Name/Title, Primary action
2. **High priority:** Status, Score, Key metrics
3. **Medium priority:** Dates, Counts
4. **Low priority:** Secondary metrics, Tags

---

## Interactions

### Row Click
- Entire row clickable (except action menu)
- Click opens detail view or navigates to entity page
- Cursor: pointer
- Visual feedback: hover state

### Column Resize (optional)
- Drag divider between column headers
- Min width: 80px
- Max width: 400px
- Cursor: col-resize

### Reorder Columns (optional)
- Drag column header to new position
- Visual indicator: semi-transparent header follows cursor
- Drop zones between columns

---

## Accessibility

- **Role:** `role="table"`
- **Headers:** `role="columnheader"` with `scope="col"`
- **Rows:** `role="row"`
- **Cells:** `role="cell"`
- **Sort buttons:** `aria-sort="ascending|descending|none"`
- **Checkboxes:** `aria-label="Select [entity name]"`
- **Pagination:** `aria-label="Pagination navigation"`
- **Keyboard navigation:**
  - Tab: Move through interactive elements
  - Space: Toggle checkbox selection
  - Enter: Activate row/cell action
  - Arrow keys: Navigate cells (optional, advanced)

---

## GitHub Deviation

| Property | Figma/Screenshots | GitHub Code | Notes |
|----------|-------------------|-------------|-------|
| Header bg | #f9fafb | Similar | Match observed |
| Row height | 48px | ~48px | Consistent |
| Font size | 14px | 14px | Consistent |
| Border color | #e5e7eb | Close | Verify exact hex |
| Hover bg | #f9fafb | May differ | Test against tokens |

---

## Related Components

- [Checkbox](./checkbox.md) — Row selection
- [Labels/Badges/Tags](./labels-badges-tags.md) — Status indicators
- [Dropdown](./dropdown.md) — Action menus, filters
- [Input](./input.md) — Search, page input
- [Button](./button.md) — Pagination buttons, bulk actions
- [Spinner](./spinner.md) — Loading states

---

## Implementation Notes

- Use virtualization for tables with 1000+ rows (react-window, react-virtual)
- Memoize row rendering to prevent unnecessary re-renders
- Debounce search input (300ms)
- Cache sort/filter state in URL query params
- Support keyboard shortcuts (Cmd+A = select all, etc.)
