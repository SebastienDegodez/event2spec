/** Domain object representing a bounded context grouping related vertical slices. */
export class BoundedContext {
  readonly id: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(id: string, name: string): BoundedContext {
    return new BoundedContext(id, name);
  }

  withName(name: string): BoundedContext {
    return new BoundedContext(this.id, name);
  }
}
