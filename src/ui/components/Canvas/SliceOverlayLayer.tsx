import { SliceOverlay } from './SliceOverlay';
import { type SliceOverlayEntry } from './buildSliceOverlayEntries';

interface SliceOverlayLayerProps {
  sliceOverlayEntries: SliceOverlayEntry[];
  selectedSliceRange: { startColumn: number; columnCount: number } | null;
  viewport: { x: number; y: number; zoom: number };
  height: number;
}

export function SliceOverlayLayer({
  sliceOverlayEntries,
  selectedSliceRange,
  viewport,
  height,
}: SliceOverlayLayerProps) {
  return (
    <div className="slice-overlay-layer" aria-hidden="true">
      {sliceOverlayEntries.map((entry) => (
        <SliceOverlay
          key={entry.id}
          startColumn={entry.startColumn}
          columnCount={entry.columnCount}
          viewport={viewport}
          topOffset={0}
          height={height}
        />
      ))}
      {selectedSliceRange && (
        <SliceOverlay
          startColumn={selectedSliceRange.startColumn}
          columnCount={selectedSliceRange.columnCount}
          viewport={viewport}
          topOffset={0}
          height={height}
          isTemporary
        />
      )}
    </div>
  );
}