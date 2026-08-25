# PortalDB — Data Integrity Standard

**Status:** Active  
**Scope:** Entire site and all structured game data  
**Last Updated:** 2026-08-24

## Core Rules

- Do not guess missing game facts.
- Unknown information remains explicitly unknown.
- Do not invent drop rates, formulas, stats, requirements, locations, rewards, mechanics, recipes, or progression advice.
- Prefer structured relationships over duplicated prose.
- Preserve source and provenance metadata.
- Exact-name relationships should migrate toward stable IDs where appropriate as the data model matures.
- Screenshots establish only what they visibly prove.
- A screenshot showing a stat field name does not prove a universal formula or a value outside the captured context.
- Old information may remain as historical patch context but must not silently override current data.
- When data conflicts, preserve and document the conflict until it is resolved instead of choosing a convenient answer.
- User-facing copy should be useful and natural. Internal evidence rigor remains strong without becoming product branding.

## Applying Evidence

Record the narrowest claim supported by the source. Keep ambiguous wording, incomplete captures, version boundaries, and conflicting reports in structured metadata or notes rather than converting them into unwarranted certainty. A polished interface must never imply facts the data does not contain.

Relationship arrays should link records where the connection is established. Do not manually duplicate the same fact across unrelated records when one structured relationship can power search, details, and future tools.

## Related Documentation

- [PortalDB Data Model](../data-model.md)
- [Provenance UX Standard](provenance-ux.md)
- [Character Menu Reference](../character-menu-reference.md)
- [Crafting Calculator Specification](../crafting-calculator-spec.md)

