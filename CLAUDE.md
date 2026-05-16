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

## Commandes

```bash
pnpm dev          # Dev local → localhost:3000
pnpm generate     # Build SSG → .output/public/
pnpm preview      # Preview du build SSG
```

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

Strategy `prefix_except_default` : FR sans préfixe, EN avec `/en/`.

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
