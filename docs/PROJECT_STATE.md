# PortalDB Project State

**Last updated:** 2026-09-02

This is the canonical handoff for the project's current state. Permanent rules remain in [`standards/`](standards/), feature architecture remains in [`features/`](features/), and unimplemented evidence remains in [`research/`](research/).

## Current Phase

**Farming / Homestead Architecture Research**

PortalDB now has additive structured equipment data and a dedicated equipment profile renderer while retaining legacy item compatibility. The active phase moves to verifying enough Farming / Homestead mechanics to support a grounded architecture.

## Recently Completed

- Equipment profiles implemented with structured Primary, Secondary, and Fixed rolls, requirements, acquisition, recipes, roll-quality guidance, and equipment-aware search.
- Thornprick, Briar Blade, and Thornguard Hood added as community-sourced structured equipment examples without elevating them to Official Confirmed.
- NPC Profiles completed and locked after responsive and accessibility QA.
- Shared category-aware Record Profiles completed and locked after final QA.
- Official patches v1.2.14 and v1.2.15 added, with supported current mechanics propagated.
- Patch History converted to a compact reverse-chronological changelog browser.
- Major Updates separated from routine Patch History entries; Patch History remains exhaustive and Updates is curated.

## In Progress

Farming / Homestead research is queued for reconciliation before implementation. Open geometry, build-limit, structure-cost, crop-slot, sprinkler, and vertical-limit questions remain explicitly unresolved.

## Next

1. Continue farming and homestead research.
2. Reconcile approximate observations with stronger evidence.
3. Define farming/building architecture once its mechanics are sufficiently understood.
4. Consider deeper item comparison only after unresolved equipment semantics are verified.

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
