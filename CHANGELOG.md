# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) — versioning: [Semantic Versioning](https://semver.org/).

---

## [1.0.1] — 2026-06-16

- Fix(SEO): set `site.trailingSlash: true`. GitHub Pages serves directory URLs WITH a trailing slash (and 301s the no-slash form), but canonical/og were generated WITHOUT the slash → every canonical pointed to a redirecting URL → GSC "page with redirect" / "duplicate". Canonical/og now match the served URL (verified: `/services/audit-thermique/` → canonical `…/audit-thermique/`). Note: `@nuxtjs/sitemap` v8 still strips the slash from `<loc>` (resists config + hooks) and the sitemap setup is a separate tangle (single sitemap + index + `__sitemap__/*` chunks + bogus `/fr/sitemap.xml` from `prefix_and_default`) — to be cleaned in a dedicated pass.

## [1.0.0] — 2026-06-14

- Adopt versioning policy: patch bump + one CHANGELOG line on every branch (major/minor on request).
