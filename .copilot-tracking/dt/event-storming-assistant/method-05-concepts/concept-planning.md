# Method 05a — Sélection des thèmes

> Créé le 2026-08-05. Objectif : retenir 2 à 3 thèmes sur 5 pour le développement de concepts.
> **Ce document est le lieu où T9 se tranche.** Cinq thèmes ne rentrent pas en quatre semaines.

## Les cinq thèmes en concurrence

| # | Thème | Sert qui | IA requise | Résout |
|---|---|---|---|---|
| 1 | Le cadre porte la méthode | Le coach agile | Non | F1, A4 |
| 2 | Le clavier remplace le mur | Les experts métier | Non | A3, A15 |
| 3 | L'IA garde la grammaire | Les 2 devs praticiens | Oui | F4, 3ᵉ métier de l'outil |
| 4 | La couche fantôme | Le groupe entier | Oui | T8, garantit T5 |
| 5 | L'instrument de mesure | Les 2 architectes | Partielle | A11, mode Dérivation |

## Dépendances entre thèmes

Elles contraignent l'ordre, pas seulement le choix.

```
Thème 1 (cadre)  ──────────────► indépendant, socle de l'expérience
Thème 2 (clavier) ─────────────► indépendant, mais suppose un mur existant
Thème 3 (grammaire) ───────────► suppose une saisie utilisateur (thème 2)
Thème 4 (couche fantôme) ──────► mécanisme réutilisé par le thème 5
Thème 5 (instrument) ──────────► suppose thème 4 pour les frontières fantômes
                                  la partie mesure est indépendante
```

Conséquence : **le thème 4 est un multiplicateur.** Le construire sert deux fois. L'abandonner ampute le thème 5 de sa moitié IA.

## Répartition sur les deux jours

| Moment | Ce qui se passe | Thèmes mobilisés |
|---|---|---|
| Jour 1 matin | Big Picture — événements en vrac puis timeline | 1, 2, 4 |
| Jour 1 après-midi | Process Modeling — commandes, policies, systèmes | 1, 3, 4 |
| **La nuit** | Traitement par lot, sans contrainte temps réel | 4, 5 |
| Jour 2 matin | Revue des propositions, complétude | 1, 3, 4 |
| Jour 2 après-midi | Séance B — découpage avec les architectes | 5 |

**La nuit est un actif sous-estimé.** Tout ce qui y est traité échappe à la contrainte temps réel, qui est la plus coûteuse à construire.

## Angles de sélection

Trois façons de trancher, qui ne donnent pas le même résultat.

### Angle A — Franchir la barre à coup sûr

Thèmes **1 + 2**. Aucune IA. Faisabilité élevée. L'atelier de septembre est meilleur que sans outil, de façon quasi certaine.
Risque : ce n'est plus un outil d'Event Storming assisté par l'IA, c'est un outil d'atelier. La promesse initiale n'est pas tenue.

### Angle B — Tenir la promesse

Thèmes **1 + 3 + 4**. Le cadre, la grammaire, la couche fantôme. C'est le produit décrit dans la vision, côté Captation.
Risque : trois thèmes dont deux dépendent de l'IA, en quatre semaines. Et les architectes repartent les mains vides.

### Angle C — Ne perdre personne

Thèmes **1 + 4 + 5**. Le cadre, la couche fantôme, l'instrument de mesure. Chaque persona reçoit quelque chose, y compris les architectes.
Risque : les experts métier ne reçoivent rien de spécifique ; le risque du silence en visio reste entier.

## Variable manquante

Le choix ne peut pas être arbitré sans connaître la **capacité réelle de développement** : combien de personnes, à quel taux d'occupation, sur les quatre semaines. Cette information n'a pas encore été fournie.

## Sélection retenue

**Décision du PO le 2026-08-05 : les cinq thèmes sont retenus.**

L'arbitrage ne porte donc plus sur *combien de thèmes* mais sur *quelle profondeur par thème*. Chaque thème est découpé en deux niveaux : une **v0** qui doit tenir en septembre, une **v1** qui vient après.

### Découpage v0 / v1

| Thème | v0 — septembre | v1 — après | LLM en v0 ? |
|---|---|---|---|
| **1 — Le cadre** | Agenda type figé, étape courante affichée, chrono lancé par le coach | Chrono automatique, alerte à 5 min, indicateur d'avance/retard, agenda modifiable | Non |
| **2 — Le clavier** | Champ de saisie, arrivée des post-its en vrac, minuteur de tempête silencieuse | Vote par points, compteur public de contributions | Non |
| **3 — La grammaire** | Règles déterministes : verbe au passé, motifs `whenever/then`, légende contextuelle permanente | Reformulation par LLM et suggestion de type de post-it | **Non** |
| **4 — La couche fantôme** | Post-its IA visuellement distincts, expiration en fin d'étape, adoption par clic | Analyse continue pendant la séance | Oui |
| **5 — L'instrument** | Mesures sur le graphe : liens traversants, coloration par acteur, événements orphelins, lasso | Propositions de découpage par LLM, en couche fantôme | **Non** |

### Ce que ce découpage révèle

**Un seul thème sur cinq exige un LLM en v0** — le thème 4. Et même lui peut tourner en traitement de nuit, sans contrainte temps réel.

Conséquences directes :

- **A14 devient presque sans objet.** Si la sécurité IT refuse l'API externe, quatre thèmes sur cinq fonctionnent intégralement.
- **A10 se dégonfle encore.** Le mode Dérivation en v0 ne repose sur aucune inférence : compter des liens traversants et colorier par acteur sont des opérations déterministes sur un graphe.
- **La partie la plus visible de la promesse « assisté par l'IA » est concentrée dans un seul thème.** C'est aussi le plus fragile en cas de retard.

### Le risque de « tout »

Cinq thèmes en v0 produisent un outil qui fait cinq choses de façon superficielle. Deux thèmes en v1 produiraient un outil qui en fait deux bien. Le premier couvre tous les personas ; le second en satisfait vraiment quelques-uns.

Ce choix est légitime, mais il n'est pas neutre. Il est acté ici pour rester visible si l'atelier de septembre déçoit.

### Variable toujours manquante

La capacité de développement n'est toujours pas connue. Même le plan v0 ne peut pas être vérifié sans elle.

---

## Sélection finale du PO (2026-08-05)

| Thème | Niveau retenu |
|---|---|
| 1 — Le cadre | v0 |
| 2 — Le clavier | v0 |
| 3 — La grammaire | **v1** |
| 4 — La couche fantôme | **v1** |
| 5 — L'instrument | v0 |

**Capacité annoncée : 1 développeur à 100 %, staff engineer, assisté par un LLM avancé.**

Observation : les deux thèmes portés en v1 sont précisément les deux qui dépendent d'un LLM. Le choix va vers la promesse, pas vers la sécurité.

## Le socle invisible

Aucun des cinq thèmes n'est un produit. Tous présupposent une infrastructure que personne n'a chiffrée.

| Brique | Présente dans `event2spec` ? |
|---|---|
| Board collaboratif temps réel, 23 utilisateurs simultanés | **Non** |
| Backend et persistance serveur | **Non** — `localStorage` uniquement |
| Identité et session utilisateur | **Non** |
| Export markdown versionné dans un dépôt Git | **Non** |
| Captation audio et transcription | **Non** |

### État réel du POC

Analyse de `src/core/store/boardPersistence.ts` le 2026-08-05 :

1. **Mono-utilisateur.** La persistance passe par `localStorage`. Le board vit dans un seul navigateur. Ni backend, ni synchronisation, ni temps réel.
2. **Notation Event Modeling, pas Event Storming.** Types de nœuds : `domainEvent | command | readModel | policy | uiScreen`, avec des *vertical slices*. C'est le modèle d'Adam Dymitruk, pas celui de Brandolini.

Éléments du périmètre MVP absents du POC : **Actor, Hotspot, Opportunity, System externe, Aggregate**. Cinq des dix éléments de notation retenus.

Ce qui est réutilisable : le moteur de board, les liens, les bounded contexts, la structure de domaine et la couverture de tests.

## Arithmétique

Environ 20 jours ouvrés. Un développeur.

À construire : un socle collaboratif temps réel pour 23 utilisateurs, cinq éléments de notation manquants, cinq thèmes dont deux en v1 — incluant la transcription audio live et l'analyse continue en séance.

Le thème 4 en v1 est de loin le poste le plus lourd : écoute live, transcription, analyse continue, couche fantôme, péremption. C'est aussi celui pour lequel **la nuit entre les deux jours offre une alternative bien moins coûteuse.**

## Décisions du 2026-08-05

### 1. Socle technique

**On repart d'une base pensée multi-utilisateurs dès le départ.** `event2spec` n'est plus le socle. Il devient une référence : le modèle de domaine, la logique de board et la couverture de tests restent consultables et partiellement transposables, mais l'architecture est reprise à zéro autour de la collaboration temps réel.

Conséquence : le socle collaboratif devient le premier poste de développement, avant tout thème.

### 2. Thème 4 — déclenchement sur pause

Le thème 4 reste en **v1**, avec une règle modifiée :

> La couche fantôme ne se matérialise plus au fil de l'eau. **Elle est générée aux pauses de séance.** La transcription reste continue ; l'analyse devient un traitement par lot déclenché.

Ce que cela change :

| | Avant | Après |
|---|---|---|
| Transcription | Continue | Continue (inchangé) |
| Analyse LLM | Continue, en temps réel | Par lot, déclenchée à la pause |
| Apparition des post-its fantômes | Au fil de la discussion | À la reprise après pause |
| Contrainte temps réel sur l'IA | **Forte** | **Supprimée** |

**Cette règle était déjà décrite dans la maquette Nexus** : *« laissez Nexus analyser automatiquement les temps de pause pour mettre à jour le board. Cela permet de garder une trace exploitable des échanges sans interrompre le travail du groupe. »* La décision confirme l'intuition initiale par le raisonnement.

Effet secondaire notable : le groupe n'est plus interrompu pendant qu'il pense. Les propositions arrivent à un moment où l'attention est disponible.

### Bilan des deux décisions

| Décision | Effet sur la charge |
|---|---|
| Repartir sur une base multi-utilisateurs | **Augmente** — le socle collaboratif devient un poste à part entière |
| Thème 4 déclenché sur pause | **Réduit fortement** — supprime la contrainte temps réel de l'IA |

Le solde reste tendu : un développeur, environ 20 jours ouvrés, un socle collaboratif à créer, cinq éléments de notation à ajouter, cinq thèmes à livrer.
