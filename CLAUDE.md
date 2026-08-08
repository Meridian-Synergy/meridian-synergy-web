# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language rule — ABSOLUTE

**All code must be written in English, no exception:**
- Comments (`//`, `/* */`) in JS, TS, and Vue `<script>` blocks
- CSS/SCSS comments and class names
- Variable names, function names, method names
- TypeScript interfaces, types, enums and their properties
- HTML `id`, `data-*` attributes and any developer-facing identifiers

The only content allowed in French (or other languages):
- User-facing text inside i18n files (`fr.json`, `en.json`, …)
- String literals displayed to end users
- Existing production database column/table names (do not rename)

---

## Working method — ABSOLUTE

Before any non-trivial implementation, always:
1. **Present the plan**: list the files to be changed, the approach, and any trade-offs worth noting
2. **Ask for confirmation**: explicitly wait for a go-ahead before writing any code
3. **Only then implement**: start coding only after the user confirms

This applies to all features, refactors, and multi-file changes — regardless of complexity.

---

## meridian-synergy-web — Site vitrine Nuxt 3 SSG

Site vitrine statique pour **Meridian Synergy** (plateforme SaaS pour télépilotes de drones professionnels), déployé sur `meridian-synergy.com` via GitHub Pages.

Pour l'architecture détaillée, voir `ARCHITECTURE-WEB.md`.

---

## Services & outils tiers

| Outil | Rôle | Notes |
|---|---|---|
| **Gandi** | Registrar DNS pour `meridian-synergy.com` | DNS et certificats TLS gérés depuis le dashboard Gandi |
| **BetterStack** | Uptime monitoring + status page publique | Ping HTTP sur l'URL de production |
| **Atlassian Jira** | Tickets et suivi du backlog | Projet Meridian Synergy sur Jira |
| **Atlassian Confluence** | Documentation technique et fonctionnelle | Espace Meridian Synergy sur Confluence |

---

## Commandes

```bash
pnpm dev          # Dev local → localhost:3000
pnpm generate     # Build SSG → .output/public/
pnpm preview      # Preview du build SSG
```

---

## Versioning — ABSOLUTE

Version numbers follow `a.b.c` (major.minor.patch). **Versioning is automated by release-please — never bump `package.json` or edit `CHANGELOG.md` by hand.**

- **Conventional Commits are mandatory** on `main`: `feat:` → minor, `fix:` → patch, `feat!:`/`BREAKING CHANGE:` → major, `chore:`/`ci:`/`docs:` → no release. The subject becomes the changelog line.
- release-please maintains a **Release PR** (bumps `package.json` + writes `CHANGELOG.md`). Merging it creates the tag `vX.Y.Z`.
- The static site is published to GitHub Pages on **every** `main` push (`deploy.yml`), independent of releases — the tag is just the version marker.
- Baseline lives in `.release-please-manifest.json`.

## Git workflow — ABSOLUTE

**Never push directly to `main`.** Every change goes through a branch → PR → merge cycle:

**Branch types:**
- `feat/[topic]` — new feature
- `fix/[topic]` — one or more small fixes grouped together
- `hotfix/[topic]` — single urgent fix, branched from `main` (prod), merged back immediately
- `quickfix/[topic]` — tiny isolated fix (typo, one-line correction) — still requires branch + PR + Go merge, no exceptions

1. Create a branch: `git checkout -b feat/[topic]`, `fix/[topic]`, `hotfix/[topic]`, or `quickfix/[topic]`
2. Work and accumulate commits on that branch (multiple corrections on the same branch are fine)
3. **Before committing**: present a summary of files changed and why, then wait for explicit **"Go commit"**
4. After push: user reviews the diff on the GitHub PR
5. Wait for explicit **"Go merge"** before merging to `main` — merging triggers the production deploy
6. After merge: pull local main — `git checkout main && git pull origin main` on affected repos

---

## Backward compatibility — ABSOLUTE

### Public URLs and routes
Never remove or rename a public route, page, or content slug — it breaks SEO rankings, external backlinks, and user bookmarks.

- **Rename a route or slug**: add a `301` redirect first, then rename — never the reverse
- **Remove a page**: add a redirect to the nearest equivalent before deleting the file
- Additive-first: always add new routes before removing old ones

### i18n keys
Never remove an i18n key from `fr.json` or `en.json` — only add. If a key is no longer used in this repo, leave it until confirmed unused across all repos that share the translation namespace.

---

## Règle absolue — Design System

**Ne jamais créer de composant UI local dans ce repo.**
Tous les composants visuels viennent exclusivement de `@meridian-synergy/ui`.

```vue
<script setup>
import { MsButton, MsCard, MsNavBar, MsBadge } from '@meridian-synergy/ui'
import '@meridian-synergy/ui/styles'
</script>
```

Storybook : https://meridian-synergy.github.io/meridian-synergy-ui

Si un composant manque : le créer dans `meridian-synergy-ui`, le publier, puis `pnpm update @meridian-synergy/ui` ici.

Tokens CSS fournis par `@meridian-synergy/ui/styles` — ne jamais redéfinir couleurs ou espacements en dur. Site **light mode uniquement** (fond blanc, texte navy).

---

## Architecture du contenu

Les pages service et drone sont générées depuis des fichiers Markdown via Nuxt Content — **ne pas créer de fichier `.vue`** pour ces pages.

```
content/fr/services/[slug].md  →  /services/[slug]
content/en/services/[slug].md  →  /en/services/[slug]
content/fr/drones/[slug].md    →  /drones/[slug]
content/en/drones/[slug].md    →  /en/drones/[slug]
```

Les slugs EN sont différents des slugs FR (ex: `audit-thermique` → `thermal-inspection`).

### Frontmatter obligatoire — page Service

```markdown
---
title: ""
description: ""           # Meta SEO : 120-160 caractères
image: ""                 # /public/images/services/[slug].jpg
relatedDrones: []         # Slugs des drones associés (maillage interne)
relatedServices: []       # Slugs des services complémentaires
seo:
  keywords: []            # 3 à 6 mots-clés longue traîne
publishedAt: "YYYY-MM-DD"
---
```

### Frontmatter obligatoire — page Drone

```markdown
---
title: ""
description: ""           # Meta SEO : 120-160 caractères
manufacturer: ""          # Ex: DJI
model: ""                 # Ex: T100 Agri
image: ""                 # /public/images/drones/[slug].jpg
relatedServices: []       # Slugs des services compatibles
specs:
  weight: ""
  maxFlightTime: ""
  camera: ""
  range: ""
publishedAt: "YYYY-MM-DD"
---
```

---

## SEO

- `relatedDrones` / `relatedServices` sont **obligatoires** pour chaque page (maillage interne)
- `@nuxtjs/seo` génère automatiquement sitemap et og:tags depuis le frontmatter
- Pas de formulaire de contact (sécurité) — contact via réseaux sociaux uniquement

---

## i18n

Strategy `prefix_except_default` : FR sans préfixe, EN avec `/en/`. **Ne pas repasser à
`prefix_and_default`** : cela régénère tout le site une seconde fois sous `/fr/`, en pages
auto-canoniques servies en 200 — des doublons que GitHub Pages, hébergeur statique, ne peut
pas rediriger. Cf. `scripts/postbuild-prune.mjs`.

Les traductions UI (navbar, boutons) sont dans `i18n/fr.json` / `i18n/en.json`.
Le contenu éditorial est dans `content/fr/` et `content/en/`.

---

## Contexte métier — Services drone

**Audit thermique** — Toitures (ponts thermiques), panneaux solaires (cellules défaillantes), pylônes (points chauds). Caméra infrarouge obligatoire.

**Agriculture / Viticulture** — Cartographie parcelles, stress hydrique, épandage phytosanitaire (DJI T100). Indice NDVI.

**Vidéo / Cinéma** — Prises de vue aériennes pour films, publicité, événements.

**Sécurité / Surveillance** — Sites industriels, événements. Capteurs thermiques, zoom optique.

**Topographie / Cartographie** — Relevés topographiques, modèles 3D, orthophotos. Pix4D, DroneDeploy.

**Inspection infrastructure** — Ponts, pylônes, éoliennes, barrages. Fissures, corrosion, déformation.

---

## Pages — état actuel

Toutes les pages sont créées. Slugs de contenu existants :

**Services** : `audit-thermique`, `agriculture-viticulture`, `video-cinema`, `securite-surveillance`, `topographie-cartographie`, `inspection-infrastructure` (+ slugs EN correspondants)

**Drones** : `dji-t100-agri`, `dji-matrice-4td`, `dji-avata-360` (FR = EN)
