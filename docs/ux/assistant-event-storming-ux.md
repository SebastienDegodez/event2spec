---
title: "Assistant Event Storming - Intention UX et modèle d'interaction"
description: "Personas, parcours utilisateurs, user flows, catalogue de vues et guidelines d'accessibilité pour l'assistant d'atelier Event Storming"
author: "UX Designer"
ms.date: 2026-08-10
ms.topic: concept
keywords:
  - ux
  - parcours utilisateur
  - event storming
  - accessibilité
---

## Préambule

Document exploratoire d'intention UX. **Il ne constitue ni une décision produit, ni une spécification, ni une maquette.**

### Sources et statut

| Source                                   | Rôle                                              |
|------------------------------------------|---------------------------------------------------|
| Cadrage produit V0 du Product Manager    | Source de vérité sur l'intention et les décisions |
| Document d'exigences métier              | Exigences à respecter                             |
| Design system Canopée d'AXA France       | Inspiration, référence de composants               |

### Convention de traçabilité

Chaque élément de ce document porte son origine.

| Marqueur   | Signification                                                        |
|------------|-----------------------------------------------------------------------|
| **[PMA]**  | Provient du cadrage produit, non discutable ici                      |
| **[BRD]**  | Provient d'une exigence métier, avec sa référence                    |
| **[UX]**   | Hypothèse de conception UX, exploratoire et non contraignante        |

Tout élément marqué **[UX]** peut être écarté sans conséquence sur le périmètre produit.

### Limite de validité

Le cadrage produit indique que les cinq hypothèses fondatrices n'ont pas été confrontées à des utilisateurs réels, et qu'aucun des cinq rôles n'a été interrogé. **Les parcours de ce document sont donc des hypothèses de comportement, pas des observations.** Ils doivent être confrontés aux personnes concernées avant d'influencer une décision de conception.

---

## 1. Personas et Jobs To Be Done

Les cinq personas proviennent du cadrage produit et du document d'exigences. Leur ordre de priorité est celui du cadrage.

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

**[PMA]** Un coach agile. Sait animer un groupe, ne connaît pas l'Event Storming. Utilisateur principal, et point de défaillance unique de la séance.

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

**[PMA]** Deux personnes. Présentes pendant les deux jours, mais leur besoin propre intervient après.

> **JTBD** : Quand je dois arrêter un découpage du domaine, je veux disposer de mesures vérifiables sur le modèle, afin de justifier mes frontières autrement que par mon intuition.

**Irritant dominant [PMA]** : une proposition plausible mais fausse est plus dangereuse qu'aucune proposition, car elle emporte l'adhésion du reste de l'équipe.

### P5 - Le participant contributeur secondaire

**[BRD]** Douze personnes. Groupe le plus nombreux. Ne détiennent ni la connaissance du domaine ni de responsabilité sur le modèle.

> **JTBD** : Quand j'assiste à un atelier sur un domaine que je ne connais pas, je veux comprendre ce qui se construit et pouvoir poser mes questions, afin de m'aligner sur la vision et d'apporter ce que je sais.

**Irritant dominant [UX]** : il ne sait pas s'il a le droit de contribuer, ni sur quoi. Le risque n'est pas qu'il gêne, c'est qu'il devienne spectateur et fasse chuter le taux de contribution.

### Synthèse des problèmes utilisateurs

| # | Problème                                                            | Persona    | Objectif métier | Exigences        |
|---|----------------------------------------------------------------------|------------|-----------------|------------------|
| 1 | La mécanique de l'atelier consomme la seule expertise disponible    | P1         | BO-02           | BR-004, BR-008   |
| 2 | Contribuer suppose de prendre la parole, ce qui coûte cher en visio | P3, P5     | BO-03           | BR-004, BR-005   |
| 3 | Le facilitateur ne sait pas ce qu'il doit obtenir ni quand avancer  | P2         | BO-05           | BR-001, BR-002   |
| 4 | La correction de notation se fait à voix haute et inhibe            | P3, P5     | BO-02, BO-03    | BR-008, BR-009   |
| 5 | La conversation disparaît, le modèle perd son fondement             | P1, P4     | BO-04           | BR-011 à BR-013  |
| 6 | Le découpage repose sur l'intuition                                 | P4         | BO-06           | BR-017, BR-018   |
| 7 | Le jalon dépend entièrement de la disponibilité de l'outil          | P2         | BO-07           | BR-020, BR-021   |

---

## 2. Cartographies des parcours utilisateurs

Trois parcours détaillés pour les personas les plus exposés, deux parcours condensés pour les autres. **Toutes les émotions décrites sont des hypothèses [UX]**, aucune observation n'ayant été conduite.

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

---

## 3. User flows clés

Sept flux, chacun rattaché à un persona, un problème et un objectif métier.

### UF-01 Contribuer pendant une phase chronométrée

**P3, P5, P1** · problème 2 · BO-03 · BR-004, BR-005

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre la phase                | Le minuteur démarre et devient visible de tous                     |
| 2 | Le participant saisit un texte                | Le champ de saisie reste disponible en continu                     |
| 3 | Le participant qualifie l'élément             | Les types disponibles sont proposés selon l'étape en cours **[UX]** |
| 4 | Le participant valide                         | L'élément apparaît sur le mur, attribué à son auteur               |
| 5 | Le participant enchaîne                       | Le champ se vide et reste focalisé **[UX]**                        |
| 6 | Le minuteur arrive à échéance                 | Un signal apparaît, la saisie reste ouverte **[UX]**               |

**Cas limites**

| Situation                                     | Comportement attendu **[UX]**                                      |
|-----------------------------------------------|---------------------------------------------------------------------|
| Le participant perd sa connexion              | Sa saisie en cours est préservée localement                        |
| Deux participants saisissent le même élément  | Les deux sont conservés, le tri se fait au vote                    |
| Le participant n'a rien à dire                | Aucune sollicitation individuelle publique                         |
| Le minuteur expire pendant la frappe          | La saisie en cours peut être terminée                              |

**Pattern extrait [UX]** : saisie continue, sans modale ni interruption. Le coût d'une contribution doit rester inférieur au coût d'une prise de parole, sinon le produit ne résout rien.

### UF-02 Recevoir un signalement de notation

**P3, P5, P1** · problème 4 · BO-02 · BR-008, BR-009

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le participant saisit un élément non conforme | L'élément est créé et posé sur le mur                              |
| 2 | Le système détecte l'écart                    | Un signalement apparaît **auprès du seul auteur**                  |
| 3 | Le participant lit le signalement             | Une reformulation ou un changement de type est proposé             |
| 4a| Il accepte                                    | L'élément est ajusté                                               |
| 4b| Il ignore                                     | Le signalement disparaît, l'élément reste inchangé                 |
| 5 | Aucune action                                 | Le signalement s'efface après un délai **[UX]**                    |

**Contrainte structurante [BRD]** : le signalement est adressé au seul auteur. Aucun autre participant ne doit pouvoir constater qu'un signalement a eu lieu.

**Pattern extrait [UX]** : correction privée, jamais publique. La formulation est interrogative et non impérative, pour éviter la posture de correction.

### UF-03 Converger par vote

**P1, P2, P3, P5** · problème 2 · BO-03 · BR-006

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur ouvre le vote                 | Le nombre de points par personne est annoncé                       |
| 2 | Le participant répartit ses points            | Ses propres votes sont visibles de lui seul                        |
| 3 | Le facilitateur clôture                       | Les résultats deviennent visibles de tous                          |
| 4 | Le groupe consulte le classement              | Les éléments sont ordonnables par nombre de points                 |

**Cas limite critique [UX]** : un élément à zéro point ne doit pas disparaître. Dans un domaine fragmenté, un cas connu d'une seule personne recevra peu de votes tout en étant exact.

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

### UF-05 Mesurer une zone du modèle

**P4** · problème 6 · BO-06 · BR-017 à BR-019

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'architecte délimite une zone                | La sélection est matérialisée                                      |
| 2 | Il nomme la zone                              | La zone est conservée comme couche superposée                      |
| 3 | Le système calcule                            | Les relations franchissant la limite sont dénombrées               |
| 4 | Il consulte les relations                     | Chaque relation est localisable sur le mur                         |
| 5 | Il remonte à l'origine                        | L'extrait de conversation fondant l'élément est accessible         |
| 6 | Il supprime la zone                           | Le modèle demeure inchangé                                         |

**Cas limite [UX]** : deux zones concurrentes doivent pouvoir coexister. Deux architectes en désaccord conservent chacun leur découpage.

### UF-06 Conduire une étape

**P2** · problème 3 · BO-05 · BR-001, BR-002

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | Le facilitateur consulte l'étape courante     | Objectif, résultat attendu et durée sont affichés                  |
| 2 | Il démarre l'étape                            | L'information devient visible de tous                              |
| 3 | Il suit l'avancement                          | Le temps restant est actualisé en continu                          |
| 4 | Il suspend                                    | Le minuteur s'interrompt sans perte de contenu                     |
| 5 | Il revient à une étape antérieure             | Le contenu produit est conservé                                    |
| 6 | Il termine l'étape                            | L'étape suivante devient courante                                  |

**Manque identifié [UX]** : rien n'indique au facilitateur si l'étape a produit un résultat suffisant. C'est le moment où son manque de maîtrise de la méthode est le plus exposé.

### UF-07 Basculer vers le mode indépendant

**P2** · problème 7 · BO-07 · BR-020, BR-021

| # | Action utilisateur                            | Réponse système                                                    |
|---|-----------------------------------------------|---------------------------------------------------------------------|
| 1 | L'outil devient indisponible                  | Sans objet                                                          |
| 2 | Le facilitateur récupère le contenu produit   | Une restitution est accessible à tout instant **[UX]**              |
| 3 | Il poursuit sur le support de repli           | Sans objet                                                          |

**Contrainte [PMA]** : la restitution doit être accessible **avant** l'incident, pas pendant. Un export qui suppose l'outil disponible ne protège de rien.

### UF-08 Exprimer une question ou un désaccord

**P5, P1, P3** · problèmes 2 et 5 · BO-01 et BO-03 · BR-004

**[PMA]** La notation retenue couvre l'expression d'une question **et** d'un désaccord. Ce flux découle de cette réponse du 2026-08-10.

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

---

## 4. Catalogue des vues

Sept vues. Le nombre est volontairement réduit : l'atelier se déroule sur un support partagé et projeté, où la multiplication des écrans nuit à la compréhension collective.

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
| Éléments clés          | Éléments typés, chronologie, auteurs, couche des propositions, éléments supprimés barrés |
| Interactions           | Naviguer, zoomer, déplacer, sélectionner, **masquer les éléments supprimés** |
| Exigences              | BR-004, BR-007, BR-016                                                      |

**Vue centrale.** Toutes les autres vues sont des surcouches ou des panneaux qui l'accompagnent.

### V3 - Panneau de conduite

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Donner au facilitateur la conduite de la séance                            |
| But utilisateur        | Savoir où on en est, quoi dire, combien de temps il reste                  |
| Personas               | P2, en lecture pour les autres                                             |
| Éléments clés          | Étape courante, résultat attendu, minuteur, phrase de lancement            |
| Interactions           | Démarrer, suspendre, revenir, terminer                                      |
| Exigences              | BR-001, BR-002                                                              |

**Distinction [UX]** : une partie de ce panneau est publique (étape, temps restant), une partie est privée au facilitateur (phrase de lancement, indicateur de participation).

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

### V5 - Vote

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Faire converger le groupe sans débat                                        |
| But utilisateur        | Exprimer ce qui compte pour moi sans avoir à le défendre                    |
| Personas               | P1, P3, P5                                                                  |
| Éléments clés          | Points restants, éléments votables, résultat après clôture                 |
| Interactions           | Attribuer, retirer, consulter                                               |
| Exigences              | BR-006                                                                      |

### V6 - Propositions

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Soumettre au groupe les éléments issus de la conversation                  |
| But utilisateur        | Vérifier ce qui a été dit et l'adopter si c'est juste                      |
| Personas               | P1, P3                                                                      |
| Éléments clés          | Propositions distinctes, extrait source, action d'adoption                 |
| Interactions           | Consulter l'extrait, adopter, ignorer                                       |
| Exigences              | BR-012, BR-014, BR-015, BR-016                                              |

### V7 - Mesures de découpage

| Attribut               | Contenu                                                                    |
|------------------------|-----------------------------------------------------------------------------|
| Objectif               | Outiller la décision de découpage                                           |
| But utilisateur        | Justifier une frontière par autre chose que mon intuition                   |
| Personas               | P4, P1                                                                      |
| Éléments clés          | Zones, relations franchissantes, coloration par acteur, éléments isolés    |
| Interactions           | Délimiter, nommer, mesurer, comparer, supprimer                             |
| Exigences              | BR-017, BR-018, BR-019                                                      |

### Vue transverse - Restitution

**[UX]** La restitution du modèle (BR-013) n'est pas une vue mais une action disponible depuis V2, à tout instant. Ce choix découle de UF-07 : un export accessible seulement depuis un écran dédié ne protège pas le jalon.

---

## 5. Descriptions de wireframes basse fidélité

Descriptions structurées uniquement. Aucun choix visuel, aucune position définitive.

### W1 - Le mur pendant une phase de contribution

Correspond à V2 combinée à V3 et V4. **C'est l'écran que 23 personnes regardent simultanément.**

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
| A    | Étape, résultat attendu, temps restant                     | Aucun pour les participants                       |
| B    | Éléments, auteurs, chronologie, propositions, supprimés    | Navigation, sélection                             |
| C    | Champ vide, types disponibles, signalement éventuel        | Saisie, qualification, validation, ignorer        |
| D    | État du filtre                                             | Restitution, notation, masquage des supprimés     |

**Justifications [UX]**

| Choix                                              | Motif                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------------------|
| La saisie occupe une colonne fixe, jamais une modale | Une modale masque le mur et interrompt la contribution continue             |
| Le signalement apparaît dans la zone C, pas sur le mur | Il ne doit être visible que de son auteur                                  |
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

### W3 - Vue de découpage

Correspond à V7. Utilisée en petit comité, hors atelier.

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
| A    | Zones existantes                                     | Créer, nommer, sélectionner, supprimer      |
| B    | Modèle, zones, coloration, isolats                   | Délimiter, activer une coloration           |
| C    | Comptages par zone                                   | Consulter, localiser une relation           |
| D    | Extrait source                                       | Ouvrir, fermer                              |

**Justification [UX]** : la zone D est permanente et non contextuelle. La traçabilité est le critère d'acceptation du persona P4 ; la reléguer dans un survol la rendrait invisible.

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

### 6.2 Guidelines de conception

| Sujet                  | Orientation **[UX]**                                                                    |
|------------------------|------------------------------------------------------------------------------------------|
| Densité                | Le mur atteindra plusieurs centaines d'éléments. Prévoir des niveaux de lecture         |
| Vocabulaire            | Employer les termes du métier assurance, jamais ceux de la méthode seule                |
| Exemples               | Toute explication de notation s'appuie sur le domaine dommage aux biens                 |
| Modales                | À proscrire pendant les phases de contribution                                           |
| Notifications          | Discrètes, non bloquantes, et privées lorsqu'elles concernent une personne              |
| Bibliothèque           | Design system Canopée, icônes Material Symbols, jetons de la bibliothèque               |

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

**Le point 1 est structurant.** L'exigence BR-016 impose une distinction sans ambiguïté entre les deux couches. Une distinction par couleur seule échoue pour un participant daltonien, et échoue aussi sur un écran partagé de mauvaise qualité, ce qui concerne tout le monde en visio.

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

| # | Risque                                                                                  | Persona   | Sévérité | Atténuation **[UX]**                                                       |
|---|------------------------------------------------------------------------------------------|-----------|----------|-----------------------------------------------------------------------------|
| **UX-01** | Un signalement de notation perçu comme une correction publique fait taire P3 pour la journée | P3, P5    | Élevée   | Signalement strictement privé, formulation interrogative                  |
| **UX-02** | Le minuteur coupe une contribution en cours et décourage                                | P3, P5    | Élevée   | Le minuteur signale sans interrompre, prolongation possible                |
| **UX-03** | Le vote élimine les cas rares, qui sont précisément la valeur des experts                | P3        | Élevée   | Un élément à zéro point est conservé, non supprimé                        |
| **UX-04** | Le mur devient illisible au-delà de quelques centaines d'éléments en visio               | Tous      | Élevée   | Niveaux de lecture, filtrage par acteur ou par étape                      |
| ~~UX-05~~ | ~~P5 n'a aucun moyen de poser une question~~                                            | P5        | Clos     | La notation couvre l'expression d'une question                            |
| ~~UX-06~~ | ~~P1 n'a aucun moyen d'exprimer un désaccord de fond~~                                  | P1, P4    | Clos     | La notation couvre l'expression d'un désaccord                            |
| **UX-07** | Le facilitateur doit acter les divergences sans support outillé                          | P2        | Faible   | La notation lui fournit désormais un support                              |
| **UX-08** | Le facilitateur n'a aucun critère pour décider de passer à l'étape suivante               | P2        | Moyenne  | Indicateur de suffisance non prescriptif                                  |
| **UX-09** | La modification ouverte entre en tension avec l'attribution des contributions            | P1, P3    | Clos     | Double paternité actée, l'auteur d'origine est conservé                   |
| **UX-10** | Un élément d'expert métier peut être supprimé par un non-expert                          | P3        | Faible   | Suppression tracée et réversible par tous                                 |
| **UX-11** | Un historique affiché par défaut alourdit le mur et crée une pression sociale            | Tous      | Moyenne  | Historique consultable à la demande, jamais affiché en permanence         |
| **UX-12** | Un élément supprimé devient invisible, donc irrécupérable en pratique                   | P3        | Clos     | Les éléments supprimés restent visibles en état barré                     |
| **UX-13** | Les éléments barrés s'ajoutent à la densité d'un mur déjà saturé                        | Tous      | Clos     | Filtre de masquage acté le 2026-08-10, affichage visible par défaut       |
| **UX-14** | L'historique n'est pas restitué et disparaît avec l'outil                               | P1, P4    | Faible   | À signaler si l'outil est décommissionné après septembre                  |

### UX-09, clos le 2026-08-10

La règle de **double paternité** est actée : un élément conserve son auteur d'origine, et le dernier modificateur est enregistré comme auteur de la dernière mise à jour.

Conséquence directe : **les indicateurs KPI-03 et KPI-04 s'appuient sur l'auteur d'origine** et ne sont plus manipulables par un tiers. La mesure du problème central du produit redevient fiable.

Conséquence de conception **[UX]** : chaque élément porte deux informations d'attribution. La première doit rester dominante, la seconde secondaire, faute de quoi le mur devient bavard.

### UX-10, atténué le 2026-08-10

La suppression est tracée et réversible par n'importe quel participant. Aucune contribution ne disparaît définitivement pendant la séance.

Il subsiste une condition de conception : **la réversibilité n'a d'effet que si la suppression est perceptible**. Un élément qui disparaît silencieusement d'un mur de plusieurs centaines d'éléments ne sera jamais restauré, quelle que soit la possibilité technique. Voir UX-12.

### UX-11, nouveau

L'historique est intégralement conservé **[PMA]**. C'est une décision favorable à la traçabilité, mais elle crée deux effets à maîtriser en conception :

| Effet                                                                | Recommandation **[UX]**                                          |
|----------------------------------------------------------------------|-------------------------------------------------------------------|
| Un historique visible par défaut sature un mur déjà dense            | Consultation à la demande, sur sélection d'un élément            |
| Savoir que chaque correction est enregistrée peut inhiber            | Ne pas notifier les modifications, les rendre consultables seulement |

La traçabilité sert à reconstituer après coup, pas à surveiller pendant.

### UX-12, clos le 2026-08-10

Les éléments supprimés restent **visibles en état barré** sur le mur **[PMA]**. La réversibilité devient effective : ce qui est visible peut être restauré.

Deux conséquences de conception en découlent.

### UX-13, clos le 2026-08-10

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

### UX-14, nouveau

La restitution du modèle n'inclut pas l'historique **[PMA]**. Celui-ci reste consultable dans l'outil, comme source de contexte pour les participants ou pour un traitement automatisé.

Conséquence factuelle : le modèle et la transcription survivent à l'outil par la restitution, **l'historique non**. Si l'outil est décommissionné après septembre, la trace des opérations disparaît avec lui. Ce point n'affecte pas l'atelier et relève de la décision reportée sur le devenir de l'outil.

### 7.2 Zones de complexité

| Zone                                                        | Nature de la difficulté                                                        |
|-------------------------------------------------------------|---------------------------------------------------------------------------------|
| Une vue unique servant cinq personas aux besoins opposés    | P2 pilote, P3 contribue, P4 analyse, sur le même support projeté               |
| Transitions entre modes sur le même mur                     | Contribution, vote, lecture et propositions se succèdent sans changer d'écran  |
| Lisibilité collective en distanciel                         | Un écran partagé impose une densité bien inférieure à un usage individuel      |
| Coexistence des deux couches                                | La distinction doit tenir en couleur, en forme et en texte simultanément       |

### 7.3 Informations manquantes

| # | Information absente                                                     | Conséquence sur la conception                                     |
|---|--------------------------------------------------------------------------|--------------------------------------------------------------------|
| 1 | La notation retenue et ses types d'éléments                             | Ni V4 ni W1 ne peuvent être précisés davantage                    |
| 2 | La volumétrie attendue du modèle                                        | Les niveaux de lecture ne peuvent être dimensionnés               |
| 3 | Le support de projection réel pendant la visio                          | La densité maximale lisible est inconnue                          |
| 4 | Le nombre d'étapes du déroulé et leur durée                             | La zone A de W1 ne peut être dimensionnée                         |
| 5 | Les modalités de restitution attendues par les architectes              | La zone C de W3 est hypothétique                                  |

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

### 8.2 Questions ouvertes

| # | Question                                                                              | Réponse du 2026-08-10                                                        |
|---|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| ~~QU-01~~ | ~~La notation comporte-t-elle un moyen d'exprimer une question ou un désaccord ?~~ | **Les deux.** La notation couvre l'expression d'une question et d'un désaccord |
| **QU-02** | Combien d'étapes comporte le déroulé, et quelles sont leurs durées ?                 | Ouverte, Product Owner                                                        |
| **QU-03** | Le mur est-il projeté en partage d'écran, ou chacun a-t-il sa propre vue ?            | Ouverte, Product Owner                                                        |
| ~~QU-04~~ | ~~Un participant peut-il modifier ou supprimer un élément produit par un autre ?~~   | **Oui.** La modification et la suppression sont ouvertes à tous               |
| **QU-05** | Le facilitateur contribue-t-il au contenu, ou se consacre-t-il à la conduite ?          | Ouverte, Product Owner et P2                                                  |
| **QU-06** | Que devient un élément qui ne reçoit aucun vote ?                                      | Ouverte, Product Owner et P1                                                  |
| ~~QU-07~~ | ~~Après modification par un tiers, qui est l'auteur ?~~                                | **Double paternité.** Auteur d'origine conservé, dernier modificateur tracé   |
| ~~QU-08~~ | ~~Une suppression est-elle réversible, et par qui ?~~                                  | **Oui, par tous, et tracée**                                                  |
| ~~QU-09~~ | ~~L'historique des modifications est-il conservé ?~~                                   | **Oui, intégralement**                                                        |
| ~~QU-10~~ | ~~Les éléments supprimés restent-ils visibles sur le mur ?~~                            | **Visibles en état barré**                                                    |
| ~~QU-11~~ | ~~La restitution du modèle inclut-elle l'historique ?~~                                | **Non.** L'historique reste consultable dans l'outil, comme source de contexte |

Deux questions restent ouvertes, QU-02, QU-03, QU-05 et QU-06. Aucune ne bloque la conception de la vue principale.

### 8.3 Ce que ce document ne fait pas

| | |
|---|---|
| Il ne modifie aucune décision du cadrage produit | Les cinq domaines fonctionnels et leur priorité sont repris tels quels |
| Il ne crée aucune exigence | Les manques identifiés sont posés en questions, non en besoins        |
| Il ne fixe aucun choix visuel                    | Aucune couleur, typographie ni disposition définitive n'est arrêtée   |
| Il ne contraint pas la suite                     | Toute proposition marquée **[UX]** est écartable sans justification   |

---

## 9. Suites recommandées

| Action                                                                    | Interlocuteur     | Charge     |
|---------------------------------------------------------------------------|-------------------|------------|
| Répondre à QU-01 et QU-04, qui conditionnent la vue principale            | Product Owner, P1 | 30 min     |
| Confronter les parcours P1, P2 et P3 aux personnes concernées             | P1, P2, P3        | 3 x 30 min |
| Trancher le point d'accessibilité 1 sur la distinction des deux couches   | Product Owner     | 15 min     |
| Éprouver le parcours de contribution au clavier avec un participant réel  | P3 ou P5          | 20 min     |

La deuxième action recoupe l'action de confirmation de couverture déjà prévue au document d'exigences. Les deux peuvent être menées dans le même échange.
