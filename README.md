# Saleshandy Design System

This is the source of truth for all Saleshandy UI components, design tokens, and interaction patterns. **Claude Code must always reference this directory before creating any prototypes.**

## Sources

This design system was built from two authoritative sources:
1. **Figma** (`SH-Design-System-2025`) — 27 pages, 85+ component sets (FINAL AUTHORITY)
2. **GitHub** (`saleshandy-webui`) — Production React app with `@saleshandy/design-system` v0.17.5

**Conflict resolution:** When Figma and GitHub code differ, Figma values are documented as canonical and GitHub deviations are noted in the [Deviation Report](./deviation-report.md).

## Key Discovery

**Figma uses Tailwind CSS colors. GitHub uses Ant Design colors.** These are fundamentally different palettes. All new implementations should use the Figma/Tailwind values from `tokens.json`.

## Purpose

This design system ensures that:
- All prototypes match the Figma design specifications
- Developers can seamlessly translate prototypes to production code
- No "hallucinated" or generic components are used
- UI consistency is maintained across all implementations

## Structure

```
/design-system/
├── README.md                    # This file
├── CONTRIBUTING.md              # Guidelines for extending the system
├── tokens.json                  # Design tokens (colors, spacing, typography, shadows, etc.)
├── deviation-report.md          # Figma vs GitHub code differences
├── components/                  # Component documentation (one .md per component)
│   ├── button.md                # Button, Split Button, Secondary Action
│   ├── input.md                 # Text input fields
│   ├── card.md                  # Cards (Radio Card, Check Card)
│   ├── checkbox.md              # Checkbox + Checkbox Base
│   ├── toggle-button.md         # Toggle/Switch
│   ├── dropdown.md              # Dropdown (single + multiselect)
│   ├── tooltip.md               # Tooltip (dark + white)
│   ├── toast.md                 # Toast notifications
│   ├── labels-badges-tags.md    # Labels, Badges, Tags, Chips
│   ├── spinner.md               # Loading spinners
│   ├── skeleton.md              # Skeleton loading screens
│   ├── divider.md               # Horizontal/vertical dividers
│   ├── progress-bar.md          # Circle + Line progress bars
│   ├── avatar.md                # User avatars
│   ├── icon.md                  # Icon system
│   ├── text-area.md             # Rich text area
│   ├── banner.md                # Persistent status banners (6 types)
│   └── global-header.md         # Header + sidebar navigation
├── patterns/                    # Interaction & layout patterns
│   ├── design-principles.md     # ★ UX philosophy, color theory, copy rules, psychology
│   ├── interactions.md          # Hover, focus, active, disabled, error states
│   ├── layouts.md               # Page layouts, grid, drawer, modal, spacing
│   └── forms.md                 # Form patterns, validation, field types
└── templates/                   # Component template reference
    └── README.md
```

## How to Use This System

### For Claude Code (when creating prototypes):

1. **ALWAYS start by reading `patterns/design-principles.md`** for UX philosophy and copy rules
2. **Read `tokens.json`** for all styling values (colors, spacing, typography)
3. **Read component documentation** from `components/` for the specific components you need
4. **Read interaction patterns** from `patterns/` to match hover/focus/disabled behaviors
5. **Check the deviation report** if you need to understand differences between Figma and production code
6. **NEVER invent components** — only use what's documented here
7. **Follow UX copy rules** — active voice, no jargon, verb+noun CTAs, specific error messages

### Quick Token Reference

| Token | Value | Usage |
|-------|-------|-------|
| Primary | #1d4ed8 | Buttons, links, focus borders |
| Primary Hover | #1e40af | Hover states |
| Text Primary | #1f2937 | Body text |
| Text Secondary | #6b7280 | Muted text, placeholders |
| Border | #e5e7eb | Default borders |
| Background | #ffffff | Primary backgrounds |
| Background Alt | #f9fafb | Secondary backgrounds |
| Error | #b91c1c | Error states, danger buttons |
| Success | #10b981 | Success states |
| Warning | #f59e0b | Warning states |
| Font | Inter | All text |
| Radius (buttons) | 4px | Buttons, inputs, cards |
| Radius (dropdowns) | 8px | Dropdowns, modals, tooltips |

## Current Status

**Populated** — Design tokens and component specs extracted from Figma SH-Design-System-2025 on 2026-02-13.

### Coverage
- **Tokens:** All color, typography, spacing, shadow, radius values populated from Figma
- **Components:** 18 component docs with full Figma specs
- **Patterns:** Design principles, UX philosophy, interaction states, layout patterns, form patterns
- **UX Principles:** Color theory, cognitive psychology (106 principles from growth.design), copy rules, responsive design, accessibility baseline
- **Deviation Report:** Key differences between Figma and GitHub code cataloged

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding or updating components.

## Questions?

If you need a component that's not documented here, flag it before proceeding.
# Saleshandy-design-system-alpha
