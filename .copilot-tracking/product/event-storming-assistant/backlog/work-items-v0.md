# Work items — POC Assistant Event Storming

> Dérivé du [cadrage produit V0](../v0-product-framing.md). Date : 2026-08-06.
> Capacité : 1 développeur à 100 %. Fenêtre : ~20 jours ouvrés avant l'atelier des 15 et 16 septembre.

## Vue d'ensemble

| # | Work item | Estimation | Dépend de |
|---|---|---|---|
| **WI-00** | Construire le repli non logiciel | 0,5 j | — |
| **WI-01** | Établir le socle collaboratif et le déploiement | 5 j | — |
| **WI-02** | Afficher le déroulé guidé de l'atelier | 2 j | WI-01 |
| **WI-03** | Permettre la saisie simultanée chronométrée | 2 j | WI-01 |
| **WI-04** | Trier les éléments par vote | 1 j | WI-03 |
| **WI-05** | Contrôler la notation à la saisie | 2 j | WI-03 |
| **WI-06** | Mesurer un découpage candidat | 2 j | WI-03 |
| **WI-07** | Importer une transcription et proposer des éléments | 4 j | WI-03 |
| **WI-08** | Exporter le modèle en markdown | 1 j | WI-03 |
| | **Total** | **19,5 j** | pour 20 disponibles |

**La marge est nulle.** Toute dérive se paie sur WI-07 ou WI-06, dans cet ordre.

### Jalon de décision

| Jalon | Date | Critère | Décideur |
|---|---|---|---|
| **Go / no-go** | **Vendredi 4 septembre** | WI-03 tient-il sous test de charge à 23 connexions ? | Responsable de programme |

**Arbitré le 2026-08-06.** La date a été avancée à la première semaine de septembre à la demande du responsable de programme.

### Ordonnancement imposé par le jalon

Le critère porte sur WI-03. Trois work items doivent donc être terminés et éprouvés avant le 4 septembre.

| Avant le 4 septembre | Charge | Après le 4 septembre | Charge |
|---|---|---|---|
| WI-00 — repli non logiciel | 0,5 j | WI-05 — contrôle de notation | 2 j |
| WI-01 — socle et déploiement | 5 j | WI-04 — tri par vote | 1 j |
| WI-03 — saisie simultanée | 2 j | WI-06 — mesures de découpage | 2 j |
| Test de charge à 23 connexions | 0,5 j | WI-02 — déroulé guidé | 2 j |
| | | WI-07 — import de transcription | 4 j |
| | | WI-08 — export markdown | 1 j |
| **Sous-total** | **8 j** | **Sous-total** | **12 j** |

**WI-02 passe en post-décision.** Le repli papier remplit la même fonction, il n'est donc plus urgent — c'est ce qui libère la place pour WI-01 et WI-03 avant le 4 septembre.

**WI-05 remonte juste après la décision.** C'est l'unique différenciateur du produit ; le placer tôt après le go le protège des arbitrages de fin de parcours.

### Échéances calendaires

| Date | Événement |
|---|---|
| 2026-08-06 | Trois arbitrages programme obtenus. Développement lançable |
| ~2026-08-24 | Retour de congés du coach agile. **Relecture du déroulé à caler dès son retour** |
| 2026-09-04 | Go / no-go. WI-00, WI-01 et WI-03 terminés et éprouvés |
| 2026-09-15 et 16 | Atelier Event Storming, 23 participants |

**Point de vigilance** : le coach agile est le persona primaire et le facilitateur de l'atelier. Il est absent jusqu'au 24 août, soit près de la moitié de la fenêtre de préparation. Sa relecture du déroulé (WI-00) doit être calée avant le go / no-go, faute de quoi le repli n'aura jamais été éprouvé par celui qui doit s'en servir.

### Effet de WI-00 sur l'ordonnancement

Le repli papier couvre la même fonction que WI-02. Une fois WI-00 fait, **le déroulé guidé n'est plus urgent** : il peut être décalé sans mettre l'atelier en risque. C'est la seule souplesse d'ordonnancement du plan.

### Note sur les sources d'évidence

La quasi-totalité des exigences ci-dessous provient d'entretiens avec le Product Owner, non de recherche utilisateur. Elles sont étiquetées **Hypothèse** ou **Demande partie prenante** en conséquence. Aucun utilisateur final n'a été interrogé directement.

---

## WI-00 — Construire le repli non logiciel

**Description**

Préparer un déroulé Event Storming papier de deux jours et un document collaboratif partagé, permettant de tenir l'atelier de septembre sans aucun développement. Ce repli protège un jalon programme représentant 46 jours-homme et autorise à prendre des risques sur le reste du développement.

*Source d'évidence : demande partie prenante — recommandation Product Manager du 2026-08-05, non issue des livrables Design Thinking.*

**Critères d'acceptation**

- [ ] Un déroulé de 8 étapes couvre les deux jours, avec pour chaque étape l'objectif, l'attendu et la durée
- [ ] Chaque étape indique la phrase de lancement que le facilitateur prononce au groupe
- [ ] La légende de notation Event Storming est fournie sur une page, avec un exemple par élément tiré du domaine assurance
- [ ] Un document collaboratif partagé permet à 23 personnes de saisir simultanément
- [ ] Le coach agile a relu le déroulé et confirme pouvoir l'appliquer sans assistance
- [ ] Le repli est stocké dans le dépôt Git, accessible sans dépendance à l'outil

**Périmètre exclu**

Toute automatisation. Ce work item ne produit aucun code.

**Risques et dépendances**

* Sans lui, le développeur porte seul en semaine 4 la pression d'un jalon à 46 jours-homme.
* Il est aussi la spécification fonctionnelle de WI-02 : le travail n'est pas perdu si l'outil est prêt.

---

## WI-01 — Établir le socle collaboratif et le déploiement

**Description**

Mettre en place un service ASP.NET Core servant l'application React et exposant un hub SignalR, déployé sur Kubernetes en pod unique, avec un état de session en mémoire persisté périodiquement. Toutes les autres fonctionnalités reposent sur ce socle.

*Source d'évidence : contrainte technique — sécurité IT (Node interdit à l'exécution) et décision d'architecture du 2026-08-05.*

**Critères d'acceptation**

- [ ] Un utilisateur rejoint une session d'atelier en saisissant son nom, sans authentification
- [ ] Les participants d'une même session voient les mêmes éléments du mur en temps réel
- [ ] Une modification effectuée par un participant apparaît chez les autres en moins d'une seconde
- [ ] Un participant déconnecté puis reconnecté retrouve l'état courant du mur
- [ ] L'état de session est persisté au moins toutes les 10 secondes et rechargé au redémarrage du pod
- [ ] Les conflits sont résolus par dernier-arrivé-gagne au niveau du champ, sans perte silencieuse
- [ ] L'application est déployée sur Kubernetes et accessible depuis un poste de l'entreprise
- [ ] Le front React est compilé en CI et servi en statique par ASP.NET Core

**Definition of Done**

* Le modèle de domaine Event Storming vit en C# côté serveur uniquement. Aucun modèle de domaine dupliqué côté client.
* Les cas de test du modèle de domaine d'`event2spec` sont transposés en C#.
* Le pipeline de déploiement est reproductible.

**Périmètre exclu**

Authentification, gestion des droits, multi-tenant, mise à l'échelle horizontale. Un seul pod, une seule organisation.

**Risques et dépendances**

* Poste le plus lourd du plan. Une dérive ici compromet tout le reste.
* `event2spec` fournit la conception du domaine, pas le code. Sa couche canvas et rendu est en revanche réutilisable.

---

## WI-02 — Afficher le déroulé guidé de l'atelier

**Description**

Afficher en permanence à tous les participants l'étape en cours de l'atelier, ce qui est attendu du groupe et le temps restant, afin qu'un facilitateur ne connaissant pas l'Event Storming puisse mener les deux jours.

*Source d'évidence : hypothèse H4 — non validée. Aucun entretien conduit avec le coach agile concerné.*

**Critères d'acceptation**

- [ ] Le déroulé des 8 étapes est chargé depuis un fichier de configuration, modifiable sans redéploiement
- [ ] L'étape en cours, son objectif et sa durée prévue sont visibles par les 23 participants
- [ ] Le facilitateur démarre, met en pause et termine une étape
- [ ] Le temps restant de l'étape est affiché et se met à jour en temps réel chez tous les participants
- [ ] Une alerte visuelle apparaît à 5 minutes de la fin de l'étape
- [ ] Le facilitateur peut revenir à une étape précédente sans perdre le contenu produit
- [ ] Un participant rejoignant en cours de séance voit immédiatement l'étape en cours

**Périmètre exclu**

Adaptation automatique du timing, recommandations de rythme, indicateur d'avance ou de retard cumulé. Reportés en version ultérieure.

**Risques et dépendances**

* Le contenu du déroulé provient de WI-00. Ce work item ne fait que l'afficher.
* Non urgent une fois WI-00 livré : le repli papier remplit la même fonction.

---

## WI-03 — Permettre la saisie simultanée chronométrée

**Description**

Permettre aux 23 participants de saisir simultanément des éléments Event Storming pendant un temps chronométré et sans prise de parole, afin que contribuer n'exige plus de parler dans une visioconférence à large audience.

*Source d'évidence : hypothèse H2 — non validée. Le comportement des experts métier en visio est rapporté par le PO, jamais observé.*

**Critères d'acceptation**

- [ ] Un participant saisit un élément en choisissant son type parmi la notation Event Storming disponible
- [ ] Les éléments saisis apparaissent sur le mur partagé, attribués à leur auteur
- [ ] Le facilitateur lance une session de saisie chronométrée d'une durée qu'il définit
- [ ] Le temps restant est visible par tous pendant la session de saisie
- [ ] 23 participants saisissent en parallèle sans perte d'élément ni collision d'identifiant
- [ ] Un élément peut être déplacé sur la chronologie après sa création
- [ ] Le nombre de contributions par participant est enregistré et consultable

**Types de notation couverts**

Domain Event, Command, Actor, Read Model, Policy, System externe, Hotspot, Opportunity.

**Definition of Done**

* Test de charge à 23 connexions simultanées documenté, avec le taux de perte mesuré.

**Périmètre exclu**

Aggregate et Bounded Context. Édition collaborative caractère par caractère d'un même texte.

**Risques et dépendances**

* **C'est le critère du go / no-go à J-5.** Si le test de charge échoue, l'atelier bascule sur le repli.
* Le KPI 4 (taux de contribution) et le KPI 3 (contribution des praticiens) se mesurent depuis ce work item.

---

## WI-04 — Trier les éléments par vote

**Description**

Permettre au groupe de trier les éléments produits en vrac par un vote à points, sans débat, afin que la convergence ne dépende pas de la prise de parole.

*Source d'évidence : hypothèse — issue du brainstorming Design Thinking, non testée.*

**Critères d'acceptation**

- [ ] Le facilitateur ouvre une session de vote sur un ensemble d'éléments
- [ ] Chaque participant dispose d'un nombre de points défini par le facilitateur
- [ ] Un participant répartit ses points sans voir les votes des autres avant la clôture
- [ ] Le facilitateur clôture le vote et les résultats deviennent visibles de tous
- [ ] Les éléments sont classables par nombre de points reçus
- [ ] Un vote clôturé est conservé et consultable ultérieurement

**Périmètre exclu**

Vote pondéré par rôle, plusieurs tours automatiques, discussion structurée post-vote.

---

## WI-05 — Contrôler la notation à la saisie

**Description**

Vérifier à la saisie la conformité d'un élément à la grammaire Event Storming et signaler les écarts sans bloquer, afin de remplacer la connaissance de notation qui manque à l'équipe et d'éviter que les deux praticiens corrigent les autres à voix haute.

*Source d'évidence : fait F4 — rapporté par le PO. Hypothèse H3 sur la valeur perçue : non validée.*

**Critères d'acceptation**

- [ ] Un Domain Event dont le verbe n'est pas au passé déclenche un signalement
- [ ] Un élément formulé à l'impératif saisi comme Domain Event déclenche une suggestion de type Command
- [ ] Une Policy ne suivant pas un motif de type `quand … alors …` déclenche un signalement
- [ ] Le signalement n'empêche jamais la création de l'élément
- [ ] L'auteur peut ignorer le signalement en un clic, et l'élément est conservé tel quel
- [ ] Les règles de grammaire sont déterministes et ne dépendent d'aucun appel externe
- [ ] Un contrôle de cohérence en fin d'étape liste les Domain Events sans Command associée
- [ ] La légende de notation est consultable à tout moment sans quitter le mur

**Périmètre exclu**

Reformulation automatique par modèle de langage. Reportée en version ultérieure.

**Risques et dépendances**

* **Unique différenciateur du produit face aux outils de tableau blanc existants.** À protéger des arbitrages de fin de parcours.
* À construire avec WI-03, au moment où la saisie est développée.

---

## WI-06 — Mesurer un découpage candidat

**Description**

Permettre à un architecte de délimiter une zone du mur et d'obtenir des mesures objectives sur cette frontière, afin qu'il exerce son jugement sur des chiffres vérifiables plutôt que sur son intuition ou sur une proposition automatique.

*Source d'évidence : hypothèse A11 — non validée. Aucun entretien conduit avec les deux architectes concernés.*

**Critères d'acceptation**

- [ ] Un utilisateur délimite une zone du mur par sélection au lasso
- [ ] Le nombre de liens franchissant la frontière de la zone est affiché
- [ ] Les liens traversants sont listés et localisables sur le mur
- [ ] Le mur peut être colorié par acteur, révélant les regroupements visuellement
- [ ] Les Domain Events sans lien entrant ni sortant sont signalés
- [ ] Une zone peut être nommée et conservée comme couche superposée au mur
- [ ] Le mur d'origine n'est jamais modifié par la création d'une zone
- [ ] Les mesures restent utilisables sur un mur de 200 nœuds et 300 liens

**Definition of Done**

* Le découpage est une couche additionnelle. Sa suppression laisse le mur intact.

**Périmètre exclu**

Propositions automatiques de bounded contexts ou d'aggregates. Reportées en octobre, sur le mur réel produit en septembre.

**Risques et dépendances**

* Le KPI 8 se mesure ici : les architectes se saisissent-ils des mesures, ou découpent-ils à l'instinct ?
* Ce work item est le socle de l'extension d'octobre : la couche existe, il restera à la remplir.

---

## WI-07 — Importer une transcription et proposer des éléments

**Description**

Après import de la transcription Teams d'une séance, analyser le contenu et proposer des éléments Event Storming dans une couche visuellement distincte de celle du groupe. Les propositions non adoptées disparaissent en fin d'exercice.

*Source d'évidence : demande partie prenante — exigence explicite du PO. Hypothèse H5 sur l'acceptation sociale : non validée. Hypothèse A1 sur la qualité d'extraction : non mesurée.*

**Critères d'acceptation**

- [ ] Le facilitateur importe un fichier de transcription Teams depuis l'interface
- [ ] L'analyse produit des éléments typés selon la notation Event Storming
- [ ] Les éléments proposés sont visuellement distincts de ceux créés par les participants, sans ambiguïté possible
- [ ] Chaque proposition affiche l'extrait de transcription dont elle provient
- [ ] Un participant adopte une proposition en un clic ; elle devient alors un élément ordinaire
- [ ] Une proposition non adoptée disparaît à la clôture de l'exercice
- [ ] Le fournisseur de modèle est accessible derrière une interface unique, les prompts vivant dans des fichiers séparés du code
- [ ] La transcription importée est conservée et associée à la session

**Definition of Done**

* Aucun élément proposé ne peut être confondu avec un élément du groupe, y compris après export.
* Le coût d'appel au modèle est mesuré sur une transcription de deux heures.

**Périmètre exclu**

Captation audio propre, transcription en direct, analyse en continu pendant la séance. La génération se fait à l'import, déclenché par le facilitateur.

**Risques et dépendances**

* Seul work item dépendant d'un modèle de langage.
* Poste le plus exposé en cas de dérive du planning.
* Le format de sortie de la transcription Teams doit être vérifié avant de commencer — 2 heures de spike.

---

## WI-08 — Exporter le modèle en markdown

**Description**

Produire un export markdown déterministe du mur et de la transcription associée, destiné à être versionné dans un dépôt Git, afin que le résultat de l'atelier soit conservé, relisible et exploitable après septembre.

*Source d'évidence : demande partie prenante — exigence explicite du PO, contrainte de conformité déjà tranchée.*

**Critères d'acceptation**

- [ ] L'export produit un fichier markdown lisible sans outil, reflétant l'ordre chronologique du mur
- [ ] Chaque élément exporté porte son type, son auteur et son horodatage
- [ ] Les éléments issus d'une proposition automatique sont identifiés comme tels dans l'export
- [ ] Le lien vers l'extrait de transcription source est conservé dans l'export
- [ ] Deux exports successifs d'un mur inchangé produisent un fichier identique
- [ ] La transcription complète est exportée en markdown au même endroit
- [ ] Les zones de découpage créées dans WI-06 apparaissent dans l'export

**Périmètre exclu**

Commit automatique via l'API Git, gestion de jetons, résolution de conflits. Le fichier est téléchargé puis commité manuellement.

**Risques et dépendances**

* Poste identifié comme non chiffré dans les livrables Design Thinking. Il l'est désormais.
* Le KPI 6 (traçabilité) se mesure depuis cet export.

---

## Ce qui n'est pas dans ce backlog, et pourquoi

| Élément | Motif |
|---|---|
| Propositions automatiques d'aggregates et bounded contexts | A10 non mesurée. Reporté en octobre, sur le mur réel |
| Reformulation par modèle de langage à la saisie | Version ultérieure de WI-05. Le déterministe suffit en V0 |
| Génération de BRD, PRD, DAT | Suppose un modèle complet et validé, que septembre ne produira pas |
| Conception multi-tenant SaaS | Hypothèse sans preuve. L'hygiène de conception suffit |
| Captation audio propre | Teams produit déjà la transcription |
| Authentification et gestion des droits | Hors sujet pour un atelier encadré de deux jours |
| Animation par l'IA | Décision produit : la distribution de la parole reste humaine |

## Risques transverses

| # | Risque | Atténuation |
|---|---|---|
| **R1** | Marge nulle : 19,5 jours estimés pour 20 disponibles | WI-00 et le go / no-go à J-5. L'ordre de coupe est WI-07 puis WI-06 |
| **R2** | Cinq hypothèses fondatrices non validées auprès d'utilisateurs réels | Assumé par le PO. Coût d'erreur borné à la durée du POC |
| **R3** | Un développeur unique, sans redondance | **Risque accepté par le responsable de programme le 2026-08-06.** Le repli non logiciel (WI-00) constitue la seule protection du jalon. Sa réalisation devient prioritaire et non négociable |
| **R4** | Aucune référence de comparaison pour démontrer le gain | Décision en attente du PO |
| **R5** | Devenir de l'outil après septembre non défini | Question ouverte pour le responsable de programme |
