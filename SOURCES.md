# PortalDB Source Ledger

PortalDB treats provenance as part of the data model. Real gameplay claims should be traceable to a source and labeled by confidence.

## Source hierarchy

1. **Official** — Roblox experience page, developer posts, official Discord announcements/developer messages.
2. **Corroborated** — independently verified gameplay evidence or multiple reliable community sources.
3. **Community** — credible player-discovered information that has not been officially confirmed.
4. **Unverified** — leads and claims that must not be presented as fact.

## Confirmed baseline — 2026-08-20

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

## Official Discord big-update — v1.2.13 — 2026-08-20

Source supplied by the site owner from the official Discord `big-update` channel. Post author: **Swaroff [PRTL]**. Discord displayed time: **15:30** in the site owner's local display timezone.

Confirmed claims admitted to PortalDB:

### Guild System
- Guilds are officially open.
- Guild creation is handled through **Rendall**.
- Guild creation costs **499 Robux**.
- Guilds start with **15 members** capacity.
- Guild capacity can be upgraded to **30 members**.
- **Arcane Defense** is available every **Friday**.
- The **Guild Leader** must start Arcane Defense.

### Lycaros — Weekly World Boss
- The Event Calendar displays Lycaros' schedule in the player's **local time**.
- Qualified fighters receive **2× Magnifying Glass**, **3× Goblin Coin**, **3,500 Tria**, and **300 Guild EXP**.
- Base Prize Pool increased from **6 to 10 prizes**.
- Additional Magnifying Glass rewards tied to Top 3 damage contribution are **5 / 3 / 2** for Top 1 / Top 2 / Top 3 respectively and are randomly distributed among party members.

### Claw Machine
- **Magnifying Glass** was added to the prize pool.

### Balance
- Maximum **Damage Up** cap increased from **100% to 120%**.

### Performance
- Network data transmission was reduced to improve network performance and reduce unnecessary data usage.

## Community source: Gamepur race guide — 2026-08-04

URL: `https://www.gamepur.com/guides/best-race-to-pick-in-the-portal-roblox`

Confidence assigned in PortalDB: **Community verified** pending official/developer confirmation or direct in-game capture.

Structured claims currently admitted to the database:

### Race families and tutorial choices
- Human family — tutorial choice: **Milk**.
- Elf family — tutorial choice: **Mushroom**.
- Beastmen family — tutorial choice: **Meat**.

### Reported racial bonuses
- Human: **+2 STR, +2 VIT**.
- Corrupted Human: **+3 STR, +3 VIT**.
- Elf: **+2 INT, +2 WIS**.
- High Elf: **+3 INT, +3 WIS**.
- Beastmen Cat: **+2 AGI, +2 DEX**.
- Beastmen Wolf: **+2 AGI, +2 DEX**.
- Beastmen Fox: **+3 AGI, +2 DEX**.

### Reported variant rates
- The guide reports a **10%** chance for Corrupted Human within the Human family.
- The guide reports a **10%** chance for High Elf within the Elf family.
- The guide reports Fox as the **10%** bonus Beastmen variant.

### Jobs/classes established by the source
- Warrior
- Defender
- Enchanter
- Cleric

The guide associates Defender primarily with VIT/STR-oriented Human bonuses; Enchanter and Cleric with INT/WIS-oriented Elf bonuses; and Warrior with physical-attack stats including STR, AGI, and DEX. PortalDB currently treats these as community-documented relationships, not developer-authored formulas.

### Race reroll mechanic
The guide identifies the **Race Reroll Mirror** as the item used to reroll race and states that equipment whose requirements are no longer met can be unequipped after a race change. This mechanic is recorded here as a research lead but is not yet promoted into the item database pending an additional source or direct verification.

## Secondary discovery source: Creator Exchange

URL: `https://creatorexchange.io/roblox-game/9356969539/the-portal`

Creator Exchange currently indexes the same experience as owned by The Box of Trolls Studio and links the official Roblox page. It is useful for discovery and change detection, but PortalDB should prefer official developer/Roblox sources whenever available.

As of 2026-08-18, Creator Exchange also displays a code entry for `2KLIKES` with a Job Change Mask reward. This is **not yet promoted to PortalDB confirmed gameplay data** because the source is secondary; it should be verified in-game or against an official developer channel first.

## Secondary code-index lead — 2026-08-18

A current third-party code index reports multiple historical/current codes, including `1KLIKES`, `2KLIKES`, `RELEASE`, `THROUGHTHEPORTAL`, `100LIKES`, `500LIKES`, `MBG`, `WELCOMEBETA`, `400LIKES`, `300LIKES`, and `200LIKES`, with rewards such as race rerolls, stat resets, a Job Change Mask, gathering tools, gliders, food, accessories, and a pet ticket.

These are **research leads only**. PortalDB will not publish them as active codes until their current status is corroborated by an official channel, current in-game redemption, or multiple independent current sources.

Source: `https://rbxfits.com/game-codes/the-portal`

## Discord intake

The official Discord is a high-priority source, but ChatGPT currently cannot browse its private channel history directly. Discord screenshots, copied developer messages, announcement exports, or channel exports supplied by the site owner can be added to this ledger with date/channel/message provenance.

## Data rule

Do not convert a claim into a normal PortalDB entry merely because it appears in a guide, video, Reddit post, or search result. Record the source first, assign confidence, and distinguish exact confirmed values from estimates or community observations.
