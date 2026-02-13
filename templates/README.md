# Component Templates

This directory contains actual React component templates that match the Saleshandy design system documentation.

## Current Templates

These templates are implemented in `/Users/malav/prototype-template/src/components/`:

- **Button** - Primary fill, primary outline, secondary, tertiary, text, error, AI variants
- **Input** - Text inputs with labels, helper text, error/success states
- **Card** - Radio Card and Check Card with selection states

## Adding New Templates

When a component is fully documented in `/design-system/components/`:

1. Create the React component in `/prototype-template/src/components/`
2. Create the CSS Module styles using tokens from `tokens.json`
3. Add usage examples to prototype template README
4. Update status below

## Template Status

| Component | Documented | Implemented | Notes |
|-----------|-----------|-------------|-------|
| Button | ✅ Figma specs | ✅ | 9 types, 6 states, 2 sizes |
| Input | ✅ Figma specs | ✅ | 54 variants from Figma |
| Card | ✅ Figma specs | ✅ | Radio Card + Check Card |
| Checkbox | ✅ Figma specs | ❌ | 45+ variants, 3 sizes |
| Toggle Button | ✅ Figma specs | ❌ | 30 variants, pill shape |
| Dropdown | ✅ Figma specs | ❌ | 78 variants, single + multi |
| Tooltip | ✅ Figma specs | ❌ | Dark + White, 8 positions |
| Toast | ✅ Figma specs | ❌ | 6 states (success/error/warning/info/neutral/loading) |
| Labels/Badges/Tags | ✅ Figma specs | ❌ | 238 variants, surface + bordered |
| Spinner | ✅ Figma specs | ❌ | 5 sizes, inherit + inverted |
| Skeleton | ✅ Figma specs | ❌ | Text, Rectangle, Circle types |
| Divider | ✅ Figma specs | ❌ | Horizontal + vertical |
| Progress Bar | ✅ Figma specs | ❌ | Circle + Line variants |
| Avatar | ✅ Figma specs | ❌ | Image, Initial, Icon types |
| Icon | ✅ Figma specs | ❌ | 7 sizes, @saleshandy/icons |
| Text Area | ✅ Figma specs | ❌ | Rich text with toolbar |

## Data Sources

- **Figma:** SH-Design-System-2025 (25 pages, 83 component sets)
- **GitHub:** saleshandy-webui (`@saleshandy/design-system` v0.17.5)

---

**All templates must use ONLY design tokens from `/design-system/tokens.json`**
**Color system: Tailwind CSS palette (from Figma, NOT Ant Design from GitHub)**
