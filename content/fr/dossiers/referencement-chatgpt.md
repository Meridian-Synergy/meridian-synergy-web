---
title: "Référencement ChatGPT : ce qui marche, mesuré"
description: "Comment ChatGPT choisit ses sources, ce qui rend un site invisible pour lui, et quels chiffres circulant sur le sujet ne valent rien."
metaTitle: "Référencement ChatGPT : le mesuré"
kind: "dossier"
order: 4
translationKey: "chatgpt-visibility"
publishedAt: "2026-08-21"
updatedAt: "2026-08-21"
seo:
  keywords:
    - "référencement ChatGPT"
    - "être référencé sur ChatGPT"
    - "SEO IA"
    - "visibilité dans les IA"
    - "apparaître dans ChatGPT"
sources:
  - label: "Vercel & MERJ — The rise of the AI crawler"
    url: "https://vercel.com/blog/the-rise-of-the-ai-crawler"
  - label: "OpenAI — Overview of OpenAI crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - label: "Google — AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - label: "Search Engine Land — Does llms.txt matter ?"
    url: "https://searchengineland.com/does-llms-txt-matter-467740"
  - label: "Search Engine Land — Inside ChatGPT's retrieval stack"
    url: "https://searchengineland.com/chatgpt-retrieval-stack-index-cache-pages-485036"
    date: "2026"
---

Le sujet est jeune, et la quantité d'affirmations y dépasse largement la quantité
de mesures. Ce dossier ne dit que ce qui se vérifie, et signale explicitement ce
qui ne se vérifie pas — y compris quand cela contredit les pages les mieux
classées sur la question.

## Comment ChatGPT choisit-il ses sources ?

Il faut d'abord séparer deux mécanismes qu'on confond constamment.

**La mémoire d'entraînement.** Le modèle a lu le web à un instant donné. Il peut
citer votre entreprise sans jamais consulter votre site. C'est la position la plus
fragile qui soit : elle ne se met pas à jour, elle ne dépend pas de vous, et elle
disparaît au modèle suivant.

**La récupération.** Quand la question l'exige, ChatGPT va chercher des pages et
répond en s'appuyant dessus. C'est là seulement que votre site travaille, et c'est
la seule moitié sur laquelle vous avez prise.

La conséquence pratique est contre-intuitive : **une marque peut être citée sans
que son domaine ne soit jamais récupéré**. Un audit sérieux distingue les deux ;
la plupart des discours commerciaux les mélangent.

## Faut-il être présent dans Bing ?

C'est la question sur laquelle presque toutes les pages françaises tranchent trop
vite, dans un sens ou dans l'autre.

À l'origine, la recherche de ChatGPT s'appuyait sur l'index de Bing. Depuis,
OpenAI exploite **son propre robot et son propre index**, et s'y ajoutent des
accords avec des éditeurs. La lecture défendable aujourd'hui est celle d'un
**assemblage** : la dépendance à Bing s'est **desserrée sans disparaître**.

Ce qu'il faut en retenir, concrètement : déclarer son site dans les outils pour
webmasters de Bing reste utile et coûte une demi-heure, mais ce n'est plus le
levier unique qu'on décrivait en 2024. Une page qui vous vend « l'optimisation
Bing » comme la clé du référencement ChatGPT vend une architecture qui a changé.

## Pourquoi un site bien classé sur Google peut-il être invisible pour ChatGPT ?

Voici le point technique le plus important du dossier, et le seul qui soit
franchement binaire.

**Les robots d'IA n'exécutent pas le JavaScript.** L'analyse conjointe de Vercel
et MERJ, portant sur **plus de 500 millions de requêtes de GPTBot**, n'a trouvé
**aucune trace d'exécution**. Le robot télécharge parfois les fichiers JavaScript
— environ 11,5 % des requêtes — mais ne les exécute jamais. Le constat s'étend à
`ClaudeBot` et `PerplexityBot`.

L'exception est Gemini, qui hérite de l'infrastructure de rendu de Googlebot.

La conséquence est brutale : si le contenu de vos pages n'apparaît qu'une fois le
JavaScript exécuté — un catalogue chargé par appel d'API, des tarifs affichés
après coup, un accordéon dont le contenu n'est monté qu'à l'ouverture — votre
site peut se classer normalement sur Google, dont le robot sait faire le rendu, et
être **une page blanche** pour ChatGPT, Claude et Perplexity.

C'est vérifiable en une commande, sans outil payant : demander la page en se
présentant comme `GPTBot`, retirer les scripts et les balises, compter les
caractères restants. Un chiffre proche de zéro signifie invisible.

## Faut-il créer un fichier `llms.txt` ?

**Non.** Et c'est là que ce dossier contredit frontalement les pages les mieux
classées sur la requête, dont plusieurs le recommandent encore.

Les mesures disponibles sont convergentes et sévères. Sur **plus de 500 millions
de visites de robots d'IA** observées sur 90 jours, **408** ont visé un fichier
`llms.txt`. Ahrefs, sur 137 000 sites, constate que **97 % de ces fichiers n'ont
reçu aucun trafic**. SE Ranking mesure environ **10 % d'adoption** sur 300 000
domaines : un site sur dix l'a posé, et personne ne le lit. Aucun grand
fournisseur — OpenAI, Google, Anthropic, Meta, Mistral — ne s'est engagé à le
prendre en compte, et John Mueller l'a publiquement comparé à la balise
`meta keywords`.

Ce qui fonctionne à la place est plus banal, et c'est précisément pourquoi on le
vend mal : **une page normale**, servie en HTML lisible sans JavaScript, déclarée
au plan du site, et liée depuis le reste du site. Le fichier que personne ne lit
devient alors une URL que tous les robots lisent.

## Que valent les pourcentages qu'on lit partout ?

Peu de chose, et il faut savoir lire ce qui les produit.

Le sujet est envahi de chiffres d'apparence précise — tel facteur pèserait 55 %
de la probabilité de citation, tel autre 14 %. Ils viennent presque toujours
**d'éditeurs d'outils**, qui ont un intérêt commercial direct à démontrer que tout
a changé et qu'un abonnement s'impose. Certains ne sont crédités à aucune source.

Le plus révélateur est qu'une des pages les mieux classées sur cette requête écrit
elle-même que ces pourcentages « ne reposent sur aucune étude publique
vérifiable » — dans un article qui en cite un. Ce n'est pas de la malhonnêteté,
c'est la difficulté réelle du sujet : il faut bien écrire quelque chose, et la
mesure indépendante n'existe pas encore.

La règle que j'applique, et que vous pouvez appliquer sans être technique : avant
d'accepter un chiffre sur ce sujet, demandez **qui l'a produit** et **ce qu'il
vend**. Les faits robustes de ce dossier — l'absence d'exécution du JavaScript,
l'inertie de `llms.txt`, l'indépendance des agents — proviennent d'analyses de
journaux serveur et de documentations d'éditeurs, pas d'études marketing.

## Que peut-on réellement mesurer, et que ne peut-on pas ?

Deux questions différentes, et une seule est à votre portée sans abonnement.

**« Suis-je cité ? »** — interroger les modèles des dizaines de fois, moteur par
moteur, coûte cher et se mesure avec un outil dédié. Et il n'existe **pas** de
classement unique : le même site peut être très visible sur l'un et absent d'un
autre. Toute métrique agrégée sur « les IA » est trompeuse.

**« Puis-je l'être ? »** — cela se vérifie gratuitement, et c'est la moitié qui
donne des actions plutôt qu'un constat : texte réellement servi aux robots, agents
nommés dans `robots.txt`, données structurées cohérentes, page de référence
canonique, plan du site à jour.

Un point que presque personne ne dit : **deux agents nommés n'obéissent pas à
`robots.txt`**. OpenAI écrit que ses règles « may not apply » à `ChatGPT-User`, et
Perplexity que `Perplexity-User` ignore généralement le fichier — dans les deux
cas parce qu'une personne a déclenché la requête. Les déclarer reste utile, mais
c'est une intention, pas un contrôle.

Et un piège coûteux : beaucoup de sites ont bloqué les robots d'entraînement en
2023 et 2024 pour protéger leur contenu, et se sont exclus au passage de la
**citation**. Ce ne sont pas les mêmes agents, et OpenAI précise que chaque
réglage est indépendant des autres. Un `Disallow` posé sous `User-agent: *` les
bloque tous.

## Par où commencer ?

Par la mesure du texte servi sans JavaScript. Elle est gratuite, elle prend une
minute, et elle est binaire : tant qu'elle échoue, tout le reste est décoratif.

Ensuite par `robots.txt`, en nommant explicitement les agents de recherche pour
que l'intention survive au prochain remaniement.

C'est ce que contient le diagnostic que je produis — et il dit si vous **pouvez**
être cité, jamais si vous **l'êtes**. Quiconque vous promet la seconde mesure
gratuitement ne l'a pas faite.
