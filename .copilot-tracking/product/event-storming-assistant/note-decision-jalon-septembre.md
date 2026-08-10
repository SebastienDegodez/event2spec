# Note de décision — Sécuriser le jalon Event Storming de septembre

**Destinataire** : Responsable de programme
**Émetteur** : Product Owner
**Date** : 2026-08-06
**Objet** : Trois décisions à prendre avant le lancement du développement
**Statut** : **Arbitré le 2026-08-06**

---

## Décisions obtenues

| # | Demande | Décision | Ajustement |
|---|---|---|---|
| 1 | Autoriser le repli non logiciel | **Accordé** | — |
| 2 | Porter le go / no-go | **Accordé** | **Date avancée à la première semaine de septembre** |
| 3 | Arbitrer le risque « développeur unique » | **Risque accepté** | Le repli devient la seule protection du jalon |

### Conséquence de l'ajustement de date

Le go / no-go est fixé au **vendredi 4 septembre** au lieu du 8. La décision se prend donc avec **une semaine de développement en moins**.

Cela impose un ordonnancement contraint :

| Avant le 4 septembre | Après le 4 septembre |
|---|---|
| WI-00 — repli non logiciel | WI-02 — déroulé guidé |
| WI-01 — socle collaboratif et déploiement | WI-04 — tri par vote |
| WI-03 — saisie simultanée chronométrée | WI-05 — contrôle de notation |
| **+ test de charge à 23 connexions** | WI-06 — mesures de découpage |
| | WI-07 — import de transcription |
| | WI-08 — export markdown |

Le critère du go / no-go porte sur WI-03. **WI-01 et WI-03 doivent donc être terminés et éprouvés avant le 4 septembre**, soit 7 jours de développement sur les 20.

Ce resserrement est favorable : il place la décision plus tôt, avec davantage de temps pour organiser une bascule vers le repli si nécessaire. Il interdit en revanche de commencer par le déroulé guidé, qui devient post-décision.

### Conséquence de l'acceptation du risque

Le risque « développeur unique » est accepté sans atténuation. **Le repli non logiciel constitue désormais la seule protection du jalon** en cas d'indisponibilité. Sa réalisation devient prioritaire et non négociable.

---

## En une phrase

Le jalon de septembre n'est pas à risque parce que l'outil pourrait ne pas être prêt — il est à risque parce que **rien n'a été prévu pour ce cas**.

---

## La situation

Un atelier Event Storming se tient les 15 et 16 septembre : 23 participants, 2 jours, domaine dommage aux biens. Il conditionne la suite du programme.

Un outil d'assistance est en cours de cadrage pour le rendre plus productif. Le développement est estimé à **19,5 jours pour 20 disponibles**, avec **un seul développeur**.

| Élément | Valeur |
|---|---|
| Coût de l'atelier | **46 jours-homme** (23 personnes × 2 jours) |
| Fenêtre de développement | 20 jours ouvrés |
| Charge estimée | 19,5 jours |
| Marge | **Nulle** |
| Ressource | 1 développeur, sans redondance |

L'atelier aura lieu **avec ou sans l'outil**. C'est ce qui rend la situation gérable — à condition de le décider maintenant plutôt que le matin même.

---

## Décision 1 — Autoriser la construction d'un repli non logiciel

**Ce que c'est** : un déroulé Event Storming papier des deux jours, plus un document collaboratif partagé. Aucun code.

**Coût** : une demi-journée, prise sur les 20.

**Ce que ça apporte** :

- L'atelier peut se tenir intégralement sans l'outil.
- Le contenu produit sert aussi de spécification à l'une des fonctionnalités : le travail n'est pas perdu si l'outil est prêt.
- Le développeur cesse d'être un point de défaillance unique pour le jalon.

**Ce que ça ne dit pas** : rien sur la qualité du développeur. Le repli ne compense pas une compétence, il supprime une dépendance.

> **Demande : accord pour investir 0,5 jour dans le repli.**

---

## Décision 2 — Porter la décision go / no-go à J-5

**Le problème** : si l'outil n'est pas prêt, quelqu'un doit décider de basculer sur le repli. Aujourd'hui, personne n'est désigné. Par défaut, cette décision reviendrait au développeur, le matin du 15 septembre, seul et sous pression.

**Ce qui est proposé** :

| | |
|---|---|
| **Date** | 5 jours ouvrés avant l'atelier, soit le 8 septembre |
| **Critère unique** | La saisie simultanée fonctionne-t-elle sous test de charge à 23 connexions ? |
| **Décideur** | Le responsable de programme |
| **Issues possibles** | Poursuite avec l'outil, bascule sur le repli, ou usage mixte |

Le critère est volontairement binaire et technique. Il ne demande aucun jugement sur la qualité du produit — seulement sur sa capacité à supporter 23 personnes.

**Pourquoi J-5 et pas J-1** : cinq jours permettent de préparer la bascule, de prévenir les participants et d'ajuster l'animation. À J-1, il est trop tard.

> **Demande : accord pour porter cette décision, à cette date, sur ce critère.**

---

## Décision 3 — Prendre acte du risque « développeur unique »

**Le fait** : une seule personne développe. En cas d'absence, de maladie ou de congé imprévu pendant les quatre semaines, le développement s'arrête.

Aucune atténuation n'a été identifiée dans le temps imparti. Ce risque est signalé pour qu'il soit **arbitré et non découvert**.

Trois options :

| Option | Effet |
|---|---|
| **Accepter le risque** | Le repli (décision 1) devient la seule protection du jalon |
| **Associer un second développeur en revue** | Quelques heures par semaine. Ne double pas la capacité, mais permet une reprise |
| **Réduire le périmètre dès maintenant** | Libère de la marge pour absorber un aléa |

> **Demande : choisir explicitement l'une des trois.**

---

## Ce qui a déjà été sécurisé

Pour situer ces trois demandes dans un ensemble maîtrisé :

| Sujet | Statut |
|---|---|
| Conservation des transcriptions | Autorisée. Markdown versionné en dépôt Git |
| Traitement par modèle de langage externe | Autorisé |
| Hébergement | Kubernetes interne, validation sécurité acquise |
| Contrainte technique .NET | Intégrée à la conception |
| Périmètre fonctionnel | Arrêté : 5 fonctionnalités, ordre de construction défini |
| Ordre de coupe en cas de dérive | Défini à l'avance, à froid |

Le cadrage est solide. Ce qui manque relève de la **gouvernance du jalon**, pas de la conception.

---

## Coût de l'inaction

Sans ces trois décisions :

- La bascule vers un repli inexistant se déciderait le 15 septembre à 9 h.
- 23 personnes seraient mobilisées deux jours sans garantie de résultat.
- Le développeur porterait seul, en semaine 4, la responsabilité d'un jalon à 46 jours-homme.

**Le coût des trois décisions se compte en une demi-journée et deux conversations.**

---

## Récapitulatif des demandes

| # | Demande | Coût | Décideur |
|---|---|---|---|
| 1 | Autoriser le repli non logiciel | 0,5 jour | Responsable de programme |
| 2 | Porter le go / no-go du 8 septembre | Une réunion | Responsable de programme |
| 3 | Arbitrer le risque « développeur unique » | Une décision | Responsable de programme |

---

## Annexe — Questions restées ouvertes

Sans impact sur le jalon, à traiter après septembre :

- Existe-t-il une référence de comparaison permettant de démontrer le gain apporté par l'outil ?
- Que devient l'outil après l'atelier : abandon, reprise, industrialisation ?
- Les hypothèses produit n'ont pas été validées auprès d'utilisateurs finaux. Acceptable pour un POC ; à reprendre si un investissement produit est envisagé.
