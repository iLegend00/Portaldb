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

## Provenance Granularity

PortalDB uses the minimum amount of visible provenance necessary to communicate source context clearly. A marker is not a badge of quality and must not be attached to every factual detail. The default is no visible provenance marker. Add one only when knowing the source classification materially helps the user understand or trust the information.

### Largest Logical Scope

One marker covers the largest logical unit whose contents share the same provenance. That unit may be an entire page, walkthrough chapter, quest, database record, mechanic section, table, or grouped dataset. Subordinate content inherits the parent marker visually unless a subsection has materially different provenance.

When neighboring facts share provenance, promote the marker to the nearest meaningful shared heading instead of repeating it on child elements. For example, a quest-level marker covers its objectives, rewards, NPCs, and locations.

If an entire page or major feature has one consistent provenance source, a single page-level or introductory marker may be sufficient. Do not add narrower markers merely because the system supports them.

### Mixed Provenance

Multiple markers are appropriate only when logical sections have materially different provenance and that distinction helps the reader. For example, community-tested boss behavior and official patch changes may each have their own marker.

### Routine Content

Do not add markers to every walkthrough objective, quest task, reward, stat row, table cell, NPC name, location name, list item, navigation element, button label, child heading, or repeated fact already covered by a nearby marker.

Avoid repeated visible phrases such as **Verified**, **Community Verified**, **Official Confirmed**, **Confirmed**, **Verified information**, and **Verified data** in normal page copy. The selective symbol and optional source-details popover are sufficient.

### Decision Test

Before adding or retaining a marker, ask:

1. Does the user benefit from knowing the source classification here?
2. Is this information already covered by a parent marker?
3. Could one marker at a higher logical level cover these facts?
4. Does this section have different provenance from surrounding content?

If the answer to the first question is no, remove the marker. If the second or third answer is yes, remove the redundant child marker. Keep a separate marker only when the fourth answer is yes and the distinction is useful.

When in doubt, use fewer markers. PortalDB should feel like a game companion first and a provenance system second.

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
