---
title: "Scénario — La séance de conception qui suit l'atelier"
project: event-storming-assistant
snapshot: "2026-08-04-refresh"
source_method: 1
---

# Scénario — La séance de conception qui suit l'atelier

### Description

Quelques jours après l'atelier de domaine, quatre personnes se réunissent : les deux architectes et les deux développeurs qui maîtrisent l'Event Storming. Le mur produit par les 23 participants est là, complet mais plat. L'enjeu est d'en tirer des frontières — aggregates et bounded contexts — sans trahir ce que les experts métier ont dit, et sans que les quatre y passent trois semaines.

### Scenario Narrative

Aujourd'hui, cette séance n'a pas lieu, ou elle a lieu de façon informelle et non tracée. Un architecte regarde le résultat de l'atelier, y reconnaît vaguement des zones, et propose un découpage qui reflète surtout sa connaissance préalable du système existant. Personne ne peut vérifier si ce découpage suit réellement la matière produite par le métier ou s'il reproduit l'organigramme actuel. Le lien entre ce qu'ont dit les six experts dommage aux biens et les frontières retenues est perdu.

Ce qui rend cette séance difficile n'est pas le manque de compétence : les deux architectes savent ce qu'est un bounded context. C'est le volume et la platitude de la matière. Un mur d'Event Storming issu d'une séance à 23 personnes contient des dizaines d'événements, des commandes, des policies, des systèmes externes — et aucune indication de regroupement. Identifier manuellement les zones de cohérence demande de tout relire, plusieurs fois, en tenant en tête des dépendances qui ne sont pas représentées.

L'enjeu dépasse le confort de ces quatre personnes. Un découpage qui ne s'appuie pas sur le langage réel du métier produit des frontières fragiles, qui se fissurent à la première évolution. Chez un assureur, sur un domaine dommage aux biens qui va être reconstruit, cette fragilité se paie sur plusieurs années.

Le succès ressemblerait à ceci : l'assistant propose plusieurs découpages candidats à partir du mur, chacun justifié par les éléments qui le fondent. Les quatre participants les examinent, en contestent une partie, en fusionnent deux, en écartent un troisième. Chaque frontière retenue reste remontable jusqu'à la parole métier qui l'a produite. La séance dure une demi-journée au lieu de trois semaines, et le résultat est défendable devant un comité d'architecture.

### How Might We

Comment pourrions-nous transformer un mur d'Event Storming brut en propositions de découpage inspectables et contestables, pour que les architectes exercent leur jugement sur des candidats argumentés plutôt que sur une page blanche — sans jamais leur imposer une frontière qu'ils n'ont pas choisie ?

Débloquer ce scénario donne au programme un découpage traçable jusqu'à la parole métier, réduit le délai entre l'atelier et la décision d'architecture, et produit la matière nécessaire au dossier d'architecture technique. C'est aussi la partie de l'outil qui ne dépend d'aucun enregistrement audio : elle reste réalisable même si la conformité interdit la transcription.

#### Questions to Ask

1. Comment les architectes identifient-ils un bounded context aujourd'hui, concrètement ?
2. Combien de découpages candidats sont utiles — un, trois, dix ?
3. Quelle justification rend une proposition automatique recevable à leurs yeux ?
4. Que se passe-t-il si le mur produit en séance A est incomplet ou incohérent ?
5. Cette séance a-t-elle lieu une fois, ou de façon itérative au fil de plusieurs ateliers ?
