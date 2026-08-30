# Database Architecture

**Status:** Active  
**Scope:** `database.html`, `app-core.js`, and `site-pages.css`  
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
