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

## Strict canonical palette

PortalDB uses one exact canonical treatment per general-purpose color role. Feature stylesheets may not introduce lighter, darker, warmer, cooler, secondary, or approximate variants of blue, parchment, gold, ink, or muted text. Visual hierarchy must be created through layout, borders, typography, spacing, and effects rather than alternate palette shades.

- Blue surface: `--portal-blue-surface: linear-gradient(180deg, #0e477d, #082f59)`
- Blue accent: `--portal-blue-accent: #0b4f8b`
- Parchment surface: `--portal-parchment-surface: linear-gradient(180deg, rgba(255, 250, 232, .97), rgba(236, 215, 175, .98))`
- Gold: `--portal-gold: #c99b45`
- Light gold: `--portal-gold-light: #f0ce7b`
- Ink: `--portal-ink: #332b22`
- Muted text: `--portal-text-muted: #655b4e`
- Text on blue: `--portal-text-on-blue: #fff8e5`

There is no secondary parchment surface.

General-purpose feature UI must consume these shared tokens directly. Noncanonical colors are reserved for true semantic meaning such as rarity, success, warning, error, and provenance states, and must not be reused decoratively.
