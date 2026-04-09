import { useCallback, useMemo, useState } from 'react';
import { useSlices, useSliceActions, useBoard, useBoundedContexts, useBoundedContextActions } from '../../../core/store/useBoardStore';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../../core/domain/VerticalSliceProjection';
import { type BoundedContextProjection } from '../../../core/domain/BoundedContextProjection';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { ScenarioDialog } from './ScenarioDialog';

interface NodeEntry {
  id: string;
  label: string;
  kind: 'command' | 'domainEvent' | 'readModel';
}

interface SlicePanelEntry {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
  boundedContextId: string | undefined;
}

interface BCEntry {
  id: string;
  name: string;
}

export function SlicePanel() {
  const slices = useSlices();
  const board = useBoard();
  const boundedContexts = useBoundedContexts();
  const { renameSlice, deleteSlice, addScenarioToSlice, removeScenarioFromSlice } = useSliceActions();
  const { assignSliceToBoundedContext } = useBoundedContextActions();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [expandedSlice, setExpandedSlice] = useState<string | null>(null);
  const [scenarioDialogSliceId, setScenarioDialogSliceId] = useState<string | null>(null);

  const entries = useMemo<SlicePanelEntry[]>(() => {
    const result: SlicePanelEntry[] = [];
    const projection: VerticalSliceProjection = {
      onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId) {
        result.push({ id, name, commandId, eventIds, readModelId, scenarios, boundedContextId });
      },
    };
    slices.describeTo(projection);
    return result;
  }, [slices]);

  const bcEntries = useMemo<BCEntry[]>(() => {
    const result: BCEntry[] = [];
    const projection: BoundedContextProjection = {
      onBoundedContext(id, name) { result.push({ id, name }); },
    };
    boundedContexts.describeTo(projection);
    return result;
  }, [boundedContexts]);

  const availableNodes = useMemo<NodeEntry[]>(() => {
    const result: NodeEntry[] = [];
    const projection: BoardProjection = {
      onCommandNode(id, label) { result.push({ id, label, kind: 'command' }); },
      onDomainEventNode(id, label) { result.push({ id, label, kind: 'domainEvent' }); },
      onReadModelNode(id, label) { result.push({ id, label, kind: 'readModel' }); },
      onPolicyNode() {},
      onUIScreenNode() {},
    };
    board.describeTo(projection);
    return result;
  }, [board]);

  const startEditing = useCallback((id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  }, []);

  const commitEditing = useCallback(() => {
    if (editingId && editingName.trim()) {
      renameSlice(editingId, editingName.trim());
    }
    setEditingId(null);
  }, [editingId, editingName, renameSlice]);

  const handleScenarioConfirm = useCallback((given: string[], when: string, then: string[]) => {
    if (scenarioDialogSliceId) {
      addScenarioToSlice(scenarioDialogSliceId, given, when, then);
      setScenarioDialogSliceId(null);
    }
  }, [scenarioDialogSliceId, addScenarioToSlice]);

  const getNode = useCallback((nodeId: string): NodeEntry | undefined => {
    return availableNodes.find((n) => n.id === nodeId);
  }, [availableNodes]);

  const getNodeLabel = useCallback((nodeId: string) => {
    return getNode(nodeId)?.label ?? nodeId;
  }, [getNode]);

  const nodeKindToCss = useCallback((nodeId: string): string => {
    const kind = getNode(nodeId)?.kind;
    if (kind === 'domainEvent') return 'event';
    if (kind === 'command') return 'command';
    return 'default';
  }, [getNode]);

  return (
    <aside className="slice-panel" aria-label="Vertical slice management">
      <div className="palette-title">Vertical Slices</div>

      {entries.map((entry) => (
        <div key={entry.id} className="slice-item">
          <div className="slice-item-header">
            {editingId === entry.id ? (
              <input
                className="slice-name-input"
                value={editingName}
                autoFocus
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={commitEditing}
                onKeyDown={(e) => { if (e.key === 'Enter') commitEditing(); }}
                aria-label="Slice name"
              />
            ) : (
              <button
                className="slice-name"
                onClick={() => startEditing(entry.id, entry.name)}
                title="Click to rename"
                aria-label={`Rename slice ${entry.name}`}
              >
                {entry.name}
              </button>
            )}
            <div className="slice-item-actions">
              <button
                className="slice-action-btn"
                onClick={() => setExpandedSlice(expandedSlice === entry.id ? null : entry.id)}
                title="Toggle details"
                aria-label="Toggle slice details"
              >
                {expandedSlice === entry.id ? '▾' : '▸'}
              </button>
              <button
                className="slice-action-btn slice-action-btn--delete"
                onClick={() => deleteSlice(entry.id)}
                title="Delete slice"
                aria-label={`Delete slice ${entry.name}`}
              >
                ×
              </button>
            </div>
          </div>

          <div className="slice-summary">
            <span className="slice-badge slice-badge--command">⌘ {getNodeLabel(entry.commandId)}</span>
            <span className="slice-badge slice-badge--event">⚡ {entry.eventIds.length} event{entry.eventIds.length !== 1 ? 's' : ''}</span>
            {entry.readModelId && <span className="slice-badge slice-badge--readmodel">📊 {getNodeLabel(entry.readModelId)}</span>}
            {bcEntries.length > 0 && (
              <select
                className="slice-bc-select"
                value={entry.boundedContextId ?? ''}
                onChange={(e) => assignSliceToBoundedContext(entry.id, e.target.value || undefined)}
                aria-label="Bounded context"
              >
                <option value="">— no bounded context —</option>
                {bcEntries.map((bc) => (
                  <option key={bc.id} value={bc.id}>{bc.name}</option>
                ))}
              </select>
            )}
          </div>

          {expandedSlice === entry.id && (
            <div className="slice-details">
              <div className="slice-detail-section">
                <div className="slice-detail-label">Events:</div>
                {entry.eventIds.map((eid) => (
                  <div key={eid} className="slice-detail-value">⚡ {getNodeLabel(eid)}</div>
                ))}
              </div>

              <div className="slice-detail-section">
                <div className="slice-detail-label">Scenarios ({entry.scenarios.length}):</div>
                {entry.scenarios.map((scenario, idx) => (
                  <div key={idx} className="slice-scenario">
                    <div className="slice-scenario-content">
                      {scenario.given.length > 0 && (
                        <div className="slice-scenario-group">
                          <span className="slice-scenario-keyword">Given</span>
                          <div className="slice-scenario-nodes">
                            {scenario.given.map((g, gi) => (
                              <span key={gi} className={`mini-postit-inline mini-postit-inline--${nodeKindToCss(g)}`}>
                                {getNodeLabel(g)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="slice-scenario-group">
                        <span className="slice-scenario-keyword">When</span>
                        <div className="slice-scenario-nodes">
                          <span className={`mini-postit-inline mini-postit-inline--${nodeKindToCss(scenario.when)}`}>
                            {getNodeLabel(scenario.when)}
                          </span>
                        </div>
                      </div>
                      {scenario.then.length > 0 && (
                        <div className="slice-scenario-group">
                          <span className="slice-scenario-keyword">Then</span>
                          <div className="slice-scenario-nodes">
                            {scenario.then.map((t, ti) => (
                              <span key={ti} className={`mini-postit-inline mini-postit-inline--${nodeKindToCss(t)}`}>
                                {getNodeLabel(t)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="slice-action-btn slice-action-btn--delete"
                      onClick={() => removeScenarioFromSlice(entry.id, idx)}
                      title="Remove scenario"
                      aria-label="Remove scenario"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <button
                  className="slice-add-scenario-btn"
                  onClick={() => setScenarioDialogSliceId(entry.id)}
                  aria-label="Add scenario"
                >
                  ＋ Add Scenario
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="slice-add-hint">
        Alt+click on the grid to select 1 or 2 columns and create a slice
      </div>

      {scenarioDialogSliceId && (
        <ScenarioDialog
          onConfirm={handleScenarioConfirm}
          onClose={() => setScenarioDialogSliceId(null)}
        />
      )}
    </aside>
  );
}
