---
title: "Cartographie applicative : ce qu'elle doit contenir"
description: "Sans carte, aucun lot n'est isolable et aucune dette n'est remboursable. Ce que l'ANSSI demande, et ce qui la fait mourir."
metaTitle: "Cartographie applicative du SI"
kind: "dossier"
order: 2
translationKey: "application-mapping"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "cartographie applicative"
    - "cartographie applicative du SI"
    - "cartographie des applications informatiques"
    - "cartographie fonctionnelle du SI"
    - "inventaire du système d'information"
sources:
  - label: "ANSSI — Cartographie du système d'information, guide d'élaboration en cinq étapes (v1b)"
    url: "https://messervices.cyber.gouv.fr/documents-guides/20181213_anssi_guide_cartographie_v1b.pdf"
    date: "2018"
  - label: "ANSSI / CERT-FR — Panorama de la cybermenace 2025"
    url: "https://www.cert.ssi.gouv.fr/uploads/CERTFR-2026-CTI-002.pdf"
    date: "2026"
  - label: "McKinsey — Tech debt: reclaiming tech equity"
    url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-debt-reclaiming-tech-equity"
---

La cartographie applicative a mauvaise réputation, et elle l'a méritée. Trop de DSI
gardent le souvenir d'un chantier de six mois qui a produit un beau document, périmé
avant d'être diffusé, que plus personne n'a ouvert.

C'est pourtant le seul livrable dont tout le reste dépend. On ne rembourse pas une dette
technique qu'on n'a pas localisée, on ne découpe pas en lots un système dont on ignore
les dépendances, et on ne corrige pas en urgence un actif dont personne ne connaît le
propriétaire. La question n'est donc pas de savoir s'il faut une carte, mais **pourquoi
les précédentes sont mortes**.

## À quoi sert une cartographie applicative ?

À trois choses, et il faut les distinguer parce qu'elles n'exigent pas le même niveau de
détail.

**Décider.** Savoir ce qui existe, ce qui coûte, ce qui est redondant. C'est l'usage qui
justifie le budget, et celui qui demande le moins de précision technique.

**Isoler.** Un lot de modernisation ne se découpe que si l'on connaît ce qui appelle
quoi. C'est là que la carte devient un outil d'ingénierie et non un support de
présentation.

**Réagir.** Quand une vulnérabilité est publiée, la seule question qui compte est :
« sommes-nous exposés, et où ? ». Le *Panorama de la cybermenace 2025* de l'ANSSI relève
que **plus de 6 200 actifs en France restaient affectés fin 2025** par les principales
vulnérabilités exploitées depuis 2023 et 2024. Ce ne sont pas des failles inconnues : ce
sont des correctifs disponibles, sur des machines que personne n'a su rattacher à un
propriétaire.

## Que doit contenir une cartographie, concrètement ?

L'ANSSI a publié un guide d'élaboration en cinq étapes qui fait référence en France, et
il a le mérite de trancher la question du contenu. Une cartographie s'y compose de
**trois visions allant progressivement du métier vers la technique**, déclinées en six
vues :

- **Vision métier** — la *vue de l'écosystème*, qui présente les entités et systèmes avec
  lesquels le SI interagit, et la *vue métier du système d'information*, qui le
  représente par ses processus et ses informations principales.
- **Vision applicative** — la *vue des applications*, qui décrit les composants
  logiciels, les services qu'ils offrent et les flux de données entre eux, et la *vue de
  l'administration*, qui répertorie les périmètres et niveaux de privilèges.
- **Vision infrastructure** — la *vue des infrastructures logiques* (cloisonnement,
  plages d'adresses, filtrage) et la *vue des infrastructures physiques*.

Deux remarques d'expérience sur cette liste. D'abord, la **vue de l'administration** est
celle qu'on oublie systématiquement, et c'est celle qui intéresse le plus un attaquant :
elle dit qui peut faire quoi, et donc quel compte vaut la peine d'être volé. Ensuite, ces
vues ne se valent pas en coût : la vision métier se construit en ateliers, la vision
infrastructure s'extrait d'outils. Vouloir les produire au même niveau de finesse est la
meilleure façon de ne jamais finir.

## Pourquoi les cartographies existantes sont-elles fausses ?

Parce qu'on a financé leur construction et pas leur entretien.

Une cartographie n'est pas un document, c'est un **état**. Elle décrit un système qui
change toutes les semaines : un serveur ajouté, une brique remplacée, un flux ouvert pour
dépanner et jamais refermé. Un document produit une fois est faux au premier changement,
et faux **en silence** — rien ne signale son écart au réel.

C'est ce qui rend le chantier différent aujourd'hui. Le travail d'inventaire, de
rapprochement de sources et de mise à jour est répétitif, volumineux et vérifiable :
exactement le profil de tâche où l'assistance par l'IA change le coût unitaire. Ce n'est
pas la construction de la carte qui devient abordable, c'est **son maintien**. Et c'était
le vrai obstacle.

## Faut-il un outil ou un tableur ?

Un tableur, pour commencer. Sans exception.

L'outil de cartographie résout un problème que vous n'avez pas encore : la
**représentation**. Votre problème du moment est la **collecte** — savoir ce qui tourne,
qui le possède, ce dont il dépend. Cela se fait dans un tableur, avec quelques colonnes
et une discipline de nommage.

Un outil devient utile quand deux conditions sont réunies : les données sont déjà
alimentées automatiquement depuis des sources qui font foi, et plusieurs équipes doivent
consulter la carte sans se marcher dessus. Acheter l'outil avant d'avoir les données,
c'est acheter un bel affichage de vide — et transformer un problème de gouvernance en
projet informatique.

## Combien de temps faut-il pour en produire une ?

Pour un premier inventaire exploitable sur un périmètre borné, comptez des semaines, pas
des mois. La durée ne dépend presque jamais de la technique : elle dépend du nombre de
personnes à interroger et de leur disponibilité.

Le piège est de vouloir cartographier tout le SI d'un coup. L'ANSSI recommande
explicitement de **définir le périmètre à cartographier** dès la première étape, et de se
donner une trajectoire. Une carte partielle et juste vaut infiniment mieux qu'une carte
complète et périmée.

## Où faut-il stocker la cartographie ?

Voici la recommandation la plus contre-intuitive du guide de l'ANSSI, et celle que
presque personne n'applique : **« la cartographie ne doit pas être stockée sur le système
d'information qu'elle représente »**. Le raisonnement est limpide — un attaquant qui
s'est infiltré y trouverait le plan complet de sa cible, avec les dépendances et les
privilèges.

Le guide recommande aussi d'en conserver une sauvegarde accessible **en cas de coupure
réseau**, une version papier à jour faisant l'affaire. C'est une précaution qui paraît
désuète jusqu'au jour d'une crise, où l'on découvre que le document décrivant comment
tout se rebranche est stocké dans ce qui est justement tombé.

## Quel est le lien avec la dette technique ?

Direct : la cartographie est ce qui rend la dette **chiffrable**. Tant qu'on ne sait pas
combien d'applications reposent sur une brique en fin de support, la dette reste une
inquiétude ; une fois la carte faite, elle devient une ligne budgétaire avec un périmètre
et une échéance.

C'est aussi ce qui protège de l'erreur inverse — moderniser ce qui se voit plutôt que ce
qui pèse. Sans carte, l'arbitrage se fait sur l'application dont l'utilisateur crie le
plus fort.
