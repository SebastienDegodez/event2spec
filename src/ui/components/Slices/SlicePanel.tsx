import { useCallback, useMemo, useState } from 'react';
import { useSlices, useSliceActions, useBoard, useLinks } from '../../../core/store/useBoardStore';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../../core/domain/VerticalSliceProjection';
import { type BoardProjection } from '../../../core/domain/BoardProjection';

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
}

export function SlicePanel() {
  const slices = useSlices();
  const board = useBoard();
  const links = useLinks();
  const { createSlice, renameSlice, deleteSlice, addScenarioToSlice, removeScenarioFromSlice } = useSliceActions();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCommandId, setNewCommandId] = useState('');
  const [newEventIds, setNewEventIds] = useState<string[]>([]);
  const [newReadModelId, setNewReadModelId] = useState('');
  const [expandedSlice, setExpandedSlice] = useState<string | null>(null);
  const [scenarioSliceId, setScenarioSliceId] = useState<string | null>(null);
  const [scenarioGiven, setScenarioGiven] = useState('');
  const [scenarioWhen, setScenarioWhen] = useState('');
  const [scenarioThen, setScenarioThen] = useState('');

  const entries = useMemo<SlicePanelEntry[]>(() => {
    const result: SlicePanelEntry[] = [];
    const projection: VerticalSliceProjection = {
      onSlice(id, name, commandId, eventIds, readModelId, scenarios) {
        result.push({ id, name, commandId, eventIds, readModelId, scenarios });
      },
    };
    slices.describeTo(projection);
    return result;
  }, [slices]);

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

  const commandNodes = useMemo(() => availableNodes.filter((n) => n.kind === 'command'), [availableNodes]);
  const eventNodes = useMemo(() => availableNodes.filter((n) => n.kind === 'domainEvent'), [availableNodes]);
  const readModelNodes = useMemo(() => availableNodes.filter((n) => n.kind === 'readModel'), [availableNodes]);

  const autoDetectedEvents = useMemo(() => {
    if (!newCommandId) return [];
    return links
      .filter((l) => l.sourceNodeId === newCommandId && l.connectionType === 'triggers')
      .map((l) => l.targetNodeId);
  }, [newCommandId, links]);

  const handleCreate = useCallback(() => {
    if (!newName.trim() || !newCommandId) return;
    const eventIds = newEventIds.length > 0 ? newEventIds : autoDetectedEvents;
    const id = `slice-${crypto.randomUUID()}`;
    createSlice(id, newName.trim(), newCommandId, eventIds, newReadModelId);
    setNewName('');
    setNewCommandId('');
    setNewEventIds([]);
    setNewReadModelId('');
    setShowCreateForm(false);
  }, [newName, newCommandId, newEventIds, newReadModelId, autoDetectedEvents, createSlice]);

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

  const handleAddScenario = useCallback(() => {
    if (!scenarioSliceId || !scenarioWhen.trim()) return;
    const given = scenarioGiven.split('\n').map((s) => s.trim()).filter(Boolean);
    const then = scenarioThen.split('\n').map((s) => s.trim()).filter(Boolean);
    addScenarioToSlice(scenarioSliceId, given, scenarioWhen.trim(), then);
    setScenarioGiven('');
    setScenarioWhen('');
    setScenarioThen('');
    setScenarioSliceId(null);
  }, [scenarioSliceId, scenarioGiven, scenarioWhen, scenarioThen, addScenarioToSlice]);

  const toggleEventId = useCallback((eventId: string) => {
    setNewEventIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  }, []);

  const getNodeLabel = useCallback((nodeId: string) => {
    const node = availableNodes.find((n) => n.id === nodeId);
    return node ? node.label : nodeId;
  }, [availableNodes]);

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
                      {scenario.given.map((g, gi) => (
                        <div key={gi} className="slice-scenario-line"><strong>Given</strong> {g}</div>
                      ))}
                      <div className="slice-scenario-line"><strong>When</strong> {scenario.when}</div>
                      {scenario.then.map((t, ti) => (
                        <div key={ti} className="slice-scenario-line"><strong>Then</strong> {t}</div>
                      ))}
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

                {scenarioSliceId === entry.id ? (
                  <div className="slice-scenario-form">
                    <textarea
                      className="slice-scenario-input"
                      placeholder="Given (one per line)"
                      value={scenarioGiven}
                      onChange={(e) => setScenarioGiven(e.target.value)}
                      rows={2}
                      aria-label="Scenario given"
                    />
                    <input
                      className="slice-scenario-input"
                      placeholder="When"
                      value={scenarioWhen}
                      onChange={(e) => setScenarioWhen(e.target.value)}
                      aria-label="Scenario when"
                    />
                    <textarea
                      className="slice-scenario-input"
                      placeholder="Then (one per line)"
                      value={scenarioThen}
                      onChange={(e) => setScenarioThen(e.target.value)}
                      rows={2}
                      aria-label="Scenario then"
                    />
                    <div className="slice-scenario-form-actions">
                      <button className="slice-form-btn slice-form-btn--add" onClick={handleAddScenario}>Add</button>
                      <button className="slice-form-btn" onClick={() => setScenarioSliceId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="slice-add-scenario-btn"
                    onClick={() => setScenarioSliceId(entry.id)}
                    aria-label="Add scenario"
                  >
                    ＋ Add Scenario
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {showCreateForm ? (
        <div className="slice-create-form">
          <input
            className="slice-form-input"
            placeholder="Slice name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
            aria-label="New slice name"
          />
          <select
            className="slice-form-select"
            value={newCommandId}
            onChange={(e) => setNewCommandId(e.target.value)}
            aria-label="Select command"
          >
            <option value="">Select command...</option>
            {commandNodes.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>

          <div className="slice-form-section">
            <div className="slice-form-label">Events:</div>
            {eventNodes.map((n) => (
              <label key={n.id} className="slice-form-checkbox">
                <input
                  type="checkbox"
                  checked={newEventIds.includes(n.id)}
                  onChange={() => toggleEventId(n.id)}
                />
                {n.label}
              </label>
            ))}
            {autoDetectedEvents.length > 0 && newEventIds.length === 0 && (
              <div className="slice-form-hint">Auto-detected: {autoDetectedEvents.length} event(s) from command links</div>
            )}
          </div>

          <select
            className="slice-form-select"
            value={newReadModelId}
            onChange={(e) => setNewReadModelId(e.target.value)}
            aria-label="Select read model"
          >
            <option value="">Select read model...</option>
            {readModelNodes.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>

          <div className="slice-form-actions">
            <button className="slice-form-btn slice-form-btn--add" onClick={handleCreate} disabled={!newName.trim() || !newCommandId}>Create</button>
            <button className="slice-form-btn" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          className="palette-item slice-add-btn"
          onClick={() => setShowCreateForm(true)}
          title="Add vertical slice"
          aria-label="Add vertical slice"
        >
          ＋ Add Slice
        </button>
      )}
    </aside>
  );
}
