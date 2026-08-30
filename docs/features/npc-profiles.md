# NPC Profile Architecture

**Status:** Active  
**Scope:** `app-core.js`, `npc-art.js`, `npc-art.css`, `npc-profile.css`, and `data/npcs.json`  
**Last updated:** 2026-08-30

NPC details are structured as player-facing profiles in this order: identity and portrait, available Quick Info, Shop / Services, Dialogue & Information, and Connected Content. A section or field renders only when its record supplies reliable content. Missing locations, schedules, services, and relationships are omitted rather than guessed or replaced with uncertainty text.

Approved portrait art is mapped by `npc-art.js` and rendered once with the identity area without repeating the NPC name or presenting the illustration as official game artwork. The profile summary uses only an explicit NPC description.

Shop categories, services, dialogue options, and dialogue facts render only when present. Service output exposes concrete structured values, never internal schema flags. One record-level provenance marker normally covers the profile; a section-level marker is reserved for materially different provenance such as a separately sourced service.

Known Items and Related Quests render only when matching records exist. Their buttons continue to open the shared record dialog, allowing linked content to replace the current detail view without opening another dialog.

NPC profiles use a dedicated field-guide presentation scoped by `.npc-profile-dialog` and `.npc-profile`. The portrait and identity form one responsive header; reference sections use a shared parchment, navy, and restrained-gold visual language without changing generic record dialogs.

