export function buildSliceHitboxColumns(
  visibleColumns: number[],
  isColumnCovered: (column: number) => boolean,
): number[] {
  return visibleColumns.filter((column) => !isColumnCovered(column));
}