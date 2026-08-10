---
title: "Scénario — L'atelier de cadrage dommage aux biens de septembre"
project: event-storming-assistant
snapshot: "2026-08-04"
source_method: 1
---

# Scénario — L'atelier de cadrage dommage aux biens de septembre

### Description

Septembre 2026. Vingt-trois personnes se connectent en visio pour cadrer le domaine dommage aux biens d'un programme de transformation. Un coach agile anime sans connaître l'Event Storming, deux développeurs connaissent la méthode mais doivent contribuer, et six experts métier détiennent la seule connaissance qui compte vraiment. L'enjeu est de sortir de cette séance avec un modèle partagé du domaine, et non avec un compte rendu de plus.

### Scenario Narrative

Sans outil, la séance se déroule de façon prévisible. L'un des deux développeurs prend le rôle de facilitateur parce qu'il est le seul à savoir ce qu'est un domain event. Il partage son écran, ouvre un tableau blanc, et passe les trois heures à écrire ce que disent les autres. Sa connaissance du système existant — la raison pour laquelle on l'a invité — ne rentre jamais dans la conversation. En parallèle, il corrige la notation à voix haute : « non, ça c'est une commande, pas un événement », ce qui interrompt le flux et met mal à l'aise l'expert métier qui venait de parler. Celui-ci se tait, et ne reprendra pas la parole.

Le deuxième développeur, lui, participe, mais passe son temps à réorganiser mentalement une chronologie que personne ne tient. Les architectes attendent un découpage qui ne viendra pas. Les quatre consultants externes, à l'aise avec le format, occupent l'espace sonore. À la fin, on a un tableau blanc désordonné, aucune trace de ce qui a été dit, et le sentiment partagé qu'il faudra « refaire une session ». Le programme, lui, a une échéance.

Ce qui est en jeu dépasse la séance : c'est la capacité du programme à transformer une conversation métier en quelque chose que des équipes de développement peuvent exécuter. Aujourd'hui, entre la parole de l'expert dommage aux biens et la première ligne de spécification, il y a une déperdition presque totale — et personne dans l'organisation n'est en mesure de la mesurer.

Le succès ressemblerait à ceci : à la fin de la séance, le mur reflète ce que le groupe a réellement dit, chaque post-it est rattaché au moment de la conversation qui l'a produit, les six experts métier reconnaissent leur travail dedans, et les deux développeurs ont pu contredire, nuancer et enrichir le modèle. Le coach agile a tenu le rythme et fait parler ceux qui se taisaient. Personne n'a passé la séance à écrire.

### How Might We

Comment pourrions-nous rendre la mécanique d'un Event Storming — écriture, chronologie, conformité de la notation — suffisamment automatique pour que les seules personnes qui maîtrisent la méthode puissent redevenir des participants, tout en garantissant que le modèle produit reste l'œuvre du groupe et non celle de la machine ?

Débloquer ce scénario permettrait au programme de cadrer un domaine complexe dans une durée prévisible, de conserver la trace exploitable de chaque décision de modélisation, et d'alimenter directement la chaîne de génération BRD / PRD / DAT. Cela ouvrirait aussi la voie à une réutilisation par d'autres organisations, où la rareté des facilitateurs Event Storming produit exactement le même blocage.

#### Questions to Ask

1. Combien de temps dure réellement la séance de septembre, et est-elle unique ou séquencée ?
2. Comment 23 personnes valident-elles un post-it en visio sans casser le rythme ?
3. Que se passe-t-il si la conformité interdit l'enregistrement — le scénario tient-il encore ?
4. Que doivent emporter concrètement les deux architectes à la fin de la séance ?
