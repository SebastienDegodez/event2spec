---
applyTo: 'src/core/usecases/**'
description: Enforces Command-Query Separation (CQS) and Repository pattern for use case handlers
---
# CQS & Repository Pattern for Use Cases

## Command-Query Separation (CQS)

All use cases follow strict **Command-Query Separation**:

- **Commands** mutate state and return `void` — they never return a value.
- **Queries** read state via projection and never mutate.

### Command Handlers

Command handlers:

1. Receive **only** the command object in `handle(command)` — never the aggregate/collection directly.
2. Return `void` — never the aggregate, collection, or domain entity.
3. Use an **injected repository** (via constructor) to `load()` the aggregate, apply the mutation, and `save()` the result.

```typescript
// ✅ Correct — command handler uses repository, returns void
export class AddSwimlaneCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: AddSwimlaneCommand): void {
    const collection = this.repository.load();
    const swimlane = Swimlane.create(command.id, command.actorName, command.actorType);
    this.repository.save(collection.add(swimlane));
  }
}
```

```typescript
// ❌ Wrong — receives collection directly and returns it
export class AddSwimlaneCommandHandler {
  handle(collection: SwimlaneCollection, command: AddSwimlaneCommand): SwimlaneCollection {
    return collection.add(Swimlane.create(command.id, command.actorName, command.actorType));
  }
}
```

```typescript
// ❌ Wrong — returns a domain entity (violates CQS)
export class AddSwimlaneCommandHandler {
  handle(command: AddSwimlaneCommand): Swimlane {
    return Swimlane.create(command.id, command.actorName, command.actorType);
  }
}
```

### Query Handlers

After executing a command, use a **query handler** to retrieve the result via projection:

```typescript
// Query handler reads from the collection via projection
export class GetSwimlaneByIdQueryHandler {
  handle(collection: SwimlaneCollection, query: GetSwimlaneByIdQuery, projection: SwimlaneProjection): void {
    collection.describeTo({
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        if (id === query.id) {
          projection.onSwimlane(id, actorName, actorType, color, index, isFirst, isLast);
        }
      },
    });
  }
}
```

## Repository Pattern

### Port Interface (Domain Layer)

Each aggregate/collection has a repository port in `src/core/domain/`:

```typescript
export interface SwimlaneRepository {
  load(): SwimlaneCollection;
  save(collection: SwimlaneCollection): void;
}
```

### Implementation (Infrastructure / Store)

The store creates a repository implementation that bridges the use case layer with Zustand state:

```typescript
const swimlaneRepository: SwimlaneRepository = {
  load: () => get().swimlanes,
  save: (swimlanes) => {
    const { board, links } = get();
    saveToStorage(board, links, swimlanes);
    set({ swimlanes });
  },
};
```

### Test Implementation

Tests use an `InMemorySwimlaneRepository`:

```typescript
export class InMemorySwimlaneRepository implements SwimlaneRepository {
  private collection: SwimlaneCollection;

  constructor(initial: SwimlaneCollection = SwimlaneCollection.empty()) {
    this.collection = initial;
  }

  load(): SwimlaneCollection {
    return this.collection;
  }

  save(collection: SwimlaneCollection): void {
    this.collection = collection;
  }
}
```

## Flow Summary

1. **Store action** calls `commandHandler.handle(command)` — handler returns `void`
2. **Command handler** internally: `repository.load()` → mutate → `repository.save()`
3. **Repository.save()** updates Zustand state + persists to localStorage
4. To retrieve the created entity, use a **query handler** with the command's ID via projection
