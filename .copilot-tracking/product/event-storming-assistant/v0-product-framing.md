# Cadrage produit V0 — Assistant Event Storming

> Document de cadrage produit. **Ce n'est pas un PRD.**
> Entrées : livrables Design Thinking du 2026-08-04 / 05, traités comme exploratoires.
> Date : 2026-08-05.

---

## Avertissement sur la qualité des entrées

Les livrables DT reposent sur **une seule source d'information : le Product Owner.** La synthèse DT se qualifie elle-même de « fidélité recherche : faible, complétude des parties prenantes : faible ». Cinq personas ont été rédigés, aucun n'a été interrogé.

Ce cadrage est donc une **hypothèse produit structurée**, pas une spécification validée. Chaque élément marqué *non validé* exige une confrontation à des utilisateurs réels avant tout engagement de développement.

---

## Nature de l'objet — précisé le 2026-08-05

**Il s'agit d'un POC dont la finalité est d'accélérer un programme de transformation qui a besoin d'un Event Storming en septembre.**

Ce recadrage déplace le critère de réussite. L'objet n'est pas de livrer un produit, mais de faire réussir un jalon programme. La qualité de l'outil est instrumentale ; ce qui compte est le modèle de domaine produit les 15 et 16 septembre.

### Une tension à nommer : le mot et l'usage ne coïncident pas

| Ce que « POC » implique habituellement | Ce que celui-ci est réellement |
|---|---|
| Jetable, abandonnable sans conséquence | **Porteur** : 23 personnes et 2 jours de programme en dépendent |
| Usage interne, quelques utilisateurs avertis | 23 utilisateurs, dont 6 experts métier non techniques |
| Échec sans coût | Échec = 46 jours-homme perdus et un jalon programme manqué |
| Pas de contrainte de disponibilité | Doit fonctionner à 9 h le jour J, sans seconde chance |

Un POC classique peut échouer. Celui-ci ne le peut pas, parce que **l'atelier aura lieu avec ou sans lui**. Cela n'impose pas plus de fonctionnalités : cela impose une **dégradation gracieuse** et un plan de repli.

### Exigence induite — le plan de repli

Aucune des entrées Design Thinking n'aborde cette question. Elle est pourtant la plus critique du dossier.

| Élément | Recommandation |
|---|---|
| **Repli fonctionnel** | Le déroulé guidé doit exister en version papier ou document partagé, indépendamment de l'outil. Il coûte une demi-journée et sauve l'atelier |
| **Repli technique** | Un document collaboratif partagé et Teams permettent de tenir l'atelier dès le premier jour, sans aucun développement |
| **Décision de bascule** | Un go / no-go **5 jours ouvrés avant l'atelier**, sur un critère unique : la saisie simultanée à 23 fonctionne-t-elle sous test de charge ? |
| **Qui décide** | Le responsable de programme, pas le développeur ni le PO. La décision engage 46 jours-homme |
| **Reprise en cours d'atelier** | Si l'outil tombe au jour 1, le contenu déjà produit doit être exportable pour poursuivre autrement |

**Sans plan de repli, le programme fait reposer un jalon sur un POC écrit par une seule personne en vingt jours.** C'est le risque le plus élevé du dossier, et il ne se traite pas par du développement.

---

## 1. Analyse critique des entrées

### 1.1 Incohérences relevées

| # | Incohérence | Impact |
|---|---|---|
| **I1** | F1 affirme « personne ne partage une méthode ES commune », F9 affirme « plusieurs participants en ont déjà pratiqué ailleurs ». | Le déficit est peut-être un problème d'**alignement** (chacun sa variante) et non de **compétence**. Un outil qui impose une notation résout l'alignement ; il ne résout pas l'animation. Le problème a peut-être été surdimensionné. |
| **I2** | L'objectif métier initial — alimenter le process de dev pour générer BRD, PRD et DAT — a été sorti du périmètre, et **aucun des cinq concepts ne l'adresse**. | Le produit conçu est un outil d'atelier, pas le pont vers la spécification annoncé au départ. La justification économique du projet a disparu en cours de route sans être remplacée. |
| **I3** | La barre de succès retenue est « meilleur que sans outil ». Or aucun Event Storming n'a jamais été conduit dans ce programme. | **Il n'existe aucune référence de comparaison.** L'objectif de succès est, en l'état, non mesurable. |
| **I4** | Le périmètre n'a jamais été réduit au cours de l'exploration : le niveau Software Design a été ajouté, puis les cinq thèmes retenus intégralement. | Estimation DT : 22 à 25 jours pour 20 disponibles, **avant** de compter quatre postes non chiffrés. La marge est négative au point de départ. |
| **I5** | Le PO déclare que « énormément de tests » ont déjà été menés, ce qui contredit la mention « aucune recherche terrain conduite » du journal de transition DT. | Soit ces tests existent et invalident l'avertissement de fidélité, soit ils n'existent pas. **C'est la plus grande zone d'incertitude du dossier.** |

### 1.2 Hypothèses faibles

| # | Hypothèse | Pourquoi elle est faible |
|---|---|---|
| **A9 — Le besoin est générique, donc SaaS** | Aucune preuve. Un seul cas d'usage observé, dans une seule entreprise, sur un seul domaine. L'ambition SaaS impose des contraintes de conception (multi-tenant, isolation) sans bénéfice mesurable en V0. |
| **A13 — Les 3 niveaux d'ES sont livrables pour septembre** | Notée « risque très élevé » dans le journal DT, jamais traitée. Contournée par un découpage v0/v1 qui déplace la question sans y répondre. |
| **A15 — Les experts métier parlent spontanément** | Rapportée par le PO, jamais observée. Le mécanisme décrit repose sur une personne — le PO lui-même — qui recadre le débat. Risque de dépendance à un individu, identique au problème que le produit prétend résoudre. |
| **A10 — Un LLM propose un découpage pertinent** | Non mesurée. Le garde-fou invoqué est le jugement des architectes. Si les propositions sont médiocres, les architectes cesseront de les consulter et la fonctionnalité devient un coût mort. |
| ~~A14~~ | **Levée le 2026-08-05** : le traitement de contenu métier par une API LLM tierce est autorisé. |

### 1.3 Éléments manquants

| Manque | Conséquence |
|---|---|
| Aucun utilisateur final interrogé | Les besoins des 6 experts métier, des 2 architectes et des 2 développeurs praticiens sont **déduits**, pas recueillis. |
| Aucune référence de comparaison | Impossible de démontrer la valeur du produit après septembre. |
| Quatre postes de charge non chiffrés | Export markdown Git, identité et sessions, déploiement, transposition du modèle de domaine en C#. |
| Aucune règle de décision en cas de retard | Personne n'a défini qui coupe quoi, ni à quelle date. |
| Aucun coût d'exploitation estimé | Consommation LLM, hébergement, maintenance après septembre. |

---

## 2. Cadrage produit

### 2.1 Énoncés du problème

**Problème principal — retenu**

> Dans un atelier Event Storming, la personne qui maîtrise la méthode est mobilisée par la mécanique — écrire les post-its, tenir la chronologie, corriger la notation. Son expertise, qui est la raison de sa présence, n'atteint jamais le contenu.

*Statut : issu d'une observation rapportée par le PO. **Non validé** auprès des deux développeurs concernés.*

**Problème secondaire — retenu**

> Ce qui est dit en atelier disparaît. Il ne reste ni la formulation d'origine, ni le lien entre une décision de modélisation et la parole métier qui l'a fondée.

*Statut : cohérent avec la contrainte de stockage Git déjà tranchée. **Plausible, non validé.***

**Problème tertiaire — partiellement retenu**

> Le découpage en aggregates et bounded contexts repose sur l'intuition d'un architecte plutôt que sur la matière produite par le métier.

*Statut : réel. **Traité partiellement en V0** — l'outil fournit les mesures qui rendent le mur lisible, sans proposer de découpage. Voir décisions D-05 et D-13.*

### 2.2 Personas cibles, priorisés

| Rang | Persona | Rôle vis-à-vis du produit | Justification du rang |
|---|---|---|---|
| **P1** | **Le développeur praticien de l'Event Storming** (2 personnes) | Bénéficiaire principal : il redevient contributeur | C'est sa douleur qui fonde le produit. Sans lui, il n'y a pas de problème à résoudre. |
| **P2** | **Le coach agile facilitateur** (1 personne) | Utilisateur principal : il pilote la séance | Il est le point de défaillance unique de l'atelier. S'il décroche, la séance s'arrête. |
| **P3** | **L'expert métier dommage aux biens** (6 personnes) | Contributeur : sa parole est la matière | Groupe le plus nombreux et seule source de vérité du domaine, mais il n'utilise l'outil que pour saisir et voter. |
| **P4** | **L'architecte** (2 personnes) | Utilisateur d'un mode distinct, hors atelier | Servi en V0 par les **mesures** de découpage, pas par des propositions automatiques. Son besoin intervient après les deux jours, mais son décrochage pendant l'atelier coûterait plus cher que la fonctionnalité |

**Correction apportée à l'entrée DT** : le Design Thinking désignait le coach agile comme persona primaire. Ce cadrage place le **développeur praticien** en P1, car c'est sa situation qui justifie l'existence du produit. Le coach agile est l'utilisateur le plus exposé, pas le bénéficiaire principal. La distinction change les arbitrages en cas de conflit de conception.

### 2.3 Contexte métier

Programme de transformation sur le domaine **dommage aux biens** d'un assureur. Premier atelier de cadrage prévu en **septembre 2026** : 2 jours, 23 participants, distanciel intégral.

| Élément | Valeur |
|---|---|
| Échéance | Septembre 2026, soit environ 20 jours ouvrés |
| Capacité | 1 développeur à 100 %, staff engineer |
| Hébergement | Kubernetes interne, validation sécurité acquise |
| Contrainte technique | .NET obligatoire. Node interdit à l'exécution |
| Conformité | Conservation des transcriptions autorisée. Traitement par LLM externe **non tranché** |
| Actif existant | POC `event2spec` — mono-utilisateur, notation Event Modeling, non réutilisable en l'état comme socle |

---

## 3. Proposition de valeur

### 3.1 Valeur principale

> **L'expertise reste dans la conversation.**
>
> L'assistant prend en charge la mécanique de l'atelier — le cadre, la saisie, la notation — pour que les personnes qui savent restent des participants, et pour que rien de ce qui est dit ne se perde.

### 3.2 Différenciation

| Face à | Ce qui distingue |
|---|---|
| **Un tableau blanc générique** (Miro, Mural) | L'outil connaît la grammaire Event Storming et l'applique à la saisie. Un tableau blanc ne sait pas qu'un événement se formule au passé. |
| **Une transcription de réunion** (Teams, Otter) | La transcription produit du texte. L'outil produit un modèle structuré, où chaque élément reste rattaché au passage de conversation qui l'a fondé. |
| **Un atelier Event Storming classique** | Vingt-trois personnes contribuent simultanément par le clavier, au lieu d'une seule qui tient le feutre. |

**Le différenciateur réel est la grammaire.** C'est le seul élément qu'aucun outil du marché ne couvre, et c'est précisément la connaissance qui manque à l'équipe. Il doit être protégé des arbitrages de fin de parcours.

---

## 4. Décisions stratégiques

### 4.1 Ce que nous choisissons de résoudre

| Décision | Rationnel |
|---|---|
| **D-01 — Libérer le praticien de la mécanique** | Douleur la plus nette et la mieux caractérisée du dossier. Elle conditionne la qualité du modèle produit : sans la contribution des deux praticiens, l'atelier perd sa compétence technique. |
| **D-02 — Rendre la contribution possible sans prendre la parole** | Vingt-trois personnes en visio : le silence est le comportement par défaut. Le clavier partagé est la seule réponse structurelle, et elle ne coûte aucune IA. |
| **D-03 — Tenir la notation à la saisie** | Seul différenciateur réel face aux outils existants. Remplace directement la connaissance absente de l'équipe. |
| **D-04 — Conserver la trace de ce qui a été dit** | Exigence explicite du PO, déjà tranchée sur le plan technique (markdown versionné). Faible coût, valeur durable, prérequis de toute exploitation ultérieure. |
| **D-13 — Rendre le mur mesurable pour les architectes** | *(Ajouté le 2026-08-05 après challenge du PO.)* Les mesures sur graphe — liens traversants, coloration par acteur, événements orphelins — sont déterministes, coûtent environ 2 jours et ne portent aucun risque d'inférence. Elles donnent aux architectes ce que leur persona réclame : **un instrument vérifiable, pas un verdict**. Elles évitent surtout leur décrochage pendant deux jours d'atelier, dont le coût politique dépasse celui de la fonctionnalité. |

### 4.2 Ce que nous choisissons explicitement de NE PAS résoudre en V0

| Décision | Rationnel |
|---|---|
| **D-05 — Écarter les propositions automatiques de découpage** | *(Révisé le 2026-08-05. La décision initiale écartait l'intégralité du découpage ; le challenge du PO l'a affinée.)* Seule la moitié **inférence LLM** est écartée. Motif : l'hypothèse A10 — un LLM propose un découpage pertinent — n'a jamais été mesurée, et cette fonctionnalité arriverait en fin de budget, là où l'erreur coûte le plus cher. Elle se construira en octobre **sur le mur réel produit en septembre**, ce qui constitue un bien meilleur matériau d'apprentissage qu'une hypothèse. La moitié mesures est conservée — voir D-13. |
| **D-06 — Écarter la génération de BRD, PRD et DAT** | Aucun concept ne l'adresse. Suppose un modèle complet et validé, ce que septembre ne produira pas. À reconsidérer une fois qu'un Event Storming réel existe. |
| **D-07 — Écarter la conception multi-tenant SaaS** | Hypothèse A9 sans aucune preuve. Ajoute des contraintes structurelles pour un bénéfice non démontré. **Ne pas confondre avec l'hygiène de conception** : ne rien coder qui soit spécifiquement lié à cette entreprise reste une bonne pratique et ne coûte rien. |
| **D-08 — Écarter l'animation par l'IA** | Décision DT confirmée. La distribution de la parole, la gestion des silences et le respect du temps restent humains. Cohérent avec la valeur revendiquée. |
| **D-09 — Écarter la captation audio propre** | Teams produit déjà une transcription horodatée avec identification des locuteurs. Construire une captation reviendrait à refaire ce qui existe. |

### 4.3 Décision levée

| Décision | Statut |
|---|---|
| **D-10 — La couche fantôme** | **Confirmée sans condition le 2026-08-05.** Le traitement de contenu métier par une API LLM tierce est autorisé. A14 est levée. L'abstraction du fournisseur de modèle reste recommandée par hygiène, non par contrainte |

### 4.4 Décision ajoutée — recadrage POC

| Décision | Rationnel |
|---|---|
| **D-11 — Construire un plan de repli non logiciel** | L'atelier aura lieu avec ou sans l'outil. Un déroulé papier et un document collaboratif partagé permettent de tenir les deux jours sans développement. Coût : une demi-journée. Ce n'est pas un aveu d'échec, c'est ce qui autorise à prendre des risques sur le reste |
| **D-12 — Fixer un go / no-go à J-5** | Critère unique : la saisie simultanée à 23 tient-elle sous test de charge ? Décision portée par le responsable de programme |

---

## 5. Fonctionnalités candidates

Cinq fonctionnalités, ordonnées par dépendance. Chacune est utilisable seule.

### Fonctionnalité A — Le déroulé guidé

Un agenda Event Storming pré-écrit pour deux jours, affichant en permanence l'étape en cours, ce qui est attendu du groupe et le temps restant.

| | |
|---|---|
| Sert | P2 (coach agile), P1 |
| Résout | D-01 partiellement, et le déficit de méthode |
| IA requise | Non |
| Sans elle | Le coach improvise une méthode qu'il ne connaît pas |

### Fonctionnalité B — La saisie simultanée

Vingt-trois participants saisissent leurs éléments en même temps sur un mur partagé, pendant un temps chronométré et sans prise de parole. Le tri s'effectue ensuite par vote, sans débat.

| | |
|---|---|
| Sert | P3 (experts métier), P1 |
| Résout | D-01, D-02 |
| IA requise | Non |
| Sans elle | Une seule personne écrit pour tout le monde. Le problème central demeure |

**C'est le socle technique du produit** : board collaboratif temps réel. Toutes les autres fonctionnalités s'y appuient.

### Fonctionnalité C — Le contrôle de notation

À la saisie, l'outil vérifie la conformité à la grammaire Event Storming — événement au passé, motifs `whenever / then`, cohérence de type — et signale les écarts sans bloquer.

| | |
|---|---|
| Sert | P1, P2, P3 |
| Résout | D-03 |
| IA requise | **Non en V0** — règles déterministes. La reformulation par LLM relève d'une version ultérieure |
| Sans elle | Le produit perd son unique différenciation |

**Recommandation d'ordonnancement** : embarquer cette fonctionnalité **avec** la fonctionnalité B, au moment de construire la saisie. Sa version déterministe coûte peu et la protège des arbitrages de fin de parcours.

### Fonctionnalité D — La couche de propositions

Après import de la transcription Teams, l'assistant propose des éléments dans une couche visuellement distincte. Les propositions non adoptées disparaissent en fin d'exercice.

| | |
|---|---|
| Sert | P1, P3 |
| Résout | D-01, D-04 |
| IA requise | **Oui.** A14 levée le 2026-08-05 — plus de condition |
| Sans elle | Le produit reste utile mais perd sa dimension assistée |

Le mécanisme de péremption est la trouvaille du dossier : l'inaction supprime la proposition, ce qui supprime la charge de validation d'un groupe de 23 personnes.

### Fonctionnalité E — Les mesures de découpage

L'architecte entoure une zone du mur et obtient des mesures objectives : nombre de liens franchissant la frontière, coloration du mur par acteur, signalement des événements orphelins. **L'outil ne propose aucun découpage.**

| | |
|---|---|
| Sert | P4 (architectes), P1 |
| Résout | Le problème tertiaire, partiellement |
| IA requise | **Non** — calcul déterministe sur le graphe |
| Coût estimé | ~2 jours |
| Sans elle | Les deux architectes traversent deux jours d'atelier sans rien recevoir, et décrochent |

**Position dans la file** : après la fonctionnalité B, dont elle consomme le mur. Indépendante de la fonctionnalité D.

Cette fonctionnalité est aussi le **socle de l'extension d'octobre** : une fois les mesures en place, ajouter des propositions automatiques revient à remplir une couche qui existe déjà.

---

## 6. Indicateurs de succès

**Recadrage du 2026-08-05** : l'objet étant un POC au service d'un jalon programme, les indicateurs se séparent en deux familles.

| Famille | Ce qu'elle mesure | Qui la regarde |
|---|---|---|
| **Succès du jalon** | L'atelier de septembre a-t-il produit ce pour quoi il était organisé ? | Le responsable de programme |
| **Apprentissage produit** | Les hypothèses du POC se vérifient-elles ? | Le PO et l'équipe |

La première famille décide si le programme avance. La seconde décide s'il faut poursuivre l'outil après septembre. **Un POC peut réussir le jalon et échouer l'apprentissage, ou l'inverse.**

---

### Famille A — Succès du jalon programme

#### KPI 1 — Couverture du domaine *(indicateur maître)*

> Le processus principal du domaine dommage aux biens est-il modélisé de bout en bout à l'issue des deux jours ?

| | |
|---|---|
| Cible | Oui, jugé par les deux développeurs praticiens |
| Mesure | Binaire, jugement expert |
| Ce qu'il révèle | **C'est le seul indicateur qui décide si le programme a avancé.** Tous les autres lui sont subordonnés |

#### KPI 2 — Exploitabilité de la sortie

> Le modèle produit permet-il d'engager la suite du programme sans nouvelle session de cadrage ?

| | |
|---|---|
| Cible | Oui, jugé par l'architecte solution et le responsable de programme |
| Mesure | Binaire, jugement expert, sous 5 jours après l'atelier |
| Ce qu'il révèle | Si le POC a rempli sa fonction d'accélérateur, ou s'il a seulement occupé deux jours |

---

### Famille B — Apprentissage produit

#### KPI 3 — Contribution des praticiens

> Position des deux développeurs praticiens dans le classement des contributeurs par volume d'éléments créés.

| | |
|---|---|
| Cible | Chacun dans la moitié supérieure des contributeurs |
| Seuil d'alerte | L'un des deux dans le dernier quart |
| Mesure | Automatique |
| Ce qu'il révèle | **C'est le KPI du problème principal.** S'ils restent silencieux, l'hypothèse fondatrice du produit est fausse |

#### KPI 4 — Taux de contribution

> Part des 23 participants ayant produit au moins un élément retenu dans le modèle final.

| | |
|---|---|
| Cible | ≥ 80 % (18 sur 23) |
| Seuil d'alerte | < 50 % |
| Mesure | Automatique |
| Ce qu'il révèle | Si le clavier partagé débloque effectivement la contribution |

#### KPI 5 — Autonomie du facilitateur

> Nombre de fois où le coach agile doit solliciter une aide méthodologique pendant les deux jours.

| | |
|---|---|
| Cible | ≤ 3 sur deux jours |
| Seuil d'alerte | > 10 |
| Mesure | Comptage manuel par un observateur |
| Ce qu'il révèle | Si le déroulé guidé remplace effectivement la connaissance de la méthode |

#### KPI 6 — Traçabilité

> Part des éléments du modèle rattachés à un extrait de transcription identifiable.

| | |
|---|---|
| Cible | 100 % des éléments issus de la couche de propositions |
| Mesure | Automatique |
| Ce qu'il révèle | Si la conversation est réellement conservée et exploitable ultérieurement |

#### KPI 7 — Recours au plan de repli

> L'atelier a-t-il dû basculer sur le repli non logiciel, et à quel moment ?

| | |
|---|---|
| Cible | Aucun recours |
| Mesure | Observation |
| Ce qu'il révèle | La robustesse réelle du POC en conditions d'usage |

#### KPI 8 — Usage des mesures de découpage

> Les architectes se saisissent-ils des mesures pour raisonner, ou découpent-ils à l'instinct sans les consulter ?

| | |
|---|---|
| Cible | Au moins une frontière retenue justifiée par une mesure |
| Mesure | Observation en séance de conception |
| Ce qu'il révèle | **Test direct de l'hypothèse A11** — les architectes acceptent-ils un instrument ? Si oui, l'extension d'octobre est fondée. Si non, il ne faut pas la construire |

---

### Problème de mesure à résoudre avant septembre

La barre annoncée est « meilleur que sans outil ». **Aucune référence de comparaison n'existe** : aucun Event Storming n'a jamais été conduit dans ce programme.

Deux options, à trancher :

1. **Créer une référence** — conduire un Event Storming manuel de 90 minutes sur un périmètre restreint avant septembre, et en mesurer les mêmes indicateurs. Coût : une demi-journée pour 6 personnes. Bénéfice : la valeur du produit devient démontrable devant le comité de programme.
2. **Renoncer à la comparaison** — s'en tenir aux seuils absolus ci-dessus, en assumant qu'aucune démonstration de gain ne sera possible.

**Recommandation : option 1.** Le coût est marginal et c'est la seule façon de justifier l'investissement après coup.

---

## 7. Hypothèses et questions ouvertes

### 7.1 Hypothèses portant le cadrage

| # | Hypothèse | Statut | Si elle est fausse |
|---|---|---|---|
| **H1** | Le dilemme du facilitateur est bien la douleur dominante | **Non validé** — rapporté par le PO, jamais confirmé auprès des 2 développeurs | Le produit résout un problème secondaire. 30 minutes d'entretien lèvent le doute |
| **H2** | La saisie au clavier débloque la contribution des experts métier | **Non validé** | La fonctionnalité B perd sa raison d'être. Testable en 7 minutes sur une réunion existante |
| **H3** | Un contrôle de notation déterministe apporte une valeur perceptible | **Non validé** | Le différenciateur du produit s'effondre. Testable sur 30 phrases métier réelles en une heure |
| **H4** | Le coach agile peut animer avec un déroulé écrit | **Non validé** | La fonctionnalité A ne suffit pas. Testable en 30 minutes avec le coach |
| **H5** | Un groupe accepte des propositions automatiques sans se sentir dépossédé | **Non validé** | La fonctionnalité D produit un consensus artificiel — l'inverse du but de l'Event Storming |

**Aucune de ces cinq hypothèses n'a été confrontée à un utilisateur réel.** Le coût total de leur validation est inférieur à deux jours de travail, sans aucun développement.

### 7.2 Inconnues

| # | Inconnue | Criticité | Qui répond |
|---|---|---|---|
| ~~Q1~~ | ~~Quels tests ont déjà été menés ?~~ | **Close le 2026-08-05 sans documentation.** Le PO indique que des tests ont été menés mais qu'ils ne seront ni consignés ni partagés | — |
| ~~Q2~~ | ~~Le traitement de contenu métier par une API LLM tierce est-il autorisé ?~~ | **Close le 2026-08-05 : oui** | — |
| **Q3** | Quel est le plan de repli si l'outil n'est pas prêt ou tombe le jour J ? Qui décide, et quand ? | **Haute** — 46 jours-homme et un jalon programme en dépendent. **Seule question critique encore ouverte** | Le responsable de programme |
| **Q4** | Existe-t-il une référence de comparaison, ou renonce-t-on à démontrer le gain ? | Moyenne | Le PO |
| **Q5** | Que devient l'outil après septembre — abandon, reprise, industrialisation ? | Moyenne — non bloquante pour le POC | Le responsable de programme |
| ~~Q6~~ | ~~Coût d'exploitation, ambition SaaS, reprise équipe~~ | **Déclassées** — hors sujet pour un POC à durée déterminée | — |

### Statut de validation des hypothèses — clos le 2026-08-05

Le PO indique que des tests ont été menés sur les sujets abordés et qu'ils ne seront ni consignés ni partagés dans ce cadre.

**Conséquence factuelle, sans jugement** : les hypothèses H1 à H5 restent formellement au statut *non validé* dans ce document, faute d'élément opposable. Le cadrage repose donc sur la conviction du Product Owner.

Ce statut est acceptable dans une logique de POC à durée déterminée : le coût d'une erreur se limite à vingt jours de développement. Il le serait beaucoup moins si le POC devait servir de base à un investissement produit.

**Point de vigilance pour l'après-septembre** : si la question d'une industrialisation se pose, ces cinq hypothèses devront être documentées. Un comité d'investissement ne finance pas une conviction.

---

## 8. Journal des décisions

| # | Décision | Origine DT | Statut | Rationnel |
|---|---|---|---|---|
| 1 | Problème principal = dilemme du facilitateur | Conservé | Retenu | Douleur la mieux caractérisée du dossier |
| 2 | Persona P1 = développeur praticien, non le coach agile | **Modifié** | Retenu | La douleur fonde le produit ; le coach est l'utilisateur le plus exposé, pas le bénéficiaire principal |
| 2bis | Persona P4 = architecte, servi par les mesures | **Révisé le 2026-08-05** | Retenu | Son décrochage pendant 2 jours d'atelier coûte plus que la fonctionnalité |
| 3 | Fonctionnalité « Le Fil Conducteur » | Conservé | Retenu | Coût faible, valeur immédiate, aucune IA |
| 4 | Fonctionnalité « La Tempête Silencieuse » | Conservé | Retenu | Socle technique et réponse structurelle au silence en visio |
| 5 | Fonctionnalité « Le Gardien de la Grammaire », version déterministe | **Réduit** | Retenu | Différenciateur réel. La couche LLM est reportée |
| 6 | Fonctionnalité « La Couche Fantôme » sur import Teams | Conservé | Retenu sous condition A14 | Porte la promesse d'assistance. Dépend d'une autorisation non acquise |
| 7 | Fonctionnalité « L'Instrument de Mesure » — moitié mesures | **Rétabli le 2026-08-05** | Retenu | Déterministe, ~2 jours, aucun risque d'inférence. Évite le décrochage des architectes |
| 7bis | Propositions automatiques de découpage | **Écarté** | Hors V0 | A10 non mesurée, arriverait en fin de budget. Se construira en octobre sur le mur réel |
| 8 | Aggregates et bounded contexts générés par IA | **Écarté** | Hors V0 | Voir 7bis. La conception doit en préserver la possibilité : traçabilité post-it ↔ transcription, ordre chronologique fin, regroupement libre |
| 9 | Génération BRD / PRD / DAT | Conservé hors périmètre | Hors V0 | Suppose un modèle complet et validé |
| 10 | Conception multi-tenant SaaS | **Écarté** | Hors V0 | Hypothèse sans preuve. L'hygiène de conception suffit |
| 11 | Captation audio propre | **Écarté** | Hors V0 | Teams produit déjà la transcription |
| 12 | Créer une référence de comparaison avant septembre | **Ajouté** | Recommandé | Sans elle, la valeur du produit sera indémontrable |

---

## 9. Recommandation d'engagement

**Révisée le 2026-08-05.** L'engagement des 20 jours n'est plus en question : le POC est financé et son but est d'accélérer un jalon programme. La recommandation se déplace donc de *faut-il investir* vers *comment ne pas perdre le jalon*.

### Deux actions avant la première ligne de code

| Action | Coût | Pourquoi |
|---|---|---|
| **Construire le repli non logiciel** — déroulé papier et document collaboratif partagé | Une demi-journée | L'atelier aura lieu de toute façon. Le repli est ce qui **autorise** à prendre des risques sur le développement |
| **Fixer le go / no-go à J-5** avec le responsable de programme | Une conversation | La décision engage 46 jours-homme. Elle ne peut pas être prise le matin même par le développeur |

### Une action à tout moment

~~Répondre à Q1.~~ **Close le 2026-08-05** : les tests menés ne seront pas documentés. Les hypothèses H1 à H5 restent formellement non validées. Acceptable pour un POC, à revoir si une industrialisation est envisagée.

### Ce qui n'est plus une objection

Le dépassement de 10 à 25 % du budget de développement n'est plus bloquant : dans une logique de POC, livrer trois fonctionnalités sur quatre reste un succès si l'atelier produit son modèle. **À condition que la fonctionnalité manquante soit choisie plutôt que subie** — d'où le go / no-go à J-5.
