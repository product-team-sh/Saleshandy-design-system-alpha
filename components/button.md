# Button Component

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Button component triggers actions and events. Saleshandy uses a rich button system with 9 types, 6 states, and 2 sizes.

## Component Sets (from Figma)

There are 3 Figma component sets for buttons:
1. **Button** — Primary action buttons (text + optional icon)
2. **Secondary Action** — Icon-only action buttons (used in toolbars, inline actions)
3. **Split Button** — Buttons with a dropdown arrow for multiple actions

---

## Button Types

### Primary Fill
- **Usage:** Main CTAs (Save, Create, Send)
- **Background:** `colors.primary.700` (#1d4ed8)
- **Text:** `colors.text.inverse` (#ffffff)
- **Border:** None
- **Font:** Inter/14px/500

### Primary Outline
- **Usage:** Secondary prominent actions
- **Background:** Transparent
- **Text:** `colors.primary.700` (#1d4ed8)
- **Border:** 1px solid `colors.primary.700` (#1d4ed8)

### Secondary
- **Usage:** Secondary actions (Cancel, Back)
- **Background:** Transparent
- **Text:** `colors.gray.500` (#6b7280)
- **Border:** 1px solid `colors.gray.200` (#e5e7eb)

### Tertiary
- **Usage:** Low-emphasis actions
- **Background:** Transparent
- **Text:** `colors.gray.500` (#6b7280)
- **Border:** None

### Primary Text Button
- **Usage:** Inline text actions
- **Background:** Transparent
- **Text:** `colors.primary.700` (#1d4ed8)
- **Border:** None

### Primary Link Button
- **Usage:** Navigation-style actions
- **Background:** Transparent
- **Text:** `colors.primary.700` (#1d4ed8)
- **Border:** None (underline on text)

### Secondary Text Button
- **Usage:** Low-emphasis inline text actions
- **Text:** `colors.gray.500` (#6b7280)

### Secondary Link Button
- **Usage:** Low-emphasis navigation-style actions
- **Text:** `colors.gray.500` (#6b7280)

### Error / Danger
- **Usage:** Destructive actions (Delete, Remove)
- **Background:** `colors.red.700` (#b91c1c)
- **Text:** `colors.text.inverse` (#ffffff)
- **Border:** None

### AI
- **Usage:** AI-powered actions
- **Background:** Gradient (purple tones)
- **Text:** Purple
- **Border:** None

---

## Sizes

### Large (Default)
| Property | Primary Fill | Primary Outline | Secondary | Tertiary | Text/Link | Error |
|----------|-------------|-----------------|-----------|----------|-----------|-------|
| Padding | 6px 16px | 6px 16px | 6px 16px | 6px 8px | 2px 4px | 6px 16px |
| Font Size | 14px | 14px | 14px | 14px | 14px | 14px |
| Font Weight | 500 | 500 | 500 | 500 | 500 | 500 |
| Border Radius | 4px | 4px | 4px | 4px | 4px | 4px |

### Small
| Property | Primary Fill | Primary Outline | Secondary | Tertiary | Text/Link | Error |
|----------|-------------|-----------------|-----------|----------|-----------|-------|
| Padding | 2px 8px | 2px 8px | 2px 8px | 0 4px | 0 4px | 2px 8px |
| Font Size | 14px | 14px | 14px | 14px | 14px | 14px |
| Font Weight | 500 | 500 | 500 | 500 | 500 | 500 |
| Border Radius | 4px | 4px | 4px | 4px | 4px | 4px |

---

## States

### Primary Fill States
| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | #1d4ed8 | #ffffff | — |
| Hover | #1e40af | #ffffff | — |
| Pressed | #1e3a8a | #ffffff | — |
| Focused | #1e40af | #ffffff | + focus ring |
| Disabled | #1d4ed8 (opacity 0.5) | #ffffff | — |
| Loading | #1d4ed8 | #ffffff | + spinner |

### Primary Outline States
| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | transparent | #1d4ed8 | #1d4ed8 |
| Hover | #dbeafe | #1d4ed8 | #1d4ed8 |
| Pressed | #bfdbfe | #1d4ed8 | #1d4ed8 |
| Focused | #dbeafe | #1e40af | #1d4ed8 + focus ring |
| Disabled | transparent (opacity 0.5) | #1d4ed8 | #1d4ed8 |
| Loading | transparent | #1d4ed8 | #1d4ed8 + spinner |

### Secondary States
| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | transparent | #6b7280 | #e5e7eb |
| Hover | #f3f4f6 | #6b7280 | #e5e7eb |
| Pressed | #e5e7eb | #6b7280 | #e5e7eb |
| Focused | #f3f4f6 | #4b5563 | #e5e7eb + focus ring |
| Disabled | transparent (opacity 0.5) | #6b7280 | #e5e7eb |
| Loading | transparent | #6b7280 | #e5e7eb + spinner |

### Tertiary States
| State | Background | Text |
|-------|-----------|------|
| Default | transparent | #6b7280 |
| Hover | #f3f4f6 | #6b7280 |
| Pressed | #e5e7eb | #6b7280 |
| Focused | #f3f4f6 | #4b5563 |

### Text Button States (Primary / Secondary)
| State | Primary Text | Secondary Text |
|-------|-------------|----------------|
| Default | #1d4ed8 | #6b7280 |
| Hover | #1e40af | #4b5563 |
| Pressed | #1e3a8a | #4b5563 |
| Focused | #1e40af | #6b7280 |

### Error Button States
| State | Background | Text |
|-------|-----------|------|
| Default | #b91c1c | #ffffff |
| Hover | #991b1b | #ffffff |
| Pressed | #7f1d1d | #ffffff |
| Focused | #991b1b | #ffffff |

### AI Button States
| State | Background |
|-------|-----------|
| Default | gradient |
| Hover | #f5f3ff |
| Pressed | #ede9fe |
| Focused | #ede9fe |

---

## Secondary Action (Icon Buttons)

Icon-only buttons used for secondary actions in toolbars, table rows, etc.

### Types
| Type | Border | Fill | Icon Color |
|------|--------|------|------------|
| Secondary | none | none | inherit |
| Secondary (outline) | #d1d5db | none | inherit |
| Primary (outline) | #1d4ed8 | none | #1d4ed8 |

### Sizes
| Size | Dimensions | Padding | Border Radius |
|------|-----------|---------|---------------|
| Large (32px) | 32x32 | 6px | 4px (default) or 9999px (round) |
| Medium (24px) | 24x24 | 6px | 4px (default) or 9999px (round) |
| Small (20px) | 20x20 | 6px | 4px (default) or 9999px (round) |

### States
Default, Hover, Pressed, Focused, Disabled — each with type-specific color changes.

### Properties
- `IsTooltiped`: Boolean — shows tooltip on hover
- `Radius`: Default (4px) or Round (9999px)

---

## Split Button

Button with dropdown trigger for multiple action options.

### Types & Sizes
Same type system as Button (Primary Solid, Primary Outlined, Secondary) with Large and Small sizes.

### Placements
- `Bottom-start` — dropdown opens bottom-left
- `Bottom-end` — dropdown opens bottom-right

---

## Implementation Notes (GitHub Deviation)

| Property | Figma (Authority) | GitHub Code |
|----------|------------------|-------------|
| Primary color | `#1d4ed8` (Tailwind blue-700) | `$blue-6: #0137fc` (Ant Design) |
| Primary hover | `#1e40af` (Tailwind blue-800) | `$blue-5: #346aff` |
| Border radius | 4px | 4px |
| Font family | Inter | Inter |
| Font size | 14px | 0.875rem (14px) |
| Padding (large) | 6px 16px | 0.314rem 1rem (~5px 16px) |

**Key conflict:** Figma uses Tailwind blue palette, GitHub uses Ant Design blue palette. All new implementations should use Figma/Tailwind values.

---

## GitHub File Paths
- Component: `src/shared/design-system/components/atoms/button/button.tsx`
- UI wrapper: `src/shared/design-system/ui/button.tsx`
- SCSS: `src/assets/css/scss/_buttons.scss`
- Variables: `src/assets/css/_custom-variable.scss` (lines 244-440)

## Accessibility

- All buttons must have accessible labels
- Disabled buttons: `aria-disabled="true"`, `opacity: 0.5`
- Loading buttons: `aria-busy="true"`, show spinner, disable interaction
- Icon-only buttons: `aria-label` required
- Focus ring: `shadows.focused` token (0 0 0 2px rgba(29, 78, 216, 0.25))
- Keyboard: Enter/Space to activate

## Related Components

- [Icon Button](./icon-button.md)
- [Dropdown](./dropdown.md)
- [Toggle Button](./toggle-button.md)
