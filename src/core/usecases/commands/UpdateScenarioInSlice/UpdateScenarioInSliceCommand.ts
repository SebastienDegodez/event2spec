export class UpdateScenarioInSliceCommand {
  readonly sliceId: string;
  readonly scenarioIndex: number;
  readonly given: string[];
  readonly when: string;
  readonly then: string[];

  constructor(sliceId: string, scenarioIndex: number, given: string[], when: string, then: string[]) {
    this.sliceId = sliceId;
    this.scenarioIndex = scenarioIndex;
    this.given = given;
    this.when = when;
    this.then = then;
  }
}
