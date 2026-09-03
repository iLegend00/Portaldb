# Farming / Homestead Research

**Research status:** Reconciled on 2026-09-03. Evidence remains a mix of official facts, developer-endorsed community reference material, player observations, approximate measurements, conflicts, and unresolved questions. These notes are not production data.

## Evidence Inventory and Priority

Repository-wide review covered `data/`, patch and update records, walkthrough quests, items, NPC shops, locations, mechanics, crafting data, tools/scripts, and project documentation.

Evidence is applied in this order:

1. official Discord, developer announcements, and patch records;
2. structured first-party or developer-endorsed references already documented by PortalDB;
3. reproducible in-game observations and screenshots;
4. maintained community wiki/reference material;
5. approximate player measurements and planning observations.

The community wiki has been observed being directly recommended to players by The Portal developers. PortalDB therefore records it as a **developer-endorsed community reference**. This does not mean developers own or maintain it, that every page is official, or that it outranks direct patch evidence.

### Repository sources discovered

- **Confirmed fact:** `data/patches.json`, record `2026-08-05-patch`, says the Greenhouse became craftable at the Workbench, plots support one by default, and the Season 1 Premium Pass grants one additional permanent Greenhouse slot. `data/mechanics.json`, record `greenhouse`, carries the same official summary.
- **Confirmed fact:** `data/patches.json`, `v1.0.4`, records unspecified Greenhouse bug fixes.
- **Confirmed fact:** `data/patches.json`, `v1.2.14`, establishes Crop Mutation VFX behavior only; it does not establish mutation mechanics.
- **Confirmed fact:** `data/patches.json`, `v1.2.15`, announces Sunflower Crop and `+20 Soil` for Battle Pass Season 2; it does not document the crop or soil systems generally.
- **Player-observed fact:** `data/quests.json`, Chapter 1 part 3, establishes the observed tutorial sequence of tilling soil, planting wheat seeds, watering, and harvesting wheat.
- **Player-observed fact:** `data/quests.json`, Chapter 2 parts 1–2, establishes placing an Animal Plot, placing and feeding a chicken, asking what grows in the current season, and checking the season marker near the minimap.
- **Player-observed fact:** `data/quests.json`, Chapter 1 part 5, records one Animal Plot as a quest reward.
- **Community-supported fact:** existing community-wiki research supplies the Greenhouse catalog description, recipe, sell value, category, default/title maximum claims, buildable categories, and approximate catalog size.
- **Player-observed fact:** `data/npcs.json` and `data/locations.json` establish Leaf as a seed/farm-tool merchant and Hogan as a livestock/feed/farm/tool merchant. They do not provide inventories or farming formulas.
- `data/crafting.json` is empty, and the repository contains no structured crop, buildable, irrigation, or legacy homestead dataset. No farming calculator or farming-specific production script exists.

## Greenhouse Reconciliation

### Safe facts and supported reference claims

- **Confirmed fact:** The Greenhouse became craftable at the Workbench in the official August 5, 2026 patch.
- **Confirmed fact:** The official patch states a default maximum of one Greenhouse per plot.
- **Confirmed fact:** The official patch states that the Season 1 Premium Pass grants one additional permanent Greenhouse slot.
- **Community-supported fact:** The developer-endorsed community reference classifies Greenhouse as a Common Structure decoration, stack 1, with a 250 Tria sell value.
- **Community-supported fact:** The reference describes it as a walk-in growhouse with irrigation and says soil inside can grow plants regardless of season.
- **Community-supported fact:** The collected community recipe names the Crafting Bench and lists Stone Tile 8×4×1 ×8, Wooden Door ×1, Pipe ×20, Glass Pane ×40, and Wood ×80.
- **Community-supported fact:** The reference reports a base maximum of one per plot and a maximum of two while wearing the Overclocked title.

### Source conflict

**Source conflict:** The developer-endorsed community reference attributes access to a second Greenhouse to the Overclocked title, while official patch record `2026-08-05-patch` attributes one additional permanent Greenhouse slot to the Season 1 Premium Pass. The official statement outranks the wiki for the Premium Pass claim, but the two claims may describe separate mechanics. Current evidence does not establish whether:

- Overclocked and Premium Pass bonuses stack;
- one system replaced the other;
- the community page is outdated;
- wearing the title is continuously required; or
- “permanent” persists by account, character, plot, or season.

Do not publish a single combined maximum until this conflict is resolved. A future Greenhouse profile may publish the official default count and Premium Pass statement while omitting the unresolved title/stacking behavior.

**Unresolved question:** The official patch says Workbench while the collected community recipe says Crafting Bench. Current evidence does not establish whether these are two names for the same station, a changed station, or a source wording mismatch.

## Build Limit

- **Player-observed fact:** A player observed placed objects and Soil Plots consuming build capacity individually in the tested context.
- **Community-supported fact:** A 500-item plot cap is reported as a working community figure, but current repository evidence does not establish it strongly enough to call it confirmed.
- **Planning preference:** For personal layout planning only, target roughly 425–450 placed objects and retain approximately 50–75 slots as a reserve. This is not a general game rule and depends on the unresolved 500 figure.

**Unresolved questions:**

- Is 500 the exact current cap?
- Does every placed object always cost exactly one slot?
- What are the Greenhouse and Animal Plot build-limit costs?
- Do planted crops consume separate slots?
- How do special, assembled, or composite structures count?
- Is capacity plot-wide or divided by category?
- Is there a reliable in-game current-count display? None has been established in the supplied observation.

## Plot Geometry

- **Approximate measurement:** The main plot appears to be roughly 36 × 36 main grid squares.
- **Approximate measurement:** Each main square appears visually divided into roughly 4 × 4 smaller planning subdivisions.
- **Approximate measurement:** A derived 144 × 144 small-subdivision planning grid follows only if both estimates are uniform. It is not an exact game mechanic.
- **Unresolved question:** The vertical build-height limit is unknown. Observed or conceptual multi-story placement does not establish a numeric cap.

Visible objects may protrude or fail to align perfectly with the grid, so planning dimensions must remain distinct from collision, snapping, and actual placement bounds.

## Approximate Structure Footprints

All dimensions below are **approximate measurements** for personal spatial planning, not production-ready mechanics.

| Structure | Visual/body footprint | Practical planning note |
| --- | --- | --- |
| Greenhouse | About 5.75 × 6.5 main grids; roughly 23 × 26 small subdivisions | Rear connection area may need about 0.5–1 main grid of utility clearance; side routing is observed as possible but not established as a universal rule. |
| Water Tank | About 1.75 × 1.75 main grids | Function and required connections remain unresolved. |
| Pump | About 0.75 × 0.75 main grids | Function and required connections remain unresolved. |
| Sprinkler | About 0.1 × 0.1 main-grid footprint when vertical | Coverage range and shape remain unresolved. |
| Pipe | About 0.1 × 0.1 cross-section and about 1 main grid long | Connection and vertical behavior remain unresolved. |
| Valve | Pipe-sized body plus handle | Control behavior remains unresolved. |
| Animal Plot | About 3.1 × 3.1 main grids | Capacity and placement rules remain unresolved. |
| Soil Plot | About 0.3 × 0.3 main grids | Crop and build-capacity behavior remains unresolved. |

The Greenhouse’s visual body and practical service footprint are deliberately recorded separately. Neither should be treated as authoritative collision geometry.

## Hydraulics and Irrigation

**Community-supported fact:** The developer-endorsed community catalog groups Pipe, Pipe Corner, Pipe T-Junction, Pump, Sprinkler, Valve, and Water Tank under Hydraulics, and describes the Greenhouse as including irrigation.

No current repository evidence establishes a complete functional dependency graph. The following remain **unresolved questions**:

- Does a Water Tank require or feed a Pump?
- Does a Pump require Pipes?
- Must a Sprinkler connect to a specific water source?
- What are the Sprinkler’s coverage range and shape?
- Does overlapping coverage change behavior?
- How many Sprinklers can one Pump or Water Tank support?
- Which Pipe faces or junctions count as connected?
- Can Pipes operate vertically, and under what placement rules?
- Is Greenhouse irrigation independent, bundled, or dependent on external Hydraulics?

Do not infer real-world pressure, flow, capacity, or connection behavior.

## Soil, Crops, and Seasons

### Supported facts

- **Player-observed fact:** The farming tutorial requires tilling soil, planting wheat seeds, watering crops, and harvesting Wheat in that order.
- **Player-observed fact:** The game exposes a season marker near the minimap, and an NPC dialogue objective asks what grows in the current season.
- **Community-supported fact:** The Greenhouse reference says soil inside can grow plants regardless of season.
- **Confirmed fact:** v1.2.14 changed only how Crop Mutation VFX responds to VFX settings and multiple active mutations.
- **Confirmed fact:** v1.2.15 announced Sunflower Crop and `+20 Soil` as Season 2 content.

### Missing or unresolved mechanics

Current evidence is too sparse for a production crop database. Crop season lists, growth times, seed sources, harvest quantities, replanting, watering cadence, mutation rules and multipliers, weather effects, fertilizer, crop quality, Greenhouse compatibility by crop, and crop build-limit behavior are unresolved. The existence of Crop Mutation VFX does not establish how mutations are obtained or calculated.

## Animal Plot

- **Player-observed fact:** Chapter 1 awards an Animal Plot; Chapter 2 requires placing it, buying a Chicken, placing the Chicken in it, and feeding the Chicken with a Hay Bundle.
- **Approximate measurement:** The observed footprint is about 3.1 × 3.1 main grids.

**Unresolved questions:** quantity limit, build-limit cost, animals per plot, complete animal types, feeding cadence, production/output, collection, upgrades, placement restrictions, and season/weather interactions. The quest establishes a minimal chicken-use sequence only; it does not establish the broader livestock system.

## Decoration and Buildable Catalog

**Community-supported fact:** The developer-endorsed community reference reportedly lists approximately 61 buildables across Structures, Furniture, Mechanical, Hydraulics, and Farm. Existing research names Hydraulics components, Mechanical components, Animal Plot, Greenhouse, and common construction pieces. PortalDB has not imported or independently reconciled the full catalog.

A future Buildable record should be able to carry only supported values from this shape:

- `id`, `name`, `category`, and optional `subtype`;
- concise `function` when established;
- `recipe[]` and `sellTria` when established;
- `placementType` and `functional` only when classification is supported;
- `footprint` with measurement unit, approximate flag, method, and evidence;
- `buildLimitCost` and `maximumPerPlot` only when verified;
- `prerequisites[]`, `relatedSystems[]`, and exact-name relationships;
- normal provenance fields; and
- research-only notes, conflicts, and unresolved questions outside production records.

Do not bulk-copy the catalog or create empty fields for unavailable values.

## Proposed Farming Data Architecture

Use modular datasets once implementation gates are met:

### `data/crops.json`

Expected supported fields: `id`, `name`, known `seasons[]`, `growthTime`, `seedSources[]`, `harvestOutputs[]`, `sellTria`, `greenhouseCompatibility`, known `uses[]`, optional established mutation behavior, relationships, and provenance. Every field is optional except stable identity; unavailable mechanics are omitted.

### `data/buildables.json`

Expected supported fields: the Buildable shape above, with recipes expressed as item relationships and approximate measurements explicitly distinguished from exact dimensions.

### `data/farming-mechanics.json`

Grouped records for plot limits, season rules, irrigation, Greenhouse behavior, build capacity, crop placement, and livestock rules. Use separate records where provenance or confidence differs; do not place unresolved research claims into production JSON.

This separation supports relationships without turning farming into one large catch-all record. No production datasets are created during this research phase.

## Proposed Player-Facing Architecture

A future **Farming Hub** should organize decisions rather than reproduce wiki articles:

- **Crops:** season, source, time, output, Greenhouse compatibility, and uses when supported.
- **Structures:** purpose, recipe, supported limit, measured footprint, connections, and dependent systems.
- **Irrigation:** verified component relationships and coverage only after the dependency model is established.
- **Plot Planning:** clearly distinguish exact mechanics from approximate spatial planning.
- **Mechanics:** season, soil, watering, build-capacity, Greenhouse, and livestock rules.

PortalDB should use the developer-endorsed community wiki as a strong factual reference while differentiating itself through structured presentation, system relationships, direct navigation, practical planning, filters/search, and tools only when they reduce real effort. It must not mirror wiki page structure or ask users to re-enter facts already visible.

## Current Farm Layout Planning

Everything in this section is a **Planning preference**, not general PortalDB guidance or factual game data:

- asymmetrical natural layout with wandering, offset loop paths;
- Greenhouse 1 in the upper-left with an orchard nearby;
- barn in the upper-right;
- large crop fields on the left;
- home lower-left of center;
- Greenhouse 2 in the lower-left;
- cosmetic crafting/utility area in the lower-right; and
- central open grass/tree negative space.

Barn concept: approximately 9 × 10 main-grid floor, one or two approximately 3.1 × 3.1 Animal Plots in the back half, and an open front/central aisle. Both Greenhouse 2 and the barn geometry depend on unresolved mechanics.

## Research Readiness Matrix

| Topic | Current confidence | Publishable? | Needs verification | Best evidence |
| --- | --- | --- | --- | --- |
| Plot dimensions | Approximate measurement | Planning context only | Exact horizontal bounds and measurement method | Player grid observation |
| Build cap | Community-supported fact | No exact claim yet | Current exact cap and scope | Community report of 500 |
| Object slot cost | Player-observed fact | Narrow observation only | Per-object exceptions and categories | In-game placement observation |
| Greenhouse function | Community-supported fact | Yes, attributed/narrow | Seasonal and irrigation behavior in game | Developer-endorsed community reference |
| Greenhouse max count | Source conflict | Official pieces only | Overclocked/Premium stacking and persistence | August 5 patch; community reference |
| Greenhouse recipe | Community-supported fact | After record-level reconciliation | Current recipe and quantities in game | Developer-endorsed community reference |
| Greenhouse footprint | Approximate measurement | Planning context only | Reproducible bounds/collision method | Player measurement |
| Animal Plot function | Player-observed fact | Minimal quest sequence only | Capacity, outputs, restrictions | Chapter 2 quest screenshots |
| Animal Plot footprint | Approximate measurement | Planning context only | Reproducible placement bounds | Player measurement |
| Soil Plot behavior | Player-observed fact | Tutorial sequence only | Placement, capacity, watering, reuse | Chapter 1 quest screenshots |
| Crop slot behavior | Unresolved question | No | Whether crops consume build capacity | No sufficient evidence |
| Season rules | Player-observed fact | Season UI existence only | Crop-by-season rules and transitions | Chapter 2 quest screenshots |
| Sprinkler coverage | Unresolved question | No | Range, shape, overlap | No sufficient evidence |
| Pump behavior | Unresolved question | No | Inputs, outputs, capacity, connections | Catalog presence only |
| Water Tank behavior | Unresolved question | No | Storage/source role and connections | Catalog presence only |
| Pipes/Valve behavior | Unresolved question | No | Connectivity, control, vertical routing | Catalog presence; approximate observation |
| Vertical build limit | Unresolved question | No | Exact vertical boundary | No sufficient evidence |

## Implementation Gates

### Farming Database

May begin only after a useful starter set of crop and buildable records has identity plus enough supported decision fields to avoid mostly empty profiles. Greenhouse can be an early record using official facts and reconciled community fields while omitting unresolved combined maximum behavior.

### Irrigation Guide

Do not implement until Water Tank, Pump, Pipe/Valve, Sprinkler, and Greenhouse dependencies are reproducibly verified. Component presence and approximate footprints are insufficient.

### Plot Planner

Do not implement exact-scale placement until plot dimensions, snapping units, representative structure footprints, collision/clearance behavior, and vertical constraints are sufficiently verified. An explicitly approximate sketching tool would still require clear measurement provenance and useful verified structure coverage.

### Build Limit Calculator

Do not implement until the exact cap, scope, per-object cost, crop behavior, and special/composite structure counting are verified. The 425–450 personal target is not a calculator rule.

### Crop Planner or Calculator

Do not implement until crop seasons, growth times, seed acquisition, harvest outputs, watering rules, and Greenhouse compatibility have sufficient structured coverage. Do not infer mechanics from other farming games.

### Recommended next research action

Run a controlled in-game verification session focused first on build-capacity accounting and Hydraulics dependencies, while capturing the current Greenhouse recipe/max UI and a small representative crop set. These findings unblock the highest-value architecture decisions without prematurely building production UI.

