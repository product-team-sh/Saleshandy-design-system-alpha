# Skeleton

**Status:** Populated from Figma SH-Design-System-2025

## Overview

The Skeleton component provides placeholder shapes that mimic the layout of content while it is loading. It reduces perceived loading time by showing the structural outline of the interface before data arrives.

## Component Sets (from Figma)

Multiple skeleton element component sets:
- **Skeleton Text** -- Text line placeholders
- **Skeleton Rectangle** -- Block/card placeholders
- **Skeleton Icon (Circle)** -- Avatar/icon placeholders
   - Properties: Type, State, Size

---

## Types

| Type | Shape | Border Radius | Usage |
|------|-------|--------------|-------|
| Text | Horizontal rectangle | 4px | Paragraph lines, labels, headings |
| Rectangle | Block rectangle | 4px | Cards, images, media blocks |
| Icon (Circle) | Circle | 60px (effectively 9999px) | Avatars, icon placeholders |

---

## Sizes

| Size | Text Height | Rectangle Height | Circle Diameter | Usage |
|------|------------|-----------------|----------------|-------|
| S (Small) | 12px | 40px | 24px | Compact lists, small cards |
| M (Medium) | 16px | 80px | 32px | Standard content areas |
| L (Large) | 20px | 120px | 48px | Prominent sections |
| XL (Extra Large) | 24px | 200px | 64px | Hero areas, large media blocks |

---

## States

| State | Background | Animation | Usage |
|-------|-----------|-----------|-------|
| Loading | `#f3f4f6` (gray.100) | Shimmer pulse (left to right) | Standard content loading |
| AI Loading | `#f3f4f6` (gray.100) | Enhanced shimmer with gradient | AI-generated content loading |

### Animation Details

| Property | Value |
|----------|-------|
| Type | Shimmer / pulse |
| Duration | 1.5s per cycle |
| Timing Function | Ease-in-out |
| Direction | Left to right gradient sweep |
| Shimmer Highlight | `#ffffff` at 50% opacity |

### Default (Non-loading) State

| Property | Value |
|----------|-------|
| Background | `#f9fafb` (gray.50) |
| Animation | None |

---

## Composition

Skeleton elements are composed together to match the layout of the loading content:

- **List item skeleton:** Circle (avatar) + 2 Text lines
- **Card skeleton:** Rectangle (image) + 3 Text lines
- **Table row skeleton:** Multiple Text elements in a row
- **Profile skeleton:** Circle (avatar) + Text (name) + Text (subtitle)

---

## Accessibility

- Use `aria-busy="true"` on the container that will be replaced by loaded content
- Use `aria-hidden="true"` on individual skeleton elements (they are decorative)
- Include `role="status"` with visually hidden "Loading content" text
- When content loads, remove `aria-busy` and skeleton elements
- Do not trap focus on skeleton elements
- Ensure animation can be disabled via `prefers-reduced-motion` media query

---

## Related Components

- [Spinner](./spinner.md) - For indeterminate loading without layout hints
- [Progress Bar](./progress-bar.md) - For determinate loading progress
- [Avatar](./avatar.md) - Circle skeleton mimics avatar shape
