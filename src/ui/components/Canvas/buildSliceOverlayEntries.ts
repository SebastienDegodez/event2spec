import { type VerticalSliceCollection } from '../../../core/domain/vertical-slice/VerticalSliceCollection';

export interface SliceOverlayEntry {
  id: string;
  label: string;
  startColumn: number;
  columnCount: number;
  onEdit: () => void;
  onScenarios: () => void;
  onDelete: () => void;
}

interface BuildSliceOverlayEntriesOptions {
  slices: VerticalSliceCollection;
  openSliceInspector: (sliceId: string, tab?: 'details' | 'scenarios') => void;
  deleteSlice: (sliceId: string) => void;
}

export function buildSliceOverlayEntries({
  slices,
  openSliceInspector,
  deleteSlice,
}: BuildSliceOverlayEntriesOptions): SliceOverlayEntry[] {
  const entries: SliceOverlayEntry[] = [];

  slices.describeTo({
    onSlice(id, name, _commandId, _eventIds, _readModelId, _scenarios, _boundedContextId, startColumn, columnCount) {
      entries.push({
        id,
        label: name,
        startColumn,
        columnCount,
        onEdit: () => openSliceInspector(id, 'details'),
        onScenarios: () => openSliceInspector(id, 'scenarios'),
        onDelete: () => deleteSlice(id),
      });
    },
  });

  return entries;
}