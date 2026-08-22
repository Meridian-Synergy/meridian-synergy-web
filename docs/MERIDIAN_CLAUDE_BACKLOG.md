# Meridian Synergy — Backlog des propositions Claude

> **Statut : propositions — NON validées, NON planifiées.** Créé le 2026-08-21
> (`meridian-synergy-web` à `0bf3309`, 80 URL au sitemap).
> Chaque item attend un **« go » explicite**. Rien ici n'est engagé.
>
> **Ne pas dupliquer.** Les sujets tracés ailleurs ne sont pas repris ici :
> - **Actions SEO livrées, hypothèses, mesures** : [`MERIDIAN_SEO_LOG.md`](MERIDIAN_SEO_LOG.md).
>   ⛔ Le suivi GSC y est **abandonné** depuis le 2026-08-21 — ne pas relancer les verdicts.
> - **Arborescence et voix éditoriale** : [`refonte-ombrelle/CADRAGE.md`](refonte-ombrelle/CADRAGE.md).
> - **CSP et consentement** : [`security/2026-07-strict-csp-and-ga4.md`](security/2026-07-strict-csp-and-ga4.md).
> - **Conventions réutilisables** (SEO, SEO IA, audit client) : `POC_PLAYBOOK/11`, `20`, `16`.
>   Un item qui vaut pour tous les projets va dans le PLAYBOOK, pas ici.
>
> Convention item : **prio · effort · pourquoi · done**.
> Prio : **P0** (dette structurante / risque), **P1** (fort levier), **P2** (confort).
> Effort : **S** (< ½ j) · **M** (½–2 j) · **L** (> 2 j).
>
> **Déclencheur de nettoyage** : revue périodique — promouvoir, ou supprimer. Un backlog non
> revu est un cimetière, et un cimetière fait perdre confiance dans les autres docs.

---

## Vue d'ensemble

| # | Sujet | Prio | Effort | Bloqué par |
|---|---|---|---|---|
| ~~G1~~ | ~~Page fiche Google~~ — **LIVRÉE le 2026-08-22** | — | — | — |
| T1 | Titre de marque doublé sur `/conseil` et `/services` | P2 | S | — |
| T2 | Stubs de redirection — **services corrigés**, cas d'usage restants | ~~P2~~ **P1** | M | — |

---

### ~~G1~~ — Guide fiche d'établissement Google · **LIVRÉ le 2026-08-22**

Livré en `/guides/fiche-google-entreprise/` ↔ `/en/guides/google-business-profile/`.

⚠️ **Deux erreurs de cette fiche de backlog, relevées par Denis à la reprise** — à ne pas
reproduire sur les items suivants :

1. J'avais écrit l'URL **à la racine**, `/fiche-google-entreprise/`. Faux : la page a la même
   audience et le même rôle que les autres guides, elle appartient au conteneur `/guides/`.
   Vérifier le conteneur avant d'écrire une URL dans un backlog.
2. J'avais écrit « **FR seul, `en: false` comme les guides** ». Périmé le soir même : les guides
   sont devenus bilingues sur demande de Denis, par cohérence de site. Un backlog écrit la veille
   peut décrire un état qui n'existe plus — **relire l'état réel avant d'exécuter**, pas la fiche.

Le déclencheur, lui, a bien joué son rôle : la page attendait que la fiche de Meridian soit en
ligne, elle l'était, et elle a pu être écrite en parlant de la catégorie « Consultant informatique »
réellement choisie.

### T1 — Titre de marque doublé sur `/conseil` et `/services` · P2 · S

**Pourquoi.** `@nuxtjs/seo` ajoute ` | Meridian Synergy` au `<title>`, et ces deux pages
portent déjà la marque dans leur clé i18n. Mesuré en production : `/conseil` sort à
**82 caractères** — « Conseil & Architecture d'entreprise — Meridian Synergy | Meridian
Synergy » — et `/services` à 56. Au-delà de la répétition, `/conseil` dépasse largement le
budget de 60 caractères et sera tronquée en résultats de recherche.

**Done.** Retirer la marque des deux clés `meta.title`, ou poser un `metaTitle` comme sur les
dossiers. Un `quickfix`, une ligne par page.

---

### T2 — Stubs de redirection · ~~P2~~ **P1** · M · services **corrigés le 2026-08-21**

⚠️ **Requalifié P0→P1 après mesure.** Ces stubs n'étaient pas cosmétiques : ils
**excluaient silencieusement quatre vraies pages anglaises du sitemap**. Mesuré avant
correction : `/services` déclarait **7 URL FR pour 3 EN**, alors que six pages anglaises de
~41 Ko existaient au build. Les deux seules déclarées — `agriculture-viticulture` et
`video-cinema` — étaient précisément celles dont les slugs FR et EN sont identiques, donc
sans redirection.

**Cause, établie par test et non par déduction.** Première hypothèse — les redirections
`/en/services/<slug-FR>` — **fausse** : leur retrait ne ramenait aucune page. C'est l'inverse :
une clé `routeRules` côté FR portant un slug EN (`/services/thermal-inspection`) est
**re-préfixée par i18n** en `/en/services/thermal-inspection`, où elle entre en collision avec
la vraie page, que le module de sitemap écarte alors comme redirection. ⚠️ Et il faut retirer
**les deux formes**, avec et sans barre oblique finale : n'en retirer qu'une laissait
`thermal-inspection` absente là où les trois autres revenaient.

**Fait** : `translationKey` posé sur les 12 fichiers de services, `setI18nParams` dans
`pages/services/[slug].vue`, et les 4 redirections `/services/<slug-EN>` retirées. Sitemap
83 → **87**, les 6 services EN déclarés, hreflang appariés dans les deux sens.

**Reste** : les **16 redirections de `cas-usage`**, de même forme. ⚠️ **Aucun dommage mesuré
de leur côté** — les 17 pages EN de cas d'usage sont bien au sitemap. Ne pas les traiter par
symétrie : la correction a un coût (voir ci-dessous) et aucun bénéfice constaté ici. À revoir
seulement si une mesure montre un manque.

⚠️ **Coût assumé de la correction, à connaître avant de refaire le geste ailleurs.** Les 4 URL
`/services/<slug-EN>` passent de redirection à **404 réel**. Elles étaient annoncées en
`hreflang` par les pages anglaises, donc possiblement indexées. C'est un écart délibéré à la
règle « jamais de route publique retirée sans 301 » du `CLAUDE.md` : ces URL n'ont jamais porté
de contenu, ce sont des stubs nés d'un défaut de hreflang, et l'hébergement statique ne permet
pas de garder la redirection sans reproduire l'exclusion du sitemap. Le suivi GSC étant
abandonné, **cette bascule ne sera pas observée**.
