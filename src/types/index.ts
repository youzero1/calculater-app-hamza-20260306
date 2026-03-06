export interface CalculationRecord {
  id: string;
  expression: string;
  result: string;
  isShared: boolean;
  shareId: string | null;
  createdAt: Date;
}

export interface CalculatorState {
  display: string;
  expression: string;
  operator: string | null;
  previousValue: string | null;
  waitingForOperand: boolean;
  justCalculated: boolean;
}
