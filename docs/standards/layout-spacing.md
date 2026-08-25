# PortalDB Layout Spacing

**Status:** Active  
**Scope:** Site-wide panel spacing, section transitions, and responsive vertical rhythm  
**Last Updated:** 2026-08-25

## Principle

Judge spacing by visible content and artwork, not only by an element's CSS box. PortalDB uses transparent decorative assets whose canvas bounds can extend beyond the visible frame. A numerically large margin may therefore produce a small visible gap, while adjacent boxes can still look far apart because their meaningful pixels sit inside those boxes.

## Review widths

Review layout changes at approximately 1440 px desktop, 900 px tablet, and 390 px mobile. At each width, check the full sequence of visible panels. Confirm there is no horizontal overflow, clipped content, content hidden beneath sticky navigation, or oversized empty tail after the last meaningful panel.

## Visible-content geometry

When decorative art contains transparency:

1. Inspect the production asset's full canvas and visible bounds.
2. Measure the perceived gap between visible edges in the rendered page.
3. Keep artwork and live content in the same coordinate system.
4. Document any non-obvious offset beside the CSS rule that depends on it.

The homepage category deck, walkthrough CTA, and information board intentionally use measured offsets because their visible frames do not fill their image canvases. Do not normalize those values by comparing DOM rectangles alone.

## Spacing rules

- Prefer one parent margin or padding value for a section transition.
- Avoid chains of compensating negative margins across multiple descendants.
- Scale spacing across breakpoints with `clamp()` or a targeted media rule when the visual relationship changes.
- Do not use `min-height: 100vh` below a persistent page header unless the header height is subtracted; otherwise the page gains a guaranteed empty tail.
- Let content density determine panel height. Do not add blank height merely to equalize neighboring panels.
- Sticky controls must leave anchor targets and headings visible when navigation settles.

## Homepage exceptions

The homepage is an artwork-led composition. Its desktop deck-to-CTA and CTA-to-board margins compensate for transparent decorative canvas space. The information-board-to-About transition also compensates for the board's lower transparent canvas bounds. These are intentional measured offsets, not a general spacing pattern.

Tablet and mobile hide the desktop information-board art and use normal-flow panels, so their spacing uses ordinary positive margins instead of desktop compensation.

## Change checklist

- Compare before and after at all three review widths.
- Measure DOM rectangles and visible artwork edges when transparency is involved.
- Verify the first content panel does not feel detached from the header or hero.
- Verify repeated panels use consistent gaps unless hierarchy calls for a larger transition.
- Verify the final panel has a deliberate path to the footer or page end without a large empty void.
- Record new artwork-specific compensation in feature documentation or an adjacent CSS comment.
