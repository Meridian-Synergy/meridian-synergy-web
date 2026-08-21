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

### 2026-08-21 — Ouverture du cluster « Dossiers » + pilier dette technique / IA (Lot Fondation, PR à venir)

- **Statut** : **implémenté sur branche `feat/dossiers-dette-technique-ia`**, non mergé, non déployé.
- **Périmètre livré** : nouvelle collection éditoriale `content/{fr,en}/dossiers/`, hub `/dossiers/` ↔ `/en/insights/`,
  gabarit `pages/dossiers/[slug].vue` (schema `Article` + `citation`, bloc Sources rendu depuis le frontmatter),
  entrée de nav sous « Conseil & Architecture », lien entrant depuis `/conseil`, registre `sitemap.urls`
  **et** `nitro.prerender.routes`, clés i18n dans les deux locales. Premier dossier : `dette-technique-ia`
  ↔ `technical-debt-ai`.

**Étude de mots-clés — méthode et résultats (2026-08-21)**

Aucun export GSC n'était disponible en local. Mesure faite via l'endpoint d'autocomplétion Google
(`hl=fr&gl=fr`) : **152 requêtes émises, 1 171 suggestions distinctes**, puis expansion alphabétique sur les
racines à valeur commerciale. Ce que cela mesure : **l'existence et la formulation** d'une requête. Ce que cela
ne mesure pas : **le volume et la difficulté**.

| Racine testée | Suggestions | Lecture |
|---|---|---|
| `dette technique ia` | 2 (`dette technique ia`, `ia et dette technique`) | demande **réelle mais mince** — cible du pilier |
| `réduire la dette technique` | 2 | intention commerciale, faible profondeur |
| `cartographie applicative` | 58, propres (`exemple`, `si`, `excel`, `outil`, `logiciel`) | **meilleur cluster FR identifié** — satellite prioritaire |
| `obsolescence informatique` | 12, propres (`gestion`, `définition`, `matériel`) | satellite retenu |
| `modernisation applicative` | 155 mais **bruit** (`application modification/rénovation`) ; expansions IT **en anglais** | slug abandonné |
| `moderniser une application` | bruit (`transformer une appli en apk`) | slug abandonné |
| `audit système d'information` | 43, dominées par `cours`, `mémoire`, `master`, `CNAM`, `salaire` | intention **académique** → page d'audit sortie du pari SEO |
| `architecte d'entreprise` | `emploi`, `salaire`, `alternance`, `recrutement` | intention **candidat**, pas client |

**Conséquence sur le plan initial** : deux des quatre pages prévues ont été redéfinies avant écriture — le
satellite « moderniser une application legacy avec l'IA » est remplacé par **cartographie applicative**, et la
page d'audit passe de cible SEO à page de conversion. Le satellite obsolescence vise `obsolescence informatique`
et **non** `NIS2` (SERP tenue par l'ANSSI, KPMG et les cabinets d'avocats).

**Pourquoi (hypothèse)** — le domaine n'a aucune autorité thématique sur les sujets DSI (138 pages, toutes
drone). Prendre une tête de requête (`dette technique`, `NIS2`) est hors d'atteinte, et le haut du cluster
`dette technique` est de toute façon **définitionnel** (`c'est quoi`, `définition`, `traduction`) donc sans
valeur commerciale. Le pari est donc : longue traîne qualifiée + **cohérence de cluster** (Google évalue un
ensemble, pas une page isolée) + **exactitude sourcée** comme différenciateur, dans une SERP factuellement
négligée (une page bien classée y affirme que NIS2 a été transposée en droit français au S1 2025).

**Rigueur des chiffres cités dans le dossier** : deux données du DBIR 2026 qui circulent largement — délai
médian de correction passé de 32 à 43 jours, et 26 % des vulnérabilités du catalogue KEV corrigées — n'ont pu
être vérifiées que sur des reprises secondaires, jamais dans une source primaire. **Elles ont été écartées du
dossier.** Les chiffres retenus proviennent tous d'une source primaire lue : communiqué Verizon (31 %, première
fois en 19 ans), PDF ANSSI `CERTFR-2026-CTI-002` extrait et cité au texte (29 %, +18 %/an, 6 200 actifs),
McKinsey, arXiv 2501.06972, METR, DORA, MITRE ATT&CK C0062.

**KPI à surveiller dans GSC**
- *Indexation* : les 4 nouvelles URL (`/dossiers/`, `/dossiers/dette-technique-ia/` + équivalents `/en/insights/`)
  doivent être découvertes puis indexées. Vérifier qu'elles sortent bien au sitemap après déploiement.
- *Performance* : apparition de requêtes contenant « dette technique » dans le rapport Requêtes — **c'est le
  signal à surveiller en premier**, aucune n'existe aujourd'hui sur ce domaine.
- *Position* : position moyenne sur `dette technique ia` / `ia et dette technique`.

**Baseline à capturer le jour du déploiement** : impressions et clics 28 j du site entier, et **liste des
requêtes existantes** — pour pouvoir prouver que les requêtes « dette technique » sont nouvelles.

**Fenêtre de verdict** : +4 sem et +8-12 sem à compter de la date de déploiement (à renseigner au merge).

**Verdict** : _(à remplir)_

**Conformité à `POC_PLAYBOOK/20-SEO-IA.md`** — vérifiée avant merge, quatre écarts corrigés dans la
même PR.

*Règle n°1 — HTML servi sans JavaScript.* Mesuré, pas supposé. ⚠️ **La commande `sed` de la fiche ne
retire pas les `<script>`** (`.*?` n'est pas un quantificateur paresseux en sed, et `.` ne franchit pas
les sauts de ligne) : le payload Nuxt inline est compté comme du texte, ce qui gonfle le résultat d'un
facteur ~20. Remesuré en retirant réellement scripts et styles, on retrouve **exactement** le chiffre de
la fiche sur la prod (1 368 car.), ce qui valide la méthode corrigée.

| Page | Texte visible sans JS |
|---|---|
| `/` | 1 367 |
| `/dossiers/` **avant** étoffement | 1 204 |
| `/dossiers/` **après** | **2 761** |
| `/en/insights/` | 2 629 |
| `/dossiers/dette-technique-ia/` | **11 591** |
| `/en/insights/technical-debt-ai/` | 10 769 |

Le pilier pèse **8,5 fois la home** : c'est désormais la plus grosse surface récupérable du domaine.

*Écarts corrigés* :
1. **Titres reformulés en questions** (règle « le passage prime sur la page ») — 8 H2 par locale.
2. **`robots.txt` nomme 10 agents IA**, recherche et entraînement distingués, aucun `Disallow: /`.
   Rien n'était bloqué avant ; l'écart était de lisibilité d'intention, pas de blocage.
3. **Hub étoffé** — il servait moins de texte que la home, donc n'aurait jamais été récupéré.
4. **Gardes ajoutés** (`e2e/ai-readability.spec.ts`) : plancher de texte SSR sur les 70 URL du sitemap,
   cliquet anti-`llms.txt`, contrôle des agents nommés. ⚠️ La fiche dit « étendre le guard vitest » :
   **ce dépôt n'a pas de vitest**, ses gardes vivent dans `e2e/`.

*Calibrage du plancher* : 600 caractères. Page réelle la plus maigre du sitemap = `/en/contact/` à
**766** car., soit 28 % de marge. Vérifié que le garde discrimine : à 1 000 il échouerait sur 2 pages.
Il attrape un effondrement en coquille rendue côté client, pas une variation éditoriale.

*Décision de plan corrigée pour le Lot Instructions IA* : ce sera **une seule page `/ai-instructions`
en anglais**, et non la paire FR/EN annoncée. Motif tiré de la fiche : les modèles pivotent par
l'anglais pour récupérer, et traduire un vocabulaire technique vise un terme que le marché ne tape pas.
Le protocole de mesure passe aussi **par moteur** (citation ≠ récupération comme source).

**Suite prévue** : Lot Satellites (`cartographie-applicative`, `obsolescence-informatique`), puis Lot
Instructions IA (page `/instructions-ia/` ↔ `/en/ai-instructions/`). Note mesurée pour ce dernier :
`public/_robots.txt` autorise déjà tous les agents (`User-agent: * / Allow: /`, seul `/_nuxt/` exclu), donc
aucun blocage côté crawlers IA. `llms.txt` **écarté** sur preuve : sur plus de 500 M de visites de bots IA
suivies sur 90 jours, 408 seulement visaient ce fichier, et aucun fournisseur majeur n'a confirmé le lire.

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

**Suite donnée** : bascule de `strategy` vers `prefix_except_default` — cf. entrée du 2026-08-08 ci-dessous.

### 2026-08-08 — `strategy` i18n : `prefix_and_default` → `prefix_except_default`

- **Statut** : **déployé le 2026-08-08**.
- **Constat mesuré** : `prefix_and_default` rendait la locale par défaut accessible à `/` **et** `/fr/`, générant **75 pages `/fr/**`** en doublon auto-canonique (33 doublons directs + 42 fantômes `/fr/en/`). Sur GitHub Pages, aucun 301 n'est possible : ces pages ne pouvaient qu'être purgées après build.
- **Mesure de la bascule**, faite avant de décider : l'espace d'URL généré est **strictement identique** — 138 pages avant, 138 après, `diff` des chemins **vide** ; sitemap identique à la prod au `<loc>` près ; canonical et hreflang inchangés sur `/a-propos/` et `/en/about/` ; **60/60** e2e verts. Les pages `/fr/**` générées passent de 75 à **0**.
- **Conclusion** : le préfixe de la locale par défaut ne produisait **que** des doublons. Aucun bénéfice de `prefix_and_default` sur un hébergeur statique n'a été identifié — l'hébergement statique est au contraire ce qui rend ce réglage coûteux, puisqu'il interdit de rediriger les doublons.
- **Périmètre livré** : une ligne de `nuxt.config.ts`, plus le `CLAUDE.md` du repo qui annonçait déjà `prefix_except_default` (la config avait dérivé du doc, pas l'inverse) — désormais assorti d'un avertissement explicite de ne pas y revenir.
- **Reste purgé après build** : les **42** pages `/en/en/**`, qui viennent des stubs `routeRules` et sont indépendantes de la `strategy`. `postbuild-prune.mjs` reste donc nécessaire.
- **Risque contrôlé** : avec `detectBrowserLanguage.redirectOn: 'root'`, un rebond de `/` vers `/fr/` atterrirait sur le 404 qu'on vient de créer — sur l'URL la plus visitée du site. Vérifié sur la prod : `fr-FR` reste sur `/`, `en-US` part sur `/en`, `de-DE` retombe sur `/`. Verrouillé par un test e2e (`phantom-routes.spec.ts`).
- **Effet SEO attendu** : **aucun** en soi — l'espace d'URL servi ne change pas. C'est une action de **prévention** : sans elle, chaque build régénère 75 doublons que seule la purge post-build empêche d'être publiés. Ne pas chercher de verdict GSC pour cette entrée.
