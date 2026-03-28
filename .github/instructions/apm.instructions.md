---
applyTo: "**"
---

## Package Management

This project uses **APM CLI** (`apm`) to manage AI agent plugins and skills deployed under `.github/skills/`.

**Never edit `apm.yml` or `apm.lock.yaml` manually.** Always use the `apm install` CLI.

### Installing a plugin

```bash
# Public repos — clear the token to allow unauthenticated access
GITHUB_TOKEN="" apm install <owner>/<repo>/plugins/<plugin-name>
```

### Installed plugins

```bash
GITHUB_TOKEN="" apm install anthropics/claude-code/plugins/frontend-design
GITHUB_TOKEN="" apm install SebastienDegodez/copilot-instructions/plugins/csharp-clean-architecture-development
GITHUB_TOKEN="" apm install SebastienDegodez/copilot-instructions/plugins/minimal-context-tools
GITHUB_TOKEN="" apm install SebastienDegodez/copilot-instructions/plugins/superpowers-whetstone
```

### Regenerating AGENTS.md

```bash
apm compile
```
