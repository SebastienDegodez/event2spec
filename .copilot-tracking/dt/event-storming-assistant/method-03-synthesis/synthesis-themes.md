# Method 03 — Synthèse (comprimée)

> Créé le 2026-08-04. Méthode 2 comprimée sur décision du PO, contrainte de délai.

## Inventaire des entrées — et sa limite

| Source | Type | Volume |
|---|---|---|
| Le PO | Entretien conversationnel, session de cadrage | 9 échanges |
| *Event Storming — The Complete Guide* | Documentation méthode | 1 document |
| Maquette Nexus | Esquisse de solution | 1 écran |
| Repo `event2spec` | POC existant | non analysé |

**Limite à assumer explicitement : toutes les données proviennent d'une seule personne.** Aucun expert métier, aucun architecte, aucun développeur praticien, aucun coach agile n'a été interrogé directement. Les thèmes ci-dessous sont cohérents et spécifiques, mais ils reflètent la compréhension du PO, pas une réalité triangulée.

C'est un choix conscient lié au délai, pas un oubli. Il est tracé ici pour que la fragilité soit visible si un thème se révèle faux.

---

## Thème 1 — La compétence rare est consommée par la mécanique

Les deux seules personnes qui portent la méthode sont immobilisées par trois tâches mécaniques : écrire les post-its, tenir la chronologie, corriger la notation. Leur expertise, qui est la raison de leur présence, n'atteint jamais le contenu.

> *« il y a 2 développeurs qui connaissent la méthode et qui l'ont déjà fait seulement ils vont avoir du mal à participer s'ils animent »*

**Ce qui est notable** : le PO a explicitement écarté les tâches d'animation sociale — distribuer la parole, gérer les silences, tenir le temps. Le blocage n'est pas l'animation, c'est la mécanique. Cette distinction est le pivot de tout le projet.

## Thème 2 — La conversation s'évapore entre la parole et l'artefact

Ce que disent les interlocuteurs se perd. Le besoin exprimé n'est pas de produire un joli tableau mais de **matérialiser ce qui est dit**, et d'en conserver la trace exploitable.

> *« Le but de l'outil est de pouvoir matérialiser dans l'event storming le contenu de ce qui est partagé par les interlocuteurs »*

Confirmé par la contrainte de stockage : transcriptions en markdown versionné dans un dépôt Git. La trace n'est pas un effet de bord, c'est une exigence.

## Thème 3 — Deux natures de travail sont confondues sous un seul mot

« Faire un Event Storming » recouvre deux activités de nature différente. Ce qui se **capte** dans la parole des gens, et ce qui se **déduit** du modèle. Personne ne dit « voilà un aggregate ».

Cette confusion, une fois défaite, a produit la décision structurante du projet : deux séances, deux publics, deux modes d'outil. Elle explique aussi pourquoi un outil de whiteboard générique ne résout rien.

## Thème 4 — L'autorité doit rester humaine, mais elle change de mains

Le principe est constant : l'IA propose, l'humain valide. Ce qui change, c'est **qui** valide et **sur quoi**.

| Objet | Qui décide |
|---|---|
| Un post-it existe-t-il ? | Le groupe des 23 |
| Une frontière est-elle juste ? | Les architectes |
| Qui parle maintenant ? | Le coach agile |
| Le processus est-il correct ? | Les experts métier |
| La notation est-elle respectée ? | L'outil signale, l'humain tranche |

**Ce qui est notable** : la seule autorité que le PO concède à l'IA est celle de la conformité formelle. C'est la plus petite autorité possible — et la plus utile, puisque c'est précisément la connaissance qui manque.

## Thème 5 — Le délai dominera toutes les autres contraintes

Quatre semaines. Trois niveaux d'Event Storming. Deux modes d'outil. Une ambition SaaS multi-entreprises. Un premier atelier réel à 23 personnes en distanciel.

Aucune décision prise jusqu'ici n'a réduit le périmètre : le niveau Software Design a été ajouté, seul Balanced Coupling a été retiré. Le délai n'a pas encore rencontré la réalité du périmètre.

**C'est le thème le plus solide et le moins traité.**

---

## Questions « How Might We »

| # | HMW | Issue de |
|---|---|---|
| **HMW1** | Comment pourrions-nous décharger de la mécanique d'atelier ceux qui maîtrisent la méthode, sans leur retirer le contrôle ? | Thème 1 |
| **HMW2** | Comment pourrions-nous garantir qu'aucun élément du modèle n'existe sans avoir été dit — et le prouver ? | Thème 2 |
| **HMW3** | Comment pourrions-nous faire tenir la grammaire Event Storming par l'outil, sans que la correction interrompe le flux de la conversation ? | Thèmes 1 et 4 |
| **HMW4** | Comment pourrions-nous rendre 23 personnes capables de valider une proposition en visio sans casser le rythme ? | Thème 4 (T8 non résolue) |
| **HMW5** | Comment pourrions-nous transformer un mur plat en découpage inspectable et contestable ? | Thème 3 |
| **HMW6** | Comment pourrions-nous livrer en quatre semaines quelque chose qui rende l'atelier de septembre meilleur que sans outil ? | Thème 5 |

**HMW6 est le nœud.** Les cinq autres décrivent le produit ; celui-là décide s'il existe.

---

## Validation de la synthèse — cinq dimensions

| Dimension | Niveau | Commentaire |
|---|---|---|
| Fidélité à la recherche | **Faible** | Une seule source. Aucune donnée observée directement. |
| Complétude des parties prenantes | **Faible** | 5 personas définis, 0 interrogé. |
| Robustesse des motifs | **Moyenne** | Les motifs sont spécifiques et internement cohérents, mais non triangulés. |
| Actionnabilité | **Forte** | Les thèmes se traduisent directement en décisions de périmètre. |
| Alignement d'équipe | **Moyenne** | Le PO est aligné. L'équipe n'a pas été consultée. |

**Conséquence** : cette synthèse est suffisante pour décider d'un périmètre, insuffisante pour affirmer qu'on a compris les utilisateurs. Les thèmes 1, 3 et 5 sont robustes parce qu'ils reposent sur des faits structurels. Les thèmes 2 et 4 reposent sur les intentions déclarées du PO et devront être confrontés au réel.

## Ce qu'un participant reconnaîtrait-il ?

Test de qualité : les deux développeurs praticiens se reconnaîtraient-ils dans le thème 1 ? **Probablement oui** — il vient de leur situation décrite en détail.

Les experts métier se reconnaîtraient-ils dans le thème 2 ? **Inconnu.** Personne ne leur a demandé si la perte de leur parole les dérange.
