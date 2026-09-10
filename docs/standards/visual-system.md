# PortalDB Visual System

## Canonical interface blue

PortalDB's sole canonical general-purpose interface blue is `#0b4f8b`.

Use the shared `--portal-blue` custom property for every ordinary blue heading, title bar, section header, button, link, icon, border, selected state, focus indicator, badge, label, result panel, and decorative rule.

A token substitution is not sufficient when gradients, opacity, overlays, filters, blending, or inherited effects make a general blue surface visibly lighter, darker, more cyan, or more navy than `#0b4f8b`. Prominent general-purpose blue surfaces must visually render as the flat canonical color.

## Prohibited variations

Outside the global header:

- do not use blue-to-blue gradients;
- do not introduce lighter, darker, cyan, teal, navy, royal, or slate-blue alternatives for ordinary UI;
- do not change blue hue for hover, active, or focus states;
- do not define feature-specific decorative blue variables;
- do not reuse header-only gradient shades elsewhere.

Interaction hierarchy should instead use border weight, underline, shadow, transform, or surrounding neutral and gold colors while retaining `var(--portal-blue)`.

Transparent `rgba(11, 79, 139, <alpha>)` is limited to subtle shadows, focus rings, borders, and background hints. It must not become a competing visible blue surface.

## Header

The global header is the visual source of truth. Its established internal gradient shading and emblem highlights are preserved only within the header. Those structural colors are not additional interface-blue tokens and must not be copied into page or feature styling.

## Semantic exceptions

A distinct blue may remain only when it communicates a documented semantic category rather than general interface emphasis. Current exceptions are:

- the Rare equipment-rarity color;
- provenance-state colors defined by the verification system.

Keep these colors scoped to their semantic selectors. Do not reuse them for ordinary controls, text, surfaces, or decoration.

## Review rule

Start with `var(--portal-blue)`, inspect the rendered result, and confirm it still appears as `#0b4f8b`. Add a different blue only when it encodes a documented semantic meaning, and record any new durable exception here.
