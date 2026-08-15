# Measurements

Every section of `SKILL.md` earns its place by a measured delta. This file is the evidence.

Harness: vally 0.12.0, executor `copilot-sdk`, agent and judge `claude-sonnet-4.5`, 3 trials per
stimulus unless stated. The eval spec was frozen between the two arms — only `SKILL.md` changed.

## Skill lift — 15 trials per arm

| Stimulus | without skill | with skill |
|---|---|---|
| `http-stays-in-infrastructure` | 33/100/33 → **55%** | 100/100/100 → **100%** |
| `ui-never-imports-infrastructure` | 50/100/100 → **83%** | 100/100/100 → **100%** |
| `port-is-named-gateway` | 50/50/50 → **50%** | 100/100/50 → **83%** |
| `invariant-lives-in-domain` | 75/75/67 → **72%** | 67/100/75 → **81%** |
| `read-slice-needs-no-domain` | 100/100/33 → **78%** | 33/33/100 → **55%** ⚠ then **78%** after fix |
| **Mean** | **68%** | **~88%** |

## What the baseline proved — the reason each rule exists

- **The invariant never lands in the domain.** In 15/15 baseline trials `domain/Todo.ts` is an
  anemic data interface. The guard sits in the use case (2/3 of the invariant trials) or in the
  component's `handleComplete` (1/3), leaving the use case and the adapter unprotected.
- **The port is never called a gateway.** 3/3 baseline trials named it `TodoRepository` or
  `TodosPort`, for data the API owns.
- **Roughly one trial in three collapses** to a flat `src/` with `fetch` inside a `useEffect`.

## What the baseline also proved — rules deliberately NOT written

The unguided agent already got these right, so writing them down would be dead weight:
dependency direction (never inverted when layers exist), composition root isolation (always the
only place instantiating adapters), use cases depending on the port interface and never on a
concrete class, and loading/error UI handling.

## Ablations

| Removed section | Stimulus | Score without it | With it | Verdict |
|---|---|---|---|---|
| The layout block | `http-stays-in-infrastructure` | 78% | 100% | **keep** — −22 pts |
| The layout block | `ui-never-imports-infrastructure` | 83% | 100% | **keep** — −17 pts, falls back to baseline |
| The counterweight paragraph | `read-slice-needs-no-domain` (n=6) | 4/6 collapses, 56% | 2/6 collapses, 78% | **keep** — halves the collapse rate |

Not yet ablated: the domain-object rule and the gateway rule. Both rest on a 3/3 systematic
baseline failure, so attribution is strong, but neither has been isolated by removal.

## Honest limits

- **n=3 per cell** (n=6 for the counterweight duel). The collapse failure mode is binary, so a
  single trial moves a cell by 33 points. The counterweight result held its direction and effect
  size when the sample doubled (2/6 vs 4/6), but Fisher's exact on that table is ≈0.57 — this is
  the best available evidence, not a significant one.
- **The workspace teaches part of the answer.** The ESLint layer config ships in the eval
  workspace, so the baseline agent can infer the layer names by reading it. This mirrors real
  adoption (a project that installs the skill has the config), and it narrows the skill's job to
  what lint cannot express — but it means the measured lift understates a from-scratch project.
- **`read-slice-needs-no-domain` only reaches parity** with no skill (78%). The skill does not
  improve the trivial read path; the counterweight merely stops the rest of the skill from
  degrading it.
- One earlier baseline run was discarded: an agent had replaced `package.json`, so the lint grader
  failed with `eslint: command not found` and measured tooling rather than architecture. The
  prompts now forbid scaffolding and the grader reinstalls dependencies before linting.

## Reproducing

```sh
vally lint .                                   # frontmatter + file references
vally experiment run experiment.yaml --dry-run # resolves both arms
vally experiment run experiment.yaml --compare # both arms, ~30 agent sessions
```

To ablate a section: copy the skill directory, delete the section from the copy's `SKILL.md`, then
`vally eval -e <copy>/eval.yaml --skill-dir <copy> --tag id=<stimulus> --runs 3`.
