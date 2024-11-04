export interface ModuleInput {
  label: string;
  value: number;
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface ModuleDefinition {
  id: string;
  title: string;
  inputs: ModuleInput[];
  calculationType: string;
  dependencies?: string[];
} 