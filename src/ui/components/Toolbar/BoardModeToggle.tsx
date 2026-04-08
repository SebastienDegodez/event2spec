import { useBoardActions, useBoardMode } from '../../../core/store/useBoardStore';
import { type BoardMode } from '../../../core/domain/BoardMode';

const MODE_LABELS: Record<BoardMode, string> = {
  classic: '📋 Classic',
  swimlane: '🏊 Swimlane',
};

export function BoardModeToggle() {
  const boardMode = useBoardMode();
  const { setBoardMode } = useBoardActions();

  const handleToggle = () => {
    setBoardMode(boardMode === 'classic' ? 'swimlane' : 'classic');
  };

  return (
    <button
      className="board-mode-toggle"
      onClick={handleToggle}
      title={`Switch to ${boardMode === 'classic' ? 'swimlane' : 'classic'} mode`}
      aria-label={`Current mode: ${boardMode}. Click to switch.`}
    >
      {MODE_LABELS[boardMode]}
    </button>
  );
}
