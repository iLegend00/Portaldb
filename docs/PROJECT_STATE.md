# PortalDB Project State

**Last updated:** 2026-09-03

This is the canonical handoff for the project's current state. Permanent rules remain in [`standards/`](standards/), feature architecture remains in [`features/`](features/), and unimplemented evidence remains in [`research/`](research/).

## Current Phase

**Farming / Homestead Architecture Research**

Farming / Homestead research has been reconciled into official facts, developer-endorsed community references, player observations, approximate measurements, source conflicts, and implementation gates. The phase remains research because core crop, capacity, irrigation, and geometry mechanics are not yet sufficiently established for production features.

## Recently Completed

- All supported legacy equipment records migrated to the structured Equipment Profile architecture, including exact-stat headgear and sparse tool coverage without inferred fields.
- Equipment profiles implemented with structured Primary, Secondary, and Fixed rolls, requirements, acquisition, recipes, roll-quality guidance, and equipment-aware search.
- Thornprick, Briar Blade, and Thornguard Hood added as community-sourced structured equipment examples without elevating them to Official Confirmed.
- NPC Profiles completed and locked after responsive and accessibility QA.
- Shared category-aware Record Profiles completed and locked after final QA.
- Official patches v1.2.14 and v1.2.15 added, with supported current mechanics propagated.
- Patch History converted to a compact reverse-chronological changelog browser.
- Major Updates separated from routine Patch History entries; Patch History remains exhaustive and Updates is curated.

## In Progress

The architecture plan is defined, but production implementation is gated. The official Greenhouse default/Premium Pass rules are identified; the Overclocked-title claim remains a documented conflict. Build-capacity accounting, Hydraulics dependencies, crop records, exact geometry, Animal Plot rules, and vertical limits remain blockers.

## Next

1. Run a controlled in-game verification session for build-capacity accounting and Water Tank/Pump/Pipe/Sprinkler dependencies.
2. Capture current Greenhouse recipe/maximum UI and reconcile the Overclocked-title claim with the official Premium Pass rule.
3. Collect a small representative crop set with seasons, growth, sources, outputs, watering, and Greenhouse behavior.
4. Begin modular production datasets only when the feature-specific gates in `research/farming.md` are met.

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

