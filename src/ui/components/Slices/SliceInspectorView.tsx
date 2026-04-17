import { useCallback, useMemo, useState } from 'react';
import { useBoard, useSlices, useSliceActions, useBoardStore } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../../core/domain/VerticalSliceProjection';
import { ScenarioDialog } from './ScenarioDialog';

interface SliceInspectorEntry {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
  boundedContextId: string | undefined;
  startColumn: number;
  columnCount: number;
}

interface NodeEntry {
  id: string;
  label: string;
}

export function SliceInspectorView() {
  const board = useBoard();
  const slices = useSlices();
  const activeSliceInspectorId = useBoardStore((state) => state.activeSliceInspectorId);
  const activeSliceInspectorMode = useBoardStore((state) => state.activeSliceInspectorMode);
  const { closeSliceInspector, renameSlice, addScenarioToSlice, removeScenarioFromSlice } = useSliceActions();
  const [scenarioDialogOpen, setScenarioDialogOpen] = useState(false);

  const availableNodes = useMemo(() => {
    const result: NodeEntry[] = [];
    const projection: BoardProjection = {
      onCommandNode(id, label) { result.push({ id, label }); },
      onDomainEventNode(id, label) { result.push({ id, label }); },
      onReadModelNode(id, label) { result.push({ id, label }); },
      onPolicyNode() {},
      onUIScreenNode() {},
    };
    board.describeTo(projection);
    return result;
  }, [board]);

  const slice = useMemo<SliceInspectorEntry | null>(() => {
    if (!activeSliceInspectorId) {
      return null;
    }

    let found: SliceInspectorEntry | null = null;
    const projection: VerticalSliceProjection = {
      onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount) {
        if (id === activeSliceInspectorId) {
          found = { id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount };
        }
      },
    };
    slices.describeTo(projection);
    return found;
  }, [activeSliceInspectorId, slices]);

  const getLabel = useCallback((nodeId: string) => {
    return availableNodes.find((entry) => entry.id === nodeId)?.label ?? nodeId;
  }, [availableNodes]);

  const handleRename = useCallback((name: string) => {
    if (!slice || !name.trim()) {
      return;
    }
    renameSlice(slice.id, name.trim());
  }, [renameSlice, slice]);

  const handleScenarioConfirm = useCallback((given: string[], when: string, then: string[]) => {
    if (!slice) {
      return;
    }
    addScenarioToSlice(slice.id, given, when, then);
    setScenarioDialogOpen(false);
  }, [addScenarioToSlice, slice]);

  if (!slice) {
    return null;
  }

  return (
    <aside className="slice-editor-view" aria-label="Slice inspector">
      <div className="slice-editor-header">
        <span className="slice-editor-title">
          {activeSliceInspectorMode === 'scenarios' ? `Scenarios · ${slice.name}` : `Slice inspector · ${slice.name}`}
        </span>
        <button className="slice-editor-close" onClick={closeSliceInspector} aria-label="Close">×</button>
      </div>

      <div className="slice-editor-section">
        <div className="slice-editor-label">Slice</div>
        <div className="slice-editor-hint">{slice.name}</div>
      </div>

      <div className="slice-editor-section">
        <div className="slice-editor-hint">Columns {slice.startColumn}-{slice.startColumn + slice.columnCount - 1}</div>
      </div>

      <div className="slice-editor-section">
        <label className="slice-editor-label">Name</label>
        <input
          className="slice-editor-input"
          defaultValue={slice.name}
          onBlur={(event) => handleRename(event.target.value)}
          aria-label="Slice name"
        />
      </div>

      <div className="slice-editor-section">
        <div className="slice-editor-label">Command</div>
        <div className="slice-editor-hint">{getLabel(slice.commandId)}</div>
      </div>

      <div className="slice-editor-section">
        <div className="slice-editor-label">Events</div>
        {slice.eventIds.map((eventId: string) => (
          <div key={eventId} className="slice-editor-hint">{getLabel(eventId)}</div>
        ))}
      </div>

      {slice.readModelId && (
        <div className="slice-editor-section">
          <div className="slice-editor-label">Read Model</div>
          <div className="slice-editor-hint">{getLabel(slice.readModelId)}</div>
        </div>
      )}

      <div className="slice-editor-section">
        <div className="slice-editor-label">Scenarios ({slice.scenarios.length})</div>
        {slice.scenarios.map((scenario: ScenarioProjection, index: number) => (
          <div key={`${slice.id}-${index}`} className="slice-scenario">
            <div className="slice-scenario-content">
              <div className="slice-scenario-group">
                <span className="slice-scenario-keyword">When</span>
                <div className="slice-scenario-nodes">{getLabel(scenario.when)}</div>
              </div>
            </div>
            <button
              className="slice-action-btn slice-action-btn--delete"
              onClick={() => removeScenarioFromSlice(slice.id, index)}
              aria-label="Remove scenario"
            >
              ×
            </button>
          </div>
        ))}
        <button className="slice-add-scenario-btn" onClick={() => setScenarioDialogOpen(true)}>
          ＋ Add Scenario
        </button>
      </div>

      {scenarioDialogOpen && (
        <ScenarioDialog
          onConfirm={handleScenarioConfirm}
          onClose={() => setScenarioDialogOpen(false)}
        />
      )}
    </aside>
  );
}
