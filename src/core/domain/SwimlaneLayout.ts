import { type SwimlaneCategory, SWIMLANE_CATEGORIES, ROWS_PER_SWIMLANE } from './SwimlaneCategory';

/** Computes the grid row for a given swimlane index and category. */
export function swimlaneGridRow(swimlaneIndex: number, category: SwimlaneCategory): number {
  const categoryOffset = SWIMLANE_CATEGORIES.indexOf(category);
  return swimlaneIndex * ROWS_PER_SWIMLANE + categoryOffset;
}

/** Resolves which swimlane index and category a grid row belongs to. */
export function gridRowToSwimlane(row: number): { swimlaneIndex: number; category: SwimlaneCategory } {
  const swimlaneIndex = Math.floor(row / ROWS_PER_SWIMLANE);
  const categoryOffset = row % ROWS_PER_SWIMLANE;
  return { swimlaneIndex, category: SWIMLANE_CATEGORIES[categoryOffset] };
}
