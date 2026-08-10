---
title: "Use Case — Matérialiser les échanges de l'atelier en post-its validés"
project: event-storming-assistant
snapshot: "2026-08-04"
source_method: 1
---

# Use Case — Matérialiser les échanges de l'atelier en post-its validés

### Use Case Description

Pendant un atelier Event Storming en distanciel, l'assistant écoute la conversation, propose des éléments de notation Event Storming correspondant à ce qui vient d'être dit, et ne les inscrit sur le mur qu'après validation du groupe.

### Use Case Overview

Le coach agile anime une séance de cadrage du domaine dommage aux biens avec 23 participants en visio. Les experts métier décrivent leurs processus en langage naturel, avec des digressions, des retours en arrière et des désaccords. Historiquement, un développeur connaissant la méthode transcrit ces échanges en post-its à la main, ce qui l'empêche de contribuer.

L'assistant prend en charge cette transcription. Il écoute le flux audio, en extrait des candidats de notation Event Storming — domain event, command, actor, policy, read model, système externe, hotspot — et les présente au groupe comme des propositions. Le groupe accepte, corrige ou rejette. L'assistant place ensuite les éléments acceptés sur la chronologie et signale les écarts de grammaire, sans jamais trancher un désaccord métier ni décider de l'avancement de la séance.

### Business Value

La valeur principale est la restitution de la capacité de contribution des deux seules personnes maîtrisant la méthode. Elle se double d'une valeur de traçabilité : chaque élément du modèle reste rattaché au passage de conversation qui l'a produit, ce qui rend le modèle défendable, révisable et exploitable en aval.

Bénéficiaires et effets attendus :

| Bénéficiaire | Effet |
|---|---|
| Développeurs praticiens | Redeviennent contributeurs au lieu de scribes |
| Coach agile | Anime sans maîtriser la notation |
| Experts métier | Leur parole est retenue fidèlement, avec ses nuances |
| Architectes | Un modèle structuré, base du futur découpage |
| Programme | Un cadrage de durée prévisible, exploitable par la chaîne de dev |

Indicateurs pertinents : proportion de post-its issus de la parole des experts métier, nombre de participants ayant contribué, part des propositions de l'IA acceptées sans correction, temps entre la fin de l'atelier et un modèle utilisable.

### Primary User

Le coach agile facilitateur. Il anime, distribue la parole et tient le rythme. Il ne connaît pas l'Event Storming et ne veut pas l'apprendre avant septembre. Sa contrainte forte : garder la main sur la conversation et ne pas laisser l'outil capter l'attention du groupe.

### Secondary User

Les deux développeurs praticiens de l'Event Storming, qui basculent du rôle de facilitateur à celui de contributeur et deviennent les contrôleurs qualité implicites des propositions de l'IA. Les six experts métier dommage aux biens, dont la parole alimente le modèle. Les deux architectes, consommateurs aval du modèle produit.

### Preconditions

- Une séance en visio est en cours avec les participants connectés.
- L'objectif de la séance et le niveau visé (Big Picture ou Process Modeling) sont posés.
- Le consentement à l'enregistrement et à la conservation des transcriptions est acquis pour tous les participants, y compris les consultants externes.
- Le mur est initialisé, vide ou pré-amorcé.

### Steps

1. Le coach agile démarre l'écoute live depuis le panneau de transcription.
2. Les participants discutent librement du processus dommage aux biens.
3. L'assistant transcrit le flux audio en continu et conserve la transcription en markdown, versionnée dans un dépôt Git.
4. **À la pause de séance**, l'assistant analyse le segment écoulé et identifie des candidats de notation Event Storming.
5. L'assistant matérialise ces candidats dans une **couche fantôme** visuellement distincte des post-its du groupe, chacun rattaché à l'extrait de transcription dont il provient.
6. À la reprise, le groupe examine les propositions : adopte d'un clic, reformule ou ignore.
7. L'assistant place les éléments adoptés sur la chronologie et met à jour le mur.
8. Les propositions non adoptées à la fin de l'exercice **disparaissent**. Ne rien faire vaut refus.
9. Lorsqu'un élément adopté enfreint la grammaire, l'assistant le signale sans bloquer.
10. En fin de séance, le modèle et la transcription complète sont conservés ensemble dans le dépôt.

### Pourquoi la pause plutôt que le fil de l'eau

Décision du 2026-08-05. Générer la couche fantôme aux pauses plutôt qu'en continu produit trois effets :

- Le groupe n'est pas interrompu pendant qu'il pense ; les propositions arrivent quand l'attention est disponible.
- La validation cesse d'être une charge : l'inaction supprime la proposition, ce qui rend inutile tout mécanisme de vote à vingt-trois.
- La contrainte temps réel sur l'analyse disparaît, ce qui la rend constructible dans le délai imparti.

### Data Requirements

**Nécessaire en entrée** : flux audio de la visio, éventuels apports texte des participants, notation Event Storming de référence, et à terme le vocabulaire métier dommage aux biens.

**Créé ou modifié** : transcription horodatée et conservée, éléments de notation avec leur type, leur position sur la chronologie et leurs liens, lien de traçabilité entre chaque élément et son extrait source, journal des propositions acceptées et rejetées, historique des versions du mur.

Le lien élément ↔ extrait de transcription est structurant : c'est lui qui fonde la confiance du développeur praticien, et c'est lui qui permettra plus tard de dériver aggregates et bounded contexts sans repartir de zéro.

### Equipment Requirements

Un poste par participant avec micro et navigateur. Un outil de visioconférence dont le flux audio est captable. Un accès à un service de transcription et à un modèle de langage — sous réserve de l'arbitrage sécurité IT sur l'envoi de contenu métier vers un service externe. Un écran partagé ou une vue synchronisée du mur pour les 23 participants.

### Operating Environment

Séance en distanciel intégral, en journée, participants répartis sur plusieurs sites. Conditions audio hétérogènes : qualités de micro variables, bruit de fond, prises de parole qui se chevauchent, accents et jargon métier assurance. Contexte réglementé — assureur — impliquant des contraintes RGPD sur l'enregistrement, et des enjeux contractuels liés à la présence de consultants externes.

L'environnement distanciel aggrave le risque central : à 23 en visio, la prise de parole est coûteuse et le silence est le comportement par défaut.

### Success Criteria

- Les deux développeurs praticiens ont contribué au contenu au lieu d'écrire.
- Les six experts métier reconnaissent leur processus dans le mur produit.
- Le coach agile a mené la séance sans avoir à arbitrer de question de notation.
- Aucun élément du mur n'est absent de la conversation réelle.
- Le modèle est exploitable immédiatement après la séance, sans reprise manuelle.

### Pain Points

Aujourd'hui : le praticien de la méthode est immobilisé au tableau blanc et se tait ; la correction de notation à voix haute interrompt le flux et inhibe les experts métier ; la chronologie se dégrade dès que la discussion revient en arrière ; la conversation disparaît une fois la séance terminée ; le résultat n'est pas exploitable par la chaîne de développement et impose une retranscription manuelle.

### Extensions

- **Apport par texte** — un participant qui n'ose pas parler soumet un élément par écrit ; utile pour contrer le silence en visio.
- **Transcription importée** — l'atelier a été enregistré ailleurs ; l'analyse s'effectue a posteriori, sans écoute live.
- **Hotspot** — le groupe est en désaccord ; l'assistant marque le point sans trancher, conformément à la notation Event Storming.
- **Mode dégradé sans enregistrement** — si la conformité l'interdit, seule la saisie texte reste disponible.
- **Reprise de séance** — la modélisation se poursuit sur une séance ultérieure à partir du mur existant.

### Evidence

- Verbatim, session de cadrage du 2026-08-04 : « il y a 2 développeurs qui connaissent la méthode et qui l'ont déjà fait seulement ils vont avoir du mal à participer s'ils animent. »
- Verbatim : « ce qui empêche de participer c'est : écrire et placer les post-its à la place des autres, tenir la chronologie et réorganiser le mur, corriger la notation. »
- Verbatim : « l'IA ne fait pas de choix, elle pose les post-it seulement s'ils sont validés par le groupe. »
- [scope-boundaries.md](../../method-01-scope/scope-boundaries.md) — arbitrages T1, T2, T3, T5, T7 et périmètre de notation du MVP.
- [stakeholder-map.md](../../method-01-scope/stakeholder-map.md) — composition de l'atelier et parties prenantes cachées.
- [assumptions-log.md](../../method-01-scope/assumptions-log.md) — hypothèses A1, A2, A3 et A5 non testées.
- *Event Storming — The Complete Guide* (document de référence du programme) — niveaux Big Picture / Process Modeling / Software Design, notation et grammaire.

#### Questions to Ask

1. Quel mécanisme de validation permet à 23 personnes de trancher une proposition sans casser le rythme ?
2. À quelle fréquence l'assistant propose-t-il — en continu, sur pause, ou à la demande du coach ?
3. Quel est le comportement attendu quand la transcription est erronée sur du vocabulaire métier ?
4. Que devient le modèle entre deux séances si l'exercice s'étale ?
