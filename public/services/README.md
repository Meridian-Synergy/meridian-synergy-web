# `public/services/` — redirections écrites à la main, et pourquoi pas des `routeRules`

Ces quatre fichiers redirigent les slugs **anglais** servis sous le chemin **français**
(`/services/thermal-inspection/` → `/services/audit-thermique/`). Ils existent parce que
ces URL ont été annoncées en `hreflang` pendant des mois, avant la correction du
2026-08-21, et sont donc possiblement indexées.

⚠️ **Ne pas les réécrire en `routeRules`.** C'était la forme précédente, et elle coûtait
cher : une clé `redirect` de `routeRules` devient une **route**, que `@nuxtjs/i18n`
re-préfixe ensuite par locale. `/services/thermal-inspection` produisait donc aussi
`/en/services/thermal-inspection`, en collision avec la **vraie page anglaise** — que le
module de sitemap écartait alors comme redirection.

Mesuré le 2026-08-21 : `/services` déclarait **7 URL françaises pour 3 anglaises**, quatre
vraies pages de ~41 Ko absentes du registre. Cf. `docs/MERIDIAN_SEO_LOG.md`.

Un fichier de `public/` est copié tel quel dans le build : **aucune route n'est créée**,
donc aucune exclusion. C'est la seule forme qui donne les deux à la fois — la redirection
et la déclaration au sitemap.

Garde : `e2e/services-redirects.spec.ts` vérifie les deux moitiés.
