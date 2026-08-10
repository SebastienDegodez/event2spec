# Method 02 — Research Plan (lo-fi, en cours)

> Statut : brouillon de travail. Créé le 2026-08-04.
> Contrainte structurante : **~4 semaines avant l'atelier de septembre.** La recherche doit être courte, ciblée et parallélisable.

## Objectifs de recherche, par priorité

| # | Objectif | Hypothèse visée | Statut au 2026-08-04 |
|---|---|---|---|
| ~~O1~~ | Savoir si l'enregistrement et la conservation des transcriptions sont autorisés | A5 | **Clos.** Autorisé par l'entreprise. Stockage markdown versionné en dépôt Git. |
| **O1b** | Confirmer que le **traitement** par un LLM externe est autorisé, distinct du stockage | A14 | À lancer — question ciblée sécurité IT |
| **O2** | Établir qu'un LLM propose un découpage jugé recevable par les architectes | A10, A11 | **Clos par décision du PO.** Risque assumé : la validation par les architectes est jugée suffisante. |
| **O3** | Comprendre comment les 6 experts métier se comportent réellement en visio à 23 | A3, A15 | **Clos par décision du PO.** « Ce ne sera pas un sujet. » |
| **O4** | Comprendre comment les architectes découpent aujourd'hui, sans outil | A11 | **Ouvert.** Reste utile pour concevoir le mode Dérivation. |
| **O5** | Établir ce que les 2 développeurs praticiens font réellement quand ils animent | F3, F4 | **Largement renseigné** par le PO. |
| **O6** | Recueillir l'expérience des participants ayant **déjà pratiqué** l'Event Storming ailleurs | A4, A15 | **Ouvert.** Source la moins coûteuse et la moins sollicitée du projet. |

## Cibles de recherche, par tier

### Tier 1 — Ceux qui vivent le problème au quotidien

| Cible | Nb | Objectif visé | Méthode | Accès |
|---|---|---|---|---|
| Les 2 développeurs praticiens de l'Event Storming | 2 | O5 | Entretien de parcours, 45 min chacun | Direct, équipe interne |
| Les experts métier dommage aux biens | 2 à 3 sur 6 | O3 | Entretien court + observation d'une réunion existante | Via le responsable de programme |
| Les 2 architectes | 2 | O4 | Entretien de mode opératoire, 45 min | Direct |

### Tier 2 — Ceux qui influencent ou subissent

| Cible | Nb | Objectif visé | Méthode | Accès |
|---|---|---|---|---|
| Le coach agile qui animera | 1 | O3, O5 | Entretien | Direct |
| Un Product Owner | 1 | O3 | Entretien court | Direct |

### Tier 3 — Contexte organisationnel et technique

| Cible | Objectif visé | Méthode | Accès |
|---|---|---|---|
| DPO / référent RGPD | O1 | Question écrite précise, puis échange si nécessaire | Via le responsable de programme |
| Sécurité IT | O1 | Question écrite : envoi de contenu métier vers un LLM externe | Via l'architecte d'entreprise |
| Juridique / Achats | O1 | Question sur l'enregistrement des consultants externes | Via le responsable de programme |

## Séquence recommandée

L'ordre compte : certaines réponses conditionnent l'utilité des suivantes.

1. **Envoyer les questions de conformité (O1).** Délai de réponse subi, à lancer immédiatement.
2. **Lancer le test de dérivation (O2)** en parallèle, sur un Event Storming existant fait à la main. Ne dépend de personne.
3. **Observer une réunion existante du programme (O3)** — n'importe quelle réunion à large audience en visio suffit pour observer qui parle et qui se tait.
4. **Entretiens Tier 1 (O4, O5)** une fois la conformité éclaircie, pour poser les bonnes questions.

## Protocole d'observation — O3

Élément rapporté par le PO le 2026-08-04 : *« les experts métier parlent lorsqu'ils sont pertinents, autrement une personne recadre le débat, souvent le PO »*. C'est une **description rapportée**, pas une observation comptée — et elle décrit un mécanisme de recadrage porté par une personne.

Ne pas provoquer une réunion. En observer une qui a déjà lieu, et compter :

- Combien de personnes prennent la parole, et combien de fois.
- Combien de prises de parole d'experts métier sont **spontanées** contre **sollicitées**.
- Combien de fois quelqu'un recadre le débat, et qui.
- Combien de temps s'écoule avant la première prise de parole d'un expert métier.
- Ce qui se passe pendant les silences.

Consigner les observations brutes, sans interprétation. La synthèse viendra en Méthode 3.

### Point de vigilance sur le mécanisme de recadrage

Si le recadrage repose sur le PO, alors la qualité de l'atelier de septembre dépend d'une personne — exactement comme elle dépendait des 2 développeurs pour la méthode. C'est le même motif de fragilité, à un autre endroit. À vérifier par l'observation.

## Protocole de test — O2

**Contrainte nouvelle (2026-08-04)** : aucun Event Storming n'a jamais été réalisé dans ce contexte. Il n'existe donc **aucun mur interne de référence**. Le test doit s'appuyer sur une source externe.

Objectif : établir si un LLM produit un découpage que des architectes jugent recevable.

1. Prendre un Event Storming **public, déjà réalisé et déjà découpé** par des praticiens — les cas d'école du corpus DDD ou les exemples référencés dans *awesome-eventstorming*. Un domaine hors assurance est préférable : il neutralise le biais de connaissance préalable des architectes.
2. Fournir uniquement le mur, sans le découpage.
3. Demander une proposition d'aggregates et de bounded contexts, avec justification par les éléments du mur.
4. Comparer au découpage humain de référence.
5. Soumettre la proposition aux 2 architectes **sans leur dire qu'elle vient d'une IA**, et recueillir leur jugement.

Le point 5 est le plus important : il teste A11 (accepteront-ils une proposition automatique) sans le biais d'annonce.

### Pourquoi ce test reste nécessaire

La conviction qu'un LLM sait découper est raisonnable, mais elle n'est pas une preuve. Le coût d'une erreur est asymétrique : un bounded context plausible mais faux emporte l'adhésion de l'équipe et se paie sur plusieurs années. Le test coûte une demi-journée et rend la conviction opposable.

## Ce que cette recherche ne cherche pas

- À valider la maquette Nexus. Ce n'est pas de la recherche, c'est du test de solution — ça viendra plus tard.
- À confirmer que l'outil est une bonne idée.
- À explorer l'ambition SaaS (T4). Un seul cas d'usage est disponible ; la généralisation ne se recherche pas à ce stade.

## Contraintes de la recherche

| Contrainte | Conséquence |
|---|---|
| ~4 semaines avant septembre | Pas plus de 8 entretiens ; privilégier l'observation d'existant |
| Période estivale | Disponibilité réduite ; lancer les demandes d'accès immédiatement |
| O1 subit un délai externe | Ne pas bloquer O2, O3, O4, O5 en l'attendant |

## Questions ouvertes sur le plan lui-même

1. ~~Qui peut ouvrir l'accès au DPO et à la sécurité IT ?~~ **Clos** — conservation déjà autorisée.
2. ~~Existe-t-il un Event Storming déjà réalisé et découpé ?~~ **Non.** Aucun Event Storming n'a jamais été fait ici — recourir à un cas public.
3. Quelle réunion existante du programme peut être observée pour O3 ?
4. Le traitement par un LLM externe est-il couvert par la même autorisation que le stockage ?
