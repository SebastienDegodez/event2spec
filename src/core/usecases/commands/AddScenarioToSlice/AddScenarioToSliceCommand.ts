export class AddScenarioToSliceCommand {
  readonly sliceId: string;
  readonly given: string[];
  readonly when: string;
  readonly then: string[];

  constructor(sliceId: string, given: string[], when: string, then: string[]) {
    this.sliceId = sliceId;
    this.given = given;
    this.when = when;
    this.then = then;
  }
}
