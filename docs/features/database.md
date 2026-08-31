# Database Architecture

**Status:** Active  
**Scope:** `database.html`, `database.css`, `site-pages.css`, `app.js`, and `app-core.js`  
**Last updated:** 2026-08-31

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

Patch History is the authoritative chronological record of official patches, hotfixes, balance changes, fixes, and versioned gameplay changes. It is a reverse-chronological changelog browser. Patch records are sorted by supported implementation date descending and use a compact list presentation rather than the generic Database record-card grid. Records without a supported date follow dated records, and complete patch highlights remain in the shared Patch record-profile dialog.

A change belongs in Patch History when the primary purpose of the record is to document what changed in a particular patch or hotfix, even if that patch also introduced a major feature.

## Updates

Updates is reserved for major releases, content launches, and significant feature introductions that deserve their own standalone historical milestone record. It is not a second copy of Patch History.

Examples of appropriate Update records include Chapter 2, a new world boss, a major system launch such as Identify or Guilds, and a Battle Pass season launch or formally announced release milestone.

Routine bug fixes, balance adjustments, stat-cap changes, minor quality-of-life changes, and version-by-version patch summaries belong only in Patch History unless they are part of a broader milestone record.

When a major feature launches inside a numbered patch, the patch remains fully documented in Patch History while Updates may contain a separate feature-focused record describing only the milestone itself. The Update record must not duplicate the full patch changelog.
