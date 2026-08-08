# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) — versioning: [Semantic Versioning](https://semver.org/).

---

## [1.2.2](https://github.com/Meridian-Synergy/meridian-synergy-web/compare/v1.2.1...v1.2.2) (2026-08-08)


### Bug Fixes

* header CTA lands on /contact + hide empty social accounts ([#44](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/44)) ([5969f08](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/5969f081b9ede90f43df7bc6807eda9596ce5f98))
* localize EN slugs for About/Legal notice and prune phantom route trees ([#46](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/46)) ([b008ae2](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/b008ae20212e0d169e364463dd06d74557aae35a))

## [1.2.1](https://github.com/Meridian-Synergy/meridian-synergy-web/compare/v1.2.0...v1.2.1) (2026-07-18)


### Bug Fixes

* align home hero background with other page heros ([#42](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/42)) ([a604dcc](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/a604dcc9410c64752bae046aa84df81574ce9f92))
* reduce home hero vertical height ([#43](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/43)) ([cdb05c6](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/cdb05c6e0b44f833c5db6db1185ef8580edaadb5))
* unbreak use-case detail pages by removing crashing per-page OG image ([#39](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/39)) ([4f333c3](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/4f333c36314cc7bc077b05f539e292bd947af587))

## [1.2.0](https://github.com/Meridian-Synergy/meridian-synergy-web/compare/v1.1.0...v1.2.0) (2026-07-08)


### Features

* refonte ombrelle — piliers Conseil, Drones, Produits ([#34](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/34)) ([9f95dd0](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/9f95dd008551711d9ad526e9924aafbce2cc9eec))


### Bug Fixes

* baseline de l'image OG au positionnement ombrelle ([#36](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/36)) ([58a20b3](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/58a20b36ada95eb71fa40693465f571ff3f8cb48))
* cartes piliers à hauteur égale + copy société (à-propos, contact) ([#37](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/37)) ([44d5a91](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/44d5a91b2fb4f3ece690eff20a982c861f26081a))

## [1.1.0](https://github.com/Meridian-Synergy/meridian-synergy-web/compare/v1.0.2...v1.1.0) (2026-07-04)


### Features

* consent-gated cookie banner for GA4 ([#33](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/33)) ([f086244](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/f08624434ccbebd3731cf510822cd21a0b42a659))
* replace GTM with direct GA4 (gtag.js) ([#29](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/29)) ([9042e49](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/9042e4911db45683fb636394662c3b009f669105))
* strict CSP via hashed &lt;meta&gt; (drop unsafe-inline) + Playwright guard ([#31](https://github.com/Meridian-Synergy/meridian-synergy-web/issues/31)) ([9453228](https://github.com/Meridian-Synergy/meridian-synergy-web/commit/9453228ea84e1de8fac48e6ed7d9d1d141fccf18))

## [1.0.2] — 2026-06-16

- Refactor(sitemap): one clean sitemap. Was a tangle — `/sitemap.xml` + `/sitemap_index.xml` + `/__sitemap__/*.xml` chunks + bogus `/fr/sitemap.xml` & `/en/sitemap.xml` HTML pages (from `prefix_and_default`), with no-slash `<loc>`s that all 301 on GitHub Pages, plus duplicate hub entries. Now: `sitemap.sitemaps: false` + `includeAppSources: false` collapse it to a single `/sitemap.xml`; a `postbuild-sitemap.mjs` step (wired into `generate`) force-adds the trailing slash to every `<loc>` (the v8 module strips it and resists every runtime hook) and removes the duplicate `<url>` blocks the i18n integration re-injects for localized-slug hubs. Result: single sitemap, 60 URLs, 0 duplicates, all trailing-slash, well-formed.

## [1.0.1] — 2026-06-16

- Fix(SEO): set `site.trailingSlash: true`. GitHub Pages serves directory URLs WITH a trailing slash (and 301s the no-slash form), but canonical/og were generated WITHOUT the slash → every canonical pointed to a redirecting URL → GSC "page with redirect" / "duplicate". Canonical/og now match the served URL (verified: `/services/audit-thermique/` → canonical `…/audit-thermique/`). Note: `@nuxtjs/sitemap` v8 still strips the slash from `<loc>` (resists config + hooks) and the sitemap setup is a separate tangle (single sitemap + index + `__sitemap__/*` chunks + bogus `/fr/sitemap.xml` from `prefix_and_default`) — to be cleaned in a dedicated pass.

## [1.0.0] — 2026-06-14

- Adopt versioning policy: patch bump + one CHANGELOG line on every branch (major/minor on request).
