# Method 01 — Stakeholder Map (lo-fi, en cours)

> Statut : brouillon de travail. Session du 2026-08-04.
> Contexte : premier atelier septembre 2026, **distanciel**, domaine **dommage aux biens**.

## Participants de l'atelier de septembre (23 personnes)

| Groupe | Nb | Rôle dans l'atelier | Tier |
|---|---|---|---|
| Métier (dommage aux biens) | 6 | Source de vérité du domaine | Primaire |
| Consultants externes | 4 | Apport méthode / capacité | Secondaire |
| Product Owner | 3 | Traduisent vers le backlog | Primaire |
| Conseil interne | 3 | Accompagnement transformation | Secondaire |
| Actuaire | 3 | Règles de tarification, contraintes modèles | Secondaire |
| Architecte solution | 1 | Consommateur aval (DAT) | Primaire |
| Architecte d'entreprise | 1 | Cohérence bounded contexts | Primaire |
| Responsable conseil interne | 1 | Sponsor méthode | Secondaire |
| Responsable de programme | 1 | Sponsor / arbitre délai | Primaire |
| **Coach agile** | 1 | **Anime l'atelier — persona primaire de l'outil** (oubli initial, confirmé présent) | Primaire |
| **Développeurs connaîtant l'ES** | 2 | **Seuls porteurs de la méthode ET contributeurs attendus** | Primaire |

## Parties prenantes cachées (non présentes, capables de bloquer)

| Qui | Pourquoi | Déclencheur |
|---|---|---|
| DPO / RGPD | Conservation de transcriptions vocales de réunions | Enregistrement + rétention |
| Sécurité IT | Envoi de contenu métier vers un LLM externe (OpenAI dans la maquette) | Choix du modèle IA |
| Juridique / Achats | 4 consultants externes enregistrés | NDA, propriété des transcriptions |
| Futurs clients SaaS | L'ambition SaaS multi-entreprises | Multi-tenancy, isolation des données |

## Trou identifié — résolu (2026-08-04)

Le coach agile était un oubli dans la liste initiale : il sera présent.

**Nouvelle découverte, plus importante :** 2 développeurs maîtrisent la méthode et l'ont déjà pratiquée. Mais **s'ils animent, ils ne peuvent plus contribuer**. C'est le dilemme du facilitateur : la compétence rare est absorbée par la mécanique de l'atelier au lieu d'alimenter le contenu.

## Observations

- **23 participants dépasse la recommandation Brandolini** (5-10, jusqu'à 20 max) — et cette recommandation vise le présentiel, où les gens se déplacent le long d'un mur. En visio à 23, le risque dominant est le silence : 3 personnes parlent, 20 regardent.
- **Le ratio est déséquilibré** : 6 experts métier pour 17 non-experts du domaine. L'event storming vit de la parole des experts métier.
- **L'architecte d'entreprise et l'architecte solution sont des consommateurs aval** (bounded contexts, DAT) — ils ont un intérêt fort au niveau Software Design, qui est hors MVP.
