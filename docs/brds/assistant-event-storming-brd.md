---
title: "Assistant Event Storming - Document d'exigences métier"
description: "Exigences métier de l'assistant d'atelier Event Storming destiné au cadrage du domaine dommage aux biens"
author: "Product Owner"
ms.date: 2026-08-11
ms.topic: reference
keywords:
  - event storming
  - exigences métier
  - dommage aux biens
  - bounded context
  - agrégat
---

## Préambule

Ce document traduit en exigences métier le cadrage produit V0 de l'assistant Event Storming.

| Élément            | Valeur                                                  |
|--------------------|---------------------------------------------------------|
| Source unique      | Cadrage produit V0, Product Manager Advisor, 2026-08-05 |
| Statut             | Version 2, réécrite le 2026-08-11                       |
| Neutralité         | Aucune solution technique n'est prescrite               |
| Périmètre          | Étendu au parcours complet, voir section 6.3            |

Une revue critique du 2026-08-10, menée à l'issue du prototypage de l'expérience utilisateur, a établi que le document décrivait un outil de facilitation et non un parcours Event Storming complet. Les décisions d'arbitrage rendues le 2026-08-11 figurent en section 9.4.

Les sections 3, 4, 5.2, 6, 7 et 8 ont été réécrites en conséquence. Les exigences conservent leurs identifiants d'origine, elles n'apparaissent plus dans l'ordre numérique.

Le cadrage source fait autorité. Les points où il se contredit lui-même sont signalés en section 10 et n'ont pas été arbitrés dans ce document.

Aucune exigence de ce document n'introduit de fonctionnalité absente du cadrage source.

## 1. Contexte métier

### 1.1 Situation

Un programme de transformation porte sur le domaine dommage aux biens d'un assureur. Un atelier de cadrage Event Storming est prévu les 15 et 16 septembre 2026, en distanciel intégral, avec 23 participants.

Cet atelier conditionne la suite du programme. Sa mobilisation représente 46 jours-homme.

### 1.2 Nature de la connaissance du domaine

Précision apportée par le Product Owner le 2026-08-07.

> Il n'existe pas aujourd'hui de processus partagé du domaine dommage aux biens. Le domaine se compose d'une multitude de processus dont chaque acteur ne connaît qu'une partie. C'est la raison pour laquelle la méthode Event Storming est retenue.

Cette précision a trois conséquences structurantes sur le présent document :

| Conséquence                                                                 | Portée                                                        |
|------------------------------------------------------------------------------|----------------------------------------------------------------|
| La connaissance du domaine est fragmentée entre les acteurs                  | Renforce BO-03, la contribution du plus grand nombre est vitale |
| Aucun processus de référence ne préexiste à l'atelier                        | Rend inopérant tout indicateur de couverture d'un processus connu |
| L'atelier relève de la découverte et non de la formalisation d'un existant   | Déplace le critère de succès vers la convergence des acteurs    |

Aucun participant ne détient la vue d'ensemble. Le résultat attendu de l'atelier est donc une représentation partagée construite collectivement, et non la mise en forme d'un processus déjà connu.

### 1.3 Nature de l'initiative

L'initiative consiste à produire un assistant d'atelier dont la finalité est d'accélérer le programme. Il ne s'agit pas de livrer un produit commercialisable.

Le cadrage source qualifie cette initiative de preuve de concept, tout en relevant que son usage réel ne correspond pas à celui d'une preuve de concept classique :

| Caractéristique attendue d'une preuve de concept | Situation réelle                                       |
|--------------------------------------------------|--------------------------------------------------------|
| Abandonnable sans conséquence                     | 23 personnes et 2 jours de programme en dépendent      |
| Utilisateurs avertis et peu nombreux              | 23 utilisateurs, dont 6 non techniques                 |
| Échec sans coût                                   | Échec équivalent à 46 jours-homme et un jalon manqué   |
| Sans contrainte de disponibilité                  | Doit fonctionner le jour de l'atelier, sans reprise    |

Cette tension fonde l'objectif métier BO-07 relatif à la continuité de l'atelier.

### 1.4 Contraintes d'environnement

| Contrainte                | Valeur                                                             |
|---------------------------|--------------------------------------------------------------------|
| Échéance                  | Atelier des 15 et 16 septembre 2026                                |
| Capacité de réalisation   | Une personne à temps plein, environ 20 jours ouvrés                |
| Format de l'atelier       | Distanciel intégral, 23 participants                               |
| Conservation des données  | Conservation des transcriptions autorisée                          |
| Traitement automatisé     | Traitement du contenu métier par un service tiers autorisé         |
| Actif existant            | Une preuve de concept antérieure, non réutilisable en l'état       |

## 2. Énoncé du problème et facteurs déclencheurs

### 2.1 Problème principal

> Dans un atelier Event Storming, la personne qui maîtrise la méthode est mobilisée par la mécanique de l'atelier : écrire les éléments, tenir la chronologie, corriger la notation. Son expertise, qui est la raison de sa présence, n'atteint jamais le contenu.

Statut dans le cadrage source : rapporté par le Product Owner, non validé auprès des deux personnes concernées.

### 2.2 Problème secondaire

> Ce qui est dit en atelier disparaît. Il ne reste ni la formulation d'origine, ni le lien entre une décision de modélisation et la parole métier qui l'a fondée.

Statut dans le cadrage source : plausible, non validé.

### 2.3 Problème tertiaire, traité partiellement

> Le découpage du domaine repose sur l'intuition d'un architecte plutôt que sur la matière produite par le métier.

Le cadrage source retient uniquement la mise à disposition de mesures objectives. La production automatique d'un découpage est hors périmètre.

### 2.4 Facteurs déclencheurs

| Facteur                                                    | Nature       |
|------------------------------------------------------------|--------------|
| Échéance de programme fixée aux 15 et 16 septembre 2026    | Calendaire   |
| Fragmentation de la connaissance du domaine entre acteurs  | Structurel   |
| Absence de méthode Event Storming partagée dans l'équipe   | Capacitaire  |
| Concentration de la compétence méthode sur deux personnes  | Capacitaire  |
| Format distanciel à 23 participants                        | Structurel   |

## 3. Objectifs métier et indicateurs de succès

### 3.1 Objectifs

| ID        | Objectif métier                                                                              | Priorité |
|-----------|-----------------------------------------------------------------------------------------------|----------|
| **BO-01** | Construire une représentation partagée du domaine dommage aux biens à partir de connaissances fragmentées, en progressant des faits métier vers des frontières de contexte candidates, puis vers les agrégats | Critique |
| **BO-02** | Restituer aux porteurs de la méthode leur capacité à contribuer au contenu                   | Critique |
| **BO-03** | Permettre à chaque participant de contribuer sans avoir à prendre la parole                  | Haute    |
| **BO-04** | Conserver la parole métier et la rattacher aux éléments du modèle                            | Haute    |
| **BO-05** | Rendre le facilitateur autonome sur la conduite de l'atelier sans maîtrise préalable de la méthode | Haute |
| **BO-06** | Permettre au groupe d'arrêter des frontières de contexte argumentées par des indices métier traçables | Haute |
| **BO-07** | Garantir la tenue de l'atelier indépendamment de la disponibilité de l'outil                 | Critique |
| **BO-08** | Préserver les incertitudes, les désaccords et les récits divergents plutôt que de les lisser | Haute    |
| **BO-09** | Assurer la continuité de la traçabilité depuis la parole métier jusqu'à l'agrégat            | Haute    |
| **BO-10** | Faire valider le modèle progressivement par le groupe en séance                              | Haute    |

BO-01 a été reformulé une première fois le 2026-08-07. La formulation initiale visait la modélisation d'un processus existant. La précision apportée en section 1.2 établit qu'aucun processus partagé ne préexiste, l'objectif porte donc sur la construction d'une représentation collective.

**Révision du 2026-08-11, à la suite de la revue critique du 2026-08-10.**

| Objectif | Modification                                                                                     | Motif |
|----------|--------------------------------------------------------------------------------------------------|-------|
| BO-01    | Nomme désormais la progression attendue, des faits métier aux frontières puis aux agrégats       | La formulation précédente ne disait pas ce qui devait être découvert |
| BO-06    | Passe d'un objectif de mesure à un objectif de décision argumentée, priorité portée à Haute      | Une mesure soutient une discussion, elle ne prouve pas une frontière. La décision D-01 place les frontières dans le périmètre de l'atelier |
| BO-08 à BO-10 | Objectifs ajoutés                                                                           | Aucun objectif ne portait la préservation des désaccords, la continuité de la traçabilité ni la validation en séance |

Les sept objectifs initiaux et leur priorisation ont été validés par le Product Owner le 2026-08-10. **La priorité Haute attribuée à BO-06 et les trois objectifs ajoutés restent à confirmer**, la modification de BO-06 emportant révision de l'ordre de réalisation de la section 6.5.

### 3.2 Indicateurs de succès

Les indicateurs sont repris du cadrage source et se répartissent en deux familles.

#### Famille A, succès du jalon programme

La formulation initiale de KPI-01 portait sur la couverture du processus principal du domaine. La précision apportée en section 1.2 établit qu'aucun processus partagé ne préexiste à l'atelier. **Un indicateur de couverture d'un processus inconnu n'est pas mesurable.** Les indicateurs ci-dessous sont donc des reformulations proposées, adaptées à un exercice de découverte. Elles restent à valider par le Product Owner, voir Q-02.

| ID         | Indicateur                                                                 | Cible                                            | Objectif lié | Mode de mesure                                   |
|------------|-----------------------------------------------------------------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| **KPI-01** | Chaque expert métier reconnaît son activité dans le modèle et identifie au moins une partie du domaine qu'il ignorait | Les 6 experts métier             | BO-01        | Déclaration individuelle en clôture d'atelier    |
| **KPI-02** | Le modèle permet d'engager la suite du programme sans nouvelle session       | Oui                                              | BO-01        | Jugement architecte et responsable de programme, sous 5 jours |
| **KPI-09** | Continuité de la représentation entre les parties détenues par des acteurs différents | Aucune rupture non explicitée           | BO-01        | Revue par les porteurs de la méthode             |

KPI-01 mesure la convergence des connaissances fragmentées. Sa seconde condition, l'identification d'une partie ignorée, atteste que l'atelier a produit un apprentissage et pas seulement une mise en forme.

KPI-09 est ajouté le 2026-08-07. Il mesure la jonction entre les parties du domaine détenues par des acteurs différents, qui constitue la difficulté propre à un domaine fragmenté.

**KPI-01 et KPI-09 sont validés par le Product Owner le 2026-08-08.**

Il est acté qu'aucune référence de comparaison ne sera constituée. Les indicateurs sont donc absolus et ne permettront pas de démontrer un gain par rapport à une conduite d'atelier sans outil.

#### Famille B, apprentissage produit

| ID         | Indicateur                                                          | Cible                                       | Seuil d'alerte              | Objectif lié |
|------------|----------------------------------------------------------------------|---------------------------------------------|-----------------------------|--------------|
| **KPI-03** | Position des porteurs de la méthode parmi les contributeurs          | Moitié supérieure pour chacun               | L'un dans le dernier quart  | BO-02        |
| **KPI-04** | Part des participants ayant produit un élément retenu                | Au moins 80 pour cent, soit 18 sur 23       | Moins de 50 pour cent       | BO-03        |
| **KPI-05** | Sollicitations d'aide méthodologique par le facilitateur             | 3 au maximum sur deux jours                 | Plus de 10                  | BO-05        |
| **KPI-06** | Part des éléments rattachés à un extrait de transcription            | 100 pour cent des éléments proposés         | Sans seuil, décidé          | BO-04        |
| **KPI-07** | Recours au mode de conduite indépendant de l'outil                   | Aucun recours                               | Sans seuil, décidé          | BO-07        |
| **KPI-08** | Frontières retenues justifiées par une mesure                        | Au moins une                                | Sans seuil, décidé          | BO-06        |

**KPI-03 et KPI-04 ne sont pas affichés pendant l'atelier**, décision du 2026-08-11. Ils sont calculés après la séance. Un classement visible des contributeurs encouragerait le volume de production au détriment de la qualité de la découverte.

**Point relevé le 2026-08-12, à confirmer.** Le facilitateur se consacre à la conduite et ne contribue pas au contenu. Le nombre de contributeurs possibles est donc de 22 et non de 23. La cible de 18 représente 82 pour cent de cette population et non 80. Voir AC-14.

Une référence de comparaison antérieure à l'atelier n'existe pas et ne sera pas constituée, décision du 2026-08-08.

#### Famille C, qualité du résultat de découverte

Famille ajoutée le 2026-08-11 à la suite de la revue critique. Les familles A et B mesurent la participation, l'usage de l'outil et la continuité. Aucune ne mesure la qualité de ce qui est découvert.

**Les cibles ci-dessous sont proposées et restent à valider.**

| ID         | Indicateur                                                                     | Cible proposée                    | Objectif lié |
|------------|---------------------------------------------------------------------------------|-----------------------------------|--------------|
| **KPI-10** | Part des événements validés ou explicitement contestés par les experts concernés | Au moins 80 pour cent             | BO-10        |
| **KPI-11** | Nombre de points de tension critiques restés sans décision ni propriétaire       | Aucun                             | BO-08        |
| **KPI-12** | Part des frontières candidates disposant d'au moins deux indices métier          | 100 pour cent                     | BO-06        |
| **KPI-13** | Part des dépendances entre contextes candidats décrites et nommées               | 100 pour cent                     | BO-06        |
| **KPI-14** | Part des agrégats candidats associés à au moins un invariant explicite           | 100 pour cent                     | BO-01        |
| **KPI-15** | Traçabilité complète d'un échantillon depuis la parole jusqu'à l'agrégat          | 5 échantillons sur 5              | BO-09        |
| **KPI-16** | Nombre de rôles distincts ayant validé une part du modèle                        | Au moins 3, sans recherche d'unanimité | BO-10   |

KPI-16 ne vise pas l'unanimité. Dans un domaine fragmenté, un consensus général sur une zone que peu de personnes connaissent est un signal de complaisance et non de qualité.

## 4. Parties prenantes et rôles

### 4.1 Bénéficiaires et utilisateurs

| Rang   | Partie prenante                     | Effectif | Rôle vis-à-vis de l'initiative                                   | Objectifs concernés  |
|--------|-------------------------------------|----------|-------------------------------------------------------------------|----------------------|
| **P1** | Porteur de la méthode Event Storming | 2       | Bénéficiaire principal, redevient contributeur                    | BO-01, BO-02, BO-04  |
| **P2** | Facilitateur de l'atelier            | 1       | Utilisateur principal, conduit la séance et ne contribue pas au contenu | BO-05, BO-07         |
| **P3** | Expert métier dommage aux biens      | 6       | Contributeur, source de vérité du domaine                         | BO-01, BO-03, BO-10  |
| **P4** | Architecte                           | 2       | Formule et argumente des hypothèses de frontière, soumises au groupe | BO-06, BO-08       |
| **P5** | Participant contributeur secondaire  | 12      | Apporte des compléments, questionne, recueille de l'information   | BO-01, BO-03         |
| **P6** | Équipe de développement produit      | 5 à 6    | Conduit la séance Design Level postérieure à l'atelier          | BO-01, BO-09         |

**Révision du rôle P4, le 2026-08-11.** L'architecte n'est plus décrit comme utilisateur d'une activité distincte dont il déciderait seul. Une frontière de contexte se justifie par un changement de vocabulaire, de règle métier, de responsabilité ou de rythme. Ce sont des faits métier que seuls les experts peuvent confirmer ou démentir. L'architecte structure des hypothèses, le groupe les tranche.

**Création du rôle P6, le 2026-08-11.** Le niveau agrégat est traité dans une séance postérieure à l'atelier, avec les équipes de développement produit, architecte et responsable technique. **Effectif arrêté le 2026-08-12 à cinq ou six personnes.** L'échéance de la séance n'est pas fixée. P6 ne participe pas nécessairement à l'atelier des 15 et 16 septembre.

**Règle d'autorité, décidée le 2026-08-11.** L'autorité de validation appartient au groupe réuni en séance. Aucun rôle ne dispose d'un droit de décision propre sur une frontière, une règle métier, un invariant ou un agrégat.

**Garantie métier sur la séance Design Level, décidée le 2026-08-11.** Un invariant est une règle métier et non une contrainte technique. Deux protections s'appliquent à la séance conduite par P6 :

| Protection                                                              | Portée                                          |
|-------------------------------------------------------------------------|--------------------------------------------------|
| Un représentant métier, le Product Owner, est présent en séance         | Empêche la formulation d'invariants sans contradicteur métier |
| Les invariants formulés sont soumis à validation a postériori           | Empêche qu'un agrégat repose sur une règle non vérifiée |

Le rôle P5 est caractérisé le 2026-08-07 sur précision du Product Owner. Il regroupe les participants qui ne détiennent pas la connaissance du domaine et n'exercent pas de responsabilité sur le modèle, mais qui contribuent de quatre manières :

| Attente                                        | Exigences concernées                    |
|------------------------------------------------|------------------------------------------|
| Apporter des compléments d'information         | BR-004, BR-005, BR-022                  |
| Poser des questions                            | BR-010, BR-027, voir MQ-10              |
| Recueillir de l'information sur le domaine     | BR-004, BR-010, BR-013                  |
| S'aligner sur la vision produit                | BR-001, BR-010                          |

P5 constitue le groupe le plus nombreux de l'atelier. Sa participation pèse directement sur KPI-04.

Le cadrage source place le porteur de la méthode au premier rang, en écart avec les travaux amont qui désignaient le facilitateur. Motif retenu : la situation du porteur de la méthode fonde l'existence de l'initiative, tandis que le facilitateur en est l'utilisateur le plus exposé.

### 4.2 Décideurs et commanditaires

| Partie prenante            | Rôle                                                                       |
|----------------------------|-----------------------------------------------------------------------------|
| Responsable de programme   | Décide de la bascule vers le mode indépendant, juge KPI-02                  |
| Product Owner              | Porte le cadrage, arbitre le périmètre                                      |

### 4.3 Participants sans rôle produit

Aucun. La caractérisation du rôle P5 le 2026-08-07 couvre les 23 participants de l'atelier.

## 5. Processus métier

### 5.1 Processus actuel

**Il n'existe pas de processus partagé du domaine dommage aux biens.** Le domaine se compose d'une multitude de processus dont chaque acteur ne connaît qu'une partie. Aucune cartographie de référence n'existe, et aucun participant ne détient la vue d'ensemble.

Le processus décrit ci-dessous est donc celui de **l'atelier lui-même**, tel qu'il se déroulerait sans outil, et non celui du domaine métier.

| Étape                             | Situation décrite dans la source                                                |
|-----------------------------------|----------------------------------------------------------------------------------|
| Conduite de l'atelier             | Assurée par une personne maîtrisant la méthode, faute d'alternative              |
| Production des éléments           | Écrits par la personne qui conduit, à la place des participants                  |
| Tenue de la chronologie           | Assurée manuellement par la même personne                                        |
| Conformité de la notation         | Corrigée oralement, au fil de la séance                                          |
| Trace de la conversation          | Non conservée                                                                    |
| Découpage du domaine              | Établi à l'intuition, sans lien traçable avec la parole métier                   |

Aucune donnée quantitative n'est disponible. Le cadrage source indique qu'aucun atelier Event Storming n'a été conduit dans ce programme.

### 5.2 Processus cible

Réécrit le 2026-08-11. La version précédente décrivait deux activités, une contribution collective puis une séance de découpage. Elle ne comportait aucune progression de découverte : le groupe produisait des éléments, puis un architecte traçait des zones, sans chaîne de raisonnement entre les deux.

#### Le parcours de découverte

Chaque étape répond à une question, produit un résultat et se termine sur un critère observable. Le parcours n'est pas un tunnel : le groupe revient à une étape antérieure en conservant les décisions, hypothèses et liens déjà établis.

| Étape | Question posée au groupe | Résultat produit | Critère de passage |
|-------|---------------------------|------------------|--------------------|
| Cadrage | Quel domaine explore-t-on et pourquoi ? | Intention, périmètre, participants | Le groupe sait à quelle question il répond |
| Collecte | Que s'est-il passé dans le métier ? | Faits métier formulés au passé | Les récits majeurs sont représentés |
| Chronologie | Dans quel ordre cela se produit-il ? | Frise, branches, simultanéités | Les ruptures et alternatives sont visibles |
| Enrichissement | Qui agit, pourquoi, avec quelles informations ? | Acteurs, systèmes, commandes, politiques | Les causalités principales sont explicites |
| Clarification | Que ne comprend-on pas, sur quoi diverge-t-on ? | Points de tension, questions, glossaire | Les termes ambigus sont repérés |
| Frontières | Où changent langage, règles, rythme ou responsabilité ? | Contextes candidats argumentés | Chaque frontière possède au moins deux indices métier |
| Collaboration | Comment les contextes candidats interagissent-ils ? | Dépendances nommées | Les ambiguïtés de responsabilité sont traitées |
| Process Modelling | Comment fonctionne un processus critique ? | Flux commande vers événement enrichi | Le scénario nominal et ses variantes sont compris |
| Design Level | Quelles règles doivent rester cohérentes ensemble ? | Invariants, agrégats candidats | Chaque agrégat protège un invariant nommé |
| Restitution | Qu'est-ce qui est établi, incertain, à vérifier ? | Modèle versionné et journal des décisions | Le groupe valide le niveau de confiance |

#### Activité 1, atelier de domaine

Se tient les 15 et 16 septembre, en distanciel, avec les 23 participants. Couvre les étapes du cadrage à la collaboration entre contextes.

| Étape du parcours | Résultat attendu                                                            | Parties prenantes |
|-------------------|------------------------------------------------------------------------------|-------------------|
| Cadrage           | Le facilitateur ouvre la séance sans maîtriser la méthode                    | P2                |
| Collecte          | Chacun produit des faits métier sans avoir à prendre la parole                | P1 à P5           |
| Chronologie       | Le groupe ordonne les faits, y compris branches et simultanéités              | P1, P2, P3        |
| Enrichissement    | Acteurs, systèmes, commandes et politiques sont rattachés aux faits           | P1 à P5           |
| Clarification     | Les écarts de notation, les questions et les désaccords sont traités          | P1, P2, P3        |
| Frontières        | Des contextes candidats sont proposés et argumentés                           | P4, P1, P3        |
| Collaboration     | Les dépendances entre contextes candidats sont nommées                        | P4, P1, P3        |

La conservation de la conversation et l'enrichissement assisté sont transverses à l'ensemble des étapes. Les propositions automatiques n'interviennent qu'après la production humaine de l'étape en cours.

#### Activité 2, séance Design Level

Se tient après l'atelier, avec les équipes de développement produit et un représentant métier. **Confirmé le 2026-08-12** : cette activité ne se déroule pas pendant les 15 et 16 septembre. Son échéance n'est pas fixée.

| Étape du parcours | Résultat attendu                                                            | Parties prenantes |
|-------------------|------------------------------------------------------------------------------|-------------------|
| Sélection         | Un scénario critique est retenu dans un contexte candidat                    | P6, P4            |
| Process Modelling | Le flux commande vers événement est raffiné                                  | P6, P4            |
| Invariants        | Les règles devant rester cohérentes ensemble sont formulées                  | P6, Product Owner |
| Agrégats          | Des agrégats candidats sont proposés à partir des invariants                 | P6                |
| Validation métier | Les invariants formulés sont soumis a postériori aux experts métier          | Product Owner, P3 |

Un agrégat n'est jamais déduit d'un regroupement visuel du mur. Il se construit à partir des commandes, des décisions métier, des invariants, des événements produits et de la frontière de cohérence. Son nom n'est arrêté qu'après formulation des invariants qu'il protège.

#### Activité 3, restitution et traçabilité

Transverse aux deux précédentes. Le modèle, la transcription, les décisions et les liens entre niveaux sont restituables à tout moment, dans un format lisible et archivable. Chaque élément porte son statut de preuve : observé, reformulé et validé, hypothèse, désaccord, décision, proposition automatique, à vérifier.

#### Activité de continuité

Le cadrage source impose un mode de conduite de l'atelier indépendant de l'outil, ainsi qu'une décision de bascule antérieure à l'atelier. Ces éléments constituent un processus à part entière, couvert par BO-07.

## 6. Périmètre

### 6.1 Dans le périmètre

Réorganisé le 2026-08-11 selon le parcours de découverte de la section 5.2. Les domaines suivent l'ordre méthodologique et non l'ordre des fonctionnalités. Cette réorganisation rend visibles les manques, que la liste antérieure masquait en mélangeant étapes de découverte et capacités transverses.

| Domaine | Intitulé                              | Contenu                                                                              |
|---------|---------------------------------------|--------------------------------------------------------------------------------------|
| **D1**  | Cadrage et conduite de l'atelier      | Déroulé structuré, pilotage de la progression, critères de sortie observables         |
| **D2**  | Collecte des événements               | Saisie simultanée de faits métier au passé, encadrée dans le temps, sans blocage      |
| **D3**  | Chronologie et scénarios              | Mise en ordre, branches, simultanéités, répétitions, événements pivots                |
| **D4**  | Enrichissement du Big Picture         | Acteurs, systèmes, commandes, politiques et informations rattachés aux faits          |
| **D5**  | Clarification, tensions et décisions  | Doublons, glossaire, questions, désaccords, priorisation des sujets à approfondir     |
| **D6**  | Frontières de contexte                | Hypothèses concurrentes, indices métier, dépendances nommées                          |
| **D7**  | Process Modelling                     | Raffinement d'un scénario critique à l'intérieur d'un contexte candidat               |
| **D8**  | Design Level et agrégats              | Invariants, agrégats candidats, politiques et informations consultées                 |
| **D9**  | Restitution et traçabilité            | Statuts de preuve, liens entre niveaux, versionnement, restitution archivable         |
| **D10** | Continuité de l'atelier               | Mode de conduite indépendant de l'outil et décision de bascule                        |
| **DT**  | Enrichissement assisté, transverse    | Propositions issues de la conversation, postérieures à la production humaine          |

### 6.2 Hors périmètre

| Élément exclu                                            | Motif                                                                                 |
|-----------------------------------------------------------|---------------------------------------------------------------------------------------|
| Production automatique d'un découpage du domaine          | Hypothèse de pertinence non mesurée, réalisation prévue ultérieurement                |
| Proposition automatique d'une frontière ou d'un agrégat   | **Ajouté le 2026-08-11.** Ces décisions appartiennent au groupe, voir la règle d'autorité en section 4.1 |
| Reformulation automatique des éléments à la contribution  | Reportée à une version ultérieure, le contrôle par règles fixes est retenu            |
| Production de documents d'exigences ou d'architecture     | Suppose un modèle complet et validé, non attendu à l'issue de l'atelier               |
| Usage par plusieurs organisations                         | Hypothèse de généralisation sans preuve                                               |
| Conduite de l'animation par un dispositif automatisé      | La distribution de la parole et la gestion du temps restent humaines                  |
| Captation autonome de la parole                           | Une transcription est déjà produite par l'outil de visioconférence en place           |

### 6.3 Règle de gestion du périmètre

**Révisée le 2026-08-11.** La règle antérieure interdisait toute extension sans réexamen du cadrage produit, au motif d'une marge de réalisation nulle.

Ce réexamen a eu lieu. La revue critique du 2026-08-10 a établi que le périmètre initial ne permettait pas d'atteindre l'objectif annoncé : le document décrivait un outil de facilitation, sans chaîne de raisonnement reliant les faits métier aux frontières puis aux agrégats. Le périmètre est étendu au parcours complet.

La règle devient : toute extension ultérieure suppose un réexamen du présent document et la mise à jour de la matrice de traçabilité de la section 8.

### 6.4 Règle de réalisation

**Révisée le 2026-08-11.**

La décision du 2026-08-10 prévoyait qu'en cas de dépassement du délai, les domaines les moins prioritaires ne seraient pas livrés, sans seuil de livraison minimal.

Le délai n'est plus un critère d'arbitrage du contenu du présent document.

| Principe                                                          | Portée                                                          |
|--------------------------------------------------------------------|------------------------------------------------------------------|
| Le document spécifie la totalité du parcours, jusqu'aux agrégats   | Aucune exigence n'est omise au motif du délai                    |
| Le chiffrage intervient après la spécification                     | La charge est établie sur un périmètre complet et non supposé    |
| L'arbitrage de ce qui est livré le 15 septembre relève du programme | La décision est prise au vu du chiffrage et non par anticipation |
| Aucun seuil de livraison minimal n'est fixé                        | Reconduit de la décision du 2026-08-10                           |

L'ordre de priorité de la section 6.5 conserve sa fonction : il indique dans quel ordre les domaines sont réalisés, donc lesquels seraient absents si un arbitrage de réduction était rendu au niveau programme.

### 6.5 Ordre de priorité métier

**Révisé le 2026-08-11, à confirmer.** L'ordre précédent portait sur sept domaines et a été confirmé le 2026-08-10. Il ne peut être reconduit tel quel, la modification de BO-06 et la création de BO-08 à BO-10 en section 3.1 déplaçant plusieurs domaines.

| Rang | Domaine                              | Exigences                                        | Objectifs servis          |
|------|--------------------------------------|--------------------------------------------------|---------------------------|
| 1    | D2 Collecte des événements           | BR-004, BR-005, BR-009, BR-022, BR-023           | BO-01, BO-02, BO-03       |
| 2    | D10 Continuité de l'atelier          | BR-020, BR-021                                   | BO-07                     |
| 3    | D3 Chronologie et scénarios          | BR-024                                           | BO-01                     |
| 4    | D5 Clarification, tensions, décisions| BR-006, BR-008, BR-010, BR-026, BR-027           | BO-01, BO-02, BO-03, BO-08 |
| 5    | D4 Enrichissement du Big Picture     | BR-025                                           | BO-01                     |
| 6    | D6 Frontières de contexte            | BR-017, BR-018, BR-019, BR-028, BR-029, BR-030   | BO-06, BO-08              |
| 7    | D9 Restitution et traçabilité        | BR-007, BR-011, BR-012, BR-013, BR-034, BR-035   | BO-04, BO-09, BO-10       |
| 8    | D1 Cadrage et conduite               | BR-001, BR-002, BR-003, BR-036                   | BO-05, BO-10              |
| 9    | DT Enrichissement assisté            | BR-014, BR-015, BR-016                           | BO-02, BO-04              |
| 10   | D7 Process Modelling                 | BR-031                                           | BO-01                     |
| 11   | D8 Design Level et agrégats          | BR-032, BR-033                                   | BO-01, BO-09              |

Justification des rangs sensibles :

| Rang | Justification                                                                                                                        |
|------|---------------------------------------------------------------------------------------------------------------------------------------|
| 1    | Sans faits métier, aucun autre domaine n'a d'objet. La connaissance étant fragmentée, la contribution du plus grand nombre est la condition du résultat |
| 2    | Protection du jalon programme. Seule protection retenue après acceptation du risque de ressource unique                              |
| 3    | Un mur de faits sans mise en ordre ne produit aucune découverte. La chronologie est ce qui transforme une liste en compréhension     |
| 6    | Rang relevé de 7 à 6 par rapport à l'ordre du 2026-08-10. La décision D-01 place les frontières candidates dans le résultat attendu de l'atelier, elles ne peuvent plus figurer en dernier |
| 8    | Rang minoré par l'existence du mode de conduite indépendant, qui couvre le même besoin sans développement                             |
| 10 et 11 | Seuls domaines dont l'usage intervient après l'atelier, dans la séance conduite par P6                                            |

**Point de vigilance sur les rangs 10 et 11.** Le Process Modelling et le Design Level ne servent pas l'atelier des 15 et 16 septembre. Leur absence n'affecte pas le jalon mais reporte la séance agrégats. Ce point remplace le point de vigilance du 2026-08-10, qui portait sur les mesures de découpage et devient sans objet, celles-ci passant au rang 6.

## 7. Exigences métier

### 7.1 Conventions

| Élément    | Convention                                                     |
|------------|-----------------------------------------------------------------|
| Identifiant| BR-nnn, stable et non réattribué                               |
| Priorité   | Indispensable, Souhaitable, Optionnelle                        |
| Traçabilité| Chaque exigence est reliée à au moins un objectif métier        |
| Formulation| Neutre vis-à-vis de toute solution technique                    |
| Domaine    | Chaque exigence appartient à un domaine de la section 6.1       |

**Ordre de lecture, à compter du 2026-08-11.** Les exigences sont regroupées par domaine et suivent l'ordre du parcours de découverte de la section 5.2. Les identifiants étant stables et non réattribués, ils n'apparaissent pas dans l'ordre numérique. Une exigence créée le 2026-08-11 porte un numéro à partir de BR-022 quelle que soit sa position dans le document. Les exigences modifiées portent la mention de leur révision.

### 7.2 D1, cadrage et conduite de l'atelier

#### BR-001 Mettre à disposition un déroulé d'atelier structuré

| Attribut         | Valeur                                     |
|------------------|---------------------------------------------|
| Objectif lié     | BO-05, BO-01                               |
| Parties prenantes| P2, P1                                     |
| Priorité         | Indispensable                              |
| Révision         | Amendée le 2026-08-11                      |

Le déroulé indique en permanence l'étape en cours, la question posée au groupe, le résultat attendu, les types d'éléments recommandés, le critère de sortie et le temps restant.

**Source du déroulé, précisée le 2026-08-12.** Le contenu du déroulé est instancié à partir de la méthode Event Storming d'Alberto Brandolini. Le nombre d'étapes retenues et leurs durées pour cet atelier restent à arrêter, ce qui relève de BR-003.

Critères d'acceptation :

- [ ] L'étape en cours est visible par l'ensemble des participants
- [ ] La question posée au groupe à cette étape est énoncée
- [ ] Le résultat attendu de l'étape en cours est énoncé
- [ ] Les types d'éléments recommandés à l'étape en cours sont indiqués
- [ ] Le critère de sortie de l'étape est consultable
- [ ] Le temps restant sur l'étape en cours est visible
- [ ] Un participant rejoignant la séance en cours accède immédiatement à ces informations

#### BR-002 Permettre le pilotage de la progression

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05               |
| Parties prenantes| P2                  |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

Le facilitateur contrôle l'avancement de l'atelier étape par étape. Le parcours n'est pas un tunnel : le retour à une étape antérieure préserve l'intégralité de ce qui a été produit et décidé.

Critères d'acceptation :

- [ ] Le facilitateur démarre, suspend et termine une étape
- [ ] Le facilitateur revient à une étape antérieure sans perte du contenu produit
- [ ] Le retour à une étape antérieure conserve les décisions, hypothèses et liens déjà établis
- [ ] Un signalement intervient avant la fin du temps imparti à l'étape

#### BR-003 Permettre l'adaptation du déroulé par le métier

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05               |
| Parties prenantes| P2, Product Owner   |
| Priorité         | Souhaitable         |

Le contenu du déroulé est modifiable sans intervention de nature technique.

Critères d'acceptation :

- [ ] Le libellé, le résultat attendu et la durée de chaque étape sont modifiables
- [ ] La modification est effectuée par une personne du métier

#### BR-036 Rendre observable l'état d'une étape avant son passage

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05, BO-10        |
| Parties prenantes| P2, P1              |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Le temps écoulé et le nombre d'éléments produits ne disent pas si une étape est terminée. Le facilitateur dispose d'une vue de ce qui reste à clarifier avant de passer à l'étape suivante. La décision de passage lui appartient et n'est jamais automatique.

Critères d'acceptation :

- [ ] Le critère de sortie de l'étape en cours est exprimé en termes observables
- [ ] Les éléments restant à clarifier à cette étape sont dénombrables et consultables
- [ ] Le passage à l'étape suivante résulte d'une action explicite du facilitateur
- [ ] La fin du temps imparti ne déclenche jamais seule le passage à l'étape suivante

### 7.3 D2, collecte des événements

#### BR-022 Collecter des faits métier formulés au passé

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-02, BO-03 |
| Parties prenantes| P1 à P5             |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

La première activité de découverte porte exclusivement sur des faits métier significatifs formulés au passé. La recherche de commandes, la discussion des solutions, le découpage et les mesures interviennent après.

Critères d'acceptation :

- [ ] L'étape de collecte annonce qu'elle attend des faits métier au passé
- [ ] Un exemple du domaine concerné illustre la formulation attendue
- [ ] Les autres types d'éléments ne sont pas mis en avant pendant cette étape
- [ ] Un élément d'un autre type produit pendant la collecte est conservé et traité à l'étape appropriée

#### BR-004 Permettre la contribution simultanée de tous les participants

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-02, BO-01 |
| Parties prenantes| P1 à P5             |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

L'ensemble des participants produit des éléments en même temps, sans prise de parole. Les types d'éléments disponibles suivent l'étape en cours, sans qu'aucun type ne soit interdit.

Critères d'acceptation :

- [ ] 23 participants contribuent simultanément sans perte d'élément
- [ ] Les types d'éléments recommandés à l'étape en cours sont mis en avant
- [ ] Aucun type d'élément n'est rendu inaccessible
- [ ] Les éléments produits sont visibles de tous
- [ ] La contribution ne requiert aucune prise de parole

#### BR-023 Reformuler un élément sans perdre la formulation d'origine

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-10, BO-01        |
| Parties prenantes| P1, P3, P5          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Une reformulation est un acte de modélisation. La formulation d'origine, portée par la parole métier, subsiste et reste consultable.

Critères d'acceptation :

- [ ] Un élément reformulé conserve sa formulation d'origine
- [ ] L'auteur de la reformulation est identifié
- [ ] La formulation d'origine reste consultable après reformulation
- [ ] Une reformulation est réversible

#### BR-005 Encadrer les phases de contribution dans le temps

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-05        |
| Parties prenantes| P2, P3              |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

Les phases de contribution ont une durée définie et visible. La limite temporelle et le critère de complétude sont deux notions distinctes : la fin du temps imparti ne signifie pas que la découverte est achevée.

Critères d'acceptation :

- [ ] Le facilitateur définit la durée d'une phase de contribution
- [ ] Le temps restant est visible par l'ensemble des participants
- [ ] La fin de la phase est signalée
- [ ] La fin du temps est distinguée du critère de sortie de l'étape, voir BR-036
- [ ] Le facilitateur prolonge une phase sans perte du contenu produit

#### BR-009 Ne jamais empêcher une contribution

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-08        |
| Parties prenantes| P3                  |
| Priorité         | Indispensable       |

Un signalement de non conformité n'empêche jamais la création ni la conservation d'un élément.

Critères d'acceptation :

- [ ] Un élément signalé comme non conforme est créé et conservé
- [ ] L'auteur écarte le signalement sans justification
- [ ] L'élément conservé demeure exploitable dans la suite de l'atelier

### 7.4 D3, chronologie et scénarios

#### BR-024 Représenter la chronologie, les branches et les événements pivots

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01               |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Le domaine se compose de processus multiples dont les participants ne connaissent que des parties. La mise en ordre doit donc admettre l'incertitude, les chemins alternatifs et les faits concomitants, sans forcer une séquence unique.

Critères d'acceptation :

- [ ] Les faits métier sont ordonnés dans le temps
- [ ] Deux faits simultanés sont représentables sans en ordonner un avant l'autre
- [ ] Un chemin alternatif est représentable à partir d'un point de divergence
- [ ] Un fait répétitif est identifiable comme tel
- [ ] Un fait dont la position est incertaine reste représentable sans position fixée
- [ ] Un fait pivot, qui conditionne la suite du déroulement, est distinguable

### 7.5 D4, enrichissement du Big Picture

#### BR-025 Rattacher acteurs, systèmes, commandes et politiques aux faits métier

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01               |
| Parties prenantes| P1 à P5             |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

L'enrichissement explicite les causalités : qui agit, pourquoi, à partir de quelles informations, et ce qui se déclenche ensuite.

Critères d'acceptation :

- [ ] Un acteur humain est rattaché au fait métier qu'il provoque
- [ ] Un système externe est rattaché au fait métier qu'il provoque
- [ ] Une commande est reliée au fait métier qu'elle produit
- [ ] Une commande est reliée à l'acteur ou à la politique qui la déclenche
- [ ] Une politique est reliée au fait métier qui la déclenche
- [ ] Une information consultée pour décider est rattachable à la commande concernée

### 7.6 D5, clarification, tensions et décisions

#### BR-008 Signaler les écarts à la notation selon l'étape en cours

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-01        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

Les écarts à la notation sont signalés à l'auteur, sans intervention d'un tiers. Le moment du signalement dépend de l'étape : pendant la collecte, une formulation imparfaite vaut mieux qu'une contribution perdue.

| Étape                | Comportement du signalement                                  |
|----------------------|--------------------------------------------------------------|
| Collecte             | Muet, aucun signalement spontané                             |
| Clarification        | Actif, les écarts sont signalés à leurs auteurs              |
| Toute étape          | Disponible à la demande de l'auteur qui souhaite se vérifier |

Critères d'acceptation :

- [ ] Aucun signalement spontané n'intervient pendant l'étape de collecte
- [ ] Les écarts non signalés pendant la collecte sont restitués à l'étape de clarification
- [ ] Un auteur sollicite une vérification de sa formulation à tout moment
- [ ] Un élément dont la nature paraît différente de celle déclarée déclenche une suggestion
- [ ] Le signalement est adressé au seul auteur de l'élément
- [ ] Aucune correction orale par un tiers n'est nécessaire

#### BR-010 Rendre la notation de référence accessible en permanence

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05, BO-03        |
| Parties prenantes| P2, P3, P5          |
| Priorité         | Souhaitable         |
| Révision         | Amendée le 2026-08-11 |

La notation retenue est consultable à tout moment par tout participant, avec l'indication des types attendus à l'étape en cours.

Critères d'acceptation :

- [ ] La notation est consultable sans quitter l'activité en cours
- [ ] Chaque élément de notation est accompagné d'un exemple du domaine concerné
- [ ] Les types attendus à l'étape en cours sont distingués des autres
- [ ] La notation indique le moyen d'exprimer une question et un désaccord, voir MQ-10

#### BR-026 Capturer les changements de langage et constituer un glossaire

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06, BO-08        |
| Parties prenantes| P1, P3, P4          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Un même terme change de sens d'une partie du domaine à l'autre. Ce changement est l'indice de frontière le plus fiable, il doit être capté au moment où il apparaît.

Critères d'acceptation :

- [ ] Un terme du domaine est enregistré avec sa définition et la zone où elle s'applique
- [ ] Un même terme porte plusieurs définitions rattachées à des zones différentes
- [ ] Deux termes différents désignant la même réalité sont reliés
- [ ] Un terme dont le sens fait débat est marqué comme tel
- [ ] Le glossaire est consultable pendant l'atelier

#### BR-027 Conserver les récits divergents sans les fusionner

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-08, BO-01        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Deux acteurs décrivent la même étape différemment. Cette divergence porte une part de la valeur de l'exercice et ne doit pas être arbitrée par lissage. Cette exigence répond à MQ-09, dont la résolution du 2026-08-08 a été contestée par la revue du 2026-08-10.

Critères d'acceptation :

- [ ] Deux descriptions contradictoires d'un même fait coexistent sans arbitrage
- [ ] Chaque description porte l'identité de son auteur
- [ ] La divergence est signalée visuellement comme point à traiter
- [ ] Une divergence traitée conserve la trace des deux versions et de la décision rendue
- [ ] Une divergence non traitée en fin d'atelier figure dans la restitution

#### BR-006 Prioriser les sujets à approfondir par un vote indicatif

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-08        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Souhaitable         |
| Révision         | Redéfinie le 2026-08-11 |

Le vote sert à choisir le prochain sujet d'exploration. Il ne décide ni de la vérité métier ni de l'importance d'un fait. Dans un domaine fragmenté, le fait le plus précieux est souvent celui qu'une seule personne connaît : la popularité y est un mauvais juge.

Critères d'acceptation :

- [ ] Le facilitateur ouvre et clôture une session de vote sur un ensemble d'éléments
- [ ] Chaque participant exprime son vote sans connaître celui des autres avant la clôture
- [ ] Aucun élément n'est supprimé, masqué ni déclassé au motif qu'il n'a pas reçu de voix
- [ ] Le résultat du vote est présenté comme un indicateur et n'emporte aucune conséquence automatique
- [ ] Le groupe et le facilitateur retiennent un sujet non arrivé en tête
- [ ] Le résultat d'un vote clôturé reste consultable

### 7.7 D6, frontières de contexte

#### BR-028 Créer plusieurs hypothèses de contexte sans altérer le Big Picture

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06, BO-08        |
| Parties prenantes| P4, P1, P3          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Plusieurs découpages concurrents coexistent jusqu'à ce que le groupe tranche. Une hypothèse de frontière est une lecture du modèle, elle ne le modifie pas.

**Précisé le 2026-08-12.** Tout participant peut créer une hypothèse, et leur nombre n'est pas limité.

Critères d'acceptation :

- [ ] Plusieurs hypothèses de découpage coexistent sur un même modèle
- [ ] Tout participant crée une hypothèse, sans rôle requis
- [ ] Le nombre d'hypothèses coexistantes n'est pas limité
- [ ] Une hypothèse créée est visible de tous dès sa création
- [ ] Une hypothèse porte un nom et un auteur
- [ ] Deux hypothèses concurrentes sont comparables côte à côte
- [ ] La création, la modification et la suppression d'une hypothèse laissent le modèle inchangé
- [ ] Une hypothèse écartée reste consultable avec le motif de son rejet

#### BR-029 Justifier une frontière par des indices métier traçables

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06, BO-09        |
| Parties prenantes| P4, P1, P3          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Une zone tracée sur un mur n'est pas une frontière. Une frontière candidate s'appuie sur des indices observés dans la matière produite par le métier.

Indices recevables :

| Indice                                                        | Origine dans le modèle                    |
|----------------------------------------------------------------|--------------------------------------------|
| Changement de vocabulaire ou de sens d'un même terme          | Glossaire, voir BR-026                     |
| Changement de règle métier ou d'invariant                      | Politiques et règles rattachées aux faits  |
| Changement de rythme ou de temporalité                         | Chronologie, voir BR-024                   |
| Changement de responsabilité, d'équipe ou d'autorité           | Acteurs rattachés, voir BR-025             |
| Rupture dans le cycle de vie d'une information                 | Informations consultées, voir BR-025       |
| Dépendance externe ou contrainte réglementaire                 | Systèmes externes, voir BR-025             |
| Point de tension ou désaccord durable                          | Divergences, voir BR-027                   |
| Forte cohésion interne et interactions explicites vers l'extérieur | Relations franchissantes, voir BR-018   |

Critères d'acceptation :

- [ ] Une frontière candidate porte un ou plusieurs indices choisis dans cette liste
- [ ] Chaque indice renvoie aux éléments du modèle qui le fondent
- [ ] Une frontière candidate portant moins de deux indices est signalée comme insuffisamment étayée
- [ ] Chaque contexte candidat porte un nom métier, une responsabilité, un langage et un niveau de confiance
- [ ] Les faits métier publiés et consommés par le contexte candidat sont identifiables
- [ ] La donnée permet de renseigner KPI-12

#### BR-030 Décrire les interactions entre contextes candidats

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06               |
| Parties prenantes| P4, P1, P3          |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Un découpage ne se juge pas sur ses zones mais sur ce qui les traverse. Une dépendance sans nom ni responsable est une ambiguïté d'organisation reportée sur la construction.

Critères d'acceptation :

- [ ] Une dépendance entre deux contextes candidats est représentable
- [ ] Chaque dépendance porte un nom et un sens
- [ ] Le contexte responsable de l'information échangée est désigné
- [ ] Une dépendance dont la responsabilité fait débat est marquée comme telle
- [ ] La donnée permet de renseigner KPI-13

#### BR-017 Permettre la délimitation d'une zone du modèle

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06               |
| Parties prenantes| P4, P1              |
| Priorité         | Souhaitable         |
| Révision         | Amendée le 2026-08-11 |

Une zone délimitée est le support d'une hypothèse de contexte. Elle ne vaut pas frontière par elle-même : la justification relève de BR-029.

Critères d'acceptation :

- [ ] Une zone du modèle est délimitée par un utilisateur
- [ ] Une zone délimitée est nommée
- [ ] Une zone délimitée est conservée et modifiable
- [ ] Une zone est rattachée à l'hypothèse de découpage dont elle relève

#### BR-018 Fournir des mesures objectives sur une zone délimitée

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06               |
| Parties prenantes| P4, P1              |
| Priorité         | Souhaitable         |
| Révision         | Amendée le 2026-08-11 |

Des mesures vérifiables sont fournies sur toute zone délimitée. Une mesure alimente la discussion, elle ne prouve pas une frontière et ne se substitue pas aux indices de BR-029.

Critères d'acceptation :

- [ ] Le nombre de relations franchissant la limite de la zone est fourni
- [ ] Ces relations sont identifiables individuellement
- [ ] Le modèle est représentable selon les acteurs qui y interviennent
- [ ] Les éléments sans relation sont signalés
- [ ] Aucun découpage n'est proposé par le dispositif
- [ ] Une mesure est présentée comme un indice parmi d'autres et non comme une conclusion

#### BR-019 Préserver l'intégrité du modèle

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-06        |
| Parties prenantes| P1, P4              |
| Priorité         | Indispensable       |

Les opérations de délimitation n'altèrent jamais le modèle produit par l'atelier.

Critères d'acceptation :

- [ ] La création d'une zone laisse le modèle inchangé
- [ ] La suppression d'une zone laisse le modèle inchangé
- [ ] Le modèle reste exploitable indépendamment des zones définies

### 7.8 D7, Process Modelling

#### BR-031 Sélectionner un scénario et le raffiner

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01               |
| Parties prenantes| P6, P4              |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Un scénario critique est retenu à l'intérieur d'un contexte candidat et détaillé selon l'enchaînement acteur ou politique, commande, événement, information consultée.

Critères d'acceptation :

- [ ] Un scénario est sélectionné à l'intérieur d'un contexte candidat
- [ ] Le motif de la sélection est consigné
- [ ] Le scénario nominal est représenté sous forme d'enchaînement de commandes et de faits métier
- [ ] Les variantes et cas d'exception du scénario sont représentables
- [ ] Le scénario raffiné reste relié aux faits métier du Big Picture dont il provient
- [ ] Le raffinement n'altère pas le Big Picture source

### 7.9 D8, Design Level et agrégats

#### BR-032 Identifier les invariants avant de proposer un agrégat

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-09        |
| Parties prenantes| P6, Product Owner, P3 |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Un invariant est une règle métier qui doit rester vraie à tout instant. Sa formulation précède toute proposition d'agrégat, et sa validité relève du métier et non de la technique.

Critères d'acceptation :

- [ ] Un invariant est formulé en langage métier
- [ ] Un invariant est rattaché aux commandes et faits métier qui le mettent en jeu
- [ ] Un invariant porte un statut de validation métier, voir BR-035
- [ ] Un invariant non validé par le métier est signalé comme à vérifier
- [ ] La formulation d'un invariant précède la création de tout agrégat qui s'y rattache

#### BR-033 Relier un agrégat candidat à ses fondements

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-09        |
| Parties prenantes| P6                  |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Un agrégat n'est ni une zone du Big Picture, ni un regroupement visuel, ni un contexte miniature. Il se construit à partir des commandes qu'il accepte, des invariants qu'il protège et des faits métier qu'il produit.

Critères d'acceptation :

- [ ] Un agrégat candidat est rattaché à un contexte candidat
- [ ] Un agrégat candidat porte son intention exprimée en langage métier
- [ ] Les commandes acceptées par l'agrégat sont listées
- [ ] Les invariants protégés par l'agrégat sont listés
- [ ] Les faits métier émis par l'agrégat sont listés
- [ ] Les informations consultées pour décider sont listées
- [ ] Un agrégat sans invariant explicite est refusé ou marqué comme incomplet
- [ ] Le nom de l'agrégat n'est arrêté qu'après formulation de ses invariants
- [ ] Aucun agrégat n'est déduit d'un regroupement visuel d'éléments
- [ ] La donnée permet de renseigner KPI-14

### 7.10 D9, restitution et traçabilité

#### BR-011 Conserver la transcription de la séance

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-04               |
| Parties prenantes| P1, Product Owner   |
| Priorité         | Indispensable       |

La transcription de la séance est conservée et associée à l'atelier.

Critères d'acceptation :

- [ ] La transcription est conservée à l'issue de la séance
- [ ] La transcription est associée à l'atelier auquel elle se rapporte
- [ ] La transcription reste consultable après l'atelier

#### BR-012 Rattacher tout élément dérivé à son origine

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-04, BO-09        |
| Parties prenantes| P1, P4, P6          |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

La traçabilité ne s'arrête pas aux propositions automatiques. Une frontière, une règle, un invariant et un agrégat sont eux aussi des éléments dérivés, dont l'origine doit rester atteignable.

Critères d'acceptation :

- [ ] Chaque élément proposé automatiquement affiche l'extrait de conversation qui le fonde
- [ ] Le rattachement subsiste après adoption de l'élément par le groupe
- [ ] Une frontière candidate renvoie aux indices et aux éléments du modèle qui la fondent
- [ ] Un invariant renvoie aux commandes et faits métier qui le mettent en jeu
- [ ] Un agrégat candidat renvoie à son contexte, ses commandes et ses invariants
- [ ] La navigation est possible dans les deux sens, de la parole vers l'agrégat et de l'agrégat vers la parole
- [ ] La donnée permet de renseigner KPI-06 et KPI-15

#### BR-035 Porter un statut de preuve sur chaque élément

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-08, BO-09, BO-10 |
| Parties prenantes| P1, P2, P3, P4, P6  |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Tous les éléments d'un modèle n'ont pas la même valeur de preuve. Présenter une hypothèse et un fait validé de la même manière conduit à construire sur du sable.

Statuts retenus : observé dans la parole métier, reformulé et validé, hypothèse, désaccord, décision, proposition automatique, à vérifier.

Critères d'acceptation :

- [ ] Chaque élément porte un statut de preuve
- [ ] Le statut est modifiable par le groupe en séance
- [ ] Le changement de statut conserve la trace de l'état antérieur, de son auteur et de sa date
- [ ] Les éléments sont filtrables par statut
- [ ] Le statut figure dans la restitution

#### BR-034 Versionner les hypothèses et consigner leur devenir

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-09, BO-10        |
| Parties prenantes| P1, P4, P6, Product Owner |
| Priorité         | Indispensable       |
| Révision         | Créée le 2026-08-11 |

Une décision de modélisation sans trace de ce qui a été écarté ne peut être réexaminée. Le journal des décisions conserve les hypothèses rejetées et leur motif.

Critères d'acceptation :

- [ ] Une hypothèse de découpage est versionnée
- [ ] La validation ou le rejet d'une hypothèse est consigné avec son motif et sa date
- [ ] Le groupe ayant rendu la décision est identifié
- [ ] Une hypothèse rejetée reste consultable
- [ ] Le journal des décisions figure dans la restitution

#### BR-007 Attribuer les contributions sans les afficher pendant l'atelier

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-03        |
| Parties prenantes| P1, P2, Product Owner |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

Chaque élément est rattaché à son auteur. Le décompte par personne sert la mesure des objectifs, il n'est pas rendu visible pendant la séance : un classement affiché encouragerait le volume au détriment de la qualité de la découverte.

Critères d'acceptation :

- [ ] Chaque élément produit porte l'identité de son auteur
- [ ] Aucun classement ni décompte par participant n'est visible pendant l'atelier
- [ ] Le décompte par participant est consultable après la séance
- [ ] Le nombre de rôles distincts ayant contribué à une zone est mesurable
- [ ] La donnée permet de renseigner KPI-03, KPI-04 et KPI-16

#### BR-013 Restituer le modèle, la transcription et les décisions

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-04, BO-01, BO-09 |
| Parties prenantes| P1, P4, P6, Product Owner |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

Le modèle produit, la transcription associée, les décisions et les liens entre niveaux sont restitués dans un format lisible et archivable, en distinguant ce qui est établi de ce qui reste incertain.

Critères d'acceptation :

- [ ] Le modèle est restituable dans un format lisible sans outil spécifique
- [ ] Chaque élément restitué porte sa nature, son auteur, son horodatage et son statut de preuve
- [ ] Les faits validés, les hypothèses et les questions ouvertes sont restitués séparément
- [ ] Les éléments issus d'une proposition automatique sont identifiés comme tels
- [ ] Le rattachement à l'extrait de conversation figure dans la restitution
- [ ] Les liens entre faits métier, frontières, scénarios, invariants et agrégats figurent dans la restitution
- [ ] Le journal des décisions figure dans la restitution
- [ ] Deux restitutions successives d'un modèle inchangé sont identiques

### 7.11 DT, enrichissement assisté

#### BR-014 Soumettre au groupe des éléments issus de la conversation

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-04, BO-01 |
| Parties prenantes| P1, P3              |
| Priorité         | Souhaitable         |
| Révision         | Amendée le 2026-08-11 |

Des éléments déduits de la conversation sont soumis au groupe à partir de la transcription. Ils interviennent après la production humaine de l'étape en cours, afin de ne pas orienter la découverte avant qu'elle ait eu lieu.

Critères d'acceptation :

- [ ] Les propositions sont établies à partir de la transcription de la séance
- [ ] Les propositions sont qualifiées selon la notation retenue
- [ ] Aucune proposition n'est présentée avant la fin de la production humaine de l'étape en cours
- [ ] Chaque proposition porte un niveau de confiance
- [ ] Chaque proposition est contestable par tout participant
- [ ] Le déclenchement de la production des propositions relève du facilitateur

#### BR-015 Faire disparaître les propositions non adoptées

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-03        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Souhaitable         |

Une proposition que le groupe n'adopte pas disparaît sans action requise.

Critères d'acceptation :

- [ ] L'adoption d'une proposition résulte d'une action explicite d'un participant
- [ ] L'absence d'adoption entraîne la disparition de la proposition en fin d'exercice
- [ ] Aucune validation collective n'est requise pour écarter une proposition

#### BR-016 Distinguer la production du groupe des propositions automatiques

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-01, BO-04        |
| Parties prenantes| P1, P2, P3, P4      |
| Priorité         | Indispensable       |

La production du groupe et les propositions automatiques sont distinguables sans ambiguïté.

Critères d'acceptation :

- [ ] Une proposition automatique est distinguable d'un élément produit par un participant
- [ ] La distinction subsiste dans la restitution du modèle
- [ ] Aucun participant ne peut confondre les deux origines

### 7.12 D10, continuité de l'atelier

#### BR-020 Disposer d'un mode de conduite indépendant de l'outil

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-07               |
| Parties prenantes| P2, Responsable de programme |
| Priorité         | Indispensable       |
| Révision         | Amendée le 2026-08-11 |

L'atelier peut se tenir intégralement sans recours à l'outil. Le repli protectait jusqu'ici le déroulement de la séance mais pas la matière produite : une bascule en cours d'atelier faisait perdre les liens entre éléments, les statuts et les décisions.

Critères d'acceptation :

- [ ] Un déroulé d'atelier exploitable existe indépendamment de l'outil
- [ ] Un support de contribution partagé permet de tenir les deux jours
- [ ] Le facilitateur confirme pouvoir conduire l'atelier dans ce mode
- [ ] Le contenu produit avant une bascule éventuelle reste exploitable
- [ ] Les faits métier, les liens, les statuts et les décisions sont exportables à tout moment dans un format exploitable hors de l'outil

#### BR-021 Permettre une décision de bascule antérieure à l'atelier

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-07               |
| Parties prenantes| Responsable de programme |
| Priorité         | Indispensable       |

La décision de recourir au mode indépendant est prise avant l'atelier, sur un critère défini.

Critères d'acceptation :

- [ ] Une date de décision est fixée avant l'atelier
- [ ] Le critère de décision est défini et vérifiable
- [ ] Le décideur est désigné nommément
- [ ] La décision permet d'informer les participants avant l'atelier

## 8. Matrice de traçabilité

Mise à jour le 2026-08-11. Trente-six exigences, dix objectifs, seize indicateurs.

| Objectif | Exigences rattachées                                                                                            | Indicateurs            |
|----------|-------------------------------------------------------------------------------------------------------------------|------------------------|
| BO-01    | BR-001, BR-004, BR-013, BR-014, BR-015, BR-016, BR-019, BR-022, BR-023, BR-024, BR-025, BR-026, BR-031, BR-032, BR-033 | KPI-01, KPI-02, KPI-09, KPI-14 |
| BO-02    | BR-004, BR-007, BR-008, BR-014, BR-022                                                                            | KPI-03                 |
| BO-03    | BR-004, BR-005, BR-006, BR-007, BR-009, BR-010, BR-015, BR-022                                                    | KPI-04                 |
| BO-04    | BR-011, BR-012, BR-013, BR-014, BR-016                                                                            | KPI-06                 |
| BO-05    | BR-001, BR-002, BR-003, BR-005, BR-010, BR-036                                                                    | KPI-05                 |
| BO-06    | BR-017, BR-018, BR-019, BR-026, BR-028, BR-029, BR-030                                                            | KPI-08, KPI-12, KPI-13 |
| BO-07    | BR-020, BR-021                                                                                                    | KPI-07                 |
| BO-08    | BR-006, BR-009, BR-026, BR-027, BR-028, BR-035                                                                    | KPI-11                 |
| BO-09    | BR-012, BR-013, BR-029, BR-032, BR-033, BR-034, BR-035                                                            | KPI-15                 |
| BO-10    | BR-023, BR-034, BR-035, BR-036                                                                                    | KPI-10, KPI-16         |

Chaque exigence est rattachée à au moins un objectif. Aucun objectif n'est dépourvu d'exigence. Aucun indicateur n'est dépourvu d'exigence permettant de le renseigner.

### 8.1 Chaîne de découverte

La matrice ci-dessus relie les exigences aux objectifs. La chaîne ci-dessous montre comment une exigence en rend une autre possible, du fait métier jusqu'à l'agrégat. C'est cette continuité que la revue du 2026-08-10 signalait comme absente.

| Maîllon                     | Exigence productrice | Exigences consommatrices          |
|-----------------------------|----------------------|-----------------------------------|
| Parole métier               | BR-011               | BR-012, BR-014                    |
| Fait métier                 | BR-022, BR-004       | BR-024, BR-025, BR-027            |
| Chronologie et causalité    | BR-024, BR-025       | BR-029, BR-031                    |
| Langage et tension          | BR-026, BR-027       | BR-029                            |
| Frontière candidate         | BR-028, BR-029       | BR-030, BR-031                    |
| Scénario raffiné            | BR-031               | BR-032                            |
| Invariant                   | BR-032               | BR-033                            |
| Agrégat candidat            | BR-033               | BR-013                            |
| Preuve et décision          | BR-034, BR-035       | BR-012, BR-013                    |

Aucun maîllon n'est produit sans exigence qui l'alimente. Un agrégat remonte jusqu'à la parole métier en huit étapes, toutes couvertes.

## 9. Hypothèses, informations manquantes et questions

### 9.1 Hypothèses portant le document

Ces hypothèses sont reprises du cadrage source, qui les déclare non validées auprès d'utilisateurs finaux.

| ID       | Hypothèse                                                                          | Exigences exposées         |
|----------|-------------------------------------------------------------------------------------|----------------------------|
| **HY-01**| La mobilisation du porteur de la méthode par la mécanique est la difficulté dominante | Ensemble du document       |
| **HY-02**| La contribution écrite débloque effectivement la participation des experts métier   | BR-004, BR-005, BR-006     |
| **HY-03**| Un contrôle de notation par règles fixes apporte une valeur perceptible             | BR-008, BR-009, BR-010     |
| **HY-04**| Le facilitateur peut conduire l'atelier au moyen d'un déroulé écrit                 | BR-001, BR-002, BR-020     |
| **HY-05**| Le groupe accepte des propositions automatiques sans se sentir dépossédé            | BR-014, BR-015, BR-016     |

Le cadrage source indique que des travaux de validation auraient été menés mais ne seront ni consignés ni communiqués. Ces hypothèses conservent donc le statut de non validées dans le présent document.

### 9.2 Informations manquantes

Informations encore absentes à la date du 2026-08-11.

| ID       | Information absente du cadrage source                                                    | Conséquence                                                    |
|----------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **MQ-03**| Volumétrie attendue du modèle produit                                                     | Aucune exigence de tenue à la charge n'est formulable           |
| **MQ-04**| Durée de conservation des transcriptions                                                  | BR-011 est incomplète sur la dimension rétention                |
| **MQ-05**| Seuils d'alerte pour KPI-06, KPI-07 et KPI-08                                             | Trois indicateurs sur huit sont sans seuil de déclenchement     |
| **MQ-06**| Exigences d'accessibilité pour des participants non techniques                            | Aucune exigence correspondante                                  |
| **MQ-08**| Modalités de restitution attendues par les architectes en séance de découpage             | BR-017 et BR-018 sont formulées sans besoin exprimé             |
| **MQ-10**| Description de la notation retenue, et notamment du moyen d'exprimer une question         | Il n'est pas établi que BR-004 couvre l'attente de questionnement du rôle P5, voir AC-12. **2026-08-12** : le déroulé se réfère à la méthode d'Alberto Brandolini, reste à confirmer que la notation en provient également |

MQ-10 était cité en section 4.1 et dans AC-12 sans figurer dans ce tableau. L'omission est corrigée le 2026-08-11.

Informations closes, conservées pour mémoire.

| ID       | Objet                                                                    | Résolution                                                      |
|----------|---------------------------------------------------------------------------|------------------------------------------------------------------|
| MQ-01    | Caractérisation de 12 des 23 participants                                 | Close le 2026-08-07, rôle P5 créé en section 4.1                |
| MQ-02    | Définition du processus principal du domaine                              | Close le 2026-08-07, aucun processus partagé n'existe            |
| MQ-07    | Description quantifiée d'un atelier de référence                          | Close le 2026-08-08, renoncement acté, voir Q-01                |
| MQ-09    | Traitement des divergences entre récits d'acteurs différents              | Close le 2026-08-08 par un traitement hors outil, résolution contestée par la revue du 2026-08-10. **Reprise le 2026-08-11 par BR-027**, qui impose la conservation des récits divergents sans fusion |

### 9.3 Questions à traiter

| ID      | Question                                                                                              | Réponse du 2026-08-08                                                                 |
|---------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Q-01**| Une référence de comparaison sera-t-elle constituée avant l'atelier ?                                  | **Non.** Renoncement explicite à la démonstration du gain                              |
| **Q-02**| Les reformulations de KPI-01 et l'ajout de KPI-09 sont-elles validées ?                                | **Oui.** Les deux indicateurs sont actés                                               |
| **Q-03**| Quels sont les rôles et attentes des 12 participants non caractérisés ?                               | **Répondu.** Compléments d'information, questions, recueil d'information, alignement sur la vision produit. Rôle P5 créé |
| **Q-04**| Quelle durée de conservation s'applique aux transcriptions ?                                           | **Reportée après septembre**                                                           |
| **Q-05**| Quel est le devenir de l'outil après l'atelier ?                                                       | **Reportée après septembre**                                                           |
| **Q-06**| Les seuils d'alerte manquants doivent-ils être fixés avant l'atelier ?                                 | **Non.** KPI-06, KPI-07 et KPI-08 restent sans seuil                                   |
| **Q-07**| Comment les divergences entre récits d'acteurs sont-elles capturées ?                                  | **Révisée le 2026-08-11.** La réponse du 2026-08-08 renvoyait au facilitateur, sans trace vérifiable. BR-027 impose désormais la conservation des récits divergents |

Toutes les questions ouvertes sont traitées. Deux décisions sont reportées après l'atelier.

### 9.4 Décisions d'arbitrage du 2026-08-11

Arbitrage rendu par le Product Owner à la suite de la revue critique du 2026-08-10.

| ID       | Question                                                        | Décision                                                                                     |
|----------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **D-01** | Quelle ambition métier pour l'atelier des 15 et 16 septembre ?    | Big Picture plus frontières de contexte candidates argumentées                                |
| **D-02** | Jusqu'où le produit doit-il aller ?                                | Chaîne complète jusqu'aux agrégats                                                            |
| **D-03** | Comment financer la charge ajoutée ?                               | Sans objet. Le délai n'est plus un critère d'arbitrage, voir section 6.4                      |
| **D-04** | Le vote décide-t-il de ce qui est conservé ?                       | Non. Le vote est un indicateur, aucun élément n'est supprimé faute de voix, voir BR-006       |
| **D-05** | Quand le contrôle de notation intervient-il ?                      | Selon l'étape, muet pendant la collecte, actif en clarification, disponible à la demande, voir BR-008 |
| **D-06** | Que deviennent les mesures de participation ?                      | Conservées mais non affichées pendant l'atelier, complétées par la famille C, voir BR-007     |
| **D-07** | Qui valide une frontière, une règle, un invariant, un agrégat ?    | Le groupe réuni en séance, voir la règle d'autorité en section 4.1                            |
| **D-08** | Quand et avec qui le niveau agrégat est-il traité ?                | Séance ultérieure avec les équipes de développement produit, rôle P6, avec représentant métier |

Restent à confirmer : la priorité Haute de BO-06, les objectifs BO-08 à BO-10, les cibles de la famille C d'indicateurs, l'effectif du rôle P6 et l'ordre de priorité de la section 6.5.

## 10. Divergences relevées dans le cadrage source

Les quatre divergences internes du cadrage source sont traitées. Aucune ne demeure ouverte.

| ID       | Divergence                                                                                            | Résolution                                                                |
|----------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **CT-01**| Le traitement automatisé du contenu métier est déclaré non tranché dans une section et autorisé dans trois autres | **Clos le 2026-08-10.** Le traitement est autorisé. BR-014 à BR-016 sont sans condition |
| **CT-02**| Le journal des décisions maintient une condition levée ailleurs                                        | **Clos le 2026-08-10.** Même objet que CT-01                              |
| **CT-03**| Cinq domaines fonctionnels sont listés, la recommandation finale en compte quatre                      | **Clos le 2026-08-10.** Cinq domaines sont retenus, priorités et réalisés par ordre d'importance. Aucun seuil de livraison n'est fixé |
| **CT-04**| Une référence de comparaison est recommandée alors que la question reste ouverte                        | **Clos le 2026-08-08.** Renoncement acté, voir Q-01                        |

## 11. Bénéfices attendus

Le cadrage source ne comporte aucune évaluation économique. Les bénéfices ci-dessous sont qualitatifs et repris tels quels.

| Bénéficiaire              | Bénéfice attendu                                                                        |
|---------------------------|-------------------------------------------------------------------------------------------|
| Programme de transformation | Un modèle du domaine exploitable à l'issue de l'atelier, sans session complémentaire     |
| Porteurs de la méthode    | Restitution de leur capacité à contribuer au contenu                                      |
| Experts métier            | Prise en compte fidèle de leur parole, y compris de ses nuances et de ses désaccords       |
| Architectes               | Hypothèses de découpage argumentées par des indices métier, soumises au groupe            |
| Équipes de développement  | Des agrégats fondés sur des invariants métier explicites plutôt que sur une interprétation |
| Organisation              | Conservation de la conversation métier et de son lien avec le modèle                       |

Aucun gain chiffré ne peut être établi en l'absence de référence de comparaison, voir MQ-07 et Q-01.

## 12. Suites

Chaque action est décrite par ce qu'il faut faire concrètement, ce qui atteste qu'elle est terminée, et l'effet de son absence.

**Mise à jour du 2026-08-11.** La revue critique du 2026-08-10 a été arbitrée et intégrée. Trois actions restent à mener, dont une seule apporte une preuve extérieure.

### 12.1 Avant l'engagement du développement

#### AC-01 Trancher les quatre divergences du cadrage source

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Environ 15 minutes                                                         |
| Livrable          | Quatre lignes de décision, une par divergence                              |

Le cadrage source se contredit sur quatre points, listés en section 10. Pour chacun, indiquer quelle version fait foi.

La plus importante est CT-01 : une section indique que le traitement automatisé du contenu métier n'est pas tranché, trois autres le déclarent autorisé. **Trois exigences en dépendent** : BR-014, BR-015 et BR-016.

Sans cette décision, le développement de l'enrichissement assisté démarre sur une base incertaine.

#### AC-02 Valider la reformulation des indicateurs du jalon

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner, avec les porteurs de la méthode                             |
| Charge            | Environ 30 minutes                                                         |
| Livrable          | KPI-01 et KPI-09 validés ou amendés                                        |

L'indicateur maître initial mesurait la couverture d'un processus qui n'existe pas. Il a été reformulé en section 3.2 et doit être confirmé.

Sans cette validation, personne ne saura dire le 16 septembre au soir si l'atelier a réussi. Deux personnes de bonne foi pourront conclure différemment.

Correspond à la question Q-02.

#### AC-03 Décider du traitement des divergences entre acteurs

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner, avec les porteurs de la méthode                             |
| Charge            | Environ 30 minutes                                                         |
| Livrable          | Une exigence complémentaire, ou une décision de ne pas en créer            |

La connaissance du domaine étant fragmentée, deux acteurs décriront la même étape différemment. Aucune des 21 exigences ne couvre la capture de ces divergences.

Deux issues possibles :

- Une exigence complémentaire est créée, et le périmètre est réexaminé au regard de la marge de réalisation.
- Aucune exigence n'est créée, et les divergences sont traitées hors outil par le facilitateur.

Sans cette décision, le modèle produit lissera les désaccords et donnera une impression de consensus sur un domaine que personne ne maîtrise entièrement.

Correspond à MQ-09 et Q-07.

#### AC-04 Valider les objectifs métier et leur priorisation

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Environ 30 minutes                                                         |
| Livrable          | Sept objectifs marqués validés ou amendés                                  |

Relire les objectifs BO-01 à BO-07 en section 3.1 et confirmer chacun, ainsi que sa priorité.

L'enjeu est concret : la priorité d'un objectif détermine celle des exigences qui lui sont rattachées, et donc l'ordre de réalisation. Si BO-06 n'est pas réellement prioritaire, les exigences BR-017 à BR-019 peuvent être différées et de la marge est restituée.

### 12.2 Avant l'atelier des 15 et 16 septembre

#### AC-05 Faire confirmer la couverture des exigences par les rôles concernés

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Six échanges d'environ 30 minutes                                          |
| Livrable          | Un retour écrit par rôle                                                   |

Transmettre la section 7 à un représentant de chaque rôle et poser deux questions : les exigences couvrent-elles votre besoin, et qu'est-ce qui manque ?

| Rôle | Interlocuteur                     | Exigences à relire     |
|------|-----------------------------------|------------------------|
| P1   | Les deux porteurs de la méthode   | BR-004 à BR-016, BR-022 à BR-027, BR-034 à BR-036 |
| P2   | Le facilitateur                   | BR-001 à BR-003, BR-020, BR-036 |
| P3   | Un ou deux experts métier         | BR-004 à BR-010, BR-022, BR-023, BR-026, BR-027 |
| P4   | Les deux architectes              | BR-017 à BR-019, BR-028 à BR-030 |
| P5   | Un ou deux contributeurs secondaires | BR-004, BR-010, BR-013, BR-027 |
| P6   | Équipe de développement produit   | BR-031 à BR-033          |

**C'est la seule action qui apporte une preuve extérieure.** Toutes les autres reposent sur la conviction du Product Owner. Les cinq hypothèses de la section 9.1 restent non validées tant que cette action n'est pas menée.

#### AC-06 Fixer la durée de conservation des transcriptions

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Responsable de programme                                                   |
| Charge            | Une question écrite                                                        |
| Livrable          | Une durée exprimée                                                         |

L'exigence BR-011 impose la conservation des transcriptions sans en préciser la durée. Une transcription de réunion métier conservée sans échéance dans un contexte assurantiel appelle une position explicite.

Correspond à MQ-04 et Q-04.

#### AC-07 Fixer les seuils d'alerte manquants

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Environ 15 minutes                                                         |
| Livrable          | Trois seuils exprimés                                                      |

Les indicateurs KPI-06, KPI-07 et KPI-08 sont dépourvus de seuil de déclenchement. Sans seuil, un résultat médiocre peut être interprété comme acceptable après coup.

Correspond à MQ-05 et Q-06.

#### AC-08 Décider de la constitution d'une référence de comparaison

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Une décision, puis une demi-journée si la réponse est positive             |
| Livrable          | Une décision tracée                                                        |

Aucun atelier de référence n'existe. Sans point de comparaison, aucun gain ne pourra être démontré après septembre.

Deux issues : constituer une référence par un atelier restreint préalable, ou renoncer explicitement à la démonstration du gain.

Correspond à MQ-07 et Q-01.

#### AC-09 Caractériser les participants non couverts

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Environ 30 minutes                                                         |
| Livrable          | Un rôle et une attente par participant                                     |

Sur 23 participants, 11 sont rattachés à un rôle produit. Les 12 autres utiliseront l'outil sans qu'aucun besoin ne soit exprimé pour eux.

Correspond à MQ-01 et Q-03.

### 12.3 Après l'atelier

#### AC-10 Statuer sur le devenir de l'outil

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Responsable de programme                                                   |
| Livrable          | Une décision entre abandon, reprise et industrialisation                   |

Cette décision n'est pas bloquante pour l'atelier. Elle le devient si une industrialisation est envisagée, auquel cas les cinq hypothèses de la section 9.1 devront être documentées.

Correspond à Q-05.

#### AC-11 Compléter les informations résiduelles

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Livrable          | MQ-03, MQ-06 et MQ-08 renseignés                                           |

Volumétrie attendue du modèle, exigences d'accessibilité, modalités de restitution attendues par les architectes. Ces informations n'empêchent pas de démarrer, mais leur absence limite la formulation d'exigences complémentaires.

### 12.4 Récapitulatif

| Action | Objet                                                | Responsable | Charge      | Échéance         | Statut                          |
|--------|------------------------------------------------------|-------------|-------------|------------------|---------------------------------|
| AC-01  | Trancher les divergences du cadrage                  | PO          | 15 min      | Avant le dev     | Close le 2026-08-10             |
| AC-02  | Valider les indicateurs du jalon                     | PO, P1      | 30 min      | Avant le dev     | Close, validés le 2026-08-08    |
| AC-03  | Décider du traitement des divergences entre acteurs  | PO, P1      | 30 min      | Avant le dev     | Close le 2026-08-11, BR-027 créée |
| AC-04  | Confirmer les objectifs et l'ordre de priorité        | PO          | 30 min      | Avant le dev     | Close le 2026-08-10             |
| AC-05  | Faire confirmer la couverture par les rôles          | PO          | 5 x 30 min  | Avant l'atelier  | **À mener**                     |
| AC-06  | Fixer la durée de conservation                       | Programme   | Une question| **Après l'atelier** | Reportée                      |
| AC-07  | Fixer les seuils d'alerte manquants                  | PO          | 15 min      | Avant l'atelier  | Close, pas de seuil retenu      |
| AC-08  | Décider d'une référence de comparaison               | PO          | Variable    | Avant l'atelier  | Close, renoncement acté         |
| AC-09  | Caractériser les participants non couverts           | PO          | 30 min      | Avant l'atelier  | Close, rôle P5 créé             |
| AC-10  | Statuer sur le devenir de l'outil                    | Programme   | Une décision| Après l'atelier  | Reportée                        |
| AC-11  | Compléter les informations résiduelles               | PO          | Variable    | Après l'atelier  | Ouverte, MQ-03, MQ-06, MQ-08    |
| AC-12  | Vérifier la couverture du besoin de questionnement   | PO, P1      | 15 min      | Avant le dev     | **À mener**                     |
| AC-13  | Arbitrer les suites de la revue critique             | PO          | Variable    | Avant le dev     | Close le 2026-08-11, voir section 9.4 |
| AC-14  | Confirmer les points dérivés de l'arbitrage          | PO          | 30 min      | Avant le dev     | **Nouvelle, à mener**           |

### 12.5 Ce qui reste à faire

| Action | Objet                                                        | Charge     | Pourquoi elle compte                                                                  |
|--------|--------------------------------------------------------------|------------|----------------------------------------------------------------------------------------|
| AC-14  | Confirmer les points dérivés de l'arbitrage                  | 30 min     | Cinq éléments découlent mécaniquement des décisions du 2026-08-11 sans avoir été validés |
| AC-12  | Vérifier la couverture du besoin de questionnement           | 15 min     | Le rôle P5, le plus nombreux, a une attente dont la couverture reste à établir         |
| AC-05  | Faire confirmer la couverture par les six rôles               | 6 x 30 min | Seule action apportant une preuve extérieure aux convictions du Product Owner          |

**État du document au 2026-08-11.** Le parcours de découverte, la méthode d'identification des frontières et le niveau des agrégats sont désormais couverts par trente-six exigences. La chaîne reliant la parole métier à l'agrégat est complète, voir section 8.1.

Deux réserves subsistent. Les points listés dans AC-14 découlent des décisions d'arbitrage mais n'ont pas été validés explicitement. Les cinq hypothèses de la section 9.1 restent non vérifiées auprès des utilisateurs, ce que seule AC-05 peut lever.

#### AC-14 Confirmer les points dérivés de l'arbitrage

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner                                                              |
| Charge            | Environ 30 minutes                                                         |
| Livrable          | Cinq lignes de confirmation ou d'amendement                                |

Ces cinq points découlent des décisions du 2026-08-11 sans avoir été tranchés pour eux-mêmes.

| Point à confirmer                                              | Conséquence s'il est infirmé                                |
|------------------------------------------------------------------|--------------------------------------------------------------|
| Priorité Haute attribuée à BO-06                                 | L'ordre de réalisation de la section 6.5 est à revoir       |
| Création des objectifs BO-08, BO-09 et BO-10                     | Onze exigences perdent leur objectif de rattachement        |
| Cibles proposées pour les indicateurs KPI-10 à KPI-16            | Sept indicateurs restent sans seuil exploitable             |
| Dénominateur de KPI-04, 22 contributeurs possibles et non 23     | La cible de 18 correspond à 82 pour cent et non 80          |
| Échéance de la séance Design Level                               | Les exigences BR-031 à BR-033 restent sans horizon de besoin |
| Ordre de priorité des onze domaines en section 6.5               | L'arbitrage programme s'appuierait sur un ordre non validé  |

#### AC-12 Vérifier la couverture du besoin de questionnement

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner, avec les porteurs de la méthode                             |
| Charge            | Environ 15 minutes                                                         |
| Livrable          | Une confirmation, ou une exigence complémentaire                           |

Le rôle P5 a pour attente de poser des questions pendant l'atelier. BR-010 exige désormais que la notation indique le moyen d'exprimer une question et un désaccord, mais la notation elle-même n'est pas décrite dans le cadrage source.

Deux issues : la notation comporte déjà un moyen d'exprimer une question, et BR-010 suffit ; ou elle n'en comporte pas, et le contenu de la notation doit être arrêté.

Correspond à MQ-10.

