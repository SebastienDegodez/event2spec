---
title: "Use Case — Dériver aggregates et bounded contexts depuis le mur"
project: event-storming-assistant
snapshot: "2026-08-04-refresh"
source_method: 1
---

# Use Case — Dériver aggregates et bounded contexts depuis le mur

### Use Case Description

En séance de conception restreinte, l'assistant analyse le mur d'Event Storming produit par l'atelier de domaine et propose des candidats d'aggregates et de bounded contexts, chacun justifié par les éléments du modèle qui le fondent. Les architectes acceptent, amendent ou écartent.

### Use Case Overview

L'atelier de domaine a produit un mur riche mais plat : des dizaines d'événements sur une timeline, des commandes, des policies, des systèmes externes, des acteurs. Ce mur ne comporte aucune indication de frontière. Le passage au niveau Software Design demande d'identifier les zones de cohérence — quelles commandes opèrent sur les mêmes invariants, quels groupes d'événements partagent un même langage — ce qui exige aujourd'hui de tout relire manuellement plusieurs fois.

L'assistant prend en charge la proposition initiale. Il analyse la structure du mur — dépendances, flux `Event → Policy → Command → System → Event`, acteurs impliqués, vocabulaire employé — et produit des candidats de découpage. Chaque candidat est accompagné des éléments qui le justifient et reste remontable jusqu'aux extraits de conversation dont ces éléments proviennent. Les architectes exercent leur jugement sur ces candidats.

Ce mode s'exécute **hors direct** et **sans dépendance à l'audio** : son entrée est le mur, pas la parole.

### Business Value

La valeur est double : réduire le délai entre l'atelier et une décision d'architecture défendable, et garantir que le découpage s'appuie sur le langage réel du métier plutôt que sur l'organigramme existant.

| Bénéficiaire | Effet |
|---|---|
| Architectes | Exercent leur jugement sur des candidats argumentés au lieu d'une page blanche |
| Développeurs praticiens | Contribuent au découpage sans le porter seuls |
| Programme | Un découpage traçable jusqu'à la parole métier, opposable en comité |
| Équipes de développement | La matière nécessaire au dossier d'architecture technique |

Indicateurs pertinents : durée de la séance de conception, proportion de frontières retenues issues d'une proposition, nombre de découpages alternatifs examinés, capacité à justifier chaque frontière par un élément du mur.

### Primary User

L'architecte solution et l'architecte d'entreprise. Ils décident du découpage et en portent la responsabilité. Leur contrainte forte : ils rejetteront toute proposition qu'ils ne peuvent pas inspecter, contester ou amender.

### Secondary User

Les deux développeurs praticiens de l'Event Storming, qui apportent la connaissance du système existant et vérifient la cohérence des propositions avec le mur d'origine. Indirectement, les experts métier, dont la parole fonde les frontières sans qu'ils participent à cette séance.

### Preconditions

- Un mur d'Event Storming existe, issu de la séance A ou importé.
- Les niveaux Big Picture et Process Modeling y sont suffisamment renseignés — événements, commandes, policies, systèmes, acteurs.
- Le lien entre les éléments du mur et leurs extraits de conversation source est conservé.
- Les architectes disposent d'un créneau dédié, distinct de l'atelier à 23.

### Steps

1. L'architecte ouvre le mur produit par l'atelier de domaine.
2. Il déclenche l'analyse de découpage.
3. L'assistant analyse la structure du mur : flux, dépendances, acteurs, vocabulaire.
4. L'assistant propose un ou plusieurs découpages candidats en aggregates et bounded contexts.
5. Pour chaque frontière proposée, l'assistant affiche les éléments du mur qui la justifient.
6. L'architecte inspecte une frontière et remonte, s'il le souhaite, jusqu'à l'extrait de conversation d'origine.
7. Le groupe accepte, fusionne, scinde ou écarte des frontières.
8. L'assistant met à jour le découpage retenu et conserve la trace des alternatives écartées.
9. Le découpage validé est enregistré comme une couche du modèle, sans altérer le mur d'origine.

### Data Requirements

**Nécessaire en entrée** : le mur complet avec ses éléments typés et leurs liens, l'ordre chronologique fin, le rattachement de chaque élément à son extrait de transcription, les acteurs et les systèmes externes identifiés.

**Créé ou modifié** : les frontières d'aggregates et de bounded contexts sous forme de couche additionnelle, la justification de chaque frontière, l'historique des découpages proposés et écartés, les décisions des architectes.

Le découpage doit être une **couche superposée** au mur, jamais une transformation destructive. Un mauvais découpage doit pouvoir être annulé sans perdre le travail de l'atelier.

### Equipment Requirements

Un poste par participant avec navigateur. Un accès à un modèle de langage pour l'analyse — sous réserve de l'arbitrage sécurité IT, mais avec une exigence moindre qu'en mode Captation puisqu'aucun flux audio n'est traité. Un écran suffisamment grand pour visualiser un mur dense et ses regroupements.

### Operating Environment

Séance de travail restreinte, quatre participants, en distanciel ou en présentiel. Pas de contrainte temps réel : l'analyse peut prendre plusieurs secondes sans nuire à l'expérience. Contexte moins tendu que l'atelier à 23, ce qui autorise une interaction plus dense et plus technique.

### Success Criteria

- Les architectes retiennent au moins une frontière issue d'une proposition de l'assistant.
- Chaque frontière retenue est justifiable par des éléments du mur.
- La séance aboutit à un découpage utilisable, dans une durée sans commune mesure avec une analyse manuelle.
- Aucune frontière n'est imposée : toutes sont amendables.
- Le mur d'origine reste intact.

### Pain Points

Aujourd'hui : le découpage repose sur l'intuition d'un architecte et sa connaissance du système existant, ce qui reproduit souvent l'organisation actuelle plutôt que le domaine ; le lien entre la parole des experts métier et les frontières retenues est perdu ; l'analyse manuelle d'un mur dense est longue et faillible ; aucune alternative n'est examinée, faute de temps.

### Extensions

- **Découpages concurrents** — l'assistant propose plusieurs partitions différentes et les architectes les comparent.
- **Mur importé** — le découpage s'applique à un Event Storming réalisé ailleurs, sans passer par le mode Captation.
- **Mur incomplet** — l'assistant signale les zones trop pauvres pour fonder une frontière plutôt que de proposer à l'aveugle.
- **Reprise itérative** — le découpage est révisé après un atelier complémentaire.
- **Désaccord entre architectes** — les deux découpages sont conservés côte à côte, à la manière d'un hotspot.

### Evidence

- Verbatim, session de cadrage du 2026-08-04 : « Il faut que dans le MVP on ait le Aggregate, Bounded Context. »
- Verbatim : « En séance séparée pour le niveau software. »
- Verbatim : « l'IA ne fait pas de choix, elle pose les post-it seulement s'ils sont validés par le groupe » — principe étendu ici aux architectes comme valideurs.
- [scope-boundaries.md](../../method-01-scope/scope-boundaries.md) — arbitrage T10 et tableau des deux séances.
- [assumptions-log.md](../../method-01-scope/assumptions-log.md) — hypothèses A10 et A11, toutes deux non testées.
- *Event Storming — The Complete Guide* — niveau Software Design.

#### Questions to Ask

1. Comment les architectes identifient-ils un bounded context aujourd'hui, sans outil ?
2. Combien de découpages candidats leur sont utiles ?
3. Quelle forme de justification rend une proposition automatique recevable ?
4. Que fait l'assistant quand le mur est trop pauvre pour fonder une frontière ?
5. Le découpage est-il révisé au fil de plusieurs ateliers ou figé en une fois ?
