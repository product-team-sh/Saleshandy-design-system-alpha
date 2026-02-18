# Tabs Component

**Status:** Extracted from Saleshandy screenshots (Email editor, LinkedIn task modal) (2026-02-17)

## Overview

Tabs organize content into separate views where only one view is visible at a time. Used for switching between related content sections without navigating away.

---

## Component Variants

### 1. Text Tabs (Standard)
- Text labels
- Underline indicator for active tab
- Horizontal layout

### 2. Icon Tabs
- Icon-only or Icon + Text
- Used in modals (Email, LinkedIn, Phone, WhatsApp, Manual)
- Square button style

### 3. Pill Tabs
- Rounded background for active tab
- Subtle background for inactive tabs
- Horizontal layout

---

## Anatomy

```
Tabs
├── Tab List (container)
│   ├── Tab 1 (active)
│   ├── Tab 2
│   └── Tab 3
└── Tab Panel (content area)
```

---

## Text Tabs (Standard)

### Tab List Container

| Property | Value |
|----------|-------|
| Display | flex, horizontal |
| Border Bottom | 1px solid #e5e7eb (gray.200) |
| Gap | 24px (between tabs) |
| Padding | 0 (tabs have their own padding) |
| Background | transparent |

### Tab (Inactive)

| Property | Value |
|----------|-------|
| Padding | 12px 0 |
| Font Size | 14px |
| Font Weight | 500 (medium) |
| Color | #6b7280 (gray.500) |
| Border Bottom | 2px solid transparent |
| Cursor | pointer |
| Background | transparent |

### Tab (Active)

| Property | Value |
|----------|-------|
| Font Weight | 600 (semibold) |
| Color | #1d4ed8 (primary.700) |
| Border Bottom | 2px solid #1d4ed8 (primary.700) |
| Margin Bottom | -1px (overlap border) |

### Tab (Hover)

| Property | Value |
|----------|-------|
| Color | #1f2937 (gray.800) if inactive |
| Background | #f9fafb (gray.50) optional |
| Transition | 150ms ease-in-out |

### Tab (Disabled)

| Property | Value |
|----------|-------|
| Color | #d1d5db (gray.300) |
| Cursor | not-allowed |
| Opacity | 0.6 |

---

## Icon Tabs (Modal Variant)

### Tab Button

| Property | Value |
|----------|-------|
| Size | 48x48px (square) |
| Border Radius | 4px (top) or 0 (if full-width group) |
| Background | transparent |
| Border | 1px solid #e5e7eb (bottom) |
| Icon Size | 20x20px |
| Gap | 4px (between icon and label, if both) |

### States

**Inactive:**
- Background: #f9fafb (gray.50) or transparent
- Icon Color: #6b7280 (gray.500)
- Border Bottom: 1px solid #e5e7eb

**Active:**
- Background: #ffffff (white)
- Icon Color: #1d4ed8 (primary.700)
- Border Bottom: 2px solid #1d4ed8 (primary.700)
- Border Top/Left/Right: 1px solid #e5e7eb (if bordered)

**Hover (inactive):**
- Background: #f3f4f6 (gray.100)
- Icon Color: #4b5563 (gray.600)

### Icon Examples (from screenshots)
- Email: ✉️ envelope icon
- LinkedIn: 🔗 LinkedIn logo
- Phone: 📞 phone icon
- WhatsApp: 💬 WhatsApp logo
- Manual Task: ✏️ pencil/task icon

---

## Pill Tabs

### Tab Button

| Property | Value |
|----------|-------|
| Padding | 6px 12px |
| Border Radius | 9999px (full pill) |
| Font Size | 14px |
| Font Weight | 500 (medium) |
| Gap | 8px (between tabs) |

### States

**Inactive:**
- Background: transparent or #f9fafb (gray.50)
- Text Color: #6b7280 (gray.500)
- Border: none

**Active:**
- Background: #1d4ed8 (primary.700)
- Text Color: #ffffff (white)
- Border: none

**Hover (inactive):**
- Background: #f3f4f6 (gray.100)
- Text Color: #4b5563 (gray.600)

---

## Tab Panel (Content Area)

| Property | Value |
|----------|-------|
| Padding | 24px 0 0 |
| Min Height | 200px (or auto) |
| Background | transparent |
| Display | Only active panel visible |

### Panel Switching Animation
- **Fade:** Opacity 0 → 1 (150ms ease-in-out)
- **Or no animation:** Instant switch (preferred for performance)

---

## Content Guide / Email Preview Tabs (Email Editor)

### Tab Style
- Text tabs with optional badge
- "Content Guide" has green "NEW" badge
- Icon: 📄 document icon (optional)
- Position: Right side of editor header

### Tab Container

| Property | Value |
|----------|-------|
| Display | flex, horizontal |
| Gap | 12px |
| Background | transparent |
| Border | None (integrated into header) |

### Tab Button

**Inactive:**
- Background: transparent
- Text Color: #6b7280 (gray.500)
- Font: 14px/500
- Padding: 8px 12px
- Border Radius: 4px

**Active:**
- Background: #dbeafe (primary.100)
- Text Color: #1d4ed8 (primary.700)
- Font Weight: 600 (semibold)

**Badge (NEW):**
- Background: #10b981 (green.500)
- Text: "NEW" (white, 10px, bold, uppercase)
- Padding: 2px 6px
- Border Radius: 4px
- Position: Top-right of tab text

---

## LinkedIn Task Type Tabs (Sub-tabs)

### Horizontal Button Group

| Property | Value |
|----------|-------|
| Display | flex, horizontal, no gap |
| Border: 1px solid #e5e7eb (around entire group) |
| Border Radius | 4px |

### Tab Button (Integrated)

**Inactive:**
- Background: #ffffff
- Border Right: 1px solid #e5e7eb (between buttons)
- Text Color: #6b7280 (gray.500)
- Padding: 8px 16px
- Font: 14px/500

**Active:**
- Background: #1d4ed8 (primary.700)
- Text Color: #ffffff
- Border: none
- Font Weight: 600 (semibold)

**First/Last button:**
- Border Radius: 4px (left/right)

**Example:**
```
[Connection Request] [Message] [InMail] [View Profile] [Post Interaction]
     (active)
```

---

## Behavior

### Tab Selection
- Click tab to activate
- Active tab content displays in panel
- Only one tab active at a time
- Previous tab content hidden

### Keyboard Navigation
- **Tab:** Move focus to tab list
- **Arrow Left/Right:** Navigate between tabs (horizontal)
- **Arrow Up/Down:** Navigate between tabs (vertical, rare)
- **Home:** Jump to first tab
- **End:** Jump to last tab
- **Enter/Space:** Activate focused tab

### Tab Switching
- Instant content switch (no animation preferred)
- Or fade transition (150ms)
- Preserve scroll position within each panel (optional)

---

## Accessibility

- **Tab list role:** `role="tablist"`
- **Tab role:** `role="tab"`
- **Panel role:** `role="tabpanel"`
- **Active state:** `aria-selected="true"` on active tab
- **Panel association:** `aria-labelledby` on panel pointing to tab ID
- **Tab controls:** `aria-controls` on tab pointing to panel ID
- **Hidden panels:** `hidden` attribute or `aria-hidden="true"`
- **Keyboard focus:** Visible focus ring on tabs
- **Screen readers:** Announce tab count ("Tab 1 of 3")

---

## Responsive Behavior

### Horizontal Tabs (Overflow)
- **Desktop:** All tabs visible
- **Tablet/Mobile:** Horizontal scroll with scroll indicators
- **Alternative:** Dropdown menu for overflow tabs ("More ▾")

### Vertical Tabs (Mobile)
- Convert horizontal tabs to vertical stack
- Full-width tabs
- Panel below selected tab

---

## States Summary

| State | Background | Text Color | Border Bottom |
|-------|-----------|------------|---------------|
| **Standard Tabs** |
| Inactive | transparent | #6b7280 | 2px transparent |
| Active | transparent | #1d4ed8 | 2px #1d4ed8 |
| Hover | #f9fafb | #1f2937 | 2px transparent |
| **Icon Tabs** |
| Inactive | #f9fafb | gray.500 icon | 1px #e5e7eb |
| Active | #ffffff | primary.700 icon | 2px #1d4ed8 |
| **Pill Tabs** |
| Inactive | transparent | #6b7280 | none |
| Active | #1d4ed8 | #ffffff | none |

---

## GitHub Deviation

| Property | Figma/Screenshots | GitHub Code | Notes |
|----------|-------------------|-------------|-------|
| Active border | #1d4ed8, 2px | Verify | May use Ant blue |
| Text weight | 600 (active) | Check | Confirm |
| Icon size | 20px | Verify | Standard |
| Border color | #e5e7eb | Close | Use tokens.border.default |

---

## Related Components

- [Button](./button.md) — Tab buttons
- [Icon](./icon.md) — Icon tabs
- [Labels/Badges](./labels-badges-tags.md) — NEW badge on tabs

---

## Implementation Notes

### Hooks Used
- `useKeyboardNav` — Arrow key navigation
- `useControllableState` — Controlled/uncontrolled active tab

### State Management
```typescript
const [activeTab, setActiveTab] = useState('tab1');

<Tabs value={activeTab} onChange={setActiveTab}>
  <TabList>
    <Tab value="tab1">Content Guide</Tab>
    <Tab value="tab2">Email Preview</Tab>
  </TabList>
  <TabPanel value="tab1">Content guide content</TabPanel>
  <TabPanel value="tab2">Email preview content</TabPanel>
</Tabs>
```

### URL Sync (optional)
- Sync active tab with URL hash (`#tab=content-guide`)
- Allows direct linking to specific tab
- Updates browser history on tab change

### Lazy Loading (optional)
- Only render active tab panel content
- Improves performance for heavy content
- Alternative: Render all, hide with CSS

### Transitions
- Border color: 150ms ease-in-out
- Background color: 150ms ease-in-out
- Panel fade: 150ms ease-in-out (optional)
