# PortalDB Data Model

PortalDB stores gameplay facts as structured records with provenance so search, item pages, NPC pages, quest pages, and future tools can use the same source of truth.

## Verification metadata
Every record should include `confidence`, `source`, `lastVerified`, and `version`/`gameVersion` when applicable. Use `dataStatus` for incomplete records and `notes` for ambiguity. Preferred confidence labels: Official confirmed; Official confirmed + in-game verified; In-game verified; Community verified; Unverified.

## Items
Core fields: `id`, `name`, `category`, `subtype[]`, `status`, `description`, `stats{}`, `effects{}`, `requirements{}`, `buyTria`, `sellTria`, `obtain[]`, relationship arrays, and verification metadata. Obtain methods may include drop, shop, gather, fishing, crafting, quest, pass, or code. Never infer missing drop rates or rarity.

## NPCs
Core fields: `id`, `name`, `profession`, `location`, `shopName`, `serviceLocation`, `openHours`, `restockIntervalMinutes`, `dialogueOptions[]`, `shopCategories[]`, `services[]`, `partTimeJob`, `dialogueFacts{}`, relationship arrays, and verification metadata. Keep schedules as displayed strings until time semantics are fully mapped because some cross midnight.

## Quests
Chapter records contain ordered `parts[]`. Chapter fields: `id`, `name`, `type`, `chapter`, starting/ending locations, `partCount`, `locationFlow[]`, related NPCs/enemies, future chapters shown, and verification metadata. Part fields: `part`, `id`, `name`, `description`, `locations[]`, `objectives[]`, `rewards[]`, related NPCs/enemies, and `dataStatus`. Missing screenshots remain explicitly partial.

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

## Codes
Core fields: `code`, `rewards[]`, `postedDate`, `postedTimeLocal`, `status`, `lastVerifiedWorking`, `lastChecked`, `confidence`, and `source`. Do not call a code Active unless recently tested or officially described as active. Preferred wording for stale firsthand evidence: `Previously verified working; current status unknown`.

## Patch notes
Core fields: `id`, `name`, `type`, `date`, `version`, `postedTimeLocal`, `description`, `highlights[]`, structured `changes`/`rules` when useful, `notes`, `confidence`, and `source`. Preserve superseded rules in history rather than overwriting them.

## Character stat schema
The supplied character screenshots establish field names, not universal values. Confirmed fields: Max HP, Max MP, HP/s, MP/s, DEF, MDEF, P.ATK, M.ATK, Crit Rate, Crit Dmg, Dmg Up, Ign DEF, Atk Spd, Cast Spd, Move Spd, Block, Race, Element ATK, Element DEF, Small (%), Medium (%), Large (%), Undead (%), Formless (%), Plant (%), Brute (%).

Base attributes shown by the game: STR → P.ATK; VIT → Max HP, DEF, HP/s; AGI → Move Spd, Atk Spd, Crit Rate; DEX → Crit Rate/Dmg, Cast Spd; INT → Max MP, M.ATK, MP/s; WIS → MDEF, M.ATK, MP/s.

## Relationship rule
Use exact names initially, then migrate to stable IDs as datasets mature. Features should be generated from relationships in data rather than manually duplicated prose.
