import { useCallback, useMemo } from 'react';
import { useSelectedNode, useNodeProperties, useBoardActions, type NodeProperties } from '../../../core/store/useBoardStore';
import { createDefaultNodeProperties } from '../../../core/domain/node/NodeProperties';
import { KeyValueEditor } from './KeyValueEditor';
import { StringListEditor } from './StringListEditor';

const NODE_TYPE_LABELS: Record<string, string> = {
  domainEvent: '🟠 Domain Event',
  command: '🔵 Command',
  readModel: '🟢 Read Model',
  policy: '🟣 Policy',
  uiScreen: '🟡 UI Screen',
};

export function PropertiesPanel() {
  const selectedNode = useSelectedNode();
  const allNodeProperties = useNodeProperties();
  const { deselectNode, updateNodeProperties, updateLabel } = useBoardActions();

  const properties = useMemo(() => {
    if (!selectedNode) return null;
    return allNodeProperties[selectedNode.id] ?? createDefaultNodeProperties(selectedNode.type);
  }, [selectedNode, allNodeProperties]);

  const handleUpdate = useCallback(
    (partial: Partial<NodeProperties>) => {
      if (!selectedNode || !properties) return;
      updateNodeProperties(selectedNode.id, { ...properties, ...partial } as NodeProperties);
    },
    [selectedNode, properties, updateNodeProperties]
  );

  const handleLabelChange = useCallback(
    (newLabel: string) => {
      if (!selectedNode) return;
      updateLabel(selectedNode.id, newLabel);
    },
    [selectedNode, updateLabel]
  );

  if (!selectedNode || !properties) return null;

  return (
    <aside className="properties-panel" aria-label="Node properties">
      <div className="properties-panel-header">
        <span className="properties-panel-type">{NODE_TYPE_LABELS[selectedNode.type] ?? selectedNode.type}</span>
        <button
          className="properties-panel-close"
          onClick={deselectNode}
          title="Close panel"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      <div className="properties-panel-body">
        <label className="properties-field">
          <span className="properties-field-label">Name</span>
          <input
            className="properties-field-input"
            type="text"
            value={selectedNode.label}
            onChange={(e) => handleLabelChange(e.target.value)}
          />
        </label>

        {properties.type === 'domainEvent' && (
          <DomainEventFields
            data={properties.data}
            onChange={(data) => handleUpdate({ data })}
          />
        )}

        {properties.type === 'command' && (
          <CommandFields
            actor={properties.actor}
            payload={properties.payload}
            guardConditions={properties.guardConditions}
            onActorChange={(actor) => handleUpdate({ actor })}
            onPayloadChange={(payload) => handleUpdate({ payload })}
            onGuardConditionsChange={(guardConditions) => handleUpdate({ guardConditions })}
          />
        )}

        {properties.type === 'readModel' && (
          <ReadModelFields
            consumedBy={properties.consumedBy}
            data={properties.data}
            onConsumedByChange={(consumedBy) => handleUpdate({ consumedBy })}
            onDataChange={(data) => handleUpdate({ data })}
          />
        )}

        {properties.type === 'policy' && (
          <PolicyFields
            condition={properties.condition}
            onConditionChange={(condition) => handleUpdate({ condition })}
          />
        )}

        {properties.type === 'uiScreen' && (
          <UIScreenFields
            description={properties.description}
            onDescriptionChange={(description) => handleUpdate({ description })}
          />
        )}
      </div>
    </aside>
  );
}

function DomainEventFields({ data, onChange }: { data: Record<string, string>; onChange: (data: Record<string, string>) => void }) {
  return (
    <div className="properties-section">
      <span className="properties-section-title">Data Schema</span>
      <KeyValueEditor entries={data} onChange={onChange} keyPlaceholder="field" valuePlaceholder="type" />
    </div>
  );
}

function CommandFields({
  actor,
  payload,
  guardConditions,
  onActorChange,
  onPayloadChange,
  onGuardConditionsChange,
}: {
  actor: string;
  payload: Record<string, string>;
  guardConditions: string[];
  onActorChange: (actor: string) => void;
  onPayloadChange: (payload: Record<string, string>) => void;
  onGuardConditionsChange: (guardConditions: string[]) => void;
}) {
  return (
    <>
      <label className="properties-field">
        <span className="properties-field-label">Actor</span>
        <input
          className="properties-field-input"
          type="text"
          value={actor}
          onChange={(e) => onActorChange(e.target.value)}
          placeholder="e.g. Customer"
        />
      </label>
      <div className="properties-section">
        <span className="properties-section-title">Payload</span>
        <KeyValueEditor entries={payload} onChange={onPayloadChange} keyPlaceholder="field" valuePlaceholder="type" />
      </div>
      <div className="properties-section">
        <span className="properties-section-title">Guard Conditions</span>
        <StringListEditor items={guardConditions} onChange={onGuardConditionsChange} placeholder="e.g. order must be valid" />
      </div>
    </>
  );
}

function ReadModelFields({
  consumedBy,
  data,
  onConsumedByChange,
  onDataChange,
}: {
  consumedBy: string;
  data: Record<string, string>;
  onConsumedByChange: (consumedBy: string) => void;
  onDataChange: (data: Record<string, string>) => void;
}) {
  return (
    <>
      <label className="properties-field">
        <span className="properties-field-label">Consumed by</span>
        <input
          className="properties-field-input"
          type="text"
          value={consumedBy}
          onChange={(e) => onConsumedByChange(e.target.value)}
          placeholder="e.g. Order Dashboard"
        />
      </label>
      <div className="properties-section">
        <span className="properties-section-title">Data Schema</span>
        <KeyValueEditor entries={data} onChange={onDataChange} keyPlaceholder="field" valuePlaceholder="type" />
      </div>
    </>
  );
}

function PolicyFields({
  condition,
  onConditionChange,
}: {
  condition: string;
  onConditionChange: (condition: string) => void;
}) {
  return (
    <label className="properties-field">
      <span className="properties-field-label">Condition</span>
      <textarea
        className="properties-field-textarea"
        value={condition}
        onChange={(e) => onConditionChange(e.target.value)}
        placeholder="e.g. order.total > 100"
        rows={3}
      />
    </label>
  );
}

function UIScreenFields({
  description,
  onDescriptionChange,
}: {
  description: string;
  onDescriptionChange: (description: string) => void;
}) {
  return (
    <label className="properties-field">
      <span className="properties-field-label">Description</span>
      <textarea
        className="properties-field-textarea"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Describe the screen..."
        rows={3}
      />
    </label>
  );
}
