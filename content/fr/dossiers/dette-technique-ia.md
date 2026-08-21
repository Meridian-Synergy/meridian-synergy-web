---
title: "Dette technique et IA : solder enfin le legacy"
description: "L'IA rend la reprise du legacy abordable — à condition de savoir où elle rend et où elle coûte. Analyse chiffrée."
metaTitle: "Dette technique : ce que l'IA change"
kind: "dossier"
translationKey: "tech-debt-ai"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "dette technique IA"
    - "réduire la dette technique"
    - "modernisation legacy"
    - "obsolescence système d'information"
    - "architecture d'entreprise"
sources:
  - label: "McKinsey — Tech debt: reclaiming tech equity"
    url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-debt-reclaiming-tech-equity"
  - label: "Verizon — 2026 Data Breach Investigations Report"
    url: "https://www.verizon.com/about/news/breach-industry-wide-dbir-finds"
    date: "2026"
  - label: "ANSSI / CERT-FR — Panorama de la cybermenace 2025"
    url: "https://www.cert.ssi.gouv.fr/uploads/CERTFR-2026-CTI-002.pdf"
    date: "2026"
  - label: "Google Research — How is Google using AI for internal code migrations?"
    url: "https://arxiv.org/abs/2501.06972"
    date: "2025"
  - label: "METR — Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
    date: "2025"
  - label: "DORA — State of AI-assisted Software Development 2025"
    url: "https://dora.dev/dora-report-2025/"
    date: "2025"
  - label: "MITRE ATT&CK — Campagne C0062"
    url: "https://attack.mitre.org/campaigns/C0062/"
    date: "2025"
---

On m'a présenté l'intelligence artificielle, ces deux dernières années, à peu près
toujours de la même façon : un levier de productivité, donc un levier d'effectifs.
C'est passer à côté de ce qu'elle rend possible dans un système d'information.

L'IA ne remplace pas une équipe. Elle rend abordable un travail qui ne l'était pas :
reprendre méthodiquement des couches logicielles anciennes, les documenter, les tester,
les remettre à niveau. Autrement dit, **solder une dette technique** que la plupart des
DSI traînent depuis dix ou quinze ans faute d'avoir jamais pu justifier la dépense.

## Ce que la dette coûte, mesuré

Le chiffre le plus parlant vient des DSI eux-mêmes. Interrogés par McKinsey, ils
estiment leur dette technique à **20 à 40 % de la valeur de l'ensemble de leur parc
technologique**, avant amortissement. Sur un grand groupe, cela se compte en centaines
de millions.

Le second chiffre est plus douloureux, parce qu'il décrit un mécanisme d'étouffement :
**30 % des DSI interrogés estiment que plus de 20 % du budget officiellement affecté
aux nouveaux produits** part en réalité à traiter des problèmes de dette. On finance de
l'innovation, on paie des intérêts. Et **60 %** constatent que leur dette a
sensiblement augmenté sur les trois dernières années.

C'est la définition même d'un cercle vicieux : la dette consomme la capacité qui
permettrait de la rembourser.

## Pourquoi quinze ans de plans de modernisation ont échoué

Aucun DSI n'ignore le problème. Ce n'est pas un défaut de lucidité, c'est un défaut
d'arbitrage — et l'arbitrage était rationnel.

Reprendre du legacy, c'est un travail massif, répétitif, peu gratifiant, au bénéfice
différé et difficile à défendre devant un comité de direction. Monter une application
de version majeure, réécrire des tests absents, reconstituer une documentation perdue,
retirer une dépendance morte : chaque tâche est simple, il y en a des milliers, et
personne ne veut les financer. Face à une demande métier qui, elle, se voit, la
modernisation perd toujours l'arbitrage. C'est ce qui explique qu'on ait
collectivement échoué, année après année, sur un sujet que tout le monde avait
correctement identifié.

Ce qui change aujourd'hui, ce n'est pas notre lucidité. C'est le **coût unitaire** de
ce travail répétitif.

## Ce que l'IA change réellement

Deux retours d'expérience à grande échelle, publiés et documentés, donnent la mesure.

**Amazon.** En annonçant les résultats de son assistant de transformation de code,
Andy Jassy indique que la durée moyenne de montée d'une application vers Java 17 est
passée d'environ **50 jours-homme à quelques heures**, pour un total de **4 500
années-développeur** économisées et environ **260 millions de dollars** de gains
d'efficacité annualisés. C'est une communication d'entreprise, pas une étude
indépendante — mais l'ordre de grandeur et la nature de la tâche sont vérifiables.

**Google.** Le retour d'expérience publié par ses équipes de recherche est plus
sobre et plus intéressant méthodologiquement : sur **39 migrations internes** conduites
par trois développeurs pendant douze mois, **74 % des modifications de code** ont été
générées par le modèle, et les développeurs estiment le temps total réduit
d'**environ moitié** par rapport aux migrations manuelles antérieures.

Retenez la nature de ces tâches : ce sont des travaux **codifiés, répétitifs et
vérifiables**. Une montée de version, une migration d'API, un remplacement de
bibliothèque. Le critère de réussite est binaire, et le résultat se teste. C'est
exactement la zone où l'IA produit sa valeur — et ce n'est pas un hasard si les deux
entreprises qui publient ces chiffres l'ont appliquée là, et pas ailleurs.

## Ce qu'elle ne change pas — et que peu de gens écrivent

C'est la partie qui manque à la plupart des articles sur le sujet, et c'est celle qui
détermine si votre programme réussira.

**L'IA peut vous ralentir.** METR a conduit un essai contrôlé randomisé auprès de
développeurs expérimentés, sur **leurs propres dépôts**, matures et bien connus d'eux.
Résultat : avec les outils d'IA autorisés, ils ont été **19 % plus lents**. Le plus
instructif n'est pas le chiffre, c'est l'écart de perception : ils anticipaient un gain
de 24 %, et après coup ils croyaient encore avoir gagné 20 %. **Sur un terrain complexe
et déjà maîtrisé, l'IA coûte du temps tout en donnant le sentiment d'en faire gagner.**
Aucun pilotage au ressenti ne peut donc fonctionner ici.

**L'IA amplifie, elle ne répare pas.** C'est la conclusion centrale du rapport DORA
2025, construit sur près de 5 000 réponses : l'IA n'améliore pas une organisation, elle
**amplifie ce qui s'y trouve déjà**. Une équipe solide en tire un effet de levier ; une
équipe sans tests, sans revue et sans architecture y gagne surtout la capacité de
produire ses défauts plus vite.

La conséquence pratique est simple à formuler, et c'est tout le sujet d'une mission
d'architecture : **avant d'accélérer, il faut savoir sur quoi on accélère.** Un legacy
sans cartographie, sans tests de non-régression et sans critère de sortie ne se traite
pas mieux avec l'IA — il se dégrade plus vite. On remplace alors une vieille dette par
une dette neuve, produite plus vite et moins comprise.

## L'échéance n'est plus la vôtre

Jusqu'ici, moderniser était un choix : le calendrier vous appartenait. Ce n'est plus
vrai, et c'est le vrai changement de 2026.

Pour la **première fois en dix-neuf ans d'existence du rapport**, l'édition 2026 du
*Data Breach Investigations Report* de Verizon place l'**exploitation de vulnérabilités
au premier rang des vecteurs d'accès initial, avec 31 % des compromissions** — devant
le vol d'identifiants, qui dominait jusque-là. Le même rapport note que l'IA côté
attaquant réduit la fenêtre de défense « de plusieurs mois à quelques heures ».

Les chiffres français de l'ANSSI, dans son *Panorama de la cybermenace 2025*,
décrivent la même tenaille :

- le rythme de publication des vulnérabilités croît de **18 % par an depuis 2020** ;
- **environ 29 %** des vulnérabilités exploitées en 2025 l'ont été **le jour même de
  leur publication, ou avant** ;
- et surtout : **plus de 6 200 actifs en France restaient affectés, fin 2025, par les
  principales vulnérabilités exploitées depuis 2023 et 2024.**

Ce dernier point mérite qu'on s'y arrête. Il ne s'agit pas de failles inconnues ni de
menaces sophistiquées : ce sont des vulnérabilités publiées, corrigées par l'éditeur,
documentées par le CERT-FR — et toujours ouvertes deux ans après. Ce n'est pas un
problème de sécurité, c'est un problème de **capacité à faire évoluer son parc**.
C'est-à-dire un problème de dette technique.

Ajoutez que l'automatisation est désormais des deux côtés. La campagne référencée
**C0062** dans MITRE ATT&CK, documentée fin 2025, a visé une trentaine
d'organisations avec **80 à 90 % des opérations conduites de façon autonome** par un
agent : reconnaissance, exploitation, collecte d'identifiants, latéralisation. Un
attaquant qui industrialise face à un défenseur qui corrige à la main : l'écart ne se
comble pas par de l'effort, il se comble par de l'outillage.

Enfin, la contrainte devient personnelle pour les dirigeants. La directive **NIS2**
étend le périmètre réglementaire français d'environ 500 entités à une quinzaine de
milliers, avec des plafonds de sanction fixés par la directive à **10 M€ ou 2 % du
chiffre d'affaires mondial** pour les entités essentielles, et une responsabilité
explicitement portée par l'organe de direction. Au moment où j'écris ces lignes, la loi
de transposition française n'est pas encore promulguée : l'échéance n'est pas passée,
elle arrive.

## La méthode

Un programme de reprise du legacy assisté par l'IA ne commence pas par l'IA. Il
commence par ce qui rend l'IA utilisable.

1. **Inventaire.** Ce qui tourne, ce qui est encore supporté par son éditeur, ce qui
   est exposé sur Internet, ce dont plus personne ne connaît le propriétaire. C'est le
   seul livrable dont la valeur soit immédiate, même si le programme s'arrête là.
2. **Cartographie applicative.** Les dépendances réelles, pas celles du schéma d'il y
   a cinq ans. Sans elle, aucun lot n'est isolable, et sans lot isolable il n'y a pas
   de reprise possible.
3. **Découpage en lots vérifiables.** Un lot se qualifie sur trois critères : le
   travail est **répétitif**, le résultat attendu est **explicite**, et il existe un
   **test qui prouve** que rien n'a cassé. Les trois, ou le lot ne part pas à l'IA.
4. **Filet de sécurité d'abord.** Avant toute transformation : tests de
   non-régression, référence de comportement, capacité à revenir en arrière. C'est le
   poste qui décide de tout le reste — et c'est aussi, aujourd'hui, un poste
   largement automatisable.
5. **Transformation assistée, revue humaine.** Le modèle produit, l'ingénieur arbitre.
   Le taux de reprise sans modification se mesure et se suit ; il ne se suppose pas.
6. **Décommissionnement.** Une modernisation qui n'éteint rien n'a rien remboursé :
   elle a ajouté une couche. La sortie du service ancien fait partie du lot, pas de la
   phase suivante.

Les étapes 1 et 2 ne sont pas des préliminaires administratifs : ce sont elles qui
déterminent si les étapes 3 à 6 produiront un gain ou une dette neuve.

## Ce que je peux prouver

Je ne vends pas une capacité théorique. Waypoint360 est une plateforme SaaS que j'ai
conçue, développée et que j'exploite : socle d'authentification, facturation,
migrations de base de données, chaîne de livraison continue, système de conception
partagé entre plusieurs applications, internationalisation à grande échelle. Les
arbitrages décrits ici, je les tiens sur un système en production, pas sur des
transparents.

C'est la même exigence que j'applique à ce dossier : chaque chiffre cité renvoie à sa
source, et les sources sont datées. Sur un sujet où l'approximation circule vite, c'est
le minimum qu'on doive à un décideur qui engage un budget.

## Par où commencer

Par l'inventaire, toujours. Il est court, il ne coûte presque rien, et il produit deux
choses : la liste de ce qui est exposé et non maintenu — la partie qui relève de
l'urgence — et la liste des lots répétitifs et testables, la partie où l'IA rendra
immédiatement.

Si vous voulez en parler concrètement, l'entrée la plus utile est un état des lieux sur
votre parc réel.
