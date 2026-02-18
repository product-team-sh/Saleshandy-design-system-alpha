# Radio Button Component

**Status:** Inferred from Saleshandy UI patterns and standard design practices (2026-02-17)

## Overview

Radio buttons allow users to select a single option from a set of mutually exclusive choices. Commonly used in forms, settings, and option selectors.

---

## Component Variants

### 1. Standard Radio
- Circle indicator
- Label text
- Single selection from group

### 2. Radio with Description
- Radio + Label + Description text below
- Used for complex options

### 3. Radio Button Group (Horizontal)
- Multiple radios in a row
- Example: Priority selector (Low, Normal, High, Urgent)

---

## Anatomy

```
Radio
├── Input (hidden native radio)
├── Radio Indicator (custom circle)
│   └── Dot (when selected)
└── Label (optional)
    ├── Label Text
    └── Description (optional)
```

---

## Radio Indicator

### Circle (Unchecked)

| Property | Value |
|----------|-------|
| Size | 16px (default), 18px (medium), 20px (large) |
| Border | 2px solid #d1d5db (gray.300) |
| Border Radius | 50% (full circle) |
| Background | #ffffff |

### Circle (Checked)

| Property | Value |
|----------|-------|
| Border | 2px solid #1d4ed8 (primary.700) |
| Background | #1d4ed8 (primary.700) |
| Inner Dot | 8px (for 16px radio), white (#ffffff) |

**Inner dot:**
- Size: 50% of radio size
- Position: Centered
- Border Radius: 50%

---

## Sizes

| Size | Radio Diameter | Border Width | Dot Size | Label Font Size |
|------|----------------|--------------|----------|-----------------|
| Small | 16px | 2px | 8px | 14px |
| Medium | 18px | 2px | 9px | 14px |
| Large | 20px | 2px | 10px | 16px |

**Default size:** Small (16px)

---

## States

### Unchecked (Default)

| State | Border Color | Background | Cursor |
|-------|-------------|------------|--------|
| Default | #d1d5db (gray.300) | #ffffff | pointer |
| Hover | #1d4ed8 (primary.700) | #ffffff | pointer |
| Focused | #1d4ed8 + focus ring | #ffffff | pointer |
| Disabled | #e5e7eb (gray.200) | #f9fafb | not-allowed |

### Checked

| State | Border Color | Background | Dot Color | Cursor |
|-------|-------------|------------|-----------|--------|
| Default | #1d4ed8 | #1d4ed8 | #ffffff | pointer |
| Hover | #1e40af (primary.800) | #1e40af | #ffffff | pointer |
| Focused | #1d4ed8 + focus ring | #1d4ed8 | #ffffff | pointer |
| Disabled | #d1d5db | #d1d5db | #ffffff | not-allowed |

### Focus Ring
- Box Shadow: `0 0 0 2px rgba(29, 78, 216, 0.25)` (shadows.focused)
- Transition: 150ms ease-in-out

---

## Label

### Label Text

| Property | Value |
|----------|-------|
| Font Size | 14px (default) |
| Font Weight | 500 (medium) |
| Color | #1f2937 (gray.800) |
| Line Height | 20px |
| Margin Left | 8px (gap from radio) |

### Label States
- **Default:** #1f2937
- **Hover:** Same (cursor: pointer on entire radio+label)
- **Disabled:** #9ca3af (gray.400)

### Description (optional)

| Property | Value |
|----------|-------|
| Font Size | 12px |
| Font Weight | 400 (regular) |
| Color | #6b7280 (gray.500) |
| Line Height | 16px |
| Margin Top | 4px (below label) |
| Margin Left | 24px (aligned with label, offset by radio+gap) |

---

## Radio Group

### Vertical Group (default)

| Property | Value |
|----------|-------|
| Spacing | 12px between radios |
| Alignment | flex-start |
| Role | `role="radiogroup"` |

**Example:**
```
○ Option 1
○ Option 2
● Option 3 (selected)
○ Option 4
```

### Horizontal Group

| Property | Value |
|----------|-------|
| Spacing | 16px gap between radios |
| Alignment | center (vertical) |
| Wrap | wrap (if narrow viewport) |

**Example (Priority selector):**
```
[ Low ] [ Normal ] [ High ] [ Urgent ]
```
- Each option is a button-like radio
- Selected option: primary fill background
- Unselected: outline or secondary style

---

## Horizontal Radio Button Variant

### Button-Style Radio (Priority Selector)

**Unchecked:**
- Background: transparent
- Border: 1px solid #e5e7eb (gray.200)
- Text Color: #6b7280 (gray.500)
- Padding: 8px 16px
- Border Radius: 4px
- Font: 14px/500

**Checked:**
- Background: #dbeafe (primary.100)
- Border: 1px solid #1d4ed8 (primary.700)
- Text Color: #1d4ed8 (primary.700)
- Font Weight: 600 (semibold)

**Hover (unchecked):**
- Background: #f9fafb (gray.50)
- Border: #d1d5db (gray.300)

**Hover (checked):**
- Background: #bfdbfe (primary.200)
- Border: #1e40af (primary.800)

---

## Behavior

### Selection
- Click radio indicator or label to select
- Only one radio in a group can be selected at a time
- Clicking another radio deselects the previous

### Keyboard Navigation
- **Tab:** Move focus to radio group
- **Arrow Up/Down:** Move selection in vertical group
- **Arrow Left/Right:** Move selection in horizontal group
- **Space:** Select focused radio (if not already selected)

### Required Field
- If radio group is required, display asterisk (*) next to group label
- Show error state if form submitted without selection

---

## Radio Group with Label

```
Group Label *
○ Option 1
● Option 2 (selected)
○ Option 3
```

**Group Label:**
- Font Size: 14px
- Font Weight: 500 (medium)
- Color: #1f2937 (gray.800)
- Margin Bottom: 8px
- Required asterisk: red (#b91c1c)

---

## Error State

### Radio with Error
- Border Color: #b91c1c (red.700)
- Focus Ring: red instead of blue
- Error message below group

**Error Message:**
- Font Size: 12px
- Color: #b91c1c (red.700)
- Icon: Error icon (16px) left of text
- Margin Top: 4px

---

## Accessibility

- **Native input:** Use native `<input type="radio">` (hidden visually)
- **Role:** `role="radio"` on custom indicator
- **Checked state:** `aria-checked="true|false"`
- **Disabled:** `aria-disabled="true"` + `disabled` attribute
- **Group:** `role="radiogroup"` on container
- **Group label:** `aria-labelledby` pointing to group label ID
- **Keyboard:**
  - Tab: Move to radio group
  - Arrow keys: Navigate options
  - Space: Select option
- **Focus management:** Focus ring visible on keyboard navigation
- **Screen readers:** Announce option count ("Option 2 of 4")

---

## Component Structure (HTML)

```html
<div role="radiogroup" aria-labelledby="group-label">
  <span id="group-label">Select Priority</span>

  <label class="radio-wrapper">
    <input type="radio" name="priority" value="low" />
    <span class="radio-indicator"></span>
    <span class="radio-label">Low</span>
  </label>

  <label class="radio-wrapper">
    <input type="radio" name="priority" value="normal" checked />
    <span class="radio-indicator"></span>
    <span class="radio-label">Normal</span>
  </label>

  <label class="radio-wrapper">
    <input type="radio" name="priority" value="high" />
    <span class="radio-indicator"></span>
    <span class="radio-label">High</span>
  </label>
</div>
```

---

## GitHub Deviation

| Property | Figma Spec | GitHub Code | Notes |
|----------|-----------|-------------|-------|
| Radio size | 16px | Verify | May differ |
| Border color | #d1d5db | Check | Should use gray.300 |
| Selected color | #1d4ed8 | Likely Ant Design blue | Use Tailwind primary.700 |
| Focus ring | Primary.700 @ 25% | Verify | Use shadows.focused |

---

## Related Components

- [Checkbox](./checkbox.md) — Multi-select alternative
- [Button](./button.md) — Button-style radio variant
- [Card](./card.md) — Radio Card for complex options
- [Input](./input.md) — Other form inputs

---

## Implementation Notes

### Controlled Component
```typescript
<Radio
  checked={selectedValue === 'option1'}
  onChange={() => setSelectedValue('option1')}
  name="group-name"
>
  Option 1
</Radio>
```

### Uncontrolled Component
```typescript
<Radio defaultChecked name="group-name">
  Option 1
</Radio>
```

### Hooks Used
- `useControllableState` — For controlled/uncontrolled pattern
- `useKeyboardNav` — For arrow key navigation in group
- `useMergedRefs` — For ref forwarding

### Transitions
- Border color: 150ms ease-in-out
- Background color: 150ms ease-in-out
- Transform (on click): Scale 0.95 → 1.0 (50ms)

### Form Integration
- Native radio input ensures form submission works
- Value attribute set on native input
- Name attribute groups radios together
