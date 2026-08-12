---
title: "Assistant Event Storming - Intention UX et modèle d'interaction"
description: "Personas, parcours utilisateurs, user flows, catalogue de vues et guidelines d'accessibilité pour l'assistant d'atelier Event Storming"
author: "UX Designer"
ms.date: 2026-08-11
ms.topic: concept
keywords:
  - ux
  - parcours utilisateur
  - event storming
  - bounded context
  - agrégat
  - accessibilité
---

## Préambule

Document exploratoire d'intention UX. **Il ne constitue ni une décision produit, ni une spécification, ni une maquette.**

### Sources et statut

| Source                                   | Rôle                                              |
|------------------------------------------|---------------------------------------------------|
| Cadrage produit V0 du Product Manager    | Source de vérité sur l'intention et les décisions |
| Document d'exigences métier, version 2   | Exigences à respecter, 36 exigences               |
| Revue critique du 2026-08-10             | Origine de la révision du parcours                |
| Design system Canopée d'AXA France       | Inspiration, référence de composants               |

### Alignement du 2026-08-11

La version précédente décrivait un outil de facilitation : contribuer, voter, corriger, mesurer. Elle ne décrivait pas un parcours Event Storming. La revue critique du 2026-08-10 a établi qu'il manquait la chaîne reliant les faits métier aux frontières de contexte, puis aux agrégats.

Le document d'exigences a été réécrit le 2026-08-11 autour de dix étapes de découverte. Le présent document est aligné sur ce parcours.

| Étape du parcours | Question posée au groupe                              | Flux concernés        |
|-------------------|--------------------------------------------------------|-----------------------|
| Cadrage           | Quel domaine explore-t-on et pourquoi ?               | UF-11, UF-06          |
| Collecte          | Que s'est-il passé dans le métier ?                   | UF-01, UF-12          |
| Chronologie       | Dans quel ordre cela se produit-il ?                  | UF-10                 |
| Enrichissement    | Qui agit, pourquoi, avec quelles informations ?       | UF-13                 |
| Clarification     | Que ne comprend-on pas, sur quoi diverge-t-on ?       | UF-02, UF-08, UF-14   |
| Frontières        | Où changent langage, règles, rythme, responsabilité ? | UF-05, UF-15, UF-16   |
| Sélection         | Quel scénario approfondit-on ?                        | UF-03                 |
| Process Modelling | Comment fonctionne ce processus ?                     | UF-17                 |
| Design Level      | Quelles règles doivent rester cohérentes ensemble ?   | UF-18                 |
| Restitution       | Qu'est-ce qui est établi, incertain, à vérifier ?     | UF-19, UF-20, UF-07   |

Les acquis de la version précédente sont conservés : correction privée et non bloquante, zone d'attente, alternatives au glisser-déposer, visibilité de l'origine humaine ou automatique d'un élément.

### Convention de traçabilité

Chaque élément de ce document porte son origine.

| Marqueur   | Signification                                                        |
|------------|-----------------------------------------------------------------------|
| **[PMA]**  | Provient du cadrage produit, non discutable ici                      |
| **[BRD]**  | Provient d'une exigence métier, avec sa référence                    |
| **[UX]**   | Hypothèse de conception UX, exploratoire et non contraignante        |

Tout élément marqué **[UX]** peut être écarté sans conséquence sur le périmètre produit.

### Limite de validité

Le cadrage produit indique que les cinq hypothèses fondatrices n'ont pas été confrontées à des utilisateurs réels, et qu'aucun des six rôles n'a été interrogé. **Les parcours de ce document sont donc des hypothèses de comportement, pas des observations.** Ils doivent être confrontés aux personnes concernées avant d'influencer une décision de conception.

---

## 1. Personas et Jobs To Be Done

Six personas. Les cinq premiers proviennent du cadrage produit et du document d'exigences. Le sixième est créé le 2026-08-11, le niveau agrégat étant traité dans une séance postérieure à l'atelier.

### P1 - Le porteur de la méthode

**[PMA]** Deux développeurs. Seuls à maîtriser l'Event Storming. Bénéficiaires principaux : le produit existe parce que leur expertise n'atteint jamais le contenu.

> **JTBD** : Quand je participe à un atelier dont je suis le seul à connaître la méthode, je veux que la mécanique soit prise en charge, afin d'investir ma connaissance du système dans le contenu plutôt que dans l'écriture.

| Dimension     | Contenu                                                                   |
|---------------|----------------------------------------------------------------------------|
| Fonctionnelle | Ne plus écrire pour les autres, ne plus tenir la chronologie              |
| Émotionnelle  | Ne plus être le point de défaillance unique, pouvoir contredire           |
| Sociale       | Redevenir un pair dans la conversation plutôt qu'un scribe                |

**Irritant dominant [PMA]** : son silence, imposé par la mécanique, est interprété comme un accord.

### P2 - Le facilitateur

**[PMA]** Un coach agile. Sait animer un groupe, ne connaît pas l'Event Storming. Utilisateur principal, et point de défaillance unique de la séance. **Précisé le 2026-08-12** : il se consacre à la conduite et ne contribue pas au contenu.

> **JTBD** : Quand j'anime un atelier dont je ne maîtrise pas la méthode, je veux savoir à tout instant où nous en sommes et ce qu'on attend du groupe, afin de conduire la séance sans perdre ma crédibilité devant des experts.

| Dimension     | Contenu                                                                   |
|---------------|----------------------------------------------------------------------------|
| Fonctionnelle | Savoir quelle est l'étape, ce qu'elle produit, combien de temps il reste  |
| Émotionnelle  | Ne pas révéler son manque de maîtrise devant architectes et consultants   |
| Sociale       | Garder l'autorité sur le rythme et la parole, qui est sa valeur propre    |

**Irritant dominant [UX]** : le moment de bascule d'une étape à l'autre, où il doit décider seul si le groupe a produit assez.

### P3 - L'expert métier dommage aux biens

**[PMA]** Six personnes. Détiennent chacune une partie de la connaissance du domaine. Seule source de vérité.

> **JTBD** : Quand on me demande de décrire mon travail dans une réunion à 23 personnes, je veux pouvoir contribuer sans avoir à m'imposer dans la conversation, afin que ce que je sais figure dans le résultat.

| Dimension     | Contenu                                                                   |
|---------------|----------------------------------------------------------------------------|
| Fonctionnelle | Poser ce qu'il sait, y compris les exceptions non documentées             |
| Émotionnelle  | Ne pas être corrigé sur la forme devant vingt-deux personnes              |
| Sociale       | Être écouté, et voir que sa contribution a été retenue                    |

**Irritant dominant [PMA]** : il ne dira pas son désaccord, il se taira. C'est ce silence qui menace la qualité du modèle.

### P4 - L'architecte

**[PMA]** Deux personnes. Présentes pendant les deux jours. **Révisé le 2026-08-11** : l'architecte n'est plus propriétaire du découpage, il formule des hypothèses que le groupe tranche.

> **JTBD** : Quand je pressens une frontière dans le domaine, je veux pouvoir la formuler comme une hypothèse argumentée et la soumettre au métier, afin qu'elle soit confirmée ou démentie par ceux qui connaissent le terrain plutôt que par mon intuition.

| Dimension     | Contenu                                                                   |
|---------------|----------------------------------------------------------------------------|
| Fonctionnelle | Formuler plusieurs découpages concurrents et les comparer                 |
| Émotionnelle  | Ne pas porter seul une décision qu'il ne peut pas vérifier                |
| Sociale       | Être contredit par un expert métier sans que ce soit un échec            |

**Irritant dominant [PMA]** : une proposition plausible mais fausse est plus dangereuse qu'aucune proposition, car elle emporte l'adhésion du reste de l'équipe.

**Irritant ajouté [UX]** : il trace une zone sur le mur et croit avoir trouvé une frontière. Une zone n'est pas une frontière tant qu'elle ne s'appuie pas sur des indices métier observés.

### P5 - Le participant contributeur secondaire

**[BRD]** Douze personnes. Groupe le plus nombreux. Ne détiennent ni la connaissance du domaine ni de responsabilité sur le modèle.

> **JTBD** : Quand j'assiste à un atelier sur un domaine que je ne connais pas, je veux comprendre ce qui se construit et pouvoir poser mes questions, afin de m'aligner sur la vision et d'apporter ce que je sais.

**Irritant dominant [UX]** : il ne sait pas s'il a le droit de contribuer, ni sur quoi. Le risque n'est pas qu'il gêne, c'est qu'il devienne spectateur et fasse chuter le taux de contribution.

### P6 - L'équipe de développement produit

**[BRD]** Cinq à six personnes, précisé le 2026-08-12. Architecte, responsable technique, développeurs. **Créé le 2026-08-11.** N'assiste pas nécessairement à l'atelier des 15 et 16 septembre, mais conduit la séance Design Level qui suit.

> **JTBD** : Quand je dois construire un système à partir d'un modèle que je n'ai pas produit, je veux remonter de chaque règle jusqu'à la parole métier qui la fonde, afin de ne pas coder une interprétation.

| Dimension     | Contenu                                                                   |
|---------------|----------------------------------------------------------------------------|
| Fonctionnelle | Formuler des invariants, en déduire des agrégats, vérifier leur origine   |
| Émotionnelle  | Ne pas découvrir six mois plus tard que la règle était fausse             |
| Sociale       | Pouvoir interroger le métier sans repasser par un atelier de deux jours   |

**Irritant dominant [UX]** : il arrive après la conversation. Tout ce qui n'a pas été tracé pendant l'atelier lui est définitivement inaccessible, et il comblera les trous par des hypothèses techniques.

### Synthèse des problèmes utilisateurs

| # | Problème                                                            | Persona    | Objectif métier | Exigences        |
|---|----------------------------------------------------------------------|------------|-----------------|------------------|
| 1 | La mécanique de l'atelier consomme la seule expertise disponible    | P1         | BO-02           | BR-004, BR-008   |
| 2 | Contribuer suppose de prendre la parole, ce qui coûte cher en visio | P3, P5     | BO-03           | BR-004, BR-005   |
| 3 | Le facilitateur ne sait pas ce qu'il doit obtenir ni quand avancer  | P2         | BO-05           | BR-001, BR-036   |
| 4 | La correction de notation se fait à voix haute et inhibe            | P3, P5     | BO-02, BO-03    | BR-008, BR-009   |
| 5 | La conversation disparaît, le modèle perd son fondement             | P1, P4     | BO-04           | BR-011 à BR-013  |
| 6 | Le découpage repose sur l'intuition                                 | P4         | BO-06           | BR-029, BR-030   |
| 7 | Le jalon dépend entièrement de la disponibilité de l'outil          | P2         | BO-07           | BR-020, BR-021   |
| 8 | La collecte est parasitée par les solutions et les commandes        | P1, P3     | BO-01           | BR-022, BR-024   |
| 9 | Le désaccord est lissé et produit un faux consensus                 | P1, P3     | BO-08           | BR-027, BR-035   |
| 10| Un même terme change de sens sans que personne ne le relève         | P1, P3, P4 | BO-06           | BR-026           |
| 11| Un agrégat est déduit d'un regroupement visuel plutôt que d'une règle | P6, P4   | BO-01           | BR-032, BR-033   |
| 12| La chaîne reliant la parole à l'agrégat se rompt entre deux séances | P6, P1     | BO-09           | BR-012, BR-034   |

Les problèmes 8 à 12 sont ajoutés le 2026-08-11.

---

## 2. Cartographies des parcours utilisateurs

Trois parcours détaillés pour les personas les plus exposés, trois parcours condensés pour les autres. **Toutes les émotions décrites sont des hypothèses [UX]**, aucune observation n'ayant été conduite.

### 2.1 Parcours P1, le porteur de la méthode

**Rattachement** : problème 1 · objectif BO-02 · indicateur KPI-03

| Phase                    | Ce qu'il fait                                     | Ce qu'il pense **[UX]**                                | État émotionnel **[UX]** | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|---------------------------------------------------|--------------------------------------------------------|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Arrivée                  | Rejoint la session comme un participant           | « Est-ce que je vais devoir reprendre le clavier ? »   | Méfiance                 | Aucun signal ne lui dit qu'il n'est pas l'animateur              | Rendre visible dès l'entrée que la conduite appartient à P2    |
| Première contribution    | Saisit ses propres éléments                       | « Je peux enfin poser ce que je sais du système »      | Soulagement              | Aucune                                                           | Moment de bascule à ne pas gâcher par une friction technique   |
| Il voit une erreur       | Un élément d'un autre est mal formulé             | « Je corrige ou je laisse ? »                          | Tension                  | Corriger en public le remet en position de police                | Que l'outil signale à l'auteur, jamais lui                     |
| Désaccord de fond        | Il n'est pas d'accord avec une étape décrite      | « Est-ce que je peux contredire un expert métier ? »   | Retenue                  | **Aucune exigence ne couvre l'expression d'un désaccord**        | Voir risque UX-06                                              |
| Revue des propositions   | Examine les éléments proposés automatiquement     | « Est-ce que ça a été dit, ou est-ce inventé ? »       | Vigilance                | Sa confiance dépend de la traçabilité                            | L'extrait source doit être atteignable en un geste             |
| Fin de journée           | Relit le mur                                      | « Est-ce que ma connaissance est dedans ? »            | Évaluation               | Rien ne lui montre sa propre contribution                        | Une vue de sa contribution personnelle                         |

**Moment critique** : la troisième phase. Si l'outil ne prend pas en charge le signalement de notation, P1 reprend le rôle de correcteur et le produit a échoué sur son problème central.

### 2.2 Parcours P2, le facilitateur

**Rattachement** : problème 3 · objectifs BO-05 et BO-07 · indicateur KPI-05

| Phase                    | Ce qu'il fait                                     | Ce qu'il pense **[UX]**                                | État émotionnel **[UX]** | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|---------------------------------------------------|--------------------------------------------------------|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Ouverture, 9 h           | Lance la séance devant 23 personnes               | « Est-ce que je vais tenir deux jours ? »              | Appréhension             | Il découvre l'outil en même temps que le groupe                  | Une répétition à blanc avant le jour J                         |
| Lancement d'une étape    | Démarre l'étape et son minuteur                   | « Qu'est-ce que je leur dis exactement ? »             | Besoin d'appui           | Le déroulé doit lui donner la phrase, pas seulement le titre     | Formulation prête à énoncer, visible de lui seul               |
| Pendant la contribution  | Observe, relance                                  | « Est-ce qu'ils écrivent tous ? »                      | Surveillance             | Il ne voit pas qui contribue et qui décroche                     | Un indicateur de participation, visible de lui seul            |
| Fin de minuteur          | Décide de prolonger ou de passer                  | « Est-ce qu'on en a assez ? »                          | **Doute maximal**        | **Aucun critère ne lui dit si l'étape a produit assez**          | Un signal de suffisance, non prescriptif                       |
| Un désaccord surgit      | Doit acter la divergence                          | « Comment je note ça sans trancher ? »                 | Inconfort                | **Le traitement des divergences lui incombe sans support**       | Voir risque UX-07                                              |
| Reprise après pause      | Présente les propositions automatiques            | « Comment j'introduis ça sans dire que c'est l'IA ? »  | Hésitation               | Aucune formulation ne lui est fournie                            | Une phrase de reprise dans le déroulé                          |
| Bascule éventuelle       | L'outil est indisponible                          | « Je fais quoi maintenant ? »                          | Urgence                  | Le passage au mode indépendant n'est pas outillé                 | Export accessible en un geste, à tout instant                  |

**Moment critique** : la fin de minuteur. C'est là que le facilitateur qui ne maîtrise pas la méthode est le plus exposé, et le déroulé seul ne suffit pas à le guider.

### 2.3 Parcours P3, l'expert métier

**Rattachement** : problèmes 2 et 4 · objectif BO-03 · indicateur KPI-04

| Phase                    | Ce qu'il fait                                     | Ce qu'il pense **[UX]**                                | État émotionnel **[UX]** | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|---------------------------------------------------|--------------------------------------------------------|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Arrivée                  | Rejoint la visio, écoute                          | « On va encore me demander de décrire mon travail »    | Réserve polie            | Rien ne lui dit que sa parole compte plus que celle des autres   | Reconnaître son statut de source, sans le désigner en public   |
| Découverte de la méthode | On lui explique la notation                       | « Un événement au passé, c'est quoi au juste ? »       | Confusion                | Le vocabulaire de la méthode est un obstacle d'entrée            | Exemples tirés de son propre domaine, pas d'exemples abstraits |
| Première contribution    | Écrit son premier élément                         | « Est-ce que c'est ça qu'on attend ? »                 | Incertitude              | Il ne sait pas si sa formulation est acceptable                  | Un retour immédiat, discret, adressé à lui seul                |
| Signalement reçu         | L'outil signale un écart de formulation           | « On me corrige »                                      | **Risque de retrait**    | **Un signalement mal formulé le fait taire pour la journée**     | Formuler en question, pas en correction                        |
| Contribution en volume   | Écrit pendant la phase chronométrée               | « J'ai encore trois cas particuliers »                 | Engagement               | Le minuteur peut le couper au milieu                             | Voir risque UX-02                                              |
| Vote                     | Répartit ses points                               | « Si je ne vote pas pour mon cas, il disparaît »       | Calcul                   | **Le vote peut éliminer les cas rares, qui sont sa valeur**      | Voir risque UX-03                                              |
| Restitution              | Voit le mur final                                 | « Est-ce que ce que j'ai dit est là ? »                | Vérification             | Rien ne lui montre ce qu'il a apporté                            | Retrouver ses propres contributions                            |

**Moment critique** : le premier signalement de notation. C'est le point de décrochage le plus probable de tout le parcours, et il concerne le persona dont dépend la matière de l'atelier.

### 2.4 Parcours P4, l'architecte, condensé

**Rattachement** : problème 6 · objectif BO-06 · indicateur KPI-08

| Phase                    | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Pendant les deux jours   | Il participe sans que son besoin propre soit servi              | Rendre visible que son moment vient après                      |
| Séance de découpage      | Le mur est dense et plat, il ne sait par où entrer              | Entrer par les acteurs plutôt que par les éléments             |
| Délimitation d'une zone  | Il doit sélectionner dans un ensemble volumineux                 | Sélection assistée par regroupement visuel                     |
| Lecture des mesures      | Un chiffre sans contexte ne l'aide pas à décider                | Comparer deux zones plutôt qu'en évaluer une seule             |
| Justification            | Il doit pouvoir remonter jusqu'à la parole métier                | Chemin de traçabilité en deux gestes au plus                   |

**Moment critique** : son entrée dans la séance de découpage. S'il ne trouve pas de prise sur le mur dans les premières minutes, il retombera sur son intuition et l'objectif BO-06 est manqué.

### 2.5 Parcours P5, le contributeur secondaire, condensé

**Rattachement** : problème 2 · objectif BO-03 · indicateur KPI-04

| Phase                    | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Arrivée                  | Il ne sait pas ce qu'on attend de lui                           | Expliciter que la contribution est ouverte à tous              |
| Pendant la contribution  | Il craint de polluer le mur avec des éléments hors sujet        | Autoriser la contribution incertaine, le tri viendra après     |
| Il ne comprend pas       | **Aucun moyen de poser une question n'est prévu**               | Voir risque UX-05                                              |
| Lecture du mur           | Le vocabulaire métier lui échappe                                | Accès permanent à la notation et à ses exemples                |

**Moment critique** : les vingt premières minutes. Douze personnes qui deviennent spectatrices font mécaniquement échouer l'indicateur de contribution KPI-04, dont la cible est de 18 participants sur 23.

### 2.6 Parcours P6, l'équipe de développement produit, condensé

**Rattachement** : problèmes 11 et 12 · objectifs BO-01 et BO-09 · indicateurs KPI-14 et KPI-15

**Ajouté le 2026-08-11.** Ce parcours se déroule après l'atelier, en séance restreinte, avec un représentant métier.

| Phase                    | Friction                                                        | Opportunité **[UX]**                                          |
|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------|
| Prise de connaissance    | Il découvre un modèle qu'il n'a pas produit                    | Entrer par les contextes candidats, pas par le mur entier      |
| Choix d'un scénario      | Rien ne lui dit lequel est critique                             | Le motif de sélection du groupe est consultable                |
| Raffinement du processus | Il complète des trous laissés par l'atelier                     | Distinguer visuellement ce qu'il ajoute de ce qui vient du métier |
| Formulation d'invariant  | **Il énonce une règle métier qu'il ne peut pas vérifier**      | Marquer l'invariant comme à vérifier tant que le métier n'a pas répondu |
| Proposition d'agrégat    | Il regroupe par affinité visuelle plutôt que par règle          | Un agrégat sans invariant est refusé ou marqué incomplet       |
| Remontée à la source     | Le lien vers la parole métier s'est perdu entre les séances     | Navigation depuis l'agrégat jusqu'à l'extrait de conversation  |
| Validation a postériori  | Les experts métier ne sont plus dans la salle                   | Une liste d'invariants à confirmer, transmissible hors séance  |

**Moment critique** : la formulation d'un invariant. C'est le seul point du parcours où une personne technique énonce une vérité métier. Un invariant faux qui passe cette étape se retrouve dans le code et n'en ressort plus.

---

## 3. User flows clés

Vingt flux. Dix existaient avant le 2026-08-11, dix sont ajoutés pour couvrir le parcours de découverte.

**Convention d'identifiant.** Comme dans le document d'exigences, les identifiants sont stables et non réattribués. Les flux n'apparaissent donc pas dans l'ordre numérique. L'index ci-dessous donne l'ordre de lecture méthodologique.

| Ordre | Flux  | Intitulé                                             | Étape du parcours   | Statut                |
|-------|-------|--------------------------------------------------------|---------------------|-----------------------|
| 1     | UF-11 | Cadrer le domaine et lancer le Big Picture             | Cadrage             | Ajouté le 2026-08-11  |
| 2     | UF-06 | Conduire une étape                                     | Toutes              | Amendé                |
| 3     | UF-01 | Déposer un fait métier pendant une phase chronométrée  | Collecte            | Amendé                |
| 4     | UF-12 | Reformuler un fait sans perdre la formulation d'origine| Collecte            | Ajouté le 2026-08-11  |
| 5     | UF-10 | Ordonner les éléments sur la chronologie               | Chronologie         | Amendé                |
| 6     | UF-13 | Enrichir un fait par acteurs, commandes et politiques  | Enrichissement      | Ajouté le 2026-08-11  |
| 7     | UF-02 | Recevoir un signalement de notation                    | Clarification       | Amendé                |
| 8     | UF-08 | Exprimer une question, un désaccord ou une tension     | Clarification       | Amendé                |
| 9     | UF-14 | Signaler un changement de langage ou de responsabilité | Clarification       | Ajouté le 2026-08-11  |
| 10    | UF-05 | Formuler une frontière candidate argumentée            | Frontières          | Réécrit               |
| 11    | UF-15 | Comparer deux hypothèses de découpage                  | Frontières          | Ajouté le 2026-08-11  |
| 12    | UF-16 | Valider ou conserver comme hypothèse un contexte       | Frontières          | Ajouté le 2026-08-11  |
| 13    | UF-03 | Prioriser les sujets à approfondir                     | Sélection           | Redéfini              |
| 14    | UF-17 | Conduire un Process Modelling                          | Process Modelling   | Ajouté le 2026-08-11  |
| 15    | UF-18 | Formuler un invariant et proposer un agrégat           | Design Level        | Ajouté le 2026-08-11  |
| 16    | UF-19 | Parcourir la traçabilité de la parole jusqu'à l'agrégat| Restitution         | Ajouté le 2026-08-11  |
| 17    | UF-20 | Restituer faits, hypothèses et questions séparément    | Restitution         | Ajouté le 2026-08-11  |
| 18    | UF-04 | Adopter une proposition automatique                    | Transverse          | Amendé                |
| 19    | UF-09 | Modifier ou supprimer un élément produit par un autre  | Transverse          | Inchangé              |
| 20    | UF-07 | Basculer vers le mode indépendant                      | Continuité          | Amendé                |

### UF-01 Déposer un fait métier pendant une phase chronométrée

**P3, P5, P1** · problèmes 2 et 8 · BO-03 · BR-004, BR-005, BR-022

**Amendé le 2026-08-11.** Pendant la collecte, seuls les faits métier au passé sont attendus. Aucun autre type n'est interdit : un élément d'un autre type est conservé et traité à l'étape appropriée.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre la phase                | Le minuteur démarre, la question posée au groupe devient visible   |
| 2 | Le participant saisit un texte                | Le champ de saisie reste disponible en continu                     |
| 3 | Le participant qualifie l'élément             | Le type attendu à l'étape est proposé par défaut, les autres restent accessibles |
| 4 | Le participant valide                         | L'élément apparaît sur le mur, attribué à son auteur               |
| 5 | Le participant enchaîne                       | Le champ se vide et reste focalisé **[UX]**                        |
| 6 | Le minuteur arrive à échéance                 | Un signal apparaît, la saisie reste ouverte **[UX]**               |

**Cas limites**

| Situation                                     | Comportement attendu **[UX]**                                      |
|-----------------------------------------------|---------------------------------------------------------------------|
| Le participant perd sa connexion              | Sa saisie en cours est préservée localement                        |
| Deux participants saisissent le même élément  | Les deux sont conservés, le rapprochement se fait en clarification |
| Le participant n'a rien à dire                | Aucune sollicitation individuelle publique                         |
| Le minuteur expire pendant la frappe          | La saisie en cours peut être terminée                              |
| Le participant produit une commande en collecte | L'élément est conservé et reproposé à l'étape d'enrichissement    |

**Pattern extrait [UX]** : saisie continue, sans modale ni interruption. Le coût d'une contribution doit rester inférieur au coût d'une prise de parole, sinon le produit ne résout rien.

### UF-12 Reformuler un fait sans perdre la formulation d'origine

**P1, P3** · problème 9 · BO-10 · BR-023

**Ajouté le 2026-08-11.** Une reformulation est un acte de modélisation. Ce que le métier a écrit doit rester atteignable, faute de quoi la reformulation efface la parole qu'elle prétend clarifier.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Un participant sélectionne un fait ambigu     | La formulation courante et son auteur sont affichés                |
| 2 | Il propose une reformulation                  | Les deux formulations coexistent, la nouvelle n'écrase pas l'ancienne |
| 3 | L'auteur d'origine est informé en privé        | Il confirme, amende ou refuse **[UX]**                             |
| 4 | Le groupe retient une formulation             | Le statut de preuve passe à reformulé et validé                    |
| 5 | Un participant consulte l'origine             | La formulation initiale reste lisible à tout moment                |
| 6 | Le groupe revient en arrière                  | La reformulation est réversible                                     |

**Cas limite critique [UX]** : si l'auteur d'origine ne répond pas, la reformulation reste une proposition et le fait conserve le statut à vérifier. Le silence n'est pas un accord, règle déjà posée au principe 4.

### UF-02 Recevoir un signalement de notation

**P3, P5, P1** · problème 4 · BO-02 · BR-008, BR-009

**Amendé le 2026-08-11.** Le signalement dépend désormais de l'étape en cours.

| Étape         | Comportement                                                  |
|---------------|---------------------------------------------------------------|
| Collecte      | Muet, aucun signalement spontané                              |
| Clarification | Actif, les écarts non traités sont restitués à leurs auteurs  |
| Toute étape   | Disponible à la demande de l'auteur                           |

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le participant saisit un élément non conforme | L'élément est créé et posé sur le mur, sans signalement en collecte |
| 2 | L'étape de clarification s'ouvre              | Les écarts accumulés sont restitués **à leurs seuls auteurs**      |
| 3 | Le participant lit le signalement             | Une reformulation ou un changement de type est proposé             |
| 4a| Il accepte                                    | L'élément est ajusté, la formulation d'origine est conservée       |
| 4b| Il ignore                                     | Le signalement disparaît, l'élément reste inchangé                 |
| 5 | Aucune action                                 | Le signalement s'efface après un délai **[UX]**                    |
| 6 | Un auteur veut se vérifier pendant la collecte | Il sollicite le contrôle, qui reste privé                         |

**Contrainte structurante [BRD]** : le signalement est adressé au seul auteur. Aucun autre participant ne doit pouvoir constater qu'un signalement a eu lieu.

**Pattern extrait [UX]** : correction privée, jamais publique, et jamais pendant la divergence. La formulation est interrogative et non impérative, pour éviter la posture de correction.

### UF-03 Prioriser les sujets à approfondir

**P1, P2, P3, P5** · problèmes 2 et 9 · BO-03, BO-08 · BR-006

**Redéfini le 2026-08-11.** Ce flux était un flux de convergence : le groupe votait pour hiérarchiser les éléments produits. Il devient un flux de priorisation : le vote choisit le prochain sujet d'exploration et n'emporte aucune conséquence sur le contenu du mur.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre le vote sur un ensemble de sujets | Le nombre de points par personne est annoncé              |
| 2 | Le participant répartit ses points            | Ses propres votes sont visibles de lui seul                        |
| 3 | Le facilitateur clôture                       | Les résultats deviennent visibles de tous, présentés comme un indicateur |
| 4 | Le groupe consulte le résultat                | Aucun élément n'est masqué, déclassé ni supprimé                   |
| 5 | Le groupe retient un sujet non arrivé en tête  | Le choix est enregistré avec son motif                             |

**Règle structurante [BRD]** : le vote est un indicateur. Le groupe et le facilitateur ne sont pas tenus de le suivre. Décision du 2026-08-11.

**Cas limite critique [UX]** : un élément à zéro point ne disparaît pas et ne change pas d'apparence. Dans un domaine fragmenté, un cas connu d'une seule personne recevra peu de votes tout en étant exact. Le traiter visuellement comme secondaire produirait le même effet que le supprimer.

**Conception à proscrire [UX]** : tout classement permanent, toute taille d'élément proportionnelle au nombre de voix, toute mise en retrait des éléments peu votés.

### UF-04 Adopter une proposition automatique

**P1, P3** · problème 5 · BO-04 · BR-014 à BR-016

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur importe la transcription      | L'analyse est lancée, sa progression est visible **[UX]**           |
| 2 | Les propositions apparaissent                 | Dans une couche distincte, non confondable                         |
| 3 | Un participant consulte une proposition       | L'extrait de conversation source est affiché                       |
| 4 | Il adopte                                     | La proposition devient un élément ordinaire, l'origine est conservée |
| 5 | Personne n'agit                               | La proposition disparaît en fin d'exercice                         |

**Pattern extrait [PMA]** : l'inaction vaut refus. Aucune validation collective n'est requise, ce qui supprime la charge de décision d'un groupe de 23 personnes.

### UF-05 Formuler une frontière candidate argumentée

**Tous** · problèmes 6 et 10 · BO-06 · BR-017, BR-018, BR-028, BR-029

**Réécrit le 2026-08-11.** La version précédente s'appelait « mesurer une zone du modèle ». Elle produisait un comptage de relations franchissantes et le présentait comme une justification de découpage. Un comptage n'est qu'un indice parmi huit.

**Amendé le 2026-08-12.** Tout participant peut créer une hypothèse de découpage, sans limite de nombre. Le flux n'est plus réservé à l'architecte. Une hypothèse créée est visible de tous dès sa création, mais elle n'est tracée sur le mur que lorsqu'elle est sélectionnée.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'architecte crée une hypothèse de découpage  | Une couche distincte est ouverte, le modèle reste intact           |
| 2 | Il délimite une zone et la nomme              | La zone est rattachée à l'hypothèse                                |
| 3 | Il déclare un indice métier                   | Les huit types d'indices sont proposés, chacun demande un rattachement |
| 4 | Il rattache l'indice à des éléments du mur    | Le lien est conservé et navigable                                  |
| 5 | Le système calcule les relations franchissantes | Le résultat est présenté comme un indice, non comme une conclusion |
| 6 | Il complète la fiche du contexte candidat     | Nom métier, responsabilité, langage, niveau de confiance           |
| 7 | La frontière porte moins de deux indices      | Elle est marquée **non étayée**, sans être empêchée                |
| 8 | Il supprime l'hypothèse                       | Le modèle demeure inchangé                                         |

**Les huit indices recevables [BRD]** : changement de vocabulaire, changement de règle, changement de rythme, changement de responsabilité, rupture de cycle de vie d'une information, dépendance externe ou réglementaire, point de tension durable, cohésion interne forte.

**Pattern extrait [UX]** : la zone se dessine, l'indice se déclare. Le geste de dessin est trop facile pour valoir raisonnement, l'interface doit donc rendre la déclaration d'indice aussi accessible que le tracé.

**Cas limite [UX]** : deux hypothèses concurrentes coexistent. Deux architectes en désaccord conservent chacun leur découpage jusqu'à la décision du groupe.

### UF-15 Comparer deux hypothèses de découpage

**P4, P1, P3** · problème 6 · BO-06 · BR-028, BR-030

**Ajouté le 2026-08-11.** Un découpage ne se juge pas seul, il se juge contre un autre.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Un participant sélectionne deux hypothèses    | Les deux découpages s'affichent côte à côte                        |
| 2 | Il consulte les indices de chacune            | Les indices sont présentés en regard, par type                     |
| 3 | Il consulte les dépendances                   | Ce qui traverse chaque frontière est nommé et dénombré             |
| 4 | Il repère les points de désaccord             | Les éléments classés différemment par les deux hypothèses sont mis en évidence |
| 5 | Le groupe discute                             | Aucune hypothèse n'est désignée comme meilleure par le dispositif  |

**Contrainte [BRD]** : le dispositif ne propose ni ne recommande de découpage. Exclusion inscrite au périmètre le 2026-08-11.

### UF-16 Valider ou conserver comme hypothèse un contexte candidat

**Tous** · problèmes 6 et 9 · BO-06, BO-10 · BR-034, BR-035

**Ajouté le 2026-08-11.** L'autorité appartient au groupe réuni en séance. Ce flux matérialise cette règle.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur soumet un contexte candidat   | Ses indices, sa responsabilité et son langage sont affichés        |
| 2 | Un expert métier conteste un indice           | La contestation est enregistrée, l'indice passe à contesté         |
| 3 | Le groupe tranche                             | Le statut passe à décision, avec la date et la composition de la séance |
| 4 | Le groupe ne tranche pas                      | Le contexte conserve le statut hypothèse, sans pénalisation        |
| 5 | Une hypothèse est rejetée                     | Elle reste consultable avec le motif du rejet                      |
| 6 | La séance suivante rouvre le sujet            | L'historique de décision est accessible                            |

**Pattern extrait [UX]** : rester en hypothèse est un résultat acceptable. Une interface qui pousse à trancher produirait de fausses décisions sur un domaine que personne ne maîtrise entièrement.

### UF-06 Conduire une étape

**P2** · problème 3 · BO-05 · BR-001, BR-002, BR-036

**Amendé le 2026-08-11.** Le manque identifié dans la version précédente, l'absence de critère de passage, est couvert par BR-036.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur consulte l'étape courante     | Question posée, résultat attendu, types recommandés, durée         |
| 2 | Il démarre l'étape                            | L'information devient visible de tous                              |
| 3 | Il suit l'avancement                          | Le temps restant est actualisé en continu                          |
| 4 | Il consulte le critère de sortie              | Ce qui reste à clarifier est dénombré et consultable               |
| 5 | Il suspend                                    | Le minuteur s'interrompt sans perte de contenu                     |
| 6 | Il revient à une étape antérieure             | Le contenu, les décisions, les hypothèses et les liens sont conservés |
| 7 | Il termine l'étape                            | L'étape suivante devient courante                                  |

**Règle structurante [BRD]** : la fin du temps imparti ne déclenche jamais seule le passage à l'étape suivante. La décision appartient au facilitateur.

**Pattern extrait [UX]** : le critère de sortie est descriptif, jamais prescriptif. Il montre ce qui reste ouvert, il ne dit pas s'il faut avancer.

### UF-07 Basculer vers le mode indépendant

**P2** · problème 7 · BO-07 · BR-020, BR-021

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'outil devient indisponible                  | Sans objet                                                          |
| 2 | Le facilitateur récupère le contenu produit   | Une restitution est accessible à tout instant **[UX]**              |
| 3 | Il poursuit sur le support de repli           | Sans objet                                                          |

**Contrainte [PMA]** : la restitution doit être accessible **avant** l'incident, pas pendant. Un export qui suppose l'outil disponible ne protège de rien.

### UF-08 Exprimer une question, un désaccord ou une tension

**P5, P1, P3** · problèmes 2 et 9 · BO-01, BO-03, BO-08 · BR-010, BR-027

**[PMA]** La notation retenue couvre l'expression d'une question **et** d'un désaccord. **Amendé le 2026-08-11** : le désaccord entre deux récits est désormais couvert par BR-027, qui impose leur coexistence sans fusion.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le participant ne comprend pas, ou n'est pas d'accord | Le type correspondant est disponible à la saisie            |
| 2 | Il formule sa question ou son désaccord       | L'élément est créé comme les autres, attribué à son auteur         |
| 3 | L'élément est posé sur le mur                 | Il est rattachable à l'étape ou à l'élément concerné **[UX]**       |
| 4 | Le facilitateur le repère                     | Les questions et désaccords sont dénombrés dans son panneau **[UX]** |
| 5 | Le groupe le traite ou le laisse ouvert       | Rien n'oblige à le résoudre                                        |

**Portée de ce flux**

| Effet                                                                                       | Persona |
|----------------------------------------------------------------------------------------------|---------|
| Donne à P5, groupe le plus nombreux, un vecteur de contribution qui ne suppose aucune connaissance du domaine | P5      |
| Permet à P1 de contredire sans se remettre en position d'autorité méthodologique            | P1      |
| Offre à P3 une alternative au silence lorsqu'il n'est pas d'accord                          | P3      |
| Fournit au facilitateur le support qui lui manquait pour acter les divergences               | P2      |

**Pattern extrait [UX]** : la question et le désaccord sont des contributions de plein droit, pas des exceptions. Ils ne doivent pas être relegués dans un canal secondaire.

### UF-09 Modifier ou supprimer un élément produit par un autre

**Tous** · problèmes 1 et 5 · BO-01 · BR-007

**[PMA]** La modification et la suppression sont ouvertes à tous les participants. Réponse du 2026-08-10.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le participant sélectionne l'élément d'un autre | L'auteur d'origine et le dernier modificateur sont visibles       |
| 2 | Il modifie la formulation ou le type          | L'élément est mis à jour pour tous                                 |
| 3 | L'attribution est actualisée                  | L'auteur d'origine est conservé, le modificateur est enregistré comme auteur de la dernière mise à jour |
| 4 | Il supprime l'élément                         | Une confirmation est demandée **[UX]**                             |
| 5 | La suppression est effectuée                  | Elle est tracée et reste réversible par n'importe quel participant |
| 6 | Un participant restaure l'élément             | La restauration est tracée comme les autres opérations             |
| 7 | Un participant consulte l'historique          | L'ensemble des opérations sur l'élément est consultable            |

**Règles actées [PMA]**, réponses du 2026-08-10 :

| Règle                                                                     | Conséquence                                                          |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Double paternité : auteur d'origine conservé, dernier modificateur tracé  | Les indicateurs KPI-03 et KPI-04 s'appuient sur l'auteur d'origine    |
| Suppression réversible par tous, et tracée                                | Aucune contribution ne disparaît définitivement pendant la séance    |
| Historique intégralement conservé                                         | Toute opération est reconstituable a posteriori                      |

**Cas limites**

| Situation                                     | Comportement attendu **[UX]**                                      |
|-----------------------------------------------|---------------------------------------------------------------------|
| Deux participants modifient simultanément     | Le dernier état prévaut, l'opération précédente reste à l'historique |
| Le seul élément d'un expert est supprimé      | L'auteur d'origine reste compté, et l'élément est restaurable      |
| Un élément adopté depuis une proposition est modifié | Le rattachement à l'extrait source est conservé              |
| Un élément supprimé puis restauré             | Sa position et ses liens sont rétablis **[UX]**                    |

**Ce flux porte les risques UX-09 et UX-10.** Il est le seul du document dont la conception soulève un enjeu social autant qu'un enjeu d'interaction. Les réponses du 2026-08-10 les ont l'un et l'autre atténués.

### UF-10 Ordonner les éléments sur la chronologie

**P1, P2, P3, P5** · problèmes 1 et 2 · BO-01 · BR-004

**Ajouté le 2026-08-10.** Ce flux manquait au document. La mise en chronologie est une activité distincte de la contribution et du vote, et c'est la plus longue de la première journée d'atelier.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre la phase d'ordonnancement | Le mur passe en mode ordonnancement **[UX]**                      |
| 2 | Le groupe identifie les extrémités            | Le premier et le dernier élément sont positionnés                   |
| 3 | Un participant déplace un élément             | La position est mise à jour pour tous                              |
| 4 | Un élément est inséré entre deux autres        | La séquence est recalculée sans chevauchement **[UX]**             |
| 5 | Le groupe ne s'accorde pas sur un ordre       | Un élément de désaccord est posé, l'ordre reste en l'état          |
| 6 | Le déplacement est tracé                      | L'historique enregistre l'opération comme les autres               |

**Cas limites**

| Situation                                                | Comportement attendu **[UX]**                                    |
|----------------------------------------------------------|-------------------------------------------------------------------|
| Deux participants déplacent le même élément simultanément | Le dernier déplacement prévaut, le précédent reste à l'historique |
| Un élément n'a pas de position déterminée                | Il reste dans une zone d'attente plutôt que d'être placé au hasard |
| Plusieurs éléments occupent le même instant             | La simultanéité est représentable, la chronologie n'est pas stricte |
| Un élément supprimé conserve sa position                 | Il reste barré à sa place, sans occuper de rang                   |

**Pattern extrait [UX]** : l'ordonnancement est une activité de conversation, pas de manipulation. Le geste doit rester assez simple pour se faire pendant qu'on parle, sinon la discussion s'arrête au profit de l'outil.

**Tranché le 2026-08-10 [PMA]** : chacun déplace librement. Voir UX-15 pour les conséquences de conception.

**Amendé le 2026-08-11** : l'exigence BR-024 ajoute les branches, les répétitions et les événements pivots. Trois étapes complètent le flux.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 7 | Le groupe identifie un point de divergence    | Un chemin alternatif part de ce point, sans quitter la frise        |
| 8 | Un fait se répète dans le temps               | Il est marqué comme répétitif plutôt que dupliqué                   |
| 9 | Un fait conditionne toute la suite            | Il est marqué comme pivot et reste repérable à distance             |

### UF-11 Cadrer le domaine et lancer le Big Picture

**P2, P1, Product Owner** · problème 3 · BO-05, BO-01 · BR-001, BR-011

**Ajouté le 2026-08-11.** Aucun flux ne couvrait l'ouverture de l'atelier. Un groupe de 23 personnes qui ne sait pas à quelle question il répond produira 23 réponses à 23 questions différentes.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre la session              | L'intention et le périmètre du domaine exploré sont affichés       |
| 2 | Il énonce la question de découverte           | La question reste visible pendant toute l'étape                    |
| 3 | Les participants rejoignent                   | Chacun voit son rôle et ce qui est attendu de lui                  |
| 4 | Il active la conservation de la transcription | L'état de la captation est visible de tous                         |
| 5 | Il lance la première étape                    | Le parcours devient visible, avec l'étape courante et les suivantes |

**Pattern extrait [UX]** : la question posée au groupe est un élément d'interface permanent, pas une phrase d'introduction. Un participant qui arrive en retard doit la lire sans demander.

### UF-13 Enrichir un fait par acteurs, commandes et politiques

**P1 à P5** · problème 8 · BO-01 · BR-025

**Ajouté le 2026-08-11.** L'enrichissement est une étape distincte de la collecte. Il explicite les causalités que la frise seule ne montre pas.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre l'étape d'enrichissement | Les types acteur, système, commande et politique sont mis en avant |
| 2 | Un participant sélectionne un fait métier     | Ses rattachements existants sont affichés                          |
| 3 | Il rattache un acteur ou un système externe   | Le lien apparaît sur le mur, orienté                               |
| 4 | Il rattache une commande au fait produit      | La commande est reliée au fait et à ce qui la déclenche            |
| 5 | Il déclare une politique                      | La politique est reliée au fait déclencheur et à la commande émise |
| 6 | Il déclare une information consultée          | L'information est rattachée à la commande concernée                |
| 7 | Un fait reste sans acteur                     | Il est signalé comme incomplet, sans être empêché                  |

**Cas limite [UX]** : l'enrichissement multiplie les liens et sature le mur. Les liens doivent être masquables sans masquer les éléments qu'ils relient.

### UF-14 Signaler un changement de langage ou de responsabilité

**P1, P3, P4** · problème 10 · BO-06, BO-08 · BR-026

**Ajouté le 2026-08-11.** Un même terme change de sens d'une partie du domaine à l'autre. C'est l'indice de frontière le plus fiable, et le plus facile à perdre s'il n'est pas capté quand il apparaît.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Un participant entend un terme employé autrement | Il déclare le terme en un geste, sans quitter le mur             |
| 2 | Il rattache une définition à une zone         | Le terme porte plusieurs définitions coexistantes                  |
| 3 | Il relie deux termes désignant la même réalité | Le lien de synonymie est enregistré                                |
| 4 | Le sens fait débat                            | Le terme est marqué comme ambigu et reste ouvert                   |
| 5 | Un participant consulte le glossaire          | Les termes, leurs définitions et leurs zones sont consultables     |
| 6 | Un architecte prépare une frontière           | Les termes ambigus lui sont proposés comme indices candidats       |

**Pattern extrait [UX]** : déclarer un changement de sens doit coûter moins qu'expliquer ce changement à voix haute, sinon personne ne le fera pendant que la conversation avance.

### UF-17 Conduire un Process Modelling

**P6, P4** · problème 11 · BO-01 · BR-031

**Ajouté le 2026-08-11.** Se déroule après l'atelier, dans la séance Design Level.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'équipe sélectionne un contexte candidat     | Ses faits métier, commandes et acteurs sont isolés du reste du mur  |
| 2 | Elle retient un scénario critique             | Le motif de sélection est consigné                                 |
| 3 | Elle déroule le scénario nominal              | L'enchaînement commande vers fait métier est représenté            |
| 4 | Elle ajoute une variante                      | La variante part d'un point identifié du scénario nominal          |
| 5 | Elle complète un trou laissé par l'atelier    | L'ajout est distingué de ce qui provient du métier                 |
| 6 | Elle consulte l'origine d'un élément          | Le fait métier du Big Picture d'où il provient reste atteignable   |

**Contrainte structurante [BRD]** : le raffinement n'altère pas le Big Picture source.

### UF-18 Formuler un invariant et proposer un agrégat

**P6, Product Owner, P3** · problème 11 · BO-01, BO-09 · BR-032, BR-033

**Ajouté le 2026-08-11.** C'est le flux le plus exposé du document : une personne technique y énonce une vérité métier.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'équipe formule une règle en langage métier  | L'invariant est créé avec le statut à vérifier                     |
| 2 | Elle rattache l'invariant aux commandes concernées | Les commandes et faits métier mis en jeu sont reliés           |
| 3 | Le représentant métier confirme ou conteste   | Le statut passe à validé ou à désaccord                            |
| 4 | Elle propose un agrégat                       | L'agrégat exige au moins un invariant pour être créé               |
| 5 | Elle complète la fiche de l'agrégat           | Intention, commandes acceptées, faits émis, informations consultées |
| 6 | Elle nomme l'agrégat                          | Le nom n'est modifiable qu'après formulation des invariants        |
| 7 | Un agrégat reste sans invariant               | Il est **refusé ou marqué incomplet**, jamais accepté silencieusement |
| 8 | La liste des invariants à vérifier est extraite | Elle est transmissible aux experts métier hors séance            |

**Conception à proscrire [UX]** : toute création d'agrégat par sélection ou regroupement d'éléments sur le mur. Le geste de regroupement visuel est exactement ce que l'exigence BR-033 interdit.

### UF-19 Parcourir la traçabilité de la parole jusqu'à l'agrégat

**P6, P1, P4** · problème 12 · BO-09 · BR-012

**Ajouté le 2026-08-11.** La chaîne compte huit maillons. Elle doit se parcourir dans les deux sens.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Un participant sélectionne un agrégat         | Son contexte, ses commandes et ses invariants sont listés          |
| 2 | Il remonte vers un invariant                  | Les faits métier qui le mettent en jeu sont atteignables           |
| 3 | Il remonte vers un fait métier                | L'auteur, le statut et l'extrait de conversation sont affichés     |
| 4 | Il descend depuis un extrait de conversation  | Les éléments qui en dérivent sont listés                           |
| 5 | Un maillon est absent                         | La rupture est signalée explicitement plutôt que silencieuse       |

**Critère de conception [UX]** : le chemin complet de l'agrégat à la parole métier tient en quatre gestes au plus. Au-delà, personne ne le parcourra et l'objectif BO-09 est manqué en pratique même s'il est satisfait sur le papier.

### UF-20 Restituer faits, hypothèses et questions séparément

**Tous** · problèmes 5 et 9 · BO-04, BO-08 · BR-013, BR-035

**Ajouté le 2026-08-11.** Une restitution qui mélange faits validés et hypothèses donne une fausse impression de consensus.

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Un participant demande la restitution         | Elle est disponible à tout instant, depuis le mur                  |
| 2 | Il choisit le périmètre                       | Modèle, transcription, décisions et liens sont sélectionnables     |
| 3 | La restitution est produite                   | Faits validés, hypothèses et questions ouvertes sont séparés       |
| 4 | Il consulte un élément                        | Nature, auteur, horodatage, statut de preuve et origine figurent   |
| 5 | Il consulte le journal des décisions          | Les hypothèses rejetées et leur motif y figurent                   |
| 6 | Il produit deux restitutions successives      | Le résultat est identique si le modèle n'a pas changé              |

**Contrainte héritée [PMA]** : la restitution doit être accessible avant un incident, pas pendant. Elle reste une action permanente du mur et non un écran dédié.

---

## 4. Catalogue des vues

**Révisé le 2026-08-11.** La version précédente comptait sept vues plus une vue transverse, conçues autour des fonctionnalités. Le catalogue compte désormais treize entrées organisées autour du parcours.

Le mur reste la vue centrale. Il ne montre jamais tous les niveaux en même temps : il change de règles et d'affordances selon l'étape. Les autres entrées sont des panneaux qui l'accompagnent ou des modes spécialisés.

| Entrée | Nature   | Étape du parcours                    | Statut               |
|--------|----------|---------------------------------------|----------------------|
| V1     | Vue      | Entrée en session                     | Inchangée            |
| V2     | Vue      | Toutes, avec modes                    | Amendée              |
| V3     | Panneau  | Conduite, toutes étapes               | Amendé               |
| V4     | Panneau  | Collecte et enrichissement            | Amendé               |
| V5     | Panneau  | Sélection d'un sujet                  | Redéfini             |
| V6     | Panneau  | Transverse                            | Inchangé             |
| V7     | Panneau  | Frontières                            | Réécrit              |
| V8     | Mode     | Chronologie                           | Ajouté le 2026-08-11 |
| V9     | Panneau  | Clarification                         | Ajouté le 2026-08-11 |
| V10    | Vue      | Frontières                            | Ajouté le 2026-08-11 |
| V11    | Vue      | Process Modelling                     | Ajouté le 2026-08-11 |
| V12    | Vue      | Design Level                          | Ajouté le 2026-08-11 |
| V13    | Panneau  | Transverse                            | Ajouté le 2026-08-11 |

**Ce que chaque mode doit afficher [UX]** : la question à laquelle le groupe répond, les éléments attendus, ce qui reste incertain, le critère de sortie, et la possibilité de revenir en arrière.

### V1 - Entrée en session

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Permettre à un participant de rejoindre l'atelier                          |
| But utilisateur        | Être présent et identifié en moins de trente secondes                      |
| Personas               | Tous                                                                        |
| Éléments clés          | Saisie du nom, nom de la session, indication du nombre de présents         |
| Interactions           | Saisir, rejoindre                                                           |
| Exigences              | BR-004 pour l'attribution des contributions                                |

### V2 - Le mur

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Représenter le modèle en construction                                       |
| But utilisateur        | Voir ce qui se construit, s'y retrouver                                    |
| Personas               | Tous                                                                        |
| Éléments clés          | Éléments typés, chronologie, auteurs, couche des propositions, éléments supprimés barrés, zone d'attente |
| Interactions           | Naviguer, zoomer, **ordonner sur la chronologie**, sélectionner, masquer les éléments supprimés |
| Exigences              | BR-004, BR-007, BR-016                                                      |

**Modes du mur [UX]** : la même vue sert plusieurs activités successives, sans changement d'écran. **Révisé le 2026-08-11**, quatre modes devenus sept.

| Mode           | Activité dominante                        | Éléments mis en avant                      | Flux    |
|----------------|-------------------------------------------|--------------------------------------------|---------|
| Collecte       | Saisie simultanée de faits métier         | Faits au passé uniquement                  | UF-01   |
| Chronologie    | Mise en ordre, branches, pivots           | Frise, zone d'attente                      | UF-10   |
| Enrichissement | Rattachement des causalités               | Acteurs, systèmes, commandes, politiques   | UF-13   |
| Clarification  | Doublons, glossaire, tensions             | Termes ambigus, divergences, questions     | UF-02, UF-08, UF-14 |
| Sélection      | Priorisation d'un sujet                   | Sujets candidats                           | UF-03   |
| Frontières     | Hypothèses de découpage                   | Zones, indices, dépendances                | UF-05, UF-15 |
| Propositions   | Adoption des éléments issus de l'échange  | Couche distincte                           | UF-04   |

**Règle de divulgation progressive [UX]** : un mode ne montre que les types d'éléments de son étape et des étapes précédentes. Les types des étapes suivantes existent mais ne sont pas mis en avant. Le mur ne doit jamais afficher les dix niveaux simultanément.

**Vue centrale.** Toutes les autres vues sont des surcouches ou des panneaux qui l'accompagnent.

### V3 - Panneau de conduite

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Donner au facilitateur la conduite de la séance                            |
| But utilisateur        | Savoir où on en est, quoi dire, combien de temps il reste                  |
| Personas               | P2, en lecture pour les autres                                             |
| Éléments clés          | Étape courante, résultat attendu, minuteur, phrase de lancement, focus à imposer |
| Interactions           | Démarrer, suspendre, revenir, terminer, imposer un focus aux vues individuelles |
| Exigences              | BR-001, BR-002, BR-036                                                      |

**Distinction [UX]** : une partie de ce panneau est publique (étape, temps restant), une partie est privée au facilitateur (phrase de lancement, indicateur de participation).

**Précisé le 2026-08-12** : le facilitateur ne contribue pas au contenu. L'indicateur de participation porte donc sur 22 contributeurs possibles et non 23.

### V4 - Saisie et contribution

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Permettre la contribution simultanée                                        |
| But utilisateur        | Poser ce que je sais sans interrompre personne                             |
| Personas               | P1, P3, P5                                                                  |
| Éléments clés          | Champ de saisie, choix du type dont question et désaccord, signalement privé, minuteur |
| Interactions           | Saisir, qualifier, valider, accepter ou ignorer un signalement, modifier, supprimer |
| Exigences              | BR-004, BR-005, BR-007, BR-008, BR-009, BR-010                              |

**Vue la plus critique du produit.** Elle porte les deux problèmes dominants et concerne 20 des 23 participants.

### V5 - Sélection d'un sujet à approfondir

**Redéfini le 2026-08-11.** Cette vue s'appelait « vote » et servait la convergence sur le contenu du mur. Elle ne porte plus que la priorisation des sujets d'exploration.

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Choisir le prochain sujet d'exploration                                     |
| But utilisateur        | Exprimer ce qui compte pour moi sans avoir à le défendre                    |
| Personas               | P1, P3, P5                                                                  |
| Éléments clés          | Sujets candidats, points restants, résultat présenté comme indicateur      |
| Interactions           | Attribuer, retirer, consulter, retenir un sujet non arrivé en tête         |
| Exigences              | BR-006                                                                      |

**Interdit de conception [UX]** : aucun élément du mur ne change d'apparence, de taille ni de position en fonction du nombre de voix reçues.

### V6 - Propositions

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Soumettre au groupe les éléments issus de la conversation                  |
| But utilisateur        | Vérifier ce qui a été dit et l'adopter si c'est juste                      |
| Personas               | P1, P3                                                                      |
| Éléments clés          | Propositions distinctes, extrait source, action d'adoption                 |
| Interactions           | Consulter l'extrait, adopter, ignorer                                       |
| Exigences              | BR-012, BR-014, BR-015, BR-016                                              |

### V7 - Contexte candidat

**Réécrit le 2026-08-11.** Cette vue s'appelait « mesures de découpage ». Elle produisait des comptages. Elle porte désormais l'argumentation d'une frontière.

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Argumenter une frontière candidate par des indices métier                  |
| But utilisateur        | Justifier une frontière par autre chose que mon intuition                   |
| Personas               | Tous, précisé le 2026-08-12                                                |
| Éléments clés          | Nom métier, responsabilité, langage, indices déclarés, faits publiés et consommés, niveau de confiance, relations franchissantes, éléments isolés |
| Interactions           | Délimiter, nommer, déclarer un indice, rattacher, consulter une mesure, supprimer |
| Exigences              | BR-017, BR-018, BR-019, BR-028, BR-029                                      |

**Signal structurant [UX]** : une frontière portant moins de deux indices est marquée comme non étayée. Le marquage est visible sans être bloquant, conformément au principe 7.

### V8 - Mode chronologie

**Ajouté le 2026-08-11.**

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Mettre les faits métier en ordre sans forcer une séquence unique           |
| But utilisateur        | Comprendre dans quel ordre les choses se produisent                        |
| Personas               | P1, P2, P3, P5                                                              |
| Éléments clés          | Frise, branches, simultanéités empilées, répétitions, pivots, zone d'attente |
| Interactions           | Déplacer, placer avant, placer après, remettre en attente, ouvrir une branche |
| Exigences              | BR-024                                                                      |

### V9 - Glossaire et tensions

**Ajouté le 2026-08-11.**

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Capter les changements de langage, les questions et les désaccords         |
| But utilisateur        | Savoir de quoi on parle, et sur quoi on n'est pas d'accord                  |
| Personas               | P1, P3, P4, P5                                                              |
| Éléments clés          | Termes et leurs définitions par zone, synonymes, termes ambigus, récits divergents, questions ouvertes |
| Interactions           | Déclarer un terme, rattacher une définition, relier deux termes, marquer une ambiguïté |
| Exigences              | BR-010, BR-026, BR-027                                                      |

**Justification [UX]** : ce panneau alimente directement V7. Un changement de sens non capté pendant la clarification ne sera jamais disponible comme indice de frontière.

### V10 - Carte des contextes candidats

**Ajouté le 2026-08-11.**

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Montrer les contextes candidats et ce qui circule entre eux                 |
| But utilisateur        | Juger un découpage sur ce qui le traverse, pas sur ses zones               |
| Personas               | P4, P1, P3, P6                                                              |
| Éléments clés          | Contextes, dépendances nommées et orientées, responsabilités, comparaison côte à côte de deux hypothèses |
| Interactions           | Sélectionner une hypothèse, comparer, nommer une dépendance, marquer une ambiguïté |
| Exigences              | BR-028, BR-030                                                              |

### V11 - Process Modelling

**Ajouté le 2026-08-11.** Utilisée en séance restreinte, après l'atelier.

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Raffiner un scénario critique à l'intérieur d'un contexte candidat         |
| But utilisateur        | Comprendre le fonctionnement réel d'un processus avant de le construire     |
| Personas               | P6, P4                                                                      |
| Éléments clés          | Enchaînement acteur ou politique, commande, fait métier, information consultée, variantes |
| Interactions           | Sélectionner un scénario, dérouler, ajouter une variante, remonter au Big Picture |
| Exigences              | BR-031                                                                      |

### V12 - Invariants et agrégats

**Ajouté le 2026-08-11.** Utilisée en séance restreinte, après l'atelier.

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Formuler des invariants et en déduire des agrégats candidats               |
| But utilisateur        | Construire sur des règles vérifiées plutôt que sur une interprétation      |
| Personas               | P6, Product Owner                                                           |
| Éléments clés          | Invariants et leur statut, agrégats candidats, commandes acceptées, faits émis, informations consultées, niveau de confiance |
| Interactions           | Formuler, rattacher, confirmer, contester, proposer un agrégat, extraire la liste à vérifier |
| Exigences              | BR-032, BR-033                                                              |

**Interdit de conception [UX]** : aucune création d'agrégat par sélection ou regroupement d'éléments sur le mur.

### V13 - Traçabilité

**Ajouté le 2026-08-11.**

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Naviguer entre transcription, fait métier, décision, frontière et agrégat  |
| But utilisateur        | Vérifier sur quoi repose ce que je lis                                      |
| Personas               | P1, P4, P6                                                                  |
| Éléments clés          | Chaîne des huit maillons, statut de preuve, journal des décisions, ruptures signalées |
| Interactions           | Remonter, descendre, filtrer par statut, consulter un extrait               |
| Exigences              | BR-012, BR-034, BR-035                                                      |

**Critère de conception [UX]** : quatre gestes au plus entre un agrégat et la parole métier qui le fonde.

### Vue transverse - Restitution

**[UX]** La restitution du modèle (BR-013) n'est pas une vue mais une action disponible depuis V2, à tout instant. Ce choix découle de UF-07 : un export accessible seulement depuis un écran dédié ne protège pas le jalon.

---

## 5. Descriptions de wireframes basse fidélité

Descriptions structurées uniquement. Aucun choix visuel, aucune position définitive.

### W1 - Le mur pendant la collecte des faits métier

Correspond à V2 en mode collecte, combinée à V3 et V4. **C'est le premier écran de l'atelier**, affiché sur les 23 postes individuels. **Précisé le 2026-08-12** : chacun dispose de sa propre vue, il n'y a pas de projection partagée.

**Amendé le 2026-08-11.** La version précédente décrivait une contribution générique, tous types disponibles et signalement actif. Trois écarts en découlaient.

| Écart                                              | Correction apportée                                                    |
|----------------------------------------------------|-------------------------------------------------------------------------|
| Le bandeau annonçait l'étape, pas la question      | La zone A affiche la question posée au groupe                          |
| Tous les types étaient offerts dès la collecte     | Le type fait métier est proposé par défaut, les autres restent accessibles |
| Le signalement était actif dès la saisie           | Aucun contrôle automatique en collecte, une vérification volontaire en zone D |

Le mur n'est pas ordonné pendant cette étape. La chronologie est une activité distincte, décrite en W5.

```
┌─────────────────────────────────────────────────────────────┐
│ ZONE A - Bandeau de conduite (public)                       │
│ Étape courante · Résultat attendu · Temps restant           │
├───────────────────────────────────────────┬─────────────────┤
│                                           │ ZONE C          │
│ ZONE B - Le mur                           │ Contribution    │
│                                           │                 │
│ Éléments typés disposés sur une           │ Champ de saisie │
│ chronologie de gauche à droite            │ Choix du type   │
│                                           │ Signalement     │
│ Couche des propositions distinguée        │ privé           │
│                                           │                 │
│                                           │ Légende de      │
│                                           │ notation        │
├───────────────────────────────────────────┴─────────────────┤
│ ZONE D - Actions permanentes                                │
│ Restituer le modèle · Consulter la notation                 │
│ Masquer les éléments supprimés                              │
└────────────────────────────────────────────────────────┘
```

| Zone | Données affichées                                          | Points d'interaction                              |
|------|------------------------------------------------------------|---------------------------------------------------|
| A    | Question posée, résultat attendu, temps restant            | Aucun pour les participants                       |
| B    | Faits métier, auteurs, éléments supprimés                  | Navigation, sélection                             |
| C    | Champ vide, type proposé, légende                          | Saisie, qualification, validation                 |
| D    | État du filtre                                             | Restitution, notation, vérification volontaire    |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| La saisie occupe une colonne fixe, jamais une modale | Une modale masque le mur et interrompt la contribution continue             |
| Aucun contrôle automatique pendant la collecte     | **2026-08-11.** Une formulation imparfaite vaut mieux qu'une contribution perdue |
| Une vérification volontaire reste accessible       | **2026-08-11.** Qui veut se vérifier le peut, le dispositif ne l'impose pas  |
| Le mur n'est pas ordonné pendant la collecte       | **2026-08-11.** Collecter et ordonner en même temps arrête la production     |
| La légende est permanente et non repliée par défaut | 18 des 23 participants découvrent la notation                              |
| La restitution est dans une zone permanente        | Elle doit être atteignable avant un incident, pas pendant                   |

### W2 - Panneau de conduite, vue facilitateur

Correspond à V3 dans sa partie privée. **Visible du seul facilitateur.**

```
┌─────────────────────────────────────────┐
│ ZONE A - Étape                          │
│ Numéro, titre, objectif                 │
├─────────────────────────────────────────┤
│ ZONE B - Ce que je dis                  │
│ Phrase de lancement, prête à énoncer    │
├─────────────────────────────────────────┤
│ ZONE C - Où en est le groupe            │
│ Nombre de contributeurs actifs          │
│ Participants sans contribution          │
├─────────────────────────────────────────┤
│ ZONE D - Conduite                       │
│ Démarrer · Suspendre · Terminer         │
│ Revenir à l'étape précédente            │
└─────────────────────────────────────────┘
```

| Zone | Données affichées                                    | Points d'interaction                        |
|------|------------------------------------------------------|---------------------------------------------|
| A    | Étape courante et son objectif                      | Aucun                                       |
| B    | Texte à énoncer                                     | Aucun, lecture seule                        |
| C    | Compteurs de participation **[UX]**                 | Aucun, information seule                    |
| D    | État du minuteur                                    | Démarrer, suspendre, terminer, revenir      |

**Point de vigilance [UX]** : la zone C ne doit pas désigner nominativement les participants silencieux à l'écran partagé. Elle sert au facilitateur pour aller les chercher discrètement, pas à les exposer.

### W3 - Contexte candidat et ses indices

Correspond à V7. **Réécrit le 2026-08-11.** La version précédente s'appelait « vue de découpage », plaçait les comptages au centre et s'utilisait hors atelier. L'usage revient dans l'atelier, et les indices métier prennent la place des comptages.

| Écart                                              | Correction apportée                                                    |
|----------------------------------------------------|-------------------------------------------------------------------------|
| La zone A listait des zones géométriques           | Elle liste des hypothèses de découpage concurrentes, avec auteur et statut |
| La zone C affichait des comptages                  | Elle affiche la fiche du contexte, ses indices déclarés, puis les mesures |
| Rien ne signalait une frontière insuffisamment étayée | Un compteur d'indices sur huit et le marquage non étayée figurent sur la fiche |
| Le mur ne montrait pas les termes ambigus          | La zone B les met en évidence comme indices candidats                   |

```
┌─────────────────────────────────────────────────────────────┐
│ ZONE A - Zones définies                                     │
│ Liste des zones nommées, création, suppression              │
├───────────────────────────────────────────┬─────────────────┤
│                                           │ ZONE C          │
│ ZONE B - Le mur avec superpositions       │ Mesures         │
│                                           │                 │
│ Zones matérialisées                       │ Relations       │
│ Coloration par acteur activable           │ franchissantes  │
│ Éléments isolés signalés                  │ Éléments isolés │
│                                           │ Comparaison     │
├───────────────────────────────────────────┴─────────────────┤
│ ZONE D - Traçabilité                                        │
│ Extrait de conversation de l'élément sélectionné            │
└─────────────────────────────────────────────────────────────┘
```

| Zone | Données affichées                                    | Points d'interaction                        |
|------|------------------------------------------------------|---------------------------------------------|
| A    | Hypothèses concurrentes, auteur, statut              | Créer, sélectionner, comparer, supprimer    |
| B    | Modèle, zones, coloration, isolats, termes ambigus   | Délimiter, activer une coloration           |
| C    | Fiche du contexte, indices déclarés, puis mesures    | Déclarer un indice, rattacher, compléter    |
| D    | Éléments fondant l'indice, extrait source            | Ouvrir, remonter à la parole                |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| Le compteur d'indices précède les mesures          | Une frontière se juge sur ses indices, la mesure n'en est qu'un              |
| Le marquage « non étayée » figure sur la fiche     | Empêche qu'un tracé de zone passe pour un raisonnement                      |
| La zone D est permanente et non contextuelle       | La traçabilité est le critère d'acceptation de P4 et de P6                  |
| Les hypothèses concurrentes sont listées en zone A | Elles coexistent jusqu'à la décision du groupe                              |

### W6 - Invariants et agrégats

**Ajouté le 2026-08-11.** Correspond à V12. Utilisé en séance restreinte, après l'atelier. Décrit par zones, sans schéma.

| Zone | Données affichées                                                  | Points d'interaction                           |
|------|--------------------------------------------------------------------|------------------------------------------------|
| A    | Contexte candidat sélectionné et scénario retenu                   | Changer de contexte, changer de scénario       |
| B    | Invariants formulés, avec leur statut et leur rattachement         | Formuler, rattacher, confirmer, contester      |
| C    | Agrégats candidats, intention, commandes, faits émis, informations | Proposer, compléter, nommer                    |
| D    | Liste des invariants à vérifier par le métier                      | Extraire, transmettre                          |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| La zone B précède la zone C dans l'ordre de lecture | Un agrégat se déduit d'invariants, jamais l'inverse                        |
| Le champ de nom de l'agrégat reste inactif au départ | Le nom n'est arrêté qu'après formulation des invariants                   |
| Aucune sélection multiple sur le mur ne crée d'agrégat | Le regroupement visuel est exactement ce que BR-033 interdit             |
| La zone D est permanente                           | Les experts métier ne sont pas dans la salle, la liste doit sortir de la séance |

### W7 - Traçabilité de la parole à l'agrégat

**Ajouté le 2026-08-11.** Correspond à V13. Décrit par zones, sans schéma.

| Zone | Données affichées                                                  | Points d'interaction                           |
|------|--------------------------------------------------------------------|------------------------------------------------|
| A    | Chaîne des huit maillons, du fait métier à l'agrégat               | Sélectionner un maillon                        |
| B    | Élément sélectionné, sa nature, son auteur, son statut de preuve   | Remonter, descendre                            |
| C    | Extrait de conversation d'origine                                  | Ouvrir, écouter le contexte                    |
| D    | Ruptures de chaîne signalées                                       | Localiser, marquer à vérifier                  |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| La chaîne est représentée entière, pas maillon par maillon | Voir la distance qui sépare un agrégat de la parole change le rapport à la confiance |
| Les ruptures sont signalées explicitement          | Un lien manquant qui ne se voit pas passe pour une absence de lien           |
| La navigation fonctionne dans les deux sens        | P6 part de l'agrégat, P1 part de la parole                                  |

### W4 - Propositions après reprise de séance

Correspond à V6, en surcouche de V2.

```
┌─────────────────────────────────────────────────────────────┐
│ ZONE A - Contexte                                           │
│ Nombre de propositions · Origine · Échéance de péremption   │
├─────────────────────────────────────────────────────────────┤
│ ZONE B - Le mur, avec les propositions intercalées          │
│                                                             │
│ Éléments du groupe : forme pleine                           │
│ Propositions : forme distincte, bordure discontinue,        │
│ étiquette explicite « proposition »                         │
├─────────────────────────────────────────────────────────────┤
│ ZONE C - Détail de la proposition sélectionnée              │
│ Formulation · Extrait de conversation · Adopter · Ignorer   │
└─────────────────────────────────────────────────────────────┘
```

| Zone | Données affichées                                    | Points d'interaction                        |
|------|------------------------------------------------------|---------------------------------------------|
| A    | Décompte, origine, délai avant disparition          | Aucun                                       |
| B    | Deux couches visuellement séparées                  | Sélectionner une proposition                |
| C    | Texte, extrait source                               | Adopter, ignorer                            |

**Contrainte critique [BRD]** : la distinction entre les deux couches ne peut reposer sur la seule couleur. Voir la section accessibilité.

### W5 - Le mur en mode ordonnancement

Variante de W1 pendant la phase de mise en chronologie. Ajouté le 2026-08-10.

```
┌────────────────────────────────────────────────────────┐
│ ZONE A - Bandeau de conduite                                │
│ Étape « mise en chronologie » · Temps restant               │
├────────────────────────────────────────────────────────┤
│ ZONE B - La chronologie                                     │
│                                                             │
│ Début ────────────────────────────────────────► Fin │
│ Éléments placés, simultanéités empilées verticalement       │
├────────────────────────────────────────────────────────┤
│ ZONE C - Zone d'attente                                     │
│ Éléments non encore positionnés, avec leur décompte         │
├────────────────────────────────────────────────────────┤
│ ZONE D - Placement de l'élément sélectionné                 │
│ Placer avant · Placer après · Remettre en attente           │
└────────────────────────────────────────────────────────┘
```

| Zone | Données affichées                                    | Points d'interaction                        |
|------|------------------------------------------------------|---------------------------------------------|
| A    | Étape et temps restant                              | Aucun pour les participants                 |
| B    | Éléments positionnés sur l'axe du temps             | Déplacer, sélectionner                      |
| C    | Éléments sans position, et leur nombre              | Sélectionner                                |
| D    | Élément sélectionné                                 | Placer avant, placer après, remettre en attente |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| Une zone d'attente séparée                        | Un élément dont personne ne connaît la place ne doit pas être placé au hasard |
| Le décompte des éléments en attente               | Donne au facilitateur le critère de progression qui lui manque, voir UX-08   |
| La zone D existe indépendamment du glissement     | Le glisser-déposer ne peut être le seul moyen de placer un élément          |
| Les simultanéités sont empilées verticalement     | Une chronologie d'Event Storming n'est pas une file, plusieurs faits coexistent |

---

## 6. Guidelines UX et accessibilité

### 6.1 Principes UX

| # | Principe **[UX]**                                        | Origine                                                                |
|---|-----------------------------------------------------------|-------------------------------------------------------------------------|
| 1 | Le mur est le sujet, l'outil est le décor                | Le modèle appartient au groupe, non à l'outil                          |
| 2 | Contribuer doit coûter moins que prendre la parole       | Sinon le produit ne résout pas le problème 2                           |
| 3 | Une correction s'adresse à son auteur, jamais au groupe  | Exigence BR-008, et point de décrochage de P3                          |
| 4 | L'inaction est un refus, jamais un accord                | Décision du cadrage produit sur la péremption                          |
| 5 | Deux origines ne se confondent jamais                    | Exigence BR-016                                                         |
| 6 | L'humain garde le rythme et la parole                    | Décision du cadrage produit, l'outil n'anime pas                       |
| 7 | Rien ne bloque une contribution                          | Exigence BR-009                                                         |
| 8 | Chaque étape montre la question à laquelle on répond     | **2026-08-11.** Exigence BR-001                                        |
| 9 | Un vote informe, il ne décide pas                        | **2026-08-11.** Exigence BR-006                                        |
| 10| Rester en hypothèse est un résultat acceptable           | **2026-08-11.** Exigences BR-028 et BR-035                             |
| 11| Un désaccord se conserve, il ne se lisse pas             | **2026-08-11.** Exigence BR-027                                        |
| 12| Une conclusion montre toujours ce sur quoi elle repose   | **2026-08-11.** Exigences BR-012 et BR-029                             |

### 6.2 Guidelines de conception

| Sujet                  | Orientation **[UX]**                                                                    |
|------------------------|------------------------------------------------------------------------------------------|
| Densité                | Voir la stratégie détaillée ci-dessous, ajoutée le 2026-08-11                           |
| Vocabulaire            | Employer les termes du métier assurance, jamais ceux de la méthode seule                |
| Exemples               | Toute explication de notation s'appuie sur le domaine dommage aux biens                 |
| Modales                | À proscrire pendant les phases de contribution                                           |
| Notifications          | Discrètes, non bloquantes, et privées lorsqu'elles concernent une personne              |
| Bibliothèque           | Design system Canopée, icônes Material Symbols, jetons de la bibliothèque               |

#### Stratégie de densité

**Ajoutée le 2026-08-11.** Le mur porte désormais dix niveaux de lecture au lieu de deux. Sans stratégie explicite, le risque UX-04 devient certitude.

| Moyen                                              | Effet attendu                                                          |
|----------------------------------------------------|-------------------------------------------------------------------------|
| Divulgation progressive des types                  | Un mode ne met en avant que les types de son étape                     |
| Filtres par scénario, période, acteur, contexte, statut | Chacun réduit le mur à ce qu'il cherche                            |
| Zoom sémantique                                    | Le niveau de détail change avec l'échelle, pas seulement la taille     |
| Vues personnelles                                  | Chacun dispose de sa propre vue, un filtre individuel ne modifie ni le modèle ni l'affichage des autres |
| Minimap et repères stables                         | Se repérer sans parcourir l'ensemble                                   |
| Focus imposé par le facilitateur                   | **2026-08-12.** Il repositionne les vues individuelles et n'interrompt jamais une saisie en cours |
| Repère de focus collectif                          | **2026-08-12.** Chacun voit ce que le groupe regarde, même en vue individuelle |
| Une seule hypothèse de découpage tracée            | **2026-08-12.** Toutes les hypothèses sont listées dès leur création, une seule est tracée sur le mur à la fois |
| Les hypothèses ne se tracent qu'en mode Frontières | **2026-08-12.** Elles restent créables à tout moment sans parasiter les étapes antérieures |
| Comparaison côte à côte                            | Deux hypothèses de découpage au plus, sans superposition illisible     |

**Effet de la vue individuelle [UX].** Le partage d'écran projeté imposait la densité du poste le plus mal loti. Chacun ayant sa propre vue, la contrainte de densité se relâche mais un risque apparaît : le groupe peut cesser de regarder la même chose. C'est ce que traite le repère de focus collectif, voir UX-27.

**Révision d'une orientation antérieure [UX].** La version précédente recommandait d'animer les déplacements pour rendre le mouvement lisible. Cette orientation est abandonnée : elle aggrave le risque UX-17 en ajoutant du mouvement à un mur déjà mobile.

| Ancienne orientation                    | Nouvelle orientation                                                    |
|-----------------------------------------|--------------------------------------------------------------------------|
| Animer chaque déplacement               | Position stable, le changement se signale sans se rejouer               |
| Mise à jour continue pendant les phases denses | Aperçu de modification, puis synchronisation explicite             |
| Rendre tout mouvement perceptible       | Rendre perceptible ce qui a changé, pas le fait que ça bouge            |

### 6.3 Accessibilité

**Population concernée** : 18 des 23 participants ne sont pas techniques. Contexte distanciel, équipements hétérogènes, durée de deux jours.

#### Points bloquants identifiés

| # | Point                                                                                   | Critère             | Recommandation **[UX]**                                                              |
|---|------------------------------------------------------------------------------------------|---------------------|---------------------------------------------------------------------------------------|
| 1 | La distinction entre éléments du groupe et propositions ne peut reposer sur la couleur   | WCAG 1.4.1          | Combiner forme, bordure et étiquette textuelle explicite                              |
| 2 | Une phase de contribution chronométrée peut exclure les participants les plus lents      | WCAG 2.2.1          | Le minuteur ne coupe pas la saisie, et le facilitateur peut prolonger                 |
| 3 | Les types d'éléments distingués par la couleur seule sont inaccessibles                  | WCAG 1.4.1          | Chaque type porte un libellé textuel, pas seulement une teinte                        |
| 4 | La disparition automatique des propositions n'est pas perceptible sans regard permanent  | WCAG 2.2.1          | Annoncer la péremption, la rendre consultable, ne pas la faire silencieusement        |
| 5 | Un mur dense n'est pas navigable au clavier sans structure                               | WCAG 2.1.1          | Parcours clavier complet, ordre de tabulation cohérent avec la chronologie            |
| 6 | L'état barré d'un élément supprimé n'est pas restitué par un lecteur d'écran            | WCAG 1.3.1          | Doubler le barré d'une mention textuelle explicite, par exemple « supprimé »          |
| 7 | Un ordonnancement reposant uniquement sur le glisser-déposer exclut une partie des utilisateurs | WCAG 2.5.7   | **Couvert le 2026-08-10.** Alternative « placer avant » et « placer après » confirmée |

**Le point 1 est structurant.** L'exigence BR-016 impose une distinction sans ambiguïté entre les deux couches. Une distinction par couleur seule échoue pour un participant daltonien, et échoue aussi sur un écran de mauvaise qualité. Chacun disposant de sa propre vue, l'équipement le plus mal loti détermine ce qui doit rester lisible pour tous.

#### Exigences d'accessibilité générales

| Domaine               | Attendu                                                                                 |
|-----------------------|------------------------------------------------------------------------------------------|
| Navigation clavier    | L'ensemble du parcours de contribution accessible sans souris                            |
| Lecteur d'écran       | Étape courante, temps restant et signalements annoncés comme régions vivantes            |
| Contraste             | Niveau AA au minimum, y compris sur les éléments du mur                                   |
| Zoom                  | Fonctionnement préservé à 200 pour cent                                                  |
| Cibles tactiles       | 24 pixels minimum                                                                         |
| Mouvement             | Toute animation respectant la préférence de réduction du mouvement                        |
| Langue                | Interface en français, cohérente avec le vocabulaire métier                               |

#### Recommandation transverse

Le parcours de contribution étant prioritairement une saisie au clavier, **la conception clavier n'est pas une adaptation mais le mode nominal**. C'est une opportunité rare de traiter l'accessibilité par la conception plutôt que par la mise en conformité.

---

## 7. Risques UX, complexité et zones d'incertitude

### 7.1 Risques UX

**Révisé le 2026-08-11, complété le 2026-08-12.** Vingt-huit risques recensés, dont onze clos. Quatre risques sont nés des décisions du 2026-08-12 sur la vue individuelle, le focus imposé et les hypothèses de découpage.

| # | Risque                                                                                  | Persona   | Sévérité | Atténuation **[UX]**                                                       |
|---|------------------------------------------------------------------------------------------|-----------|----------|-----------------------------------------------------------------------------|
| **UX-01** | Un signalement de notation perçu comme une correction publique fait taire P3 pour la journée | P3, P5    | Élevée   | Signalement privé, formulation interrogative, et muet pendant la collecte  |
| **UX-02** | Le minuteur coupe une contribution en cours et décourage                                | P3, P5    | Élevée   | Le minuteur signale sans interrompre, prolongation possible                |
| ~~UX-03~~ | ~~Le vote élimine les cas rares, qui sont la valeur des experts~~                       | P3        | Clos     | **2026-08-11.** Le vote devient un indicateur, aucun élément n'est supprimé ni déclassé |
| **UX-04** | Le mur devient illisible au-delà de quelques centaines d'éléments en visio               | Tous      | Élevée   | Stratégie de densité de la section 6.2                                    |
| ~~UX-05~~ | ~~P5 n'a aucun moyen de poser une question~~                                            | P5        | Clos     | La notation couvre l'expression d'une question                            |
| ~~UX-06~~ | ~~P1 n'a aucun moyen d'exprimer un désaccord de fond~~                                  | P1, P4    | Clos     | La notation couvre l'expression d'un désaccord                            |
| ~~UX-07~~ | ~~Le facilitateur doit acter les divergences sans support outillé~~                     | P2        | Clos     | **2026-08-11.** BR-027 impose la conservation des récits divergents        |
| ~~UX-08~~ | ~~Le facilitateur n'a aucun critère pour décider de passer à l'étape suivante~~         | P2        | Clos     | **2026-08-11.** BR-036 rend observable ce qui reste à clarifier           |
| ~~UX-09~~ | ~~La modification ouverte entre en tension avec l'attribution~~                          | P1, P3    | Clos     | Double paternité actée, l'auteur d'origine est conservé                   |
| **UX-10** | Un élément d'expert métier peut être supprimé par un non-expert                          | P3        | Faible   | Suppression tracée et réversible par tous                                 |
| **UX-11** | Un historique affiché par défaut alourdit le mur et crée une pression sociale            | Tous      | Moyenne  | Historique consultable à la demande, jamais affiché en permanence         |
| ~~UX-12~~ | ~~Un élément supprimé devient invisible, donc irrécupérable~~                           | P3        | Clos     | Les éléments supprimés restent visibles en état barré                     |
| ~~UX-13~~ | ~~Les éléments barrés s'ajoutent à la densité d'un mur saturé~~                          | Tous      | Clos     | Filtre de masquage acté, affichage visible par défaut                     |
| **UX-14** | L'historique n'est pas restitué et disparaît avec l'outil                               | P1, P4    | Faible   | À signaler si l'outil est décommissionné après septembre                  |
| ~~UX-15~~ | ~~Vingt-trois personnes déplaçant des éléments produisent du chaos~~                    | Tous      | Clos     | Déplacement libre acté, coût de lisibilité assumé                         |
| ~~UX-16~~ | ~~Un ordonnancement par glisser-déposer exclut une partie des participants~~             | Tous      | Clos     | Alternative placer avant et placer après confirmée                        |
| **UX-17** | Un mur qui bouge en permanence détourne l'attention de la conversation                   | Tous      | Moyenne  | **Atténuation révisée le 2026-08-11** : position stable et synchronisation explicite, plutôt qu'animation |
| **UX-18** | La collecte se détourne vers les commandes et les solutions                              | P1, P3    | Élevée   | Type fait métier proposé par défaut, les autres conservés et reproposés plus tard |
| **UX-19** | Une zone tracée sur le mur est perçue comme une frontière décidée                        | P4, P3    | Élevée   | Marquage non étayée, indices avant mesures, statut hypothèse par défaut   |
| **UX-20** | Un agrégat est proposé par regroupement visuel plutôt que par règle                      | P6, P4    | Élevée   | Création refusée ou marquée incomplète sans invariant, nom verrouillé     |
| **UX-21** | La chaîne de traçabilité se rompt entre l'atelier et la séance Design Level              | P6, P1    | Élevée   | Ruptures signalées explicitement, navigation bidirectionnelle en quatre gestes |
| **UX-22** | Dix niveaux de lecture sur un même mur le rendent inutilisable en visio                  | Tous      | Élevée   | Divulgation progressive par mode, zoom sémantique, vues personnelles      |
| **UX-23** | Une équipe technique valide seule des règles métier                                      | P6, P3    | Élevée   | Représentant métier en séance et validation a postériori des invariants   |
| **UX-24** | Rester en hypothèse est vécu comme un échec et pousse à trancher trop tôt                | P4, P2    | Moyenne  | Le statut hypothèse est présenté comme un résultat acceptable            |
| ~~UX-25~~ | ~~Le focus imposé par le facilitateur interrompt une contribution en cours~~              | P3, P5    | Clos     | **2026-08-12.** Le focus ne peut pas interrompre une saisie en cours, décision QU-18 |
| **UX-26** | Les hypothèses de découpage prolifèrent, 23 participants sans limite de création         | P4, Tous  | Élevée   | **2026-08-12.** Toutes sont listées et visibles dès leur création, une seule est tracée sur le mur à la fois, deux au plus en comparaison |
| **UX-27** | Chacun ayant sa propre vue, le groupe cesse de regarder la même chose                    | Tous      | Moyenne  | **2026-08-12.** Le focus du facilitateur réaligne les vues, et un repère indique ce que le groupe regarde |
| **UX-28** | Une hypothèse créée pendant une étape antérieure détourne la collecte vers le découpage  | P1, P3    | Moyenne  | **2026-08-12.** Les hypothèses ne se tracent sur le mur qu'en mode Frontières, elles restent créables et listables à tout moment |

### Historique des décisions de conception

**Compacté le 2026-08-11.** Les développements successifs des risques UX-09 à UX-17, qui apparaissaient tantôt comme nouveaux tantôt comme clos, sont remplacés par ce journal.

| Date       | Décision                                                          | Origine | Conséquence de conception retenue                                    |
|------------|--------------------------------------------------------------------|---------|-----------------------------------------------------------------------|
| 2026-08-10 | Double paternité, auteur d'origine conservé                       | PMA     | Deux attributions par élément, la première dominante                 |
| 2026-08-10 | Suppression réversible par tous, et tracée                        | PMA     | La réversibilité suppose que la suppression soit perceptible         |
| 2026-08-10 | Historique intégralement conservé                                 | PMA     | Consultation à la demande, aucune notification de modification       |
| 2026-08-10 | Éléments supprimés visibles en état barré                          | PMA     | Doublé d'une mention textuelle pour les lecteurs d'écran             |
| 2026-08-10 | Filtre de masquage des supprimés, portée individuelle              | PMA     | Un filtre collectif annulerait la protection apportée par la visibilité |
| 2026-08-10 | Chacun déplace librement pendant la chronologie                   | PMA     | Marque passagère sur l'élément en cours de déplacement              |
| 2026-08-10 | Alternative de placement sans glissement                          | PMA     | Placer avant et placer après, disponibles au clavier                 |
| 2026-08-10 | La restitution n'inclut pas l'historique                          | PMA     | L'historique disparaît avec l'outil, voir UX-14                      |
| 2026-08-11 | Le vote est un indicateur, il ne supprime rien                     | BRD     | Aucun classement permanent, aucune taille proportionnelle aux voix   |
| 2026-08-11 | Le signalement de notation dépend de l'étape                       | BRD     | Muet en collecte, actif en clarification, volontaire à tout moment   |
| 2026-08-11 | Les mesures de participation ne sont pas affichées en séance       | BRD     | Le panneau du facilitateur montre l'activité, jamais un classement   |
| 2026-08-11 | L'autorité appartient au groupe réuni en séance                    | BRD     | Une frontière s'affiche comme hypothèse, jamais comme décision d'un rôle |
| 2026-08-11 | Les déplacements ne sont plus animés                               | UX      | Position stable, aperçu de modification, synchronisation explicite   |

**Substitution notable.** La recommandation du 2026-08-10 d'animer les déplacements pour rendre le mouvement lisible est abandonnée. Elle aggravait UX-17 en ajoutant du mouvement à un mur déjà mobile, et elle entrait en tension avec la préférence de réduction du mouvement.

### Développements historiques, conservés pour mémoire

Les blocs qui suivent détaillent le raisonnement ayant conduit aux décisions du 2026-08-10. Ils sont résumés dans le journal ci-dessus et n'ont plus valeur de recommandation active. Les intitulés « nouveau » et « clos » décrivent l'état du risque au moment où le bloc a été écrit.

#### UX-15, analyse initiale

La phase de mise en chronologie est la plus longue de la première journée. La modification est ouverte à tous **[PMA]**, ce qui autorise vingt-trois personnes à déplacer des éléments en même temps sur un mur partagé.

| Conséquence probable                                              | Effet                                                       |
|--------------------------------------------------------------------|--------------------------------------------------------------|
| Déplacements concurrents sur les mêmes éléments                   | Le mur bouge sans qu'on sache qui a fait quoi               |
| Impossibilité de suivre visuellement                              | Le groupe cesse de regarder le mur                          |
| La conversation s'arrête au profit de la manipulation             | L'inverse de l'objectif de l'Event Storming                 |

**Trois options [UX]**, à trancher par le Product Owner :

| Option                                              | Ce qu'elle produit                                                     |
|-----------------------------------------------------|-------------------------------------------------------------------------|
| Le facilitateur seul déplace pendant cette phase   | Ordre maîtrisé, mais il redevient scribe, ce que le produit combat    |
| Chacun déplace librement                            | Contribution maximale, lisibilité collective compromise                |
| Chacun déplace, avec verrou temporaire par élément | Compromis, un élément en cours de déplacement n'est pas saisissable   |

La première option reproduit exactement le problème que le produit cherche à résoudre, mais appliqué au facilitateur plutôt qu'au porteur de la méthode.

#### UX-15, résolution du 2026-08-10

**Décision du Product Owner [PMA]** : pendant la mise en chronologie, **chacun déplace librement**.

Cette décision est cohérente avec l'ensemble du produit. Elle prolonge l'ouverture déjà actée sur la modification, et elle évite que le facilitateur ne redevienne scribe, ce qui aurait reproduit sur lui le problème que le produit résout pour le porteur de la méthode.

**Coût assumé** : la lisibilité collective. Un mur où vingt-trois personnes déplacent en même temps est plus difficile à suivre qu'un mur piloté par une seule.

**Conséquences de conception [UX]** : la réponse au désordre n'est pas de restreindre le geste, mais de le rendre lisible.

| Recommandation                                                    | Motif                                                              |
|--------------------------------------------------------------------|---------------------------------------------------------------------|
| Un élément en cours de déplacement porte une marque passagère     | Évite que deux personnes se disputent le même élément              |
| Les déplacements sont animés, jamais instantanés                  | Un élément qui se téléporte est perdu de vue par le groupe          |
| L'animation respecte la préférence de réduction du mouvement      | Contrainte d'accessibilité déjà posée                              |
| Les changements de position figurent à l'historique               | Un déplacement erroné reste identifiable et réversible             |

**Protection héritée** : l'historique intégral et la double paternité déjà actés couvrent le cas où un non-expert déplace à tort l'élément d'un expert. L'opération est tracée, donc identifiable et réversible.

#### UX-17, analyse initiale

Le déplacement libre produit un mur en mouvement continu pendant que le groupe discute. Le risque n'est plus le conflit d'édition, il est l'attention.

La règle de conception qui en découle **[UX]** : pendant la phase d'ordonnancement, **le mur doit rester lisible à distance**. Un participant qui suit la conversation sans manipuler doit pouvoir comprendre ce qui change sans avoir à fixer l'écran.

#### UX-16, résolution du 2026-08-10

Un ordonnancement conçu autour du glisser-déposer pose deux difficultés.

| Difficulté                                                        | Population concernée                                        |
|--------------------------------------------------------------------|--------------------------------------------------------------|
| Le glissement est inutilisable au clavier                          | Tout participant naviguant sans souris                      |
| Le glissement précis est difficile sur écran tactile ou pavé tactile | Une part des 23 participants en distanciel                 |

**Décision du Product Owner [PMA]** : l'alternative sans glissement est confirmée dans le périmètre. Un élément peut être positionné par sélection, au moyen de « placer avant » et « placer après ».

Le glisser-déposer reste disponible. Il n'est plus le seul moyen de placer un élément, ce qui satisfait le critère d'accessibilité 7.

#### UX-09, résolution du 2026-08-10

La règle de **double paternité** est actée : un élément conserve son auteur d'origine, et le dernier modificateur est enregistré comme auteur de la dernière mise à jour.

Conséquence directe : **les indicateurs KPI-03 et KPI-04 s'appuient sur l'auteur d'origine** et ne sont plus manipulables par un tiers. La mesure du problème central du produit redevient fiable.

Conséquence de conception **[UX]** : chaque élément porte deux informations d'attribution. La première doit rester dominante, la seconde secondaire, faute de quoi le mur devient bavard.

#### UX-10, résolution du 2026-08-10

La suppression est tracée et réversible par n'importe quel participant. Aucune contribution ne disparaît définitivement pendant la séance.

Il subsiste une condition de conception : **la réversibilité n'a d'effet que si la suppression est perceptible**. Un élément qui disparaît silencieusement d'un mur de plusieurs centaines d'éléments ne sera jamais restauré, quelle que soit la possibilité technique. Voir UX-12.

#### UX-11, analyse initiale

L'historique est intégralement conservé **[PMA]**. C'est une décision favorable à la traçabilité, mais elle crée deux effets à maîtriser en conception :

| Effet                                                                | Recommandation **[UX]**                                          |
|----------------------------------------------------------------------|-------------------------------------------------------------------|
| Un historique visible par défaut sature un mur déjà dense            | Consultation à la demande, sur sélection d'un élément            |
| Savoir que chaque correction est enregistrée peut inhiber            | Ne pas notifier les modifications, les rendre consultables seulement |

La traçabilité sert à reconstituer après coup, pas à surveiller pendant.

#### UX-12, résolution du 2026-08-10

Les éléments supprimés restent **visibles en état barré** sur le mur **[PMA]**. La réversibilité devient effective : ce qui est visible peut être restauré.

Deux conséquences de conception en découlent.

#### UX-13, résolution du 2026-08-10

Un mur atteignant plusieurs centaines d'éléments conserve désormais aussi les éléments supprimés. La densité, déjà identifiée comme risque UX-04, augmente mécaniquement.

**Décision du Product Owner [PMA]** : un filtre permettant de masquer les éléments supprimés est ajouté au périmètre.

| Aspect                  | Règle actée                                                              |
|-------------------------|---------------------------------------------------------------------------|
| État par défaut         | Les éléments supprimés sont **visibles**, en état barré                  |
| Action disponible       | Chaque participant peut les masquer                                       |
| Portée du filtre         | Individuelle **[UX]**, l'affichage d'un participant n'affecte pas les autres |
| Éléments masqués         | Restent restaurables une fois le filtre désactivé                        |

**Point d'attention [UX]** : la portée individuelle est une hypothèse. Si le filtre était collectif, un participant pourrait masquer une suppression aux yeux des autres, ce qui annulerait la protection apportée par la visibilité.

**Signalement de périmètre** : cette capacité n'est couverte par aucune exigence du document d'exigences métier. Elle relève d'une décision produit prise le 2026-08-10 et devra y être reportée si elle doit être opposable.

#### UX-14, analyse initiale

La restitution du modèle n'inclut pas l'historique **[PMA]**. Celui-ci reste consultable dans l'outil, comme source de contexte pour les participants ou pour un traitement automatisé.

Conséquence factuelle : le modèle et la transcription survivent à l'outil par la restitution, **l'historique non**. Si l'outil est décommissionné après septembre, la trace des opérations disparaît avec lui. Ce point n'affecte pas l'atelier et relève de la décision reportée sur le devenir de l'outil.

### 7.2 Zones de complexité

| Zone                                                        | Nature de la difficulté                                                        |
|-------------------------------------------------------------|---------------------------------------------------------------------------------|
| Une vue unique servant six personas aux besoins opposés     | P2 pilote, P3 contribue, P4 argumente, P6 conçoit                              |
| Sept modes sur le même mur                                  | Collecte, chronologie, enrichissement, clarification, sélection, frontières, propositions |
| Vingt-trois vues individuelles d'un même modèle              | **Révisé le 2026-08-12.** Chacun a sa propre vue, le groupe peut cesser de regarder la même chose |
| Coexistence des deux couches                                | La distinction doit tenir en couleur, en forme et en texte simultanément       |
| Chaîne de traçabilité à huit maillons                       | **Ajouté le 2026-08-11.** Elle traverse deux séances et deux populations       |
| Coexistence d'hypothèses concurrentes sans limite           | **Révisé le 2026-08-12.** 23 participants peuvent en créer autant qu'ils veulent |

### 7.3 Informations manquantes

| # | Information absente                                                     | Conséquence sur la conception                                     |
|---|--------------------------------------------------------------------------|--------------------------------------------------------------------|
| 1 | La notation retenue et ses types d'éléments                             | Ni V4 ni W1 ne peuvent être précisés davantage, voir MQ-10        |
| 2 | La volumétrie attendue du modèle                                        | Les niveaux de lecture ne peuvent être dimensionnés               |
| 3 | Le nombre d'étapes retenues du déroulé et leur durée                     | **2026-08-12.** La méthode de référence est connue, son instanciation pour cet atelier ne l'est pas |
| 4 | L'échéance de la séance Design Level                                    | **2026-08-12.** La séance est postérieure à l'atelier, sa date n'est pas fixée |
| 5 | Le contenu du glossaire initial du domaine                              | **2026-08-11.** V9 ne peut être amorcé avec des termes réels      |

Deux informations sont retirées de cette liste le 2026-08-12. Le support d'affichage est connu, chacun dispose de sa propre vue. L'effectif de la séance Design Level est de cinq à six personnes, ce qui permet de dimensionner W6 et W7.

---

## 8. Hypothèses et questions ouvertes

### 8.1 Hypothèses UX formulées

Toutes sont exploratoires et peuvent être écartées sans conséquence sur le périmètre produit.

| # | Hypothèse **[UX]**                                                                    | À valider auprès de |
|---|----------------------------------------------------------------------------------------|---------------------|
| **HU-01** | Une saisie en colonne fixe soutient mieux la contribution continue qu'une modale | P3, P5              |
| **HU-02** | Un signalement privé est accepté là où une correction publique inhibe            | P3                  |
| **HU-03** | Le facilitateur a besoin d'une phrase à énoncer, pas seulement d'un titre d'étape | P2                  |
| **HU-04** | Un indicateur de participation aide le facilitateur sans exposer les silencieux   | P2                  |
| **HU-05** | Les architectes entrent plus facilement dans le mur par les acteurs que par les éléments | P4          |
| **HU-06** | Une distinction par forme et libellé est suffisante et supérieure à la couleur    | Tous                |
| **HU-07** | Un élément à zéro point conservé rassure les experts sur leurs cas rares          | P3                  |
| **HU-08** | Reporter le contrôle de notation après la collecte augmente le volume produit sans dégrader la qualité | P1, P3 |
| **HU-09** | Déclarer un indice de frontière en un geste est plus fiable que le reconstituer après coup | P4, P1        |
| **HU-10** | Un marquage « non étayée » incite à argumenter plutôt qu'à renoncer               | P4                  |
| **HU-11** | Une position stable est plus lisible qu'un déplacement animé sur un mur à 23 contributeurs | Tous          |
| **HU-12** | Refuser un agrégat sans invariant est perçu comme une aide et non comme un blocage | P6                  |

HU-08 à HU-12 sont ajoutées le 2026-08-11.

### 8.2 Questions ouvertes

Questions encore ouvertes à la date du 2026-08-12.

| # | Question                                                                              | Interlocuteur                     |
|---|----------------------------------------------------------------------------------------|-----------------------------------|
| **QU-17** | À quelle échéance se tient la séance Design Level ?                                 | Responsable de programme          |

Une seule question ouverte, et elle ne bloque aucune conception. Elle empêche seulement de situer les vues V11 et V12 dans le temps.

**Questions closes, conservées pour mémoire.**

| # | Question                                                                              | Réponse                                                                        |
|---|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| QU-01 | La notation comporte-t-elle un moyen d'exprimer une question ou un désaccord ?    | **Les deux**, le 2026-08-10                                                    |
| QU-02 | Combien d'étapes comporte le déroulé, et quelles sont leurs durées ?              | **La méthode Event Storming d'Alberto Brandolini fait référence**, le 2026-08-12. Le déroulé est une configuration issue d'une méthode publiée, non une conception à produire |
| QU-03 | Le mur est-il projeté en partage d'écran, ou chacun a-t-il sa propre vue ?         | **Chacun a sa propre vue**, le 2026-08-12                                      |
| QU-04 | Un participant peut-il modifier ou supprimer un élément produit par un autre ?     | **Oui**, ouvert à tous, le 2026-08-10                                          |
| QU-05 | Le facilitateur contribue-t-il au contenu, ou se consacre-t-il à la conduite ?     | **La conduite seule**, le 2026-08-12                                           |
| QU-06 | Que devient un élément qui ne reçoit aucun vote ?                                 | **Rien**, le 2026-08-11. Le vote n'emporte aucune conséquence sur le mur       |
| QU-07 | Après modification par un tiers, qui est l'auteur ?                                | **Double paternité**, le 2026-08-10                                            |
| QU-08 | Une suppression est-elle réversible, et par qui ?                                  | **Oui, par tous, et tracée**, le 2026-08-10                                    |
| QU-09 | L'historique des modifications est-il conservé ?                                   | **Oui, intégralement**, le 2026-08-10                                          |
| QU-10 | Les éléments supprimés restent-ils visibles sur le mur ?                           | **Visibles en état barré**, le 2026-08-10                                      |
| QU-11 | La restitution du modèle inclut-elle l'historique ?                                | **Non**, le 2026-08-10                                                         |
| QU-12 | Pendant la mise en chronologie, qui déplace les éléments ?                         | **Chacun librement**, le 2026-08-10                                            |
| QU-13 | Le focus collectif du facilitateur s'impose-t-il aux vues individuelles ?           | **Oui**, le 2026-08-12. Voir la tension ouverte en QU-18                       |
| QU-14 | Qui compose la séance Design Level, et quand se tient-elle ?                       | **Séance ultérieure à l'atelier**, le 2026-08-12, avec les équipes de développement produit et un représentant métier |
| QU-15 | Un participant peut-il créer une hypothèse de découpage, ou seulement un architecte ? | **Tout participant**, le 2026-08-12                                        |
| QU-16 | Combien d'hypothèses de découpage peuvent coexister ?                              | **Aucune limite**, le 2026-08-12. Voir le risque UX-26                         |
| QU-18 | Le focus collectif du facilitateur peut-il interrompre une saisie en cours ?       | **Non**, le 2026-08-12. Le focus repositionne la vue, il ne touche jamais à la saisie |
| QU-19 | Une hypothèse de découpage créée par un participant est-elle visible de tous immédiatement ? | **Oui**, le 2026-08-12. Voir la règle d'affichage en UX-26 et le risque UX-28 |

### 8.3 Ajouts de périmètre non couverts par le document d'exigences

**Mis à jour le 2026-08-11.** Deux des capacités décidées le 2026-08-10 ne figurent toujours dans aucune exigence et devront y être reportées si elles doivent être opposables.

| Capacité                                                        | Date       | Exigence de rattachement probable |
|------------------------------------------------------------------|------------|------------------------------------|
| Filtre de masquage des éléments supprimés                       | 2026-08-10 | BR-004 ou nouvelle exigence        |
| Alternative de positionnement sans glissement                    | 2026-08-10 | BR-024 ou nouvelle exigence        |

Ce document ne crée pas ces exigences. Leur report relève du Product Owner.

### 8.4 Ce que ce document ne fait pas

| | |
|---|---|
| Il ne modifie aucune décision du cadrage produit | Les onze domaines fonctionnels et leur priorité sont repris du document d'exigences |
| Il ne crée aucune exigence                       | Les manques identifiés sont posés en questions, non en besoins        |
| Il ne fixe aucun choix visuel                    | Aucune couleur, typographie ni disposition définitive n'est arrêtée   |
| Il ne contraint pas la suite                     | Toute proposition marquée **[UX]** est écartable sans justification   |

---

## 9. Suites recommandées

**Révisées le 2026-08-11, mises à jour le 2026-08-12.** Neuf questions ont été tranchées. Une seule reste ouverte, l'échéance de la séance Design Level.

| Action                                                                    | Interlocuteur     | Charge     |
|---------------------------------------------------------------------------|-------------------|------------|
| Confronter les parcours P1, P2 et P3 aux personnes concernées             | P1, P2, P3        | 3 x 30 min |
| Confronter le parcours P6 à l'équipe de développement                    | P6                | 30 min     |
| Trancher le point d'accessibilité 1 sur la distinction des deux couches   | Product Owner     | 15 min     |
| Éprouver le parcours de contribution au clavier avec un participant réel  | P3 ou P5          | 20 min     |
| Instancier le déroulé de Brandolini pour cet atelier, étapes et durées    | Product Owner, P1 | 45 min     |

### Tests de risque méthodologique

**Ajoutés le 2026-08-11.** Chacun éprouve un risque précis du nouveau parcours. Tous se jouent sur un atelier réduit avec un scénario réel du domaine.

| Test                                                                       | Risque éprouvé | Résultat attendu                                              |
|----------------------------------------------------------------------------|-----------------|----------------------------------------------------------------|
| Conduire une collecte sans qu'aucune commande ni solution n'apparaîsse     | UX-18           | Les faits métier dominent la production                        |
| Retrouver un cas rare cité par une seule personne, sans vote               | UX-03           | Le cas est intact, ni masqué ni déclassé                      |
| Conserver deux récits contradictoires du même événement                    | UX-07           | Les deux coexistent, la divergence est signalée                |
| Faire changer un terme de sens entre deux zones                            | UX-19           | Le glossaire porte deux définitions, le terme devient un indice |
| Comparer deux découpages candidats sur le même modèle                      | UX-19           | Les deux s'affichent sans que le modèle soit altéré            |
| Proposer un agrégat sans invariant                                         | UX-20           | La création est refusée ou marquée incomplète                  |
| Remonter d'un agrégat jusqu'à la parole métier source                      | UX-21           | Le chemin tient en quatre gestes                               |
| Faire suivre une phase d'ordonnancement à un participant qui ne manipule pas | UX-17          | Il comprend ce qui change sans fixer l'écran                   |

La deuxième action de la première liste recoupe l'action de confirmation de couverture prévue au document d'exigences. Les deux peuvent être menées dans le même échange.
