# PortalDB

An unofficial community companion and database for **The Portal** on Roblox.

## Current status

PortalDB is now in an early **preview-ready verified-data build** rather than a placeholder-only prototype.

The approved visual direction is an original anime-fantasy field-guide aesthetic using purple, warm gold, magical glow, layered scenic backgrounds, and premium game-companion UI.

The current build includes:

- responsive homepage
- unified navigation between the homepage, Crafting Calculator, and Build Planner
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
- Build Planner v1 shell with job selection, six verified base-stat categories, known stat-effect relationships, equipment slots, one-title rule, skill slots, and non-fabricated planning snapshots
- GitHub Pages deployment workflow
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

The Build Planner also follows the same rule: PortalDB currently knows which base attributes affect which combat-stat categories, but it does not calculate unverified numerical conversion formulas or derived combat totals.

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

Standalone tools:

- `http://localhost:8000/crafting.html`
- `http://localhost:8000/build-planner.html`

## Deployment

The repository now contains `.github/workflows/pages.yml` and `.nojekyll` for static GitHub Pages deployment from `main`.

GitHub Pages source is configured for **GitHub Actions**.

Expected project-site address after a successful deployment:

`https://ilegend00.github.io/Portaldb/`

The site remains compatible with the project's $0/month target.

## Current roadmap

1. Fill the remaining Chapter 2 quest gaps when the missing in-game screenshots are available.
2. Capture exact crafting recipes/material requirements and populate `data/crafting.json` only from verified evidence.
3. Expand Build Planner data with verified titles, equipment coverage, skill data, and numerical stat formulas only when captured.
4. Continue expanding enemy, boss, location, item, and NPC relationships.
5. Replace the hero placeholder with original anime artwork based on the site owner's Roblox avatar.
6. Continue UI polish based on real preview testing.

## Cost target

**$0/month until real usage justifies spending money.**

## Disclaimer

PortalDB is an unofficial fan/community resource and is not affiliated with Roblox Corporation or the developers of The Portal.
