# Cadrage — Refonte « ombrelle » du site Meridian Synergy

> Statut : **cadrage validé sur le fond, en attente du go d'implémentation**.
> Date : 2026-07-08. Repo : `meridian-synergy-web` (Nuxt 3 + @nuxt/content + @nuxtjs/i18n + @nuxtjs/seo, statique GitHub Pages).

## 1. Intention

Faire passer le site d'une vitrine **mono-activité drone** à une **ombrelle société**
(Meridian Synergy) présentant trois piliers :

1. **Conseil & Architecture** — le cœur de métier de Denis (architecte d'entreprise),
   sur un continuum *audit → architecture → direction de projet → réalisation*, en
   transverse ou sur un domaine précis, + missions de manager de transition.
2. **Drones** — l'activité opérationnelle existante (télépilote certifié DGAC).
3. **Produits** — vitrine des réalisations SaaS, preuve de la capacité « réalisation ».
   Un seul produit aujourd'hui : **Waypoint360** (conçu, développé et opéré en interne).

Le nom « Meridian Synergy » est neutre et déclinable : **pas de changement de nom ni de
domaine**. Le pivot est un **repositionnement de contenu + arborescence**, pas un rebrand.

## 2. Contrainte SEO directrice

Aujourd'hui c'est la **home `/`** qui ranke sur les requêtes drone. Elle devient une home
ombrelle → l'intention drone doit **basculer sur le landing `/drones`** (voir §4). Règle :
le nouveau `/drones` hérite du contenu drone à l'identique (mots-clés) + la home le pointe
fortement en lien interne. Surveillance GSC 2-3 semaines post-mise en ligne.

Rappels repo (fiche PLAYBOOK 05-WEB) :
- Site **statique** → redirects = `routeRules` (pas de server middleware ici).
- **Ne jamais supprimer un slug public sans 301 d'abord.**
- Budget `<head>` OG < 300 Ko (ne pas inliner de grosse lib d'assets).
- Breadcrumb : donner une `item` (URL) au **dernier maillon**.
- Quoter toute valeur de frontmatter YAML contenant `: `.

## 3. Arborescence & menu cibles

Menu principal (5 entrées) :

```
Conseil & Architecture   → /conseil            (NOUVEAU, page unique)
Drones                   → /drones             (landing branche = ex-contenu drone de la home)
   └ dropdown : Services      → /services       (inchangé)
                Cas d'usage   → /cas-usage      (inchangé)
                Flotte        → /flotte          (ex-/drones, déplacé)
Produits                 → /produits           (NOUVEAU, vitrine Waypoint360)
À propos                 → /a-propos           (élargi : société, plus « droniste » only)
Contact                  → /contact            (inchangé)
```

Voix éditoriale (validée) : **« je »** pour conseil/architecture/transition (intuitu
personae), **« nous »** pour réalisation/produits (équipe de freelances constituée et pilotée).

## 4. Mapping des routes (FR / EN) et redirections

| Concept | FR | EN | Action |
|---|---|---|---|
| Home ombrelle | `/` | `/en/` | contenu réécrit (URL inchangée) |
| Conseil | `/conseil` | `/en/consulting` | **création** |
| Drones (landing) | `/drones` | `/en/drones` | **repositionné** : reçoit l'ex-pitch drone de la home (URL conservée = SEO) |
| Services | `/services` | `/en/services` | inchangé (nesté nav seulement) |
| Cas d'usage | `/cas-usage` | `/en/use-case` | inchangé (nesté nav seulement) |
| Flotte (hub) | `/flotte` | `/en/fleet` | **déplacé** depuis `/drones` (index) |
| Flotte (détail) | `/flotte/[slug]` | `/en/fleet/[slug]` | **déplacé** depuis `/drones/[slug]` |
| Produits | `/produits` | `/en/products` | **création** |
| À propos | `/a-propos` | `/en/a-propos` | contenu élargi |
| Contact | `/contact` | `/en/contact` | inchangé |

### Décision : landing drone = réutilisation de `/drones` (Option R)

Plutôt que créer `/drone` (singulier, 0 autorité), on **réutilise `/drones`** (déjà indexé)
comme landing de branche, et on descend la **flotte** sur `/flotte`. Meilleur transfert de
l'intention drone quittant la home ; coût = ~4 redirections seulement.

### Redirections 301 à ajouter (routeRules)

Slugs flotte (3 drones actuels : `dji-avata-360`, `dji-matrice-4td`, `dji-t100-agri`) :

```
/drones/dji-avata-360      → /flotte/dji-avata-360
/drones/dji-matrice-4td    → /flotte/dji-matrice-4td
/drones/dji-t100-agri      → /flotte/dji-t100-agri
/en/drones/<slug>          → /en/fleet/<slug>   (idem ×3)
+ variantes trailing-slash (le repo en ajoute déjà pour GSC)
```

`/drones` (hub) **n'est pas redirigé** : l'URL est conservée, seul son contenu change
(flotte → landing branche). Anciens bookmarks `/drones/` = 200 avec nouveau contenu.

## 5. Impacts fichiers (périmètre complet — vision globale)

**Routing / config**
- `nuxt.config.ts` :
  - `i18n.pages` : ajouter `conseil↔consulting`, `produits↔products`, et le déplacement
    `drones/index`→`flotte` (`fleet` en EN), `drones/[slug]`→`flotte/[slug]`.
  - `sitemap.urls` : ajouter `/conseil`, `/produits`, `/flotte` (+ [slug]) ; déplacer les
    entrées drone-flotte sous `/flotte` ; garder `/drones` (landing).
  - `nitro.prerender.routes` : mêmes ajouts/déplacements.
  - `routeRules` : ajouter les 301 flotte (§4).

**Pages**
- `pages/index.vue` — réécriture home ombrelle (3 piliers). *Plus gros morceau contenu.*
- `pages/conseil.vue` — **nouveau** (copy validée, page unique en sections).
- `pages/produits.vue` — **nouveau** (vitrine Waypoint360 ; condense les sections W360 de l'ex-home + lien sortant).
- `pages/drones/index.vue` — devient le **landing branche** (récupère le pitch drone : télépilotes certifiés, 6 domaines d'expertise, zones).
- `pages/flotte/index.vue` + `pages/flotte/[slug].vue` — **déplacés** depuis `pages/drones/` (contenu flotte).
- `pages/a-propos.vue` — élargir le propos société.

**Contenu markdown** : `content/{fr,en}/drones/*.md` → renommer le dossier en `flotte`/`fleet`
côté chargement (ou garder le dossier et remapper la route ; à trancher en implémentation —
le plus simple : garder `content/**/drones/` et ne changer que la route, zéro déplacement de fichier).

**Nav** : `components/layout/AppHeader.vue` — passer la liste plate à Conseil / Drones
(dropdown desktop + accordéon mobile) / Produits / À propos / Contact.

**i18n** : `i18n/fr.json` + `i18n/en.json` — **toutes les clés dans les DEUX locales** :
`nav.*` (conseil, produits, flotte), copy des nouvelles pages, meta SEO, breadcrumbs.

**SEO** : breadcrumb schema sur `/conseil`, `/produits`, `/flotte`, `/drones` (landing).

## 6. Découpage

**Un seul repo, une seule feature** → **une branche `feat/refonte-ombrelle`, une PR, un bump**
(convention : 1 branche/feature, éviter la cascade de petites PRs ; release-please pilote le
bump ; seul le merge de la Release PR déploie).

Étapes internes (ordre de travail, pas des PRs séparées) :

1. **Squelette routing** : `i18n.pages`, déplacement flotte + 301, sitemap/prerender, nav (dropdown). Vérif : routes rendent, redirects 301 OK.
2. **Contenu** : home ombrelle, `/conseil` (copy validée), `/produits`, `/drones` landing, `/a-propos` élargi — FR + EN.
3. **Finitions SEO / E2E** : breadcrumbs, OG par page, hreflang, tests Playwright (chaque route publique rend + titre/canonical + CTA + 0 erreur console/CSP), test des 301.

## 7. Décisions figées (2026-07-08)

1. **Landing drone** : **Option R** — `/drones` réutilisé (URL conservée), flotte → `/flotte`.
2. **Nav** : **dropdown** sous « Drones » (desktop) + accordéon (mobile).
3. **Découpage** : **une seule PR** `feat/refonte-ombrelle`, un bump.
4. **`/produits`** : **fiche produit détaillée Waypoint360** (pas une simple vitrine).
