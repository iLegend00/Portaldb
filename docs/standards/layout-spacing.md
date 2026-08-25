# PortalDB — Layout Spacing Guidelines

**Status:** Active Guidance  
**Scope:** Site-wide design consideration, applied per composition  
**Last Updated:** 2026-08-25

## Core principle

**Spacing is composition-specific. Use visual judgment first.**

PortalDB does not use one rigid spacing formula, mandatory margin scale, or universal panel gap. Tune each page according to the visible relationship between its components, including artwork shape, transparent image bounds, panel hierarchy, content density, responsive breakpoint, and intentional visual grouping.

Shared values or CSS variables may be useful implementation conveniences. They are not authoritative when a composition needs different spacing.

## Responsive review

Evaluate desktop, tablet, and mobile independently. Approximate widths such as 1440 px, 900 px, and 390 px are useful review contexts, not spacing specifications. At each breakpoint, inspect the complete visible composition and confirm there is no horizontal overflow, clipped content, content hidden beneath sticky navigation, accidental crowding, or oversized empty tail after the last meaningful panel.

## Visible-content geometry

When decorative art contains transparency:

1. Inspect the production asset's full canvas and visible bounds.
2. Measure the perceived gap between visible edges in the rendered page.
3. Keep artwork and live content in the same coordinate system.
4. Document any non-obvious offset beside the CSS rule that depends on it.

Decorative artwork may require measured offsets because its visible frame does not fill its image canvas. Do not normalize those values by comparing DOM rectangles alone. Add a concise CSS comment when an unusual offset compensates for artwork geometry.

## Implementation guidance

- Prefer a clear parent margin or padding adjustment when one section transition needs tuning.
- Avoid unexplained chains of negative margins, transforms, or descendant offsets.
- Use `clamp()`, variables, or targeted media rules when they suit the composition; none is required as a universal system.
- Account for persistent headers when viewport-based minimum heights would otherwise create an accidental empty tail.
- Let content density inform panel height instead of adding blank height merely to equalize unrelated panels.
- Keep sticky controls from obscuring anchor targets and headings.
- Avoid both accidental huge voids and accidental crowding, while preserving deliberate breathing room and grouping.

## Page-specific spacing is normal

Page-specific spacing is expected and is not an exception to a global formula:

- Homepage artwork-led panels may require custom offsets based on visible asset bounds.
- Walkthrough parchment and long-form content may use a more generous reading rhythm.
- Database and card interfaces may use denser spacing to support scanning.
- Tool pages may prioritize functional grouping around controls and results.
- Long-form guide pages may need additional breathing room between major chapters.

Tune the homepage independently according to the visible relationship between the category deck, walkthrough CTA, information board, and About PortalDB. Its artwork compensation must not become a rule for other pages. Desktop and responsive homepage compositions may also need different strategies when decorative art is hidden or simplified.

## Change checklist

- Compare before and after in representative desktop, tablet, and mobile contexts.
- Measure DOM rectangles and visible artwork edges when transparency is involved.
- Verify the first content panel does not feel detached from the header or hero.
- Verify repeated panels feel intentionally grouped; identical gaps are not required when hierarchy calls for a different relationship.
- Verify the final panel has a deliberate path to the footer or page end without a large empty void.
- Record new artwork-specific compensation in feature documentation or an adjacent CSS comment.

## Design decisions

### 2026-08-25 — Spacing is composition-specific

PortalDB does not enforce a universal panel-gap or vertical-rhythm formula. Spacing is tuned per page and per component based on visible artwork, hierarchy, and responsive behavior. Site-wide guidance exists to prevent accidental dead space and geometry mistakes, not to dictate identical spacing everywhere.
