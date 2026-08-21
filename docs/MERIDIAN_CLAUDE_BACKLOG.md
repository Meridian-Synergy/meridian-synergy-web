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
| G1 | Page `/fiche-google-entreprise/` | P1 | M | Fiche GMB en ligne et vérifiée |
| T1 | Titre de marque doublé sur `/conseil` et `/services` | P2 | S | — |
| T2 | Stubs de redirection — **services corrigés**, cas d'usage restants | ~~P2~~ **P1** | M | — |

---

### G1 — Page `/fiche-google-entreprise/` · P1 · M · ⏳ **en attente de la fiche**

**Pourquoi.** C'est le cluster le mieux formé mesuré sur l'audience PME locale, et de loin :
`fiche google entreprise` sort **74 suggestions** d'autocomplétion (*non visible, sans adresse,
profil, compte*), `pourquoi mon entreprise n'apparaît pas sur google` en sort **14**, toutes
autour de Maps et de la fiche établissement. C'est exactement la population que vise le
diagnostic offert, et elle vit déjà sur cette surface.

Le sujet est par ailleurs devenu un **volet de l'audit** le 2026-08-21 (cf. `POC_PLAYBOOK/16`
et `audits/_outils/fiche-google.py`) : la page et le volet se renforcent.

⏳ **Pourquoi ce n'est pas fait tout de suite.** La fiche de Meridian Synergy a été créée le
2026-08-21 mais **sa vérification par Google peut prendre plusieurs jours**. Écrire la page de
référence sur les fiches d'établissement sans en avoir une en ligne se vérifie en un clic, et
détruirait la crédibilité de la page comme celle du volet d'audit qui la cite.

**Déclencheur** : la fiche est **en ligne et vérifiée**. Pas avant.

**Done.** Page FR (l'audience est locale, donc `en: false` comme les guides), ciblant
`fiche google entreprise` et `pourquoi mon entreprise n'apparaît pas sur google`. Contenu :
à quoi sert la fiche, pourquoi la **catégorie principale** décide de tout — le constat le plus
rentable du volet d'audit —, zones desservies pour un établissement sans local, avis et réponses,
et l'écart entre fiche et site. Reliée depuis `/audit-de-site/` et depuis
`/guides/site-invisible-sur-google/`, qui aborde déjà le cas « c'est mon entreprise, pas mon
site, qui n'apparaît pas ». Ajouter la route au `sitemap.urls` **et** au `nitro.prerender.routes`,
et réécrire les `hreflang` par clé — sans quoi i18n annonce la page d'accueil comme alternative.

**À faire en même temps** : renseigner la **catégorie principale** et les cinq secondaires
proposées, et configurer la fiche en **établissement de service** (adresse masquée, zones
desservies). C'est ce champ, et non le texte d'une page, qui porte Paris / Cher / Nièvre /
Loiret / Yonne.

---

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
