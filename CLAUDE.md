# CLAUDE.md — meridian-synergy-web
## Site vitrine Nuxt 3 SSG — meridian-synergy.com

Ce fichier est lu automatiquement par Claude Code à chaque session.

---

## Contexte projet

**Meridian Synergy** — Plateforme SaaS pour télépilotes de drones professionnels.
Ce repo est le **site vitrine statique** déployé sur `meridian-synergy.com`.

Objectifs du site :
- Présenter Meridian Synergy et ses services
- Générer du trafic SEO via des pages métier (services) et produit (drones)
- Teaser le portail SaaS à venir
- Aucun formulaire (sécurité) — contact uniquement via réseaux sociaux

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Nuxt 3 — mode SSG (`nuxt generate`) |
| Contenu | Nuxt Content v3 (fichiers Markdown) |
| Multilingue | @nuxtjs/i18n (FR par défaut, `/en/` pour EN) |
| SEO | @nuxtjs/seo (sitemap, meta, og:tags automatiques) |
| Style | Tailwind CSS v4 |
| **Design System** | **@meridian-synergy/ui (OBLIGATOIRE — voir section dédiée)** |
| Package manager | pnpm |
| Déploiement | GitHub Pages via GitHub Actions |
| DNS | Gandi → meridian-synergy.com |

---

## Design System — @meridian-synergy/ui

**RÈGLE ABSOLUE : ne jamais créer de composant UI local dans ce repo.**
Tous les composants visuels (boutons, inputs, cards, navbar…) viennent exclusivement du package `@meridian-synergy/ui`.

### Installation

```bash
pnpm add @meridian-synergy/ui
```

### Usage dans un composant Vue

```vue
<script setup>
import { MsButton, MsCard, MsNavBar, MsBadge } from '@meridian-synergy/ui'
import '@meridian-synergy/ui/styles'
</script>

<template>
  <MsNavBar />
  <MsCard>...</MsCard>
  <MsButton label="Découvrir" variant="primary" />
</template>
```

### Composants disponibles

Voir le Storybook pour la liste complète et la documentation :
https://meridian-synergy.github.io/meridian-synergy-ui

### Si un composant nécessaire n'existe pas encore

1. Ne pas le créer dans ce repo
2. Aller dans `meridian-synergy-ui` et créer le composant là-bas
3. Le publier en nouvelle version
4. Revenir ici et mettre à jour : `pnpm update @meridian-synergy/ui`

### Tokens CSS

Les tokens sont fournis par `@meridian-synergy/ui/styles`. Ne jamais redéfinir des couleurs ou espacements en dur.

```css
/* Utiliser toujours les variables tokens */
--ms-color-navy, --ms-color-sky, --ms-color-orange...
--ms-font-display, --ms-font-body...
--ms-space-xs, --ms-space-sm, --ms-space-md...
```

Le site vitrine est **light mode uniquement** (fond blanc, texte navy).

---

## Structure des dossiers

```
meridian-synergy-web/
├── .github/workflows/deploy.yml  ← CI/CD GitHub Pages
├── assets/css/main.css           ← Import Tailwind + tokens MS
├── assets/images/logo/           ← SVG logo variants
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue         ← Utilise MsNavBar de @meridian-synergy/ui
│   │   └── AppFooter.vue
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── ServicesTeaser.vue
│   │   └── SaasTeaser.vue
│   └── shared/
│       ├── PageHero.vue          ← Utilise MsCard de @meridian-synergy/ui
│       ├── ContentCard.vue       ← Utilise MsCard de @meridian-synergy/ui
│       └── RelatedLinks.vue      ← Maillage interne services ↔ drones
├── content/
│   ├── fr/
│   │   ├── services/             ← Un .md par service
│   │   └── drones/               ← Un .md par drone
│   └── en/
│       ├── services/
│       └── drones/
├── i18n/
│   ├── fr.json                   ← Traductions UI
│   └── en.json
├── layouts/
│   ├── default.vue               ← Header + Footer
│   └── minimal.vue               ← Footer seul (mentions légales)
├── pages/
│   ├── index.vue                 ← Home
│   ├── services/
│   │   ├── index.vue             ← Hub services
│   │   └── [slug].vue            ← Page dynamique Nuxt Content
│   ├── drones/
│   │   ├── index.vue             ← Hub drones
│   │   └── [slug].vue            ← Page dynamique Nuxt Content
│   ├── a-propos.vue
│   ├── contact.vue               ← Réseaux sociaux uniquement, pas de formulaire
│   └── mentions-legales.vue
├── public/
│   ├── favicon.ico
│   └── og-default.jpg
├── nuxt.config.ts
├── tailwind.config.ts
└── CLAUDE.md
```

---

## Conventions

### Créer une page Service
1. Créer `content/fr/services/[slug].md` avec le frontmatter complet
2. Créer `content/en/services/[slug].md` (version EN)
3. Ne PAS créer de fichier `.vue` — généré automatiquement par `pages/services/[slug].vue`

### Créer une page Drone
Même principe dans `content/fr/drones/` et `content/en/drones/`.

### Frontmatter obligatoire — page Service

```markdown
---
title: ""
description: ""           ← Meta description SEO (120-160 caractères)
image: ""                 ← /public/images/services/[slug].jpg
relatedDrones: []         ← Slugs des drones associés (maillage SEO)
relatedServices: []       ← Slugs des services complémentaires
seo:
  keywords: []            ← 3 à 6 mots-clés longue traîne
publishedAt: "YYYY-MM-DD"
---
```

### Frontmatter obligatoire — page Drone

```markdown
---
title: ""
description: ""
manufacturer: ""          ← Ex: DJI
model: ""                 ← Ex: T100 Agri
image: ""                 ← /public/images/drones/[slug].jpg
relatedServices: []       ← Slugs des services compatibles (maillage SEO)
specs:
  weight: ""
  maxFlightTime: ""
  camera: ""
  range: ""
publishedAt: "YYYY-MM-DD"
---
```

---

## SEO — Règles importantes

- Chaque page doit avoir un `title` unique et une `description` entre 120 et 160 caractères
- Le maillage interne (`relatedDrones` / `relatedServices`) est OBLIGATOIRE pour chaque page
- Les slugs sont en kebab-case : français pour `/fr/`, anglais pour `/en/`
- Les images doivent avoir un `alt` descriptif
- @nuxtjs/seo génère automatiquement le sitemap et les og:tags depuis le frontmatter

---

## i18n — Routing

```
FR (défaut) : /services/audit-thermique
EN          : /en/services/thermal-inspection
```

Les traductions UI (navbar, boutons, labels) sont dans `i18n/fr.json` et `i18n/en.json`.
Le contenu éditorial (Markdown) est dans `content/fr/` et `content/en/`.

---

## Config Nuxt (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
  ],
  nitro: {
    preset: 'github-pages',
  },
  content: {
    locales: ['fr', 'en'],
  },
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
  },
  site: {
    url: 'https://meridian-synergy.com',
    name: 'Meridian Synergy',
    description: 'La plateforme de gestion pour télépilotes de drones professionnels',
    defaultLocale: 'fr',
  },
  css: ['~/assets/css/main.css'],
})
```

---

## Commandes utiles

```bash
pnpm dev          # Dev local → localhost:3000
pnpm generate     # Build SSG → .output/public/
pnpm preview      # Preview du build SSG
```

---

## CI/CD

Push sur `main` → GitHub Actions → `nuxt generate` → deploy GitHub Pages.
URL preview : https://meridian-synergy.github.io/meridian-synergy-web
URL production : https://meridian-synergy.com (après config DNS Gandi)

---

## Pages à créer — Backlog priorisé

| Priorité | Type | Slug FR | Slug EN |
|---|---|---|---|
| 1 | Page | Home `/` | `/en/` |
| 2 | Hub | `/services/` | `/en/services/` |
| 3 | Service | `audit-thermique` | `thermal-inspection` |
| 4 | Service | `agriculture-viticulture` | `agriculture-viticulture` |
| 5 | Service | `video-cinema` | `video-cinema` |
| 6 | Service | `securite-surveillance` | `security-surveillance` |
| 7 | Service | `topographie-cartographie` | `topography-mapping` |
| 8 | Service | `inspection-infrastructure` | `infrastructure-inspection` |
| 9 | Hub | `/drones/` | `/en/drones/` |
| 10 | Drone | `dji-t100-agri` | `dji-t100-agri` |
| 11 | Drone | `dji-mavic-3-enterprise` | `dji-mavic-3-enterprise` |
| 12 | Drone | `dji-matrice-350` | `dji-matrice-350` |
| 13 | Page | `a-propos` | `about` |
| 14 | Page | `contact` | `contact` |
| 15 | Page | `mentions-legales` | `legal` |

---

## Contexte métier — Services drone

**Vidéo / Cinéma** — Prises de vue aériennes pour films, publicité, événements. Drones silencieux, caméras cinéma.

**Sécurité / Surveillance** — Surveillance de sites industriels, événements, frontières. Capteurs thermiques, zoom optique.

**Audit thermique** — Inspection toitures (ponts thermiques, infiltrations), panneaux solaires (cellules défaillantes), pylônes électriques (points chauds). Caméra infrarouge obligatoire.

**Agriculture / Viticulture** — Cartographie parcelles, détection stress hydrique, épandage phytosanitaire (DJI T100). Indice NDVI.

**Topographie / Cartographie** — Relevés topographiques précis, modèles 3D, orthophotos. Logiciels Pix4D, DroneDeploy.

**Inspection infrastructure** — Ponts, pylônes, éoliennes, barrages. Détection fissures, corrosion, déformation.
