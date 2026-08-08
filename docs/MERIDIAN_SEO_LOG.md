# MERIDIAN SYNERGY — Journal SEO (log d'état)

> **Statut : running log — vivant.** Entrées datées, **plus récent en haut**, append-only (on ne réécrit pas l'historique, on ajoute des révisions datées).
> **Objectif** : historiser **chaque action SEO** — *quoi, pourquoi, quand codé, quand déployé* — et statuer **a posteriori** sur son **succès / échec** mesuré dans Google Search Console (GSC).
> **Porte sur** : `meridian-synergy-web` (https://meridian-synergy.com). Cadrage voisin : [`refonte-ombrelle/CADRAGE.md`](./refonte-ombrelle/CADRAGE.md).
> **Équivalent wp360** : `waypoint360/docs/WAYPOINT360_SEO_LOG.md` — même méthode, même template.

## Pourquoi ce journal existe

GSC **ne reflète pas nos déploiements en temps réel** : il montre l'**index de Google**, avec un **décalage de plusieurs jours à plusieurs semaines**, un **échantillonnage**, et une **granularité limitée**. Une variation vue dans GSC peut donc venir d'une action faite des semaines plus tôt, être due à un facteur externe (update d'algorithme, saisonnalité, concurrence), ou ne jamais apparaître pour une action sans effet de ranking. Sans trace **datée et raisonnée**, on ne peut ni attribuer une variation à une action, ni savoir si une action a réussi.

## Spécificité de ce site : hébergement statique

`meridian-synergy.com` est publié sur **GitHub Pages**, hébergeur **statique pur**. Conséquences structurantes pour toute action SEO ici :

- **Pas de server middleware** : aucune redirection HTTP 301 réelle n'est possible. Les `redirect` de `routeRules` sortent en **stub HTML meta-refresh de ~650 o, servi en 200** (soft-redirect). Google suit le meta-refresh instantané et le traite comme une redirection, mais le signal est plus faible qu'un vrai 301.
- **Corollaire** : une URL qu'on veut voir disparaître doit être **absente du build** — un fichier absent = un vrai 404. C'est le seul « code de statut » qu'on maîtrise. Cf. `scripts/postbuild-prune.mjs`.
- **Déploiement** : **chaque push sur `main`** publie (`deploy.yml`), indépendamment de release-please. Merger = mise en ligne immédiate.

---

## Méthode d'évaluation (à appliquer pour chaque entrée)

1. **Ancrer sur la date de DÉPLOIEMENT**, pas la date de code. GSC ne voit que ce qui est en ligne.
2. **Capturer un baseline GSC au déploiement.** *Sans état « avant », aucun verdict n'est possible.*
3. **Fenêtres de ré-évaluation** : **+4 semaines** = premier signal (recrawl partiel) ; **+8 à 12 semaines** = verdict.
4. **Attribution prudente** : corrélation ≠ causalité. Noter les confondants connus sur la période.
5. **Verdicts possibles** : `succès` · `échec` · `neutre` · `indéterminé`. Toujours **daté + preuve GSC**.

### Baseline GSC — à remplir au déploiement de chaque batch

| Date (déploiement) | Version | Impressions 28j | Clics 28j | CTR | Position moy. | Pages indexées | « Explorée, non indexée » | Notes / confondants |
|---|---|---|---|---|---|---|---|---|
| 2026-08-08 | 1.2.2 | _à saisir depuis GSC_ | | | | | | Baseline à saisir le jour du déploiement. Confondant connu : refonte ombrelle v1.2.0 déployée le 2026-07-08, dont le transfert d'intention drone home → `/drones` est encore en cours. |

---

## Template d'entrée (copier pour chaque nouvelle action)

```
### AAAA-MM-JJ — <titre de l'action> (<version / PR>)
- **Statut** : implémenté | mergé main | déployé (AAAA-MM-JJ) | évalué
- **Constat mesuré** : ce qui a été observé en prod, avec les chiffres et la méthode de mesure.
- **Périmètre livré** : quoi exactement (fichiers/pages/PR).
- **Pourquoi (hypothèse)** : le changement attendu et le mécanisme SEO invoqué.
- **KPI à surveiller** : rapport GSC précis + métrique + baseline.
- **Fenêtre de verdict** : +4 sem = <date> · +8-12 sem = <date>.
- **Verdict** : _(à remplir)_ succès/échec/neutre/indéterminé — le <date>, preuve : <chiffre + rapport GSC>.
```

---

## Entrées

### 2026-08-08 — Slugs EN localisés + purge des arbres de routes fantômes (v1.2.2, PR #46)

- **Statut** : **déployé le 2026-08-08**, vérifié en production.
- **Origine** : retour GSC — la page « About » anglaise était indexée sous le slug **français** `/en/a-propos/`.

**Constat mesuré en production avant correction** (méthode : `curl` sur les URLs + `grep` sur le build) :

1. `pages/a-propos.vue` et `pages/mentions-legales.vue` n'étaient **pas déclarés dans `i18n.pages`**. L'EN servait donc le slug FR. Les URLs `/en/a-propos/` et `/en/mentions-legales/` étaient **prérendues ET déclarées au sitemap** — Google indexait exactement ce qu'on lui demandait.
2. **Découverte adjacente, plus grave.** Chaque clé `redirect` de `routeRules` devient une **route** stub, que `@nuxtjs/i18n` localise ensuite comme n'importe quelle route, en la re-préfixant par locale. `'/en/cas-usage'` produisait donc aussi `/en/en/cas-usage` — page **complète de ~38 Ko, HTTP 200, canonique sur elle-même** :

   ```
   /en/en/cas-usage/solar-panels/     200 — 38 Ko, canonical auto
   /en/en/services/audit-thermique/   200 — 38 Ko
   /en/en/drones/dji-matrice-4td/     200 — 38 Ko
   /fr/en/cas-usage/                  200 — 38 Ko
   /fr/a-propos/                      200 — canonical sur /fr/a-propos/
   ```

   S'y ajoutaient les doublons `/fr/**` dus à `strategy: 'prefix_and_default'`, qui rend la locale par défaut accessible à `/` **et** `/fr/`, la copie `/fr/` étant auto-canonique. Déjà hors sitemap, mais servie en 200 donc indexable.
   **Total : 117 pages en doublon indexable** (42 sous `/en/en/`, 75 sous `/fr/` dont 42 dans `/fr/en/`), pour 138 pages légitimes.

**Périmètre livré**

| avant | après | ancienne URL |
|---|---|---|
| `/en/a-propos/` | `/en/about/` | soft-redirect vers `/en/about` |
| `/en/mentions-legales/` | `/en/legal-notice/` | soft-redirect vers `/en/legal-notice` |

Slugs EN alignés sur les libellés déjà présents dans `i18n/en.json` (`nav.about` = "About", `footer.legal` = "Legal notice"). Aucun lien à modifier : header/footer/hero passent tous par `localePath()`.

`scripts/postbuild-prune.mjs` supprime les arbres `/en/en/` et `/fr/` de `.output/public` après build. Le script **avorte le build** si une page survivante linke dans un arbre à purger — garde anti-régression en CI. Mesuré avant de l'écrire : **zéro** page survivante ne référençait l'un ou l'autre arbre (liens, canonical, hreflang, sitemap).

**Pourquoi (hypothèse)** — deux mécanismes distincts :
- *Slugs* : une URL en langue étrangère au contenu est un signal de pertinence dégradé, et le slug fait partie des signaux lexicaux de la page. Aligner l'URL sur la langue du contenu, avec canonical et hreflang cohérents, doit faire consolider Google sur `/en/about/`.
- *Purge* : 117 doublons auto-canoniques diluent le budget de crawl et créent une ambiguïté de canonicalisation. Les passer en 404 réel est le seul signal disponible sur un host statique — pas de 301 possible.

**Vérifications post-déploiement** (toutes faites le 2026-08-08 en prod) : `/en/about/` et `/en/legal-notice/` répondent 200 ; les deux anciennes URLs redirigent ; canonical et hreflang pointent sur les slugs EN ; les 8 URLs fantômes testées répondent **404** ; le sitemap prod expose bien les nouveaux slugs. Contrôle du risque introduit par la purge : un navigateur `fr-FR` arrivant sur `/` **reste sur `/`** (ne rebondit pas vers `/fr/`, qui est désormais un 404) ; `en-US` part sur `/en` ; `de-DE` retombe sur `/`.

**Non vérifié** : le rendu visuel des pages `/en/about/` et `/en/legal-notice/` à l'œil — seuls le statut HTTP, le `<h1>` non vide et le `<head>` ont été contrôlés.

**KPI à surveiller dans GSC**
- *Indexation* : disparition progressive des ~117 URLs fantômes, qui doivent basculer en « Introuvable (404) ». **C'est le comportement attendu, pas une alerte à traiter.**
- *Indexation* : `/en/a-propos/` doit sortir au profit de `/en/about/` — surveiller « Page en double » et « Page avec redirection ».
- *Performance* : impressions/clics sur `/en/about/` vs baseline de `/en/a-propos/`.
- *Sitemaps* : resoumettre le sitemap et vérifier 66 `<loc>` découvertes.

**Fenêtre de verdict** : +4 sem = **2026-09-05** · +8-12 sem = **2026-10-03** à **2026-10-31**.

**Verdict** : _(à remplir)_

**Décision restée ouverte** : basculer `strategy` de `prefix_and_default` vers `prefix_except_default`, ce qui supprimerait les 75 pages `/fr/**` **à la source** au lieu de les purger après coup. Mesuré le 2026-08-08 sur une branche : l'espace d'URL généré est **strictement identique** (138 pages, diff vide), sitemap identique à la prod, canonical/hreflang inchangés, 60/60 e2e verts. Aucun bénéfice de `prefix_and_default` sur GitHub Pages n'a été identifié. En attente d'arbitrage.
