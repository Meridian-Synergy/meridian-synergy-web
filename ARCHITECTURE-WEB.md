# Architecture — meridian-synergy-web
## Site vitrine Nuxt 3 SSG — meridian-synergy.com

---

## Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Framework | Nuxt 3 (SSG) | Génération statique des pages |
| Contenu | Nuxt Content v3 | Pages Markdown → routes automatiques |
| Multilingue | @nuxtjs/i18n | Routing FR/EN, traductions |
| SEO | @nuxtjs/seo | Sitemap, meta, og:tags, robots.txt |
| Style | Tailwind CSS v4 | Utilitaires responsive |
| Design System | @meridian-synergy/ui | Composants partagés (MsButton, etc.) |
| Déploiement | GitHub Pages | SSG statique, zéro serveur |
| CI/CD | GitHub Actions | Build + deploy automatique sur push main |
| DNS | Gandi | meridian-synergy.com → GitHub Pages |

---

## Structure du repo

```
meridian-synergy-web/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              ← Build SSG + deploy GitHub Pages
│
├── .nuxt/                          ← Généré automatiquement (gitignore)
├── .output/                        ← Build output (gitignore)
│
├── assets/
│   ├── css/
│   │   └── main.css                ← Import Tailwind + tokens MS
│   └── images/
│       └── logo/                   ← ms-logo-horizontal.svg, ms-logo-icon.svg
│
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue           ← Navbar responsive + switcher langue
│   │   └── AppFooter.vue           ← Footer réseaux sociaux + mentions
│   ├── home/
│   │   ├── HeroSection.vue         ← Hero principal avec CTA
│   │   ├── ServicesTeaser.vue      ← Aperçu grille services
│   │   └── SaasTeaser.vue          ← Teaser portail (coming soon)
│   └── shared/
│       ├── PageHero.vue            ← Hero réutilisable pour pages internes
│       ├── ContentCard.vue         ← Carte service/drone
│       └── RelatedLinks.vue        ← Maillage interne (services ↔ drones)
│
├── content/
│   ├── fr/
│   │   ├── services/
│   │   │   ├── video-cinema.md
│   │   │   ├── securite-surveillance.md
│   │   │   ├── audit-thermique.md
│   │   │   ├── agriculture-viticulture.md
│   │   │   ├── topographie-cartographie.md
│   │   │   └── inspection-infrastructure.md
│   │   └── drones/
│   │       ├── dji-t100-agri.md
│   │       ├── dji-mavic-3-enterprise.md
│   │       └── dji-matrice-350.md
│   └── en/
│       ├── services/               ← Même structure, contenu EN
│       └── drones/                 ← Même structure, contenu EN
│
├── i18n/
│   ├── fr.json                     ← Traductions UI (nav, boutons, labels)
│   └── en.json
│
├── layouts/
│   ├── default.vue                 ← Layout standard (header + footer)
│   └── minimal.vue                 ← Layout mentions légales (footer seul)
│
├── pages/
│   ├── index.vue                   ← Home
│   ├── services/
│   │   ├── index.vue               ← Hub services (liste toutes les pages)
│   │   └── [slug].vue              ← Page service dynamique (Nuxt Content)
│   ├── drones/
│   │   ├── index.vue               ← Hub drones
│   │   └── [slug].vue              ← Page drone dynamique (Nuxt Content)
│   ├── a-propos.vue                ← À propos
│   ├── contact.vue                 ← Réseaux sociaux uniquement
│   └── mentions-legales.vue        ← Mentions légales
│
├── public/
│   ├── favicon.ico
│   └── og-default.jpg              ← Image Open Graph par défaut
│
├── nuxt.config.ts                  ← Config principale Nuxt
├── tailwind.config.ts
├── app.vue
├── tsconfig.json
├── package.json
└── CLAUDE.md                       ← Contexte Claude Code
```

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

  // SSG — génération statique complète
  nitro: {
    preset: 'github-pages',
  },

  // Nuxt Content
  content: {
    locales: ['fr', 'en'],
    highlight: false,
  },

  // i18n
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    // FR : /services/video-cinema
    // EN : /en/services/video-cinema
  },

  // SEO
  site: {
    url: 'https://meridian-synergy.com',
    name: 'Meridian Synergy',
    description: 'La plateforme de gestion pour télépilotes de drones professionnels',
    defaultLocale: 'fr',
  },

  // CSS global
  css: ['~/assets/css/main.css'],
})
```

---

## Structure d'une page Markdown (Nuxt Content)

Chaque fichier `.md` dans `content/` génère automatiquement une page.

**Exemple : `content/fr/services/audit-thermique.md`**

```markdown
---
title: "Inspection thermique par drone"
description: "Détection de défauts thermiques sur toitures, panneaux solaires et pylônes électriques grâce au drone équipé de caméra infrarouge."
image: "/images/services/audit-thermique.jpg"
relatedDrones:
  - dji-mavic-3-thermal
  - dji-matrice-350
relatedServices:
  - inspection-infrastructure
seo:
  keywords: ["drone thermique", "inspection toiture drone", "caméra infrarouge drone"]
publishedAt: "2025-01-01"
---

## L'inspection thermique par drone

Contenu de la page...

## Cas d'usage

- Toitures (détection de ponts thermiques, infiltrations)
- Panneaux solaires (cellules défaillantes)
- Pylônes électriques (points chauds)
- Bâtiments industriels

## Drones utilisés

[liens vers pages drones via relatedDrones]
```

---

## Routing i18n

| URL FR | URL EN | Page |
|---|---|---|
| `/` | `/en/` | Home |
| `/services/` | `/en/services/` | Hub services |
| `/services/audit-thermique` | `/en/services/thermal-inspection` | Page service |
| `/drones/dji-t100-agri` | `/en/drones/dji-t100-agri` | Page drone |
| `/a-propos` | `/en/about` | À propos |
| `/contact` | `/en/contact` | Contact |
| `/mentions-legales` | `/en/legal` | Mentions légales |

---

## Maillage SEO interne

Chaque page service contient :
- Liens vers 2-3 pages drones associées (`relatedDrones`)
- Liens vers 1-2 services complémentaires (`relatedServices`)

Chaque page drone contient :
- Liens vers tous les services compatibles avec ce drone
- Lien vers le hub `/drones/`

Le composant `RelatedLinks.vue` génère automatiquement ces liens depuis le frontmatter Markdown.

---

## CI/CD GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Site Vitrine

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm generate          # nuxt generate → .output/public
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./.output/public
```

---

## DNS Gandi → GitHub Pages

Une fois le site déployé, configurer dans Gandi :

```
Type  Nom   Valeur
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   meridian-synergy.github.io
```

Et dans le repo GitHub → Settings → Pages → Custom domain : `meridian-synergy.com`

---

## Pages à créer en priorité (ordre MVP)

| Priorité | Page | Contenu |
|---|---|---|
| 1 | Home | Hero + teaser services + teaser SaaS |
| 2 | Hub Services | Grille de toutes les pages services |
| 3 | 3 pages Services | Audit thermique, Agriculture, Vidéo/cinéma |
| 4 | Hub Drones | Grille de tous les drones |
| 5 | 2 pages Drones | DJI T100 Agri, DJI Mavic 3 Enterprise |
| 6 | À propos | Vision + équipe |
| 7 | Contact | Réseaux sociaux |
| 8 | Mentions légales | Contenu légal |
