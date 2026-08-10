# Method 05c — Ordre de construction et séquencement

> Créé le 2026-08-05. Capacité : 1 développeur à 100 %, ~20 jours ouvrés.

## Ordre retenu par le PO

1. **Le Fil Conducteur**
2. **La Tempête Silencieuse**
3. **L'Instrument de Mesure**
4. **La Couche Fantôme**
5. **Le Gardien de la Grammaire**

Cet ordre suit le graphe de dépendances et respecte la règle du toujours-livrable : à chaque instant, ce qui existe est utilisable dans la salle.

## Ce qui existe à chaque palier

| Après | Le coach dispose de | L'atelier est-il tenable ? |
|---|---|---|
| 1 | Un déroulé affiché, l'étape en cours, le temps restant | Partiellement — pas de mur partagé |
| 2 | Un mur collaboratif où 23 personnes écrivent en même temps, un tri par vote | **Oui.** Big Picture réalisable |
| 3 | Le lasso, les liens traversants, la coloration par acteur | **Oui**, séance B comprise |
| 4 | La transcription conservée, les propositions fantômes aux pauses | Oui, avec assistance IA |
| 5 | La reformulation et la suggestion de type à la saisie | Produit complet |

La ligne de sécurité est franchie **au palier 2**. Tout ce qui suit améliore ; rien ne conditionne la tenue de l'atelier.

## Estimation grossière

Ordres de grandeur, à confronter au jugement du développeur.

| # | Concept | Charge estimée | Pourquoi |
|---|---|---|---|
| 1 | Le Fil Conducteur | ~3 j | Panneau simple, mais porte aussi l'ossature applicative |
| 2 | La Tempête Silencieuse | ~7 à 8 j | **Le gros poste.** Board collaboratif temps réel, 23 sessions simultanées, persistance serveur, minuteur, vote |
| 3 | L'Instrument de Mesure | ~4 j | Calculs sur graphe, lasso, coloration. Autonome, sans IA |
| 4 | La Couche Fantôme | ~5 à 6 j | Captation audio, transcription, détection de pause, lot LLM, couche distincte, péremption |
| 5 | Le Gardien de la Grammaire | ~3 à 4 j | Règles déterministes puis reformulation LLM |

**Total : 22 à 25 jours pour 20 disponibles.** La ligne tombe autour du concept 4.

## Risque résiduel

L'ordre place les deux concepts porteurs d'IA en dernier. Conséquence directe : **si le planning glisse, c'est la promesse « assisté par l'IA » qui saute.** C'est l'exact miroir du risque de l'ordre précédent, où c'était l'utilisabilité de l'atelier qui sautait.

Le choix est cohérent avec la barre fixée — *meilleur que sans outil* — mais il faut savoir que le Gardien de la Grammaire, identifié comme le différenciateur du produit, est le plus exposé.

## Deux atténuations possibles

### Scinder le Gardien

Le Gardien a une moitié déterministe qui ne coûte presque rien : verbe au passé, motifs `whenever / then`, cohérence de type. Aucune inférence, aucune API.

Cette moitié peut être embarquée **avec le concept 2**, au moment où l'on construit la saisie de post-it. La moitié LLM — reformulation et suggestion de type — reste en position 5.

Effet : le différenciateur existe partiellement dès le palier 2, et ce qui est exposé au risque de coupe n'est plus que sa couche la plus visible.

### Spike de dérisquage

Deux à trois jours en semaine 1 : un prompt, un jeu de phrases métier dommage aux biens, mesure de la capacité du modèle à reconnaître événement / commande / policy et à reformuler. Code jeté ensuite.

Répond à l'incertitude sans inverser l'ordre de construction. Non retenu à ce stade.

## Ce que ce séquencement ne couvre pas

- L'export markdown versionné dans le dépôt Git — mentionné comme exigence, jamais chiffré.
- L'identité et la gestion de session pour 23 participants.
- Le déploiement et l'hébergement.
- La reprise éventuelle du modèle de domaine d'`event2spec`.

Ces postes sont réels et ne figurent dans aucun des cinq concepts.
