# Shared Record Profile Architecture

**Status:** Locked after Pass 3  
**Scope:** `app-core.js`, `record-profile.css`, and the inline Database collections  
**Last updated:** 2026-08-30

Non-NPC Database details share a record-profile shell with a record type, name, optional record-level provenance marker, explicit description, conditional Quick Info, and collection-specific sections. Bosses, races, jobs, skills, locations, mechanics, codes, patches, and updates each render only the structured fields meaningful to that collection. Missing facts and empty sections are omitted; no status, notes, tags, or generic record text substitutes for a description.

Structured arrays and objects are translated into player-facing lists, facts, rewards, and change groups rather than exposed as raw schema. Tags remain search/index metadata. Exact-name structured relationships become dialog links only when a real loaded record exists; unmatched names remain plain text.

One provenance marker at the record title normally covers the profile. More specific markers remain available only for materially different nested provenance. NPC profiles remain a separate specialized system, while Item Finder and the dedicated Quest experience retain their existing architecture.

Record profiles use a dedicated parchment, navy, and restrained-gold field-guide presentation. Quick Info is a connected reference grid that adapts to the available field count; richer Boss records use scan-friendly encounter, reward, and event sections, while sparse Jobs and Skills remain deliberately compact. Exact linked relationships use stationary field-guide cards with visible keyboard focus, while unmatched relationship names remain visually non-interactive. The dialog is vertically scrollable within the viewport and reflows reference cells, rewards, and linked content without horizontal overflow on small screens.

Internal evidence notes remain stored but are not rendered as update content. Structured mechanic fields use explicit player-facing labels rather than transformed schema names. When linked navigation replaces an open profile, focus returns to the persistent close control so keyboard users remain within the single shared dialog; closing the dialog restores focus to the original Database trigger.

