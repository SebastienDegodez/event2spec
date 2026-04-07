export class RemoveScenarioFromSliceCommand {
  readonly sliceId: string;
  readonly scenarioIndex: number;

  constructor(sliceId: string, scenarioIndex: number) {
    this.sliceId = sliceId;
    this.scenarioIndex = scenarioIndex;
  }
}
