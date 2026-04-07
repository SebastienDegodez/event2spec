import { useCallback, useMemo, useState } from 'react';
import { useBoard, useLinks, useSlices, useSliceActions, useColumnSelectionActions } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../../core/domain/VerticalSliceProjection';

interface NodeEntry {
  id: string;
  label: string;
  column: number;
  kind: 'command' | 'domainEvent' | 'readModel';
}

interface ScenarioEditorState {
  givenIds: string[];
  whenId: string;
  thenIds: string[];
}

function emptyScenario(): ScenarioEditorState {
  return { givenIds: [], whenId: '', thenIds: [] };
}

interface SliceEditorViewProps {
  selectedColumns: number[];
}

export function SliceEditorView({ selectedColumns }: SliceEditorViewProps) {
  const board = useBoard();
  const links = useLinks();
  const slices = useSlices();
  const { createSlice, addScenarioToSlice, removeScenarioFromSlice, updateScenarioInSlice } = useSliceActions();
  const { clearColumnSelection } = useColumnSelectionActions();

  const [name, setName] = useState('');
  const [commandId, setCommandId] = useState('');
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [readModelId, setReadModelId] = useState('');

  const [newScenario, setNewScenario] = useState<ScenarioEditorState | null>(null);
  const [editingScenarioIndex, setEditingScenarioIndex] = useState<number | null>(null);
  const [editingScenario, setEditingScenario] = useState<ScenarioEditorState>(emptyScenario());

  // Collect all board nodes with their columns
  const allNodes = useMemo<NodeEntry[]>(() => {
    const result: NodeEntry[] = [];
    const projection: BoardProjection = {
      onCommandNode(id, label, column) { result.push({ id, label, column, kind: 'command' }); },
      onDomainEventNode(id, label, column) { result.push({ id, label, column, kind: 'domainEvent' }); },
      onReadModelNode(id, label, column) { result.push({ id, label, column, kind: 'readModel' }); },
      onPolicyNode() {},
      onUIScreenNode() {},
    };
    board.describeTo(projection);
    return result;
  }, [board]);

  // Auto-detect nodes in selected columns
  const nodesInColumns = useMemo(
    () => allNodes.filter((n) => selectedColumns.includes(n.column)),
    [allNodes, selectedColumns],
  );

  const detectedCommandId = useMemo(
    () => nodesInColumns.find((n) => n.kind === 'command')?.id ?? '',
    [nodesInColumns],
  );

  const detectedEventIds = useMemo(
    () => nodesInColumns.filter((n) => n.kind === 'domainEvent').map((n) => n.id),
    [nodesInColumns],
  );

  const detectedReadModelId = useMemo(
    () => nodesInColumns.find((n) => n.kind === 'readModel')?.id ?? '',
    [nodesInColumns],
  );

  // Auto-fill from detected columns when selection changes (only on first render or column change)
  const [lastColumns, setLastColumns] = useState<number[]>([]);
  if (
    selectedColumns.length > 0 &&
    (selectedColumns.length !== lastColumns.length || selectedColumns.some((c, i) => c !== lastColumns[i]))
  ) {
    setLastColumns(selectedColumns);
    setCommandId(detectedCommandId);
    setEventIds(detectedEventIds);
    setReadModelId(detectedReadModelId);
    setName('');
    setNewScenario(null);
    setEditingScenarioIndex(null);
  }

  // Auto-detect events from command links
  const autoLinkedEvents = useMemo(() => {
    if (!commandId) return [];
    return links
      .filter((l) => l.sourceNodeId === commandId && l.connectionType === 'triggers')
      .map((l) => l.targetNodeId);
  }, [commandId, links]);

  const resolvedEventIds = eventIds.length > 0 ? eventIds : autoLinkedEvents;

  const commandNodes = useMemo(() => allNodes.filter((n) => n.kind === 'command'), [allNodes]);
  const eventNodes = useMemo(() => allNodes.filter((n) => n.kind === 'domainEvent'), [allNodes]);
  const readModelNodes = useMemo(() => allNodes.filter((n) => n.kind === 'readModel'), [allNodes]);

  const getLabel = useCallback((id: string) => allNodes.find((n) => n.id === id)?.label ?? id, [allNodes]);

  const getKindCss = useCallback((id: string) => {
    const kind = allNodes.find((n) => n.id === id)?.kind;
    if (kind === 'domainEvent') return 'event';
    if (kind === 'command') return 'command';
    return 'default';
  }, [allNodes]);

  // Collect existing scenarios for the slice that would be created with this command
  // (only relevant in edit mode — here we collect all scenarios of matching slices)
  const existingSliceScenarios = useMemo<{ sliceId: string; scenarios: ReadonlyArray<ScenarioProjection> }[]>(() => {
    const result: { sliceId: string; scenarios: ReadonlyArray<ScenarioProjection> }[] = [];
    const projection: VerticalSliceProjection = {
      onSlice(id, _name, cmdId, _eventIds, _rmId, scenarios) {
        if (cmdId === commandId && commandId) {
          result.push({ sliceId: id, scenarios });
        }
      },
    };
    slices.describeTo(projection);
    return result;
  }, [slices, commandId]);

  const handleToggleEvent = useCallback((id: string) => {
    setEventIds((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  }, []);

  const handleCreate = useCallback(() => {
    if (!name.trim() || !commandId) return;
    const id = `slice-${crypto.randomUUID()}`;
    createSlice(id, name.trim(), commandId, resolvedEventIds, readModelId);
    setName('');
    clearColumnSelection();
  }, [name, commandId, resolvedEventIds, readModelId, createSlice, clearColumnSelection]);

  const handleAddScenarioToSlice = useCallback((sliceId: string) => {
    if (!newScenario || !newScenario.whenId) return;
    addScenarioToSlice(sliceId, newScenario.givenIds, newScenario.whenId, newScenario.thenIds);
    setNewScenario(null);
  }, [newScenario, addScenarioToSlice]);

  const handleStartEditScenario = useCallback((idx: number, scenario: ScenarioProjection) => {
    setEditingScenarioIndex(idx);
    setEditingScenario({
      givenIds: [...scenario.given],
      whenId: scenario.when,
      thenIds: [...scenario.then],
    });
  }, []);

  const handleSaveEditScenario = useCallback((sliceId: string) => {
    if (editingScenarioIndex === null || !editingScenario.whenId) return;
    updateScenarioInSlice(sliceId, editingScenarioIndex, editingScenario.givenIds, editingScenario.whenId, editingScenario.thenIds);
    setEditingScenarioIndex(null);
  }, [editingScenarioIndex, editingScenario, updateScenarioInSlice]);

  if (selectedColumns.length === 0) return null;

  return (
    <aside className="slice-editor-view" aria-label="Slice editor">
      <div className="slice-editor-header">
        <span className="slice-editor-title">🗂 New Slice</span>
        <button className="slice-editor-close" onClick={clearColumnSelection} aria-label="Close">×</button>
      </div>

      <div className="slice-editor-section">
        <div className="slice-editor-hint">
          Columns: {selectedColumns.sort((a, b) => a - b).join(', ')}
          {nodesInColumns.length > 0 && ` · ${nodesInColumns.length} node${nodesInColumns.length > 1 ? 's' : ''} detected`}
        </div>
      </div>

      <div className="slice-editor-section">
        <label className="slice-editor-label">Name</label>
        <input
          className="slice-editor-input"
          placeholder="Slice name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Slice name"
        />
      </div>

      <div className="slice-editor-section">
        <label className="slice-editor-label">Command</label>
        <select
          className="slice-editor-select"
          value={commandId}
          onChange={(e) => setCommandId(e.target.value)}
          aria-label="Select command"
        >
          <option value="">Select command…</option>
          {commandNodes.map((n) => (
            <option key={n.id} value={n.id}>{n.label}</option>
          ))}
        </select>
      </div>

      <div className="slice-editor-section">
        <label className="slice-editor-label">Events</label>
        {eventNodes.map((n) => (
          <label key={n.id} className="slice-editor-checkbox">
            <input
              type="checkbox"
              checked={resolvedEventIds.includes(n.id)}
              onChange={() => handleToggleEvent(n.id)}
            />
            {n.label}
          </label>
        ))}
        {autoLinkedEvents.length > 0 && eventIds.length === 0 && (
          <div className="slice-editor-hint">Auto-detected {autoLinkedEvents.length} event(s) from command links</div>
        )}
      </div>

      <div className="slice-editor-section">
        <label className="slice-editor-label">Read Model</label>
        <select
          className="slice-editor-select"
          value={readModelId}
          onChange={(e) => setReadModelId(e.target.value)}
          aria-label="Select read model"
        >
          <option value="">None</option>
          {readModelNodes.map((n) => (
            <option key={n.id} value={n.id}>{n.label}</option>
          ))}
        </select>
      </div>

      <div className="slice-editor-actions">
        <button
          className="slice-editor-btn slice-editor-btn--primary"
          onClick={handleCreate}
          disabled={!name.trim() || !commandId}
        >
          Create Slice
        </button>
        <button className="slice-editor-btn" onClick={clearColumnSelection}>Cancel</button>
      </div>

      {existingSliceScenarios.length > 0 && (
        <div className="slice-editor-section">
          <div className="slice-editor-label">Scenarios for existing slices with this command</div>
          {existingSliceScenarios.map(({ sliceId, scenarios }) => (
            <div key={sliceId} className="scenario-inline-editor">
              {scenarios.map((scenario, idx) => (
                <div key={idx} className="scenario-inline-item">
                  {editingScenarioIndex === idx ? (
                    <div className="scenario-inline-edit-form">
                      <ScenarioNodePicker
                        label="Given"
                        nodeIds={editingScenario.givenIds}
                        availableNodes={eventNodes}
                        onAdd={(id) => setEditingScenario((s) => ({ ...s, givenIds: [...s.givenIds, id] }))}
                        onRemove={(i) => setEditingScenario((s) => ({ ...s, givenIds: s.givenIds.filter((_, j) => j !== i) }))}
                        getLabel={getLabel}
                      />
                      <ScenarioWhenPicker
                        whenId={editingScenario.whenId}
                        commandNodes={commandNodes}
                        onSelect={(id) => setEditingScenario((s) => ({ ...s, whenId: id }))}
                        getLabel={getLabel}
                      />
                      <ScenarioNodePicker
                        label="Then"
                        nodeIds={editingScenario.thenIds}
                        availableNodes={eventNodes}
                        onAdd={(id) => setEditingScenario((s) => ({ ...s, thenIds: [...s.thenIds, id] }))}
                        onRemove={(i) => setEditingScenario((s) => ({ ...s, thenIds: s.thenIds.filter((_, j) => j !== i) }))}
                        getLabel={getLabel}
                      />
                      <div className="scenario-inline-actions">
                        <button className="slice-editor-btn slice-editor-btn--primary" onClick={() => handleSaveEditScenario(sliceId)} disabled={!editingScenario.whenId}>Save</button>
                        <button className="slice-editor-btn" onClick={() => setEditingScenarioIndex(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="scenario-inline-display">
                      {scenario.given.length > 0 && (
                        <div className="scenario-inline-row">
                          <span className="slice-scenario-keyword">Given</span>
                          {scenario.given.map((g, gi) => (
                            <span key={gi} className={`mini-postit-inline mini-postit-inline--${getKindCss(g)}`}>{getLabel(g)}</span>
                          ))}
                        </div>
                      )}
                      <div className="scenario-inline-row">
                        <span className="slice-scenario-keyword">When</span>
                        <span className={`mini-postit-inline mini-postit-inline--${getKindCss(scenario.when)}`}>{getLabel(scenario.when)}</span>
                      </div>
                      {scenario.then.length > 0 && (
                        <div className="scenario-inline-row">
                          <span className="slice-scenario-keyword">Then</span>
                          {scenario.then.map((t, ti) => (
                            <span key={ti} className={`mini-postit-inline mini-postit-inline--${getKindCss(t)}`}>{getLabel(t)}</span>
                          ))}
                        </div>
                      )}
                      <div className="scenario-inline-btns">
                        <button className="slice-action-btn" onClick={() => handleStartEditScenario(idx, scenario)} title="Edit" aria-label="Edit scenario">✏️</button>
                        <button className="slice-action-btn slice-action-btn--delete" onClick={() => removeScenarioFromSlice(sliceId, idx)} title="Remove" aria-label="Remove scenario">×</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {newScenario ? (
                <div className="scenario-inline-edit-form">
                  <ScenarioNodePicker
                    label="Given"
                    nodeIds={newScenario.givenIds}
                    availableNodes={eventNodes}
                    onAdd={(id) => setNewScenario((s) => s ? { ...s, givenIds: [...s.givenIds, id] } : s)}
                    onRemove={(i) => setNewScenario((s) => s ? { ...s, givenIds: s.givenIds.filter((_, j) => j !== i) } : s)}
                    getLabel={getLabel}
                  />
                  <ScenarioWhenPicker
                    whenId={newScenario.whenId}
                    commandNodes={commandNodes}
                    onSelect={(id) => setNewScenario((s) => s ? { ...s, whenId: id } : s)}
                    getLabel={getLabel}
                  />
                  <ScenarioNodePicker
                    label="Then"
                    nodeIds={newScenario.thenIds}
                    availableNodes={eventNodes}
                    onAdd={(id) => setNewScenario((s) => s ? { ...s, thenIds: [...s.thenIds, id] } : s)}
                    onRemove={(i) => setNewScenario((s) => s ? { ...s, thenIds: s.thenIds.filter((_, j) => j !== i) } : s)}
                    getLabel={getLabel}
                  />
                  <div className="scenario-inline-actions">
                    <button className="slice-editor-btn slice-editor-btn--primary" onClick={() => handleAddScenarioToSlice(sliceId)} disabled={!newScenario.whenId}>Add</button>
                    <button className="slice-editor-btn" onClick={() => setNewScenario(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className="slice-add-scenario-btn" onClick={() => setNewScenario(emptyScenario())} aria-label="Add scenario">
                  ＋ Add Scenario
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

interface ScenarioNodePickerProps {
  label: string;
  nodeIds: string[];
  availableNodes: NodeEntry[];
  onAdd: (id: string) => void;
  onRemove: (index: number) => void;
  getLabel: (id: string) => string;
}

function ScenarioNodePicker({ label, nodeIds, availableNodes, onAdd, onRemove, getLabel }: ScenarioNodePickerProps) {
  return (
    <div className="scenario-section">
      <div className="scenario-section-label">{label}</div>
      <div className="scenario-picked-nodes">
        {nodeIds.map((id, idx) => (
          <div key={idx} className="mini-postit mini-postit--event">
            <span className="mini-postit-label">{getLabel(id)}</span>
            <button className="mini-postit-remove" onClick={() => onRemove(idx)} aria-label="Remove">×</button>
          </div>
        ))}
      </div>
      <div className="scenario-node-picker">
        {availableNodes.map((n) => (
          <button key={n.id} className="scenario-pick-btn scenario-pick-btn--event" onClick={() => onAdd(n.id)}>
            ⚡ {n.label}
          </button>
        ))}
        {availableNodes.length === 0 && <div className="scenario-pick-empty">No domain events on the board</div>}
      </div>
    </div>
  );
}

interface ScenarioWhenPickerProps {
  whenId: string;
  commandNodes: NodeEntry[];
  onSelect: (id: string) => void;
  getLabel: (id: string) => string;
}

function ScenarioWhenPicker({ whenId, commandNodes, onSelect, getLabel }: ScenarioWhenPickerProps) {
  return (
    <div className="scenario-section">
      <div className="scenario-section-label">When</div>
      {whenId ? (
        <div className="scenario-picked-nodes">
          <div className="mini-postit mini-postit--command">
            <span className="mini-postit-label">{getLabel(whenId)}</span>
            <button className="mini-postit-remove" onClick={() => onSelect('')} aria-label="Remove">×</button>
          </div>
        </div>
      ) : (
        <div className="scenario-node-picker">
          {commandNodes.map((n) => (
            <button key={n.id} className="scenario-pick-btn scenario-pick-btn--command" onClick={() => onSelect(n.id)}>
              ⌘ {n.label}
            </button>
          ))}
          {commandNodes.length === 0 && <div className="scenario-pick-empty">No commands on the board</div>}
        </div>
      )}
    </div>
  );
}
