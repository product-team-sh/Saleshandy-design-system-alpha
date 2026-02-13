# Avatar

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Avatar component displays a visual representation of a user or entity. It supports image, initial (text), and icon types across five sizes, totaling 20 variants.

## Component Sets (from Figma)

1. **Avatar Items** -- 20 variants
   - Properties: types, size

---

## Variants

### Types

| Type | Content | Usage |
|------|---------|-------|
| Image | User photograph or uploaded image | When a profile image is available |
| Initial | 1-2 uppercase letters from the user's name | Fallback when no image is available |
| Icon | Generic person/user icon | Default fallback, anonymous users |

### Initial Generation
- Single-word name: First letter (e.g., "Malav" -> "M")
- Two-word name: First letter of each word (e.g., "Malav Patel" -> "MP")
- Text color: `#ffffff` on colored background
- Background: Deterministic color based on name hash (from primary palette)

---

## Sizes

| Size | Dimensions | Font Size (Initials) | Icon Size | Usage |
|------|-----------|---------------------|-----------|-------|
| Small | 24px | 10px | 14px | Compact lists, inline mentions |
| Medium | 32px | 12px | 16px | Standard lists, comments |
| Large | 40px | 14px | 20px | Profile cards, headers |
| XL | 48px | 16px | 24px | Profile sections |
| 2XL | 64px | 20px | 32px | Profile pages, account settings |

### Common Properties

| Property | Value |
|----------|-------|
| Border Radius | 9999px (circle) |
| Object Fit (Image) | cover |
| Font Family | Inter |
| Font Weight | 500 |

---

## States

| State | Visual | Notes |
|-------|--------|-------|
| Default | Standard display | Normal rendering |
| With Status Badge | Dot indicator at bottom-right | Paired with Badge component |
| Loading | Skeleton circle placeholder | While image loads |
| Error (Image) | Falls back to Initial or Icon type | When image fails to load |

---

## Avatar Group

When multiple avatars are displayed together (e.g., team members):

| Property | Value |
|----------|-------|
| Overlap | -8px margin (small), -12px margin (medium/large) |
| Max Display | Configurable (e.g., show 3 + "+5" overflow) |
| Overflow Indicator | Gray circle with "+N" count text |
| Z-Index | Decreasing left to right, hover brings to front |

---

## Accessibility

- Image avatars: Use `alt` attribute with user's name (e.g., `alt="Malav Patel"`)
- Initial/Icon avatars: Use `aria-label` with user's name
- Decorative avatars (next to visible name): Use `aria-hidden="true"` and `alt=""`
- Avatar groups: Describe the group context (e.g., "Team members: Malav, John, and 3 others")
- Status badges on avatars need `aria-label` describing the status
- Ensure initials have sufficient contrast against their background (WCAG AA)

---

## Related Components

- [Labels / Badges / Tags](./labels-badges-tags.md) - Badge dot indicators for avatar status
- [Skeleton](./skeleton.md) - Circle skeleton for avatar loading state
- [Tooltip](./tooltip.md) - Show full name on avatar hover
- [Icon](./icon.md) - Icon type avatar uses the icon system
