---
title: "Assistant Event Storming - Document d'exigences produit"
description: "Exigences produit de l'assistant d'atelier Event Storming : parcours, features, exigences fonctionnelles et non fonctionnelles, modèle de données, plan de livraison et traçabilité"
author: "Product Manager"
ms.date: 2026-09-21
ms.topic: reference
keywords:
  - event storming
  - exigences produit
  - prd
  - dommage aux biens
  - bounded context
  - agrégat
  - traçabilité
---

## Préambule

Ce document traduit en exigences produit le document d'exigences métier, l'intention UX et la maquette interactive de l'assistant Event Storming.

| Élément            | Valeur                                                                 |
|--------------------|------------------------------------------------------------------------|
| Référence produit  | Maquette interactive du 2026-08-15                                     |
| Statut             | Version 1, rédigée le 2026-09-21                                       |
| Périmètre          | Produit complet, du cadrage de l'atelier aux agrégats candidats        |
| Neutralité         | Levée. Le document décrit le produit, pas son architecture technique   |

### Sources et autorité

| Source                                                      | Date       | Rôle dans ce document                                                      |
|-------------------------------------------------------------|------------|-----------------------------------------------------------------------------|
| Maquette `Assistant-EventStorming.html`                     | 2026-08-15 | **Référence produit.** Fait autorité sur le parcours, les surfaces et les comportements |
| Document d'exigences métier v2, `docs/brds/`                | 2026-08-11 | Exigences opposables BR-001 à BR-036, objectifs BO-01 à BO-10, indicateurs KPI-01 à KPI-16 |
| Intention UX, `docs/ux/`                                    | 2026-08-11 | Personas P1 à P6, flux UF-01 à UF-20, vues V1 à V13, risques UX            |
| Déroulé d'atelier 2 jours                                   | 2026-08-06 | Contenu méthodologique du déroulé guidé et support du repli non logiciel   |
| Cadrage produit V0                                          | 2026-08-05 | Décisions produit initiales et exclusions de périmètre                      |
| Note de décision jalon septembre                            | 2026-08-06 | Repli non logiciel, décision go / no-go à J-5, risque de ressource unique   |

**Règle d'autorité, arrêtée le 2026-09-21.** La maquette est postérieure au document d'exigences métier et porte des décisions produit concrètes. Elle fait autorité. Chaque écart entre la maquette et une exigence métier ou une orientation UX est consigné en **annexe A**, avec une recommandation et la décision attendue du Product Owner. Aucun écart n'est résolu silencieusement.

**Conséquence sur le document d'exigences métier.** Sa règle de gestion du périmètre impose qu'une extension suppose son réexamen. Les capacités introduites par la maquette et non couvertes par une exigence métier sont listées en annexe A, famille E-09 : elles doivent y être reportées pour devenir opposables.

### Conventions

| Élément             | Convention                                                                          |
|---------------------|--------------------------------------------------------------------------------------|
| Exigence produit    | PR-nnn, stable et non réattribuée                                                    |
| Feature             | F-nn, regroupement d'exigences servant une même intention produit                    |
| Surface             | S-nn, écran ou panneau du produit                                                    |
| Exigence non fonctionnelle | NFR-nn                                                                        |
| Décision produit    | DP-nn, prise dans ce document, motivée, confirmable par le Product Owner             |
| Hypothèse produit   | HP-nn                                                                                 |
| Question ouverte    | QP-nn                                                                                 |
| Risque produit      | RP-nn                                                                                 |
| Écart               | E-nn, annexe A                                                                        |
| Priorité            | Indispensable, Souhaitable, Optionnelle, reprises du document d'exigences métier      |
| Jalon               | L1 atelier de domaine, L2 séance de conception, L3 reprise et industrialisation       |
| Statut maquette     | Démontré, Partiel, Absent                                                            |

Chaque exigence produit est rattachée à au moins une exigence métier, ou signalée comme création de ce document.

### Statut calendaire

Le document d'exigences métier situe l'atelier de cadrage aux 15 et 16 septembre 2026. Le présent document est rédigé le 2026-09-21, postérieurement à cette date.

**Décision du Product Owner du 2026-09-21.** Ce jalon n'est plus l'ancrage du produit : d'autres séquences et d'autres sessions suivront. Le produit n'est pas spécifié pour un atelier, il l'est pour une pratique répétée.

| Constat                                                                   | Traitement retenu                                                               |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| L'échéance du 15 et 16 septembre n'est plus un critère d'arbitrage         | Aucune exigence n'est omise ni priorisée au motif de cette date                  |
| Le plan de livraison n'est ancré sur aucune date                           | Les jalons L1, L2 et L3 sont définis par leur contenu, rattachés à la prochaine session ouverte |
| D'autres séquences et sessions sont prévues                                | Le produit est spécifié comme multi-sessions, ce que porte la feature F-01 et confirme la décision DP-08 |
| Les objectifs métier restent valides                                       | Ils portaient sur la découverte du domaine, et non sur la tenue d'une date       |

**Conséquence sur les indicateurs.** Les cibles des familles A et B étaient rattachées à l'atelier des 15 et 16 septembre et à ses vingt-trois participants. Elles restent formulables pour toute session, à condition de redéfinir leur population de référence à l'ouverture de chaque séance. Voir QP-01.

### Ce que ce document ne fait pas

| | |
|---|---|
| Il ne modifie aucune exigence métier | Les écarts sont consignés, la mise à jour du document d'exigences relève du Product Owner |
| Il ne décrit pas l'architecture technique | Aucun choix de pile, de persistance ni de protocole de synchronisation n'est arrêté |
| Il ne chiffre pas la charge                | Le chiffrage intervient après ce document, conformément à la règle de réalisation du document d'exigences métier |
| Il ne fixe pas le design visuel définitif  | La maquette porte une direction visuelle, le design system reste à instancier |
| Il ne tranche pas les questions ouvertes du document d'exigences | MQ-03, MQ-04, MQ-06, MQ-08 et MQ-10 restent ouvertes, reprises en QP |

## 1. Vision produit

### 1.1 Énoncé

> Un assistant d'atelier Event Storming qui prend en charge la mécanique — déroulé, notation, chronologie, mesures, restitution — pour qu'une connaissance de domaine détenue en parts par vingt-trois personnes devienne un modèle partagé dont chaque élément reste rattaché à la parole qui l'a produit.

Le produit n'anime pas, ne tranche pas et ne propose aucun découpage. Il rend possible, visible et traçable ce que le groupe produit.

### 1.2 Problèmes adressés

| # | Problème                                                                 | Personas   | Objectif métier | Features             |
|---|---------------------------------------------------------------------------|------------|-----------------|----------------------|
| 1 | La mécanique de l'atelier consomme la seule expertise méthode disponible  | P1         | BO-02           | F-02, F-04, F-05     |
| 2 | Contribuer suppose de prendre la parole, ce qui coûte cher en distanciel  | P3, P5     | BO-03           | F-04, F-08, F-09     |
| 3 | Le facilitateur ne sait ni ce qu'il doit obtenir, ni quand avancer        | P2         | BO-05           | F-02, F-03           |
| 4 | La correction de notation se fait à voix haute et inhibe                  | P3, P5     | BO-02, BO-03    | F-05                 |
| 5 | La conversation disparaît, le modèle perd son fondement                   | P1, P4     | BO-04           | F-15, F-16, F-17     |
| 6 | Le découpage repose sur l'intuition d'un architecte                       | P4         | BO-06           | F-13                 |
| 7 | Le jalon dépend entièrement de la disponibilité de l'outil                | P2         | BO-07           | F-18                 |
| 8 | La collecte se détourne vers les commandes et les solutions               | P1, P3     | BO-01           | F-05, F-19           |
| 9 | Le désaccord est lissé et produit un faux consensus                       | P1, P3     | BO-08           | F-07, F-12, F-16     |
| 10| Un même terme change de sens sans que personne ne le relève               | P1, P3, P4 | BO-06           | F-12                 |
| 11| Un agrégat est déduit d'un regroupement visuel plutôt que d'une règle     | P6, P4     | BO-01           | F-14                 |
| 12| La chaîne reliant la parole à l'agrégat se rompt entre deux séances       | P6, P1     | BO-09           | F-16, F-17           |

### 1.3 Proposition de valeur et différenciation

| Axe                                        | Ce que le produit apporte                                                                                     |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Un déroulé exécutable, pas un document      | Le déroulé de Brandolini instancié pour ce domaine devient l'interface : question posée, phrase à énoncer, pièges, durée, critère de sortie |
| Une grammaire vérifiée sans blocage         | L'écart de notation est signalé à son auteur seul, au moment où il ne coûte rien, et n'empêche jamais une contribution |
| Des mesures, jamais une proposition          | Liens traversants, événements orphelins, acteurs multi-frontières, cohésion : l'instrument est fourni, le jugement reste humain |
| Une chaîne de preuve continue                | De l'extrait de transcription horodaté jusqu'à l'agrégat candidat, dans les deux sens                          |
| Une restitution qui survit à l'outil         | Un fichier Markdown lisible sans outil, versionné, reproductible à l'identique                                 |

Le produit ne se compare pas à un tableau blanc collaboratif : il ne cherche pas la liberté de placement, il cherche la production d'un modèle méthodologiquement valide et traçable dans un temps contraint.

### 1.4 Principes produit

Ces principes contraignent toute conception ultérieure. Aucune exigence de ce document ne peut les contredire.

| ID        | Principe                                                                  | Origine                          |
|-----------|----------------------------------------------------------------------------|----------------------------------|
| **PP-01** | Le mur est le sujet, l'outil est le décor                                  | Principe UX 1                    |
| **PP-02** | Contribuer doit coûter moins que prendre la parole                          | Principe UX 2, BO-03             |
| **PP-03** | Une correction s'adresse à son auteur, jamais au groupe                     | BR-008, principe UX 3            |
| **PP-04** | Rien ne bloque une contribution                                             | BR-009, principe UX 7            |
| **PP-05** | L'inaction vaut refus, jamais accord                                        | BR-015, principe UX 4            |
| **PP-06** | Deux origines ne se confondent jamais, humaine et automatique               | BR-016, principe UX 5            |
| **PP-07** | L'humain garde le rythme, la parole et la décision                          | Cadrage V0, règle d'autorité du document d'exigences |
| **PP-08** | L'outil ne propose ni frontière, ni agrégat, ni découpage                   | Périmètre exclu, BR-018          |
| **PP-09** | Un désaccord se conserve, il ne se lisse pas                                | BR-027, principe UX 11           |
| **PP-10** | Rester en hypothèse est un résultat acceptable                              | BR-028, BR-035, principe UX 10   |
| **PP-11** | Une conclusion montre toujours ce sur quoi elle repose                      | BR-012, BR-029, principe UX 12   |
| **PP-12** | Le modèle doit pouvoir sortir de l'outil à tout instant                     | BR-013, BR-020                   |

## 2. Utilisateurs

### 2.1 Personas et promesse produit

| Persona | Qui                                  | Effectif | Ce que le produit lui promet                                                     | Features déterminantes |
|---------|--------------------------------------|----------|-----------------------------------------------------------------------------------|------------------------|
| **P1**  | Porteur de la méthode Event Storming | 2        | Ne plus écrire pour les autres, ni corriger en public, et contribuer au contenu   | F-02, F-04, F-05       |
| **P2**  | Facilitateur, coach agile            | 1        | Conduire deux jours d'atelier sans maîtriser la méthode, et savoir quand avancer  | F-02, F-03, F-20       |
| **P3**  | Expert métier dommage aux biens      | 6        | Poser ce qu'il sait sans s'imposer dans la conversation, et être corrigé en privé | F-04, F-05, F-07       |
| **P4**  | Architecte                           | 2        | Argumenter une frontière par des indices et des mesures, pas par son intuition    | F-13, F-17             |
| **P5**  | Participant contributeur secondaire  | 12       | Comprendre ce qui se construit et poser ses questions                              | F-04, F-08, F-19       |
| **P6**  | Équipe de développement produit      | 5 à 6    | Remonter de chaque règle jusqu'à la parole métier qui la fonde                     | F-14, F-16, F-17       |

Deux rôles de décision complètent la liste : le **Product Owner**, qui arbitre le périmètre et porte la validation métier des invariants, et le **responsable de programme**, qui rend la décision de bascule vers le mode indépendant et juge KPI-02.

### 2.2 Rôles applicatifs

Le persona décrit une population, le rôle applicatif décrit un droit d'usage. La maquette en expose trois ; le quatrième est requis par la séance de conception.

| Rôle                 | Personas rattachés | Accès                                    | Ce qu'il peut faire de plus                                                   |
|----------------------|--------------------|------------------------------------------|---------------------------------------------------------------------------------|
| **Facilitateur**     | P2                 | Connexion GitHub ou OIDC                 | Démarrer, suspendre, prolonger, valider une étape, ouvrir un vote, imposer un focus, déclencher l'import de transcription |
| **Participant**      | P1, P3, P5         | Code de session et prénom                | Contribuer, reformuler, ordonner, voter, questionner, exporter                 |
| **Architecte**       | P4                 | Connexion GitHub ou OIDC                 | Créer une hypothèse de découpage, délimiter, déclarer un indice, lire les mesures |
| **Équipe de conception** | P6, Product Owner | Connexion GitHub ou OIDC             | Ouvrir la séance de conception, formuler un invariant, proposer un agrégat, extraire la liste à valider |

**DP-01.** Le facilitateur ne contribue pas au contenu. Son rôle ne donne accès à aucune saisie d'élément du modèle, ce qui rend le dénominateur des indicateurs de participation égal à 22. Source : décision du 2026-08-12 reprise en QU-05.

**DP-02.** Aucun rôle n'emporte de droit de décision sur le modèle. La validation d'une frontière, d'une règle, d'un invariant ou d'un agrégat appartient au groupe réuni en séance. Le produit matérialise cette règle par un statut, jamais par une permission.

### 2.3 Les trois usages

| Usage                              | Quand                                   | Qui                          | Étapes couvertes            |
|------------------------------------|-----------------------------------------|------------------------------|-----------------------------|
| **Atelier de domaine**             | Deux jours, distanciel, 23 participants | P1 à P5                      | Phases 1 à 8                |
| **Séance de conception**           | Dans les deux semaines suivant l'atelier | P6, P4, Product Owner        | Phase 9, puis invariants et agrégats |
| **Restitution et traçabilité**     | Permanente, pendant et après            | Tous                         | Transverse                  |

## 3. Périmètre

### 3.1 Dans le périmètre

| Feature | Intitulé                                                | Domaine métier | Jalon |
|---------|---------------------------------------------------------|----------------|-------|
| F-01    | Accès, sessions et rôles                                | Création       | L1    |
| F-02    | Conduite guidée de la séance                            | D1             | L1    |
| F-03    | Critères de sortie observables                          | D1             | L1    |
| F-04    | Contribution simultanée et paternité                    | D2             | L1    |
| F-05    | Grammaire Event Storming et signalement de notation     | D5             | L1    |
| F-06    | Chronologie, moments et zone d'attente                  | D3             | L1    |
| F-07    | Récit et écarts entre récits                            | D5             | L1    |
| F-08    | Enrichissement : acteurs, systèmes, points chauds       | D4             | L1    |
| F-09    | Vote silencieux de priorisation                         | D5             | L1    |
| F-10    | Processus, commandes, politiques et informations        | D4, D7         | L1    |
| F-11    | Chemins alternatifs et clôture                          | D7             | L1    |
| F-12    | Langage pivot et tensions                               | D5             | L1    |
| F-13    | Découpage : frontières, indices et mesures              | D6             | L2    |
| F-14    | Invariants et agrégats candidats                        | D8             | L2    |
| F-15    | Couche fantôme, propositions issues de la conversation  | DT             | L1    |
| F-16    | Statuts de preuve, décisions et traçabilité             | D9             | L2    |
| F-17    | Restitution, export Markdown et versionnement           | D9             | L1    |
| F-18    | Continuité et repli non logiciel                        | D10            | L1    |
| F-19    | Lisibilité du mur : modes, filtres, vues et focus       | Transverse     | L1    |
| F-20    | Instrumentation des indicateurs                         | Transverse     | L1    |

### 3.2 Hors périmètre

| Élément exclu                                              | Motif                                                                      |
|-------------------------------------------------------------|-----------------------------------------------------------------------------|
| Production automatique d'un découpage du domaine            | Périmètre exclu du document d'exigences métier, principe PP-08              |
| Proposition automatique d'une frontière ou d'un agrégat     | La décision appartient au groupe, règle d'autorité                          |
| Reformulation automatique d'un élément à la contribution    | Reportée, le contrôle par règles déterministes est retenu                   |
| Conduite de l'animation par un dispositif automatisé        | La distribution de la parole et la gestion du temps restent humaines        |
| Captation autonome de la parole                             | La transcription est produite par l'outil de visioconférence en place       |
| Production de documents d'exigences ou d'architecture        | Suppose un modèle complet et validé, non attendu à l'issue de l'atelier     |
| Usage par plusieurs organisations                           | Hypothèse de généralisation sans preuve                                     |
| Contribution au mur hors d'une phase ouverte                  | **Décision du 2026-09-21.** La consultation du modèle et l'amorçage du glossaire restent possibles hors séance ; aucune contribution au mur ne l'est. Un élément produit hors phase n'aurait ni étape de rattachement ni critère de sortie stable |
| Restitution de l'historique des opérations                   | Décision du 2026-08-10, l'historique ne figure pas dans la restitution, voir RP-09 |

### 3.3 Position sur le code existant

**DP-03, décision du Product Owner du 2026-09-21.** Le code présent dans `src/` n'est pas retenu comme socle de réalisation. La maquette est la cible.

| Constat sur l'existant                                                              | Conséquence                                                        |
|---------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| L'application actuelle est une grille Event Modeling : lignes de contextes bornés, colonnes, tranches verticales | La cible est un mur Event Storming conduit par étapes, dont la structure et les affordances changent à chaque phase |
| Elle est mono-utilisateur, sans session, sans rôle, sans minuteur                    | La collaboration simultanée à 23, la conduite et les rôles ne s'y greffent pas |
| Elle n'a ni transcription, ni statut de preuve, ni traçabilité vers la parole         | La chaîne de preuve, qui porte BO-04 et BO-09, y est absente de bout en bout |
| Elle expose une grammaire de liens Event Modeling, différente de la grammaire d'atelier | Les deux grammaires coexistent mal dans un même modèle, voir section 7.2 |

**Ce qui en est néanmoins repris comme acquis de conception**, sans reprise de code : le vocabulaire de modélisation (contexte borné, tranche verticale, politique, modèle de lecture), la séparation entre le modèle et ses représentations, et la validation du modèle comme requête et non comme effet de bord.

**Ce que ce choix coûte.** Le produit repart d'une base vide. Le chiffrage doit l'intégrer, et le risque de ressource unique, déjà accepté au niveau programme, s'en trouve aggravé. Voir RP-01.

### 3.4 Règle d'extension du périmètre

Toute capacité ajoutée à ce document et non couverte par une exigence métier est signalée comme création, listée en annexe A famille E-09, et reportée au document d'exigences métier pour devenir opposable. Aucune extension n'est introduite silencieusement.

## 4. Parcours produit

### 4.1 Les neuf phases

Le parcours du produit est le déroulé d'atelier de Brandolini instancié pour le domaine dommage aux biens. Il compte neuf phases, dont huit se tiennent pendant les deux jours d'atelier et une en séance de conception.

| Phase | Journée | Intitulé | Durée | Question posée au groupe | Résultat attendu |
|-------|---------|----------|-------|---------------------------|------------------|
| **1** | J1 | Lancement et échauffement | 45 min | Qu'est-ce qu'un événement, et qui est dans la salle ? | Tout le monde a écrit un événement sur un sujet sans enjeu |
| **2** | J1 | Exploration chaotique | 60 min | Que s'est-il passé dans le métier ? | 80 à 200 événements en vrac, doublons évidents regroupés |
| **3** | J1 | Mise en chronologie | 90 min | Dans quel ordre cela se produit-il ? | Une chronologie lisible de bout en bout, avec ses trous et ses points chauds |
| **4** | J1 | Le récit | 60 min | Est-ce que le groupe reconnaît cette histoire ? | Une chronologie parcourue par deux narrateurs, et les écarts entre leurs récits |
| **5** | J1 | Acteurs, systèmes et points chauds | 75 min | Qui agit, avec quels outils, et où ça coince ? | Chaque moment porte ses acteurs, ses systèmes et ses points chauds |
| **6** | J2 | Processus et commandes | 90 min | Qu'est-ce qui déclenche chaque événement ? | Deux ou trois processus retenus, chaque événement rattaché porte sa commande |
| **7** | J2 | Règles, informations et systèmes | 120 min | Quelle règle décide, et avec quelle information ? | Les processus retenus déroulés, politiques explicites. Livrable principal des deux jours |
| **8** | J2 | Chemins alternatifs et clôture | 90 min | Que se passe-t-il quand ça ne se passe pas comme prévu ? | Les variantes qui comptent, et la liste des points chauds restants |
| **9** | Séance de conception | Découpage : agrégats et contextes bornés | 120 min | Où poser les frontières, et ce qu'elles coûtent | Des frontières justifiées par des mesures, des agrégats nommés, un modèle exporté |

Total : 5 h 30 le premier jour, 5 h 00 le second, 2 h 00 en séance de conception.

**Chaque phase porte quatre contenus** que le produit affiche : la phrase de lancement à énoncer par le facilitateur, la consigne visible des participants, les pièges de la phase avec leur parade, et le critère de sortie. Ces contenus proviennent du déroulé d'atelier et ne sont pas une conception de ce document.

### 4.2 Correspondance avec le parcours du document d'exigences métier

Le document d'exigences métier décrit un parcours en dix étapes. La correspondance est établie ci-dessous. Les écarts sont traités en annexe A.

| Étape du document d'exigences | Phase produit           | Observation                                                                 |
|-------------------------------|--------------------------|------------------------------------------------------------------------------|
| Cadrage                       | Phase 1                  | L'échauffement sur un domaine trivial est un ajout de la maquette, E-09      |
| Collecte                      | Phase 2                  | Conforme                                                                     |
| Chronologie                   | Phase 3                  | Branches, répétitions et événements pivots non couverts, E-10                |
| Enrichissement                | Phases 5, 6 et 7         | L'enrichissement est scindé : acteurs et systèmes en phase 5, commandes, politiques et informations en phases 6 et 7 |
| Clarification                 | Phases 4 et 7, panneau langage pivot | La clarification n'est pas une phase : elle est portée par le récit, par les points chauds et par le glossaire |
| Frontières                    | Phase 9                  | Hypothèses concurrentes et indices déclarés non couverts par la maquette, E-05 |
| Collaboration                 | Phase 9                  | Les dépendances sont mesurées, pas nommées, E-11                             |
| Process Modelling             | Phases 6, 7 et 8         | Anticipé dans l'atelier, contrairement au document d'exigences qui le place après |
| Design Level                  | Postérieur à la phase 9  | Les invariants sont absents de la maquette, E-04                             |
| Restitution                   | Transverse               | Conforme, et disponible à tout instant                                       |

### 4.3 Mécanique des critères de sortie

Chaque phase porte un critère de sortie calculé en continu à partir du contenu produit. Le critère est énoncé en termes observables, jamais en durée ni en volume seul.

| Phase | Critère de sortie évalué par le produit                                                                    |
|-------|--------------------------------------------------------------------------------------------------------------|
| 1     | Au moins huit événements d'échauffement posés                                                                |
| 2     | Au moins vingt événements posés, et doublons évidents regroupés                                              |
| 3     | Plus aucun événement hors de la chronologie, et au moins deux moments nommés par le groupe                    |
| 4     | Le récit parcouru de bout en bout, et chaque écart traité : reformulé, tranché ou posé en point chaud         |
| 5     | Chaque moment passé en revue : acteurs et systèmes découverts, ou déclarés absents                            |
| 6     | Deux ou trois processus retenus, et chaque événement rattaché porte sa commande                               |
| 7     | Au moins trois politiques explicites, et chaque commande a un déclencheur, politique ou acteur informé        |
| 8     | Au moins deux chemins alternatifs déroulés                                                                    |
| 9     | Tous les événements dans une frontière, au moins deux frontières, un agrégat par frontière, modèle exporté    |

**DP-04.** Le critère est toujours accompagné de son état chiffré, par exemple « 17 événements · doublons non traités ». Un critère qui dit seulement oui ou non ne dit pas ce qu'il reste à faire.

**DP-05, blocage du passage d'étape. Décision du Product Owner du 2026-09-21.** Le passage est **bloqué tant que le critère n'est pas atteint**, jusqu'à ce que quelqu'un décide d'aller plus loin. Le comportement de la maquette est retenu, complété d'un dépassement explicite.

| Décision retenue                                                                                   | Motif                                                                        |
|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Le calcul du critère et son affichage sont conservés tels que la maquette les démontre               | Ils couvrent BR-036, qui fonde la conduite par un facilitateur non initié     |
| Une phase ne s'ouvre que lorsque la précédente est validée, et la validation est refusée tant que le critère n'est pas atteint | Un facilitateur qui ne maîtrise pas la méthode ne doit pas pouvoir sauter une étape par inadvertance |
| Le blocage se dépasse par une **action explicite** du facilitateur, distincte de la validation ordinaire | PP-07, l'humain garde la décision. Le blocage impose de la prendre, il ne la remplace pas |
| Le dépassement est tracé : critère non atteint, auteur, horodatage, et figure dans la restitution     | Une étape passée sans son critère est une information dont la séance de conception a besoin |
| La fin du temps imparti ne déclenche jamais un passage d'étape                                       | BR-036, en toute circonstance                                                |

Le blocage n'est pas un réglage : il s'applique à toute séance. Ce qui est réglable, c'est la décision humaine de passer outre. Écart E-02 de l'annexe A, clos.

### 4.4 Modes du mur

Le mur est une surface unique dont les règles et les affordances changent selon la phase. Un mode ne met en avant que les types d'éléments de son étape et des étapes antérieures.

| Mode              | Phases | Types mis en avant                                   | Ce que le mode interdit ou range                                  |
|-------------------|--------|-------------------------------------------------------|---------------------------------------------------------------------|
| Échauffement      | 1      | Événement, sur un domaine trivial séparé              | Le domaine réel n'est pas encore ouvert                            |
| Collecte          | 2      | Événement                                             | Aucun ordre, aucun lien, aucun signalement spontané. Le mur des autres est masqué jusqu'à révélation individuelle |
| Chronologie       | 3      | Événement, moment, zone d'attente                      | Aucune saisie de commande ni de règle mise en avant                |
| Récit             | 4      | Événement en focus, écart de récit                     | Le mur ne se réordonne pas pendant le récit                        |
| Enrichissement    | 5      | Acteur, système, point chaud, opportunité              | Les commandes ne sont pas encore attendues                         |
| Processus         | 6, 7, 8| Commande, règle, information, système, variante        | La chronologie n'est plus modifiable sans retour explicite en phase 3 |
| Découpage         | 9      | Frontière, agrégat, mesures                            | Le mur est figé, aucune saisie d'événement                         |
| Propositions      | Transverse | Couche fantôme distincte                           | Aucune adoption implicite                                          |

**PP-01 appliqué** : le mur n'affiche jamais tous les niveaux simultanément. La stratégie de densité est portée par la feature F-19.

### 4.5 Surfaces produit

| ID       | Surface                                        | Nature  | Vue UX  | Phases      | Features           |
|----------|------------------------------------------------|---------|---------|-------------|--------------------|
| **S-01** | Connexion                                      | Écran   | V1      | Avant       | F-01               |
| **S-02** | Choix et création de session                   | Écran   | —       | Avant       | F-01               |
| **S-03** | Le mur                                         | Écran   | V2      | 1 à 9       | F-04, F-06, F-19   |
| **S-04** | Bandeau de conduite public                     | Bandeau | V3      | 1 à 9       | F-02, F-03         |
| **S-05** | Panneau de conduite du facilitateur            | Panneau | V3, W2  | 1 à 9       | F-02, F-03, F-20   |
| **S-06** | Panneau de contribution                        | Panneau | V4, W1  | 1, 2, 5     | F-04, F-05         |
| **S-07** | Panneau d'échauffement                         | Panneau | —       | 1           | F-02, F-05         |
| **S-08** | Mode chronologie et zone d'attente             | Mode    | V8, W5  | 3           | F-06               |
| **S-09** | Panneau du récit                               | Panneau | —       | 4           | F-07               |
| **S-10** | Revue par moment                               | Panneau | V2      | 5           | F-08               |
| **S-11** | Panneau des processus et des chaînes           | Panneau | V11     | 6, 7        | F-10               |
| **S-12** | Panneau des chemins alternatifs                | Panneau | V11     | 8           | F-11               |
| **S-13** | Langage pivot et tensions                      | Panneau | V9      | 2 à 9       | F-12               |
| **S-14** | Vue de découpage, frontières et mesures        | Écran   | V7, V10, W3 | 9       | F-13               |
| **S-15** | Invariants et agrégats                         | Panneau | V12, W6 | Après 9     | F-14               |
| **S-16** | Traçabilité                                    | Panneau | V13, W7 | Transverse  | F-16               |
| **S-17** | Couche fantôme et import de transcription      | Couche  | V6, W4  | Transverse  | F-15               |
| **S-18** | Restitution et export                          | Action  | —       | Transverse  | F-17, F-18         |
| **S-19** | Vote silencieux                                | Panneau | V5      | 2 à 8       | F-09               |
| **S-20** | Participants et relance                        | Panneau | W2      | 1 à 8       | F-20               |

Les surfaces S-02, S-07, S-09, S-12 et S-20 n'ont pas d'équivalent dans le catalogue de vues UX : elles proviennent de la maquette et sont signalées à ce titre en annexe A.

## 5. Exigences produit

### 5.1 Lecture de cette section

Chaque feature ouvre par sa fiche, puis énumère ses exigences produit. Chaque exigence porte sa priorité, l'exigence métier qu'elle sert, le flux UX correspondant, la surface concernée et son statut dans la maquette.

Une exigence marquée **Création** n'est couverte par aucune exigence métier : elle provient de la maquette et figure en annexe A, famille E-09.

### F-01 Accès, sessions et rôles

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Permettre à chacun d'entrer dans la bonne séance, avec le bon rôle, en moins d'une minute |
| Personas      | Tous                                                                             |
| Jalon         | L1                                                                               |
| Exigences métier | BR-004 pour l'attribution, reste en création                                  |
| Statut maquette | Démontré                                                                       |

#### PR-001 Authentifier les rôles qui conduisent la séance

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création | — | S-01 | Démontré |

Le facilitateur, l'architecte et l'équipe de conception se connectent par GitHub ou par le fournisseur d'identité de l'entreprise.

- [ ] Deux fournisseurs sont proposés, GitHub et OIDC
- [ ] Le fournisseur recommandé est configurable par séance
- [ ] L'identité obtenue porte le nom affiché et sert d'auteur des contributions
- [ ] Un échec d'authentification n'empêche pas de rejoindre par code, voir PR-002

#### PR-002 Rejoindre une séance par code

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création | UF-11 | S-01 | Démontré |

Un participant rejoint avec le code diffusé en séance et son prénom, sans compte.

- [ ] Le code est saisi sans distinction de casse
- [ ] Un code inconnu produit un message explicite, sans blocage de la saisie
- [ ] Le prénom saisi devient l'identité d'auteur du participant
- [ ] Le participant accède immédiatement à l'étape en cours et à sa consigne

#### PR-003 Lister les séances accessibles

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création | — | S-02 | Démontré |

L'utilisateur connecté voit les séances où il a un rôle, avec leur état.

- [ ] Chaque séance porte son domaine, ses dates, son effectif, son code et le rôle de l'utilisateur
- [ ] L'état distingue programmée, en cours, suspendue et terminée
- [ ] L'état en cours indique la journée et l'étape courante
- [ ] Une séance terminée reste consultable en lecture

#### PR-004 Créer une séance depuis un modèle de déroulé

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-001 | UF-11 | S-02 | Démontré |

Une séance se crée en nommant le domaine exploré, ses dates et le modèle de déroulé appliqué.

- [ ] Le modèle « Big Picture 2 jours, Brandolini » est disponible
- [ ] Le modèle instancie les neuf phases, leurs durées et leurs contenus
- [ ] Un code de séance est produit à la création
- [ ] L'intention et le périmètre du domaine sont saisis à la création et restent affichés
- [ ] Le nombre de contributeurs possibles est saisi à la création, et sert de dénominateur aux indicateurs de participation

#### PR-005 Attribuer un rôle applicatif

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création | — | S-02 | Partiel |

Chaque personne présente porte un rôle qui détermine ses capacités, sans lui donner d'autorité sur le contenu.

- [ ] Les quatre rôles de la section 2.2 sont attribuables
- [ ] Le facilitateur d'une séance est unique
- [ ] Un rôle est modifiable en cours de séance par le facilitateur
- [ ] Le changement de rôle ne modifie ni les contributions ni leur paternité

### F-02 Conduite guidée de la séance

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Rendre un facilitateur non initié capable de conduire deux jours d'Event Storming |
| Personas      | P2, en lecture pour les autres                                                   |
| Jalon         | L1                                                                               |
| Exigences métier | BR-001, BR-002, BR-003, BR-005                                                |
| Statut maquette | Démontré                                                                       |

#### PR-006 Afficher en permanence l'étape en cours et ce qu'elle attend

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-001 | UF-06 | S-04 | Démontré |

Le bandeau public porte la question posée au groupe, le résultat attendu, la consigne et le temps restant.

- [ ] L'information est visible de tous les rôles
- [ ] Un participant rejoignant en cours de séance y accède immédiatement
- [ ] La question posée reste affichée pendant toute l'étape, ce n'est pas une phrase d'introduction
- [ ] Les types d'éléments attendus à l'étape sont indiqués

#### PR-007 Fournir au facilitateur la phrase de lancement

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-001 | UF-06 | S-05 | Démontré |

Le panneau privé du facilitateur porte la phrase prête à énoncer, en toutes lettres.

- [ ] La phrase est rédigée, pas résumée en titre
- [ ] Elle est visible du seul facilitateur
- [ ] Elle est disponible avant le démarrage du minuteur
- [ ] Une phrase de reprise après pause est fournie pour les étapes qui en comportent une

#### PR-008 Exposer les pièges de l'étape et leur parade

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-001 | UF-06 | S-05 | Démontré |

Chaque phase liste ses pièges connus et la réponse à apporter.

- [ ] Chaque piège porte une parade formulée comme une phrase à dire
- [ ] Les pièges sont visibles du seul facilitateur
- [ ] Ils restent consultables pendant toute la durée de l'étape

#### PR-009 Piloter le minuteur de l'étape

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-002, BR-005 | UF-06 | S-04, S-05 | Démontré |

Le facilitateur démarre, suspend et prolonge la phase en cours.

- [ ] Le temps restant est visible de tous
- [ ] La suspension n'entraîne aucune perte de contenu
- [ ] La prolongation est possible sans repasser par la configuration de la séance
- [ ] La fin du temps est signalée sans interrompre une saisie en cours
- [ ] Un signalement intervient avant la fin du temps imparti

#### PR-010 Valider une étape et ouvrir la suivante

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-002, BR-036 | UF-06 | S-05 | Démontré |

Le passage d'étape résulte d'une action explicite du facilitateur.

- [ ] L'étape validée est marquée comme telle et reste consultable
- [ ] L'étape suivante devient courante et le mur change de mode
- [ ] Aucune validation automatique n'existe, ni par le temps, ni par l'atteinte du critère

#### PR-011 Revenir à une étape antérieure sans perte

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-002 | UF-06 | S-05 | Partiel |

Le parcours n'est pas un tunnel.

- [ ] Le retour conserve l'intégralité du contenu produit
- [ ] Le retour conserve les décisions, les statuts et les liens établis
- [ ] Le mur reprend le mode de l'étape rejointe
- [ ] Le retour est tracé dans le journal de séance

#### PR-012 Rendre le déroulé modifiable par le métier

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-003 | — | S-02 | Absent |

Le contenu du déroulé se modifie sans intervention technique.

- [ ] Le libellé, la question, le résultat attendu, la consigne et la durée de chaque phase sont modifiables
- [ ] La phrase de lancement et les pièges sont modifiables
- [ ] La modification est effectuée par une personne du métier, sans édition de fichier
- [ ] Une modification apportée en cours de séance ne perturbe pas l'étape courante

### F-03 Critères de sortie observables

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Donner au facilitateur le seul élément qui lui manque : savoir si l'étape a produit assez |
| Personas      | P2, P1                                                                           |
| Jalon         | L1                                                                               |
| Exigences métier | BR-036                                                                        |
| Statut maquette | Démontré                                                                       |

#### PR-013 Calculer et afficher le critère de sortie

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-036 | UF-06 | S-04, S-05 | Démontré |

Le critère de la phase en cours est évalué en continu sur le contenu produit, selon le tableau de la section 4.3.

- [ ] Le critère est énoncé en termes observables, jamais en durée
- [ ] Son état est actualisé à chaque contribution
- [ ] Le critère est consultable par tous les rôles
- [ ] Aucun critère ne repose sur un décompte par participant

#### PR-014 Énumérer ce qui reste à traiter

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-036 | UF-06 | S-05 | Démontré |

Le produit dénombre et permet de consulter les éléments qui empêchent le critère d'être atteint.

- [ ] Les éléments manquants sont dénombrés
- [ ] Ils sont consultables en un geste depuis le panneau de conduite
- [ ] La sélection d'un élément manquant le localise sur le mur

#### PR-015 Bloquer le passage d'étape, et permettre de passer outre explicitement

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création, voir DP-05 | UF-06 | S-05 | Démontré, sans le dépassement |

La validation d'une phase est refusée tant que son critère n'est pas atteint. Le facilitateur passe outre par une action explicite, distincte de la validation ordinaire.

- [ ] La validation est refusée tant que le critère n'est pas atteint, et le motif du refus est affiché au facilitateur
- [ ] Une phase ne s'ouvre que lorsque la précédente est validée ou explicitement dépassée
- [ ] L'action de passer outre est distincte de la validation, et n'est jamais le geste par défaut
- [ ] Le dépassement enregistre le critère non atteint, son état chiffré, son auteur et son horodatage
- [ ] Les étapes passées sans leur critère figurent dans la restitution
- [ ] Le blocage n'affecte jamais la saisie des participants ni le retour à une étape antérieure

#### PR-016 Ne jamais faire passer une étape sur la fin du temps

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-036, BR-005 | UF-06 | S-04 | Démontré |

- [ ] L'échéance du minuteur produit un signal, jamais un changement d'étape
- [ ] La saisie reste ouverte après l'échéance
- [ ] La fin du temps et le critère de sortie sont présentés comme deux notions distinctes

### F-04 Contribution simultanée et paternité

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Permettre à vingt-deux personnes de poser ce qu'elles savent sans prendre la parole |
| Personas      | P1, P3, P5                                                                       |
| Jalon         | L1                                                                               |
| Exigences métier | BR-004, BR-007, BR-009, BR-022, BR-023                                        |
| Statut maquette | Démontré                                                                       |

#### PR-017 Contribuer simultanément sans perte

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-004 | UF-01 | S-03, S-06 | Démontré |

- [ ] Vingt-trois personnes contribuent en même temps sans perte d'élément
- [ ] Le champ de saisie reste disponible en continu, en colonne fixe et jamais en fenêtre modale
- [ ] Le champ se vide et conserve le focus après validation
- [ ] Une saisie en cours est préservée localement en cas de perte de connexion
- [ ] Deux participants saisissant le même élément produisent deux éléments, rapprochés plus tard

#### PR-018 Qualifier un élément par son type

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-004, BR-022 | UF-01 | S-06 | Démontré |

- [ ] Le type attendu à l'étape est proposé par défaut
- [ ] Aucun type n'est rendu inaccessible
- [ ] Un élément d'un autre type est conservé et traité à l'étape appropriée
- [ ] Chaque type porte un libellé textuel, et pas seulement une couleur
- [ ] Chaque type porte son indice de formulation, par exemple « au passé » pour l'événement

#### PR-019 Attribuer chaque élément à son auteur

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-007 | UF-09 | S-03 | Démontré |

La double paternité est la règle : l'auteur d'origine est conservé, le dernier modificateur est tracé.

- [ ] Chaque élément porte l'identité de son auteur d'origine
- [ ] Le dernier modificateur est enregistré sans remplacer l'auteur d'origine
- [ ] Aucun classement ni décompte par participant n'est visible pendant la séance
- [ ] Le décompte par participant est consultable après la séance

#### PR-020 Modifier un élément produit par un autre

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-007 | UF-09 | S-03 | Démontré |

- [ ] La modification de la formulation et du type est ouverte à tous les participants
- [ ] L'élément est mis à jour pour tous
- [ ] Deux modifications simultanées conservent le dernier état, la précédente restant à l'historique
- [ ] Aucune notification publique n'est produite par une modification

#### PR-021 Supprimer de façon réversible et tracée

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-007, BR-009 | UF-09 | S-03 | Partiel |

- [ ] La suppression demande une confirmation
- [ ] L'élément supprimé reste visible en état barré, doublé d'une mention textuelle explicite
- [ ] Un filtre individuel masque les éléments supprimés, sans effet sur les autres vues
- [ ] N'importe quel participant restaure un élément supprimé
- [ ] La restauration rétablit la position et les liens de l'élément

#### PR-022 Reformuler sans perdre la formulation d'origine

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-023 | UF-12 | S-03, S-09 | Partiel |

- [ ] La formulation d'origine reste consultable après reformulation
- [ ] L'auteur de la reformulation est identifié
- [ ] L'auteur d'origine est informé en privé et peut confirmer, amender ou refuser
- [ ] Sans réponse de l'auteur d'origine, l'élément conserve le statut à vérifier
- [ ] Une reformulation est réversible

#### PR-023 Consulter l'historique d'un élément

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-007 | UF-09 | S-03 | Absent |

- [ ] L'ensemble des opérations sur un élément est consultable à la demande
- [ ] L'historique n'est jamais affiché en permanence sur le mur
- [ ] Chaque opération porte son auteur et son horodatage

#### PR-024 Masquer les contributions des autres pendant l'exploration chaotique

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création, voir E-03 | UF-01 | S-03 | Démontré |

**Décision du Product Owner du 2026-09-21 : le comportement de la maquette est retenu.** Pendant l'écriture silencieuse, un participant ne voit que ses propres éléments, jusqu'à ce qu'il révèle le mur.

- [ ] Le masquage s'applique par défaut, à la phase 2 et au rôle Participant
- [ ] Le nombre d'éléments produits par les autres reste visible, sans leur contenu
- [ ] Le participant révèle le mur de sa propre initiative, à tout moment
- [ ] La révélation est individuelle et n'affecte aucune autre vue
- [ ] Le masquage cesse à la fermeture de la phase 2

### F-05 Grammaire Event Storming et signalement de notation

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Corriger la notation sans que personne ne corrige personne                       |
| Personas      | P3, P5, P1                                                                       |
| Jalon         | L1                                                                               |
| Exigences métier | BR-008, BR-009, BR-010                                                        |
| Statut maquette | Démontré                                                                       |

#### PR-025 Vérifier la formulation par des règles déterministes

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-008 | UF-02 | S-06 | Démontré |

Les règles de la section 7.2 s'appliquent à la saisie. Elles sont déterministes et ne font appel à aucun traitement automatisé du contenu.

- [ ] Un événement sans forme passée est signalé
- [ ] Un événement formulé à l'infinitif est signalé comme probable commande
- [ ] Un événement de trois mots ou moins est signalé comme trop général
- [ ] Une commande qui n'est pas à l'infinitif est signalée
- [ ] Une règle qui ne suit pas le motif « dès que … alors … » est signalée
- [ ] Un acteur formulé en phrase est signalé

#### PR-026 Adresser le signalement au seul auteur

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-008 | UF-02 | S-06 | Démontré |

- [ ] Aucun autre participant ne peut constater qu'un signalement a eu lieu
- [ ] Le signalement est formulé en question, jamais en correction
- [ ] L'auteur écarte le signalement sans justification
- [ ] L'élément signalé est créé et conservé, quoi qu'il advienne du signalement

#### PR-027 Rendre le signalement muet pendant la collecte

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-008 | UF-02 | S-06 | Partiel |

- [ ] Aucun signalement spontané n'intervient pendant les phases 1 et 2
- [ ] Le signalement est actif pendant les phases de clarification, 4 et 7
- [ ] Le comportement par phase est documenté dans la notation consultable

#### PR-028 Restituer les écarts accumulés à la clarification

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-008 | UF-02 | S-05, S-06 | Partiel |

- [ ] Les écarts non signalés pendant la collecte sont restitués à leurs seuls auteurs en phase 4
- [ ] Le facilitateur dispose du décompte global des écarts, sans identité
- [ ] Un écart traité disparaît de la liste
- [ ] Un écart ignoré disparaît après un délai, sans conséquence sur l'élément

#### PR-029 Permettre une vérification volontaire

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-008 | UF-02 | S-06 | Démontré |

- [ ] Un auteur sollicite la vérification de sa formulation à tout moment
- [ ] La vérification reste privée
- [ ] Elle est accessible depuis la zone de saisie, sans quitter l'activité en cours

#### PR-030 Rendre la notation consultable en permanence

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-010 | UF-08 | S-06 | Démontré |

- [ ] La légende est visible sans quitter l'activité en cours, et non repliée par défaut
- [ ] Chaque type porte un exemple tiré du domaine dommage aux biens
- [ ] Les types attendus à l'étape en cours sont distingués des autres
- [ ] La notation indique comment exprimer une question et un désaccord
- [ ] Les deux chaînes canoniques de la section 7.4 y figurent

### F-06 Chronologie, moments et zone d'attente

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Transformer une liste d'événements en compréhension partagée, sans forcer une séquence unique |
| Personas      | P1, P2, P3, P5                                                                   |
| Jalon         | L1                                                                               |
| Exigences métier | BR-024                                                                        |
| Statut maquette | Partiel                                                                        |

#### PR-031 Nommer les moments du domaine

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-024 | UF-10 | S-08 | Démontré |

La chronologie s'organise en moments nommés par le groupe, dans le langage du métier.

- [ ] Un moment est créé, nommé et renommé par un participant
- [ ] Les moments sont réordonnables
- [ ] La suppression d'un moment remet ses éléments en zone d'attente, sans les détruire
- [ ] Le groupe démarre sans moment prédéfini imposé

#### PR-032 Placer un événement dans un moment

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-024 | UF-10 | S-08 | Démontré |

- [ ] Tout participant place et déplace librement un élément
- [ ] Le déplacement est mis à jour pour tous et tracé
- [ ] La position reste stable, sans animation du déplacement
- [ ] Ce qui a changé est signalé, pas le fait que cela bouge

#### PR-033 Conserver une zone d'attente

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-024 | UF-10 | S-08 | Démontré |

- [ ] Un événement dont la place est inconnue reste en zone d'attente plutôt que placé au hasard
- [ ] Le nombre d'éléments en attente est affiché et sert le critère de sortie de la phase 3
- [ ] Un élément revient en attente depuis la chronologie

#### PR-034 Offrir une alternative au glisser-déposer

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-024, accessibilité | UF-10 | S-08 | Partiel |

- [ ] Les actions placer avant, placer après et remettre en attente existent indépendamment du glissement
- [ ] Ces actions sont accessibles au clavier
- [ ] Le parcours complet d'ordonnancement se fait sans souris

#### PR-035 Représenter la simultanéité

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-024 | UF-10 | S-08 | Partiel |

- [ ] Deux événements simultanés sont représentables sans en ordonner un avant l'autre
- [ ] Les simultanéités sont empilées verticalement dans le même moment

#### PR-036 Représenter branches, répétitions et événements pivots

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-024 | UF-10 | S-08 | Absent |

- [ ] Un chemin alternatif part d'un point de divergence identifié, sans quitter la chronologie
- [ ] Un événement répétitif est marqué comme tel plutôt que dupliqué
- [ ] Un événement pivot, qui conditionne la suite, est distinguable à distance
- [ ] Un événement dont la position est incertaine reste représentable sans position fixée

#### PR-037 Regrouper les doublons évidents

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-022 | UF-10 | S-03 | Démontré |

- [ ] Deux éléments sont regroupés sans discussion, en conservant leurs deux auteurs
- [ ] Le regroupement est réversible
- [ ] L'état « doublons traités » sert le critère de sortie de la phase 2

### F-07 Récit et écarts entre récits

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Faire reconnaître l'histoire par le groupe, et conserver les récits qui divergent |
| Personas      | P1, P2, P3                                                                       |
| Jalon         | L1                                                                               |
| Exigences métier | BR-027, BR-023                                                                |
| Statut maquette | Démontré                                                                       |

#### PR-038 Parcourir la chronologie avec un narrateur

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création, sert BR-027 | — | S-09 | Démontré |

- [ ] Un narrateur est désigné parmi les experts métier
- [ ] Le parcours avance événement par événement, avec l'événement courant mis en évidence
- [ ] La progression du récit est visible de tous
- [ ] Le mur ne se réordonne pas pendant le récit

#### PR-039 Signaler un écart pendant le récit

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-027 | UF-08 | S-09 | Démontré |

- [ ] Tout participant signale un écart sur l'événement courant
- [ ] L'écart porte l'autre version, l'auteur du signalement et la passe de récit concernée
- [ ] L'écart est visible comme point à traiter

#### PR-040 Conserver les deux versions sans arbitrage

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-027 | UF-08 | S-09 | Démontré |

- [ ] Deux descriptions contradictoires du même fait coexistent
- [ ] Chaque description porte l'identité de son auteur
- [ ] Aucune fusion automatique n'est proposée
- [ ] Une divergence non traitée en fin d'atelier figure dans la restitution

#### PR-041 Traiter un écart de trois manières

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-027, BR-023 | UF-08 | S-09 | Démontré |

Un écart se reformule, se tranche, ou devient un point chaud.

- [ ] La reformulation conserve la formulation d'origine
- [ ] L'arbitrage conserve la trace des deux versions et de la décision rendue
- [ ] Le point chaud rejoint le mur comme un élément ordinaire
- [ ] Le nombre d'écarts ouverts sert le critère de sortie de la phase 4

#### PR-042 Poser un événement oublié en cours de récit

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-004 | UF-01 | S-09 | Démontré |

- [ ] L'ajout se fait sans quitter le récit
- [ ] L'événement est placé dans le moment courant
- [ ] Le contrôle de notation s'applique comme à la saisie ordinaire

#### PR-043 Conduire une seconde passe avec un autre narrateur

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-027 | — | S-09 | Démontré |

- [ ] La passe de récit est identifiée et conservée avec chaque écart
- [ ] Le changement de narrateur ne réinitialise pas les écarts de la passe précédente

### F-08 Enrichissement : acteurs, systèmes et points chauds

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Expliciter qui agit, avec quels outils, et où le métier souffre                  |
| Personas      | P1 à P5                                                                          |
| Jalon         | L1                                                                               |
| Exigences métier | BR-025, BR-004                                                                |
| Statut maquette | Démontré                                                                       |

#### PR-044 Rattacher un acteur à un moment

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-10 | Démontré |

- [ ] Un acteur est un rôle, jamais une personne nommée
- [ ] Le rattachement se fait depuis le moment concerné
- [ ] Un même acteur intervient dans plusieurs moments
- [ ] La liste des acteurs d'un moment est consultable

#### PR-045 Rattacher un système externe

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-10 | Démontré |

- [ ] Un système est traité comme une boîte noire, sans description de fonctionnement
- [ ] Le rattachement se fait depuis le moment concerné

#### PR-046 Poser un point chaud

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-027, BR-010 | UF-08 | S-03, S-10 | Démontré |

Le point chaud porte un désaccord, une question ou un blocage.

- [ ] Il se pose depuis n'importe quelle phase et n'importe quel rôle participant
- [ ] Il est rattachable à un moment ou à un élément
- [ ] Rien n'oblige à le résoudre
- [ ] Les points chauds ouverts sont dénombrés dans le panneau de conduite et dans la restitution

#### PR-047 Poser une opportunité

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | Création | — | S-03 | Démontré |

- [ ] L'opportunité est un type d'élément distinct du point chaud
- [ ] Elle figure dans la restitution, séparée des faits

#### PR-048 Déclarer l'absence d'acteur ou de système

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-036 | UF-13 | S-10 | Démontré |

Un moment sans acteur peut être un moment non revu, ou un moment sans acteur. Le produit exige de trancher.

- [ ] La déclaration « aucun acteur ici » est explicite et tracée
- [ ] Un moment non revu est distingué d'un moment revu et déclaré vide
- [ ] L'état de revue sert le critère de sortie de la phase 5

#### PR-049 Suivre la revue des moments

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-036 | UF-06 | S-05, S-10 | Démontré |

- [ ] Le nombre de moments passés en revue est affiché en continu
- [ ] Les moments restant à revoir sont atteignables en un geste

### F-09 Vote silencieux de priorisation

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Choisir le prochain sujet d'exploration sans que la popularité décide de la vérité |
| Personas      | P1, P2, P3, P5                                                                   |
| Jalon         | L1                                                                               |
| Exigences métier | BR-006                                                                        |
| Statut maquette | Partiel                                                                        |

#### PR-050 Ouvrir et clore un vote

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-006 | UF-03 | S-19 | Démontré |

- [ ] Le facilitateur ouvre et clôt le vote sur un ensemble de sujets
- [ ] Le nombre de points par personne est annoncé à l'ouverture
- [ ] Le résultat d'un vote clos reste consultable

#### PR-051 Voter sans connaître les votes des autres

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable dès lors que F-09 est livrée | BR-006 | UF-03 | S-19 | Absent, voir E-07 |

**Décision du Product Owner du 2026-09-21 : le secret est retenu**, contre le comportement de la maquette.

- [ ] Les votes d'un participant ne sont visibles que de lui avant la clôture
- [ ] Aucun total n'est visible avant la clôture, ni sur l'élément ni ailleurs
- [ ] Le nombre de points restants est visible du votant
- [ ] La clôture révèle les totaux à tous, simultanément

#### PR-052 Présenter le résultat comme un indicateur

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-006 | UF-03 | S-19 | Partiel |

- [ ] Le résultat n'emporte aucune conséquence automatique
- [ ] Le groupe retient un sujet non arrivé en tête, et le motif est enregistré

#### PR-053 Ne produire aucun effet visuel sur les éléments peu votés

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-006 | UF-03 | S-03 | Absent, voir E-07 |

- [ ] Aucun élément n'est supprimé, masqué ni déclassé faute de voix
- [ ] Aucune taille, position ni teinte ne varie avec le nombre de voix
- [ ] Aucun classement permanent n'est affiché

### F-10 Processus, commandes, politiques et informations

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Produire le livrable principal des deux jours : des processus déroulés avec leurs règles explicites |
| Personas      | P1 à P5, puis P6                                                                 |
| Jalon         | L1                                                                               |
| Exigences métier | BR-025, BR-031                                                                |
| Statut maquette | Démontré                                                                       |

#### PR-054 Retenir deux ou trois processus

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-031 | UF-17 | S-11 | Démontré |

- [ ] Le groupe retient entre deux et trois processus
- [ ] Le motif de la sélection est consigné
- [ ] Le dépassement de trois processus est signalé, sans être empêché

#### PR-055 Rattacher un événement de la chronologie à un processus

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-031 | UF-17 | S-11 | Démontré |

- [ ] Le rattachement part des événements existants, jamais d'une ressaisie
- [ ] Le nombre d'événements rattachés et restants est affiché
- [ ] Un événement rattaché reste relié à son moment d'origine

#### PR-056 Nommer la commande qui produit l'événement

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-11 | Démontré |

- [ ] La commande est formulée à l'infinitif, le contrôle de notation s'applique
- [ ] Une commande sans nom est signalée et sert le critère de sortie de la phase 6
- [ ] La commande est reliée à l'événement qu'elle produit

#### PR-057 Formuler la politique qui déclenche la commande

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-11 | Démontré |

- [ ] La politique suit le motif « dès que … alors … »
- [ ] Une politique sans condition est signalée comme incomplète
- [ ] La politique est reliée à l'événement déclencheur et à la commande émise
- [ ] Le nombre de politiques explicites sert le critère de sortie de la phase 7

#### PR-058 Déclarer l'information consultée pour décider

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-11 | Démontré |

- [ ] L'information est rattachée à la commande concernée
- [ ] Elle est distincte de la politique et du système

#### PR-059 Déclarer l'acteur ou le système qui porte la commande

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-11 | Démontré |

- [ ] Une commande porte soit un acteur, soit une politique, comme déclencheur
- [ ] Le système ou l'agrégat qui exécute la commande est déclarable
- [ ] Une commande sans déclencheur est signalée et sert le critère de sortie de la phase 7

#### PR-060 Respecter les chaînes canoniques

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-025 | UF-13 | S-11 | Démontré |

Les deux chaînes de la section 7.4 structurent la saisie.

- [ ] La chaîne affichée guide l'ordre de complétion, sans imposer de séquence de saisie
- [ ] Un maillon manquant est visible, jamais bloquant
- [ ] Une chaîne complète est distinguée d'une chaîne partielle

### F-11 Chemins alternatifs et clôture

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Faire apparaître ce qui se passe quand rien ne se passe comme prévu               |
| Personas      | P1, P3, P4                                                                       |
| Jalon         | L1                                                                               |
| Exigences métier | BR-031                                                                        |
| Statut maquette | Démontré                                                                       |

#### PR-061 Ouvrir une variante depuis un point identifié

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-031 | UF-17 | S-12 | Démontré |

- [ ] La variante part d'un événement ou d'une commande du scénario nominal
- [ ] Son point d'origine reste visible
- [ ] Le scénario nominal n'est pas modifié par l'ajout d'une variante

#### PR-062 Décrire la variante

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-031 | UF-17 | S-12 | Démontré |

- [ ] La variante porte son déroulement en langage métier
- [ ] Elle est rattachée au processus dont elle relève
- [ ] Le nombre de variantes sert le critère de sortie de la phase 8

#### PR-063 Signaler la recherche d'exhaustivité

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Optionnelle | Création | — | S-05 | Absent |

- [ ] Au-delà de trois variantes sur un même processus, un rappel est adressé au seul facilitateur
- [ ] Le rappel n'empêche aucune création

#### PR-064 Produire la clôture de l'atelier

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-013 | UF-20 | S-18 | Partiel |

- [ ] La liste des points chauds restants est produite à la clôture
- [ ] Les écarts de récit non tranchés y figurent
- [ ] Les termes du langage pivot non retenus avec le métier y figurent
- [ ] La clôture ne ferme aucune séance : le modèle reste consultable

### F-12 Langage pivot et tensions

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Capter un changement de sens au moment où il apparaît, parce qu'il ne se retrouve jamais après |
| Personas      | P1, P3, P4, P5                                                                   |
| Jalon         | L1                                                                               |
| Exigences métier | BR-026, BR-010                                                                |
| Statut maquette | Partiel                                                                        |

#### PR-065 Déclarer un terme du domaine en un geste

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-026 | UF-14 | S-13 | Démontré |

- [ ] La déclaration se fait sans quitter le mur ni l'activité en cours
- [ ] Elle est possible à toute phase, dès la phase 2
- [ ] Le terme est visible de tous dès sa déclaration
- [ ] Le glossaire est amorçable hors séance, avant l'ouverture de l'atelier, par le Product Owner ou un porteur de la méthode
- [ ] Un terme amorcé hors séance porte cette origine et reste soumis à la validation du métier, voir PR-066

#### PR-066 Distinguer une définition retenue d'une définition proposée

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-026, BR-035 | UF-14 | S-13 | Démontré |

Un terme sans définition validée par le métier ne vaut pas définition.

- [ ] Une définition porte l'état retenu avec le métier, ou proposé
- [ ] Une définition retenue porte la phase et la personne qui l'a énoncée
- [ ] Un terme sans définition est affiché comme « à définir avec le métier »

#### PR-067 Porter plusieurs définitions pour un même terme

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-026 | UF-14 | S-13 | Absent |

- [ ] Un même terme porte plusieurs définitions rattachées à des zones différentes
- [ ] La zone d'application est renseignable avant qu'aucune frontière n'existe, sous la forme « à situer »
- [ ] Une définition est rattachable à une frontière dès que celle-ci existe

#### PR-068 Relier deux termes désignant la même réalité

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-026 | UF-14 | S-13 | Absent |

- [ ] Le lien de synonymie est enregistré et navigable
- [ ] Il n'entraîne aucune fusion des deux termes

#### PR-069 Marquer un terme dont le sens fait débat

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-026 | UF-14 | S-13 | Absent |

- [ ] Le terme ambigu est marqué et reste ouvert
- [ ] Les termes ambigus sont proposés comme indices candidats au moment de poser une frontière
- [ ] Ils figurent dans la restitution

### F-13 Découpage : frontières, indices et mesures

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Permettre au groupe d'arrêter des frontières argumentées, sans que l'outil n'en propose aucune |
| Personas      | P4, P1, P3, P6                                                                   |
| Jalon         | L2                                                                               |
| Exigences métier | BR-017, BR-018, BR-019, BR-028, BR-029, BR-030                                |
| Statut maquette | Partiel                                                                        |

#### PR-070 Créer une frontière candidate

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-017 | UF-05 | S-14 | Démontré |

- [ ] La frontière est nommée dans le langage du métier
- [ ] Tout participant en crée une, sans rôle requis
- [ ] Elle est conservée, renommable et supprimable
- [ ] Sa création, sa modification et sa suppression laissent le modèle inchangé

#### PR-071 Affecter des éléments à une frontière

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-017, BR-019 | UF-05 | S-14 | Démontré |

- [ ] L'affectation se fait depuis le mur, élément par élément
- [ ] Les éléments non affectés sont dénombrés et atteignables
- [ ] Les mesures se recalculent à chaque affectation
- [ ] Le retrait d'une affectation laisse l'élément intact

#### PR-072 Fournir les mesures déterministes

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-018 | UF-05 | S-14 | Démontré |

Cinq mesures sont calculées sur le graphe du modèle.

- [ ] Nombre de liens traversant une frontière
- [ ] Nombre d'événements orphelins, sans commande qui les produise ni acteur qui les porte
- [ ] Acteurs présents dans plusieurs frontières, avec leur nom
- [ ] Cohésion interne de chaque frontière, en pourcentage
- [ ] Couverture du mur, part des événements affectés à une frontière
- [ ] Chaque mesure est accompagnée de la phrase qui explique ce qu'elle signifie

#### PR-073 Détailler chaque mesure jusqu'aux éléments qui la fondent

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-018, BR-012 | UF-05 | S-14 | Démontré |

- [ ] Chaque lien traversant est identifiable individuellement, avec sa paire de frontières
- [ ] Chaque événement orphelin est listé avec le motif de son isolement
- [ ] La sélection d'un élément mesuré le localise sur le mur

#### PR-074 Ne proposer aucun découpage

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-018, PP-08 | UF-05 | S-14 | Démontré |

- [ ] Aucune frontière n'est suggérée, préremplie ni classée par le produit
- [ ] Aucune mesure n'est présentée comme une conclusion
- [ ] L'interface énonce explicitement que le jugement reste humain

#### PR-075 Déclarer un indice métier

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-029 | UF-05 | S-14 | Absent |

Les huit indices recevables sont ceux du document d'exigences métier, rappelés en section 7.6.

- [ ] Les huit types d'indices sont proposés
- [ ] Chaque indice déclaré est rattaché aux éléments du modèle qui le fondent
- [ ] Le rattachement est navigable dans les deux sens
- [ ] Déclarer un indice coûte le même geste que tracer une zone

#### PR-076 Marquer une frontière insuffisamment étayée

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-029 | UF-05 | S-14 | Absent |

- [ ] Le compteur d'indices sur huit figure sur la fiche de la frontière
- [ ] Une frontière portant moins de deux indices est marquée « non étayée »
- [ ] Le marquage est visible sans être bloquant
- [ ] Le compteur d'indices est présenté avant les mesures

#### PR-077 Compléter la fiche du contexte candidat

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-029 | UF-05 | S-14 | Partiel |

- [ ] La fiche porte le nom métier, la responsabilité, le langage et le niveau de confiance
- [ ] Les événements publiés et consommés par le contexte sont identifiables
- [ ] Les agrégats rattachés y figurent

#### PR-078 Nommer et orienter une dépendance entre frontières

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-030 | UF-15 | S-14 | Absent |

- [ ] Chaque dépendance porte un nom et un sens
- [ ] Le contexte responsable de l'information échangée est désigné
- [ ] Une dépendance dont la responsabilité fait débat est marquée comme telle
- [ ] Les liens traversants mesurés sont convertibles en dépendances nommées

#### PR-079 Faire coexister plusieurs hypothèses de découpage

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-028 | UF-05 | S-14 | Absent |

- [ ] Plusieurs hypothèses coexistent sur un même modèle, sans limite de nombre
- [ ] Chaque hypothèse porte un nom, un auteur et un statut
- [ ] Une hypothèse est visible de tous dès sa création
- [ ] Une seule hypothèse est tracée sur le mur à la fois
- [ ] Les hypothèses ne se tracent qu'en phase 9, tout en restant créables à tout moment
- [ ] Une hypothèse écartée reste consultable avec le motif de son rejet

#### PR-080 Comparer deux hypothèses

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-028, BR-030 | UF-15 | S-14 | Absent |

- [ ] Deux hypothèses au plus s'affichent côte à côte
- [ ] Leurs indices sont présentés en regard, par type
- [ ] Leurs mesures sont présentées en regard
- [ ] Les éléments classés différemment par les deux hypothèses sont mis en évidence
- [ ] Aucune hypothèse n'est désignée comme meilleure par le produit

#### PR-081 Décider ou conserver en hypothèse

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-034, BR-035 | UF-16 | S-14 | Absent |

- [ ] Le groupe fait passer un contexte candidat au statut décision, avec date et composition de séance
- [ ] Un contexte non tranché conserve le statut hypothèse, sans pénalisation visuelle
- [ ] Une contestation d'indice est enregistrée et fait passer l'indice à contesté
- [ ] L'historique de décision est accessible à la séance suivante

### F-14 Invariants et agrégats candidats

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Empêcher qu'un agrégat naisse d'un regroupement visuel plutôt que d'une règle métier |
| Personas      | P6, Product Owner, P3                                                            |
| Jalon         | L2                                                                               |
| Exigences métier | BR-032, BR-033                                                                |
| Statut maquette | Absent, voir E-04                                                              |

#### PR-082 Formuler un invariant en langage métier

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-032 | UF-18 | S-15 | Absent |

- [ ] L'invariant est saisi en langage métier, sans vocabulaire technique imposé
- [ ] Il est créé avec le statut à vérifier
- [ ] Il est rattaché au contexte candidat concerné

#### PR-083 Rattacher l'invariant aux éléments qui le mettent en jeu

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-032, BR-012 | UF-18 | S-15 | Absent |

- [ ] Les commandes concernées sont reliées
- [ ] Les événements concernés sont reliés
- [ ] Le rattachement est navigable dans les deux sens

#### PR-084 Porter le statut de validation métier d'un invariant

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-032, BR-035 | UF-18 | S-15 | Absent |

- [ ] Le représentant métier confirme ou conteste, le statut passe à validé ou à désaccord
- [ ] Un invariant non validé reste signalé comme à vérifier
- [ ] Le changement de statut conserve son auteur et sa date

#### PR-085 Exiger un invariant avant tout agrégat

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-033 | UF-18 | S-15 | Absent |

**Décision du Product Owner du 2026-09-21 : le refus est strict.** L'option du marquage incomplet, qu'admettait BR-033, n'est pas retenue.

- [ ] La création d'un agrégat sans invariant rattaché est refusée
- [ ] Le motif du refus nomme ce qui manque, et propose de formuler l'invariant
- [ ] Le champ de nom de l'agrégat reste inactif tant qu'aucun invariant n'est formulé
- [ ] Aucun agrégat existant ne subsiste sans invariant : le retrait du dernier invariant rattaché est refusé

#### PR-086 Interdire la création d'un agrégat par regroupement visuel

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-033 | UF-18 | S-15 | Écart, voir E-04 |

- [ ] Aucune sélection multiple d'éléments du mur ne crée un agrégat
- [ ] Aucun regroupement spatial n'est interprété comme un agrégat

#### PR-087 Compléter la fiche de l'agrégat candidat

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-033 | UF-18 | S-15 | Partiel |

- [ ] L'agrégat porte son intention en langage métier
- [ ] Les commandes acceptées sont listées
- [ ] Les invariants protégés sont listés
- [ ] Les événements émis sont listés
- [ ] Les informations consultées pour décider sont listées
- [ ] L'agrégat est rattaché à un contexte candidat

#### PR-088 Extraire la liste des invariants à valider

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-032 | UF-18 | S-15, S-18 | Absent |

- [ ] La liste des invariants au statut à vérifier est extractible
- [ ] Elle est transmissible hors séance, dans un format lisible sans outil
- [ ] Chaque invariant y figure avec son contexte et les éléments qui le mettent en jeu

### F-15 Couche fantôme, propositions issues de la conversation

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Rendre au groupe ce qui a été dit et qui n'a pas été écrit, sans jamais le confondre avec sa production |
| Personas      | P1, P2, P3                                                                       |
| Jalon         | L1                                                                               |
| Exigences métier | BR-011, BR-014, BR-015, BR-016, BR-012                                        |
| Statut maquette | Démontré                                                                       |

#### PR-089 Importer une transcription de séance

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-011, BR-014 | UF-04 | S-17 | Démontré |

- [ ] L'import est déclenché par le seul facilitateur
- [ ] La transcription importée est associée à la séance et reste consultable
- [ ] L'état de la captation est visible de tous
- [ ] La progression du traitement est visible

#### PR-090 Produire des propositions typées et sourcées

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-014, BR-012 | UF-04 | S-17 | Démontré |

- [ ] Chaque proposition porte son type selon la notation retenue
- [ ] Chaque proposition porte l'extrait de conversation, le locuteur et l'horodatage
- [ ] Chaque proposition porte un niveau de confiance
- [ ] Chaque proposition est contestable par tout participant

#### PR-091 N'intervenir qu'après la production humaine

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-014 | UF-04 | S-17 | Démontré |

- [ ] Aucune proposition n'apparaît avant la fin de la production humaine de l'étape en cours
- [ ] L'affichage de la couche est commandé par le facilitateur
- [ ] La couche est masquable à tout moment

#### PR-092 Distinguer la couche fantôme sans ambiguïté

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-016 | UF-04 | S-17 | Démontré |

- [ ] La distinction combine forme, bordure et étiquette textuelle explicite
- [ ] Elle ne repose jamais sur la seule couleur
- [ ] Elle subsiste dans la restitution

#### PR-093 Adopter une proposition en conservant son origine

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-014, BR-012 | UF-04 | S-17 | Démontré |

- [ ] L'adoption résulte d'une action explicite d'un participant
- [ ] L'élément adopté devient un élément ordinaire du mur
- [ ] Le rattachement à l'extrait source subsiste après adoption et après modification

#### PR-094 Faire disparaître les propositions non adoptées

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-015 | UF-04 | S-17 | Démontré |

- [ ] L'absence d'adoption entraîne la disparition en fin d'exercice
- [ ] Aucune validation collective n'est requise pour écarter une proposition
- [ ] L'échéance de péremption est annoncée et consultable, jamais silencieuse

### F-16 Statuts de preuve, décisions et traçabilité

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Empêcher qu'une hypothèse et un fait validé se présentent de la même manière     |
| Personas      | P1, P2, P3, P4, P6                                                               |
| Jalon         | L2, amorcé en L1                                                                 |
| Exigences métier | BR-012, BR-034, BR-035                                                        |
| Statut maquette | Partiel                                                                        |

#### PR-095 Porter un statut de preuve sur chaque élément

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-035 | UF-16 | S-03, S-16 | Partiel |

Les sept statuts sont définis en section 7.3.

- [ ] Chaque élément porte un statut de preuve
- [ ] Le statut est modifiable par le groupe en séance
- [ ] Le statut est visible sur l'élément, sans reposer sur la seule couleur
- [ ] Le statut figure dans la restitution

#### PR-096 Conserver la trace des changements de statut

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-035 | UF-16 | S-16 | Absent |

- [ ] Le changement conserve l'état antérieur, son auteur et sa date
- [ ] L'enchaînement des statuts d'un élément est consultable

#### PR-097 Filtrer par statut

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-035 | UF-20 | S-03 | Absent |

- [ ] Le mur est filtrable par statut de preuve
- [ ] Le filtre est individuel et sans effet sur les autres vues

#### PR-098 Tenir le journal des décisions

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-034 | UF-16 | S-16, S-18 | Absent |

- [ ] Chaque décision porte son objet, son motif, sa date et la composition de la séance
- [ ] Les hypothèses rejetées y figurent avec leur motif
- [ ] Une hypothèse rejetée reste consultable
- [ ] Le journal figure dans la restitution

#### PR-099 Naviguer la chaîne de traçabilité dans les deux sens

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-012 | UF-19 | S-16 | Partiel |

La chaîne compte huit maillons, décrits en section 7.5.

- [ ] Depuis un agrégat, le contexte, les commandes et les invariants sont atteignables
- [ ] Depuis un invariant, les événements qui le mettent en jeu sont atteignables
- [ ] Depuis un événement, l'auteur, le statut et l'extrait de conversation sont affichés
- [ ] Depuis un extrait de conversation, les éléments qui en dérivent sont listés
- [ ] Le chemin complet d'un agrégat à la parole tient en quatre gestes au plus

#### PR-100 Signaler les ruptures de chaîne

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-012 | UF-19 | S-16 | Absent |

- [ ] Un maillon absent est signalé explicitement, jamais silencieusement
- [ ] La rupture est localisable et marquable à vérifier
- [ ] Le nombre de ruptures est dénombré pour la restitution

### F-17 Restitution, export et versionnement

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Faire que le modèle survive à l'outil, à la séance et au programme                |
| Personas      | Tous                                                                             |
| Jalon         | L1                                                                               |
| Exigences métier | BR-011, BR-013, BR-016, BR-020                                                |
| Statut maquette | Démontré                                                                       |

#### PR-101 Restituer le modèle à tout instant

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-013, BR-020 | UF-07, UF-20 | S-18 | Démontré |

- [ ] La restitution est une action permanente du mur, et non un écran dédié
- [ ] Elle est disponible à toute phase, y compris avant tout incident
- [ ] Elle est accessible à tous les rôles

#### PR-102 Produire un fichier lisible sans outil

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-013 | UF-20 | S-18 | Démontré |

Le format et la structure de sections sont définis en section 7.7.

- [ ] Le fichier est du Markdown, lisible sans outil spécifique
- [ ] Il porte l'identité de la séance, ses dates, son effectif et les étapes validées
- [ ] Il contient la chronologie, les processus déroulés, les points chauds, les écarts, les variantes, le découpage, les tranches verticales, le langage pivot, les mesures et la traçabilité

#### PR-103 Séparer ce qui est établi de ce qui ne l'est pas

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-013, BR-035 | UF-20 | S-18 | Partiel |

- [ ] Les faits validés, les hypothèses et les questions ouvertes sont restitués séparément
- [ ] Chaque élément restitué porte sa nature, son auteur, son horodatage et son statut de preuve
- [ ] Les éléments issus d'une proposition automatique sont identifiés comme tels
- [ ] Le rattachement à l'extrait de conversation figure dans la restitution

#### PR-104 Garantir l'idempotence de la restitution

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-013 | UF-20 | S-18 | Partiel |

- [ ] Deux restitutions successives d'un modèle inchangé produisent un fichier identique
- [ ] L'ordre des sections et des éléments est déterministe

#### PR-105 Verser la restitution dans un dépôt versionné

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | Création, sert BR-013 | — | S-18 | Démontré |

**Décision du Product Owner du 2026-09-21 : le dépôt est `event2spec`**, un fichier par séance sous `docs/sessions/`, sur une branche dédiée.

- [ ] La restitution est versée dans le dépôt du produit, sous `docs/sessions/`, un fichier par séance
- [ ] Le versement se fait sur une branche dédiée à la séance, jamais directement sur la branche par défaut
- [ ] L'horodatage du dernier versement est visible
- [ ] Le versement est manuel, jamais automatique
- [ ] L'échec du versement n'empêche pas le téléchargement du fichier
- [ ] Deux versements successifs d'un modèle inchangé ne produisent aucun changement à valider

#### PR-106 Conserver la transcription et l'associer à la séance

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-011 | — | S-18 | Partiel |

**Décision du Product Owner du 2026-09-21 : la transcription est purgée à la clôture de la séance**, une fois la restitution produite.

- [ ] La transcription est conservée pendant la séance et associée à celle-ci
- [ ] Elle reste consultable tant que la séance n'est pas close
- [ ] La clôture purge la transcription, après production de la restitution
- [ ] Les extraits déjà rattachés à un élément survivent à la purge, avec leur locuteur et leur horodatage
- [ ] La purge est annoncée avant d'être exécutée, et son exécution est tracée
- [ ] KPI-06 et la traçabilité vers la parole restent renseignables après la purge

### F-18 Continuité et repli non logiciel

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Garantir que l'atelier se tienne même si le produit n'existe pas ce jour-là      |
| Personas      | P2, responsable de programme                                                     |
| Jalon         | L1                                                                               |
| Exigences métier | BR-020, BR-021                                                                |
| Statut maquette | Hors maquette, porté par le déroulé d'atelier                                  |

#### PR-107 Rendre l'export atteignable avant l'incident

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-020 | UF-07 | S-18 | Démontré |

- [ ] L'export est atteignable en un geste depuis toute phase
- [ ] Il ne suppose aucune préparation préalable
- [ ] Il inclut les liens, les statuts et les décisions, pas seulement les éléments

#### PR-108 Fournir un déroulé exploitable hors outil

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-020 | UF-07 | — | Hors produit |

- [ ] Le déroulé d'atelier est disponible sous forme de document autonome
- [ ] Il comporte la légende de notation, les phrases de lancement, les durées et les pièges
- [ ] Le facilitateur confirme par écrit pouvoir conduire l'atelier dans ce mode

#### PR-109 Permettre la reprise manuelle du contenu exporté

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-020 | UF-07 | S-18 | Partiel |

- [ ] Le contenu exporté est repris sur un tableau blanc partagé ou un document collaboratif sans transformation
- [ ] La chronologie exportée conserve l'ordre des moments
- [ ] Les auteurs et les points chauds restent lisibles dans le fichier

#### PR-110 Outiller la décision de bascule

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-021 | — | — | Hors produit |

- [ ] Une date de décision est fixée avant l'atelier, à J-5
- [ ] Le critère de décision est défini et vérifiable
- [ ] Le décideur est désigné nommément
- [ ] La décision permet d'informer les participants avant l'atelier

### F-19 Lisibilité du mur : modes, filtres, vues et focus

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Tenir un mur de plusieurs centaines d'éléments lisible sur vingt-trois postes hétérogènes |
| Personas      | Tous                                                                             |
| Jalon         | L1                                                                               |
| Exigences métier | BR-004, création pour le reste                                                |
| Statut maquette | Partiel                                                                        |

#### PR-111 Appliquer la divulgation progressive par mode

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-001, BR-022 | — | S-03 | Démontré |

- [ ] Un mode ne met en avant que les types de son étape et des étapes antérieures
- [ ] Les types des étapes suivantes restent accessibles sans être mis en avant
- [ ] Le mur n'affiche jamais tous les niveaux simultanément

#### PR-112 Offrir des filtres individuels

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | Création | — | S-03 | Partiel |

- [ ] Le mur est filtrable par moment, acteur, processus, frontière, statut et auteur
- [ ] Un filtre individuel ne modifie ni le modèle ni l'affichage des autres participants

#### PR-113 Donner à chacun sa propre vue

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création, décision du 2026-08-12 | — | S-03 | Démontré |

- [ ] Chaque participant dispose de sa propre vue du mur
- [ ] Aucune projection partagée n'est supposée
- [ ] La navigation d'un participant n'affecte pas celle des autres

#### PR-114 Permettre un focus collectif sans interrompre une saisie

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | Création, décision du 2026-08-12 | — | S-05 | Absent |

- [ ] Le facilitateur repositionne les vues individuelles sur un point du mur
- [ ] Le focus ne touche jamais à une saisie en cours
- [ ] Un repère indique en permanence ce que le groupe regarde
- [ ] Un participant sort du focus sans demander

#### PR-115 Conserver des positions stables

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | Création, orientation UX du 2026-08-11 | UF-10 | S-03 | Démontré |

- [ ] Aucun déplacement n'est animé
- [ ] Ce qui a changé est signalé, pas le fait que cela bouge
- [ ] Toute animation résiduelle respecte la préférence de réduction du mouvement

#### PR-116 Adapter l'échelle au poste

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Optionnelle | Création | — | S-03 | Démontré |

- [ ] Trois échelles sont proposées, poste de travail, standard et mur projeté
- [ ] Le réglage est individuel
- [ ] Le fonctionnement est préservé à 200 pour cent de zoom navigateur

### F-20 Instrumentation des indicateurs

| Attribut      | Valeur                                                                         |
|---------------|----------------------------------------------------------------------------------|
| Intention     | Produire les données des seize indicateurs, sans jamais exposer un classement en séance |
| Personas      | P2, Product Owner                                                                |
| Jalon         | L1                                                                               |
| Exigences métier | BR-007, BR-012, BR-035                                                        |
| Statut maquette | Partiel                                                                        |

#### PR-117 Mesurer la participation sans l'exposer

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-007 | — | S-05, S-20 | Démontré |

- [ ] Le facilitateur voit le nombre de contributeurs actifs et les participants sans contribution
- [ ] Aucun classement par participant n'est visible, ni de lui ni des autres
- [ ] Le dénominateur est le nombre de contributeurs possibles saisi à la création de la séance, facilitateur exclu — 22 pour un atelier à 23 personnes
- [ ] Le panneau ne désigne jamais un silencieux sur une surface partagée

#### PR-118 Permettre d'aller chercher un silencieux discrètement

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | Création | — | S-20 | Démontré |

- [ ] La relance est individuelle et privée
- [ ] Une relance déjà faite est signalée au facilitateur
- [ ] Aucune notification publique n'est produite

#### PR-119 Produire les données des indicateurs de qualité

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Indispensable | BR-007, BR-012, BR-029, BR-033 | — | S-18 | Partiel |

Le détail par indicateur figure en section 8.

- [ ] La part d'éléments rattachés à un extrait de transcription est calculable
- [ ] Le nombre de points chauds sans décision ni propriétaire est calculable
- [ ] La part de frontières disposant d'au moins deux indices est calculable
- [ ] La part de dépendances nommées est calculable
- [ ] La part d'agrégats associés à un invariant est calculable
- [ ] Le nombre de rôles distincts ayant validé une part du modèle est calculable

#### PR-120 Exporter le jeu de mesures après la séance

| Priorité | Exigence métier | Flux | Surface | Statut maquette |
|----------|-----------------|------|---------|------------------|
| Souhaitable | BR-007 | — | S-18 | Absent |

- [ ] Les mesures de participation sont exportables après la séance
- [ ] L'export porte les seize indicateurs renseignables et signale ceux qui ne le sont pas
- [ ] Les cinq mesures d'usage de la section 8.4 figurent dans l'export
- [ ] Aucune mesure individuelle n'est exportée sans le décompte global qui la contextualise

## 6. Exigences non fonctionnelles

| ID         | Domaine                  | Exigence                                                                                                 | Priorité      | Vérification                                        |
|------------|--------------------------|------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------|
| **NFR-01** | Collaboration            | 23 sessions simultanées contribuent sans perte d'élément, propagation d'une contribution visible en moins d'une seconde en conditions nominales | Indispensable | Essai de charge à 23 postes avant la séance         |
| **NFR-02** | Volumétrie               | Le produit tient 800 éléments, 20 moments, 3 processus, 80 chaînes, 12 frontières et 24 agrégats sans dégradation perceptible | Indispensable | Jeu d'essai dimensionné à cette volumétrie, décidée le 2026-09-21 |
| **NFR-03** | Continuité               | Une interruption du service ne détruit aucun contenu déjà produit, et le dernier export reste exploitable  | Indispensable | Essai de coupure pendant une phase de contribution  |
| **NFR-04** | Reprise                  | Un participant qui perd sa connexion retrouve la séance à l'état courant, sa saisie en cours préservée      | Indispensable | Essai de déconnexion et reconnexion                 |
| **NFR-05** | Accessibilité            | WCAG 2.2 niveau AA, parcours de contribution intégralement utilisable au clavier, cibles d'au moins 24 pixels, fonctionnement préservé à 200 pour cent de zoom | Indispensable | Audit sur le parcours de contribution et d'ordonnancement |
| **NFR-06** | Accessibilité            | Aucune information n'est portée par la seule couleur : type, statut de preuve et origine portent forme, libellé ou bordure | Indispensable | Revue de conception et essai en nuances de gris     |
| **NFR-07** | Perception               | Étape courante, temps restant et signalements sont annoncés comme régions vivantes aux lecteurs d'écran    | Souhaitable   | Essai avec lecteur d'écran                          |
| **NFR-08** | Performance d'interface  | Une saisie rend la main en moins de 100 millisecondes, la navigation sur le mur reste fluide à la volumétrie de NFR-02 | Indispensable | Mesure sur poste de référence bas de gamme          |
| **NFR-09** | Sécurité                 | L'accès conduisant la séance passe par GitHub ou OIDC ; le code de séance est limité à la durée de la séance et révocable | Indispensable | Revue de conception                                 |
| **NFR-10** | Confidentialité          | La transcription est purgée à la clôture de la séance, une fois la restitution produite. Les extraits déjà rattachés à un élément demeurent dans le modèle | Indispensable | Essai de purge, et vérification que la traçabilité survit |
| **NFR-11** | Traitement automatisé    | Le traitement du contenu par un service tiers est limité à la transcription et à la production de propositions ; il ne produit jamais une décision, une frontière ni un agrégat | Indispensable | Revue de conception, PP-08                          |
| **NFR-12** | Restitution              | Le fichier de restitution est lisible sans outil spécifique, déterministe et versionnable                  | Indispensable | Deux restitutions successives comparées             |
| **NFR-13** | Portabilité              | Le modèle sort du produit sans perte sémantique et sans format propriétaire                                | Indispensable | Reprise manuelle du fichier sur un support tiers    |
| **NFR-14** | Poste et navigateur      | Fonctionnement sur les navigateurs courants à jour, sans installation, sur des postes hétérogènes en distanciel | Indispensable | Matrice de compatibilité à établir                  |
| **NFR-15** | Langue                   | L'interface est en français et emploie le vocabulaire du domaine assurance, jamais le seul vocabulaire de la méthode | Indispensable | Revue de contenu                                    |
| **NFR-16** | Observabilité            | Chaque opération est journalisée avec son auteur, sa phase et son horodatage, aux fins des indicateurs      | Indispensable | Export des mesures, PR-120                          |

**Ce que ces exigences ne couvrent pas.** Aucune exigence de tenue à la charge au-delà de la séance, aucune exigence de disponibilité exprimée en pourcentage, et aucune exigence de reprise après sinistre. Le produit sert une séance conduite, protégée par le repli non logiciel de la feature F-18, et non un service continu. Ce choix est cohérent avec l'acceptation du risque de ressource unique au niveau programme.

## 7. Modèle de données et contrats

Cette section décrit ce que le produit manipule et ce qu'il produit. Elle ne décrit aucune implémentation.

### 7.1 Entités

| Entité                      | Attributs déterminants                                                                                  | Relations                                            |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| **Séance**                  | Nom, domaine, dates, effectif, code, état, modèle de déroulé, intention et périmètre du domaine          | Contient phases, participants, éléments              |
| **Phase**                   | Rang, journée, titre, durée, question, résultat attendu, phrase de lancement, consigne, pièges, critère de sortie, état | Appartient à une séance                              |
| **Participant**             | Nom affiché, rôle applicatif, rôle métier, état de contribution                                          | Auteur d'éléments                                    |
| **Élément**                 | Type, texte, auteur d'origine, dernier modificateur, horodatage, statut de preuve, origine, formulation d'origine, moment, frontière, doublon, état supprimé | Rattaché à un moment, à une frontière, à un extrait  |
| **Moment**                  | Nom, rang, état de revue                                                                                  | Contient des éléments                                |
| **Écart de récit**          | Élément concerné, autre version, auteur, passe, état ouvert, reformulé, tranché, point chaud             | Rattaché à un élément                                |
| **Processus**               | Nom, motif de sélection                                                                                   | Contient des chaînes                                 |
| **Chaîne**                  | Commande, événement produit, politique, acteur, information consultée, système ou agrégat                | Relie des éléments existants                         |
| **Variante**                | Point d'origine, déroulement, processus                                                                   | Rattachée à un processus                             |
| **Terme**                   | Libellé, définition, zone d'application, état retenu ou proposé, ambiguïté, auteur, phase                | Rattaché à une frontière quand elle existe           |
| **Hypothèse de découpage**  | Nom, auteur, statut, motif de rejet                                                                       | Contient des frontières                              |
| **Contexte candidat**       | Nom métier, responsabilité, langage, niveau de confiance, indices déclarés, statut                        | Contient éléments et agrégats                        |
| **Indice**                  | Type parmi huit, éléments qui le fondent, état contesté                                                   | Rattaché à un contexte candidat                      |
| **Dépendance**              | Nom, sens, contexte responsable, ambiguïté de responsabilité                                              | Relie deux contextes candidats                       |
| **Invariant**               | Énoncé métier, statut de validation, auteur, date                                                        | Relié à des commandes et des événements              |
| **Agrégat candidat**        | Nom, intention, commandes acceptées, invariants protégés, événements émis, informations consultées       | Rattaché à un contexte candidat                      |
| **Proposition**             | Type, texte, extrait, locuteur, horodatage, niveau de confiance, échéance de péremption                  | Devient un élément si adoptée                        |
| **Extrait de transcription**| Locuteur, horodatage, citation. Survit à la purge de la transcription dont il provient                    | Origine d'un élément ou d'une proposition            |
| **Vote**                    | Sujet, votant, points, état ouvert ou clos                                                                | Rattaché à une session de vote                       |
| **Décision**                | Objet, sens, motif, date, composition de la séance                                                        | Rattachée à une hypothèse, un contexte, un invariant |
| **Opération**               | Nature, auteur, horodatage, état antérieur                                                                | Rattachée à un élément                               |

### 7.2 Types d'éléments et grammaire

Huit types d'éléments. Chaque type porte un libellé textuel, une couleur indicative et une consigne de formulation.

**Décision du Product Owner du 2026-09-21.** Ces huit types constituent la notation de référence du produit. Cette décision clôt MQ-10, ouverte depuis le document d'exigences métier, et stabilise la feature F-05 dans son ensemble.

| Type             | Consigne de formulation               | Règle déterministe appliquée à la saisie                                          |
|------------------|----------------------------------------|-------------------------------------------------------------------------------------|
| **Événement**    | Au passé                               | Forme passée attendue. Un premier mot à l'infinitif est signalé comme probable commande. Trois mots ou moins est signalé comme trop général |
| **Commande**     | À l'infinitif                          | Le premier mot doit être un infinitif                                              |
| **Acteur**       | Un rôle, pas un nom                    | Au-delà de trois mots, signalé comme phrase plutôt que rôle                         |
| **Règle**        | Dès que … alors …                      | Le motif « dès que » et « alors » doit être présent                                 |
| **Information**  | Ce qu'il faut voir pour décider        | Aucune règle automatique                                                            |
| **Système**      | Une boîte noire                        | Aucune règle automatique                                                            |
| **Point chaud**  | Un désaccord, une question             | Aucune règle automatique                                                            |
| **Opportunité**  | Une amélioration entrevue              | Aucune règle automatique                                                            |

**Aucune de ces règles n'empêche une saisie.** Elles produisent un signalement privé adressé au seul auteur, selon les exigences PR-025 à PR-029.

**Les règles sont déterministes**, elles n'appellent aucun traitement automatisé du contenu. C'est ce qui les rend utilisables pendant la séance, sans latence et sans dépendance externe.

### 7.3 Statuts de preuve

Sept statuts, repris du document d'exigences métier.

| Statut                        | Signification                                                              |
|-------------------------------|-----------------------------------------------------------------------------|
| Observé dans la parole métier | L'élément provient d'un extrait de transcription identifié                 |
| Reformulé et validé           | L'élément a été reformulé et la formulation retenue par le groupe          |
| Hypothèse                     | Proposé, non tranché. Statut par défaut d'un contexte candidat             |
| Désaccord                     | Deux versions coexistent sans arbitrage                                    |
| Décision                      | Tranché par le groupe en séance, avec date et composition                  |
| Proposition automatique       | Issu de la couche fantôme, non encore adopté                               |
| À vérifier                    | Formulé, mais non confirmé par le métier. Statut par défaut d'un invariant |

### 7.4 Chaînes canoniques

Deux enchaînements structurent le Process Modelling et servent de guide de complétion.

| Chaîne                | Enchaînement                                                                                     |
|-----------------------|--------------------------------------------------------------------------------------------------|
| Décision d'un acteur  | Événement → Information lue → Acteur → Commande → Agrégat ou système → Événement                  |
| Décision d'une règle  | Événement → Politique « dès que … alors … » → Commande → Agrégat ou système → Événement           |

Une chaîne incomplète est visible, jamais bloquante. Le critère de sortie de la phase 7 s'appuie sur la complétude du maillon déclencheur, politique ou acteur informé.

### 7.5 Chaîne de traçabilité

Huit maillons séparent la parole métier de l'agrégat candidat. Chaque maillon est produit par une feature et consommé par la suivante.

| # | Maillon                     | Produit par        | Consommé par         |
|---|-----------------------------|--------------------|-----------------------|
| 1 | Parole métier               | F-15               | F-15, F-16            |
| 2 | Fait métier                 | F-04               | F-06, F-07, F-08      |
| 3 | Chronologie et causalité    | F-06, F-08, F-10   | F-13, F-10            |
| 4 | Langage et tension          | F-12, F-07         | F-13                  |
| 5 | Frontière candidate         | F-13               | F-13, F-14            |
| 6 | Scénario raffiné            | F-10, F-11         | F-14                  |
| 7 | Invariant                   | F-14               | F-14                  |
| 8 | Agrégat candidat            | F-14               | F-17                  |

Les statuts de preuve et le journal des décisions, portés par F-16, sont transverses aux huit maillons.

### 7.6 Indices de frontière recevables

Huit indices, repris du document d'exigences métier. Chacun se rattache à des éléments du modèle, ce qui le rend vérifiable.

| Indice                                                          | Origine dans le modèle                       |
|------------------------------------------------------------------|-----------------------------------------------|
| Changement de vocabulaire ou de sens d'un même terme             | Langage pivot, F-12                          |
| Changement de règle métier                                       | Politiques rattachées aux chaînes, F-10      |
| Changement de rythme ou de temporalité                           | Chronologie, F-06                            |
| Changement de responsabilité, d'équipe ou d'autorité             | Acteurs rattachés, F-08                      |
| Rupture dans le cycle de vie d'une information                   | Informations consultées, F-10                |
| Dépendance externe ou contrainte réglementaire                   | Systèmes externes, F-08                      |
| Point de tension ou désaccord durable                            | Points chauds et écarts de récit, F-07, F-08 |
| Forte cohésion interne et interactions explicites vers l'extérieur | Mesures, F-13                              |

### 7.7 Format de restitution

Le fichier produit est du Markdown. Sa structure est normative : elle conditionne la reprise manuelle en mode de repli et la comparaison entre deux versements.

| Section                      | Contenu                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------|
| En-tête                      | Domaine, séance, dates, effectif, format, étapes validées sur neuf, mention de la grammaire appliquée |
| Chronologie                  | Un niveau par moment, ses événements avec leur extrait source, puis ses acteurs et systèmes  |
| Processus déroulés           | Un niveau par processus, ses chaînes commande vers événement, avec règle, acteur, information et système |
| Points chauds restants       | Les points chauds non résolus                                                                |
| Écarts entre récits          | L'élément, l'état de l'écart, l'autre version, la formulation d'origine, la passe et le narrateur |
| Chemins alternatifs          | Les variantes et leur point d'origine                                                        |
| Découpage                    | Un niveau par contexte candidat, ses agrégats, ses événements                                |
| Tranches verticales          | Commande, événement produit, contexte et acteur, pour chaque chaîne des processus retenus    |
| Langage pivot                | Les termes, leur définition, l'état retenu ou proposé, la phase et la personne qui l'a énoncée |
| Mesures de découpage         | Liens traversants, événements orphelins, acteurs multi-frontières, et le détail de chaque lien traversant |
| Traçabilité                  | Part des éléments rattachés à un extrait, et la liste de ces rattachements                   |
| Journal des décisions        | Objet, motif, date et composition de la séance. **Ajouté par ce document**, voir PR-098      |
| Invariants à valider         | Les invariants au statut à vérifier. **Ajouté par ce document**, voir PR-088                 |

Deux versements successifs d'un modèle inchangé produisent deux fichiers identiques, octet pour octet.

### 7.8 Règles d'intégrité

| Règle                                                                                    | Exigences concernées   |
|--------------------------------------------------------------------------------------------|------------------------|
| Une frontière, une zone ou une hypothèse n'altère jamais le modèle                          | PR-070, PR-071, PR-079 |
| Un agrégat sans invariant n'existe pas, ou existe marqué incomplet                          | PR-085                 |
| Un élément adopté depuis une proposition conserve son extrait source, y compris après modification | PR-093            |
| Une suppression est réversible et tracée                                                     | PR-021                 |
| Un élément regroupé comme doublon conserve ses deux auteurs                                  | PR-037                 |
| Une reformulation conserve la formulation d'origine                                          | PR-022                 |
| Un changement de statut conserve l'état antérieur                                            | PR-096                 |
| Le raffinement d'un scénario n'altère pas la chronologie source                              | PR-055, PR-061         |

## 8. Mesures de succès et instrumentation

### 8.1 Ce que le produit doit produire, indicateur par indicateur

| Indicateur | Ce qu'il mesure                                                     | Donnée que le produit doit produire                                             | Exigences         | Affiché en séance |
|------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------|-------------------|-------------------|
| **KPI-01** | Reconnaissance du modèle par chaque expert métier                    | Aucune. Déclaration individuelle recueillie en clôture, hors produit             | —                 | Non               |
| **KPI-02** | Capacité à engager la suite sans nouvelle session                    | Aucune. Jugement de l'architecte et du responsable de programme                  | —                 | Non               |
| **KPI-03** | Position des porteurs de la méthode parmi les contributeurs          | Décompte d'éléments par auteur d'origine, calculé après la séance                | PR-019, PR-117    | **Non**           |
| **KPI-04** | Part des participants ayant produit un élément retenu                | Nombre de contributeurs distincts sur 22 contributeurs possibles                 | PR-019, PR-117    | **Non**           |
| **KPI-05** | Sollicitations d'aide méthodologique par le facilitateur             | Décompte des consultations de la notation et des pièges depuis le panneau de conduite | PR-030, PR-008 | Facilitateur seul |
| **KPI-06** | Part des éléments rattachés à un extrait de transcription            | Nombre d'éléments portant un extrait source, sur le total des éléments proposés  | PR-090, PR-093, PR-119 | Facilitateur seul |
| **KPI-07** | Recours au mode de conduite indépendant                              | Aucune. Constat du responsable de programme                                      | —                 | Non               |
| **KPI-08** | Frontières retenues justifiées par une mesure                        | Frontières portant au moins une mesure consultée et un indice déclaré            | PR-072, PR-075    | Oui, phase 9      |
| **KPI-09** | Continuité de la représentation entre les parties du domaine         | Événements orphelins et moments sans acteur ni système                           | PR-072, PR-048    | Oui               |
| **KPI-10** | Part des événements validés ou explicitement contestés               | Éléments portant un statut de preuve autre que celui par défaut                  | PR-095            | Non               |
| **KPI-11** | Points de tension critiques sans décision ni propriétaire            | Points chauds ouverts et écarts de récit non tranchés                            | PR-041, PR-046    | Oui               |
| **KPI-12** | Part des frontières disposant d'au moins deux indices                | Compteur d'indices par frontière                                                 | PR-075, PR-076    | Oui, phase 9      |
| **KPI-13** | Part des dépendances décrites et nommées                             | Dépendances nommées sur liens traversants mesurés                                | PR-078            | Oui, phase 9      |
| **KPI-14** | Part des agrégats associés à un invariant explicite                  | Agrégats portant au moins un invariant                                           | PR-085, PR-087    | Oui, séance de conception |
| **KPI-15** | Traçabilité complète d'un échantillon, de la parole à l'agrégat      | Chaînes complètes et ruptures signalées                                          | PR-099, PR-100    | Oui               |
| **KPI-16** | Nombre de rôles distincts ayant validé une part du modèle            | Décisions enregistrées avec la composition de la séance                          | PR-098            | Non               |

### 8.2 Règle d'affichage

**Aucun classement de contributeurs n'est visible pendant la séance.** KPI-03 et KPI-04 sont calculés après. Le panneau du facilitateur montre l'activité et les silences, jamais un rang. Cette règle découle de la décision du 2026-08-11 et est portée par PR-117.

**Population de référence, décidée le 2026-09-21.** Les cibles restent exprimées en pourcentage et s'appliquent à toute séance. Le nombre de contributeurs possibles est saisi à la création de la séance, facilitateur exclu : 22 pour un atelier à 23 personnes, ce qui porte la cible de KPI-04 à 18 sur 22, soit 82 pour cent.

Les indicateurs de qualité du résultat, famille C, sont au contraire affichés pendant la séance lorsqu'ils portent sur le modèle et non sur les personnes : un compteur d'indices ou un décompte de points chauds ouverts sert la conduite.

### 8.3 Ce qui n'est pas mesuré, et pourquoi

| Absence                                                           | Motif                                                                   |
|--------------------------------------------------------------------|--------------------------------------------------------------------------|
| Aucun gain par rapport à un atelier sans outil                     | Renoncement acté à constituer une référence de comparaison               |
| Aucune couverture d'un processus de référence                      | Aucun processus partagé du domaine ne préexiste à l'atelier              |
| Aucun seuil d'alerte pour KPI-06, KPI-07 et KPI-08                 | Décision du 2026-08-08, reconduite                                       |
| Aucune mesure de qualité du modèle produit par le produit lui-même | Le jugement de qualité appartient au groupe, PP-07                       |

### 8.4 Mesures d'usage propres au produit

**Retenues par le Product Owner le 2026-09-21.** Elles éprouvent quatre des cinq hypothèses fondatrices, que rien d'autre ne mesure.

| Mesure                                                        | Ce qu'elle renseigne                                              |
|---------------------------------------------------------------|---------------------------------------------------------------------|
| Part des propositions de la couche fantôme adoptées           | Confiance du groupe dans l'enrichissement assisté, hypothèse HY-05 |
| Nombre de signalements de notation écartés par leur auteur    | Pertinence des règles déterministes, hypothèse HY-03               |
| Durée réelle de chaque phase comparée à sa durée prévue        | Justesse de l'instanciation du déroulé                             |
| Nombre de retours à une étape antérieure                       | Caractère non tunnel du parcours en usage réel                     |
| Part des éléments produits pendant les phases d'écriture silencieuse | Effet de la contribution écrite sur la participation, hypothèse HY-02 |

## 9. Plan de livraison

### 9.1 Les trois jalons

| Jalon  | Intitulé                        | Ce qui doit être possible à son terme                                                     | Population       |
|--------|---------------------------------|---------------------------------------------------------------------------------------------|------------------|
| **L1** | Atelier de domaine              | Conduire les huit phases d'un atelier de deux jours, jusqu'à 23 participants, et en sortir un modèle exporté | P1 à P5          |
| **L2** | Séance de conception            | Poser des frontières argumentées, formuler des invariants, en déduire des agrégats et remonter jusqu'à la parole | P4, P6, Product Owner |
| **L3** | Reprise et industrialisation    | Reprendre une séance suspendue, conserver l'historique au-delà de l'outil, administrer la rétention | À décider, voir QP-04 |

Aucun jalon n'est rattaché à une date. L1 vise la prochaine session ouverte, quelle qu'elle soit, et L2 la séance de conception qui la suit.

**L3 est conditionnel.** Il ne s'engage qu'après la décision sur le devenir de l'outil. Les exigences qui s'y rattachent ne sont pas spécifiées dans ce document. La décision du 2026-09-21, qui acte d'autres séquences et d'autres sessions, rend son hypothèse plus probable sans l'engager : la reprise d'une séance suspendue et la conservation de l'historique deviendront un besoin dès qu'une session en suivra une autre sur le même domaine.

### 9.2 Contenu par jalon

| Feature | L1                                        | L2                                        | L3               |
|---------|-------------------------------------------|-------------------------------------------|------------------|
| F-01    | Complet, hors gestion fine des rôles      | Rôle équipe de conception                 | Administration   |
| F-02    | Complet sauf PR-012                       | PR-012                                    | —                |
| F-03    | Complet                                   | —                                         | —                |
| F-04    | Complet sauf PR-023                       | PR-023                                    | —                |
| F-05    | Complet                                   | —                                         | —                |
| F-06    | Complet sauf PR-036                       | PR-036                                    | —                |
| F-07    | Complet                                   | —                                         | —                |
| F-08    | Complet                                   | —                                         | —                |
| F-09    | Complet                                   | —                                         | —                |
| F-10    | Complet                                   | —                                         | —                |
| F-11    | Complet sauf PR-063                       | PR-063                                    | —                |
| F-12    | PR-065, PR-066                            | PR-067, PR-068, PR-069                    | —                |
| F-13    | —                                         | Complet                                   | —                |
| F-14    | —                                         | Complet                                   | —                |
| F-15    | Complet                                   | —                                         | —                |
| F-16    | PR-095 sur les éléments produits          | Complet                                   | Historique restitué |
| F-17    | PR-101 à PR-106                           | Journal des décisions et invariants à valider dans l'export | —  |
| F-18    | Complet                                   | —                                         | —                |
| F-19    | PR-111, PR-112, PR-113, PR-115            | PR-114, PR-116                            | —                |
| F-20    | PR-117, PR-118, PR-119                    | PR-120                                    | —                |

### 9.3 Ordre de réalisation de L1

**DP-06.** L'ordre de priorité du document d'exigences métier plaçait la conduite de l'atelier au huitième rang sur onze, au motif que le repli non logiciel couvrait le même besoin sans développement. Cet ordre n'est pas reconductible : le produit est désormais construit autour du déroulé, chaque phase déterminant le mode du mur, les types proposés et le critère de sortie. Rien ne se construit avant lui.

| Rang | Feature            | Motif                                                                                 | Rang au document d'exigences |
|------|--------------------|-----------------------------------------------------------------------------------------|------------------------------|
| 1    | F-01               | Sans séance, sans rôle et sans identité, aucune contribution n'est attribuable          | Absent, création             |
| 2    | F-02, F-03         | Le déroulé porte la structure de tout le reste                                          | 8                            |
| 3    | F-04, F-05         | Sans faits métier, aucun autre domaine n'a d'objet                                      | 1                            |
| 4    | F-17, F-18         | Protection du jalon. L'export doit exister avant tout incident                          | 2 et 7                       |
| 5    | F-06               | Un mur non ordonné ne produit aucune découverte                                         | 3                            |
| 6    | F-07               | Le récit est le seul moment où le groupe valide ce qu'il a produit                      | 4                            |
| 7    | F-08               | L'enrichissement explicite les causalités                                               | 5                            |
| 8    | F-10, F-11         | Livrable principal des deux jours                                                       | 10                           |
| 9    | F-12               | Un changement de sens non capté ne se retrouve pas                                      | 4                            |
| 10   | F-19               | Sans stratégie de densité, le mur devient inutilisable à la volumétrie réelle           | Absent                       |
| 11   | F-20               | Les indicateurs ne se reconstituent pas après coup                                      | 7                            |
| 12   | F-15               | L'enrichissement assisté ne conditionne aucune autre capacité                           | 9                            |
| 13   | F-09               | Le vote est un confort de priorisation, aucune phase n'en dépend                        | 4                            |

Cette révision est à confirmer par le Product Owner, elle modifie un ordre validé le 2026-08-10 puis révisé le 2026-08-11.

### 9.4 Chemin critique

| Dépendance                                                        | Conséquence si elle n'est pas tenue                                  |
|--------------------------------------------------------------------|------------------------------------------------------------------------|
| F-02 avant toute feature de phase                                  | Aucune phase ne peut ouvrir ni fermer, le produit n'a pas de squelette |
| F-04 avant F-06, F-07, F-08 et F-10                                | Aucun élément à ordonner, raconter, enrichir ni rattacher             |
| F-06 avant F-10                                                     | Les chaînes se construisent sur des événements situés dans un moment  |
| F-08 et F-10 avant F-13                                             | Sans acteurs ni chaînes, les mesures de découpage n'ont pas de graphe |
| F-13 avant F-14                                                     | Un agrégat se rattache à un contexte candidat                         |
| F-15 après F-04                                                     | Une proposition adoptée devient un élément ordinaire                  |
| F-17 le plus tôt possible                                           | Sans export, aucune bascule vers le repli ne préserve la matière      |

### 9.5 Conditions de mise en service d'une séance

Liste à satisfaire avant l'ouverture d'un atelier, quel qu'en soit le jalon.

- [ ] Répétition à blanc complète conduite par le facilitateur, sur un domaine trivial
- [ ] Essai de contribution simultanée à vingt-trois postes réalisé
- [ ] Export produit, téléchargé et repris manuellement sur le support de repli
- [ ] Déroulé d'atelier disponible sous forme de document autonome et confirmé par le facilitateur
- [ ] Décision de bascule rendue par le responsable de programme à J-5
- [ ] Codes de séance créés, et modalité de diffusion en séance arrêtée
- [ ] Jeu de données de démonstration purgé de la séance réelle
- [ ] Conservation de la transcription annoncée et acceptée par les participants

### 9.6 Ordre de réduction en cas d'arbitrage

Si le contenu de L1 doit être réduit, les features tombent dans l'ordre inverse du rang de la section 9.3. Ce qui tombe en premier :

| Ordre de retrait | Feature | Ce que le retrait coûte                                                              |
|------------------|---------|-----------------------------------------------------------------------------------------|
| 1                | F-09    | La priorisation des sujets se fait à la voix, comme aujourd'hui                        |
| 2                | F-15    | L'objectif BO-04 n'est plus servi qu'à moitié, la transcription reste conservée mais n'alimente rien |
| 3                | F-20    | Les indicateurs KPI-03, KPI-04 et KPI-06 ne sont pas renseignables                     |
| 4                | F-12    | L'indice de frontière le plus fiable est perdu pour la séance de conception            |

**Rien en deçà.** Le retrait d'une feature de rang 8 ou moins empêche une phase de se tenir, ce qui revient à ne pas livrer L1.

## 10. Risques produit

| ID         | Risque                                                                                      | Sévérité | Parade portée par le produit                                              | Risque résiduel                                            |
|------------|---------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------|-------------------------------------------------------------|
| **RP-01**  | Une seule personne réalise le produit, et la base de code repart de zéro                    | Élevée   | Aucune. Le repli non logiciel, F-18, protège le jalon et non le produit     | Entier, accepté au niveau programme                         |
| **RP-02**  | Le produit n'est pas prêt le jour de la séance                                              | Élevée   | F-18, décision de bascule rendue à J-5                                      | La séance se tient sans outil, les objectifs BO-04 et BO-09 sont manqués |
| **RP-03**  | Le mur devient illisible à plusieurs centaines d'éléments en distanciel                     | Élevée   | F-19, divulgation progressive, filtres, vues personnelles, zoom sémantique  | La volumétrie retenue le 2026-09-21, 800 éléments, double la cible initiale et renforce l'exigence sur F-19 |
| **RP-04**  | La collecte se détourne vers les commandes et les solutions                                 | Élevée   | PR-018, PR-025, mode collecte restreint aux événements                      | Dépend de la tenue du facilitateur autant que du produit    |
| **RP-05**  | Un signalement de notation fait taire un expert métier pour la journée                      | Élevée   | PR-026, PR-027, signalement privé, muet en collecte, formulé en question    | Non éprouvé auprès d'un expert réel, hypothèse HY-03        |
| **RP-06**  | Le blocage du passage d'étape dépossède le facilitateur de son arbitrage                    | Moyenne  | PR-015, dépassement explicite, distinct de la validation et toujours disponible | Un facilitateur qui ignore le dépassement subit le blocage. La formulation de l'action est déterminante |
| **RP-07**  | Une zone tracée sur le mur passe pour une frontière décidée                                 | Élevée   | PR-076, marquage non étayée, indices avant mesures, statut hypothèse par défaut | Absent de la maquette, à construire en L2                |
| **RP-08**  | Un agrégat est déduit d'un regroupement visuel plutôt que d'une règle                       | Élevée   | PR-085, PR-086, création strictement refusée sans invariant, nom verrouillé | Le refus déplace le risque sur la qualité de l'invariant formulé pour débloquer la création |
| **RP-09**  | La chaîne de traçabilité se rompt entre l'atelier et la séance de conception                | Élevée   | PR-099, PR-100, navigation bidirectionnelle et ruptures signalées           | Délai borné à deux semaines le 2026-09-21, ce qui réduit le risque sans l'annuler |
| **RP-10**  | Une équipe technique valide seule des règles métier                                         | Élevée   | PR-084, statut à vérifier par défaut, PR-088, liste transmissible au métier | Suppose la présence effective d'un représentant métier      |
| **RP-11**  | Les hypothèses de découpage prolifèrent, sans limite de création                            | Élevée   | PR-079, une seule tracée à la fois, deux au plus en comparaison             | À construire en L2                                          |
| **RP-12**  | Chacun ayant sa propre vue, le groupe cesse de regarder la même chose                       | Moyenne  | PR-114, focus collectif et repère de ce que le groupe regarde               | Le focus ne peut jamais interrompre une saisie, ce qui limite son effet |
| **RP-13**  | Les cinq hypothèses fondatrices restent non validées auprès des utilisateurs                | Élevée   | Aucune. Relève de l'action de confirmation du document d'exigences métier   | Entier tant que les six rôles n'ont pas été interrogés      |
| **RP-14**  | L'historique des opérations disparaît avec l'outil                                          | Faible   | PR-023 le conserve pendant la vie du produit, la restitution ne l'inclut pas | Assumé, décision du 2026-08-10                             |
| **RP-15**  | Des contenus métier assurantiels sont traités sans durée de conservation décidée            | Moyenne  | PR-106, conservation paramétrable                                           | La durée n'est pas fixée, QP-03                             |
| **RP-16**  | Le produit passe pour un outil de restitution plutôt que de découverte                      | Moyenne  | PP-01, PP-07, aucune proposition de découpage, aucune animation automatisée | Dépend de la conduite en séance                             |

## 11. Hypothèses, décisions et questions

### 11.1 Hypothèses produit

Ces hypothèses portent le document. Aucune n'a été confrontée à un utilisateur réel.

| ID        | Hypothèse                                                                                  | Origine | Exigences exposées            |
|-----------|----------------------------------------------------------------------------------------------|---------|-------------------------------|
| **HP-01** | La mobilisation du porteur de la méthode par la mécanique est la difficulté dominante        | HY-01   | Ensemble du document          |
| **HP-02** | La contribution écrite débloque la participation des experts métier                          | HY-02   | F-04, F-09                    |
| **HP-03** | Un contrôle de notation par règles déterministes apporte une valeur perceptible               | HY-03   | F-05                          |
| **HP-04** | Le facilitateur peut conduire l'atelier au moyen d'un déroulé écrit et affiché                | HY-04   | F-02, F-03, F-18              |
| **HP-05** | Le groupe accepte des propositions automatiques sans se sentir dépossédé                     | HY-05   | F-15                          |
| **HP-06** | Une saisie en colonne fixe soutient la contribution continue mieux qu'une fenêtre modale      | HU-01   | PR-017                        |
| **HP-07** | Le facilitateur a besoin d'une phrase à énoncer, pas seulement d'un titre d'étape             | HU-03   | PR-007                        |
| **HP-08** | Reporter le contrôle de notation après la collecte augmente le volume sans dégrader la qualité | HU-08  | PR-027, PR-028                |
| **HP-09** | Déclarer un indice de frontière en un geste est plus fiable que le reconstituer après coup    | HU-09   | PR-075                        |
| **HP-10** | Un marquage « non étayée » incite à argumenter plutôt qu'à renoncer                           | HU-10   | PR-076                        |
| **HP-11** | Refuser un agrégat sans invariant est perçu comme une aide et non comme un blocage            | HU-12   | PR-085                        |
| **HP-12** | Un blocage assorti d'un dépassement explicite protège la méthode sans déposséder le facilitateur | Création | PR-013, PR-015               |
| **HP-13** | Masquer les contributions des autres pendant l'écriture silencieuse augmente la diversité des faits produits | Création | PR-024            |

### 11.2 Décisions produit prises dans ce document

| ID        | Décision                                                                                   | Motif                                                                      | Statut          |
|-----------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|-----------------|
| **DP-01** | Le facilitateur ne contribue pas au contenu, le dénominateur de participation est 22         | Décision du 2026-08-12                                                      | Confirmée le 2026-09-21 |
| **DP-02** | Aucun rôle n'emporte de droit de décision sur le modèle                                      | Règle d'autorité du document d'exigences métier                             | Reprise         |
| **DP-03** | Le code existant n'est pas retenu comme socle de réalisation                                  | Décision du Product Owner du 2026-09-21                                     | Prise           |
| **DP-04** | Un critère de sortie s'affiche toujours avec son état chiffré                                 | Un critère binaire ne dit pas ce qu'il reste à faire                        | Prise           |
| **DP-05** | Le passage d'étape est bloqué tant que le critère n'est pas atteint, avec dépassement explicite et tracé | Protège la méthode sans retirer la décision au facilitateur                 | Prise le 2026-09-21 |
| **DP-06** | L'ordre de réalisation est révisé, la conduite passe du huitième au deuxième rang             | Le produit est construit autour du déroulé                                  | Confirmée le 2026-09-21 |
| **DP-07** | La restitution de référence est un fichier Markdown déterministe, versé dans `event2spec` sous `docs/sessions/` | Lisible sans outil, comparable, reprenable manuellement en mode de repli    | Confirmée le 2026-09-21 |
| **DP-08** | Le produit est spécifié comme multi-séances, avec liste, création et codes de séance          | La maquette le démontre, et d'autres séquences et sessions sont prévues     | Confirmée le 2026-09-21 |

### 11.3 Questions

**Aucune question ouverte au 2026-09-21.** Les douze questions du document ont été tranchées, huit décisions produit sont confirmées, et les douze écarts de l'annexe A sont arbitrés. Ce qui reste à faire relève de l'exécution, section 13, et non de la décision.

| ID        | Question                                                                                   | Réponse                                                                     |
|-----------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **QP-01** | Comment les cibles d'indicateurs se reconduisent-elles d'une session à l'autre ?             | **Population saisie à chaque séance**, le 2026-09-21. Les cibles restent en pourcentage, le dénominateur est renseigné à la création. Voir PR-004 et PR-117 |
| **QP-02** | Quelle volumétrie de modèle faut-il tenir ?                                                  | **800 éléments et 20 moments**, le 2026-09-21. Clôt MQ-03. Voir NFR-02       |
| **QP-03** | Quelle durée de conservation pour les transcriptions ?                                       | **Purge à la clôture de chaque séance**, le 2026-09-21, les extraits rattachés demeurant. Clôt MQ-04 et Q-04. Voir NFR-10 et PR-106 |
| **QP-04** | À quelle échéance se tient la séance de conception ?                                         | **Dans les deux semaines suivant l'atelier**, le 2026-09-21. Clôt QU-17      |
| **QP-05** | Les mesures d'usage de la section 8.4 sont-elles retenues ?                                  | **Les cinq**, le 2026-09-21. Voir PR-120                                    |
| **QP-06** | Le produit sert-il hors d'une séance conduite ?                                              | **Consultation et préparation seulement**, le 2026-09-21. Aucune contribution au mur hors phase ouverte. Voir section 3.2 et PR-065 |
| **QP-07** | Le blocage du passage d'étape est-il retenu ?                                                | **Oui**, le 2026-09-21, jusqu'à ce que quelqu'un décide d'aller plus loin par une action explicite et tracée. Voir DP-05 et PR-015 |
| **QP-08** | Le masquage des contributions des autres en exploration chaotique est-il retenu ?            | **Oui**, le 2026-09-21, comportement de la maquette retenu. Voir PR-024      |
| **QP-09** | Quel dépôt accueille les restitutions ?                                                      | **`event2spec`, sous `docs/sessions/`**, une branche par séance, le 2026-09-21. Voir PR-105 |
| **QP-10** | La notation de référence est-elle celle des huit types de la section 7.2 ?                   | **Oui**, le 2026-09-21. Clôt MQ-10, ouverte depuis le document d'exigences métier |
| **QP-11** | L'ordre de réalisation révisé est-il validé ?                                                | **Oui**, le 2026-09-21. Voir DP-06 et la section 9.3                        |
| **QP-12** | Les objectifs BO-08 à BO-10 et les cibles de la famille C sont-ils confirmés ?               | **Confirmés tels quels**, le 2026-09-21. Clôt l'action AC-14 du document d'exigences métier |

**Le jalon des 15 et 16 septembre ne conditionne plus le document**, décision du 2026-09-21 : d'autres séquences et sessions suivront, et cette date n'est plus l'ancrage du produit.

**Ce qui reste incertain n'est plus une question mais une hypothèse.** Les treize hypothèses de la section 11.1 ne se lèvent par aucune décision : seules les personnes concernées peuvent les confirmer, ce que porte l'action AP-06.

## 12. Traçabilité

### 12.1 Exigences métier vers exigences produit

| Exigence métier | Exigences produit                               | Couverture |
|-----------------|--------------------------------------------------|------------|
| BR-001          | PR-004, PR-006, PR-007, PR-008, PR-111           | Complète   |
| BR-002          | PR-009, PR-010, PR-011                            | Complète   |
| BR-003          | PR-012                                            | Complète   |
| BR-004          | PR-017, PR-018, PR-042                            | Complète   |
| BR-005          | PR-009, PR-016                                    | Complète   |
| BR-006          | PR-050, PR-051, PR-052, PR-053                    | Complète   |
| BR-007          | PR-019, PR-020, PR-021, PR-023, PR-117, PR-120    | Complète   |
| BR-008          | PR-025, PR-026, PR-027, PR-028, PR-029            | Complète   |
| BR-009          | PR-018, PR-026                                    | Complète   |
| BR-010          | PR-030, PR-046                                    | Complète   |
| BR-011          | PR-089, PR-106                                    | Complète, **BR-011 à amender** : son critère « la transcription reste consultable après l'atelier » est contredit par la purge décidée le 2026-09-21 |
| BR-012          | PR-073, PR-083, PR-090, PR-093, PR-099, PR-100    | Complète   |
| BR-013          | PR-064, PR-101, PR-102, PR-103, PR-104, PR-105    | Complète   |
| BR-014          | PR-089, PR-090, PR-091                            | Complète   |
| BR-015          | PR-094                                            | Complète   |
| BR-016          | PR-092, PR-103                                    | Complète   |
| BR-017          | PR-070, PR-071                                    | Complète   |
| BR-018          | PR-072, PR-073, PR-074                            | Complète   |
| BR-019          | PR-070, PR-071                                    | Complète   |
| BR-020          | PR-107, PR-108, PR-109                            | Complète   |
| BR-021          | PR-110                                            | Hors produit, action programme |
| BR-022          | PR-018, PR-037, PR-111                            | Complète   |
| BR-023          | PR-022, PR-041                                    | Complète   |
| BR-024          | PR-031, PR-032, PR-033, PR-034, PR-035, PR-036    | Complète, PR-036 en L2 |
| BR-025          | PR-044, PR-045, PR-056, PR-057, PR-058, PR-059, PR-060 | Complète |
| BR-026          | PR-065, PR-066, PR-067, PR-068, PR-069            | Complète   |
| BR-027          | PR-039, PR-040, PR-041, PR-046                    | Complète   |
| BR-028          | PR-079, PR-080                                    | Complète, en L2 |
| BR-029          | PR-075, PR-076, PR-077                            | Complète, en L2 |
| BR-030          | PR-078                                            | Complète, en L2 |
| BR-031          | PR-054, PR-055, PR-061, PR-062                    | Complète   |
| BR-032          | PR-082, PR-083, PR-084, PR-088                    | Complète, en L2 |
| BR-033          | PR-085, PR-086, PR-087                            | Complète, en L2 |
| BR-034          | PR-081, PR-098                                    | Complète, en L2 |
| BR-035          | PR-066, PR-081, PR-095, PR-096, PR-097, PR-103    | Complète   |
| BR-036          | PR-010, PR-013, PR-014, PR-016, PR-048, PR-049    | Complète   |

Les trente-six exigences métier sont couvertes. Aucune exigence produit n'est orpheline : celles qui ne se rattachent à aucune exigence métier sont marquées Création et listées en annexe A, famille E-09.

### 12.2 Objectifs métier vers features

| Objectif | Features                                             | Jalon de couverture complète |
|----------|------------------------------------------------------|------------------------------|
| BO-01    | F-04, F-06, F-07, F-08, F-10, F-11, F-13, F-14       | L2                           |
| BO-02    | F-02, F-04, F-05, F-15                                | L1                           |
| BO-03    | F-04, F-06, F-09, F-19                                | L1                           |
| BO-04    | F-15, F-17                                            | L1                           |
| BO-05    | F-01, F-02, F-03, F-20                                | L1                           |
| BO-06    | F-12, F-13                                            | L2                           |
| BO-07    | F-17, F-18                                            | L1                           |
| BO-08    | F-07, F-09, F-12, F-16                                | L2                           |
| BO-09    | F-14, F-16, F-17                                      | L2                           |
| BO-10    | F-03, F-07, F-16                                      | L2                           |

**Quatre objectifs ne sont pleinement servis qu'en L2.** Si L2 n'est pas engagé, BO-01, BO-06, BO-08, BO-09 et BO-10 restent partiellement couverts, ce qui revient à livrer un outil d'atelier et non la chaîne complète jusqu'aux agrégats.

### 12.3 Flux UX vers exigences produit

| Flux  | Intitulé abrégé                              | Exigences produit                        |
|-------|----------------------------------------------|-------------------------------------------|
| UF-01 | Déposer un fait métier                       | PR-017, PR-018, PR-042                    |
| UF-02 | Recevoir un signalement de notation          | PR-025 à PR-029                           |
| UF-03 | Prioriser les sujets à approfondir           | PR-050 à PR-053                           |
| UF-04 | Adopter une proposition automatique          | PR-089 à PR-094                           |
| UF-05 | Formuler une frontière argumentée            | PR-070 à PR-077, PR-079                   |
| UF-06 | Conduire une étape                           | PR-006 à PR-011, PR-013, PR-014, PR-016   |
| UF-07 | Basculer vers le mode indépendant            | PR-107, PR-108, PR-109                    |
| UF-08 | Exprimer une question ou un désaccord        | PR-030, PR-039, PR-046                    |
| UF-09 | Modifier ou supprimer l'élément d'un autre   | PR-019, PR-020, PR-021, PR-023            |
| UF-10 | Ordonner les éléments                        | PR-031 à PR-037, PR-115                   |
| UF-11 | Cadrer le domaine et lancer le Big Picture   | PR-002, PR-004, PR-006                    |
| UF-12 | Reformuler sans perdre l'origine             | PR-022, PR-041                            |
| UF-13 | Enrichir un fait                             | PR-044, PR-045, PR-056 à PR-060           |
| UF-14 | Signaler un changement de langage            | PR-065 à PR-069                           |
| UF-15 | Comparer deux hypothèses                     | PR-078, PR-080                            |
| UF-16 | Valider ou conserver en hypothèse            | PR-081, PR-095, PR-098                    |
| UF-17 | Conduire un Process Modelling                | PR-054, PR-055, PR-061, PR-062            |
| UF-18 | Formuler un invariant et proposer un agrégat | PR-082 à PR-088                           |
| UF-19 | Parcourir la traçabilité                     | PR-099, PR-100                            |
| UF-20 | Restituer séparément                         | PR-064, PR-097, PR-101 à PR-104           |

Les vingt flux sont couverts. Trois surfaces produit ne correspondent à aucun flux : S-02, S-07 et S-20, signalées en annexe A.

## 13. Suites

Toutes les décisions sont rendues. Ce qui suit relève de l'exécution.

| ID           | Action                                                                                  | Responsable                | Charge      | Ce que son absence empêche                                     |
|--------------|-------------------------------------------------------------------------------------------|----------------------------|-------------|-----------------------------------------------------------------|
| **AP-01**    | Désigner la prochaine session de référence, sa date et son domaine                        | Product Owner              | Une question| Ancrer le plan de livraison et la préparation de la section 9.5 |
| **AP-04**    | Amender BR-004, BR-006, BR-011, BR-033 et BR-036 selon les décisions du 2026-09-21, et reporter les quatorze capacités de la famille E-09 | Product Owner | Une demi-journée | Rendre opposables le blocage d'étape, le masquage en collecte, le secret du vote, le refus d'agrégat sans invariant, la purge de la transcription et les capacités issues de la maquette |
| **AP-05**    | Chiffrer L1 sur la base de la section 9                                                    | Réalisation                | Une journée | Permettre l'arbitrage programme prévu par la règle de réalisation |
| **AP-06**    | Faire confirmer la couverture des exigences par les six rôles                              | Product Owner              | 6 × 30 min  | Lever les hypothèses HP-01 à HP-05, seule preuve extérieure disponible |
| **AP-07**    | Éprouver les huit tests de risque méthodologique sur un atelier réduit                     | Product Owner, P1          | Une demi-journée | Vérifier que le parcours produit la découverte attendue    |

**Actions closes le 2026-09-21.** AP-02, arbitrage des douze écarts. AP-03, confirmation des décisions produit. AP-08, arrêt de la notation de référence.

**AP-06 est la seule action qui apporte une preuve extérieure.** Toutes les autres reposent sur la conviction du Product Owner et sur la maquette. Elle reste à mener depuis le document d'exigences métier du 2026-08-11.

**AP-04 conditionne la valeur opposable du PRD.** Cinq exigences métier sont désormais contredites par une décision produit — BR-004 sur la visibilité en collecte, BR-006 sur le vote, BR-011 sur la conservation de la transcription, BR-033 sur le marquage incomplet d'un agrégat, BR-036 sur le blocage d'étape. Tant qu'elles ne sont pas amendées, le document d'exigences et le PRD disent deux choses différentes sur le même comportement.

## Annexe A — Écarts entre la maquette, les exigences métier et l'intention UX

**Les douze écarts ont été arbitrés par le Product Owner le 2026-09-21.** Aucun n'est ouvert.

| Sens de l'arbitrage                                    | Écarts                                              | Conséquence                                                    |
|---------------------------------------------------------|------------------------------------------------------|-----------------------------------------------------------------|
| La maquette l'emporte                                   | E-01, E-02, E-03                                     | BR-004 et BR-036 sont à amender, ainsi que le parcours de la section 5.2 du document d'exigences métier |
| Le document d'exigences métier l'emporte                | E-04, E-07, E-08                                     | Le comportement démontré est corrigé. BR-033 est durci : le refus est strict, le marquage incomplet n'est pas retenu |
| L'écart est un manque, comblé à un jalon                | E-05, E-06, E-10, E-11, E-12                         | Construit en L2, sauf l'accessibilité, indispensable dès L1     |
| Report au document d'exigences métier                   | E-09                                                 | Les quatorze capacités deviennent opposables, ce qui déclenche le réexamen prévu par la règle §6.3 |

Deux décisions de la même journée, prises hors annexe A, contredisent elles aussi une exigence métier : la purge de la transcription à la clôture, contre le critère de BR-011, et le secret du vote, contre le comportement démontré. L'action AP-04 les traite avec les autres.

### E-01 Le parcours compte neuf phases et non dix étapes

| | |
|---|---|
| Maquette | Neuf phases issues du déroulé de Brandolini instancié, dont huit en atelier |
| Document d'exigences | Dix étapes de découverte, du cadrage à la restitution |
| Conséquence | La clarification n'est pas une phase, elle est portée par le récit, les points chauds et le langage pivot. Frontières et collaboration fusionnent en phase 9. Le Process Modelling est anticipé dans l'atelier |
| **Décision du 2026-09-21** | Les neuf phases sont retenues. La section 5.2 du document d'exigences métier est amendée pour refléter la correspondance de la section 4.2 |

### E-02 Le passage d'étape est bloqué tant que le critère n'est pas atteint

| | |
|---|---|
| Maquette | La validation est refusée si le critère n'est pas satisfait, et une phase ne s'ouvre que lorsque la précédente est validée |
| Document d'exigences et UX | Le critère est observable et descriptif, la décision appartient au facilitateur. Le pattern UX énonce « descriptif, jamais prescriptif » |
| Conséquence | Un facilitateur qui juge une étape terminée ne peut pas avancer, ce qui contredit PP-07 |
| **Décision du 2026-09-21** | Le blocage est retenu. Il se lève par une action explicite du facilitateur, distincte de la validation, enregistrée avec le critère non atteint et restituée. Écart clos, BR-036 à amender pour admettre le blocage assorti du dépassement |

### E-03 Le mur est masqué aux participants pendant l'exploration chaotique

| | |
|---|---|
| Maquette | En vue Participant, seuls les éléments de l'intéressé sont visibles jusqu'à la révélation du mur |
| Document d'exigences | BR-004 pose que les éléments produits sont visibles de tous |
| Conséquence | Le masquage sert l'indépendance des contributions et limite l'ancrage, mais contredit une exigence opposable |
| **Décision du 2026-09-21** | Le comportement de la maquette est retenu : masquage actif par défaut en phase 2 pour le rôle Participant, révélation à l'initiative de chacun. Écart clos, BR-004 à amender en conséquence |

### E-04 Les agrégats sont créés sans invariant

| | |
|---|---|
| Maquette | La phase 9 crée un agrégat par frontière, sans formulation préalable d'invariant, et le nom est saisi immédiatement |
| Document d'exigences et UX | BR-032 impose la formulation de l'invariant avant l'agrégat, BR-033 refuse un agrégat sans invariant, UX-20 proscrit le regroupement visuel |
| Conséquence | Le comportement démontré est exactement celui que l'exigence interdit. C'est le seul écart où la maquette ne peut pas faire autorité |
| **Décision du 2026-09-21** | Le document d'exigences prévaut, et le refus est **strict** : l'option du marquage incomplet qu'admettait BR-033 n'est pas retenue. La création est refusée, le nom reste verrouillé, et le retrait du dernier invariant l'est aussi. PR-085 à PR-087, en L2 |

### E-05 Les hypothèses de découpage concurrentes sont absentes

| | |
|---|---|
| Maquette | Une seule couche de frontières existe, sans notion d'hypothèse nommée, ni auteur, ni comparaison |
| Document d'exigences et UX | BR-028 impose la coexistence d'hypothèses concurrentes, UF-15 leur comparaison côte à côte |
| Conséquence | Le découpage démontré est unique, ce qui réintroduit le risque UX-19, une zone tracée valant frontière |
| **Décision du 2026-09-21** | Construire PR-079 à PR-081 en L2, avec la règle d'affichage d'une seule hypothèse tracée à la fois |

### E-06 Les statuts de preuve sont partiels

| | |
|---|---|
| Maquette | Des états existent pour les écarts de récit, pour les définitions du langage pivot et pour l'origine fantôme, mais aucun statut uniforme ne porte sur tous les éléments |
| Document d'exigences | BR-035 impose sept statuts sur chaque élément, modifiables et tracés |
| Conséquence | Un fait observé et une hypothèse se présentent de la même manière sur le mur |
| **Décision du 2026-09-21** | Généraliser le statut en L2 avec PR-095 à PR-097, en amorçant dès L1 sur les éléments produits |

### E-07 Le vote est visible avant la clôture

| | |
|---|---|
| Maquette | Le nombre de voix est affiché sur chaque élément pendant le vote, et le vote se fait élément par élément sur le mur |
| Document d'exigences et UX | BR-006 exige que chacun vote sans connaître les votes des autres avant la clôture, et interdit tout effet visuel lié au nombre de voix |
| Conséquence | Un compteur visible produit un effet de conformité, et désavantage les cas rares connus d'une seule personne |
| **Décision du 2026-09-21** | Le document d'exigences prévaut : vote secret jusqu'à la clôture, aucun total visible avant, aucun effet visuel lié aux voix. PR-051 passe en Indispensable dès lors que F-09 est livrée |

### E-08 La composition de la séance de découpage diffère

| | |
|---|---|
| Maquette | La phase 9 est décrite comme une séance d'architectes, tenue dans la semaine, de deux heures |
| Document d'exigences | La séance Design Level est confiée à l'équipe de développement produit, rôle P6, avec un représentant métier, à une échéance non fixée |
| Conséquence | Sans représentant métier, un invariant est formulé sans contradicteur, ce que la garantie métier du document d'exigences interdit |
| **Décision du 2026-09-21** | Retenir la composition du document d'exigences. Le rôle applicatif Équipe de conception de la section 2.2 porte cette correction, et la séance se tient dans les deux semaines suivant l'atelier |

### E-09 Capacités introduites par la maquette sans exigence métier

**Décision du 2026-09-21 : les quatorze sont reportées au document d'exigences métier**, ce qui déclenche le réexamen prévu par sa règle de gestion du périmètre. Elles deviennent opposables et cessent d'être arbitrables sans réexamen.

| Capacité                                                     | Exigences produit | Rattachement au document d'exigences |
|---------------------------------------------------------------|-------------------|-----------------------------------------------|
| Connexion par GitHub ou OIDC                                  | PR-001            | Nouvelle exigence, domaine D1                 |
| Accès participant par code de séance                          | PR-002            | BR-004 ou nouvelle exigence                   |
| Liste et création de séances, modèles de déroulé               | PR-003, PR-004    | BR-001 étendu                                 |
| Échauffement sur un domaine trivial                           | Phase 1           | BR-001 étendu                                 |
| Phrase de lancement et pièges par étape                       | PR-007, PR-008    | BR-001 étendu                                 |
| Récit conduit par un narrateur, en plusieurs passes           | PR-038, PR-043    | BR-027 étendu                                 |
| Type d'élément « opportunité »                                | PR-047            | Nouvelle exigence, domaine D4                 |
| Déclaration explicite d'absence d'acteur ou de système         | PR-048            | BR-036 étendu                                 |
| Mesures de cohésion interne et de couverture du mur           | PR-072            | BR-018 étendu                                 |
| Versement de la restitution dans un dépôt versionné           | PR-105            | BR-013 étendu                                 |
| Vue personnelle, focus collectif, échelles d'affichage        | PR-113, PR-114, PR-116 | Nouvelle exigence, transverse           |
| Relance privée d'un participant silencieux                    | PR-118            | BR-007 étendu                                 |
| Filtre de masquage des éléments supprimés                     | PR-021            | Déjà signalé par l'UX comme non couvert       |
| Alternative de positionnement sans glissement                 | PR-034            | Déjà signalé par l'UX comme non couvert       |

### E-10 Branches, répétitions et événements pivots sont absents

| | |
|---|---|
| Maquette | La chronologie s'organise en moments nommés et en zone d'attente, sans branche ni répétition ni pivot |
| Document d'exigences | BR-024 impose les quatre représentations, y compris la position incertaine |
| Conséquence | Un domaine composé de processus multiples est représenté comme une séquence unique |
| **Décision du 2026-09-21** | La zone d'attente couvre la position incertaine dès L1. Les branches, répétitions et pivots relèvent de PR-036, en L2 |

### E-11 Les dépendances entre frontières sont mesurées, jamais nommées

| | |
|---|---|
| Maquette | Les liens traversants sont comptés et détaillés, sans nom, sans sens, sans responsable |
| Document d'exigences | BR-030 impose un nom, un sens et un contexte responsable pour chaque dépendance |
| Conséquence | KPI-13 n'est pas renseignable, et une ambiguïté de responsabilité est reportée sur la construction |
| **Décision du 2026-09-21** | PR-078 en L2, avec conversion d'un lien traversant mesuré en dépendance nommée |

### E-12 L'accessibilité n'est pas démontrée

| | |
|---|---|
| Maquette | Les types portent un libellé en plus de la couleur, ce qui est conforme. Le parcours clavier, l'annonce aux lecteurs d'écran et le contraste ne sont pas démontrés |
| UX | Sept points bloquants recensés, dont la conception clavier comme mode nominal |
| Conséquence | 18 des 23 participants ne sont pas techniques, et le parcours de contribution est d'abord une saisie au clavier |
| **Décision du 2026-09-21** | NFR-05 à NFR-07 sont indispensables en L1 et vérifiés avant la mise en service, section 9.5 |

## Annexe B — Ce que la maquette démontre, phase par phase

| Phase | Démontré                                                                                  | Reste à construire                                                          |
|-------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| 1     | Échauffement, contrôle de grammaire, critère des huit événements                            | Tour de table, affichage de l'intention du domaine                          |
| 2     | Saisie continue, masquage participant, regroupement de doublons, critère des vingt événements | Signalement différé des écarts, zone d'attente initiale                    |
| 3     | Moments nommés, réordonnancement, suppression sans perte, critère de placement               | Branches, répétitions, pivots, alternative clavier complète                 |
| 4     | Récit pas à pas, écarts, reformulation, passes, ajout d'un oubli                            | Information privée de l'auteur d'origine, statut de preuve associé          |
| 5     | Revue par moment, acteurs, systèmes, points chauds, déclaration d'absence                    | Opportunités dans la restitution, liens masquables                          |
| 6     | Sélection des processus, rattachement, nommage des commandes                                 | Motif de sélection consigné                                                 |
| 7     | Politiques, informations, acteurs, systèmes, chaînes canoniques, critère des trois politiques | Signalement d'une politique sans condition                                  |
| 8     | Variantes et leur point d'origine, critère des deux variantes                                | Clôture structurée, rappel d'exhaustivité                                   |
| 9     | Frontières, affectation, cinq mesures, détail des liens traversants, agrégats, export et versement | Indices déclarés, marquage non étayée, hypothèses concurrentes, dépendances nommées, invariants |
| Transverse | Couche fantôme sourcée, adoption, langage pivot, export Markdown, commit                | Journal des décisions, filtre par statut, navigation de traçabilité, ruptures signalées |

## Annexe C — Glossaire produit

| Terme                    | Définition retenue dans ce document                                                                 |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| **Mur**                  | Surface unique portant le modèle en construction, dont les règles changent selon la phase               |
| **Moment**               | Segment nommé de la chronologie, dans le langage du métier, remplaçant une position continue            |
| **Zone d'attente**       | Emplacement des éléments dont la place n'est pas connue, pour ne pas les placer au hasard                |
| **Point chaud**          | Élément portant un désaccord, une question ou un blocage, que rien n'oblige à résoudre                  |
| **Opportunité**          | Élément portant une amélioration entrevue, distinct du point chaud                                      |
| **Couche fantôme**       | Ensemble des propositions issues de la transcription, distinctes de la production du groupe             |
| **Langage pivot**        | Glossaire des termes du domaine, de leurs définitions, de leurs zones et de leurs ambiguïtés            |
| **Écart de récit**       | Divergence entre deux descriptions d'un même fait, conservée sans arbitrage                             |
| **Passe de récit**       | Parcours complet de la chronologie par un narrateur, identifié pour situer les écarts                   |
| **Critère de sortie**    | Condition observable, calculée en continu, qui indique ce qui reste à traiter dans la phase en cours    |
| **Frontière candidate**  | Délimitation proposée d'un contexte, argumentée par des indices, tant qu'elle n'est pas tranchée        |
| **Contexte candidat**    | Frontière dotée d'un nom métier, d'une responsabilité, d'un langage et d'un niveau de confiance         |
| **Indice**               | Fait observé dans le modèle qui soutient une frontière, choisi parmi huit types                         |
| **Lien traversant**      | Enchaînement entre deux éléments appartenant à deux frontières différentes, mesuré et détaillé          |
| **Tranche verticale**    | Enchaînement commande vers événement situé dans une frontière, avec son acteur                          |
| **Invariant**            | Règle métier qui doit rester vraie à tout instant, formulée avant tout agrégat                          |
| **Agrégat candidat**     | Regroupement fondé sur les commandes acceptées, les invariants protégés et les événements émis           |
| **Statut de preuve**     | Qualification de la valeur probante d'un élément, parmi sept valeurs                                    |
| **Repli non logiciel**   | Conduite de l'atelier sans le produit, au moyen du déroulé écrit et d'un support partagé                |
