# PortalDB — Trade Tax Calculator

**Status:** Implemented  
**Scope:** `trade-tax.html`, `trade-tax.css`, `trade-tax.js`, and the launch card in `tools.html`  
**Last Updated:** 2026-09-10

## Purpose

The calculator answers one question: if the agreed item price is X Tria, what minimum amount must be sent so the seller receives X after trade tax?

**Agreed Price** means the amount the seller should receive after tax, not the amount initially sent.

## Behavior

Tax Calculation defaults to on. When enabled, the calculator accepts both player levels, uses their absolute level difference, and displays the resulting rate. When disabled, level inputs are unavailable, the rate is 0%, and the amount sent equals the agreed price.

The documented rule used by the calculator is:

- base tax: 20%;
- additional tax: 2 percentage points per level of difference; and
- maximum tax: 60%.

```text
levelDifference = abs(playerLevel - otherPlayerLevel)
taxRate = min(0.20 + (levelDifference × 0.02), 0.60)
amountToSend = ceil(agreedPrice / (1 - taxRate))
taxBurned = amountToSend - agreedPrice
```

Ceiling rounding prevents the seller from receiving less than the agreed whole-Tria price.

## Architecture

- `trade-tax.html` owns semantic inputs, accessible live results, the compact example, and global navigation.
- `trade-tax.css` owns the responsive PortalDB-themed presentation.
- `trade-tax.js` centralizes tax-rate calculation, gross-up calculation, formatting, validation, toggle behavior, and live updates.
- `tools.html` exposes the calculator from the existing Tools grid.

## Provenance and status

The 20% base rate, 2-percentage-point level-difference increase, and 60% cap are treated as community-verified project-owner gameplay information. They are not labeled Official Confirmed because the repository does not currently contain direct official evidence for the mechanic.

The exact in-game integer deduction and rounding implementation remains unresolved. PortalDB uses the specified ceiling gross-up so the displayed send amount is the minimum conservative whole-Tria amount under the documented percentage rule.
