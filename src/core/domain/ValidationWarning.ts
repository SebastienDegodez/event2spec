import { type NodeKind } from './NodeKind';
import { type ValidationWarningType } from './ValidationWarningType';

/** A completeness warning for a specific board node. */
export interface ValidationWarning {
  readonly nodeId: string;
  readonly nodeLabel: string;
  readonly nodeKind: NodeKind;
  readonly warningType: ValidationWarningType;
  readonly message: string;
}
