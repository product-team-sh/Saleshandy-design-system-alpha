# Design System Deviation Report

**Figma Design System vs. GitHub Production Code (saleshandy-webui)**

| | |
|---|---|
| **Date** | 2026-02-13 |
| **Scope** | Color, typography, spacing, border radius, shadows, components, UI libraries |
| **Figma source** | SalesHandy Design System (Figma) |
| **Code source** | `saleshandy-webui` repository |
| **Verdict** | Significant divergence. Two different design languages are in use. |

---

## Executive Summary

The Figma design system and the GitHub production code are built on **two fundamentally different design foundations**. Figma specifies Tailwind CSS primitives. The production codebase consumes Ant Design primitives. This is not a case of minor drift -- it is a structural mismatch that affects every colored element, most typographic decisions, and several component behaviors.

A partial migration exists in the codebase (a second set of variables mapping to Tailwind values), but it was never completed. Until one system is chosen and fully applied, the two sources of truth will continue to contradict each other.

---

## 1. Color System Mismatch (Critical)

This is the single largest deviation. Every design token that references color is affected.

### Root Cause

- **Figma** defines colors using the **Tailwind CSS** palette (e.g., `blue-700: #1d4ed8`).
- **GitHub** defines colors using the **Ant Design** palette (e.g., `$blue-6: #0137fc`).

These are entirely different color ramps. They do not converge at any step.

### Primary Blue

| Role | Figma (Authority) | GitHub Code | Delta |
|------|-------------------|-------------|-------|
| Default | `#1d4ed8` (Tailwind blue-700) | `$blue-6: #0137fc` (Ant Design) | Hue and saturation differ |
| Hover | `#1e40af` (blue-800) | `$blue-5: #346aff` | GitHub is lighter, not darker |
| Pressed | `#1e3a8a` (blue-900) | `$blue-7: #0004c9` | Both darken, but to different targets |
| Light background | `#dbeafe` / `#eff6ff` | `$blue-1: #e6f7ff` / `$blue-2: #bae7ff` | Tints are noticeably different |

**Impact:** Every primary button, link, selected state, active tab, focus ring, and branded element renders in the wrong blue.

### Grays

| Role | Figma | GitHub | Visual Distance |
|------|-------|--------|-----------------|
| Gray 50 (lightest bg) | `#f9fafb` | `$gray-2: #fafafa` | Very close |
| Gray 100 (subtle bg) | `#f3f4f6` | `$gray-3: #f5f5f5` | Very close |
| Gray 200 (borders) | `#e5e7eb` | `$gray-4: #e8e8e8` | Close but perceptibly different |
| Gray 500 (secondary text) | `#6b7280` | `$gray-7: #8c8c8c` | Noticeable -- GitHub is warmer and lighter |
| Gray 800 (primary text) | `#1f2937` | `$gray-9: #262626` | Text color differs -- GitHub is less blue-tinted |

### Semantic Colors

| Role | Figma | GitHub | Notes |
|------|-------|--------|-------|
| Error / Red | `#b91c1c` | `$red-6: #f5222d` | Significantly different. GitHub red is brighter and more saturated. |
| Success / Green | `#10b981` | `$green-6: #52c41a` | Different hue entirely (teal-green vs. lime-green). |
| Warning / Yellow | `#f59e0b` | `$gold-6: #faad14` | Similar warmth, but distinct hex values. |

### Evidence of an Incomplete Migration

The file `_custom-variable.scss` contains a section labeled **"11. New Used Color"** that defines a second set of variables using Tailwind values:

```
$blue-11: #1d4ed8
$gray-15: #6b7280
```

These match Figma exactly. However, they coexist with the Ant Design variables and are not universally applied. This confirms that someone began aligning the code to Figma but the effort stalled.

---

## 2. Typography

### Font Family

| Property | Figma | GitHub | Match |
|----------|-------|--------|-------|
| Primary font | Inter | Inter | Yes |
| Secondary font | (none) | Roboto | No -- GitHub includes an extra font not in the design system |

### Font Size Scale

| Figma Steps | GitHub Steps (`$font-size-*`) |
|-------------|-------------------------------|
| 10, 12, 14, 16, 18, 20, 24, 32, 40, 48 px | 12, 14, 16, 18, 20, 24, 30, 36 px |

Differences:
- Figma includes 10px (caption/micro). GitHub does not.
- Figma includes 32, 40, 48px (display sizes). GitHub uses 30 and 36px instead.
- The two scales diverge above 24px.

### Base Font Size

| | Value |
|---|---|
| Figma | **14px** |
| GitHub (`$font-size-base`) | **16px** |

This is a foundational mismatch. A 2px base size difference cascades into every relative unit (`em`, `rem`) and affects component sizing globally.

### Font Weights

| Figma | GitHub |
|-------|--------|
| 300, 400, 500, 600, 700 | 200, 300, 400, 500, 600, 700, 800, 900 |

Figma uses a narrower range. GitHub defines weights that Figma never references (200, 800, 900), suggesting either legacy holdovers or components that were styled without consulting the design system.

### Line Heights

| System | Approach |
|--------|----------|
| Figma | Explicitly mapped per size (e.g., 14px text -> 20px line-height) |
| GitHub | Named semantic tokens (`tight`, `normal`, `relaxed`) |

These are two different mental models. Figma is prescriptive per use case; GitHub is abstract and generic. They may produce similar results in some cases, but there is no guaranteed alignment.

---

## 3. Spacing

Figma components use **Tailwind-like spacing** with consistent 2px/4px increments. GitHub uses a mix of `px` and `rem` values without a single governing scale.

### Specific Deviations

| Component | Property | Figma | GitHub | Delta |
|-----------|----------|-------|--------|-------|
| Button (large) | Padding | `6px 16px` | ~`5px 16px` | 1px vertical difference |
| Button (small) | Padding | `2px 8px` | ~`1px 8px` | 1px vertical difference |

While 1px differences seem minor, they compound across a full UI and are visible in side-by-side comparisons. More importantly, the lack of a shared spacing scale means future components will continue to diverge.

---

## 4. Border Radius

| Context | Figma | GitHub | Match |
|---------|-------|--------|-------|
| Buttons | 4px | 4px (`$btn-custom-border-radius`) | Yes |
| Cards | 4px | 4px (`$border-radius`) | Yes |
| Dropdowns | **8px** | **4px** (`$border-radius`) | **No** |
| Toggle | 9999px (pill) | -- | New in Figma, not yet in code |
| Labels (pill) | 9999px (pill) | -- | New in Figma, not yet in code |

The dropdown radius mismatch (8px vs. 4px) is visually obvious and affects every select, popover, and autocomplete menu.

---

## 5. Shadows

Figma defines purpose-specific shadow tokens. GitHub uses generic CSS shadow variables. The values differ meaningfully.

| Element | Figma | GitHub |
|---------|-------|--------|
| Dropdown | `0 4px 16px rgba(0,0,0,0.09)` | `$dropdown-custom-box-shadow: 0px 2px 8px rgba(0,0,0,0.15)` |
| Header | `0 2px 4px rgba(229,231,235,1)` | (generic or none) |

Key differences:
- Figma dropdown shadow is **larger but softer** (16px blur, 0.09 opacity). GitHub's is **smaller but harsher** (8px blur, 0.15 opacity).
- Figma header shadow uses a **gray tint** (`rgba(229,231,235,1)`) rather than black with opacity. This produces a cooler, more subtle effect.

---

## 6. Component Coverage Gaps

### In Figma but Not in GitHub (missing implementations)

| Component | Notes |
|-----------|-------|
| Split Button | Button with primary action + dropdown for secondary actions |
| Radio Card | Radio input styled as a selectable card |
| Check Card | Checkbox input styled as a selectable card |
| AI Button type | Specialized button variant for AI-powered features |
| Refined Label system | 238-variant label with semantic color/shape combinations |
| Score badges | Numeric score indicators |
| Outcome labels | Status labels for outcomes/results |

These represent design intent that engineering has not yet received or built.

### In GitHub but Not in Figma (potential tech debt)

| Component / Pattern | Notes |
|---------------------|-------|
| Business-specific molecules (PricingCard, SubscriptionPlanDetails, etc.) | Expected -- these are product-specific and may not belong in the design system |
| `react-bootstrap-table-next` (legacy table) | Coexists with TanStack Table (new). Legacy should be phased out. |
| Reactstrap components | Used alongside the custom design system, causing style collisions |

---

## 7. UI Library Conflict

The production codebase simultaneously depends on **three overlapping UI frameworks**:

| Library | Role | Problem |
|---------|------|---------|
| `@saleshandy/design-system` v0.17.5 | Custom component library | This should be the single source of truth |
| Bootstrap 4 + Reactstrap | Global CSS framework + React wrappers | Injects its own opinions on spacing, typography, colors, and resets |
| `react-bootstrap` | Another Bootstrap React wrapper | Redundant with Reactstrap; two wrappers for the same CSS framework |

### Consequences

1. **Bootstrap's global CSS resets override design system values.** Any `<button>`, `<input>`, `<table>`, or `<a>` element inherits Bootstrap defaults unless explicitly overridden.
2. **Specificity wars.** Bootstrap's utility classes and component styles compete with custom SCSS, leading to `!important` usage and fragile selector chains.
3. **Bundle bloat.** Three UI libraries means shipping redundant CSS and JS to the client.
4. **Cognitive overhead.** Developers must decide which library to use for each component, leading to inconsistent choices across the codebase.

---

## 8. Priority Recommendations

Ordered by impact and feasibility. Each item includes a rough effort estimate.

### P0 -- Do First

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 1 | **Complete the Tailwind color migration.** Replace all Ant Design color variables (`$blue-6`, `$red-6`, etc.) with the Tailwind-aligned "New Used Color" variables (`$blue-11`, etc.) already present in `_custom-variable.scss`. | Colors touch every component. The migration is already partially done. Finishing it eliminates the single largest class of deviations. | Medium -- mostly find-and-replace, but requires visual regression testing |
| 2 | **Align `$font-size-base` to 14px.** Change the base from 16px to 14px to match Figma, and audit all `rem`-based sizes for cascading effects. | Base font size affects every text element and every component that uses relative units. | Medium -- one variable change, but wide blast radius |
| 3 | **Choose one Bootstrap strategy.** Either (a) remove Reactstrap and react-bootstrap entirely and replace with design system components, or (b) keep one and remove the other. Document the decision. | The triple-library conflict is the root cause of many styling inconsistencies and makes future alignment impossible. | Large -- requires component-by-component migration |

### P1 -- Do Next

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 4 | **Update dropdown border-radius to 8px.** Single variable change in SCSS. | Visible mismatch on a frequently-used component. | Small |
| 5 | **Align shadow tokens.** Replace generic shadow variables with purpose-specific tokens matching Figma (dropdown, header, tooltip, modal). | Shadows affect perceived depth and visual hierarchy. | Small-Medium |
| 6 | **Reconcile the font size scale.** Add missing steps (10px, 32px, 40px, 48px) to the code scale and remove steps not in Figma (30px, 36px) or document why they exist. | Prevents ad-hoc font size choices and brings text closer to spec. | Small |
| 7 | **Align button padding.** Adjust vertical padding on large and small button variants to match Figma (6px/2px instead of 5px/1px). | Fixes a subtle but visible sizing difference across the most common interactive element. | Small |

### P2 -- Plan and Schedule

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 8 | **Implement missing Figma components** (Split Button, Radio Card, Check Card, AI Button, Label system, Score badges, Outcome labels). | Figma has designed these; engineering needs to build them before product teams use ad-hoc replacements. | Large -- new component development |
| 9 | **Deprecate `react-bootstrap-table-next`.** Migrate remaining legacy tables to TanStack Table. | Removes a redundant dependency and unifies the table implementation. | Large |
| 10 | **Establish a shared design token pipeline.** Export tokens from Figma (via Tokens Studio or similar) and consume them directly in code. | Prevents future drift by making Figma the automated source of truth for color, type, spacing, and shadow values. | Large -- tooling and process change |

---

## Appendix: How to Validate

After each priority item is completed, use the following checks:

1. **Visual regression tests.** Capture screenshots of key pages before and after. Compare pixel-level differences.
2. **Token audit.** Grep the SCSS codebase for any remaining references to the old Ant Design variable names.
3. **Bundle analysis.** Measure CSS bundle size before and after removing redundant libraries.
4. **Figma overlay.** Export key screens from Figma at 1x and overlay them on production screenshots at the same viewport width. Differences should be limited to dynamic content, not styling.

---

*Report generated 2026-02-13. Reassess quarterly or after any major design system release.*
