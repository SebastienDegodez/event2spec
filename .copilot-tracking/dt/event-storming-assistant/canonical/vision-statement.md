---
title: "Event Storming Assistant — Vision"
project: event-storming-assistant
snapshot: "2026-08-05-refresh"
source_method: 5
---

# Event Storming Assistant — Vision

## Vision Statement

Nous voulons que n'importe quelle organisation puisse conduire un Event Storming complet — de la découverte du domaine jusqu'au découpage en bounded contexts — sans dépendre de la disponibilité d'un expert de la méthode : un assistant écoute l'atelier et matérialise en direct ce que les participants disent, puis, en séance de conception restreinte, propose un découpage déduit du modèle — dans les deux cas sur validation humaine explicite, pendant que les humains gardent l'animation, le débat et la décision.

### Why This Matters

Dans un programme de transformation, le goulot d'étranglement n'est pas la vitesse d'écriture du code : c'est la vitesse à laquelle une organisation comprend son propre domaine. L'Event Storming est la méthode la plus efficace connue pour produire cette compréhension partagée, mais elle bute sur une rareté : très peu de gens savent l'animer, et ceux qui savent sont précisément ceux dont on a besoin comme contributeurs. Le résultat observé est un exercice mal cadré, non reproductible, dont la sortie n'alimente pas la chaîne de développement.

Rendre la méthode disponible sans consommer la compétence rare produit trois effets en cascade :

- **Pour le programme** — le cadrage du domaine dommage aux biens devient prévisible en durée et en qualité, au lieu de dépendre d'une personne.
- **Pour les équipes de développement** — la sortie devient un modèle structuré jusqu'au découpage en aggregates et bounded contexts, exploitable par des agents pour générer BRD, PRD et dossier d'architecture technique, au lieu de photos de post-its qu'il faut retranscrire à la main.
- **Pour l'organisation** — la conversation métier cesse de s'évaporer. Chaque élément du modèle reste rattaché au passage de discussion qui l'a produit, ce qui rend le modèle défendable et révisable.

### Deux modes, une seule chaîne

La vision repose sur une distinction structurante actée le 2026-08-04 : ce qui se **capte** et ce qui se **déduit**.

| | Mode Captation | Mode Dérivation |
|---|---|---|
| Séance | Atelier de domaine, 23 personnes, distanciel | Séance de conception, architectes et développeurs |
| Niveaux | Big Picture, Process Modeling | Software Design |
| Entrée | La parole des participants | Le mur produit par la séance précédente |
| Sortie | Événements, commandes, policies, systèmes, acteurs | Aggregates, bounded contexts |
| Validation | Le groupe | Les architectes |

Personne, dans un atelier, ne dit « voilà un aggregate ». Cette frontière entre captation et dérivation n'est pas un détail d'implémentation : c'est ce qui garantit que le modèle reste l'œuvre du groupe, et c'est ce qui rend le produit constructible dans le délai imparti.

### Portée au-delà du cas initial

À plus long terme, aucune de ces douleurs n'est spécifique à une entreprise. Le manque de facilitateurs Event Storming et la perte de la conversation métier sont universels, ce qui ouvre la voie à un produit réutilisable au-delà du contexte initial. Cette généralisation reste une ambition non démontrée : un seul cas d'usage est observé à ce jour.

### Ce que la vision devient concrètement

La vision se matérialise en cinq concepts, ordonnés par dépendance et livrés en série par un seul développeur avant septembre 2026.

| Ordre | Concept | Ce qu'il apporte |
|---|---|---|
| 1 | **Le Fil Conducteur** | Le déroulé porte la méthode à la place du facilitateur |
| 2 | **La Tempête Silencieuse** | Vingt-trois claviers écrivent en même temps ; contribuer n'exige plus de parler |
| 3 | **L'Instrument de Mesure** | Les architectes mesurent un découpage au lieu de recevoir un verdict |
| 4 | **La Couche Fantôme** | L'IA propose aux pauses, dans une couche distincte qui expire si elle n'est pas adoptée |
| 5 | **Le Gardien de la Grammaire** | La notation est tenue à la saisie, sans qu'un humain corrige les autres à voix haute |

La règle qui gouverne cet ordre : **à chaque palier, ce qui existe doit être utilisable dans la salle.** La ligne de sécurité est franchie dès le concept 2. Tout ce qui suit améliore sans conditionner la tenue de l'atelier.

Résultat contre-intuitif de la conception : **l'essentiel de la valeur ne vient pas de l'IA.** Trois des cinq concepts fonctionnent sans aucun modèle de langage. L'IA ajoute une couche ; elle ne porte pas le produit.
