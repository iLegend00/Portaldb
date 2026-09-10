# PortalDB Visual System

## Canonical blue roles

PortalDB has exactly two general-purpose blue roles.

### Substantial blue surface

The canonical treatment for substantial blue surfaces is the same gradient used by the global header:

```css
--portal-blue-surface: linear-gradient(180deg, #0e477d, #082f59);
```

Use `var(--portal-blue-surface)` for large title and header boxes, strong selected panels, major calculator results, large primary buttons, sticky navigation bars, and other substantial blue surfaces. These surfaces must use the exact vertical two-stop gradient. Feature pages may not introduce lighter, darker, horizontal, or multi-stop blue gradients.

### Small blue accent

The canonical flat accent is:

```css
--portal-blue-accent: #0b4f8b;
```

Use `var(--portal-blue-accent)` for small blue text, links, icons, thin borders, tiny labels, compact controls, and restrained focus accents. Do not use alternate flat blues for hierarchy.

## Interaction states

Hover, focus, and active states must not introduce another blue hue or gradient. Keep the applicable surface or accent token and vary gold borders, neutral shadows, underlines, or transforms for feedback.

Transparent `rgba(11, 79, 139, <alpha>)` is limited to subtle shadows, focus rings, borders, and background hints. It must not become a competing visible blue surface.

## Header

The global header is the visual source of truth for substantial blue surfaces. Its established gradient and emblem details remain unchanged. Header-only emblem highlights and structural effects must not be reused as general page colors.

## Semantic exceptions

A distinct blue may remain only when it communicates a documented semantic category rather than general interface emphasis. Current exceptions are:

- the Rare equipment-rarity color;
- provenance-state colors defined by the verification system.

Keep these colors scoped to their semantic selectors. Do not reuse them for ordinary controls, text, surfaces, or decoration.

## Review rule

Classify every blue use as a substantial surface, small accent, or documented semantic exception. Inspect the rendered result—not only the variable name—and confirm that no third general-purpose blue family appears.
