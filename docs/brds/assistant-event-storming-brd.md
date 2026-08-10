---
title: "Assistant Event Storming - Document d'exigences métier"
description: "Exigences métier de l'assistant d'atelier Event Storming destiné au cadrage du domaine dommage aux biens"
author: "Product Owner"
ms.date: 2026-08-07
ms.topic: reference
keywords:
  - event storming
  - exigences métier
  - dommage aux biens
---

## Préambule

Ce document traduit en exigences métier le cadrage produit V0 de l'assistant Event Storming.

| Élément            | Valeur                                                  |
|--------------------|---------------------------------------------------------|
| Source unique      | Cadrage produit V0, Product Manager Advisor, 2026-08-05 |
| Statut             | Version 1, à valider                                    |
| Neutralité         | Aucune solution technique n'est prescrite               |
| Périmètre          | Strictement celui du cadrage source                     |

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
| **BO-01** | Construire une représentation partagée du domaine dommage aux biens à partir de connaissances fragmentées, exploitable par le programme | Critique |
| **BO-02** | Restituer aux porteurs de la méthode leur capacité à contribuer au contenu                   | Critique |
| **BO-03** | Permettre à chaque participant de contribuer sans avoir à prendre la parole                  | Haute    |
| **BO-04** | Conserver la parole métier et la rattacher aux éléments du modèle                            | Haute    |
| **BO-05** | Rendre le facilitateur autonome sur la conduite de l'atelier sans maîtrise préalable de la méthode | Haute |
| **BO-06** | Outiller la décision de découpage des architectes par des éléments objectifs                 | Moyenne  |
| **BO-07** | Garantir la tenue de l'atelier indépendamment de la disponibilité de l'outil                 | Critique |

BO-01 a été reformulé le 2026-08-07. La formulation initiale visait la modélisation d'un processus existant. La précision apportée en section 1.2 établit qu'aucun processus partagé ne préexiste, l'objectif porte donc sur la construction d'une représentation collective.

**Les sept objectifs et leur priorisation sont validés par le Product Owner le 2026-08-10**, par confirmation de l'ordre de priorité métier de la section 6.5 qui en découle.

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

Une référence de comparaison antérieure à l'atelier n'existe pas et ne sera pas constituée, décision du 2026-08-08.

## 4. Parties prenantes et rôles

### 4.1 Bénéficiaires et utilisateurs

| Rang   | Partie prenante                     | Effectif | Rôle vis-à-vis de l'initiative                                   | Objectifs concernés  |
|--------|-------------------------------------|----------|-------------------------------------------------------------------|----------------------|
| **P1** | Porteur de la méthode Event Storming | 2       | Bénéficiaire principal, redevient contributeur                    | BO-01, BO-02, BO-04  |
| **P2** | Facilitateur de l'atelier            | 1       | Utilisateur principal, conduit la séance                          | BO-05, BO-07         |
| **P3** | Expert métier dommage aux biens      | 6       | Contributeur, source de vérité du domaine                         | BO-01, BO-03         |
| **P4** | Architecte                           | 2       | Utilisateur d'une activité distincte, postérieure à l'atelier     | BO-06                |
| **P5** | Participant contributeur secondaire  | 12      | Apporte des compléments, questionne, recueille de l'information   | BO-01, BO-03         |

Le rôle P5 est caractérisé le 2026-08-07 sur précision du Product Owner. Il regroupe les participants qui ne détiennent pas la connaissance du domaine et n'exercent pas de responsabilité sur le modèle, mais qui contribuent de quatre manières :

| Attente                                        | Exigences concernées                    |
|------------------------------------------------|------------------------------------------|
| Apporter des compléments d'information         | BR-004, BR-005                          |
| Poser des questions                            | Voir MQ-10                              |
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

Le processus cible se décompose en deux activités distinctes, conformément au cadrage source.

#### Activité 1, atelier de domaine

Se tient sur deux jours, en distanciel, avec les 23 participants.

| Étape                                  | Résultat attendu                                                           | Parties prenantes |
|----------------------------------------|-----------------------------------------------------------------------------|-------------------|
| Conduite de la séance                  | Le facilitateur suit un déroulé structuré sans maîtriser la méthode         | P2                |
| Contribution des participants          | Chacun produit des éléments sans avoir à prendre la parole                  | P1, P2, P3        |
| Convergence                            | Le groupe trie les éléments produits sans débat                             | P1, P2, P3        |
| Contrôle de conformité                 | Les écarts de notation sont signalés sans interrompre la contribution       | P1, P2, P3        |
| Conservation de la conversation        | La transcription est conservée et rattachable au modèle                     | P1                |
| Enrichissement assisté                 | Des propositions issues de la conversation sont soumises au groupe          | P1, P3            |

#### Activité 2, séance de découpage

Se tient après l'atelier, en comité restreint.

| Étape                                  | Résultat attendu                                                           | Parties prenantes |
|----------------------------------------|-----------------------------------------------------------------------------|-------------------|
| Délimitation de zones                  | Une zone du modèle est délimitée par un architecte                          | P4                |
| Obtention de mesures                   | Des mesures objectives sont fournies sur la zone délimitée                  | P4, P1            |
| Décision de découpage                  | Les architectes arrêtent un découpage qu'ils peuvent justifier              | P4                |

#### Activité de continuité

Le cadrage source impose un mode de conduite de l'atelier indépendant de l'outil, ainsi qu'une décision de bascule antérieure à l'atelier. Ces éléments constituent un processus à part entière, couvert par BO-07.

## 6. Périmètre

### 6.1 Dans le périmètre

| Domaine                          | Contenu                                                                                       |
|----------------------------------|------------------------------------------------------------------------------------------------|
| Conduite de l'atelier            | Mise à disposition d'un déroulé structuré et pilotage de la progression                        |
| Contribution                     | Saisie simultanée par l'ensemble des participants, encadrée dans le temps                      |
| Convergence                      | Tri des éléments produits par vote                                                             |
| Conformité de notation           | Signalement des écarts au moment de la contribution, selon des règles fixes                    |
| Traçabilité                      | Conservation de la transcription et rattachement des éléments à leur origine                   |
| Enrichissement assisté           | Propositions issues de la conversation, soumises au groupe, dans une couche distincte          |
| Mesures de découpage             | Délimitation de zones et mesures objectives associées                                          |
| Restitution                      | Restitution du modèle et de la transcription dans un format lisible et archivable              |
| Continuité                       | Mode de conduite indépendant de l'outil et décision de bascule                                 |

### 6.2 Hors périmètre

| Élément exclu                                            | Motif retenu dans le cadrage source                                                  |
|-----------------------------------------------------------|---------------------------------------------------------------------------------------|
| Production automatique d'un découpage du domaine          | Hypothèse de pertinence non mesurée, réalisation prévue ultérieurement                |
| Reformulation automatique des éléments à la contribution  | Reportée à une version ultérieure, le contrôle par règles fixes est retenu            |
| Production de documents d'exigences ou d'architecture     | Suppose un modèle complet et validé, non attendu à l'issue de l'atelier               |
| Usage par plusieurs organisations                         | Hypothèse de généralisation sans preuve                                               |
| Conduite de l'animation par un dispositif automatisé      | La distribution de la parole et la gestion du temps restent humaines                  |
| Captation autonome de la parole                           | Une transcription est déjà produite par l'outil de visioconférence en place           |

### 6.3 Règle de gestion du périmètre

Aucune extension du périmètre n'est admise sans réexamen du cadrage produit. Le cadrage source relève une marge de réalisation nulle.

### 6.4 Règle de réalisation

Décision du Product Owner du 2026-08-10.

> Les cinq domaines fonctionnels sont retenus. Ils sont priorités et réalisés par ordre d'importance. **Aucun seuil de livraison minimal n'est fixé.**

Conséquence à assumer : en cas de dépassement du délai, ce sont les domaines les moins prioritaires qui ne sont pas livrés. L'ordre de priorité détermine donc ce qui sera absent le jour de l'atelier, ce qui en fait une décision métier et non une décision de réalisation.

### 6.5 Ordre de priorité métier

**Confirmé par le Product Owner le 2026-08-10.**

Cet ordre découle de la priorité des objectifs métier de la section 3.1. Sa confirmation vaut validation implicite de la priorisation de ces objectifs.

| Rang | Domaine d'exigences         | Exigences        | Objectifs servis          | Priorité des objectifs |
|------|-----------------------------|------------------|---------------------------|------------------------|
| 1    | Contribution et convergence | BR-004 à BR-007  | BO-01, BO-02, BO-03       | Critique               |
| 2    | Continuité de l'atelier     | BR-020, BR-021   | BO-07                     | Critique               |
| 3    | Conformité de la notation   | BR-008 à BR-010  | BO-01, BO-02, BO-03       | Critique               |
| 4    | Traçabilité de la parole    | BR-011 à BR-013  | BO-01, BO-04              | Haute                  |
| 5    | Conduite de l'atelier       | BR-001 à BR-003  | BO-01, BO-05              | Haute                  |
| 6    | Enrichissement assisté      | BR-014 à BR-016  | BO-01, BO-02, BO-04       | Haute                  |
| 7    | Mesures de découpage        | BR-017 à BR-019  | BO-01, BO-06              | Moyenne                |

Justification des rangs sensibles :

| Rang | Justification                                                                                                                        |
|------|---------------------------------------------------------------------------------------------------------------------------------------|
| 1    | Sans contribution collective, aucun autre domaine n'a d'objet. La connaissance du domaine étant fragmentée, la contribution du plus grand nombre est la condition du résultat |
| 2    | Protection du jalon programme. Coût très faible au regard de l'enjeu, et seule protection retenue après acceptation du risque de ressource unique |
| 5    | Rang minoré par l'existence du mode de conduite indépendant, qui couvre le même besoin sans développement                             |
| 7    | Seul domaine rattaché à un objectif de priorité moyenne, et seul dont l'usage intervient après l'atelier                              |

**Point de vigilance sur le rang 7.** Les mesures de découpage servent le rôle P4, présent pendant les deux jours d'atelier. Leur absence éventuelle ne compromet pas le jalon, mais prive deux participants de toute restitution. Ce risque est **accepté par le Product Owner le 2026-08-10** en confirmant l'ordre de priorité.

## 7. Exigences métier

### 7.1 Conventions

| Élément    | Convention                                                     |
|------------|-----------------------------------------------------------------|
| Identifiant| BR-nnn, stable et non réattribué                               |
| Priorité   | Indispensable, Souhaitable, Optionnelle                        |
| Traçabilité| Chaque exigence est reliée à au moins un objectif métier        |
| Formulation| Neutre vis-à-vis de toute solution technique                    |

### 7.2 Conduite de l'atelier

#### BR-001 Mettre à disposition un déroulé d'atelier structuré

| Attribut         | Valeur                                     |
|------------------|---------------------------------------------|
| Objectif lié     | BO-05, BO-01                               |
| Parties prenantes| P2, P1                                     |
| Priorité         | Indispensable                              |

Le déroulé indique en permanence l'étape en cours, le résultat attendu de cette étape et le temps restant.

Critères d'acceptation :

- [ ] L'étape en cours est visible par l'ensemble des participants
- [ ] Le résultat attendu de l'étape en cours est énoncé
- [ ] Le temps restant sur l'étape en cours est visible
- [ ] Un participant rejoignant la séance en cours accède immédiatement à ces informations

#### BR-002 Permettre le pilotage de la progression

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05               |
| Parties prenantes| P2                  |
| Priorité         | Indispensable       |

Le facilitateur contrôle l'avancement de l'atelier étape par étape.

Critères d'acceptation :

- [ ] Le facilitateur démarre, suspend et termine une étape
- [ ] Le facilitateur revient à une étape antérieure sans perte du contenu produit
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

### 7.3 Contribution et convergence

#### BR-004 Permettre la contribution simultanée de tous les participants

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-02, BO-01 |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Indispensable       |

L'ensemble des participants produit des éléments en même temps, sans prise de parole.

Critères d'acceptation :

- [ ] 23 participants contribuent simultanément sans perte d'élément
- [ ] Chaque participant qualifie l'élément qu'il produit selon la notation retenue
- [ ] Les éléments produits sont visibles de tous
- [ ] La contribution ne requiert aucune prise de parole

#### BR-005 Encadrer les phases de contribution dans le temps

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-05        |
| Parties prenantes| P2, P3              |
| Priorité         | Indispensable       |

Les phases de contribution ont une durée définie et visible.

Critères d'acceptation :

- [ ] Le facilitateur définit la durée d'une phase de contribution
- [ ] Le temps restant est visible par l'ensemble des participants
- [ ] La fin de la phase est signalée

#### BR-006 Permettre la convergence sans débat

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03, BO-01        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Souhaitable         |

Le groupe hiérarchise les éléments produits par un vote, sans discussion préalable.

Critères d'acceptation :

- [ ] Le facilitateur ouvre et clôture une session de vote sur un ensemble d'éléments
- [ ] Chaque participant exprime son vote sans connaître celui des autres avant la clôture
- [ ] Les éléments sont classables selon le résultat du vote
- [ ] Le résultat d'un vote clôturé reste consultable

#### BR-007 Attribuer et dénombrer les contributions

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-03        |
| Parties prenantes| P1, P2, Product Owner |
| Priorité         | Indispensable       |

Chaque élément produit est rattaché à son auteur, et le volume de contribution par personne est mesurable.

Critères d'acceptation :

- [ ] Chaque élément produit porte l'identité de son auteur
- [ ] Le nombre de contributions par participant est consultable
- [ ] La donnée permet de renseigner KPI-03 et KPI-04

### 7.4 Conformité de la notation

#### BR-008 Signaler les écarts à la notation au moment de la contribution

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-01        |
| Parties prenantes| P1, P2, P3          |
| Priorité         | Indispensable       |

Les écarts à la notation retenue sont signalés à l'auteur lorsqu'il produit un élément, sans intervention d'un tiers.

Critères d'acceptation :

- [ ] Un élément non conforme à la formulation attendue déclenche un signalement
- [ ] Un élément dont la nature paraît différente de celle déclarée déclenche une suggestion
- [ ] Le signalement est adressé au seul auteur de l'élément
- [ ] Aucune correction orale par un tiers n'est nécessaire

#### BR-009 Ne jamais empêcher une contribution

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-03               |
| Parties prenantes| P3                  |
| Priorité         | Indispensable       |

Un signalement de non conformité n'empêche jamais la création ni la conservation d'un élément.

Critères d'acceptation :

- [ ] Un élément signalé comme non conforme est créé et conservé
- [ ] L'auteur écarte le signalement sans justification
- [ ] L'élément conservé demeure exploitable dans la suite de l'atelier

#### BR-010 Rendre la notation de référence accessible en permanence

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-05, BO-03        |
| Parties prenantes| P2, P3              |
| Priorité         | Souhaitable         |

La notation retenue est consultable à tout moment par tout participant.

Critères d'acceptation :

- [ ] La notation est consultable sans quitter l'activité en cours
- [ ] Chaque élément de notation est accompagné d'un exemple du domaine concerné

### 7.5 Traçabilité de la parole métier

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

#### BR-012 Rattacher les éléments proposés à leur origine

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-04               |
| Parties prenantes| P1, P4              |
| Priorité         | Indispensable       |

Tout élément issu d'une proposition automatique est rattaché à l'extrait de conversation dont il provient.

Critères d'acceptation :

- [ ] Chaque élément proposé affiche l'extrait de conversation qui le fonde
- [ ] Le rattachement subsiste après adoption de l'élément par le groupe
- [ ] La donnée permet de renseigner KPI-06

#### BR-013 Restituer le modèle et la transcription

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-04, BO-01        |
| Parties prenantes| P1, P4, Product Owner |
| Priorité         | Indispensable       |

Le modèle produit et la transcription associée sont restitués dans un format lisible et archivable.

Critères d'acceptation :

- [ ] Le modèle est restituable dans un format lisible sans outil spécifique
- [ ] Chaque élément restitué porte sa nature, son auteur et son horodatage
- [ ] Les éléments issus d'une proposition automatique sont identifiés comme tels
- [ ] Le rattachement à l'extrait de conversation figure dans la restitution
- [ ] Deux restitutions successives d'un modèle inchangé sont identiques

### 7.6 Enrichissement assisté

#### BR-014 Soumettre au groupe des éléments issus de la conversation

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-02, BO-04, BO-01 |
| Parties prenantes| P1, P3              |
| Priorité         | Souhaitable         |

Des éléments déduits de la conversation sont soumis au groupe à partir de la transcription.

Critères d'acceptation :

- [ ] Les propositions sont établies à partir de la transcription de la séance
- [ ] Les propositions sont qualifiées selon la notation retenue
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

### 7.7 Mesures de découpage

#### BR-017 Permettre la délimitation d'une zone du modèle

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06               |
| Parties prenantes| P4, P1              |
| Priorité         | Souhaitable         |

Un architecte délimite une zone du modèle et la conserve.

Critères d'acceptation :

- [ ] Une zone du modèle est délimitée par un utilisateur
- [ ] Une zone délimitée est nommée
- [ ] Une zone délimitée est conservée et modifiable

#### BR-018 Fournir des mesures objectives sur une zone délimitée

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-06               |
| Parties prenantes| P4, P1              |
| Priorité         | Souhaitable         |

Des mesures vérifiables sont fournies sur toute zone délimitée, sans qu'aucun découpage ne soit proposé.

Critères d'acceptation :

- [ ] Le nombre de relations franchissant la limite de la zone est fourni
- [ ] Ces relations sont identifiables individuellement
- [ ] Le modèle est représentable selon les acteurs qui y interviennent
- [ ] Les éléments sans relation sont signalés
- [ ] Aucun découpage n'est proposé par le dispositif

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

### 7.8 Continuité de l'atelier

#### BR-020 Disposer d'un mode de conduite indépendant de l'outil

| Attribut         | Valeur              |
|------------------|----------------------|
| Objectif lié     | BO-07               |
| Parties prenantes| P2, Responsable de programme |
| Priorité         | Indispensable       |

L'atelier peut se tenir intégralement sans recours à l'outil.

Critères d'acceptation :

- [ ] Un déroulé d'atelier exploitable existe indépendamment de l'outil
- [ ] Un support de contribution partagé permet de tenir les deux jours
- [ ] Le facilitateur confirme pouvoir conduire l'atelier dans ce mode
- [ ] Le contenu produit avant une bascule éventuelle reste exploitable

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

| Objectif | Exigences rattachées                                                    | Indicateurs              |
|----------|--------------------------------------------------------------------------|--------------------------|
| BO-01    | BR-001, BR-004, BR-006, BR-008, BR-013, BR-014, BR-015, BR-016, BR-019   | KPI-01, KPI-02, KPI-09   |
| BO-02    | BR-004, BR-007, BR-008, BR-014                                           | KPI-03                   |
| BO-03    | BR-004, BR-005, BR-006, BR-007, BR-009, BR-010, BR-015                   | KPI-04                   |
| BO-04    | BR-011, BR-012, BR-013, BR-014, BR-016                                   | KPI-06                   |
| BO-05    | BR-001, BR-002, BR-003, BR-005, BR-010                                   | KPI-05                   |
| BO-06    | BR-017, BR-018, BR-019                                                   | KPI-08                   |
| BO-07    | BR-020, BR-021                                                           | KPI-07                   |

Chaque exigence est rattachée à au moins un objectif. Aucun objectif n'est dépourvu d'exigence.

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

| ID       | Information absente du cadrage source                                                    | Conséquence                                                    |
|----------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **MQ-01**| Caractérisation de 12 des 23 participants à l'atelier                                     | Aucune exigence ne couvre leurs besoins propres                 |
| ~~MQ-02~~| ~~Définition du processus principal du domaine~~                                          | **Clos le 2026-08-07** : aucun processus partagé n'existe, l'indicateur a été reformulé |
| **MQ-03**| Volumétrie attendue du modèle produit                                                     | Aucune exigence de tenue à la charge n'est formulable           |
| **MQ-04**| Durée de conservation des transcriptions                                                  | BR-011 est incomplète sur la dimension rétention                |
| **MQ-05**| Seuils d'alerte pour KPI-06, KPI-07 et KPI-08                                             | Trois indicateurs sur huit sont sans seuil de déclenchement     |
| **MQ-06**| Exigences d'accessibilité pour des participants non techniques                            | Aucune exigence correspondante                                  |
| **MQ-07**| Description quantifiée d'un atelier de référence                                          | Aucune référence de comparaison, KPI-02 reste absolu            |
| **MQ-08**| Modalités de restitution attendues par les architectes en séance de découpage             | BR-017 et BR-018 sont formulées sans besoin exprimé             |
| **MQ-09**| Traitement des divergences entre les récits d'acteurs différents                          | **Nouveau le 2026-08-07.** Dans un domaine fragmenté, deux acteurs décrivent la même étape différemment. Aucune exigence ne couvre la capture de ces divergences, alors qu'elles portent une part de la valeur de l'exercice |

### 9.3 Questions à traiter

| ID      | Question                                                                                              | Réponse du 2026-08-08                                                                 |
|---------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Q-01**| Une référence de comparaison sera-t-elle constituée avant l'atelier ?                                  | **Non.** Renoncement explicite à la démonstration du gain                              |
| **Q-02**| Les reformulations de KPI-01 et l'ajout de KPI-09 sont-elles validées ?                                | **Oui.** Les deux indicateurs sont actés                                               |
| **Q-03**| Quels sont les rôles et attentes des 12 participants non caractérisés ?                               | **Répondu.** Compléments d'information, questions, recueil d'information, alignement sur la vision produit. Rôle P5 créé |
| **Q-04**| Quelle durée de conservation s'applique aux transcriptions ?                                           | **Reportée après septembre**                                                           |
| **Q-05**| Quel est le devenir de l'outil après l'atelier ?                                                       | **Reportée après septembre**                                                           |
| **Q-06**| Les seuils d'alerte manquants doivent-ils être fixés avant l'atelier ?                                 | **Non.** KPI-06, KPI-07 et KPI-08 restent sans seuil                                   |
| **Q-07**| Comment les divergences entre récits d'acteurs sont-elles capturées ?                                  | **Traitées en séance par le facilitateur.** Aucune exigence complémentaire             |

Toutes les questions ouvertes sont traitées. Deux décisions sont reportées après l'atelier.

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
| Experts métier            | Prise en compte fidèle de leur parole, y compris de ses nuances                            |
| Architectes               | Décision de découpage appuyée sur des éléments vérifiables                                 |
| Organisation              | Conservation de la conversation métier et de son lien avec le modèle                       |

Aucun gain chiffré ne peut être établi en l'absence de référence de comparaison, voir MQ-07 et Q-01.

## 12. Suites

Chaque action est décrite par ce qu'il faut faire concrètement, ce qui atteste qu'elle est terminée, et l'effet de son absence.

**Mise à jour du 2026-08-08.** Cinq actions sont closes par les décisions du Product Owner. Trois actions restent à mener, dont deux avant l'engagement du développement.

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
| Charge            | Quatre échanges d'environ 30 minutes                                       |
| Livrable          | Un retour écrit par rôle                                                   |

Transmettre la section 7 à un représentant de chaque rôle et poser deux questions : les exigences couvrent-elles votre besoin, et qu'est-ce qui manque ?

| Rôle | Interlocuteur                     | Exigences à relire     |
|------|-----------------------------------|------------------------|
| P1   | Les deux porteurs de la méthode   | BR-004 à BR-016        |
| P2   | Le facilitateur                   | BR-001 à BR-003, BR-020 |
| P3   | Un ou deux experts métier         | BR-004 à BR-010        |
| P4   | Les deux architectes              | BR-017 à BR-019        |

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
| AC-03  | Décider du traitement des divergences entre acteurs  | PO, P1      | 30 min      | Avant le dev     | Close, traité par le facilitateur |
| AC-04  | Confirmer les objectifs et l'ordre de priorité        | PO          | 30 min      | Avant le dev     | Close le 2026-08-10             |
| AC-05  | Faire confirmer la couverture par les rôles          | PO          | 5 x 30 min  | Avant l'atelier  | **À mener**                     |
| AC-06  | Fixer la durée de conservation                       | Programme   | Une question| **Après l'atelier** | Reportée                      |
| AC-07  | Fixer les seuils d'alerte manquants                  | PO          | 15 min      | Avant l'atelier  | Close, pas de seuil retenu      |
| AC-08  | Décider d'une référence de comparaison               | PO          | Variable    | Avant l'atelier  | Close, renoncement acté         |
| AC-09  | Caractériser les participants non couverts           | PO          | 30 min      | Avant l'atelier  | Close, rôle P5 créé             |
| AC-10  | Statuer sur le devenir de l'outil                    | Programme   | Une décision| Après l'atelier  | Reportée                        |
| AC-11  | Compléter les informations résiduelles               | PO          | Variable    | Après l'atelier  | Ouverte, MQ-03, MQ-06, MQ-08    |
| AC-12  | Vérifier la couverture du besoin de questionnement   | PO, P1      | 15 min      | Avant le dev     | **Nouvelle, à mener**           |

### 12.5 Ce qui reste à faire

Deux actions. Aucune ne bloque l'engagement du développement.

| Action | Objet                                                        | Charge     | Pourquoi elle compte                                                                  |
|--------|--------------------------------------------------------------|------------|----------------------------------------------------------------------------------------|
| AC-12  | Vérifier la couverture du besoin de questionnement           | 15 min     | Le rôle P5, le plus nombreux, a une attente sans exigence de rattachement              |
| AC-05  | Faire confirmer la couverture par les cinq rôles             | 5 x 30 min | Seule action apportant une preuve extérieure aux convictions du Product Owner          |

Les quatre actions bloquantes identifiées le 2026-08-07 sont toutes closes. **Le document est en état de servir de référence métier pour l'engagement du développement.**

#### AC-12 Vérifier la couverture du besoin de questionnement

| Attribut          | Valeur                                                                     |
|-------------------|-----------------------------------------------------------------------------|
| Responsable       | Product Owner, avec les porteurs de la méthode                             |
| Charge            | Environ 15 minutes                                                         |
| Livrable          | Une confirmation, ou une exigence complémentaire                           |

Le rôle P5 a pour attente de poser des questions pendant l'atelier. La notation retenue n'étant pas décrite dans le cadrage source, il n'est pas établi que BR-004 couvre ce besoin.

Deux issues : la notation comporte déjà un moyen d'exprimer une question, et BR-004 suffit ; ou elle n'en comporte pas, et une exigence complémentaire est nécessaire.

Correspond à MQ-10.

