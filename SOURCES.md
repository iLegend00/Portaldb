# PortalDB Source Ledger

PortalDB treats provenance as part of the data model. Real gameplay claims should be traceable to a source and labeled by confidence.

## Source hierarchy

1. **Official** — Roblox experience page, developer posts, official Discord announcements/developer messages.
2. **Corroborated** — independently verified gameplay evidence or multiple reliable community sources.
3. **Community** — credible player-discovered information that has not been officially confirmed.
4. **Unverified** — leads and claims that must not be presented as fact.

## Confirmed baseline — 2026-08-18

### Official Roblox experience
- Title: **The Portal [MMORPG]**
- Creator/owner: **The Box of Trolls Studio**
- Roblox place URL: `https://www.roblox.com/games/122003435349029/The-Portal`
- Release label in current description: **RELEASE v1.0**
- Positioning: slow-paced MMORPG; progression is intended to be earned rather than rushed; developers describe the game as difficult.
- Story premise from the current Roblox description: the player never met their father, was raised by their mother, and their mother was taken by a portal.
- Developers credited in the current description: **medidecil & hsywerke**.
- The description states the project is made by two people.

### Current stated minimum device guidance
- Mobile: **8 GB RAM + Snapdragon/Adreno**
- PC: **quad-core, 8 GB RAM, GTX 1050 / Iris Xe+**

## Secondary discovery source

Creator Exchange currently indexes the same experience as owned by The Box of Trolls Studio and links the official Roblox page. It is useful for discovery and change detection, but PortalDB should prefer official developer/Roblox sources whenever available.

As of 2026-08-18, Creator Exchange also displays a code entry for `2KLIKES` with a Job Change Mask reward. This is **not yet promoted to PortalDB confirmed gameplay data** because the source is secondary; it should be verified in-game or against an official developer channel first.

## Discord intake

The official Discord is a high-priority source, but ChatGPT currently cannot browse its private channel history directly. Discord screenshots, copied developer messages, announcement exports, or channel exports supplied by the site owner can be added to this ledger with date/channel/message provenance.

## Data rule

Do not convert a claim into a normal PortalDB entry merely because it appears in a guide, video, Reddit post, or search result. Record the source first, assign confidence, and distinguish exact confirmed values from estimates or community observations.
