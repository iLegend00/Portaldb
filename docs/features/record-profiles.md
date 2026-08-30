# Shared Record Profile Architecture

**Status:** Active  
**Scope:** `app-core.js`, `record-profile.css`, and the inline Database collections  
**Last updated:** 2026-08-30

Non-NPC Database details share a record-profile shell with a record type, name, optional record-level provenance marker, explicit description, conditional Quick Info, and collection-specific sections. Bosses, races, jobs, skills, locations, mechanics, codes, patches, and updates each render only the structured fields meaningful to that collection. Missing facts and empty sections are omitted; no status, notes, tags, or generic record text substitutes for a description.

Structured arrays and objects are translated into player-facing lists, facts, rewards, and change groups rather than exposed as raw schema. Tags remain search/index metadata. Exact-name structured relationships become dialog links only when a real loaded record exists; unmatched names remain plain text.

One provenance marker at the record title normally covers the profile. More specific markers remain available only for materially different nested provenance. NPC profiles remain a separate specialized system, while Item Finder and the dedicated Quest experience retain their existing architecture.

