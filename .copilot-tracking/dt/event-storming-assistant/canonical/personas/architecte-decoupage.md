---
title: "Persona — L'architecte face au découpage"
project: event-storming-assistant
snapshot: "2026-08-04-refresh"
source_method: 1
persona_type: primary
---

# Persona — L'architecte face au découpage

### Description

Architecte solution ou architecte d'entreprise du programme de transformation. L'un raisonne à l'échelle du système à construire, l'autre à l'échelle du patrimoine applicatif de l'assureur. Tous deux sont présents à l'atelier de septembre et deviennent, avec la décision du 2026-08-04, les **valideurs du mode Dérivation** : c'est à eux que l'assistant soumet ses propositions d'aggregates et de bounded contexts. Ils passent ainsi de consommateurs aval à utilisateurs directs de l'outil.

### User Goal

Obtenir un découpage du domaine dommage aux biens qui tienne dans la durée — des frontières qui ne se fissurent pas à la première évolution métier — et pouvoir le justifier devant un comité d'architecture avec autre chose qu'une intuition.

### User Needs

**Besoins explicites**

- Un modèle du domaine assez complet et assez propre pour qu'un découpage puisse s'y appuyer.
- Voir sur quoi repose chaque frontière proposée : quels événements, quelles commandes, quelles dépendances.
- Pouvoir modifier une proposition sans repartir de zéro.

**Besoins latents**

- Ne pas être mis devant un découpage déjà figé qu'ils n'ont plus qu'à entériner.
- Explorer plusieurs découpages concurrents plutôt qu'en recevoir un seul.
- Remonter du découpage à la parole métier qui le fonde, pour arbitrer un cas limite.

### User Mindset

Ils savent qu'un mauvais découpage coûte des années et qu'il ne se révèle qu'après coup. Cette conscience les rend prudents et sceptiques face à toute proposition automatique : un bounded context plausible mais faux est plus dangereux qu'une absence de proposition, parce qu'il emporte l'adhésion du reste de l'équipe.

Leur critère d'acceptation n'est pas la justesse apparente du résultat mais la **traçabilité du raisonnement**. Une proposition qu'ils peuvent inspecter, contester et amender sera examinée ; un découpage livré comme un verdict sera rejeté, même s'il est bon. Ils veulent un outil qui les fasse penser, pas un outil qui pense à leur place.

#### Questions to Ask

1. Comment procèdent-ils aujourd'hui pour identifier un bounded context, sans outil ?
2. Ont-ils déjà vécu un découpage raté dans cette organisation, et qu'en ont-ils appris ?
3. Quelle forme de justification leur suffirait pour accepter une proposition automatique ?
4. Combien de découpages alternatifs souhaitent-ils voir en parallèle ?
5. Que doivent-ils emporter de la séance de septembre pour rester engagés ?
