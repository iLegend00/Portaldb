# PortalDB Visual System

## Canonical interface blue

PortalDB's canonical general-purpose interface blue is `#0b4f8b`.

Use the shared `--portal-blue` custom property for general UI accents, including buttons, links, selected states, borders, focus indicators, icons, and decorative rules. When transparency is required, derive the tint from the same RGB value: `rgba(11, 79, 139, <alpha>)`.

Do not introduce separate page-specific blue variables or competing hard-coded blue shades for general interface styling.

## Header

The global header is the visual source of truth for PortalDB blue. Its existing gradient shading and emblem highlights are intentionally preserved; those structural shades are part of the established header treatment, not alternative general-purpose UI colors.

## Semantic exceptions

A distinct blue may remain only when it communicates a documented semantic category rather than general interface emphasis. Current exceptions are:

- the Rare equipment-rarity color;
- provenance-state colors defined by the verification system.

Keep these colors scoped to their semantic selectors. Do not reuse them for ordinary controls or decoration.

## Review rule

When adding or editing UI, first use `var(--portal-blue)`. Add a different blue only when the color encodes a documented semantic meaning, and record any new durable exception here.
