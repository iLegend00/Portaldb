# PortalDB — Homepage Information Architecture

**Status:** Active  
**Scope:** `index.html` and homepage-specific styling  
**Last Updated:** 2026-08-25

## Purpose

The homepage quick-access deck prioritizes common MMORPG player goals rather than mirroring raw database collections. Database records remain searchable even when they do not have a dedicated homepage card.

## Approved Page Flow

1. Hero
2. Category card deck
3. Begin Your Adventure walkthrough CTA
4. Information board
5. About PortalDB
6. Footer

The Complete Walkthrough is the primary progression and quest experience. Its CTA sits before secondary update, popular-page, NPC, and code information.

## Approved Quick-Access Categories

| Order | Category | Current destination |
| --- | --- | --- |
| 1 | Builds | `build-planner.html` |
| 2 | Crafting | `crafting.html` |
| 3 | Gear | `item-finder.html` |
| 4 | Farming | `item-finder.html` |
| 5 | Bosses | `database.html` |
| 6 | World | `database.html` |
| 7 | Jobs & Races | `database.html` |

Gear uses the existing item-search experience until a dedicated equipment surface exists. Farming uses Item Finder until a dedicated resource-acquisition feature exists. Bosses, World, and Jobs & Races use the connected Database until more focused destinations are implemented. Do not invent unsupported query parameters to simulate those future pages.

Items, Quests, NPCs, and Locations remain first-class searchable and structured data. They are not required to remain standalone homepage cards: Gear represents player equipment intent, the Complete Walkthrough owns progression, and World encompasses locations and NPC services.

## Modular Card Architecture

- Keep each category as live HTML and CSS with a real link, title, description, and CTA.
- Keep each category image as a separate asset under `assets/home/categories/`.
- Keep the shared deck frame as a separate decorative asset under `assets/home/ui/`.
- Never merge the seven cards into a monolithic card-set image.
- Never bake category copy or links into raster artwork.
- Per-card art must remain replaceable without restructuring the deck.

## Temporary Artwork Mapping

Until dedicated art is approved:

- Builds uses `builds.webp`.
- Crafting uses `crafting.webp`.
- Gear uses `items.webp`.
- Farming temporarily reuses `items.webp`.
- Bosses uses `bosses.webp`.
- World uses `locations.webp`.
- Jobs & Races temporarily reuses `npcs.webp`.

Temporary reuse does not rename or overwrite any source or production artwork. Follow the [Artwork Pipeline Standard](../standards/artwork-pipeline.md) when replacements are supplied.

## Interaction and Spacing

The deck cards remain independent click targets. The walkthrough artwork is non-interactive; only its overlay button links to `walkthrough.html`. Section spacing must be tuned using visible artwork bounds because the deck and information-board art include decorative overflow. Desktop should retain a small, deliberate perceived gap between major surfaces. Tablet and mobile keep the same information order with simplified responsive board rendering.

## Design Decision

### 2026-08-25 — Quick access follows player intent

The homepage deck moved from raw categories such as Items, Quests, NPCs, and Locations to Builds, Crafting, Gear, Farming, Bosses, World, and Jobs & Races. The database continues to preserve and expose all underlying record types.

