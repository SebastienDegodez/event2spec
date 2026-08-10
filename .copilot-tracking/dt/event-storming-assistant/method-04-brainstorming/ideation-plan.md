# Method 04 — Plan d'idéation (lo-fi)

> Créé le 2026-08-04. Focus : **HMW6**.

## La question

> **Comment pourrions-nous livrer en quatre semaines quelque chose qui rende l'atelier de septembre meilleur que sans outil ?**

La barre n'est pas « un produit complet ». Elle est **« meilleur que sans outil »**. Toute idée se juge à cette aune, et à aucune autre.

## Contraintes du terrain de jeu

Elles ne sont pas des obstacles à contourner : elles sont le matériau créatif.

| Contrainte | Ce qu'elle rend possible |
|---|---|
| 4 semaines de développement | Force à trouver le geste minimal qui déplace la ligne |
| **Atelier sur 2 jours** | Il y a une nuit entre les deux : l'outil peut travailler hors séance |
| Atelier distanciel, 23 personnes | Tout le monde a un clavier — chose impossible autour d'un mur physique |
| Le coach agile anime sans connaître la méthode | Un simple rappel de notation au bon moment vaut plus qu'un moteur d'analyse |
| Les 2 devs doivent contribuer | La réussite se mesure à leur temps de parole, pas au nombre de post-its |
| Transcriptions markdown versionnées en Git | Le modèle peut vivre comme du code : diff, revue, historique |
| Traitement LLM externe non confirmé (A14) | Pousse vers une architecture agnostique, et vers des idées sans IA |
| `event2spec` existe | Un socle, ou un poids mort — à trancher |
| Plusieurs participants ont déjà pratiqué | Ils peuvent porter une partie du cadre sans outil |

## Perspectives à faire tourner

Générer depuis chaque point de vue, pas seulement depuis celui du produit.

1. **Le coach agile** — que lui manque-t-il exactement à 9h le jour J ?
2. **Les 2 développeurs praticiens** — qu'est-ce qui les libère vraiment ?
3. **L'expert métier dommage aux biens** — qu'est-ce qui le fait parler plutôt que se taire ?
4. **L'architecte** — que doit-il emporter pour rester engagé ?
5. **L'équipe qui construit** — qu'est-ce qui est réellement faisable en 4 semaines ?
6. **Le scénario sans IA** — et si le LLM externe est refusé, que reste-t-il ?

## Règles de la phase divergente

- **Des one-liners.** Pas de spécifications, pas d'architecture, pas de justification.
- **Aucune évaluation.** « C'est infaisable » est interdit jusqu'à la convergence.
- **Cible : 15 à 20 idées** avant de regrouper.
- **Viser 4 à 6 catégories différentes.** Vingt variantes de la même idée ne comptent que pour une.
- Les idées volontairement bêtes sont utiles : elles ouvrent des directions.

## Idées générées

> Phase divergente. Aucune évaluation à ce stade.

### A — Le cadre et le rythme

| # | Idée | Source |
|---|---|---|
| 1 | Des consignes de ce qui est attendu à chaque étape | PO |
| 2 | Un timing par étape, pour garantir un livrable à la fin des 2 jours | PO |
| 3 | Un déroulé pas-à-pas affiché à l'écran : où on en est, ce qu'on attend, temps restant | Coach |
| 4 | Un chrono par étape qui prévient tout seul à 5 minutes de la fin | Coach |
| 5 | Un agenda type pré-rempli pour un Event Storming de 2 jours, modifiable | Coach |
| 6 | Un état d'avancement visible : « étape 3 sur 8, on est en avance de 10 min » | Coach |

### B — Faire écrire tout le monde

| # | Idée |
|---|---|
| 7 | Chacun tape ses événements dans un champ, ils apparaissent en vrac sur le mur — brainstorming silencieux simultané |
| 8 | Un mode « tempête silencieuse » chronométré : 7 minutes, tout le monde écrit, personne ne parle |
| 9 | Un compteur public de contributions, pour rendre le silence visible |
| 10 | Signaler au coach les experts métier qui n'ont rien produit depuis 20 minutes |
| 11 | Vote par points pour trier les événements en vrac, sans discussion |

### C — Le gardien de la grammaire

| # | Idée |
|---|---|
| 12 | Validation à la frappe : « Commande payée » passe, « Payer la commande » déclenche « ça ressemble à une commande » |
| 13 | Quand tu poses un post-it, l'outil rappelle ce qui vient normalement après dans la grammaire |
| 14 | Contrôle de cohérence en fin d'étape : « 12 événements n'ont aucune commande associée » |
| 15 | La légende de la notation toujours à l'écran, avec des exemples tirés du domaine assurance |

### D — La captation

| # | Idée |
|---|---|
| 16 | Un bouton « je viens d'entendre un événement » que n'importe qui presse ; l'IA propose la formulation |
| 17 | L'IA n'écoute pas en continu : le coach déclenche « analyse les 5 dernières minutes » |
| 18 | Import de la transcription Teams après coup, plutôt qu'écoute live |
| 19 | L'IA travaille **pendant la nuit** entre le jour 1 et le jour 2, et propose au réveil |

### E — Le scénario sans IA

| # | Idée |
|---|---|
| 20 | Juste le mur, le déroulé, le chrono et la police de notation — zéro LLM |
| 21 | Un template markdown dans le dépôt Git, rempli à la main mais structuré |

### F — Ce que l'architecte emporte

| # | Idée |
|---|---|
| 22 | Export markdown du mur, commité dans le dépôt, relu en pull request |
| 23 | L'architecte dessine les regroupements à la main ; l'outil se contente de compter les liens qui traversent les frontières |

### G — Provocations

| # | Idée |
|---|---|
| 24 | L'outil coupe le micro de qui parle depuis plus de 3 minutes |
| 25 | Pas de board du tout : un fichier markdown partagé et un chrono |
| 26 | L'outil ne sert que le jour 2 ; le jour 1 se fait sans lui |
| 27 | L'outil refuse de passer à l'étape suivante tant que les 6 experts métier n'ont pas contribué |

### H — Ajout du PO en convergence

| # | Idée |
|---|---|
| 28 | **L'IA travaille en mode observateur et crée des post-its visuellement distincts de ceux des utilisateurs. Non validés à la fin de l'exercice, ils disparaissent.** |

Cette idée résout **T8**, ouverte depuis le début : comment faire valider 23 personnes sans casser le rythme. Réponse : on ne fait rien valider. L'inaction coûte zéro et supprime la proposition. Le silence devient un refus, pas un blocage.

### I — Divergence complémentaire : le mode Dérivation (séance B)

> Générée le 2026-08-04 après constat d'absence en convergence. Répond à HMW5.

| # | Idée |
|---|---|
| 29 | L'IA propose plusieurs découpages candidats plutôt qu'un seul ; l'architecte compare |
| 30 | Chaque frontière proposée est accompagnée de la liste des post-its qui la fondent |
| 31 | Le lasso : l'architecte entoure une zone du mur, l'outil nomme le contexte et liste les dépendances sortantes |
| 32 | Compteur de liens traversants : pour un découpage donné, combien de flèches franchissent chaque frontière |
| 33 | La couche fantôme appliquée aux frontières : les bounded contexts proposés sont distincts et expirent s'ils ne sont pas adoptés |
| 34 | Détection de pivotal events : signaler les événements où l'acteur ou le vocabulaire change — candidats naturels de frontière |
| 35 | Détection d'ambiguïté de langage : le même mot employé avec deux sens différents révèle une frontière de contexte |
| 36 | Colorier le mur par acteur : les regroupements apparaissent souvent d'eux-mêmes |
| 37 | Regrouper les commandes qui touchent les mêmes données — candidats d'aggregates |
| 38 | Mode challenge : l'architecte propose son découpage, l'outil liste les incohérences (liens traversants nombreux, événements orphelins) |
| 39 | Export markdown du découpage, commité, relu en pull request par les architectes |
| 40 | L'IA travaille pendant la nuit entre J1 et J2 et présente des candidats au matin du jour 2 |

## Observation à reprendre en convergence

Les deux premières idées du PO — consignes et timing — **ne mobilisent aucune IA**. Elles portent sur le cadre. C'est un signal à ne pas perdre au moment de trancher le périmètre.

## Thèmes

> Convergence du 2026-08-04. Regroupement par philosophie sous-jacente, pas par ressemblance de surface.

### Thème 1 — Le cadre porte la méthode

**Philosophie** : ce n'est pas l'humain qui doit connaître la méthode, c'est le déroulé qui la tient. Le coach agile suit un chemin plutôt que de le connaître.

Idées : 3, 4, 5, 6.

- Déroulé pas-à-pas affiché : étape en cours, attendu, temps restant
- Chrono par étape avec alerte automatique à 5 minutes
- Agenda type pré-rempli pour un Event Storming de 2 jours, modifiable
- Indicateur d'avancement : « étape 3 sur 8, en avance de 10 minutes »

**Aucune IA requise.** Répond directement à F1 (pas de méthode commune) et à A4 (le coach saura-t-il animer).

### Thème 2 — Le clavier remplace le mur

**Philosophie** : exploiter le distanciel au lieu de le subir. Autour d'un mur physique, seul celui qui tient le feutre écrit. En visio, 23 personnes écrivent en même temps.

Idées : 8, 11.

- Mode « tempête silencieuse » chronométré : 7 minutes, tout le monde écrit, personne ne parle
- Vote par points pour trier le vrac, sans discussion

**Aucune IA requise.** Répond à A3 et A15 (les experts métier vont-ils parler) en supprimant la nécessité de parler.

### Thème 3 — L'IA garde la grammaire, jamais le sens

**Philosophie** : l'IA intervient au moment de l'écriture, sur la forme uniquement, et toujours avec un clic humain. C'est la plus petite autorité possible — et précisément la connaissance qui manque à l'équipe.

Idées : 12, 16.

- Validation à la frappe : l'IA reformule si la grammaire n'est pas respectée et propose un type de post-it ; l'utilisateur valide
- Bouton « je viens d'entendre un événement » : l'IA propose la formulation

Répond au troisième métier de l'outil (gardien de la grammaire) et à F4 (corriger la notation empêche de participer).

### Thème 4 — La couche fantôme

**Philosophie** : l'IA propose dans une couche visuellement séparée, avec péremption automatique. La validation n'est plus une charge mais une adoption. Ne rien faire supprime la proposition.

Idée : 28.

- L'IA enregistre tout et fonctionne en mode observateur
- Ses post-its sont visuellement distincts de ceux des utilisateurs
- Non validés à la fin de l'exercice, ils disparaissent

**Résout T8.** Garantit aussi structurellement l'arbitrage T5 : on ne peut pas confondre ce que l'IA a proposé avec ce que le groupe a dit.

### Thème 5 — L'instrument de mesure, pas le verdict

**Philosophie** : l'IA ne dessine pas les frontières à la place des architectes. Elle rend le mur **lisible** en faisant apparaître les signaux qui révèlent les frontières, puis mesure la qualité d'un découpage proposé — par l'humain ou par elle.

Idées : 30, 31, 32, 33, 34, 36, 38, 40.

**Ce que l'outil fait**

- Colorie le mur par acteur, par vocabulaire, par flux : les regroupements se voient
- Signale les *pivotal events* — changement d'acteur ou de vocabulaire, candidats naturels de frontière
- Le lasso : l'architecte entoure une zone, l'outil nomme et liste ce qui entre et sort
- Compte les liens traversants pour tout découpage, humain ou proposé
- Propose des frontières candidates **dans la couche fantôme** — distinctes, expirables
- Justifie chaque frontière par les post-its qui la fondent, remontables jusqu'à la transcription
- Travaille pendant la nuit entre J1 et J2 et présente au matin

**Pourquoi cette philosophie plutôt qu'une autre**

1. Elle réutilise le mécanisme du thème 4. La couche fantôme est déjà à construire pour les post-its ; l'appliquer aux frontières coûte peu.
2. Elle répond à A11. Les architectes rejettent un verdict et acceptent un instrument. Un compteur de liens traversants n'a pas d'opinion — il se vérifie.
3. Elle conserve l'arbitrage constant du projet : l'IA propose, l'humain décide.
4. Une partie ne demande **aucun LLM** : compter des liens, colorier par acteur, détecter des événements orphelins sont des opérations sur le graphe. Encore une fois, A14 est neutralisée.

**Ce que ça implique**

La qualité du découpage ne repose plus entièrement sur la performance du LLM — le risque A10 que le PO avait assumé. Une proposition faible reste utile si les mesures qui l'accompagnent sont justes.

---

## Aperçu Désirabilité / Faisabilité / Viabilité

| Thème | Désirabilité | Faisabilité 4 semaines | Sans IA ? |
|---|---|---|---|
| 1 — Le cadre porte la méthode | Forte | Élevée | Oui |
| 2 — Le clavier remplace le mur | À vérifier auprès des experts métier | Élevée | Oui |
| 3 — L'IA garde la grammaire | Forte | Moyenne | Non |
| 4 — La couche fantôme | Forte | Moyenne à faible | Non |
| 5 — L'instrument de mesure | Forte côté architectes | Partielle : mesures oui, propositions non | Partiellement |

**Constat** : les thèmes 1 et 2 ne mobilisent aucune IA et couvrent la moitié du périmètre retenu. La barre « meilleur que sans outil » est franchissable en grande partie sans LLM — ce qui neutralise aussi le risque A14.

## Absence notable — comblée

La convergence initiale ne couvrait que le mode Captation. Le thème 5 comble le mode Dérivation. Les cinq thèmes couvrent désormais les deux séances et les trois niveaux d'Event Storming du périmètre MVP.
