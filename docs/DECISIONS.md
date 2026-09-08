# PortalDB Decisions

This file records durable product and architecture decisions that should not be casually re-litigated. Detailed rules remain in the linked standards and feature documents.

## Product Positioning

PortalDB is a player decision-support companion, not merely a fact catalog. Its structure should help players understand what something is, why it matters, how to obtain or use it, and what to do next.

PortalDB does not imitate Fandom-style wiki presentation. External wikis may be used as factual reference sources, but PortalDB does not mirror their page structure, prose, or information architecture. Equipment records are reorganized into PortalDB's own decision-oriented field-guide format.

Tools must reduce real player effort or provide meaningfully new decision support. PortalDB does not add interactions that merely ask players to re-enter information already visible on a profile. The previously considered Roll Checker and “Compare My Item” concepts were rejected in that form as redundant; usefulness and structure, not interaction count, are how PortalDB improves on a wiki.

## Data Integrity

Unsupported facts are omitted, values are never invented, provenance metadata is preserved, and conflicting sources are not silently reconciled. The authoritative rules are the [Data Integrity Standard](standards/data-integrity.md) and [Provenance UX Standard](standards/provenance-ux.md).

The Portal community wiki may be treated as a developer-endorsed community reference because developers have been observed directing players to it. That endorsement does not make the wiki first-party, guarantee every page, or allow it to override direct official Discord, developer, or patch evidence.

Farming research keeps exact mechanics, approximate spatial measurements, and personal layout preferences separate. Approximate measurements must remain labeled, and a personal farm plan is never generalized into production guidance.

## Navigation

The locked global primary navigation is **Home · Database · Walkthrough · Tools**. The linked brand and explicit Home item intentionally coexist. See the [Global Navigation Standard](standards/global-navigation.md).

## Profile Architecture

- NPC Profiles are specialized and locked; their conditional content and portrait system remain separate from generic records.
- Shared Record Profiles are category-aware and render only fields meaningful to each supported collection.
- Equipment will use a specialized renderer rather than expanding the generic Record Profile into an equipment catch-all.
- Non-equipment items must remain compatible throughout the equipment migration.

See [NPC Profile Architecture](features/npc-profiles.md) and [Shared Record Profile Architecture](features/record-profiles.md).

## Patch and Update History

Patch History is exhaustive and reverse chronological. Updates is a curated set of major releases, system launches, and milestones; a numbered patch is not automatically duplicated as an Update. See [Database Architecture](features/database.md).

## Documentation Strategy

- `standards/` contains permanent cross-site rules.
- `features/` contains feature architecture and durable feature-specific behavior.
- `PROJECT_STATE.md` records the current project handoff.
- `ROADMAP.md` records development direction and sequence.
- `DECISIONS.md` records durable locked decisions.
- `research/` contains collected facts, observations, conflicts, measurements, preferences, and unresolved mechanics that are not necessarily production-ready.

Research does not become production data until it satisfies the existing data-integrity and provenance standards.

