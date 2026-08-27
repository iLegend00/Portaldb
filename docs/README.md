# PortalDB Documentation

> **Before making significant changes to PortalDB, review this documentation index and any standards relevant to the task. Existing PortalDB standards are authoritative unless the current task explicitly overrides them.**

This directory is the durable reference for PortalDB architecture, product standards, feature decisions, and structured-data rules. It exists so future development does not depend on old conversations or implicit project history.

## Site-wide standards

Major rules that apply across PortalDB live under [`standards/`](standards/README.md):

- [Provenance UX](standards/provenance-ux.md) — how source information appears without becoming product branding.
- [Data Integrity](standards/data-integrity.md) — how unknown, conflicting, historical, and screenshot-derived facts are handled.
- [Artwork Pipeline](standards/artwork-pipeline.md) — canonical masters, optimized production derivatives, transparency, and predictable asset paths.
- [Layout Spacing Guidelines](standards/layout-spacing.md) — guidance for evaluating visual spacing and artwork geometry on a per-composition basis.
- [Global Navigation](standards/global-navigation.md) — the site-wide Database / Walkthrough / Tools navigation and Home behavior.

## Feature architecture

Feature-specific UX and implementation decisions live under [`features/`](features/README.md):

- [Full Walkthrough Architecture](features/walkthrough.md) — navigation, responsive field-guide layout, data sources, future chapter growth, and artwork hooks.
- [Homepage Information Architecture](features/homepage.md) — player-intent quick access, section ordering, modular card art, and temporary destinations.

## Data and evidence

- [PortalDB Data Model](data-model.md) — record schemas, relationship rules, and provenance metadata.
- [Character Menu Reference](character-menu-reference.md) — field names established by supplied in-game screenshots.
- [Crafting Calculator Specification](crafting-calculator-spec.md) — calculator schema, relationship behavior, and safeguards against guessed recipes.

## Local handling rules

Folder-specific rules may live beside the files they govern. These local documents supplement the standards above and should remain discoverable from their working directory. For example, [`source-assets/artwork/README.md`](../source-assets/artwork/README.md) defines handling rules for canonical artwork masters.

When standards overlap, apply the more specific rule without weakening the site-wide data-integrity or provenance requirements. If a task explicitly changes a permanent decision, update the relevant document in the same change.
