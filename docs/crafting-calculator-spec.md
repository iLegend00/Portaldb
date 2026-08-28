# PortalDB Crafting Calculator — v1 Specification

## Goal

Build the calculator from the same source-backed database used by the rest of PortalDB. The calculator must never infer recipe ingredients, quantities, costs, unlock requirements, or crafting stations.

## Current source-backed state

Community evidence establishes that Eren provides a **Craft Equipment** service at Iron and Ember, with visible **Weapons** and **Armor** craft categories. Exact recipe rows and material requirements have not yet been captured.

Therefore the calculator UI can be built around this schema, but only complete, source-backed recipes may be published.

## Recipe record

```json
{
  "id": "example-recipe-id",
  "name": "Example Item",
  "outputItem": "Example Item",
  "outputQuantity": 1,
  "category": "Weapon",
  "station": "Eren",
  "location": "Iron and Ember",
  "requirements": [
    {"item": "Material Name", "quantity": 1}
  ],
  "currencyCosts": [
    {"currency": "Tria", "amount": 0}
  ],
  "unlockRequirements": [],
  "notes": "",
  "confidence": "Community verified",
  "version": "",
  "lastVerified": "2026-08-18",
  "source": ""
}
```

## Calculator behavior

1. Player chooses a verified craftable output.
2. Player enters desired output quantity.
3. PortalDB multiplies direct ingredient quantities and currency costs.
4. If an ingredient is itself a verified craftable item, the player may expand it into nested requirements.
5. Nested expansion must detect circular recipe references and stop safely.
6. The calculator must distinguish **direct requirements** from **total expanded requirements**.
7. Incomplete recipe records remain unpublished rather than assumed.
8. Every result retains recipe verification metadata.

## Relationship rules

- `outputItem` should resolve to `data/items.json` when that item exists.
- ingredient `item` names should resolve to `data/items.json` when available.
- `station` should resolve to an NPC/service entry when available.
- `location` should resolve to `data/locations.json` when available.
- item acquisition sources remain owned by the item record; the calculator should link to Item Finder instead of duplicating drop/shop/gather data.

## UI plan

The first interface should contain:

- searchable recipe selector
- output quantity control
- direct material list
- total material list
- currency-cost summary
- expandable nested components
- links to Item Finder for every known ingredient
- one subtle record-level provenance marker for the selected recipe, following the [Provenance UX Standard](standards/provenance-ux.md)
- a natural empty state when no recipes are published

## Publishing rule

Do not populate `data/crafting.json` with guessed, partial, or placeholder recipes. The Crafting Calculator may launch with a concise empty state stating that no recipes are currently published.
