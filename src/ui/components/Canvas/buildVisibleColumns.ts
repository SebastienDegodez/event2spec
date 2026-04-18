interface ViewportCell {
  column: number;
}

export function buildVisibleColumns(viewportCells: ViewportCell[]): number[] {
  const columns = new Set<number>();

  viewportCells.forEach((cell) => {
    columns.add(cell.column);
  });

  if (columns.size === 0) {
    for (let column = 0; column <= 20; column += 1) {
      columns.add(column);
    }
  }

  return [...columns].sort((left, right) => left - right);
}