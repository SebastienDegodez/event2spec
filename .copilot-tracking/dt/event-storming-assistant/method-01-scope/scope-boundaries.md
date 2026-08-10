# Method 01 — Scope Boundaries (lo-fi, en cours)

> Statut : brouillon de travail. Session du 2026-08-04.

## Demande initiale vs problème découvert

| | |
|---|---|
| **Demande initiale** | « Une application qui accompagne les utilisateurs dans l'exercice d'event storming assisté par l'IA. » |
| **Problème découvert** | Trois manques empilés : (1) pas de méthodologie ES commune, (2) personne ne sait animer, (3) pas de pont entre l'atelier et le process de dev (BRD/PRD/DAT). Le board n'est que le support ; le produit visé ressemble à un **facilitateur d'atelier assisté IA**. |
| **Douleur centrale (2026-08-04)** | **Le dilemme du facilitateur.** Les 2 seules personnes qui maîtrisent la méthode sont des développeurs dont on a aussi besoin comme contributeurs. S'ils animent, ils se taisent. La compétence rare est consommée par la mécanique de l'atelier au lieu d'aller dans le contenu. |

## Arbitrages actés (2026-08-04)

| Tension | Arbitrage |
|---|---|
| T1 — novices en animation vs livrable expert | **Event storming assisté par l'IA** : l'IA porte la méthode, pas les participants. |
| T2 — délai vs profondeur | **On applique l'Event Storming correctement, ça prendra le temps nécessaire.** La deadline de septembre porte sur *l'outil*, pas sur la complétude de l'ES. |
| T3 — novice vs coach agile | **Persona primaire = le coach agile / facilitateur.** Les novices sont participants, pas utilisateurs primaires. |
| T5 — l'IA modélise vs le groupe modélise | **L'IA ne fait aucun choix de contenu.** Elle matérialise les échanges et *propose* ; un post-it n'existe que s'il est **validé par le groupe**. Pas d'hypothèse forte encodée. |
| T7 — l'IA anime-t-elle ? | **Non. L'humain garde l'animation.** L'IA reprend les tâches mécaniques et notationnelles ; le coach agile garde la distribution de la parole, le rythme et les objectifs. |
| T10 — où se fait le niveau Software Design ? | **En séance séparée**, avec les 2 architectes et les 2 développeurs. Pas dans l'atelier à 23. |

## Deux séances, deux surfaces produit (décidé le 2026-08-04)

| | **Séance A — Atelier de domaine** | **Séance B — Séance de conception** |
|---|---|---|
| Participants | 23 personnes, distanciel | 2 architectes + 2 développeurs |
| Niveaux | Big Picture, Process Modeling | Software Design |
| Mode de l'outil | Captation live | Dérivation asynchrone |
| Entrée | La parole des participants | Le mur produit en séance A |
| Sortie | Timeline d'événements, commandes, policies, systèmes | Aggregates, bounded contexts |
| Qui valide | Le groupe | Les architectes |
| Dépend de l'audio ? | Oui | **Non** |

### Ce que cette décision débloque

1. **La séance B ne dépend pas de l'enregistrement.** Si l'hypothèse bloquante A5 (conformité) tombe, le mode Dérivation survit.
2. **Le mode Dérivation est testable dès maintenant**, sur un Event Storming existant fait à la main, sans attendre le moindre atelier. C'est la brique la plus rapide à dérisquer.
3. **Les 6 experts métier sont protégés** d'une discussion sur les frontières de cohérence qui les ferait décrocher.
4. **Les deux modes deviennent développables en parallèle**, ce qui atténue — sans la supprimer — la tension T9 sur le délai.

## Les trois métiers de l'outil (définis le 2026-08-04)

Dérivés directement de ce qui empêche les 2 développeurs de contribuer.

| # | Métier | Ce que l'outil fait |
|---|---|---|
| 1 | **Scribe** | Écrire et placer les post-its à partir de ce qui se dit, sur proposition validée par le groupe. |
| 2 | **Cartographe** | Tenir la chronologie et réorganiser le mur au fil de la discussion. |
| 3 | **Gardien de la grammaire** | Signaler les écarts de notation — « ça c'est une commande, pas un événement », événement au passé, `Event → Policy → Command → System → Event`. |

### Ce que l'outil ne fait pas

- Distribuer la parole, relancer, gérer les silences.
- Tenir le fil du temps et des objectifs de l'atelier.
- Trancher un désaccord métier.

Ces trois-là restent à l'humain. C'est ce qui rend le MVP de septembre crédible.

## Énoncé du problème (à valider)

> L'absence de méthode Event Storming partagée impose la charge d'écrire les post-its, de tenir la chronologie et de policer la notation aux deux seules personnes qui maîtrisent la méthode, alors qu'on les attend aussi comme contributeurs. Comment pourrions-nous matérialiser et normaliser automatiquement les échanges, pour libérer cette compétence rare vers le contenu et produire un modèle exploitable par le process de développement ?

## Périmètre

### Dans le MVP (septembre 2026)

- Niveau **Big Picture** — comprendre le domaine, événements sur une timeline.
- Niveau **Process Modeling** — déroulé des processus, grammaire `Event → Policy → Command → System → Event`.
- Niveau **Software Design** — **aggregates et bounded contexts** *(ajouté le 2026-08-04 à la demande du PO)*.
- Captation multimodale : **commande vocale + texte**, avec **conservation des transcriptions**.
- Matérialisation automatique de ce qui est dit en éléments de notation ES.

#### Notation couverte par le MVP

| Élément | Niveau | Dans le MVP |
|---|---|---|
| Domain Event (orange) | Big Picture | Oui |
| Actor / Person (petit jaune) | Big Picture | Oui |
| Hotspot (rouge) | Big Picture | Oui |
| Opportunity / Value (vert) | Big Picture | Oui |
| System / Système externe (rose) | Process Modeling | Oui |
| Command (bleu) | Process Modeling | Oui |
| Policy (lilas) | Process Modeling | Oui |
| Read Model (vert) | Process Modeling | Oui |
| **Aggregate (jaune)** | Software Design | **Oui** |
| **Bounded Context (regroupement)** | Software Design | **Oui** |

### Conséquence : l'outil a deux modes, pas un

L'ajout du niveau Software Design introduit un mode de fonctionnement **fondamentalement différent** de la captation.

| | Mode 1 — Captation | Mode 2 — Dérivation |
|---|---|---|
| Niveaux | Big Picture, Process Modeling | Software Design |
| Ce que fait l'IA | Matérialise ce qui est **dit** | Propose un découpage **déduit** du modèle |
| Source | La parole des participants | Le mur construit à l'étape précédente |
| Qui valide | Le groupe (23 personnes) | Les architectes + les 2 développeurs |
| Moment | Pendant l'atelier, en direct | Vraisemblablement après, en petit comité |

Personne, dans un atelier, ne dit « voilà un aggregate ». Aggregates et bounded contexts ne se captent pas : ils se **déduisent**. C'est une décision de conception, pas un compte rendu.

### Impact sur l'arbitrage T5

T5 posait : « l'IA ne fait aucun choix ». En mode Dérivation, proposer un découpage **est** un choix. L'arbitrage tient si l'on conserve le même principe de garde-fou : l'IA propose, des humains valident — mais les valideurs changent (architectes et non le groupe entier) et le moment change (hors direct).

### Hors MVP

- **Balanced Coupling** (Khononov) — retiré du périmètre le 2026-08-04 à la demande du PO.
- Génération de **BRD / PRD / DAT** via agents.

#### Contrainte de conception induite

Le modèle de données doit conserver le lien entre chaque post-it et le passage de transcription qui l'a produit, l'ordre chronologique fin, et permettre le regroupement libre de zones du mur. C'est ce qui rend le mode Dérivation possible.

#### Risque parties prenantes

L'architecte solution et l'architecte d'entreprise sont présents à l'atelier de septembre et attendent précisément le niveau Software Design. Ils deviennent désormais les **valideurs du mode Dérivation**, et non plus de simples consommateurs aval.

### Explicitement hors sujet

- Remplacer le facilitateur humain.
- Être un outil de whiteboard générique (Miro-like).

## Contraintes

| Type | Contrainte | Frozen / Fluid |
|---|---|---|
| Délai | Outil utilisable en **septembre 2026** (~4 semaines) | Frozen |
| Format | Atelier en **distanciel**, **23 participants**, domaine **dommage aux biens** | Frozen |
| Ambition | L'outil doit être pensé comme un **SaaS réutilisable par d'autres entreprises** | Frozen |
| Méthode | Event Storming selon Brandolini, notation de référence *awesome-eventstorming* | Frozen |
| Persona | Coach agile en position de facilitateur | Frozen |
| Données | Transcriptions vocales et textes conservés | Frozen (à confronter à la conformité) |
| Stockage | Transcriptions en **markdown, versionnées dans un dépôt Git** — autorisé par l'entreprise | Frozen |
| Technique | Base de code existante `event2spec` — modifiable ou remplaçable | Fluid |
| Profondeur | Big Picture + Process Modeling en MVP | Fluid (négociable si le délai serre) |

## Piste de solution existante — maquette « Nexus »

Maquette fournie le 2026-08-04. Layout deux panneaux :

- **Gauche — Transcription d'atelier** : sélecteur de modèle IA (OpenAI / GPT-4.1), flux de transcription, bouton « Démarrer l'écoute live », bouton « Analyser & Modéliser ».
- **Droite — Event Storming Board** : whiteboard généré automatiquement (nœuds + liens, compteur, minimap), bouton « Export backlog draft ».

Hypothèse encodée dans la maquette : **l'IA écoute puis produit le modèle en batch**. À challenger — voir tension T5.

## Tensions ouvertes (nouvelles)

| # | Tension |
|---|---|
| **T4** | SaaS multi-entreprises réutilisable ↔ outil utilisable dans ~4 semaines pour un atelier interne. |
| ~~T5~~ | *Résolu — voir arbitrages.* |
| **T6** | 23 participants en distanciel ↔ recommandation Brandolini de 5-10 personnes en présentiel mobile. |
| ~~T7~~ | *Résolu — l'IA ne fait pas l'animation.* |
| **T8** | Valider chaque post-it par le groupe ↔ 23 personnes en visio. *Résolu le 2026-08-04 par la couche fantôme : les post-its proposés par l'IA expirent s'ils ne sont pas adoptés. Ne rien faire coûte zéro.* |
| **T9** | Les 3 niveaux d'Event Storming dans le MVP ↔ 4 semaines de développement. C'est la tension la plus lourde du projet à ce jour. Atténuée par la séparation en deux séances, non résolue. |
| ~~T10~~ | *Résolu — séance séparée pour le niveau Software Design.* |

## Questions ouvertes

1. **Qui anime concrètement l'atelier de septembre ?** Aucun coach agile n'apparaît dans la liste des 23 participants, alors que c'est le persona primaire.
2. Qui porte la **conformité** sur la conservation des transcriptions vocales (DPO, sécurité IT) ? Ont-ils été consultés ?
3. Le MVP doit-il déjà produire un artefact exploitable par les agents (BRD/PRD), ou uniquement un ES lisible par un humain ?
4. Que garde-t-on du POC `event2spec` ?
5. « SaaS réutilisable » : ambition de conception (architecture non couplée à AXA) ou produit commercialisable attendu à court terme ?
6. Comment fait-on parler 6 experts métier au milieu de 17 autres personnes, en visio ?
