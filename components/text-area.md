# Text Area

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Text Area component provides a multi-line text input field with optional rich text toolbar and attachment upload support. It has 20 variants across spacing and state options.

## Component Sets (from Figma)

1. **Text Area** -- 20 variants
   - Properties: Spacing, State

---

## Variants

### Spacing

| Spacing | Padding | Usage |
|---------|---------|-------|
| Small | Compact internal padding | Inline editing, comments, compact forms |
| Large | Generous internal padding | Email composition, rich content editing |

---

## States

| State | Border | Background | Text Color | Notes |
|-------|--------|-----------|------------|-------|
| Default | `#e5e7eb` (gray.200) | `#ffffff` | `#1f2937` (gray.800) | Resting state, shows placeholder |
| Filled | `#e5e7eb` (gray.200) | `#ffffff` | `#1f2937` (gray.800) | Content entered, not focused |
| Focused | `#1d4ed8` (primary.700) | `#ffffff` | `#1f2937` (gray.800) | Active editing, cursor visible |
| Disabled | `#e5e7eb` (gray.200) | `#f9fafb` (gray.50) | `#9ca3af` (gray.400) | Non-interactive, `cursor: not-allowed` |
| Error | `#b91c1c` (red.700) | `#ffffff` | `#1f2937` (gray.800) | Validation failed |

### Common Properties

| Property | Value |
|----------|-------|
| Font Family | Inter |
| Font Size | 14px |
| Font Weight | 400 |
| Border Radius | 4px |
| Placeholder Color | `#9ca3af` (gray.400) |
| Min Height | 80px |
| Resize | Vertical |

---

## Rich Text Toolbar

The text area optionally includes a rich text formatting toolbar.

### Toolbar Actions

| Action | Icon | Description |
|--------|------|-------------|
| Font Size | `A` dropdown | Change text font size |
| Font Weight | `B` | Toggle bold text |
| Alignment | Align icons | Left, center, right alignment |
| Listing | List icons | Ordered and unordered lists |
| Attachments | Paperclip | Upload file attachments |

### Toolbar Properties

| Property | Value |
|----------|-------|
| Position | Bottom of text area |
| Background | `#ffffff` |
| Border Top | 1px solid `#e5e7eb` (gray.200) |
| Padding | 4px 8px |
| Icon Size | 16px |
| Icon Color | `#6b7280` (gray.500) |
| Active Icon Color | `#1d4ed8` (primary.700) |

---

## Attachment Upload

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border | 1px solid `#d1d5db` (gray.300) |
| Padding | 8px |
| Border Radius | 4px |
| File Name Color | `#1f2937` (gray.800) |
| File Size Color | `#6b7280` (gray.500) |
| Remove Button | `#ef4444` (red.500) icon |

---

## Accessibility

- Use `<textarea>` element for proper semantics
- Associate with `<label>` via `htmlFor`/`id` pairing
- Use `aria-describedby` to link helper text and error messages
- Use `aria-invalid="true"` for error state
- Use `aria-required="true"` for required fields
- Rich text toolbar buttons must have `aria-label` descriptions
- Active formatting states should use `aria-pressed="true"`
- Attachment list should be announced to screen readers with `aria-live="polite"`
- Keyboard: Tab to focus, standard text editing keys, Tab/Shift+Tab for toolbar navigation
- Focus ring: `0 0 0 2px rgba(29, 78, 216, 0.25)` (primary.700 at 25% opacity)

---

## Related Components

- [Input](./input.md) - Single-line text entry
- [Dropdown](./dropdown.md) - For selection-based inputs
- [Button](./button.md) - For form submission actions
- [Icon](./icon.md) - Toolbar icons
