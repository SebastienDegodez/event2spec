/** A Domain Event sticky note placed on the board grid. */
export interface GridNode {
  /** Unique identifier */
  id: string;
  /** Human-readable name of the domain event */
  label: string;
  /** Discrete column position on the grid (no pixel coordinates stored) */
  col: number;
  /** Discrete row position on the grid (no pixel coordinates stored) */
  row: number;
}

/** The full state of the board — a list of positioned domain-event nodes. */
export interface BoardState {
  nodes: GridNode[];
}
