```yaml
project:
  name: "Event Storming Assistant"
  slug: "event-storming-assistant"
  created: "2026-08-04"
  initial_request: |
    Dans le cadre d'un programme de transformation je dois faire un event storming.
    Je voudrais appliquer la méthode de design thinking pour créer une application qui permettra
    d'accompagner les utilisateurs dans l'exercice de event storming assisté avec l'IA a chaque étape.
    L'application event storming :
    - On pourra solliciter l'IA par la commande vocale ou par un envoi de texte. Les transcriptions
      vocales doivent être conservées, il en est de même pour les textes envoyés.
    - L'outil doit être accessible à tout le monde (je ne connais rien à l'event storming vs je suis
      coach agile).
    - Le produit fini que délivre l'application est un event storming complet (évènement, commande,
      découpage architecture, etc...) pour comprendre ce qu'est un event storming complet se référer
      au site : https://github.com/mariuszgil/awesome-eventstorming.
    - Le repo event2spec est un POC qui devait matérialiser cette ambition, si il faut le modifier ou
      complètement le revoir c'est ok.
    - Utilise le fichier word stocké dans le chemin :
      C:\Users\user\OneDrive\Desktop\Prime\Event Storming HVE
    - Le but de l'outil est de pouvoir matérialiser dans l'event storming le contenu de ce qui est
      partagé par les interlocuteurs
  initial_classification: "frozen"

current:
  method: 7
  space: "implementation"
  phase: "7a terminée - session closée, passage à Product Manager Advisor"
  status: "closed"
  closed_date: "2026-08-05"
  resume_point: |
    Reprendre en Méthode 7c (rédaction de la spécification d'implémentation) ou en Méthode 8
    (test utilisateur) après l'atelier de septembre. Toutes les décisions d'architecture sont
    tranchées dans method-07-hifi-prototypes/translation-planning.md.

methods_completed: [1, 2, 3, 4, 5, 6]

discovered_drivers:
  - id: D1
    driver: "Aucune méthodologie Event Storming commune - chacun fait à sa manière"
    type: "capability gap"
  - id: D2
    driver: "Personne ne sait animer ce type d'atelier"
    type: "capability gap"
  - id: D3
    driver: "Pression délai - besoin de cadrer et rendre l'exercice productif, éviter des sessions étalées sur des mois"
    type: "constraint"
  - id: D4
    driver: "Le résultat doit alimenter le process de dev - génération BRD, PRD, DAT via agents"
    type: "outcome"
  - id: D5
    driver: "Découvrir bounded contexts et aggregates avec un balanced coupling, DDD à la lettre (Khononov, Evans, Vernon)"
    type: "outcome"

open_tensions:
  - id: T1
    tension: "D2 (novices en animation) vs D5 (sortie niveau Software Design DDD) - deux niveaux d'expertise très éloignés"
    status: "resolved"
    resolution: "Event Storming assisté par l'IA - l'IA porte la méthode, pas les participants"
    date: "2026-08-04"
  - id: T2
    tension: "D3 (pas de sessions sur des mois) vs D5 (un ES complet jusqu'aux aggregates est normalement itératif)"
    status: "resolved"
    resolution: "On applique l'ES correctement, ça prendra le temps nécessaire. La deadline septembre porte sur l'outil, pas sur la complétude de l'ES."
    date: "2026-08-04"
  - id: T3
    tension: "Persona novice vs persona coach agile - même outil, attentes opposées"
    status: "resolved"
    resolution: "Persona primaire = coach agile / facilitateur. Novices = participants, pas utilisateurs primaires."
    date: "2026-08-04"

scope:
  deadline: "2026-09 - outil utilisable"
  workshop_format: "distanciel, 23 participants, domaine dommage aux biens"
  product_ambition: "SaaS réutilisable par d'autres entreprises"
  solution_sketch: "Maquette Nexus - panneau transcription live + board ES généré, export backlog draft"
  mvp_levels:
    - "Big Picture (comprendre le domaine)"
    - "Process Modeling (déroulé des processus)"
    - "Software Design (aggregates, bounded contexts) - ajouté 2026-08-04"
  post_mvp:
    - "Balanced Coupling (Khononov) - retiré du MVP 2026-08-04"
    - "Génération BRD / PRD / DAT via agents"
  primary_persona: "Coach agile en position de facilitateur"
  session_split:
    - id: "A"
      name: "Atelier de domaine"
      participants: "23 personnes, distanciel"
      levels: ["Big Picture", "Process Modeling"]
      tool_mode: "captation live"
    - id: "B"
      name: "Séance de conception"
      participants: "2 architectes + 2 développeurs"
      levels: ["Software Design"]
      tool_mode: "dérivation asynchrone sur le mur existant"
      depends_on_audio: false

transition_log:
  - from_method: null
    to_method: 1
    rationale: "Project initialized - PO requests scope framing for AI-assisted Event Storming tool"
    date: "2026-08-04"
  - from_method: 1
    to_method: 2
    rationale: "Cadrage complet - 7 arbitrages tranchés, problème validé (dilemme du facilitateur), périmètre MVP fixé sur 3 niveaux en 2 séances. Passage à la recherche pour tester les hypothèses, dont A5 bloquante."
    date: "2026-08-04"
  - from_method: 2
    to_method: 3
    rationale: |
      Méthode 2 comprimée sur décision du PO (contrainte de délai). A5 levée par réponse directe.
      O2 et O3 clos par acceptation de risque assumée. Aucune recherche terrain conduite.
      Synthèse établie à partir d'une source unique - limite tracée explicitement.
    date: "2026-08-04"

hint_calibration:
  level: 1
  pattern_notes: |
    User is a PO with a clearly articulated solution request and named constraints.
    Responds well to direct, structured prompts. Works in French.

session_log:
  - date: "2026-08-04"
    method: 1
    summary: |
      Session initialization. Captured initial request verbatim. Read reference material
      (Event Storming - The Complete Guide, Word doc). Canonical deck workflow enabled.
      Session objective: obtain a shared scope/cadrage.
  - date: "2026-08-04"
    method: 1
    summary: |
      Méthode 1 complète. 7 tensions arbitrées (T1, T2, T3, T5, T7, T10 résolues ; T4, T6, T8, T9 ouvertes).
      Découverte centrale : le dilemme du facilitateur. Les 3 métiers de l'outil définis
      (scribe, cartographe, gardien de la grammaire). Périmètre étendu au niveau Software Design
      puis structuré en deux séances (captation live / dérivation asynchrone).
      Balanced Coupling retiré du MVP. Snapshot canonique créé puis rafraîchi.
  - date: "2026-08-05"
    method: 7
    summary: |
      Méthodes 4 à 7a. Brainstorming sur HMW6, 40 idées, 5 thèmes convergés.
      5 concepts articulés avec cibles de validation comportementales. Ordre de construction
      arrêté selon les dépendances. Plan de prototypage lo-fi établi puis écarté par le PO
      (tests déjà menés, non documentés). Traduction technique complète : Kubernetes interne,
      .NET / ASP.NET Core, SignalR, pod unique, React en statique, import Teams.
      Session closée à la demande du PO pour bascule vers Product Manager Advisor.

open_risks_at_closure:
  - id: T4
    risk: "Ambition SaaS multi-entreprises jamais confrontée au délai. Aucune décision prise."
  - id: T9
    risk: "Périmètre estimé 22-25 jours pour 20 disponibles. La ligne tombe autour du concept 4."
  - id: A10
    risk: "Qualité du découpage LLM non mesurée. Risque assumé par le PO."
  - id: A15
    risk: "Prise de parole des experts métier en visio non observée. Risque assumé par le PO."
  - id: SYNTH
    risk: "Synthèse à source unique - fidélité recherche faible. Le PO mentionne des tests déjà menés, jamais documentés."
  - id: UNCOSTED
    risk: "Quatre postes non chiffrés : export Git markdown, identité et sessions, déploiement, transposition du domaine en C#."

artifacts:
  - path: "C:/Users/user/OneDrive/Desktop/Prime/Event Storming HVE/Event Storming.docx"
    method: 1
    type: "reference-material"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-01-scope/scope-boundaries.md"
    method: 1
    type: "scope-boundaries"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-01-scope/stakeholder-map.md"
    method: 1
    type: "stakeholder-map"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-01-scope/assumptions-log.md"
    method: 1
    type: "assumptions-log"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/vision-statement.md"
    method: 1
    type: "canonical-vision-statement"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/problem-statement.md"
    method: 1
    type: "canonical-problem-statement"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/personas/"
    method: 1
    type: "canonical-personas"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/scenarios/atelier-cadrage-dommage-aux-biens.md"
    method: 1
    type: "canonical-scenario"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/use-cases/materialiser-les-echanges-en-post-its.md"
    method: 1
    type: "canonical-use-case"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/use-cases/deriver-aggregates-et-bounded-contexts.md"
    method: 1
    type: "canonical-use-case"
  - path: ".copilot-tracking/dt/event-storming-assistant/canonical/scenarios/seance-conception-decoupage.md"
    method: 1
    type: "canonical-scenario"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-02-research/research-plan.md"
    method: 2
    type: "research-plan"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-03-synthesis/synthesis-themes.md"
    method: 3
    type: "synthesis-themes"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-04-brainstorming/ideation-plan.md"
    method: 4
    type: "ideation-plan"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-05-concepts/concept-planning.md"
    method: 5
    type: "concept-planning"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-05-concepts/concepts.yml"
    method: 5
    type: "concept-cards"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-05-concepts/build-sequence.md"
    method: 5
    type: "build-sequence"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-06-prototypes/prototype-plan.md"
    method: 6
    type: "prototype-plan"
  - path: ".copilot-tracking/dt/event-storming-assistant/method-07-hifi-prototypes/translation-planning.md"
    method: 7
    type: "technical-translation"

delivery:
  capacity: "1 développeur à 100%, staff engineer, assisté par LLM avancé"
  window: "~20 jours ouvrés avant septembre 2026"
  codebase_decision: "Repartir d'une base multi-utilisateurs. event2spec devient référence, pas socle."
  tech_stack:
    hosting: "Kubernetes interne, sécurité validée"
    backend: ".NET / ASP.NET Core - Node interdit à l'exécution"
    realtime: "SignalR, serveur autoritaire, pod unique, état en mémoire"
    frontend: "React / TypeScript, build Vite en CI, servi en statique"
    concurrency_model: "Dernier-arrivé-gagne par champ. Pas de CRDT."
    transcription: "Import de la transcription Teams, pas de captation propre"
    domain_ownership: "Modèle de domaine en C# côté serveur uniquement - ne pas dupliquer côté client"
  selected_scope:
    - theme: 1
      level: v0
    - theme: 2
      level: v0
    - theme: 3
      level: v1
    - theme: 4
      level: v1
      modification: "Couche fantôme générée aux pauses de séance, pas en continu"
    - theme: 5
      level: v0
  build_order:
    - "1. Le Fil Conducteur"
    - "2. La Tempête Silencieuse"
    - "3. L'Instrument de Mesure"
    - "4. La Couche Fantôme"
    - "5. Le Gardien de la Grammaire"
  build_order_rationale: |
    Ordre des dépendances, règle du toujours-livrable. Ligne de sécurité franchie au palier 2.
    Risque résiduel : les deux concepts IA sont en fin de file, donc les plus exposés à la coupe.
  estimated_load: "22 à 25 jours pour 20 disponibles - la ligne tombe autour du concept 4"

canonical_deck:
  enabled: true
  opt_in_date: "2026-08-04"
  snapshots:
    - key: "method-01-exit"
      mode: "create"
      date: "2026-08-04"
      entries: 6
      paths:
        - "canonical/vision-statement.md"
        - "canonical/problem-statement.md"
        - "canonical/personas/developpeur-praticien-es.md"
        - "canonical/personas/coach-agile-facilitateur.md"
        - "canonical/personas/expert-metier-dommage-aux-biens.md"
        - "canonical/scenarios/atelier-cadrage-dommage-aux-biens.md"
        - "canonical/use-cases/materialiser-les-echanges-en-post-its.md"
    - key: "method-01-exit-refresh"
      mode: "refresh"
      date: "2026-08-04"
      entries: 9
      rationale: "Ajout du niveau Software Design au MVP et séparation en deux séances"
      updated:
        - "canonical/vision-statement.md"
        - "canonical/problem-statement.md"
      added:
        - "canonical/personas/architecte-decoupage.md"
        - "canonical/scenarios/seance-conception-decoupage.md"
        - "canonical/use-cases/deriver-aggregates-et-bounded-contexts.md"

customer_card_render:
  offers:
    - snapshot_key: "method-01-exit"
      offered_at: "2026-08-04"
      response: "no answer - deferred, user pivoted to scope change"
    - snapshot_key: "method-01-exit-refresh"
      offered_at: "2026-08-04"
      response: "pending"

context:
  user_role: "Product Owner"
  participants:
    - "Architecte"
    - "Coach agile"
    - "Métier"
    - "Développeur"
    - "Program manager"
  session_objective: "Un cadrage"
  existing_assets:
    - "event2spec repo (POC, React/TS, board Event Modeling avec nodes, slices, bounded contexts)"
    - "Event Storming.docx (guide de référence: Big Picture / Process Modeling / Software Design)"
    - "https://github.com/mariuszgil/awesome-eventstorming (référence notation complète)"
    - "https://coupling.dev - Balanced Coupling model (Khononov)"
    - "Learning DDD (Khononov), Evans, Vernon - corpus DDD de référence"
```
