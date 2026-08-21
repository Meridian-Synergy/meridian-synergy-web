---
title: "Obsolescence informatique : ce qu'elle vous coûte"
description: "Une fin de support ne casse rien le jour venu. Elle transforme votre parc en surface d'attaque, sur une échéance subie."
metaTitle: "Gérer l'obsolescence informatique"
kind: "dossier"
translationKey: "it-obsolescence"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "obsolescence informatique"
    - "gestion de l'obsolescence informatique"
    - "fin de support logiciel"
    - "plan de maintien en condition de sécurité"
    - "NIS2 obsolescence"
sources:
  - label: "ANSSI / CERT-FR — Panorama de la cybermenace 2025"
    url: "https://www.cert.ssi.gouv.fr/uploads/CERTFR-2026-CTI-002.pdf"
    date: "2026"
  - label: "Verizon — 2026 Data Breach Investigations Report"
    url: "https://www.verizon.com/about/news/breach-industry-wide-dbir-finds"
    date: "2026"
  - label: "Microsoft — Windows 10 support has ended on October 14, 2025"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025"
    date: "2025"
  - label: "ANSSI — Cartographie du système d'information, guide d'élaboration en cinq étapes"
    url: "https://messervices.cyber.gouv.fr/documents-guides/20181213_anssi_guide_cartographie_v1b.pdf"
    date: "2018"
  - label: "MITRE ATT&CK — Campagne C0062"
    url: "https://attack.mitre.org/campaigns/C0062/"
    date: "2025"
---

L'obsolescence informatique est le seul risque majeur d'un système d'information qui
n'a **aucun symptôme**. Une application en fin de support fonctionne exactement comme la
veille. Elle continue à rendre le service attendu, sans ralentissement, sans message
d'erreur, parfois pendant des années.

C'est précisément ce qui la rend difficile à financer. Il n'y a pas d'incident à montrer,
donc pas d'urgence à invoquer — jusqu'au jour où c'en est une, et où il est trop tard pour
choisir son calendrier.

## Qu'est-ce que l'obsolescence informatique, exactement ?

Ce n'est ni une panne ni une lenteur : c'est la **fin de l'engagement de l'éditeur à
corriger les failles**. Le logiciel ne se dégrade pas ; c'est le monde autour de lui qui
continue d'avancer.

Il faut distinguer trois états, souvent confondus :

- **En support** — l'éditeur publie des correctifs de sécurité. C'est la seule situation
  saine.
- **Support étendu** — l'éditeur ne publie plus que les correctifs critiques, en général
  contre paiement et pour une durée bornée. C'est un sursis acheté, pas une solution.
- **Hors support** — plus aucun correctif. Chaque vulnérabilité publiée ensuite reste
  ouverte définitivement.

La bascule du premier au troisième état est une **date connue à l'avance**, souvent des
années. C'est ce qui rend l'obsolescence différente de tous les autres risques : c'est le
seul qu'on puisse planifier avec certitude, et c'est celui qu'on planifie le moins.

## Pourquoi l'obsolescence est-elle devenue le premier risque cyber ?

Parce que les attaquants ont changé de porte d'entrée.

Pour la **première fois en dix-neuf ans** d'existence du rapport, l'édition 2026 du *Data
Breach Investigations Report* de Verizon place l'**exploitation de vulnérabilités au
premier rang des vecteurs d'accès initial, avec 31 % des compromissions** — devant le vol
d'identifiants, qui dominait jusque-là. Le même rapport note que l'IA côté attaquant
réduit la fenêtre de défense « de plusieurs mois à quelques heures ».

Les chiffres de l'ANSSI décrivent la même mécanique côté français : le rythme de
publication des vulnérabilités croît de **18 % par an depuis 2020**, et **environ 29 %**
de celles exploitées en 2025 l'ont été **le jour même de leur publication, ou avant**.

Mettez les deux bouts ensemble. D'un côté, un délai de correction qui se compte en
semaines. De l'autre, une exploitation qui se compte en heures. Un parc à jour absorbe
cet écart parce qu'il n'a qu'à appliquer un correctif. Un parc obsolète ne le peut pas :
**il n'existe pas de correctif à appliquer.**

Ajoutez que l'automatisation est désormais des deux côtés : la campagne **C0062**
référencée dans MITRE ATT&CK, documentée fin 2025, a visé une trentaine d'organisations
avec **80 à 90 % des opérations conduites de façon autonome** par un agent. Un balayage
automatisé ne fait aucune différence entre une grande entreprise et une PME : il cherche
une version.

## Combien de temps avez-vous après une fin de support ?

Moins que vous ne le croyez, et le cas le plus documenté le montre bien. Le support de
**Windows 10 a pris fin le 14 octobre 2025** : Microsoft indique qu'à cette date,
l'assistance technique, les mises à jour de fonctionnalités et **les mises à jour de
sécurité** cessent. Le programme de mises à jour de sécurité étendues grand public,
lui, court **jusqu'au 12 octobre 2027**.

Cette seconde date est le vrai piège. Elle donne le sentiment d'un délai confortable,
alors qu'elle ne couvre que les correctifs jugés critiques, sans assistance ni correction
fonctionnelle. Elle achète du temps pour migrer, pas pour attendre. Et le jour où elle
tombe, il n'y a plus de filet du tout.

## Que change la réglementation ?

Elle déplace la charge, dans les deux sens.

**NIS2** élargit le périmètre réglementaire français d'environ 500 entités à une quinzaine
de milliers, avec des plafonds de sanction fixés par la directive à **10 M€ ou 2 % du
chiffre d'affaires mondial** pour les entités essentielles, et une responsabilité portée
explicitement par l'organe de direction. Au moment où j'écris, la loi de transposition
française n'est pas encore promulguée : l'échéance arrive, elle n'est pas passée.

**Le règlement sur la cyberrésilience** agit sur vos fournisseurs. L'ANSSI rappelle qu'à
compter du **11 décembre 2027**, les fabricants de produits comportant des éléments
numériques devront notamment recenser et documenter les composants de leurs produits,
corriger sans retard les vulnérabilités, et **diffuser sans retard les correctifs**. Bonne
nouvelle à moyen terme : le marché deviendra plus sain. Conséquence immédiate en
revanche, un produit dont le fournisseur ne peut pas tenir ces obligations deviendra un
problème de conformité, pas seulement un problème technique.

## Comment construire un plan de gestion de l'obsolescence ?

En quatre temps, dont aucun n'est technique au départ.

1. **Inventorier.** Ce qui tourne, sa version, et sa date de fin de support. Cette
   troisième colonne est celle qui manque partout, et c'est la seule qui transforme
   l'inquiétude en calendrier.
2. **Cartographier les dépendances.** Une brique en fin de support n'est pas un problème
   isolé : elle porte des applications. C'est le nombre d'applications portées qui donne
   la priorité, pas l'ancienneté de la brique.
3. **Échéancer.** Chaque élément reçoit une date de sortie, alignée sur sa fin de support
   réelle et non sur la disponibilité des équipes. Un plan qui ne comporte pas de dates
   n'est pas un plan.
4. **Décommissionner.** Une migration qui laisse l'ancien système allumé « au cas où » n'a
   rien résolu : elle a doublé la surface d'attaque. L'extinction fait partie du lot.

Les deux premières étapes sont volumineuses, répétitives et vérifiables — c'est
exactement le profil de travail où l'assistance par l'IA fait chuter le coût unitaire, et
c'est pour cela qu'un plan d'obsolescence est devenu finançable alors qu'il ne l'était pas
il y a trois ans.

## Par où commencer ?

Par la colonne « fin de support » de votre inventaire. Si elle n'existe pas, tout le
reste est de l'opinion.

Elle se remplit vite, elle ne demande aucun outil, et elle produit immédiatement la seule
liste qui compte : ce qui est **exposé sur Internet et déjà hors support**. Cette liste
est courte, elle est urgente, et elle se traite indépendamment du reste du programme.
