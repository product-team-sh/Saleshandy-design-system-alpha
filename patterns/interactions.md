# Interaction Patterns

**Status:** Populated from Figma SH-Design-System-2025 + GitHub webui analysis

## Overview

This document defines how UI elements respond to user interactions throughout the Saleshandy application. All implementations must follow these patterns for consistency.

---

## Hover States

### Buttons
- **Transition:** `transitions.base` (200ms ease-in-out)
- **Changes by type:**
  - **Primary Fill:** Background darkens (#1d4ed8 → #1e40af)
  - **Primary Outline:** Light blue fill appears (transparent → #dbeafe)
  - **Secondary:** Gray fill appears (transparent → #f3f4f6)
  - **Tertiary:** Gray fill appears (transparent → #f3f4f6)
  - **Text Button (primary):** Text darkens (#1d4ed8 → #1e40af)
  - **Text Button (secondary):** Text darkens (#6b7280 → #4b5563)
  - **Error:** Background darkens (#b91c1c → #991b1b)
  - **AI:** Purple tint fill (#f5f3ff)

### Links
- **Transition:** `transitions.fast` (150ms ease-in-out)
- **Changes:**
  - Color: Darkens (#1d4ed8 → #1e40af)
  - Underline: Appears on hover for link buttons

### Cards (Interactive — Radio Card / Check Card)
- **Transition:** `transitions.base` (200ms ease-in-out)
- **Changes:**
  - Border: Lightens or becomes primary (#e5e7eb → hover state)
  - Background: Subtle fill
  - Cursor: pointer

### Inputs
- **Transition:** `transitions.fast` (150ms ease-in-out)
- **Changes:**
  - Border color: Subtle darkening
  - No background change

### Dropdown Items
- **Transition:** `transitions.fast` (150ms ease-in-out)
- **Changes:**
  - Background: #ffffff → #f9fafb (gray.50)
  - Text: No change (#000000)

### Toggle Buttons
- **Transition:** `transitions.base` (200ms ease-in-out)
- **Changes:**
  - Track background: Slight darkening
  - Knob: No change

---

## Focus States

### All Interactive Elements
- **Focus Ring:** Box-shadow based (not outline)
- **Value:** `shadows.focused` — 0 0 0 2px rgba(29, 78, 216, 0.25)
- **Color:** Primary blue at 25% opacity
- **Offset:** 0px (directly on element)
- **Transition:** `transitions.fast` (150ms ease-in-out)

### Buttons (Focused)
- Primary Fill: bg=#1e40af + focus ring
- Primary Outline: bg=#dbeafe, text=#1e40af + focus ring
- Secondary: bg=#f3f4f6, text=#4b5563 + focus ring
- Text buttons: Color change + focus ring

### Inputs (Focused)
- Border: #1d4ed8 (primary.700)
- Focus ring: `shadows.focused`
- Background: No change

### Checkboxes (Focused)
- Focus ring around checkbox element
- Border: #1d4ed8

---

## Active/Pressed States

### Buttons
- **Transition:** Instant (< 50ms)
- **Primary Fill:** bg=#1e3a8a (darkest blue)
- **Primary Outline:** bg=#bfdbfe (medium blue tint)
- **Secondary:** bg=#e5e7eb (gray fill)
- **Tertiary:** bg=#e5e7eb
- **Text Button (primary):** text=#1e3a8a
- **Text Button (secondary):** text=#4b5563
- **Error:** bg=#7f1d1d
- **AI:** bg=#ede9fe

### Toggle Buttons
- Track: Slight darkening
- Knob: Scale or visual press feedback

---

## Loading States

### Buttons
- Spinner replaces or accompanies text
- `aria-busy="true"`
- Pointer-events disabled
- Same background as default state
- Cursor: wait

### Inputs
- Loading indicator in right position
- Still enabled for continued typing

### Page/Section
- Skeleton screens (bg=#f3f4f6, radius=4px, animated shimmer)
- Spinner for small areas

---

## Disabled States

### All Elements
- Opacity: 0.5
- Cursor: `not-allowed`
- Pointer-events: none
- No hover/focus/active state changes

### Buttons (Disabled)
- Same colors as default with 0.5 opacity
- All types follow same pattern

### Inputs (Disabled)
- Background: #f9fafb (gray.50)
- Border: #e5e7eb (gray.200)
- Text: #9ca3af (gray.400)
- Cursor: not-allowed

### Checkboxes (Disabled)
- Reduced opacity
- Border: lighter gray
- No interaction

### Toggle Buttons (Disabled)
- Off: bg=#e5e7eb (lighter than default #d1d5db)
- No interaction

---

## Error States

### Inputs
- Border: #b91c1c (red.700)
- Error message below: 12px, #b91c1c
- Error icon: left of message text

### Toast Messages
- Background: #fee2e2 (red.100)
- Border: #fecaca (red.200)
- Auto-dismiss or manual close

---

## Success States

### Inputs
- Border: #10b981 (green.500)
- Success checkmark icon

### Toast Messages
- Background: #d1fae5 (green.100)
- Border: #a7f3d0 (green.200)
- Auto-dismiss after delay

---

## Shadows by Context

| Context | Shadow Value |
|---------|-------------|
| Header | 0 2px 4px rgba(229,231,235,1.0) |
| Dropdown/Popup | 0 4px 16px rgba(0,0,0,0.09) |
| Popover | 2px 2px 16px -3px rgba(4,21,76,0.16) |
| Tooltip | 3px 8px 24px -6px rgba(15,34,67,0.16) |
| Modal | 0 16px 48px -4px rgba(243,244,246,1.0), 0 4px 24px rgba(0,0,0,0.08) |
| Sidebar | 2px 0 10px rgba(243,244,246,1.0) |
| Focus ring | 0 0 0 2px rgba(29,78,216,0.25) |

---

## Cursor Styles

| Context | Cursor |
|---------|--------|
| Buttons, links, cards (interactive) | `pointer` |
| Text inputs, textareas | `text` |
| Disabled elements | `not-allowed` |
| Loading states | `wait` or `progress` |
| Draggable elements | `grab` / `grabbing` |
| Default | `default` |

---

## Keyboard Navigation

- **Tab order:** Logical left-to-right, top-to-bottom
- **Escape:** Close modals, dropdowns, popovers
- **Enter:** Submit forms, activate buttons
- **Space:** Toggle checkboxes, toggle buttons, activate buttons
- **Arrow keys:** Navigate within dropdowns, radio groups
