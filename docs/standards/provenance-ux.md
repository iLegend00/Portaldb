# PortalDB — Provenance UX Standard

**Status:** Active  
**Scope:** Entire site  
**Last Updated:** 2026-08-28

## Purpose

PortalDB is not branded around verification. It should primarily feel like a game companion, walkthrough, guide system, database, tools collection, and source of useful game information. Provenance is supporting infrastructure that users may inspect when they want source context; it is not the site's identity.

Internal provenance data must remain detailed. Preserve fields such as `confidence`, `source`, `lastVerified`, `version`, `gameVersion`, `provenance`, `provenanceGroups`, `dataStatus`, `sourceReference`, and `notes`. Do not weaken or remove source tracking to simplify the visible interface.

## Mandatory Rules

1. The homepage may contain one small provenance explanation.
2. The site-wide provenance legend is displayed directly in the footer and remains visually secondary to PortalDB branding.
3. Normal content pages must not repeatedly advertise wording such as “Verified,” “In-game verified,” “Official confirmed,” “Community verified,” “Verified data,” “Verified record,” or “Verified information.”
4. Raw confidence labels ordinarily belong only inside provenance popovers or the legend, not in normal page copy.
5. Small provenance symbols may be used when their source context helps the reader.
6. One symbol should represent the largest logical factual unit that shares the same provenance.
7. Database records generally need at most one marker near the primary heading.
8. Normal browsing must not require users to think about provenance unless they choose to inspect it.

## Allowed Exceptions

- The homepage's single concise source-symbol explanation.
- The compact, always-visible site-wide footer provenance legend.
- Popovers opened by an explicit hover, focus, or tap interaction.
- A second marker for a materially different source attached to a distinct factual subsection, when that distinction is useful to the reader.
- Necessary factual context where the source classification itself is the subject being discussed.

## Marker Placement

Place a marker beside the primary heading of the logical record it covers: an item, NPC, quest part, boss, skill, mechanic, recipe, or guide chapter. The marker covers subordinate facts that share that provenance, including objectives, rewards, locations, stats, or ordinary description text.

Good:

```text
FIRST STEPS [symbol]
```

The marker represents the quest-part record.

Bad:

```text
FIRST STEPS [symbol]
Objective 1 [symbol]
Objective 2 [symbol]
Reward [symbol]
Location [symbol]
NPC [symbol]
```

Do not repeat an item-card marker in the item's expanded detail unless the detail introduces materially different provenance.

## Mixed-Provenance Cases

Multiple markers are appropriate only when separate subsections have materially different provenance and exposing the distinction helps users interpret the information. A technical difference between metadata objects alone is not enough. For example, a firsthand shop inventory and an official-patch service rule may justify separate subsection markers if both appear together and their sources materially differ.

## Unknown / Incomplete Information

Do not flood incomplete content with `?` symbols or `UNVERIFIED` badges. Express the useful state naturally where needed:

- Unknown
- Not documented yet
- Guide in progress
- Drop rate unknown
- Current status unknown

An incomplete field does not automatically need a visible provenance marker.

## Interaction Behavior

- **Desktop pointer:** hovering a marker reveals its provenance details.
- **Keyboard:** focusing a marker reveals its provenance details; the control remains operable with Enter or Space and dismissible with Escape.
- **Mobile/touch:** tapping a marker reveals its provenance details; tapping again or outside dismisses it.
- Marker controls use a concise accessible label such as “Source details available.”
- A popover may show method/classification, source, verification date, game version, reference, and notes.
- The provenance legend is displayed directly in the footer; there is no separate Verification modal or control.

## Do Not

- Remove or flatten detailed internal evidence fields.
- Turn verification into marketing copy, a hero message, or repeated product positioning.
- Print raw confidence classifications throughout normal content.
- Add large verification banners, confidence chips, or permanent source panels.
- Place symbols beside every subordinate fact covered by one record.
- Add uncertainty markers automatically for every missing field.
- Duplicate or enlarge the footer legend into a primary action.

## Examples

| Avoid | Prefer |
| --- | --- |
| PortalDB is still being populated with verified data. | PortalDB is still being expanded. |
| No matching verified items yet. | No matching items found. |
| Verified NPC record | The NPC's actual role or service |
| Expanding with verified information | Guide in progress |
| Progression notes are still being verified. | More progression guidance is coming soon. |
| Derived stat formulas are not verified. | Exact derived-stat formulas are not documented. |

## Related Files

- [`verification.js`](../../verification.js)
- [`verification.css`](../../verification.css)
- [`app-core.js`](../../app-core.js)
- [`quest-ui.js`](../../quest-ui.js)
- [`walkthrough.js`](../../walkthrough.js)
- [`data-model.md`](../data-model.md)
- [`data-integrity.md`](data-integrity.md)

## Design Decisions

### 2026-08-24 — Provenance is supporting UX, not branding

PortalDB maintains detailed evidence internally but does not advertise verification throughout normal content. The homepage explanation and direct footer provenance legend are approved exceptions. The legend is supporting UX rather than PortalDB branding, while record-level markers remain subtle, selective, and available on hover, focus, or tap.

### 2026-08-28 — Provenance legend moved into the footer

The four-state provenance legend is always visible in the site footer. The former Verification button and modal are retired; record-level markers continue to expose source details on hover, focus, or tap.
