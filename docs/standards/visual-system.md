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


## Text contrast

Choose text color from the immediate background, not from a component's general theme. Substantial blue surfaces use light cream/off-white for primary text and readable light gold for secondary emphasis; never place the general blue accent on them. Light parchment surfaces use dark ink or warm brown, while dark and wood surfaces use light text. Hover, focus, active, selected, and disabled states must preserve the same readable foreground/background relationship. Target WCAG AA contrast where practical. The homepage remains the visual source of truth and should not be altered unnecessarily by shared contrast corrections.


## Surface hierarchy

Use the canonical blue surface for major branded UI such as heroes, prominent results, navigation bars, and strong table headers. Use parchment as the primary information and content surface, with the established deeper parchment as its secondary variation. Gold belongs to trim, borders, dividers, labels, and ornament; ink is primarily text on parchment. Wood and brown support framing and decorative structure rather than large content-panel fills. Dark, near-black, and purple content panels are not part of the default PortalDB page system. Any feature-specific exception must be intentional, semantic, and documented. The homepage is the visual reference for overall palette balance.


## Fixed canonical palette

PortalDB uses a fixed canonical palette derived from the homepage. General-purpose UI colors must use shared palette tokens. Feature stylesheets may not introduce approximate, lighter, darker, warmer, cooler, or page-specific variants of canonical palette colors.

- Blue surface: `var(--portal-blue-surface)` = `linear-gradient(180deg, #0e477d, #082f59)`
- Blue accent: `var(--portal-blue-accent)` = `#0b4f8b`
- Parchment surface: `var(--portal-parchment-surface)` = the homepage category-card parchment gradient
- Secondary parchment: `var(--portal-parchment-surface-secondary)` = the homepage responsive information-panel parchment gradient
- Gold: `var(--portal-gold)` = `#c99b45`; light gold: `var(--portal-gold-light)` = `#f0ce7b`
- Ink: `var(--portal-ink)` = `#332b22`
- Wood: `var(--portal-wood)` = `#563616`
- Text on blue: `var(--portal-text-on-blue)` = `#fff8e5`
- Muted text: `var(--portal-text-muted)` = `#655b4e`

True semantic colors—rarity, success, warning, error, and provenance—remain scoped exceptions. If a new general-purpose color is desired, it must first be intentionally added to this shared visual system before any feature uses it.
