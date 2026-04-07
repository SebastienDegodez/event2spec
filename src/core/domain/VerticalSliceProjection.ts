/** Projection data for a single scenario within a vertical slice. */
export interface ScenarioProjection {
  readonly given: ReadonlyArray<string>;
  readonly when: string;
  readonly then: ReadonlyArray<string>;
}

/** Projection interface for describing vertical slices to external consumers. */
export interface VerticalSliceProjection {
  onSlice(
    id: string,
    name: string,
    commandId: string,
    eventIds: ReadonlyArray<string>,
    readModelId: string,
    scenarios: ReadonlyArray<ScenarioProjection>,
  ): void;
}
