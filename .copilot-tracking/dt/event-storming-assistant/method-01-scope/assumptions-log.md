# Method 01 — Assumptions Log (lo-fi, en cours)

> Statut : brouillon de travail. Session du 2026-08-04.
> Distinguer ce qu'on **sait** de ce qu'on **suppose**. Rien n'est priorisé ici.

## Ce qu'on sait (constaté)

| # | Fait |
|---|---|
| F1 | Personne ne partage une méthode Event Storming commune. |
| F2 | 2 développeurs maîtrisent la méthode et l'ont déjà pratiquée. |
| F3 | Animer empêche ces 2 développeurs de contribuer. |
| F4 | Ce qui les bloque : écrire/placer les post-its, tenir la chronologie, corriger la notation. |
| F5 | Ce qui ne les bloque pas : distribuer la parole, gérer le temps et les objectifs. |
| F6 | Atelier de septembre : distanciel, 23 participants, domaine dommage aux biens. |
| F7 | Un coach agile sera présent. |
| F8 | **La conservation des transcriptions est autorisée** par l'entreprise. Format retenu : markdown, versionné dans un dépôt Git. *(A5 levée le 2026-08-04)* |
| F9 | Aucun Event Storming n'a été réalisé **dans ce programme**. En revanche, **plusieurs participants en ont déjà pratiqué ailleurs** — comme participants, pas comme animateurs. *(précisé le 2026-08-04)* |
| F11 | Le PO n'a personnellement jamais fait d'Event Storming. |
| F10 | En réunion, les experts métier parlent quand le sujet les concerne ; sinon quelqu'un recadre le débat, le plus souvent le PO. *(rapporté par le PO, non observé)* |

## Ce qu'on suppose (à valider)

| # | Hypothèse | Risque | Comment la tester |
|---|---|---|---|
| A1 | Un LLM sait extraire des éléments ES fiables d'une conversation en français, jargon assurance dommage aux biens, à 23 voix. | **Élevé** | Rejouer un enregistrement d'atelier réel et mesurer la qualité d'extraction. |
| A2 | Un groupe de 23 en visio peut valider des post-its sans casser le rythme de l'atelier. | **Élevé** | Test à blanc du mécanisme de validation, sans IA. |
| A3 | Les 6 experts métier vont réellement parler, minoritaires face à 17 non-experts en visio. | **Élevé** | Observer un atelier existant du programme. |
| A4 | Le coach agile saura animer un ES sans connaître la méthode, si l'outil tient la grammaire. | Moyen | Faire animer un mini-ES au coach avec un support méthode. |
| A5 | La conformité autorisera la conservation des transcriptions et l'envoi de contenu métier vers un LLM externe. | **Bloquant** | ~~Question directe au DPO~~ **Partiellement levée le 2026-08-04** : la conservation est autorisée. Le **traitement par un LLM externe** reste à confirmer — voir A14. |
| A6 | Un MVP Big Picture + Process Modeling est livrable pour septembre. | Élevé | Découper et confronter à la capacité réelle de l'équipe. |
| A7 | Le POC `event2spec` est réutilisable comme socle. | Moyen | Revue de code au regard des besoins réels. |
| A8 | Le modèle produit sera exploitable par les agents pour générer BRD / PRD / DAT. | Moyen | Tenter la génération depuis un ES existant, même fait à la main. |
| A9 | Le besoin est générique au point d'en faire un SaaS pour d'autres entreprises. | Élevé | Aucune preuve à ce stade — un seul cas d'usage observé. |
| A10 | Un LLM sait proposer des aggregates et des bounded contexts pertinents à partir d'un mur d'Event Storming. | **Élevé** | Rejouer sur un ES déjà modélisé dont le découpage est connu, et comparer. |
| A11 | Les architectes accepteront un découpage proposé par une IA, même sous réserve de validation. | Moyen | Leur soumettre une proposition sur un périmètre connu et observer la réaction. |
| A13 | Les 3 niveaux d'Event Storming sont livrables pour septembre. | **Très élevé** | Confronter le découpage à la capacité réelle de l'équipe. |
| A14 | Le **traitement** du contenu métier par un LLM externe est autorisé, distinct du simple **stockage** des transcriptions. | **Élevé** | Question ciblée à la sécurité IT, en précisant « envoi vers une API tierce » et non « conservation interne ». |
| A15 | Les experts métier prennent la parole spontanément quand le sujet les concerne. | Moyen | Compter, sur une réunion réelle, les prises de parole non sollicitées. Actuellement rapporté, pas observé. |

## Point de vigilance

**A5 est partiellement levée.** La conservation des transcriptions en markdown dans un dépôt Git est autorisée par l'entreprise. Reste **A14** : stocker en interne et envoyer vers une API tierce sont deux autorisations différentes. La maquette Nexus affiche « OpenAI / GPT-4.1 » ; tant que ce point n'est pas tranché, l'architecture doit rester agnostique au fournisseur de modèle.

## Risques acceptés par le PO (2026-08-04)

Deux risques ont été signalés puis explicitement assumés. Ils sont tracés ici sans être relancés.

| Risque | Position du PO | Ce qui se passe si le risque se réalise |
|---|---|---|
| **A10** — la qualité du découpage proposé par le LLM n'est pas mesurée avant le développement | « Les architectes sont plus que qualifiés pour remettre en cause le découpage proposé par l'IA et proposer le leur. » La garde humaine est jugée suffisante. | Si les propositions sont systématiquement mauvaises, les architectes cessent de les lire et la fonctionnalité devient un coût mort. À surveiller à la première séance B. |
| **A15** — le mécanisme de recadrage repose sur une personne (le PO) | « Ce ne sera pas un sujet. » | Si le PO est indisponible ou absorbé par le contenu, la parole des experts métier se rarefîit sans que personne ne le remarque. |

### Atout sous-exploité

Plusieurs participants de l'atelier de septembre ont **déjà pratiqué** l'Event Storming ailleurs. Ils savent à quoi ressemble un atelier réussi et un atelier raté. C'est la source de connaissance la moins coûteuse et la moins sollicitée du projet.
