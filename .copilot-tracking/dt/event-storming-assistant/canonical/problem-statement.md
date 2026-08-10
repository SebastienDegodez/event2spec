---
title: "Event Storming Assistant — Problem Statement"
project: event-storming-assistant
snapshot: "2026-08-04-refresh"
source_method: 1
---

# Event Storming Assistant — Problem Statement

## Problem Statement

L'absence de méthode Event Storming partagée produit une charge d'écriture des post-its, de tenue de la chronologie et de police de la notation pour les deux seules personnes qui maîtrisent la méthode et qu'on attend aussi comme contributeurs métier. Comment pourrions-nous matérialiser et normaliser automatiquement les échanges de l'atelier, puis en dériver un découpage en aggregates et bounded contexts, pour libérer cette compétence rare vers le contenu et produire un modèle exploitable par le process de développement ?

### Décomposition

| Composant | Contenu |
|---|---|
| Cause racine | Aucune méthode Event Storming commune ; la compétence est concentrée sur deux développeurs. |
| Effort indésirable | Écrire et placer les post-its, tenir la chronologie et réorganiser le mur, corriger la notation en direct. |
| Personnes impactées | Les 2 développeurs praticiens (rendus muets), le coach agile (sans méthode), les 6 experts métier (dont la parole se perd), les architectes (privés d'un modèle exploitable). |
| Opportunité | Un assistant qui matérialise et normalise les échanges en atelier, puis propose un découpage déduit du modèle en séance de conception — sur validation humaine dans les deux cas. |
| Bénéfices | La compétence rare retourne au contenu ; l'atelier devient reproductible ; la sortie va jusqu'aux aggregates et bounded contexts et alimente BRD, PRD et DAT. |

### Ce que le problème n'est pas

- Ce n'est pas un manque d'outil de whiteboard. Des outils de tableau blanc existent et ne résolvent rien.
- Ce n'est pas un besoin d'automatiser la modélisation. Le groupe doit rester l'auteur du modèle ; l'IA ne tranche aucun désaccord métier, et son découpage est une proposition soumise aux architectes.
- Ce n'est pas un problème d'animation sociale. La distribution de la parole, la gestion des silences et le respect du temps restent explicitement humains.

### Contrainte de validité

Cet énoncé repose sur un seul cas observé — le programme de transformation dommage aux biens. La généralisation à d'autres organisations est une ambition, pas un constat.
