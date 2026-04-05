export interface BoardNodeVisitor {
  visitDomainEventNode(id: string, label: string, column: number, row: number): void;
  visitCommandNode(id: string, label: string, column: number, row: number): void;
  visitReadModelNode(id: string, label: string, column: number, row: number): void;
  visitPolicyNode(id: string, label: string, column: number, row: number): void;
  visitUIScreenNode(id: string, label: string, column: number, row: number): void;
}
