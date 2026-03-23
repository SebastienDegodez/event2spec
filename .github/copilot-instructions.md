# Copilot Instructions

## Commit Messages

All commits **must** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and include a **sign-off** line.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
Signed-off-by: Name <email>
```

### Rules

- The commit message **must** start with one of the following types:
  - `feat` – a new feature
  - `fix` – a bug fix
  - `docs` – documentation changes only
  - `style` – formatting, missing semicolons, etc.; no logic change
  - `refactor` – code change that neither fixes a bug nor adds a feature
  - `perf` – a code change that improves performance
  - `test` – adding or correcting tests
  - `build` – changes that affect the build system or external dependencies
  - `ci` – changes to CI/CD configuration files and scripts
  - `chore` – other changes that don't modify src or test files
  - `revert` – reverts a previous commit
- A **scope** may be provided in parentheses after the type, e.g. `feat(api): add endpoint`.
- The **description** must be in lowercase, written in the imperative mood, and must not end with a period.
- The commit **must** include a `Signed-off-by` trailer. Use `git commit --signoff` (or `-s`) to add it automatically.
- Breaking changes must be indicated by appending `!` after the type/scope or by adding a `BREAKING CHANGE:` footer.

### Examples

```
feat(auth): add OAuth2 login support

Signed-off-by: Alice Dupont <alice@example.com>
```

```
fix(api)!: remove deprecated endpoint

BREAKING CHANGE: The /v1/users endpoint has been removed.

Signed-off-by: Bob Martin <bob@example.com>
```

```
docs: update README with setup instructions

Signed-off-by: Carol Simon <carol@example.com>
```

### Enforcement

- A **local git hook** (via Husky) runs `commitlint` on every commit to validate the message format.
- A **GitHub Actions workflow** (`.github/workflows/commitlint.yml`) validates all commit messages on every push and pull request targeting `main`.
- Always run `git commit --signoff` to add the `Signed-off-by` line automatically.
