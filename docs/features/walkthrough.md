# PortalDB — Full Walkthrough Architecture

**Status:** Active  
**Scope:** `walkthrough.html` and future chapter pages  
**Last Updated:** 2026-09-09

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

For navigation-heavy walkthrough steps, use visual route guidance from the player's likely starting point instead of relying only on formal location or portal names.

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

The walkthrough should synthesize these relationships into practical progression guidance rather than render a database dump. Quest objectives and rewards remain ordered as stored. Unsupported routes, recommendations, formulas, and optimization claims stay unpublished.

The walkthrough supports partially documented chapters. A chapter's `partCount` records the supported total shown in-game, while `parts.length` is the number of complete, renderable parts currently documented. Known names for undocumented parts may be retained separately as metadata, but undocumented parts must not render as empty placeholders or navigable sections. Coverage labels state the documented count when it is lower than the total, and only supported quest content appears.

Objectives are the canonical in-game task list. Authored `walkthrough` steps are a separate instructional layer that may clarify supported sequence and context but must not invent mechanics or routes. Each structured step may later receive its own optional screenshot and caption; screenshots should attach to the relevant step rather than appear in a generic gallery. Numeric progress objectives follow the site-wide initial-state `(0/N)` rule.

A walkthrough step should explain meaningful player context hidden behind an objective when needed: choice implications, system introductions, consequences, requirements, and other supported decision context. It must not merely restate the objective. Guide depth may vary by part: simple quests can remain brief, while important choice-, puzzle-, or navigation-heavy quests may receive richer structured guidance. The structure follows the player's experience rather than forcing one paragraph for every canonical objective.

When a quest first introduces a recurring world system, such as NPC schedules, explain that system briefly at the point where the player first encounters it. Later quest parts should rely on that established context instead of repeating the same general explanation unless new supported behavior materially changes what the player needs to know.

## Step media

Walkthrough screenshots and location images are instructional content and attach to the exact `walkthrough` step they support through an optional `media[]` field. Each media entry requires `src` and meaningful `alt`; `caption` is optional and should tell the player what to notice rather than repeat a filename. A step may have zero, one, or multiple images when every image solves a distinct player problem.

Media renders in the same editorial flow as its step: after the supporting text on desktop and immediately below it on mobile, with captions beneath their images. Generic galleries, detached screenshot sidebars, chapter-wide dumps, and part-wide miscellaneous image sections are not the default pattern. Simple parts may need no images, while navigation-, scavenger-, or puzzle-heavy parts may use substantially more when each image provides distinct guidance.

## Provenance

Follow the [Provenance UX Standard](../standards/provenance-ux.md). Use selective record- or chapter-level source markers and avoid phrases such as:

- verified progression;
- verified objectives; or
- expanding with verified information.

Describe current coverage directly, such as **Chapters 1–3**, without adding placeholder chapters or progress-state filler. Chapter 3 is fully documented through all five currently released parts; partial chapters remain supported by the architecture.

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
- Only chapters with documented parts appear in the walkthrough index and navigation; within a partial chapter, only documented parts receive links and rendered sections.
