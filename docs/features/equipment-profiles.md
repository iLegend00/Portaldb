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

## Compact Inspection Layout

Equipment Profiles prioritize glanceability and dense RPG inspection-panel readability. Stat values remain visually adjacent to their labels instead of stretching across the dialog, while restrained dividers and proximity replace oversized cards. Roll Quality uses conventional rarity-name colors—gray, green, blue, purple, and warm orange—as semantic accents; the visible rarity names ensure meaning never depends on color alone.

The equipment header is the identity and summary layer: tier, subtype, slot, hand type, concise requirement, and sell value stay close to the item name. Requirement permanence remains structured metadata and is not repeated as explanatory header copy. An optional `artwork`, `image`, or `icon` field may add approved item identification art beside that identity; when absent, no placeholder or empty artwork space is rendered.

Equipment uses one consolidated Stats region. Guaranteed equipment attributes are presented together without exposing the internal Primary versus Fixed taxonomy; the structured data retains that distinction. Guaranteed Stats and Possible Modifiers both use the labels Stat / Value / Range, with Chance added only for possible modifiers. Both semantic tables share the same bounded three-column geometry, leaving the third column visually empty for guaranteed rows so stat names and values begin at identical horizontal positions. Roll Quality sits directly beneath the variable stats it explains. Acquisition and recipe relationships favor direct navigation to exact PortalDB records.

Do not add redundant stat-entry tools when the visible profile already answers the question. Crafting Calculator integration should be added only when the calculator has a published matching recipe and a supported preset or deep-link contract; otherwise the profile must not display a nonfunctional action.

