export interface BoardProjection {
  onDomainEventNode(
    id: string,
    label: string,
    column: number,
    row: number,
    boundedContextId: string | undefined
  ): void;
  onCommandNode(id: string, label: string, column: number, row: number): void;
  onReadModelNode(id: string, label: string, column: number, row: number): void;
  onPolicyNode(id: string, label: string, column: number, row: number): void;
  onUIScreenNode(id: string, label: string, column: number, row: number): void;
}
