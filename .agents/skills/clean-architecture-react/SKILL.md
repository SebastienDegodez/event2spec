---
name: clean-architecture-react
description: Use when a React/TypeScript feature has a business rule that can be violated, when fetch or axios shows up in a component or a use case, or when naming the port that reaches an API. Covers where a rule belongs, how the layers depend on each other, and gateway versus repository.
---

# Clean architecture in React

## The layout

```
src/domain/          business objects — no React, no HTTP, no imports from other layers
src/application/     use cases + the port interfaces they depend on
src/infrastructure/  adapters implementing those ports (HTTP, storage, in-memory)
src/ui/              React components and hooks
src/composition/     the only place that instantiates adapters and wires them together
```

Dependencies point inward: `ui → application → domain` and `infrastructure → application → domain`. `ui` never imports `infrastructure` — `composition` injects the adapter.

Every feature uses this layout, read-only ones included. A screen goes in `src/ui/`, never at the root of `src/`.

**Why the layout at all:** without it, `fetch` ends up inside a `useEffect`, and the only way to change the API, test the rule, or reuse the flow is to open the component.

## A rule that can be broken belongs to a domain object

This is the mistake to watch: the type is right, the rule is in the wrong place.

```ts
// ✅ src/domain/Todo.ts — the object protects itself
export class TodoAlreadyCompleted extends Error {}

export class Todo {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly done: boolean,
  ) {}

  static from(id: string, title: string, done: boolean): Todo {
    return new Todo(id, title, done)
  }

  complete(): Todo {
    if (this.done) throw new TodoAlreadyCompleted(this.id)
    return new Todo(this.id, this.title, true)
  }
}

// ✅ src/application/CompleteTodoUseCase.ts — orchestrates, does not decide
export class CompleteTodoUseCase {
  constructor(private readonly todos: TodoGateway) {}

  async execute(input: { id: string }, signal?: AbortSignal): Promise<void> {
    const todo = await this.todos.byId(input.id, signal)
    await this.todos.save(todo.complete(), signal)
  }
}
```

```ts
// ❌ the guard in the use case — protects only callers who go through this use case
if (todo.done) throw new Error('already completed')
await repository.completeTodo(todo.id)

// ❌ the guard in the click handler — protects only this button
if (todo?.done) { setError('already completed'); return }
```

**Why:** a check in a use case is bypassed by the next use case; a check in a handler is bypassed by a second component, an optimistic update, or another tab. On the object, every path is covered — and the rule becomes testable without React and without the network.

**The counterweight — no rule, no domain object.** If you never need to throw to protect the state, don't create one: `src/domain` shrinks to a `type`, or disappears. The layers do not: the feature is still a gateway in `application/ports`, an adapter in `infrastructure/`, and a component in `ui/`. A class that only carries the fields of the API response is a DTO in disguise; delete it.

## Gateway, not repository

```ts
// ✅ src/application/ports/TodoGateway.ts — the API owns the todos
export interface TodoGateway {
  byId(id: string, signal?: AbortSignal): Promise<Todo>
  save(todo: Todo, signal?: AbortSignal): Promise<void>
}
```

Name it `TodoRepository` only when the client genuinely owns the collection — offline-first store, IndexedDB, the document being edited. Otherwise it is a `Gateway`.

**Why:** `Repository` claims an in-memory collection you own and may mutate freely. For data that lives behind an API which stays the authority, the name is a lie — and it is the lie that leads to rebuilding the server's model on the client.

## Enforce it

Copy [eslint/clean-architecture.js](eslint/clean-architecture.js) into the project and spread it into the existing flat config — it adds the layer rules and nothing else:

```js
import cleanArchitecture from './eslint/clean-architecture.js'

export default [
  ...yourExistingConfig,
  ...cleanArchitecture({ root: 'src' }),
]
```

Requires `eslint-plugin-boundaries` and `eslint-import-resolver-typescript`. Without the resolver, imports stay unresolved and every layer violation passes silently.
