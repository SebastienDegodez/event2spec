import { useCallback, useMemo, useState } from 'react';
import { useBoard } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';

interface NodeEntry {
  id: string;
  label: string;
  kind: 'command' | 'domainEvent' | 'readModel';
}

interface ScenarioDialogProps {
  onConfirm: (given: string[], when: string, then: string[]) => void;
  onClose: () => void;
}

export function ScenarioDialog({ onConfirm, onClose }: ScenarioDialogProps) {
  const board = useBoard();

  const [givenIds, setGivenIds] = useState<string[]>([]);
  const [whenId, setWhenId] = useState('');
  const [thenIds, setThenIds] = useState<string[]>([]);

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

  const eventNodes = useMemo(() => availableNodes.filter((n) => n.kind === 'domainEvent'), [availableNodes]);
  const commandNodes = useMemo(() => availableNodes.filter((n) => n.kind === 'command'), [availableNodes]);

  const getNode = useCallback((nodeId: string) => availableNodes.find((n) => n.id === nodeId), [availableNodes]);

  const handleAddGiven = useCallback((nodeId: string) => {
    setGivenIds((prev) => [...prev, nodeId]);
  }, []);

  const handleRemoveGiven = useCallback((index: number) => {
    setGivenIds((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddThen = useCallback((nodeId: string) => {
    setThenIds((prev) => [...prev, nodeId]);
  }, []);

  const handleRemoveThen = useCallback((index: number) => {
    setThenIds((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleConfirm = useCallback(() => {
    if (!whenId) return;
    onConfirm(givenIds, whenId, thenIds);
  }, [givenIds, whenId, thenIds, onConfirm]);

  return (
    <div className="scenario-dialog-overlay" onClick={onClose}>
      <div className="scenario-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="scenario-dialog-header">
          <span className="scenario-dialog-title">🎬 New Scenario</span>
          <button className="scenario-dialog-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="scenario-dialog-body">
          {/* GIVEN section */}
          <div className="scenario-section">
            <div className="scenario-section-label">Given</div>
            <div className="scenario-section-desc">Select domain events as preconditions</div>
            <div className="scenario-picked-nodes">
              {givenIds.map((nodeId, idx) => {
                const node = getNode(nodeId);
                return (
                  <div key={idx} className="mini-postit mini-postit--event">
                    <span className="mini-postit-label">{node?.label ?? nodeId}</span>
                    <button className="mini-postit-remove" onClick={() => handleRemoveGiven(idx)} aria-label="Remove">×</button>
                  </div>
                );
              })}
            </div>
            <div className="scenario-node-picker">
              {eventNodes.map((n) => (
                <button
                  key={n.id}
                  className="scenario-pick-btn scenario-pick-btn--event"
                  onClick={() => handleAddGiven(n.id)}
                  title={`Add "${n.label}"`}
                >
                  ⚡ {n.label}
                </button>
              ))}
              {eventNodes.length === 0 && <div className="scenario-pick-empty">No domain events on the board</div>}
            </div>
          </div>

          {/* WHEN section */}
          <div className="scenario-section">
            <div className="scenario-section-label">When</div>
            <div className="scenario-section-desc">Select the command that triggers the action</div>
            {whenId ? (
              <div className="scenario-picked-nodes">
                <div className="mini-postit mini-postit--command">
                  <span className="mini-postit-label">{getNode(whenId)?.label ?? whenId}</span>
                  <button className="mini-postit-remove" onClick={() => setWhenId('')} aria-label="Remove">×</button>
                </div>
              </div>
            ) : (
              <div className="scenario-node-picker">
                {commandNodes.map((n) => (
                  <button
                    key={n.id}
                    className="scenario-pick-btn scenario-pick-btn--command"
                    onClick={() => setWhenId(n.id)}
                    title={`Select "${n.label}"`}
                  >
                    ⌘ {n.label}
                  </button>
                ))}
                {commandNodes.length === 0 && <div className="scenario-pick-empty">No commands on the board</div>}
              </div>
            )}
          </div>

          {/* THEN section */}
          <div className="scenario-section">
            <div className="scenario-section-label">Then</div>
            <div className="scenario-section-desc">Select domain events as expected results</div>
            <div className="scenario-picked-nodes">
              {thenIds.map((nodeId, idx) => {
                const node = getNode(nodeId);
                return (
                  <div key={idx} className="mini-postit mini-postit--event">
                    <span className="mini-postit-label">{node?.label ?? nodeId}</span>
                    <button className="mini-postit-remove" onClick={() => handleRemoveThen(idx)} aria-label="Remove">×</button>
                  </div>
                );
              })}
            </div>
            <div className="scenario-node-picker">
              {eventNodes.map((n) => (
                <button
                  key={n.id}
                  className="scenario-pick-btn scenario-pick-btn--event"
                  onClick={() => handleAddThen(n.id)}
                  title={`Add "${n.label}"`}
                >
                  ⚡ {n.label}
                </button>
              ))}
              {eventNodes.length === 0 && <div className="scenario-pick-empty">No domain events on the board</div>}
            </div>
          </div>
        </div>

        <div className="scenario-dialog-footer">
          <button className="scenario-dialog-btn" onClick={onClose}>Cancel</button>
          <button
            className="scenario-dialog-btn scenario-dialog-btn--confirm"
            onClick={handleConfirm}
            disabled={!whenId}
          >
            Add Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
