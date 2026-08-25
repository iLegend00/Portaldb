# PortalDB — Artwork Pipeline Standard

**Status:** Active  
**Scope:** Canonical artwork and production web assets  
**Last Updated:** 2026-08-24

## Canonical and Production Assets

- `source-assets/` contains canonical source and master artwork.
- Source masters must not be overwritten unless a task explicitly requests replacing that exact master.
- Web-ready production derivatives live under `assets/`.
- WebP is preferred for web delivery where appropriate.
- Preserve transparency through conversion and deployment.
- Never flatten transparent artwork onto black or another unintended matte.
- Never substitute old generated alternatives, repair fragments, mockup crops, or unrelated artwork for an approved master.
- Keep canonical and production paths predictable so the production asset can be traced back to its master.
- Optimize production assets without introducing visible blur, corruption, destructive cropping, or excessive enlargement.
- Group future feature artwork into logical folders by feature.

The local [`source-assets/artwork/README.md`](../../source-assets/artwork/README.md) remains authoritative for files in that folder and must not be removed. This standard makes those handling rules discoverable from the main documentation system.

## Current PortalDB Examples

| Feature | Canonical source | Production derivative |
| --- | --- | --- |
| Homepage hero | `source-assets/artwork/home/hero/portaldb-home-hero.png` | `assets/home/portaldb-hero.webp` |
| Homepage category art | `source-assets/artwork/home/category-cards/` | `assets/home/categories/` |
| NPC portraits | `source-assets/npc-masters/` | `assets/npcs/` |
| Walkthrough artwork | `source-assets/artwork/walkthrough/` | `assets/walkthrough/` |

## Conversion and Validation

1. Identify the exact approved master before changing a production asset.
2. Inspect its dimensions, alpha channel, and visual contents.
3. Generate the derivative directly from that master.
4. Preserve intrinsic aspect ratio unless the feature specification explicitly requires a different crop.
5. Confirm the output signature, dimensions, file size, transparency, and successful decode.
6. Inspect the asset in its real UI context at desktop and mobile sizes.
7. Update cache busting only when needed to ensure the new production file is served.

Long responsive content must remain live HTML and CSS. Decorative artwork may skin or frame it, but text and interactive components should not be flattened into raster artwork.

