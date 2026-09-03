# Equipment Profile Architecture

Structured equipment records use a dedicated profile while legacy and non-equipment items continue through the generic item detail path.

## Recognition and Rendering

An item is treated as structured equipment only when `category` is `Equipment` and a `rolls` object is present. `renderEquipmentDetail(entry)` owns the equipment hierarchy: overview, permanent requirements, guaranteed Primary and Fixed stats, possible Secondary rolls, roll quality, acquisition, and crafting recipe.

## Equipment Fields

Alongside normal item fields, equipment may define `tier`, `equipmentType`, `weaponType`, `armorWeight`, `slot`, `handType`, permanent `requirements[]`, `rolls`, `acquisition[]`, and `recipe[]`.

`rolls.primary` and `rolls.secondary` contain variable `min`/`max` ranges. Secondary rows may include `appearanceChancePercent`. `rolls.fixed` contains exact `value` entries. A nullable `unit` distinguishes plain values from percentages without embedding formatting into the data.

PortalDB does not infer the maximum number of simultaneous Secondary modifiers, independence between appearance checks, or any relationship between rarity and modifier count.

## Relationships and Search

Acquisition sources and recipe materials link to existing records only on exact-name matches; unresolved names remain readable plain text. Global search and Item Finder indexing include tier, equipment classification, slot, requirements, roll stat names, and acquisition terms.

## Compatibility

The schema is additive. Existing equipment without `rolls`, all other item categories, Item Finder cards, NPC profiles, and shared record profiles keep their established renderers.

## Responsive Behavior

The desktop profile uses paired groups where space permits. At narrow widths, guaranteed stats, acquisitions, recipes, and individual stat rows collapse into a single readable column without horizontal scrolling.
