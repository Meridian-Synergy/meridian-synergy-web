# CSP stricte & analytics — journal (juillet 2026) — meridian-synergy-web

Historique daté des analyses, problèmes et solutions. Site **statique** (`nuxt generate` →
GitHub Pages).

---

## 2026-07-04 — GTM → Google Analytics (gtag.js) direct

**Problème.** Le site chargeait GTM via un **script inline** (bootstrap dans
`nuxt.config.ts` head) + iframe noscript. Le conteneur `GTM-58NSHG6C` s'est avéré **GA4-only**.

**Solution.** Suppression de GTM au profit d'un **plugin client** `plugins/analytics.client.ts`
qui charge `gtag.js` via un `<script src>` **externe** (aucun inline). ID GA4 : `G-21HRF748F7`.

**Statut.** Déployé **prod** (GitHub Pages), validé (GTM absent, GA4 charge).

> ⚠️ Conformité (préexistant, hors scope) : l'analytics se charge **sans bannière de
> consentement** alors que les mentions légales indiquent « aucun cookie de traçage ». GA4
> pose des cookies → écart RGPD à traiter séparément.

---

## 2026-07-04 — CSP stricte via `<meta>` hashé (retrait de `'unsafe-inline'`)

**Contexte.** Le site n'avait **aucune CSP**. GitHub Pages **ne pose aucun en-tête HTTP** →
CSP possible uniquement via `<meta http-equiv>`.

**Analyse — pourquoi le hash (et pas le nonce).** Un nonce n'a de valeur que généré par le
serveur **à chaque requête** ; sur un site statique, un nonce baké est identique pour tous =
inutile. En revanche, le site étant **statique**, le seul script inline exécutable
(`window.__NUXT__.config`) est **déterministe** → **hashable**. Piège découvert : ce script
**varie d'un build à l'autre** (hash local ≠ hash CI) → un hash **hardcodé aurait cassé** la
prod ; il faut le **calculer au post-build** sur la sortie réelle.

**Solution.** `scripts/postbuild-csp.mjs` (branché dans `pnpm generate`) : hashe **tous** les
scripts inline exécutables de la sortie générée et injecte un `<meta>` CSP
`script-src 'self' <hashes> + hôtes gtag/GA` **sans `'unsafe-inline'`** (+ default-src,
img/style/font/connect, base-uri, object-src). **Garde-fou** : premier harnais de test du
repo — Playwright (`e2e/csp.spec.ts` + `scripts/serve-static.mjs`) charge la sortie et assert
**0 violation enforced + page rendue + GA4 charge** ; job CI `e2e`.

**Limite assumée.** `frame-ancestors` / `X-Frame-Options` sont **header-only** → indisponibles
via `<meta>` sur GitHub Pages (pas de protection clickjacking).

**Décision.** Sur ce site statique = **hash** (le nonce est impossible). Les 2 autres fronts
(`waypoint360-web` SSR, `waypoint360-app` SPA runtime) ne peuvent pas être hashés → restent en
**report-only**.

**Statut.** Déployé **prod** + validé navigateur (`meridian-synergy.com` : 0 violation
enforced, GA4 charge, meta CSP présent).
