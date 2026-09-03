# PortalDB Data Model

PortalDB stores gameplay facts as structured records with provenance so search, item pages, NPC pages, quest pages, and future tools can use the same source of truth.

## Verification metadata
Every published record should include `confidence`, `source`, `lastVerified`, and `version`/`gameVersion` when applicable. Use `dataStatus` and `notes` internally to preserve evidence scope, ambiguity, and source history. The visible classifications are Official Confirmed and Community Verified. Legacy in-game, firsthand, and testing classifications map to Community Verified; empty or unrecognized provenance renders no marker.

## Provenance UX
Detailed provenance remains part of the internal data model, while normal pages present PortalDB as a game companion rather than advertise verification status. Marker placement, interaction behavior, approved exceptions, and user-facing wording are defined by the [Provenance UX Standard](standards/provenance-ux.md). Evidence handling and conflict rules are defined by the [Data Integrity Standard](standards/data-integrity.md).

## Items
Core fields: `id`, `name`, `category`, `subtype[]`, `status`, `description`, `stats{}`, `effects{}`, `requirements{}`, `buyTria`, `sellTria`, `obtain[]`, relationship arrays, and verification metadata. Obtain methods may include drop, shop, gather, fishing, crafting, quest, pass, or code. Never infer missing drop rates or rarity.

Structured equipment uses the explicit `equipmentType` classification plus supported optional fields such as `tier`, `weaponType` or `armorWeight`, `slot`, `handType`, `requirements[]`, `rolls.primary[]`, `rolls.secondary[]`, `rolls.fixed[]`, `acquisition[]`, and `recipe[]`. Variable rolls store `min`, `max`, and nullable `unit`; Secondary rolls may store `appearanceChancePercent`. Exact guaranteed stats store `value` and nullable `unit` in `rolls.fixed` rather than fake equal minimum/maximum ranges. Sparse equippable records may omit `rolls` entirely. Requirement permanence is stored only when evidence supports it. The model does not imply a modifier-count cap, independent appearance checks, or rarity-driven modifier counts. See [Equipment Profile Architecture](features/equipment-profiles.md).

## NPCs
Core fields: `id`, `name`, `profession`, `location`, `shopName`, `serviceLocation`, `openHours`, `restockIntervalMinutes`, `dialogueOptions[]`, `shopCategories[]`, `services[]`, `partTimeJob`, `dialogueFacts{}`, relationship arrays, and verification metadata. Keep schedules as displayed strings until time semantics are fully mapped because some cross midnight.

## Quests
Chapter records contain ordered `parts[]`. Chapter fields: `id`, `name`, `type`, `chapter`, starting/ending locations, `partCount`, `locationFlow[]`, related NPCs/enemies, and verification metadata. Part fields: `part`, `id`, `name`, `description`, `locations[]`, `objectives[]`, `rewards[]`, related NPCs/enemies, and `dataStatus`. Unsupported quest parts remain unpublished while evidence-scope metadata stays internal.

## Skills
Core fields: `id`, `name`, `job`, `element`, `skillType`, `target`, `range`, `mpCost`, `cooldown`, `damageScaling`, `statusEffects[]`, `charges`, `requirements{}`, `sourceItem`, `patchHistory[]`, and verification metadata. Skill Books should eventually link to skill records instead of duplicating skill logic.

## Titles
Core fields: `id`, `name`, `statBonuses{}`, `obtain`, and verification metadata. Only one title can be equipped at a time as of v1.1.12.

## Enemies and bosses
Core fields: `id`, `name`, `enemyType`, `level`, `size`, `raceType`, `element`, `hp`, `locations[]`, `drops[]`, `spawnRules`, related quests, and verification metadata. Store drop rates only when shown in-game or explicitly published.

## Locations
Core fields: `id`, `name`, `locationType`, `parentLocation`, `description`, `npcs[]`, `enemies[]`, `shops[]`, `questParts[]`, `gathering[]`, and verification metadata. Known names may be recorded before full pages are complete, but relationships must not be guessed.

## Shops
Shop metadata can remain embedded in NPC records initially. If inventories become large, normalize to `shops.json` with `id`, `name`, `npcId`, hours, restock interval, categories, and inventory.

## Farming / Homestead (proposed)

Farming remains in research and has no production datasets yet. When the implementation gates in [Farming / Homestead Research](research/farming.md) are met, prefer three modular datasets instead of one catch-all file:

- `crops.json`: identity plus supported seasons, growth time, seed sources, harvest outputs, sell value, Greenhouse compatibility, uses, established mutation rules, relationships, and provenance.
- `buildables.json`: identity, category/subtype, supported function, recipe, sell value, placement classification, functional/decorative classification, measured footprint, build-limit cost, maximum-per-plot rules, prerequisites, relationships, and provenance.
- `farming-mechanics.json`: separate records for plot limits, season rules, irrigation, Greenhouse behavior, build capacity, crop placement, and livestock behavior.

Fields are optional unless evidence establishes them. Approximate spatial measurements must carry an explicit approximate flag, measurement unit/method, and evidence context; they must not masquerade as exact placement mechanics. Source conflicts and unresolved questions remain in research notes rather than production JSON.

## Codes
Core fields: `code`, `rewards[]`, `postedDate`, `postedTimeLocal`, `status`, `lastVerifiedWorking`, `lastChecked`, `confidence`, and `source`. Do not call a code Active unless recently tested or officially described as active. Historical redemption evidence may be published as history without adding a speculative current-status field.

## Patch notes
Core fields: `id`, `name`, `type`, `date`, `version`, `postedTimeLocal`, `description`, `highlights[]`, structured `changes`/`rules` when useful, `notes`, `confidence`, and `source`. Preserve superseded rules in history rather than overwriting them.

## Character stat schema
The supplied character screenshots establish field names, not universal values. Confirmed fields: Max HP, Max MP, HP/s, MP/s, DEF, MDEF, P.ATK, M.ATK, Crit Rate, Crit Dmg, Dmg Up, Ign DEF, Atk Spd, Cast Spd, Move Spd, Block, Race, Element ATK, Element DEF, Small (%), Medium (%), Large (%), Undead (%), Formless (%), Plant (%), Brute (%).

Base attributes shown by the game: STR → P.ATK; VIT → Max HP, DEF, HP/s; AGI → Move Spd, Atk Spd, Crit Rate; DEX → Crit Rate/Dmg, Cast Spd; INT → Max MP, M.ATK, MP/s; WIS → MDEF, M.ATK, MP/s.

## Relationship rule
Use exact names initially, then migrate to stable IDs as datasets mature. Features should be generated from relationships in data rather than manually duplicated prose.

