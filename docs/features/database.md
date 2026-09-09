# Database Architecture

**Status:** Active  
**Scope:** `database.html`, `database.css`, `site-pages.css`, `app.js`, and `app-core.js`  
**Last updated:** 2026-08-30

The Database page has two independent discovery paths. Global search renders only in the search-results region. Category selection renders only in the dedicated category browser beneath the category index; it never writes a category name into search or reuses the search-results region.

## Category index

Categories are grouped in this order:

- **World & Content:** Items, Quests, NPCs, Bosses, Locations
- **Character:** Races, Jobs, Skills
- **Game Systems:** Mechanics
- **News & Reference:** Codes, Patch History, Updates

Items and Quests link to their dedicated pages. The remaining categories open existing records inline and continue to use the shared record-detail behavior.

## URL and interaction behavior

Inline categories use `database.html?category=<key>`. A valid deep link restores the selected category and browser contents after data loads. Invalid or absent category values leave the browser in its normal closed state. Category changes use browser history, and back/forward navigation restores the corresponding state. The selected category is communicated visually and with `aria-pressed`.

The category browser does not add provenance markers. Existing record details remain governed by the [Provenance UX](../standards/provenance-ux.md) and [Data Integrity](../standards/data-integrity.md) standards.

## Patch History

Patch History is the complete chronological record of official patches, hotfixes, balance changes, bug fixes, and versioned game changes. It is exhaustive: patch records are sorted by supported implementation date descending and use a compact list presentation rather than the generic Database record-card grid. Records without a supported date follow dated records, and complete patch highlights remain only in the shared Patch record-profile dialog.

The homepage Game Updates panel is data-driven from the canonical `data/patches.json` dataset. It always derives the two newest supported patch records by actual date descending, with deterministic version and record-ID fallbacks; recent patches must never be hardcoded into homepage markup.

## Updates

Updates contains only major content releases, system launches, and significant game milestones. It is curated: a numbered patch is not automatically duplicated as an Update, although a milestone Update may reference the patch version that introduced it. Update summaries remain focused on the milestone while complete patch details belong only in Patch History. Updates sort by supported date descending and retain the generic Database record presentation.
