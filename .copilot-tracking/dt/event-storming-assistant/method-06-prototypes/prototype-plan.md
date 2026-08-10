# Method 06 — Plan de prototypage lo-fi

> Créé le 2026-08-05. Règle : chaque prototype teste **une seule** hypothèse, se construit en minutes ou en heures, et reste volontairement moche.

## Principe directeur

Aucun de ces prototypes ne consomme les 20 jours de développement. Ce sont du papier, des fichiers partagés et des conversations. **Ils tournent en parallèle du développement**, portés par le PO pendant que le développeur construit le concept 1.

C'est la seule ressource gratuite du projet.

---

## 1. Le Fil Conducteur

**Hypothèse centrale** : un coach agile qui ne connaît pas l'Event Storming peut mener les étapes s'il dispose d'un déroulé écrit.

| | |
|---|---|
| **Prototype** | Un document de deux pages : 8 étapes, pour chacune l'attendu, la durée et une phrase à dire au groupe |
| **Temps de fabrication** | 45 minutes |
| **Comment tester** | Donner le document au coach agile. Lui demander de raconter comment il mènerait l'étape 3, sans aide |
| **Ce qu'on observe** | Où il hésite, ce qu'il demande, ce qu'il invente |
| **Variantes** | Cartes papier une par étape ; un slide par étape ; un script à lire à voix haute |

**Signal d'échec** : il pose plus de trois questions sur ce qu'on attend de lui. Le déroulé n'est alors pas assez explicite, et l'écran ne le sauvera pas.

---

## 2. La Tempête Silencieuse

**Hypothèse centrale** : en visio, vingt-trois personnes produisent plus d'événements en écrivant simultanément qu'en parlant.

| | |
|---|---|
| **Prototype** | Un formulaire partagé ou un document collaboratif, plus un minuteur. Zéro code |
| **Temps de fabrication** | 10 minutes |
| **Comment tester** | Sur une réunion du programme qui a déjà lieu. Sept minutes, tout le monde écrit, personne ne parle |
| **Ce qu'on observe** | Combien de personnes contribuent, combien d'items par personne, et combien de contributeurs n'auraient jamais pris la parole |
| **Variantes** | Chat de la visio ; tableau blanc partagé ; envoi individuel par message privé |

**C'est le prototype le plus rentable du lot.** Il valide A3 et A15 — les deux hypothèses écartées sans preuve — pour dix minutes de préparation.

**Signal d'échec** : moins de la moitié des participants écrivent quelque chose. Le clavier ne suffit pas à débloquer la contribution.

---

## 3. L'Instrument de Mesure

**Hypothèse centrale** : les architectes acceptent des mesures et rejettent des verdicts.

| | |
|---|---|
| **Prototype** | Un mur d'Event Storming public imprimé ou affiché, plus un comptage fait à la main : « cette frontière, 12 liens la traversent ; celle-ci, 3 » |
| **Temps de fabrication** | 2 heures |
| **Comment tester** | Soumettre le mur et les comptages aux deux architectes. Ne rien proposer comme découpage |
| **Ce qu'on observe** | S'ils se saisissent des chiffres pour raisonner, ou s'ils les ignorent et découpent à l'instinct |
| **Variantes** | Coloration par acteur au surligneur ; liste des événements orphelins ; deux découpages concurrents à comparer |

**Signal d'échec** : ils découpent sans regarder les mesures. L'instrument ne sert alors à rien et le concept 3 doit être repensé.

---

## 4. La Couche Fantôme

**Hypothèse centrale** : le groupe distingue les propositions de l'assistant des siennes, et les adopte sans se sentir dépossédé.

| | |
|---|---|
| **Prototype** | **Magicien d'Oz.** Un humain joue l'IA. Il écoute la réunion en silence et, pendant la pause, pose des post-its d'une couleur différente. Aucune technologie |
| **Temps de fabrication** | 0 minute. Il faut juste une personne volontaire |
| **Comment tester** | Sur une réunion existante du programme. Annoncer que des propositions apparaîtront à la pause, sans dire qui les produit |
| **Ce qu'on observe** | Combien de propositions sont adoptées, combien sont contestées, et si quelqu'un confond les deux couleurs |
| **Variantes** | Propositions annoncées à voix haute ; propositions envoyées par écrit ; propositions sans annonce préalable |

**C'est le prototype le plus élégant du plan.** Il teste le mécanisme social — de loin le plus incertain — sans une ligne de code ni une seconde de transcription.

**Signal d'échec** : le groupe adopte tout sans discuter. La couche fantôme produirait alors un consensus artificiel, exactement ce que l'Event Storming cherche à éviter.

---

## 5. Le Gardien de la Grammaire

**Hypothèse centrale** : un modèle reconnaît et reformule correctement la notation Event Storming sur du jargon assurance dommage aux biens.

| | |
|---|---|
| **Prototype** | Un prompt dans une fenêtre de chat, plus trente phrases métier réelles extraites de comptes rendus existants |
| **Temps de fabrication** | 1 heure |
| **Comment tester** | Soumettre les trente phrases. Comparer le typage et la reformulation au jugement d'un des deux développeurs praticiens |
| **Ce qu'on observe** | Taux de typage correct, qualité des reformulations, comportement sur le vocabulaire assurance ambigu |
| **Variantes** | Sans exemples ; avec exemples ; avec la légende de notation en contexte |

C'est le spike de dérisquage évoqué en Méthode 5, ramené à sa forme la plus pauvre. **Il répond à A10 pour une heure de travail.**

**Signal d'échec** : moins de deux tiers de typage correct. Le Gardien devient alors du bruit plutôt qu'une aide, et sa moitié déterministe devient la seule à conserver.

---

## Ce qui peut tourner sur une réunion existante

Trois des cinq prototypes ne demandent aucun atelier dédié :

| Prototype | Support |
|---|---|
| La Tempête Silencieuse | N'importe quelle réunion du programme, 7 minutes |
| La Couche Fantôme | La même réunion, une personne qui joue l'IA |
| Le Fil Conducteur | Une conversation de 30 minutes avec le coach agile |

Les deux autres se font au bureau, seul, en quelques heures.

## Utilisateurs de test

| Prototype | Qui | Pourquoi cette personne |
|---|---|---|
| Le Fil Conducteur | Le coach agile | Il est le persona primaire, et il n'a jamais fait d'Event Storming |
| La Tempête Silencieuse | Les 6 experts métier | Ce sont eux qui se taisent, ou pas |
| L'Instrument de Mesure | Les 2 architectes | Ce sont les seuls juges du découpage |
| La Couche Fantôme | Un groupe mixte, 8 personnes minimum | Le mécanisme social a besoin de nombre |
| Le Gardien de la Grammaire | Un développeur praticien | Il est le seul à pouvoir juger le typage |

**Ne pas tester uniquement avec des personnes accommodantes.** Le prototype 4 doit rencontrer quelqu'un qui conteste.

## Résultats

*(à compléter après chaque test)*
