# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Creators** (mostly Twitch streamers, Just Chatting / IRL / gaming, small to mid-size channels) deciding whether they want to be on the BLNK roster. The home page (`/`) and `/mission` speak to them. Their job: judge whether BLNK is serious, whether it "gets" streamers, and apply.
- **Brands and sponsors** (marketing and partnership leads, startups through energy-drink-tier sponsors) deciding whether to book a BLNK creator. `/business` and `/cases/*` speak to them. Their job: see the roster, proof of past work, decks and services, then start a brief by email.

## Product Purpose

BLNK Media is a creator management house, Twitch first. It signs a small roster (five creators in Issue 001, no tiers), builds their brands, connects them with sponsors, and handles the business side. Success on the site: creators apply, brands email `business@BLNK.name` to start a brief.

## Positioning

A roster you can count on one hand, signed before the algorithm notices them. The long game in the founder's thesis is a company that sits between creators, brands, audiences and capital (talent → media → brand partnerships → technology → capital). Talent management is the entry point, not the whole business.

## Operating Context

- The site is published as numbered **issues** (Issue 001, Sep 2026). Applications open for the next issue. The issue format is a confirmed part of the brand and stays.
- Routes: `/` (Issue 001: cover, roster, apply), `/business`, `/mission`, `/cases/<slug>` (Razer, GFuel, AnadaSeat), `/privacy`, `/terms`.
- Built with Expo Router (SDK 57) exported as a static web site, deployed on Vercel at blnk.name. Same code runs in Expo Go.
- Contact is email only: `business@BLNK.name`.

## Capabilities and Constraints

- Static export; no backend, no forms that post anywhere, no analytics or tracking cookies.
- Fonts are bundled TTFs loaded through `expo-font` (each cut registered as its own family). Any replacement must ship as local font files under an open license.
- Content lives in `src/content/*.ts`; copy there is verbatim from the founder and must not be rewritten without asking.

## Brand Commitments

- Name: **BLNK Media**, domain written as BLNK.name.
- Logo: open to redesign (confirmed 2026-10-10). The current `[BLNK] media` bracket wordmark is evidence, not a lock.
- The founder wants the site to stop reading as AI-generated (2026-10-10): avoid the default type and color choices AI design tools reach for.
- Voice: short, declarative, a little cocky ("We sign the creators before the algorithm does.").

## Evidence on Hand

- Creator photos and covers: `assets/creators/` (NovaPovie, Fumibean, m0rals_, JackyPooWoo, Cloyyd).
- Partner and sponsor logos: `assets/logos/` (Pesito, J Rising Founder, GFuel, Red Bull, Streamer University, CapCity).
- Deck thumbnails: `assets/decks/`. Founder photo: `assets/team/kenneth-dang.jpg`.
- Follower counts from public trackers, September 2026.
- Case study results are not in yet ("added when each campaign wraps"). Do not invent results, testimonials or metrics.

## Product Principles

1. Small on purpose. Five creators, no tiers; the design should never imply a big agency.
2. Streamer-native. It should feel like it came from inside streaming culture, not from a brand consultancy.
3. Proof over polish. Real creators, real logos, real numbers; placeholders are labeled, never faked.
4. One page, one ask. Creators apply; brands email.
