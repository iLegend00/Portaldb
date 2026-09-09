# PortalDB Project State

**Last updated:** 2026-09-09

This is the canonical handoff for the project's current state. Permanent rules remain in [`standards/`](standards/), feature architecture remains in [`features/`](features/), and unimplemented evidence remains in [`research/`](research/).

## Current Phase

**Farming / Homestead Architecture Research**

Farming / Homestead research is reconciled into official facts, developer-endorsed community references, player observations, approximate measurements, source conflicts, and implementation gates. Greenhouse evidence is now comparatively strong, but crop coverage, build-capacity rules, irrigation dependencies, and exact geometry remain insufficient for broad production implementation.

## Recently Completed

- Official patch-note handling tightened so direct developer wording is preserved and ambiguous mechanics are not silently interpreted; v1.2.16 and v1.2.17 were corrected accordingly.
- Official patches v1.2.16 and v1.2.17 added; the homepage Game Updates panel now derives its two newest entries from canonical Patch History data, and the Chapter 3 release is represented once in curated Updates as a major content milestone.
- Farming / Homestead research reconciled with source priority, readiness matrix, modular data architecture, player-facing plan, and implementation gates.
- Equipment Profile architecture finalized with a compact identity header, optional artwork, conditional exact/sparse/variable rendering, consolidated Stats, rarity-colored Roll Quality, and linked acquisition/recipes.
- All supported legacy equipment records migrated: Fortune Clover, Bone Bite, Tinker's Goggles, Plague Mask, Iron Hammer +3, and Axe; Magnifying Glass intentionally remains non-equipment.
- Equipment stat presentation finalized: concise `Requires X STAT` wording, shared `Value / Range` terminology, aligned Guaranteed/Possible columns, and no player-facing Primary/Fixed taxonomy.
- Thornprick, Briar Blade, and Thornguard Hood added as community-sourced structured equipment examples without elevating them to Official Confirmed.
- NPC Profiles completed and locked after responsive and accessibility QA.
- Shared category-aware Record Profiles completed and locked after final QA.
- Official patches v1.2.14 and v1.2.15 added, with supported current mechanics propagated.
- Patch History converted to a compact reverse-chronological changelog browser.
- Major Updates separated from routine Patch History entries; Patch History remains exhaustive and Updates is curated.

## In Progress

The architecture plan is defined, but production implementation remains gated. A Season 1 Premium Pass completer has now verified placing a second Greenhouse while wearing no special title, materially supporting the official permanent-slot claim and showing that Overclocked is not universally required in that case. An independent Overclocked effect and any maximum above two remain unresolved. The planned farm rebuild offers a controlled manual-placement-ledger opportunity; Hydraulics, crops, build-capacity accounting, exact geometry, Animal Plot rules, and vertical limits remain blockers.

## Next

1. Preserve the supported Greenhouse conclusions while keeping independent Overclocked behavior and higher maximums unresolved.
2. Use the farm rebuild as a manual placement/build-capacity observation session with categorized counts and recorded rejection behavior.
3. Verify Water Tank, Pump, Pipe/Valve, Sprinkler, and Greenhouse irrigation dependencies.
4. Collect a representative crop set with seasons, growth, sources, outputs, watering, and Greenhouse behavior.
5. Begin modular farming production datasets only when the relevant gates in `research/farming.md` are satisfied.

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
- Do the Overclocked-title and Season 1 Premium Pass Greenhouse bonuses coexist, stack, or supersede one another?
- How do Water Tank, Pump, Pipe/Valve, Sprinkler, and Greenhouse irrigation depend on one another?

### Combat

- What are the exact attribute and combat-stat scaling formulas?
- How do damage buckets interact?
- What defense formulas do bosses use?
- Which fields are affected by refinement and its bonus slots?
