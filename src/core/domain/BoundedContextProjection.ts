/** Projection interface for describing bounded contexts to external consumers. */
export interface BoundedContextProjection {
  onBoundedContext(id: string, name: string): void;
}
