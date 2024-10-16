export interface Input {
  label: string;
  value: string | number;
  unit?: string;
}

export interface ModuleData {
  title: string;
  inputs: Input[];
  formula: string;
}