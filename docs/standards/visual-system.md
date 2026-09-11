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

Choose text color from the immediate background, not from a component's general theme. Substantial blue surfaces use light cream/off-white for primary text and readable light gold for secondary emphasis; never place the general blue accent on them. Light parchment surfaces use dark ink or warm brown, while dark and wood surfaces use light text. Hover, focus, active, selected, and disabled states must preserve the same readable foreground/background relationship. Target WCAG AA contrast where practical. The homepage remains artwork-led and is excluded from internal-page visual-system changes.


## Surface hierarchy

Use the canonical blue surface for major branded UI such as heroes, prominent results, navigation bars, and strong table headers. Use parchment as the primary information and content surface, with the established deeper parchment as its secondary variation. Gold belongs to trim, borders, dividers, labels, and ornament; ink is primarily text on parchment. Wood and brown support framing and decorative structure rather than large content-panel fills. Dark, near-black, and purple content panels are not part of the default PortalDB page system. Any feature-specific exception must be intentional, semantic, and documented. The walkthrough defines the material and palette hierarchy for internal pages.

## Canonical internal-page reference

The PortalDB Walkthrough page is the canonical visual reference for all non-homepage pages. New and existing internal pages must follow its material hierarchy, palette roles, typography hierarchy, framing language, and contrast system.

Internal pages use the walkthrough's atmospheric blue-to-parchment page field, canonical blue branded hero surfaces, wood-and-gold structural frames, and textured parchment content interiors. Larger parchments may retain decorative breathing room; hierarchy comes from material role, typography, borders, spacing, and restrained shadows.

- Atmospheric field: `--portal-internal-background`
- Substantial blue surface: `--portal-blue-surface`
- Small blue accent: `--portal-blue-accent`
- Timber frame: `--portal-field-guide-frame`
- Parchment interior: `--portal-field-guide-parchment`
- Gold structure: `--portal-gold`
- Ink: `--portal-ink`
- Text on blue: `--portal-text-on-blue`

The homepage is intentionally exempt and retains its established artwork-led presentation. The walkthrough remains the unchanged reference implementation.

Semantic colors are limited to tightly scoped meanings such as rarity, success, warning, error, and provenance; they must not become general-purpose page decoration.
