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
| T2 | Supprimer 22 stubs de redirection par `translationKey` | P2 | M | — |

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

### T2 — Supprimer 22 stubs de redirection par `translationKey` · P2 · M

**Pourquoi.** Les slugs FR et EN des services et des cas d'usage diffèrent, et `@nuxtjs/i18n`
ne devine pas le pendant d'un paramètre dynamique : il annonce en `hreflang` une URL qui
n'existe pas. Le dépôt compense par **22 redirections `routeRules`**, chacune générant un stub
HTML servi en 200. Les dossiers ont résolu la cause le 2026-08-21 — un `translationKey` partagé
plus `setI18nParams` — et ne génèrent **aucune** URL parasite.

**Done.** Porter le mécanisme sur `services/[slug]` et `cas-usage/[slug]`, retirer les
`routeRules` devenues inutiles. ⚠️ **Additif d'abord** : ces stubs sont indexés depuis des mois,
vérifier dans GSC… ce qui n'est plus possible depuis l'abandon du suivi. Donc : les **conserver**
en redirection le temps d'un cycle, et ne retirer que ce qui n'a jamais reçu de trafic connu.
Ne pas traiter ce point comme purement mécanique.
