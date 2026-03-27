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

### Setting up snip token-reduction hooks

The `setup-snip-hooks` skill (from `minimal-context-tools`) scaffolds a `snip` preToolUse hook:

```bash
mkdir -p .github/hooks
cp .github/skills/setup-snip-hooks/templates/snip-rewrite.sh .github/hooks/snip-rewrite.sh
cp .github/skills/setup-snip-hooks/templates/hooks.json      .github/hooks/hooks.json
chmod +x .github/hooks/snip-rewrite.sh

# Optional: .NET-specific snip filters
mkdir -p ~/.config/snip/filters
cp .github/skills/setup-snip-hooks/filters/dotnet-build.yaml ~/.config/snip/filters/dotnet-build.yaml
cp .github/skills/setup-snip-hooks/filters/dotnet-test.yaml  ~/.config/snip/filters/dotnet-test.yaml
```

### Regenerating AGENTS.md

```bash
apm compile
```
