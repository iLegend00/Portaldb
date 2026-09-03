# Equipment Research

**Research status:** Initial structured examples are integrated. The unresolved mechanics below remain research-only and must not be inferred by production features.

## Implementation Status

Thornprick, Briar Blade, and Thornguard Hood now use the structured equipment schema in `data/items.json` and the dedicated Equipment Profile renderer. Their community-source classification is preserved; they are not marked Official Confirmed. Primary, Secondary, and Fixed stats, permanent requirements, acquisition, recipes, and the documented roll-quality bands are represented without claims about modifier counts or roll independence.

Legacy migration is complete for the supported records present in the item dataset: Fortune Clover, Bone Bite, Tinker's Goggles, Plague Mask, Iron Hammer +3, and Axe. Exact observed stats remain exact fixed values; sparse tools may omit Stats entirely; acquisition, trade/status, and supported values remain preserved. Magnifying Glass remains a non-equipment Identify item despite its equipment-related tag.

## Current Architecture Direction

Equipment should support:

- tier;
- equipment type and weapon/armor subtype;
- slot, hand type, and armor weight;
- permanent stat requirements;
- Primary, Secondary, and Fixed stats;
- roll ranges, appearance chance, and roll quality;
- acquisition and crafting recipe;
- buy/sell values; and
- provenance.

Equipment should receive a specialized profile while existing non-equipment items remain compatible.

## Known Examples

The following are collected equipment references awaiting production-source reconciliation.

### Thornprick

- Tier 3 Dagger; Main Hand; one-handed.
- Permanent requirement: 35 DEX.
- Primary: Physical Damage +42 to +84.
- Secondary possibilities:
  - Max MP +45 to +90 — 40% appearance chance.
  - MP Regen +2 to +4 — 40%.
  - Crit Rate +8% to +16% — 20%.
  - Crit Damage +32 to +64 — 20%.
- Fixed: Attack Speed +0.18.
- Sell value: 156 Tria.
- Acquisition references: Blacksmith crafting through Eren; Lycaros Event, 0.45% per rolled prize.
- Collected recipe: Wood ×12; Briar Vine ×3; Enchanted Bark ×3; Living Bark ×3; Fossilized Amber ×1.

### Briar Blade

- Tier 3 Sword; Main Hand; one-handed.
- Permanent requirement: 35 STR.
- Primary: Physical Damage +61 to +122.
- Secondary possibilities:
  - Max MP +45 to +90 — 40% appearance chance.
  - MP Regen +2 to +4 — 40%.
  - Damage Bonus +10% to +20% — 20%.
- Fixed: Attack Speed +0.08.
- Sell value: 260 Tria.
- Acquisition references: Blacksmith crafting through Eren; Lycaros Event, 0.45% per rolled prize.
- Collected recipe: Wood ×24; Briar Vine ×6; Mystic Essence ×6; Living Bark ×6; Fossilized Amber ×2.

### Thornguard Hood

- Tier 3 Medium Armor; Head slot.
- Permanent requirement: 32 DEX.
- Primary: Max HP +100 to +200; Max MP +22 to +44.
- Secondary possibilities:
  - Physical Defense +20 to +40 — 30% appearance chance.
  - Magic Defense +10 to +20 — 30%.
  - HP Regen +2 to +4 — 40%.
  - MP Regen +1 to +2 — 40%.
- Fixed: Move Speed −0.6; Armor Weight Medium.
- Sell value: 156 Tria.
- Acquisition references: Blacksmith crafting through Eren; Lycaros Event, 0.45% per rolled prize.
- Collected recipe: Wood ×24; Enchanted Bark ×6; Enchanted Wood ×6; Ancient Heartwood ×6; Fossilized Amber ×1.

## Roll Quality

Collected roll-quality bands:

| Quality | Position within variable range |
| --- | --- |
| Common | 0–20% |
| Uncommon | 20–40% |
| Rare | 40–60% |
| Epic | 60–80% |
| Legendary | 80–100% |

Roll Quality reflects where a variable stat lands within its allowed range. It does **not** currently establish how many modifiers an item receives, and rarity must not be described as changing modifier count without further evidence.

## Current Build-Planning Preference

This is a personal gearing preference for the current Warrior plan, not universal meta advice:

- Dagger: prioritize Crit Damage, then Physical Attack.
- Sword: prioritize Physical Attack, then Damage Up.

## Unresolved

- Maximum simultaneous Secondary modifiers.
- Whether Secondary appearance checks are fully independent.
- Interaction between rarity and multiple rolls.
- Refinement `Stat Bonus` semantics.
- The modifier pool used by +5 and +10 bonus slots.

