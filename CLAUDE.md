# Saleshandy Design System — Claude Code Instructions

## Before ANY UI Work

You are working inside the Saleshandy design system. Before creating, modifying, or reviewing ANY user interface, you MUST follow this sequence:

1. **Read `patterns/design-principles.md`** — UX philosophy, copy rules, color theory, cognitive principles
2. **Read `tokens.json`** — All design tokens (colors, typography, spacing, shadows, radii)
3. **Read the relevant `components/*.md`** file for every component you plan to use
4. **Read `patterns/interactions.md`** — For hover, focus, active, disabled, error state specs
5. **Read `patterns/layouts.md`** — For page structure, grid, drawer, modal, spacing rules

## Critical Rules

### Color System
- **Use Tailwind CSS colors from `tokens.json`** — NOT Ant Design colors from the GitHub codebase
- Primary: `#1d4ed8` | Hover: `#1e40af` | Pressed: `#1e3a8a`
- Error: `#b91c1c` | Success: `#10b981` | Warning: `#f59e0b`
- Text: `#1f2937` (primary), `#6b7280` (secondary), `#9ca3af` (placeholder)
- Border: `#e5e7eb` | Background: `#ffffff` / `#f9fafb`

### Typography
- Font: **Inter** (only)
- Base size: **14px** (not 16px)
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **NEVER invent components** — only use what's documented in `components/`
- If a component isn't documented, flag it before proceeding
- 18 documented components: Button, Input, Card, Checkbox, Toggle, Dropdown, Tooltip, Toast, Labels/Badges/Tags, Spinner, Skeleton, Divider, Progress Bar, Avatar, Icon, Text Area, Banner, Global Header

### UX Copy
- **Active voice** — "We sent your email" not "Your email has been sent"
- **No jargon** — "Check your password" not "SMTP authentication failed"
- **Verb + noun buttons** — "Create Sequence", "Export Report" — never "Submit" or "OK"
- **Error formula** — What happened + Why + What to do next
- **Empty states** — What this is + Why it's empty + CTA to fill it

### Hierarchy
- Every screen has exactly ONE primary action (blue filled button)
- Secondary actions use outlined or text buttons
- Destructive actions use Error variant and require confirmation

### Responsive
- Mobile-first. Minimum touch target: 44x44px
- Sidebar collapses at < 1024px
- Tables get horizontal scroll on narrow screens

## When Figma and Code Conflict
- **Figma wins.** See `deviation-report.md` for known differences
- The GitHub codebase uses Ant Design colors (legacy). Figma uses Tailwind (correct)
- A partial migration exists in GitHub but is incomplete

## File Quick Reference
| Need | File |
|------|------|
| Design philosophy & UX rules | `patterns/design-principles.md` |
| Color, spacing, typography values | `tokens.json` |
| Component specs (pick relevant) | `components/*.md` |
| Interaction states | `patterns/interactions.md` |
| Page layout & grid | `patterns/layouts.md` |
| Form patterns | `patterns/forms.md` |
| Figma vs Code gaps | `deviation-report.md` |
