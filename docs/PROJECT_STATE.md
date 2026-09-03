# PortalDB Project State

**Last updated:** 2026-09-02

This is the canonical handoff for the project's current state. Permanent rules remain in [`standards/`](standards/), feature architecture remains in [`features/`](features/), and unimplemented evidence remains in [`research/`](research/).

## Current Phase

**Equipment Data Architecture + Item Profile Upgrade**

PortalDB currently has a generic item dataset and Item Finder, but no specialized equipment schema or equipment profile renderer. The active phase is to design that architecture without breaking existing non-equipment items.

## Recently Completed

- NPC Profiles completed and locked after responsive and accessibility QA.
- Shared category-aware Record Profiles completed and locked after final QA.
- Official patches v1.2.14 and v1.2.15 added, with supported current mechanics propagated.
- Patch History converted to a compact reverse-chronological changelog browser.
- Major Updates separated from routine Patch History entries; Patch History remains exhaustive and Updates is curated.

## In Progress

Equipment work is queued next; it is not yet implemented. Intended scope:

- structured equipment architecture;
- specialized equipment profiles;
- Primary, Secondary, and Fixed roll taxonomy;
- roll ranges and roll quality;
- requirements, crafting, acquisition, and values; and
- equipment-oriented search improvements.

## Next

1. Implement Equipment Profiles architecture.
2. Add source-supported structured equipment records.
3. Continue farming and homestead research.
4. Expand farming/building architecture once its mechanics are sufficiently understood.

## Research Waiting for Implementation

- [Equipment](research/equipment.md) — proposed fields, known examples, roll quality, and unresolved modifier behavior.
- [Farming / Homestead](research/farming.md) — approximate plot geometry, structures, build-limit questions, and layout planning.
- [Combat / Build](research/combat.md) — current character context, skill thresholds, official caps, refinement references, and unresolved formulas.

Research notes are not production data and may contain explicitly labeled conflicts, approximations, or personal planning preferences.

## Open Questions

### Equipment

- What is the maximum number of Secondary modifiers that can coexist?
- Are Secondary appearance checks fully independent?
- What is the exact relationship between modifier rarity and multiple rolls?
- What does refinement `Stat Bonus` affect?
- How do the +5 and +10 bonus slots select modifiers?

### Farming

- Is the reported 500-item plot build cap exact?
- What is the exact Greenhouse build-limit cost?
- What is the exact Animal Plot build-limit cost?
- Do planted crops consume build-limit slots?
- What is the exact sprinkler coverage?
- What is the vertical build-height limit?
- How are special or composite structures counted and placed?

### Combat

- What are the exact attribute and combat-stat scaling formulas?
- How do damage buckets interact?
- What defense formulas do bosses use?
- Which fields are affected by refinement and its bonus slots?
