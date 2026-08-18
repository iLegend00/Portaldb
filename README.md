# PortalDB

An unofficial community companion and database for **The Portal** on Roblox.

## Current status

PortalDB is currently in early prototype development. The approved visual direction is an original anime-fantasy field-guide aesthetic using purple, warm gold, magical glow, layered scenic backgrounds, and premium game-companion UI.

The current prototype includes:

- responsive homepage
- universal search foundation
- category browsing
- JSON-driven content
- confidence / verification metadata
- item, quest, NPC, and boss placeholder records
- no backend requirement

## Important data policy

All records currently stored in `/data` are clearly marked demo placeholders.

No placeholder should be treated as factual information about The Portal. Real entries will be added only after source-backed research and verification.

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

## Roadmap

1. Replace placeholder content with sourced Portal data.
2. Add source metadata and last-verified dates to every factual entry.
3. Build dedicated database pages.
4. Build Item Finder as the first production tool.
5. Add crafting calculator and build planner later.
6. Replace the hero placeholder with original anime artwork based on the site owner's Roblox avatar.
7. Deploy through a free static host.

## Cost target

**$0/month until real usage justifies spending money.**

## Disclaimer

PortalDB is an unofficial fan/community resource and is not affiliated with Roblox Corporation or the developers of The Portal.
