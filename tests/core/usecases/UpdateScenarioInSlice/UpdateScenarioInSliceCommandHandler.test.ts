import { describe, it, expect } from 'vitest';
import { VerticalSliceCollection } from '../../../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { VerticalSlice } from '../../../../src/core/domain/vertical-slice/VerticalSlice';
import { Scenario } from '../../../../src/core/domain/Scenario';
import { UpdateScenarioInSliceCommand } from '../../../../src/core/usecases/commands/UpdateScenarioInSlice/UpdateScenarioInSliceCommand';
import { UpdateScenarioInSliceCommandHandler } from '../../../../src/core/usecases/commands/UpdateScenarioInSlice/UpdateScenarioInSliceCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('UpdateScenarioInSliceCommandHandler', () => {
  it('updates an existing scenario at the given index', () => {
    const slice = VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1')
      .addScenario(Scenario.create(['an empty cart'], 'user places order', ['order is created']));
    const initial = VerticalSliceCollection.empty().add(slice);
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new UpdateScenarioInSliceCommandHandler(repository);

    handler.handle(new UpdateScenarioInSliceCommand('vs1', 0, ['a cart with items'], 'user places order', ['order confirmed']));

    const slices = collectSlices(repository.load());
    expect(slices[0].scenarios).toHaveLength(1);
    expect(slices[0].scenarios[0].given).toEqual(['a cart with items']);
    expect(slices[0].scenarios[0].when).toBe('user places order');
    expect(slices[0].scenarios[0].then).toEqual(['order confirmed']);
  });

  it('only updates the scenario at the specified index, leaving others unchanged', () => {
    const slice = VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1')
      .addScenario(Scenario.create(['given1'], 'when1', ['then1']))
      .addScenario(Scenario.create(['given2'], 'when2', ['then2']));
    const initial = VerticalSliceCollection.empty().add(slice);
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new UpdateScenarioInSliceCommandHandler(repository);

    handler.handle(new UpdateScenarioInSliceCommand('vs1', 0, ['updated given'], 'updated when', ['updated then']));

    const slices = collectSlices(repository.load());
    expect(slices[0].scenarios).toHaveLength(2);
    expect(slices[0].scenarios[0].given).toEqual(['updated given']);
    expect(slices[0].scenarios[1].given).toEqual(['given2']);
  });

  it('does not affect other slices', () => {
    const slice1 = VerticalSlice.create('vs1', 'Slice 1', 'c1', ['e1'], 'rm1')
      .addScenario(Scenario.create(['given1'], 'when1', ['then1']));
    const slice2 = VerticalSlice.create('vs2', 'Slice 2', 'c2', ['e2'], 'rm2')
      .addScenario(Scenario.create(['given2'], 'when2', ['then2']));
    const initial = VerticalSliceCollection.empty().add(slice1).add(slice2);
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new UpdateScenarioInSliceCommandHandler(repository);

    handler.handle(new UpdateScenarioInSliceCommand('vs1', 0, ['new given'], 'new when', ['new then']));

    const slices = collectSlices(repository.load());
    expect(slices[1].scenarios[0].given).toEqual(['given2']);
  });
});
