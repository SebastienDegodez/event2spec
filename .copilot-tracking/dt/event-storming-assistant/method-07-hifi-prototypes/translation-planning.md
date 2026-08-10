# Method 07a — Traduction technique

> Créé le 2026-08-05. Objectif : convertir les contraintes des Méthodes 1 à 6 en décisions d'architecture exploitables par un développeur unique en ~20 jours.
> **Ce document liste des décisions et leurs arbitrages, pas une conception détaillée.**

## Contraintes → exigences techniques

| Origine | Contrainte | Exigence technique |
|---|---|---|
| Atelier distanciel, 23 participants | Tout le monde écrit en même temps | Synchronisation temps réel multi-utilisateurs |
| Barre « meilleur que sans outil » | L'atelier doit tenir même dégradé | Aucun concept ne doit bloquer le suivant |
| Transcriptions markdown en Git | Trace versionnée et relisible | Export markdown déterministe |
| A14 non tranchée | Traitement LLM externe incertain | Abstraction du fournisseur de modèle |
| Couche fantôme aux pauses | Analyse par lot, pas en continu | Aucune contrainte temps réel côté IA |
| Notation Event Storming complète | 10 éléments dont 5 absents du POC | Modèle de domaine à étendre |
| 2 jours d'atelier, une nuit au milieu | Traitement possible hors séance | Travaux par lot autorisés |

---

## D0 — Hébergement (tranché le 2026-08-05)

**Kubernetes interne. Validation sécurité acquise.**

Conséquences immédiates :

1. **L'option C de D1 sort du jeu.** Aucun backend temps réel managé externe : tout est auto-hébergé.
2. Le contenu métier ne quitte pas l'entreprise pour l'hébergement. La question de l'appel à un LLM externe (A14) reste distincte : héberger en interne et appeler une API tierce sont deux flux différents.
3. La containerisation devient une contrainte de conception : un service auto-hébergeable, sans dépendance à un service managé.

### Simplification majeure : pas de mise à l'échelle horizontale

Vingt-trois utilisateurs simultanés, deux jours par an. Ce n'est pas une charge.

| Ce qu'on évite | Pourquoi |
|---|---|
| Plusieurs répliques du service temps réel | Un seul pod tient largement 23 connexions WebSocket |
| Sessions collantes / *sticky sessions* | Sans réplique, la question ne se pose pas |
| Bus de messages partagé (Redis pub/sub) | L'état vit en mémoire dans le pod unique |
| Gestion d'état distribué | Aucun état réparti à réconcilier |

**État en mémoire dans un pod unique, persisté périodiquement.** Ce choix supprime plusieurs jours de complexité distribuée qui n'apporteraient rien à vingt-trois personnes.

Risque assumé : si le pod redémarre pendant l'atelier, on repart de la dernière persistance. Une sauvegarde toutes les quelques secondes rend la perte négligeable, et l'atelier est un événement encadré, pas un service permanent.

---

## D1 — Synchronisation temps réel

**Le poste le plus lourd du projet.** Vingt-trois sessions simultanées sur un mur partagé.

| Option | Ce qu'on gagne | Ce qu'on paie |
|---|---|---|
| **A — CRDT client** (Yjs, Automerge) | Résolution de conflits automatique, tolérance à la déconnexion | Courbe d'apprentissage, serveur relais à héberger |
| **B — Serveur autoritaire + WebSocket** | Contrôle total, raisonnement simple, ordre des événements garanti | Toute la logique de conflit à écrire soi-même |
| ~~C — Backend temps réel managé~~ | — | **Écartée** : hébergement interne décidé |

### Ce que l'hébergement Kubernetes change

Les deux options restantes sont auto-hébergeables. Le critère devient donc uniquement la charge de développement.

**Option A** : le serveur relais est un petit service Node de quelques dizaines de lignes, trivial à containeriser. Le coût réel est l'apprentissage du modèle CRDT et son mariage avec le modèle de domaine existant.

**Option B** : rien à apprendre, mais la gestion des éditions concurrentes, de l'ordre et de la reconnexion est entièrement à écrire. Sur vingt jours et un développeur, c'est le poste qui déborde.

Le cas d'usage dominant — la Tempête Silencieuse, où vingt-trois personnes **ajoutent** des post-its sans se marcher dessus — est structurellement simple : peu de modifications concurrentes du même objet, beaucoup d'insertions indépendantes. Les deux options le traitent bien.

---

## D0bis — Pile technique (tranché le 2026-08-05)

**Node.js interdit par la sécurité. La pile est .NET.**

Conséquences en cascade :

1. **Yjs est écarté.** Son serveur relais de référence est un service Node. Il existe des portages C# du protocole, mais leur maturité ne justifie pas le pari sur vingt jours.
2. **SignalR devient le choix naturel.** C'est la brique temps réel d'ASP.NET Core, et elle fournit gratuitement ce qui rendait l'option B coûteuse.
3. **Le modèle de domaine bascule côté serveur, en C#.** Le serveur devient autoritaire.

---

## D1 — Synchronisation temps réel (révisé)

| Option | Statut |
|---|---|
| ~~A — CRDT client (Yjs)~~ | **Écartée** : relais Node interdit |
| **B — Serveur autoritaire + SignalR** | **Retenue par élimination, et moins coûteuse que prévu** |
| ~~C — Backend managé~~ | **Écartée** : hébergement interne décidé |

### Pourquoi l'option B coûte moins cher que ce qui était estimé

L'estimation initiale supposait d'écrire soi-même le transport, la reconnexion et le routage. SignalR les fournit.

| Ce qu'il fallait écrire | Avec SignalR |
|---|---|
| Transport WebSocket et repli | Fourni |
| Reconnexion automatique | Fourni |
| Diffusion à un groupe (une session d'atelier) | Fourni via les *groups* |
| Sérialisation des messages | Fourni |
| **Résolution des éditions concurrentes** | **À écrire** |

Il ne reste donc que le dernier point.

### Le modèle de concurrence suffisant

Le cas d'usage dominant — la Tempête Silencieuse — est fait d'**insertions indépendantes** : vingt-trois personnes ajoutent chacune leurs post-its, sans toucher à ceux des autres.

| Opération | Fréquence de conflit | Traitement suffisant |
|---|---|---|
| Ajouter un post-it | Nulle | Le serveur attribue un identifiant et diffuse |
| Déplacer un post-it | Faible | Dernier arrivé gagne |
| Renommer un post-it | Faible | Dernier arrivé gagne, par champ |
| Supprimer un post-it | Rare | Suppression logique, idempotente |
| Édition simultanée du même texte | Très rare | Verrou optimiste par post-it, le second est averti |

Un CRDT complet résoudrait l'édition collaborative caractère par caractère d'un même texte. **Ce n'est pas le problème de cet outil.** Un modèle serveur autoritaire avec dernier-arrivé-gagne par champ couvre l'intégralité des scénarios d'atelier.

### Architecture résultante

```
Navigateurs (23)  ──SignalR──►  ASP.NET Core, pod unique
                                    ├─ État de session en mémoire
                                    ├─ Modèle de domaine C#
                                    └─ Persistance périodique
```

Pas de backplane Redis : un seul pod. Pas de sessions collantes : une seule instance.

---

## D5 — Réutilisation d'`event2spec` (révisé)

La bascule en .NET change la nature de la réutilisation.

| Élément | Avant | Avec .NET |
|---|---|---|
| Modèle de domaine TypeScript | Réutilisable directement | **À transposer en C#** — la conception reste valable, le code non |
| Cas d'usage commandes / requêtes | Réutilisables | Structure transposable |
| Tests | Réutilisables | À réécrire, mais les **cas de test** restent valables |
| Store et persistance | À remplacer | À remplacer |
| Interface | Partiellement | **Dépend de la question ouverte ci-dessous** |

`event2spec` reste une référence de conception : les invariants, les règles de grammaire et les cas de test sont le fruit d'un travail réel et se transposent. Le code, lui, ne survit pas.

---

## Question ouverte immédiate — tranchée le 2026-08-05

**Node est interdit à l'exécution uniquement.** L'outillage de construction reste autorisé.

Pile retenue :

```
CI                 ─►  build Vite / React / TypeScript  ─►  assets statiques
Kubernetes         ─►  ASP.NET Core (pod unique)
                        ├─ sert les assets statiques
                        ├─ Hub SignalR
                        ├─ modèle de domaine C#
                        └─ persistance périodique
```

Aucun processus Node ne tourne en production. Le front reste React/TypeScript.

### Piège à éviter : le domaine en double

`event2spec` porte un modèle de domaine TypeScript complet. Avec un serveur autoritaire en C#, **ce modèle ne doit pas être transposé côté client.** Deux modèles de domaine dans deux langages divergent toujours, et la divergence se paie sur les règles de grammaire — précisément le cœur du produit.

| Couche `event2spec` | Sort |
|---|---|
| Canvas, rendu, interaction, hooks UI | **Réutilisable** — c'est là qu'est la valeur du POC côté front |
| Composants de panneaux et de modales | **Réutilisables** |
| Modèle de domaine TypeScript | **Ne pas transposer côté client** — il migre en C# côté serveur |
| Cas d'usage commandes / requêtes | Deviennent les commandes du Hub SignalR, en C# |
| Store Zustand et `localStorage` | Remplacés par un état synchronisé depuis le serveur |
| Tests de domaine | Les **cas** se transposent en C#, le code non |

Le client devient une vue avec affichage optimiste. Le serveur détient la vérité, y compris les règles de notation.

---

## D2 — Captation audio et transcription

**Découverte structurante** : si l'atelier se tient sur Teams, **Teams produit déjà une transcription horodatée**.

| Option | Charge | Qualité |
|---|---|---|
| **A — Import de la transcription Teams** | Quasi nulle : lire un fichier | Bonne, avec identification des locuteurs |
| **B — Web Speech API dans le navigateur** | Faible | Variable, un seul micro, dépend du navigateur |
| **C — Bot connecté à la visio** | Élevée : autorisations, hébergement, intégration | Bonne |

L'option A supprime purement et simplement le poste « captation » du plan de développement. La transcription n'est plus produite par l'outil, elle est **importée**. Le déclenchement à la pause devient un import manuel par le coach, ce qui est parfaitement acceptable pour septembre.

**Conséquence sur la Couche Fantôme** : le concept 4 perd sa partie la plus coûteuse et se réduit à « lire un fichier, appeler un modèle, afficher une couche distincte ».

---

## D3 — Export markdown versionné en Git

| Option | Charge |
|---|---|
| **A — Téléchargement d'un fichier, commit manuel par le développeur** | Quelques heures |
| **B — Commit automatique via l'API Git** | Plusieurs jours : authentification, gestion des jetons, conflits |

Pour septembre, l'option A remplit l'exigence — la trace est versionnée et relisible. L'automatisation n'apporte rien que l'atelier remarquera.

---

## D4 — Abstraction du fournisseur LLM

A14 n'est pas tranchée. Deux concepts sur cinq en dépendent.

Exigence minimale : **une interface unique** avec une seule méthode, et des prompts stockés dans des fichiers séparés du code. Un adaptateur pour commencer, un second possible sans refonte.

Coût : quelques heures. Bénéfice : si la sécurité IT impose un modèle interne, le changement est local.

---

## D5 — Réutilisation d'`event2spec`

| Élément | Réutilisable ? |
|---|---|
| Modèle de domaine (nœuds, liens, bounded contexts) | **Oui**, avec extension |
| Cas d'usage commandes / requêtes | **Oui**, la séparation est saine |
| Couverture de tests | **Oui**, précieuse |
| Store et persistance `localStorage` | **Non**, à remplacer |
| Composants de canvas et de rendu | **Partiellement** |
| Vertical slices (Event Modeling) | **Hors périmètre** Event Storming |

**Notation à ajouter** : `Actor`, `Hotspot`, `Opportunity`, `System` (externe), `Aggregate`. Cinq types de nœuds, plus les règles de grammaire associées.

---

## Critères d'acceptation par palier

Formulés en comportements observables, pas en fonctionnalités livrées.

| Palier | Critère d'acceptation |
|---|---|
| **1 — Le Fil Conducteur** | Le coach enchaîne les 8 étapes des deux jours sans demander ce qu'on attend de lui |
| **2 — La Tempête Silencieuse** | 23 personnes écrivent simultanément pendant 7 minutes sans perte ni collision, et le tri par vote aboutit |
| **3 — L'Instrument de Mesure** | Un architecte entoure une zone et obtient le nombre de liens traversants, sur un mur de plus de 100 nœuds |
| **4 — La Couche Fantôme** | Après import d'une transcription, des propositions apparaissent dans une couche distincte et disparaissent si personne ne les adopte |
| **5 — Le Gardien de la Grammaire** | Une saisie non conforme déclenche une proposition de reformulation acceptable par un développeur praticien |

Le palier 2 est la **ligne de sécurité**. En dessous, l'atelier de septembre n'est pas tenable.

---

## Spikes techniques recommandés

Courts, jetables, avant de s'engager.

| Spike | Question | Durée |
|---|---|---|
| SignalR à 23 connexions | Un pod unique tient-il 23 connexions actives sans perte ? | 1 jour |
| Transcription Teams | Le format de sortie est-il exploitable tel quel ? | 2 heures |
| Volumétrie du board | Le rendu tient-il à 200 nœuds et 300 liens ? | 2 heures |

---

## Question ouverte bloquante

~~Où l'application est-elle hébergée, et la sécurité IT l'a-t-elle validée ?~~ **Tranchée le 2026-08-05 : Kubernetes interne, sécurité validée.**

Reste une question de moindre portée : l'autorisation d'hébergement ne couvre pas nécessairement l'**appel sortant vers une API LLM tierce**. L'abstraction D4 rend ce point non bloquant — il décide seulement quel adaptateur est branché.
