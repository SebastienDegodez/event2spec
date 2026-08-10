---
title: "Revue critique des documents BRD et UX Event Storming"
description: "Améliorations nécessaires pour reconstruire le parcours du Big Picture jusqu'aux bounded contexts et aux agrégats"
author: "Product Team"
ms.date: 2026-08-10
ms.topic: review
keywords:
  - event storming
  - big picture
  - bounded context
  - agrégat
  - revue
---

## 1. Conclusion

Les deux documents sont riches, traçables et attentifs à la facilitation, mais ils décrivent surtout un **outil collaboratif d'atelier**. Ils ne décrivent pas encore un parcours Event Storming complet.

Le défaut principal est méthodologique : le parcours part de fonctionnalités de contribution, de vote, de correction et d'assistance, puis saute directement à la délimitation de zones. Il manque la chaîne de raisonnement qui permet de passer :

1. des événements métier du Big Picture ;
2. à une chronologie et à ses zones de tension ;
3. aux processus et aux changements de langage ;
4. aux sous-domaines et bounded contexts candidats ;
5. à un Process Modelling ciblé ;
6. aux commandes, politiques, read models et invariants ;
7. aux agrégats.

En l'état, l'outil peut produire un mur ordonné et mesurable sans garantir que les frontières ou les agrégats résultent réellement de la découverte métier.

## 2. Points solides à conserver

### Document BRD

- Le problème métier, les rôles et les risques de l'atelier sont explicités.
- La contribution simultanée et la préservation des cas rares répondent bien à la fragmentation de la connaissance.
- Les divergences, questions et éléments non conformes peuvent être conservés plutôt qu'effacés.
- La traçabilité entre parole métier et éléments du modèle est une capacité différenciante.
- Le mode de continuité protège l'atelier contre une indisponibilité de l'outil.

### Document UX

- Les personas, leurs freins et leurs moments critiques sont détaillés.
- La correction privée et non bloquante protège la participation.
- La zone d'attente évite de forcer une chronologie incertaine.
- Les alternatives au glisser-déposer et les règles d'accessibilité sont pertinentes.
- L'origine humaine ou automatique d'un élément reste visible.

Ces acquis doivent être intégrés au nouveau parcours, et non supprimés.

## 3. Améliorations transverses prioritaires

### P0 — Recentrer le produit sur la progression méthodologique

Le BRD et l'UX doivent partager une même carte de parcours :

| Étape | Question de découverte | Artefact de sortie | Décision de passage |
|---|---|---|---|
| Cadrage | Quel domaine et quel objectif explore-t-on ? | Intention, périmètre, participants | Le groupe comprend la question posée |
| Big Picture — collecte | Que s'est-il passé dans le métier ? | Événements métier au passé | Les récits majeurs sont représentés |
| Big Picture — chronologie | Dans quel ordre cela se produit-il ? | Frise, branches et événements simultanés | Les ruptures et alternatives sont visibles |
| Big Picture — enrichissement | Qui agit, pourquoi, avec quelles informations ? | Acteurs, systèmes, commandes, politiques, questions et hotspots | Les causalités principales sont explicites |
| Découverte des frontières | Où changent langage, règles, rythme ou responsabilité ? | Sous-domaines et bounded contexts candidats | Chaque frontière possède des indices métier |
| Validation des contextes | Comment les contextes collaborent-ils ? | Responsabilités, dépendances et context map candidate | Les ambiguïtés de responsabilité sont traitées |
| Process Modelling | Comment fonctionne un processus critique dans un contexte ? | Flux commande-événement enrichi | Le scénario nominal et les variantes sont compris |
| Design Level | Quelles règles doivent rester cohérentes ensemble ? | Invariants, agrégats candidats, policies et read models | Chaque agrégat protège des invariants nommés |
| Restitution | Qu'est-ce qui est établi, incertain ou à tester ? | Modèle versionné et journal des décisions | Les participants valident le niveau de confiance |

Les étapes ne doivent pas être un tunnel irréversible. Le groupe doit pouvoir revenir en arrière en conservant les décisions, hypothèses et liens.

### P0 — Faire des événements métier le point de départ réel

La première activité de découverte doit accepter uniquement des **faits métier significatifs formulés au passé**. La collecte doit précéder :

- la recherche de commandes ;
- la discussion sur les solutions ;
- le découpage en zones ;
- la correction détaillée de la notation ;
- les mesures de couplage.

Le parcours actuel introduit trop tôt les types d'éléments et le contrôle de conformité. Pendant la collecte divergente, une formulation imparfaite vaut mieux qu'une contribution perdue. La normalisation doit intervenir dans une phase distincte.

### P0 — Séparer divergence, mise en ordre et convergence

Le vote ne doit pas servir à décider quels faits métier sont vrais ou importants. Un événement rare peut être essentiel et connu d'une seule personne.

Il faut distinguer :

1. **divergence** : collecte sans hiérarchie ;
2. **mise en ordre** : chronologie, alternatives, simultanéités et causalités ;
3. **clarification** : doublons, vocabulaire, questions et désaccords ;
4. **convergence** : choix des zones ou scénarios à approfondir.

Le vote peut aider à choisir un prochain sujet d'exploration. Il ne doit ni supprimer des événements ni transformer la popularité en vérité métier.

### P0 — Définir la méthode de découverte des bounded contexts

La simple délimitation d'une zone et le comptage des relations franchissantes ne suffisent pas. Une frontière candidate doit pouvoir être justifiée par plusieurs indices :

- changement de vocabulaire ou de signification d'un même terme ;
- changement de règles métier ou d'invariants ;
- changement de rythme ou de temporalité ;
- changement de responsabilité, d'équipe ou de source d'autorité ;
- rupture dans le cycle de vie d'une information ;
- dépendance externe ou contrainte réglementaire ;
- hotspot ou désaccord durable ;
- forte cohésion interne et interactions explicites avec l'extérieur.

Chaque bounded context candidat doit posséder un nom métier, une responsabilité, un langage, les événements qu'il publie ou consomme, ses dépendances et un niveau de confiance. Les frontières concurrentes doivent pouvoir coexister jusqu'à leur validation.

### P0 — Ne pas déduire les agrégats du dessin

Un agrégat n'est ni une zone du Big Picture, ni un groupe visuel de post-its, ni un bounded context miniature. Il doit apparaître lors d'un approfondissement Design Level, à l'intérieur d'un bounded context, à partir :

- des commandes ;
- des décisions et invariants métier ;
- des événements produits ;
- des données nécessaires à la décision ;
- de la frontière de cohérence transactionnelle ;
- des politiques déclenchées après un événement.

Pour chaque agrégat candidat, le document doit exiger : son intention, les commandes acceptées, les invariants protégés, les événements émis, les informations consultées et les incertitudes. Le nom de l'agrégat ne doit être validé qu'après formulation des invariants.

### P1 — Assumer plusieurs niveaux de preuve

Chaque élément devrait porter un statut :

- observé dans la parole métier ;
- reformulé et validé ;
- hypothèse ;
- désaccord ;
- décision ;
- proposition automatique ;
- élément à vérifier.

La traçabilité doit relier non seulement une proposition automatique à un extrait, mais aussi une frontière, une règle et un agrégat aux événements et décisions qui les fondent.

### P1 — Définir les critères de sortie

Le minuteur et le volume de contributions ne disent pas si une étape est terminée. Les documents doivent définir des critères qualitatifs non prescriptifs, par exemple :

- les débuts, fins, alternatives et événements pivots sont visibles ;
- les hotspots importants ont un propriétaire ou restent explicitement ouverts ;
- les termes ambigus sont repérés ;
- chaque frontière candidate est soutenue par des indices ;
- chaque agrégat candidat protège au moins un invariant explicite.

Le facilitateur garde la décision de passage et voit les éléments restant à clarifier.

## 4. Améliorations du BRD

### 4.1 Revoir les objectifs métier

BO-01 doit nommer explicitement les résultats de découverte attendus : Big Picture, bounded contexts candidats et approfondissement des agrégats sur les scénarios prioritaires.

BO-06 réduit aujourd'hui la découverte des frontières à des « mesures objectives ». Il faut le remplacer par un objectif de **décision argumentée**, combinant indices qualitatifs, relations observées, langage et responsabilités. Une mesure soutient la discussion ; elle ne prouve pas une frontière.

Ajouter des objectifs sur :

- la préservation des incertitudes et désaccords ;
- la continuité de traçabilité entre événement, frontière, scénario et agrégat ;
- la validation progressive par les experts métier.

### 4.2 Remplacer le processus cible

La section 5.2 doit reprendre le parcours méthodologique de la section 3 de cette revue. L'« activité 2, séance de découpage » est trop courte et trop tardive : la découverte des frontières commence pendant la lecture du Big Picture.

La séance avec les architectes ne doit pas décider seule du découpage. Elle prépare et argumente des candidats que les experts métier peuvent contester, notamment sur le vocabulaire et les règles.

### 4.3 Réorganiser le périmètre fonctionnel

Les domaines fonctionnels devraient suivre la méthode :

1. préparation et cadrage ;
2. collecte des événements ;
3. chronologie et scénarios alternatifs ;
4. enrichissement du Big Picture ;
5. hotspots, questions et décisions ;
6. découverte et comparaison des bounded contexts ;
7. Process Modelling ;
8. Design Level et agrégats ;
9. restitution et traçabilité ;
10. continuité de l'atelier.

Cette organisation rend les manques visibles et évite de confondre fonctionnalités transverses et étapes de découverte.

### 4.4 Corriger les exigences existantes

| Référence | Problème | Amélioration |
|---|---|---|
| BR-001 à BR-003 | Le déroulé ne définit pas la méthode ni les résultats de chaque étape | Ajouter objectifs, consignes, types autorisés, critères de sortie et retours possibles |
| BR-004 | Tous les types peuvent être saisis trop tôt | Prévoir une collecte initiale centrée sur les événements, sans blocage |
| BR-005 | La fin du temps peut être confondue avec la fin de la découverte | Distinguer limite temporelle et critère de complétude |
| BR-006 | Le vote est présenté comme mécanisme général de convergence | Le limiter à la priorisation des sujets à approfondir |
| BR-007 | Le décompte individuel peut encourager le volume | Mesurer aussi la diversité des acteurs et la validation croisée, sans classement public |
| BR-008 à BR-010 | La conformité intervient dès la contribution | Déplacer la normalisation vers une phase de clarification, sauf aide privée sollicitée |
| BR-011 à BR-013 | La traçabilité couvre surtout transcription et restitution | L'étendre aux décisions, frontières, règles, invariants et liens entre niveaux |
| BR-014 à BR-016 | Les propositions automatiques peuvent orienter trop tôt le modèle | Les introduire après la production humaine, avec preuve, confiance et possibilité de contestation |
| BR-017 à BR-019 | Une zone géométrique et des comptages tiennent lieu de découpage | Modéliser des contextes candidats argumentés, comparables et validables |
| BR-020 à BR-021 | Le repli protège l'atelier, mais pas nécessairement les liens sémantiques | Exporter régulièrement événements, décisions, liens et statuts dans un format exploitable |

### 4.5 Ajouter les exigences manquantes

- Collecter et reformuler des événements métier au passé.
- Représenter chronologie, simultanéité, branches, répétitions et événements pivots.
- Ajouter acteurs, systèmes externes, commandes, politiques, read models et hotspots par phases.
- Relier une commande à l'événement qu'elle provoque et à l'acteur ou la politique qui la déclenche.
- Capturer les changements de langage et le glossaire par zone.
- Créer plusieurs hypothèses de bounded contexts sans modifier le Big Picture source.
- Justifier une frontière par des indices métier traçables.
- Décrire les interactions entre contextes candidats.
- Sélectionner un scénario et le raffiner en Process Modelling.
- Identifier les invariants avant de proposer un agrégat.
- Relier chaque agrégat candidat à son bounded context et à ses commandes, événements et invariants.
- Versionner les hypothèses de découpage et consigner leur validation ou rejet.

### 4.6 Refaire les KPI

Les KPI actuels mesurent surtout participation, usage de l'outil et continuité. Ajouter des indicateurs de qualité du résultat :

- part des événements validés ou explicitement contestés par les experts concernés ;
- nombre de hotspots critiques encore sans décision ;
- part des frontières candidates disposant d'au moins deux indices métier ;
- part des dépendances entre contextes décrites et nommées ;
- part des agrégats candidats associés à au moins un invariant explicite ;
- traçabilité complète d'un échantillon depuis la parole jusqu'à l'agrégat ;
- validation du modèle par plusieurs rôles, sans rechercher artificiellement l'unanimité.

Éviter les KPI qui récompensent le nombre de post-its ou le nombre de contributions individuelles.

### 4.7 Nettoyer les contradictions éditoriales

- La section 5.2 omet le Big Picture comme phase explicite alors qu'il constitue l'objectif annoncé.
- Les sections 9.2 et 12 conservent des informations déclarées closes ailleurs, ce qui brouille l'état réel.
- AC-03 affirme qu'aucune exigence ne couvre les divergences, tandis que la réponse ultérieure indique qu'elles sont traitées par le facilitateur sans rendre ce traitement vérifiable.
- AC-12 reste « à mener » alors que le document UX affirme que question et désaccord sont couverts.
- « Les cinq domaines fonctionnels » de la section 6.4 ne correspondent pas aux sept domaines classés en section 6.5.
- Le statut « document prêt pour le développement » est trop fort tant que la notation, le parcours Big Picture, les frontières et les agrégats ne sont pas définis.

## 5. Améliorations du document UX

### 5.1 Concevoir un parcours d'atelier, pas seulement des vues

La vue centrale unique est pertinente pour conserver le contexte, mais elle doit changer de règles et d'affordances selon la phase. Chaque mode doit afficher :

- la question à laquelle le groupe répond ;
- les éléments autorisés ou recommandés ;
- ce qui reste incertain ;
- les critères de sortie ;
- l'étape suivante et la possibilité de revenir.

Le document doit fournir une journey map complète du cadrage à la restitution, avec les transitions et changements de rôle.

### 5.2 Refaire les user flows

Ajouter ou remplacer les flux suivants :

1. cadrer le domaine et lancer le Big Picture ;
2. déposer rapidement un événement métier ;
3. reformuler et valider un événement sans perdre l'original ;
4. construire la chronologie et ses branches ;
5. signaler un hotspot, une question ou un désaccord ;
6. enrichir les événements par acteurs, commandes, politiques et systèmes ;
7. repérer un changement de langage ou de responsabilité ;
8. proposer et comparer une frontière de contexte ;
9. valider ou conserver comme hypothèse un bounded context ;
10. choisir un scénario à approfondir ;
11. conduire un Process Modelling ;
12. formuler un invariant et proposer un agrégat ;
13. parcourir la traçabilité de la parole jusqu'à l'agrégat ;
14. restituer séparément faits validés, hypothèses et questions ouvertes.

UF-03 doit devenir un flux de priorisation, non un flux de validation du modèle. UF-05 doit porter sur les indices de frontière et non uniquement sur les mesures géométriques.

### 5.3 Adapter le catalogue de vues

Conserver le mur, puis ajouter des modes ou panneaux spécialisés :

- **Big Picture** : événements dominants, saisie rapide et parking ;
- **Chronologie** : branches, simultanéités, pivots et zoom par scénario ;
- **Hotspots et glossaire** : questions, désaccords, synonymes et changements de sens ;
- **Contexte candidat** : responsabilité, langage, indices, événements entrants et sortants ;
- **Context map candidate** : dépendances et relations entre contextes ;
- **Process Modelling** : acteur ou politique → commande → agrégat candidat → événement → read model ;
- **Invariants et agrégats** : règles, cohérence, informations nécessaires et niveau de confiance ;
- **Traçabilité** : navigation bidirectionnelle entre transcription, événement, décision, contexte et agrégat.

### 5.4 Réduire la surcharge du mur

Le mur ne doit pas montrer tous les niveaux en même temps. Prévoir :

- divulgation progressive des types d'éléments ;
- filtres par scénario, période, acteur, contexte et statut ;
- zoom sémantique ;
- vues personnelles sans modifier la vue collective ;
- minimap et repères stables ;
- focus collectif piloté par le facilitateur sans bloquer les vues individuelles ;
- comparaison côte à côte de deux hypothèses de découpage.

Les animations de déplacement proposées pour rendre le chaos lisible risquent d'aggraver UX-17. Privilégier une position stable, un aperçu de modification et une synchronisation explicite pendant les phases collectives denses.

### 5.5 Revoir les personas

Ajouter au moins :

- le **décideur métier**, qui valide règles et responsabilités ;
- le **domain expert par sous-domaine**, car les experts ne sont pas interchangeables ;
- le **scribe ou gardien du modèle**, si cette responsabilité reste nécessaire ;
- le **designer technique ou développeur**, utilisateur du Design Level.

P4 ne doit pas être le seul propriétaire du découpage. Les architectes structurent les hypothèses ; les experts métier valident langage, responsabilités et règles.

### 5.6 Tester les risques méthodologiques

Aux tests UX prévus, ajouter :

- un test de collecte où aucune commande ni solution n'est proposée avant les événements ;
- un test de restitution d'un cas rare sans vote ;
- un test de deux récits contradictoires conservés simultanément ;
- un test de changement de sens d'un terme entre deux zones ;
- un test de comparaison de deux découpages candidats ;
- un test où un agrégat proposé sans invariant est refusé ou marqué incomplet ;
- un test de navigation depuis un agrégat jusqu'à la parole métier source.

### 5.7 Corriger les incohérences éditoriales

- La section 3 annonce sept flux, mais en contient dix.
- La section 4 annonce sept vues, puis ajoute une vue transverse.
- La section 8.2 affirme que deux questions restent ouvertes, puis en énumère quatre.
- La section 9 recommande de répondre à QU-01 et QU-04 alors qu'elles sont marquées closes.
- UX-15 apparaît successivement comme nouveau puis clos, ce qui devrait être remplacé par un historique de décision compact.
- Les éléments supprimés visibles et animés, l'historique complet et les déplacements libres créent une densité incompatible avec le risque UX-04 sans stratégie de niveaux de lecture suffisamment précise.
- Les wireframes décrivent directement commandes, propositions et mesures sans écran dédié à la collecte initiale des événements.

## 6. Ordre recommandé de réécriture

### Lot 1 — Socle méthodologique

1. Définir le parcours cible et les critères de passage.
2. Définir la notation utilisée à chaque phase.
3. Réécrire les objectifs, le processus cible et le périmètre du BRD.
4. Ajouter les exigences manquantes sur Big Picture, contextes et agrégats.

### Lot 2 — Interaction

1. Refaire la journey map.
2. Réécrire les user flows selon l'ordre méthodologique.
3. Recomposer les modes du mur et les panneaux spécialisés.
4. Définir la gestion de la densité et les vues collectives ou individuelles.

### Lot 3 — Validation

1. Faire relire le parcours par un facilitateur Event Storming expérimenté.
2. Le confronter aux experts métier et architectes.
3. Jouer un atelier réduit de bout en bout avec un scénario réel.
4. Vérifier qu'une frontière et un agrégat peuvent être expliqués depuis les faits métier, sans raisonnement implicite.
5. Mettre à jour KPI, risques, questions ouvertes et décisions.

## 7. Critères d'acceptation des documents réécrits

- [ ] Le Big Picture commence explicitement par les événements métier.
- [ ] Les phases divergentes et convergentes sont distinctes.
- [ ] Le vote ne décide pas de la vérité métier et ne supprime aucun cas rare.
- [ ] Les hotspots, questions et désaccords restent visibles et traçables.
- [ ] Les indices utilisés pour proposer une frontière sont définis.
- [ ] Plusieurs bounded contexts candidats peuvent être comparés.
- [ ] Chaque contexte candidat possède responsabilité, langage, interactions et niveau de confiance.
- [ ] Le passage du Big Picture au Process Modelling est explicite.
- [ ] Le passage du Process Modelling au Design Level est explicite.
- [ ] Un agrégat candidat est fondé sur au moins un invariant métier.
- [ ] La traçabilité relie parole, événement, décision, contexte et agrégat.
- [ ] Chaque étape possède un objectif, une sortie et un critère de passage.
- [ ] Les responsabilités respectives du facilitateur, des experts et des architectes sont claires.
- [ ] Les exigences, user flows, vues, risques et KPI utilisent le même vocabulaire et le même ordre de parcours.
- [ ] Les contradictions et éléments clos sont retirés des listes actives.

## 8. Décisions à obtenir avant la réécriture

1. Le produit couvre-t-il uniquement le Big Picture ou également Process Modelling et Design Level ?
2. Jusqu'à quel niveau les bounded contexts et agrégats doivent-ils être validés pendant les deux jours ?
3. Quels types d'éléments et quelles couleurs de notation sont retenus à chaque phase ?
4. Quel rôle peut valider une frontière, un invariant et un agrégat ?
5. Le résultat attendu est-il une hypothèse de découpage, une context map candidate ou une décision d'architecture ?
6. Quels scénarios seront approfondis après le Big Picture, et selon quel critère ?
7. Quelles propositions automatiques sont autorisées à chaque étape sans orienter prématurément la découverte ?

Sans ces décisions, il est possible d'améliorer l'interface, mais pas de garantir un parcours Event Storming cohérent de bout en bout.
