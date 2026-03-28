# Project Constitution — event2spec

## Package Management (APM)

This project uses **APM CLI** (`apm`) to manage AI agent plugins and skills.

> **Rule**: Never edit `apm.yml` or `apm.lock.yaml` manually.
> Always use the `apm install` CLI — it auto-updates `apm.yml`, deploys skills to `.github/skills/`, and generates `apm.lock.yaml`.

### Installing a plugin

```bash
# Public repos (e.g. anthropics)
GITHUB_TOKEN="" apm install <owner>/<repo>/plugins/<plugin-name>

# When the org token blocks access, clear it first
GITHUB_TOKEN="" apm install SebastienDegodez/copilot-instructions/plugins/<plugin-name>
```

### Regenerating AGENTS.md

After adding or updating plugins, regenerate the agent instructions:

```bash
apm compile
```
