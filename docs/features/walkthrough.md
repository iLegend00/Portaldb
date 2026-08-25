# PortalDB — Full Walkthrough Architecture

**Status:** Active  
**Scope:** `walkthrough.html` and future chapter pages  
**Last Updated:** 2026-08-24

## Purpose

The walkthrough is a practical full-game progression guide, not merely another view of the quest database. As PortalDB grows, it should help players understand:

- what to do next;
- where to go;
- who to talk to;
- what systems unlock;
- useful equipment, farming, and build advice;
- optional activities;
- warnings; and
- progression checkpoints.

Recommendations must not be invented. Advice is published only when the repository contains adequate supporting information.

## Layout

Do not use a rigid literal open-book layout. The permanent direction is:

- normal, usable walkthrough navigation and an index near the top;
- immersive parchment or field-guide content below;
- an optional wood or fantasy outer frame;
- a continuous content area that grows vertically with the guide; and
- responsive HTML that custom artwork may skin later.

Do not absolutely position long text onto fixed raster artwork. Decorative art must remain a separable layer around live, responsive content.

## Navigation

The architecture supports:

- a walkthrough hub/index;
- chapter navigation;
- stable individual-part anchors;
- sticky desktop walkthrough navigation where useful;
- a compact mobile **Walkthrough Index** dropdown;
- previous/next progression navigation; and
- future extraction of large chapters into dedicated pages.

Navigation must preserve keyboard access, usable anchor targets, readable focus behavior, and interactive card or select controls above decorative layers.

## Current Page Strategy

Keep the current walkthrough on one page while the documented content remains manageable. Future chapters may move to dedicated pages when guide depth makes the single page unwieldy. Do not create one page per tiny quest part.

A possible future structure is:

```text
walkthrough.html
walkthrough/chapter-1.html
walkthrough/chapter-2.html
walkthrough/chapter-3.html
```

The hub should continue to expose the overall progression structure if chapters are split.

## Content

Use `data/quests.json` as the primary progression backbone. Supporting context may come from:

- NPCs;
- items;
- enemies and bosses;
- locations;
- mechanics;
- jobs;
- races; and
- skills.

The walkthrough should synthesize these relationships into practical progression guidance rather than render a database dump. Quest objectives and rewards remain ordered as stored. Unknown routes, recommendations, formulas, and optimization claims stay unpublished or use natural “coming soon” states.

## Provenance

Follow the [Provenance UX Standard](../standards/provenance-ux.md). Use selective record- or chapter-level source markers and avoid phrases such as:

- verified progression;
- verified objectives; or
- expanding with verified information.

Use normal guide states instead:

- Guide in Progress;
- More guidance coming soon; or
- Currently documented through Chapter 2.

The walkthrough also follows the [Data Integrity Standard](../standards/data-integrity.md): no missing recommendation or progression step may be inferred merely to make the guide appear complete.

## Artwork

Future canonical walkthrough art belongs under:

```text
source-assets/artwork/walkthrough/
```

Production derivatives belong under:

```text
assets/walkthrough/
```

Artwork must follow the [Artwork Pipeline Standard](../standards/artwork-pipeline.md). It may provide parchment, wood, trim, or decorative framing, but it must not contain baked guide text or force fixed-height content.

## Current Implementation

- `walkthrough.html` owns the accessible page structure and navigation hooks.
- `walkthrough.js` renders documented progression from structured data and maintains stable chapter/part anchors.
- `walkthrough.css` owns the responsive field-guide surface, sticky navigation, callouts, and future artwork layers.
- Chapters beyond the currently documented sequence remain explicitly marked as guide content in progress.

