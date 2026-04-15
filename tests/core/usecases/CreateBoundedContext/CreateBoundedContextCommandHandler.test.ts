import { describe, it, expect } from 'vitest';
import { CreateBoundedContextCommand } from '../../../../src/core/usecases/commands/CreateBoundedContext/CreateBoundedContextCommand';
import { CreateBoundedContextCommandHandler } from '../../../../src/core/usecases/commands/CreateBoundedContext/CreateBoundedContextCommandHandler';
import { InMemoryBoundedContextRepository } from '../../../helpers/InMemoryBoundedContextRepository';
import { collectBoundedContexts } from '../../../helpers/collectBoundedContexts';

describe('CreateBoundedContextCommandHandler', () => {
  it('creates a bounded context in an empty collection', () => {
    const repository = new InMemoryBoundedContextRepository();
    const handler = new CreateBoundedContextCommandHandler(repository);

    handler.handle(new CreateBoundedContextCommand('bc1', 'Réservation'));

    const contexts = collectBoundedContexts(repository.load());
    expect(contexts).toHaveLength(1);
    expect(contexts[0].id).toBe('bc1');
    expect(contexts[0].name).toBe('Réservation');
  });

  it('appends a new bounded context to an existing collection', () => {
    const repository = new InMemoryBoundedContextRepository();
    const handler = new CreateBoundedContextCommandHandler(repository);

    handler.handle(new CreateBoundedContextCommand('bc1', 'Réservation'));
    handler.handle(new CreateBoundedContextCommand('bc2', 'Paiement'));

    const contexts = collectBoundedContexts(repository.load());
    expect(contexts).toHaveLength(2);
    expect(contexts[0].id).toBe('bc1');
    expect(contexts[1].id).toBe('bc2');
  });

  it('inserts a bounded context at a specific index', () => {
    const repository = new InMemoryBoundedContextRepository();
    const handler = new CreateBoundedContextCommandHandler(repository);

    handler.handle(new CreateBoundedContextCommand('bc1', 'Réservation'));
    handler.handle(new CreateBoundedContextCommand('bc2', 'Paiement'));
    handler.handle(new CreateBoundedContextCommand('bc-middle', 'Facturation', 1));

    const contexts = collectBoundedContexts(repository.load());
    expect(contexts).toHaveLength(3);
    expect(contexts[0].id).toBe('bc1');
    expect(contexts[1].id).toBe('bc-middle');
    expect(contexts[2].id).toBe('bc2');
  });
});
