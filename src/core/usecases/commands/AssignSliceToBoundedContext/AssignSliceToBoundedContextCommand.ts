export class AssignSliceToBoundedContextCommand {
  readonly sliceId: string;
  readonly boundedContextId: string | undefined;

  constructor(sliceId: string, boundedContextId: string | undefined) {
    this.sliceId = sliceId;
    this.boundedContextId = boundedContextId;
  }
}
