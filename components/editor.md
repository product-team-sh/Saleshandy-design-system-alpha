# Rich Text Editor Component

**Status:** Extracted from Saleshandy email editor screenshots (2026-02-17)

## Overview

Rich text editor for composing emails and formatted content. Includes formatting toolbar, merge tags/variables, spintax support, and content guide/preview modes.

---

## Anatomy

```
Editor
├── Subject Line Input (optional)
├── Pre-Header Input (optional)
├── Toolbar
│   ├── Font Controls (Family, Size)
│   ├── Text Formatting (Bold, Italic, Underline, etc.)
│   ├── Alignment
│   ├── Lists
│   ├── Insert (Link, Image, Emoji)
│   ├── Special Actions (Code, More options)
│   ├── Variables/Merge Tags
│   └── Template selector
└── Content Area (editable)
    ├── Greeting/Body text
    ├── Variable tags (highlighted)
    └── Spintax blocks (highlighted)
```

---

## Subject Line Input

| Property | Value |
|----------|-------|
| Height | 48px |
| Padding | 12px 16px |
| Font Size | 14px |
| Font Weight | 500 (medium) |
| Border Bottom | 1px solid #e5e7eb |
| Background | #ffffff |
| Placeholder | "Enter subject..." |

### Subject Line Actions
- Right-side icons:
  - Personalization/merge tags icon
  - Emoji picker icon
  - Spintax icon (if enabled)
- Icon size: 20px
- Icon color: #6b7280 (gray.500)
- Spacing: 12px gap between icons

---

## Pre-Header Input

| Property | Value |
|----------|-------|
| Label | "Pre-Header" |
| Height | 40px |
| Padding | 8px 16px |
| Font Size | 14px |
| Border Bottom | 1px solid #e5e7eb |
| Background | #f9fafb |
| Placeholder | "Enter a pre-header..." |
| Collapsible | Can be hidden/shown via "Set Pre-Header" link |

---

## Toolbar

### Toolbar Container

| Property | Value |
|----------|-------|
| Height | 48px |
| Padding | 8px 16px |
| Border Bottom | 1px solid #e5e7eb |
| Background | #ffffff |
| Display | flex, gap 4px |
| Flex Wrap | wrap (if narrow viewport) |

### Toolbar Groups
Groups separated by vertical divider (1px solid #e5e7eb, 24px height)

**Group 1: Font**
- Font family dropdown (Inter, sans-serif, Monaco)
- Font size dropdown (16px, with options)

**Group 2: Text Style**
- Bold (B icon)
- Italic (I icon)
- Underline (U icon)
- Strikethrough (S icon)

**Group 3: Text Formatting**
- Text color picker
- Highlight/background color
- Clear formatting

**Group 4: Alignment**
- Align left
- Align center
- Align right
- Justify

**Group 5: Lists**
- Bullet list
- Numbered list
- Decrease indent
- Increase indent

**Group 6: Insert**
- Link (chain icon)
- Image (image icon)
- Emoji (smiley icon)

**Group 7: Code/Advanced**
- Code block
- More options (three dots)

**Group 8: Variables**
- Merge tag button (curly braces {} icon)
- Spintax button (if enabled)

**Group 9: Template**
- Template selector dropdown

### Toolbar Button

| Property | Value |
|----------|-------|
| Size | 32x32px |
| Border Radius | 4px |
| Background | transparent |
| Icon Size | 16px |
| Icon Color | #6b7280 (gray.500) |

#### States
- **Default:** Transparent background, gray.500 icon
- **Hover:** #f3f4f6 (gray.100) background, gray.700 icon
- **Active/Toggled:** #e5e7eb (gray.200) background, gray.900 icon
- **Disabled:** opacity 0.4, cursor not-allowed

### Toolbar Dropdown

| Property | Value |
|----------|-------|
| Min Width | 120px |
| Height | 32px |
| Padding | 6px 8px |
| Border | 1px solid #e5e7eb |
| Border Radius | 4px |
| Font Size | 14px |
| Background | #ffffff |

**Dropdown arrow:** Right-aligned, 16px icon, gray.500

---

## Content Area (Editable)

| Property | Value |
|----------|-------|
| Padding | 24px |
| Min Height | 400px |
| Font Family | Inter |
| Font Size | 14px |
| Line Height | 20px |
| Color | #1f2937 (gray.800) |
| Background | #ffffff |
| Overflow Y | auto |

### Content Styling
- **Paragraph:** margin-bottom 16px
- **Headings:** margin-bottom 12px, weights 600-700
- **Links:** color #1d4ed8, underline on hover
- **Lists:** margin-left 24px, margin-bottom 16px
- **Code blocks:** background #f3f4f6, padding 12px, border-radius 4px, font-family monospace

### Placeholder
- Text: "Start typing your message..."
- Color: #9ca3af (gray.400)
- Font Style: italic (optional)

---

## Special Elements

### Merge Tag / Variable

**Visual representation:**
- Background: #dbeafe (primary.100)
- Text Color: #1d4ed8 (primary.700)
- Padding: 2px 6px
- Border Radius: 4px
- Font Weight: 500 (medium)
- Font Size: 13px
- Examples: `{{First Name}}`, `{{Company}}`, `{{SenderFirstName}}`

**Hover state:**
- Background: #bfdbfe (primary.200)
- Cursor: pointer

**Editing:**
- Click opens dropdown to change variable
- Not directly editable (treated as atomic unit)

### Spintax Block

**Visual representation:**
- Background: #f3e8ff (purple.50)
- Border: 1px solid #e9d5ff (purple.200)
- Text Color: #6d28d9 (purple.700)
- Padding: 2px 6px
- Border Radius: 4px
- Font Weight: 500 (medium)
- Syntax: `{ spintax | Hi | Hello | Hey there | + }`

**Hover state:**
- Background: #e9d5ff (purple.200)
- Cursor: pointer

**Example in text:**
```
[ spintax  Hi  •  Hello  •  Hey there  +  ]
```
- Each option separated by bullet (•)
- Plus icon (+) to add more options

---

## Tabs / Modes

### Content Guide Tab (Right Panel)

**NEW badge:** Green label with "NEW" text

**Sections:**
- "Use Spintax to maximize deliverability" (toggle/banner)
- "Cold Email Tips 1/3" (carousel with prev/next arrows)
- Metrics:
  - Subject Length: 21 characters (Short — 30-60 suggested)
  - Word Count: 41 words (Too short — 50-200 suggested)
  - Personalization: 0 merge tag (2+ suggested)
  - Links: 0 link (Excellent — minimal suggested)
  - Spamminess: 0 word (Excellent — minimal suggested)

**Metric Display:**
- Label: 14px, gray.700, medium
- Value: 14px, gray.900, semibold
- Progress bar: background gray.100, fill status-color
- Status text: 12px, status-color (red/yellow/green)

### Email Preview Tab

**Preview display:**
- Shows rendered email as recipient will see it
- Variables replaced with actual values or placeholders
- "From" field: "No email account connected" (warning if not set)
- "To" field: Sample recipient
- Subject line preview
- Body content (fully rendered)

**Actions:**
- "Send Test Email" button
- "Run Placement Test" button

---

## Footer Actions

| Element | Style |
|---------|-------|
| "Start this step on Day [input]" | 14px, gray.600, left-aligned |
| Day input | 40px height, 60px width, number input |
| "Save" button | Primary fill button, right-aligned |

---

## Styling Removal Notice

**Bottom of editor:**
- "🟢 Styling Removes Automatically" (green dot + text)
- Font: 12px, gray.500
- Background: subtle gray highlight
- Positioned bottom-right of editor

---

## Accessibility

- **Role:** `role="textbox"` and `aria-multiline="true"` or `contenteditable="true"`
- **Label:** Associated label for screen readers
- **Toolbar buttons:** `aria-label` for each (e.g., "Bold", "Insert link")
- **Format indicators:** `aria-pressed` for toggle states (bold, italic, etc.)
- **Keyboard shortcuts:**
  - Cmd/Ctrl+B: Bold
  - Cmd/Ctrl+I: Italic
  - Cmd/Ctrl+U: Underline
  - Cmd/Ctrl+K: Insert link
  - Cmd/Ctrl+Z: Undo
  - Cmd/Ctrl+Shift+Z: Redo
  - Tab: Indent (in lists)
  - Shift+Tab: Outdent
- **Focus management:** Tab moves through toolbar, not content (use arrow keys in content)
- **Variable insertion:** Keyboard shortcut (e.g., Cmd+Shift+V) opens variable picker

---

## Component Dependencies

| Component | Usage |
|-----------|-------|
| [Input](./input.md) | Subject line, pre-header |
| [Dropdown](./dropdown.md) | Font family, font size, template selector |
| [Button](./button.md) | Toolbar buttons, save button |
| [Icon](./icon.md) | Toolbar icons |
| [Labels/Badges](./labels-badges-tags.md) | Merge tags, spintax blocks, NEW badge |
| [Progress Bar](./progress-bar.md) | Content guide metrics |

---

## Implementation Notes

### Libraries
Consider using:
- **Lexical** (Facebook/Meta) — Modern, extensible
- **ProseMirror** — Powerful, flexible schema
- **Tiptap** (built on ProseMirror) — Easier API, React-friendly
- **Slate** — Fully customizable, React-first

### Custom Nodes
- **Variable/Merge Tag Node:** Non-editable atomic unit
- **Spintax Block Node:** Editable list of options with UI
- **Link Node:** Inline with href attribute

### Content Validation
- Check merge tag syntax on save
- Warn if spintax has <2 options
- Validate links (proper URL format)
- Check character limits (subject line < 60)

### Autosave
- Save draft every 30 seconds
- Show "Saving..." indicator
- "All changes saved" confirmation

### Rich Text Output
- HTML format for email body
- Plain text fallback (auto-generated)
- Variables preserved as template syntax `{{variableName}}`
- Spintax preserved as special syntax `{option1|option2|option3}`

---

## GitHub Deviation

| Property | Figma/Screenshots | GitHub Code | Notes |
|----------|-------------------|-------------|-------|
| Toolbar height | 48px | Verify | May differ |
| Variable tag bg | #dbeafe | Check | Should use primary.100 |
| Font size | 14px | Likely 14px | Consistent |
| Border colors | #e5e7eb | Verify | Use tokens.border.default |

---

## Related Components

- [Text Area](./text-area.md) — Simpler multi-line input
- [Input](./input.md) — Subject line input
- [Dropdown](./dropdown.md) — Format selectors
- [Button](./button.md) — Toolbar actions
- [Modal](./modal.md) — Editor typically in modal
