# PortalDB — Provenance UX Standard

**Status:** Active  
**Scope:** Entire site  
**Last Updated:** 2026-08-28

## Purpose

PortalDB publishes factual content only when it is considered reliable enough to present as true. If a claim is not reliable enough, do not publish it yet. Provenance provides supporting source context for published information; it is not PortalDB branding.

Preserve detailed internal evidence fields such as `confidence`, `source`, `lastVerified`, `version`, `gameVersion`, `provenance`, `provenanceGroups`, `dataStatus`, `sourceReference`, and `notes` when they support source history and data integrity.

## Visible Provenance States

PortalDB has exactly two visible provenance classifications.

### Official Confirmed — ✦

Use for official first-party evidence, including official The Portal patch notes, developer communication, official game announcements, and other clearly official sources.

### Community Verified — ✓

Use for reliable non-official evidence, including firsthand in-game observation, reproducible gameplay or player testing, screenshots, video evidence, and corroborated community evidence.

Legacy values containing `in-game`, `ingame`, `firsthand`, gameplay observation, player testing, reproducible testing, or community testing map to Community Verified. Useful legacy source text remains stored internally.

## No Uncertainty State

There is no Unverified classification, no Unknown provenance classification, no question-mark marker, no pending state, and no uncertainty fallback. Missing or unrecognized provenance produces no marker.

Do not use uncertainty placeholders as a substitute for reliable information. Do not create empty factual fields simply to display a missing value. Omit unsupported claims and unavailable factual sections until reliable information is ready.

## Selective Marker Placement

- Most content does not need a provenance marker.
- Use a marker only where source context materially helps the reader.
- One marker covers the largest logical factual unit sharing the same provenance.
- Database records generally need at most one marker near their primary heading.
- Multiple markers are appropriate only for materially different sources attached to distinct factual sections.
- Do not repeat markers beside every sentence, stat, card, field, or row.

## Interaction Behavior

- **Desktop pointer:** hovering a marker reveals available source details.
- **Keyboard:** focusing a marker reveals details; Enter or Space opens it and Escape dismisses it.
- **Mobile/touch:** tapping a marker reveals details; tapping again or outside dismisses it.
- Popovers may show source, method, date, game version, reference, and notes.
- Popover classification headings may only be **Official confirmed** or **Community verified**.

## Footer Legend

The compact site-wide legend is displayed directly in the footer:

- ✦ Official confirmed
- ✓ Community verified

There is no separate Verification button, modal, or control. The legend remains visually secondary to PortalDB branding.

## Publishing Rules

- Record the narrowest factual claim supported by the evidence.
- Do not infer missing routes, values, formulas, rewards, requirements, or recommendations.
- Preserve source history and conflicts internally without turning them into visible fallback content.
- Do not silently upgrade empty or unrecognized provenance to Community Verified.
- Do not publish research leads as factual records.

## Related Files

- `verification.js` — state mapping, markers, popovers, and interaction behavior
- `verification.css` — marker and footer-legend presentation
- `docs/standards/data-integrity.md` — evidence and publication rules
- `docs/data-model.md` — stored provenance fields and legacy mappings
- `SOURCES.md` — source inventory and evidence history

## Design Decision

### 2026-08-28 — Two-state provenance model

PortalDB standardized visible provenance on Official Confirmed and Community Verified. The former In-game Verified state maps to Community Verified because both describe reliable non-official evidence. The former uncertainty/unverified display state was removed: unsupported claims stay unpublished, while empty or unrecognized provenance renders no marker.
