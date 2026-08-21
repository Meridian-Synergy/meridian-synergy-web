---
title: "Mon site n'apparaît pas sur Google : que faire ?"
description: "Les causes réelles, dans l'ordre où il faut les vérifier — et le cas devenu fréquent du site invisible des IA."
metaTitle: "Site invisible sur Google : que faire"
kind: "guide"
translationKey: "not-showing-on-google"
order: 2
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "mon site n'apparaît pas sur google"
    - "site invisible sur google"
    - "site non référencé"
    - "être référencé sur ChatGPT"
    - "référencement IA"
---

Il y a deux situations derrière cette phrase, et elles n'ont ni la même cause ni
la même urgence.

**Le site n'a jamais apparu.** C'est presque toujours technique, et c'est
généralement réparable en peu de temps.

**Le site apparaissait, et n'apparaît plus.** C'est un accident, et il a une date.
Trouver cette date est le premier travail, parce qu'elle désigne le coupable :
une refonte, un changement d'hébergement, une mise à jour.

## Comment vérifier en trente secondes si vous êtes indexé ?

Tapez dans Google `site:` suivi de votre adresse, sans espace — par exemple
`site:mon-entreprise.fr`. Vous obtenez la liste des pages que Google connaît.

Aucun résultat signifie que Google n'a **rien** enregistré : le problème est
l'indexation, pas le classement. Quelques résultats seulement, alors que votre
site en compte davantage, veut dire qu'une partie est bloquée. Toutes vos pages
présentes, mais introuvables sur vos mots-clés : c'est un problème de
positionnement, un tout autre sujet et un tout autre calendrier.

Cette distinction est essentielle. Elle sépare un problème réparable en une
journée d'un travail qui se compte en mois.

## Les causes réelles, dans l'ordre de vérification

**Le site interdit l'indexation.** Une case cochée pendant la construction et
jamais décochée à la mise en ligne — c'est la cause la plus fréquente, et la plus
facile à corriger. Un fichier `robots.txt` mal réglé ou une balise `noindex`
oubliée produisent le même effet.

**Le site est trop récent.** Quelques jours à quelques semaines sont normaux. Rien
ne le raccourcit vraiment, sinon déclarer le site dans la Search Console de
Google et fournir un plan du site.

**Le contenu n'apparaît qu'après exécution du JavaScript.** Le robot voit une page
vide. Fréquent sur les sites construits avec des outils modernes et sur beaucoup
de sites générés automatiquement.

**Le contenu est trop mince ou dupliqué.** Trois pages de texte générique
n'apportent rien que Google n'ait déjà. Il les enregistre parfois, et ne les
montre jamais.

**Vous cherchez le mauvais mot.** Beaucoup de dirigeants testent leur nom
commercial, que personne d'autre ne tape. Ce n'est pas un problème de
référencement, c'est un problème de notoriété.

## Et si c'est votre entreprise, et non votre site, qui n'apparaît pas ?

Le cas est différent et très répandu. Quand un client cherche votre métier suivi
de votre ville, ce qui s'affiche en premier n'est pas un site : c'est la carte,
avec des fiches d'établissement.

Si vous n'avez pas de fiche, vous êtes absent de cette zone quoi que fasse votre
site. Si vous en avez une mais que la **catégorie principale** est mal choisie,
vous êtes absent des recherches qui comptent — une menuiserie classée « magasin de
meubles » ne sort pas sur « menuisier ».

C'est gratuit, c'est rapide, et pour une activité de proximité ça pèse souvent
plus que le site lui-même.

## Le cas devenu fréquent : invisible des IA

Une deuxième invisibilité s'est ajoutée, et presque personne ne la mesure.

De plus en plus de gens ne cherchent plus dans une liste de liens : ils posent
leur question à ChatGPT, à Perplexity, ou lisent le résumé que Google affiche
au-dessus des résultats. Y être cité n'obéit pas tout à fait aux mêmes règles.

Le point technique est simple et brutal : **les robots des IA n'exécutent pas le
JavaScript**. Une analyse portant sur plus de 500 millions de requêtes de ces
robots n'a trouvé aucune trace d'exécution. Un site dont le contenu s'affiche
après le chargement peut donc se classer normalement sur Google — dont le robot,
lui, sait le faire — et être **une page blanche** pour ChatGPT, Claude et
Perplexity.

Deuxième point, contre-intuitif : beaucoup de sites ont bloqué les robots d'IA en
2023 et 2024 pour protéger leur contenu, et se sont exclus au passage des
**citations**. Ce ne sont pas les mêmes robots qui entraînent les modèles et qui
vont chercher une réponse ; les bloquer d'un même geste revient à refuser d'être
recommandé.

Et une chose qui ne sert à rien, malgré ce qu'on lit : le fichier `llms.txt`. Sur
plus de 500 millions de visites de robots d'IA observées en 90 jours, 408
seulement l'ont demandé, et aucun fournisseur majeur ne s'engage à le lire. Ce qui
fonctionne est plus banal : une page normale, servie en HTML lisible sans
JavaScript, déclarée au plan du site.

Le sujet a sa propre analyse, chiffres et sources à l'appui : [référencement
ChatGPT, ce qui marche et ce qui ne marche pas](/dossiers/referencement-chatgpt/).

## Par où commencer ?

Par la vérification `site:`, qui prend trente secondes et oriente tout le reste.
Puis par la fiche d'établissement si votre clientèle est locale.

Si vous voulez savoir précisément ce que voient les moteurs — et ce que voient les
IA, ce que presque aucun outil ne mesure — c'est ce que contient le diagnostic que
je produis. Il est offert et repose sur des mesures, pas sur des impressions.
