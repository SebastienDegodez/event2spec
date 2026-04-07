/** Value object representing a Given/When/Then scenario within a vertical slice. */
export class Scenario {
  readonly given: ReadonlyArray<string>;
  readonly when: string;
  readonly then: ReadonlyArray<string>;

  private constructor(given: ReadonlyArray<string>, when: string, then: ReadonlyArray<string>) {
    this.given = given;
    this.when = when;
    this.then = then;
  }

  static create(given: string[], when: string, then: string[]): Scenario {
    return new Scenario([...given], when, [...then]);
  }
}
