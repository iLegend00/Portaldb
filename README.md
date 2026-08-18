# PortalDB

An unofficial community companion and database for **The Portal** on Roblox.

## Current status

PortalDB is now in an early **verified-data build** rather than a placeholder-only prototype.

The approved visual direction is an original anime-fantasy field-guide aesthetic using purple, warm gold, magical glow, layered scenic backgrounds, and premium game-companion UI.

The current build includes:

- responsive homepage
- universal search across multiple structured datasets
- category browsing
- JSON-driven verified content
- confidence / verification metadata
- real item, NPC, quest, boss, race, job, location, code, mechanic, skill, enemy, and update records
- Item Finder v1
- richer NPC profile rendering and item/NPC relationships
- Main Quest Guide v1 with chapter/part progression, objectives, rewards, location flow, and explicit verification gaps
- enemy / boss / location relationship coverage
- Crafting Calculator v1 shell with quantity scaling, direct requirements, expandable nested requirements, currency-cost support, circular-reference protection, and a verified-empty state until recipe screenshots are captured
- no backend requirement

## Data policy

PortalDB does not treat guesses as facts.

Factual records should include, whenever possible:

- source / evidence
- verification confidence
- game version or date context
- last verified date
- explicit unknown fields rather than inferred values

Current evidence may come from official Discord posts, official game information, or direct in-game verification supplied by the project owner.

The Crafting Calculator follows the same policy: `data/crafting.json` intentionally remains empty until exact recipes, material quantities, costs, and requirements are verified.

## Architecture

The current build intentionally uses:

- HTML
- CSS
- vanilla JavaScript
- JSON data files

This keeps the site compatible with free static hosting while the project is small.

## Run locally

From the project directory:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

The standalone Crafting Calculator shell is available at:

`http://localhost:8000/crafting.html`

## Current roadmap

1. Fill the remaining Chapter 2 quest gaps when the missing in-game screenshots are available.
2. Capture exact crafting recipes/material requirements and populate `data/crafting.json` only from verified evidence.
3. Continue expanding enemy, boss, location, item, and NPC relationships.
4. Integrate the Crafting Calculator more deeply into the main navigation once verified recipes exist.
5. Add build planner once enough class/stat/equipment data is verified.
6. Replace the hero placeholder with original anime artwork based on the site owner's Roblox avatar.
7. Deploy through a free static host when the data/UI milestone is ready.

## Cost target

**$0/month until real usage justifies spending money.**

## Disclaimer

PortalDB is an unofficial fan/community resource and is not affiliated with Roblox Corporation or the developers of The Portal.
