# Modal / Dialog Component

**Status:** Extracted from Saleshandy webui screenshots (2026-02-17)

## Overview

Modal (Dialog) component for displaying content in a layer above the main application. Used for forms, confirmations, and detailed views that require user focus.

---

## Component Variants

### 1. Standard Modal
- Title + Content + Footer actions
- Close button (X icon)
- Backdrop overlay
- Center-aligned on screen

### 2. Full-Screen Modal (Email/Editor)
- No border radius
- Full viewport height/width
- Header with actions
- Content area fills remaining space

---

## Anatomy

```
Modal
├── Backdrop (overlay)
└── Container
    ├── Header
    │   ├── Title
    │   ├── Subtitle (optional)
    │   ├── Header Actions (optional)
    │   └── Close Button (X)
    ├── Content
    │   └── Body content (forms, text, etc.)
    └── Footer (optional)
        ├── Secondary Action Button
        └── Primary Action Button
```

---

## Backdrop

| Property | Value |
|----------|-------|
| Background | rgba(0, 0, 0, 0.5) |
| Z-Index | 1200 (from tokens.zIndex.modal) |
| Cursor | default |
| Click behavior | Close modal (dismissible) or none (non-dismissible) |
| Animation | Fade in 200ms ease-in-out |

---

## Modal Container

### Standard Modal

| Property | Value |
|----------|-------|
| Background | #ffffff |
| Border Radius | 8px |
| Box Shadow | `shadows.modal` (0 16px 48px -4px rgba(243,244,246,1.0), 0 4px 24px 0 rgba(0,0,0,0.08)) |
| Max Width | 600px (medium) |
| Max Height | calc(100vh - 64px) |
| Margin | 32px (from viewport edges) |
| Position | Fixed, centered (top 50%, left 50%, transform translate(-50%, -50%)) |
| Z-Index | 1200 |

### Modal Sizes

| Size | Max Width | Use Case |
|------|-----------|----------|
| Small | 400px | Confirmations, simple forms |
| Medium | 600px | Standard forms, content views |
| Large | 800px | Complex forms, detailed content |
| X-Large | 1000px | Multi-column layouts |
| Full | 100vw | Email editor, rich content editors |

---

## Header

| Property | Value |
|----------|-------|
| Padding | 24px |
| Border Bottom | 1px solid #e5e7eb |
| Min Height | 64px |
| Background | #ffffff |

### Title
- Font Size: 18px
- Font Weight: 600 (semibold)
- Line Height: 24px
- Color: #1f2937 (gray.800)
- Margin Bottom: 4px (if subtitle present)

### Subtitle / Step Indicator
- Font Size: 14px
- Font Weight: 400 (regular)
- Color: #6b7280 (gray.500)
- Examples: "Step 1", "A" (for variant indicator)

### Close Button
- Position: Absolute top 24px right 24px
- Size: 32x32px clickable area
- Icon: X icon (20x20px)
- Icon Color: #6b7280 (gray.500)
- Hover: #1f2937 (gray.800), background #f9fafb
- Border Radius: 4px
- Cursor: pointer

### Header Actions (Email Editor Modal)
- Positioned right of title, before close button
- Tabs/Toggle buttons (e.g., "Content Guide", "Email Preview")
- Icon buttons for actions
- Spacing: 8px gap between items

---

## Content Area

| Property | Value |
|----------|-------|
| Padding | 24px |
| Max Height | calc(100vh - 240px) (standard modal) |
| Overflow Y | auto (scroll if content exceeds) |
| Background | #ffffff |

### Scrollable Content
- Custom scrollbar styling (optional)
- Scrollbar width: 8px
- Scrollbar track: #f3f4f6
- Scrollbar thumb: #d1d5db
- Fade indicators at top/bottom when scrollable

---

## Footer

| Property | Value |
|----------|-------|
| Padding | 16px 24px |
| Border Top | 1px solid #e5e7eb |
| Background | #ffffff |
| Display | flex, justify-content: space-between |
| Align Items | center |

### Footer Actions Layout
```
[Secondary Info/Text]    [Secondary Button] [Primary Button]
```

### Button Spacing
- Gap between buttons: 12px
- Right-aligned group

### Footer Variants
- **With secondary text:** "Start this step on Day 1" + buttons
- **Actions only:** Just buttons (right-aligned)
- **Split layout:** Info left, actions right

---

## Modal Sizes (Detailed)

### Small (400px)
**Use cases:**
- Confirmations ("Are you sure?")
- Simple alerts
- Single field forms

**Padding:** 24px all sides

### Medium (600px) — Default
**Use cases:**
- Standard forms (3-5 fields)
- Content previews
- Settings panels

**Padding:** 24px all sides

### Large (800px)
**Use cases:**
- Multi-section forms
- Detailed content views
- Two-column layouts

**Padding:** 24px all sides

### Full-Screen
**Use cases:**
- Email editor
- Rich text editor
- Complex multi-step forms

**Padding:**
- Header: 16px 24px
- Content: 24px (or custom for editor)
- Footer: 16px 24px

---

## States

### Default
- Visible, interactive
- Focus trap active
- Scrollable if content exceeds height

### Loading
- Content area shows spinner
- Footer buttons disabled
- Cursor: wait

### Error
- Error message/banner at top of content
- Relevant fields highlighted
- Footer buttons remain enabled

---

## Animations

### Open
- Backdrop: Fade in 200ms ease-in-out
- Container: Scale from 0.95 to 1.0 + fade in 200ms ease-in-out
- Timing: Backdrop starts first, container 50ms delay

### Close
- Container: Scale to 0.95 + fade out 150ms ease-in-out
- Backdrop: Fade out 200ms ease-in-out (50ms delay)
- Timing: Container first, backdrop follows

---

## Behavior

### Open Modal
1. Trap focus within modal
2. Disable scroll on body
3. Set focus to first interactive element (or close button if no form)
4. Add ARIA attributes

### Close Modal
1. Restore focus to trigger element
2. Re-enable body scroll
3. Remove modal from DOM or set display: none

### Dismissible
- **Enabled (default):** Click backdrop or press Escape to close
- **Disabled:** Only close button or explicit action closes modal

### Focus Trap
- Tab cycles through interactive elements within modal
- Shift+Tab cycles backwards
- Cannot tab to elements outside modal

---

## Accessibility

- **Role:** `role="dialog"` or `role="alertdialog"` (for confirmations)
- **Aria Label:** `aria-labelledby="modal-title"`
- **Aria Description:** `aria-describedby="modal-description"` (if content has intro text)
- **Focus trap:** Required
- **Keyboard:**
  - Escape: Close modal (if dismissible)
  - Tab: Cycle through interactive elements
  - Shift+Tab: Cycle backwards
  - Enter: Submit form or activate focused button
- **Screen readers:** Announce modal opened, read title
- **Focus management:** Set focus on first input or close button

---

## Special Modal Types

### Email Editor Modal (Full-Screen)

**Header:**
- Step indicator: "Step 1", "A" badge
- Title: "Email"
- Tab buttons: "Content Guide", "Email Preview"
- Close button (X)

**Content:**
- Rich text editor (see editor.md)
- Toolbar with formatting options
- Subject line input
- Pre-header input

**Footer:**
- "Start this step on Day [number]" text (left)
- "Save" button (right, primary)

### LinkedIn Task Modal

**Header:**
- Step indicator: "Step 5", "A" badge
- Icon tabs: Email, LinkedIn, Phone, WhatsApp, Manual Task
- Close button

**Content:**
- Task type tabs: "Connection Request", "Message", "InMail", etc.
- Text area for note/message
- Task instruction link
- Priority selector (Low, Normal, High, Urgent radio buttons)
- Task assignee dropdown
- Start day input

**Footer:**
- "Save" button (right, primary)

---

## GitHub Deviation

| Property | Figma/Screenshots | GitHub Code | Notes |
|----------|-------------------|-------------|-------|
| Border radius | 8px | May be 4px | Verify in code |
| Shadow | Modal shadow (large) | Check implementation | Use tokens.shadows.modal |
| Backdrop opacity | 0.5 | May differ | Match screenshots |
| Header border | #e5e7eb | Verify | Use tokens.border.default |

---

## Related Components

- [Button](./button.md) — Footer actions, close button
- [Input](./input.md) — Form fields in content
- [Text Area](./text-area.md) — Multi-line inputs
- [Dropdown](./dropdown.md) — Selectors in forms
- [Banner](./banner.md) — Error/success messages in modal

---

## Implementation Notes

- Use `useFocusTrap` hook for focus management
- Use `useClickOutside` hook for backdrop dismissal
- Use `usePortal` hook to render modal in portal
- Disable body scroll when modal open: `document.body.style.overflow = 'hidden'`
- Restore scroll on unmount
- Animate with CSS transitions, not JS
- Support nested modals with z-index stacking (1200, 1201, 1202, etc.)
