import { type SliceHeaderEntry } from './SliceHeaderStrip';
import { type SliceOverlayEntry } from './buildSliceOverlayEntries';

interface SliceRangeSelection {
  startColumn: number;
  columnCount: number;
}

interface BuildSliceHeaderEntriesOptions {
  sliceOverlayEntries: SliceOverlayEntry[];
  selectedSliceRange: SliceRangeSelection | null;
  isColumnCovered: (column: number) => boolean;
  extendSelectedSliceRangeRight: () => void;
}

export function buildSliceHeaderEntries({
  sliceOverlayEntries,
  selectedSliceRange,
  isColumnCovered,
  extendSelectedSliceRangeRight,
}: BuildSliceHeaderEntriesOptions): SliceHeaderEntry[] {
  const entries: SliceHeaderEntry[] = sliceOverlayEntries.map((entry) => ({
    id: entry.id,
    label: entry.label,
    startColumn: entry.startColumn,
    columnCount: entry.columnCount,
    isTemporary: false,
    canExtendRight: false,
    onExtendRight: () => {},
    onEdit: entry.onEdit,
    onScenarios: entry.onScenarios,
    onDelete: entry.onDelete,
  }));

  if (!selectedSliceRange) {
    return entries;
  }

  entries.push({
    id: 'temporary-selection',
    label: `Columns ${selectedSliceRange.startColumn}-${selectedSliceRange.startColumn + selectedSliceRange.columnCount - 1}`,
    startColumn: selectedSliceRange.startColumn,
    columnCount: selectedSliceRange.columnCount,
    isTemporary: true,
    canExtendRight: !isColumnCovered(selectedSliceRange.startColumn + selectedSliceRange.columnCount),
    onExtendRight: extendSelectedSliceRangeRight,
  });

  return entries;
}