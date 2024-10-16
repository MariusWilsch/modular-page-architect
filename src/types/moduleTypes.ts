export enum InputType {
  CONSTANT = 'constant',
  FREQUENT = 'frequent',
  RARE = 'rare',
}

export interface Input {
  label: string;
  value: string | number;
  unit?: string;
  type: InputType;
}

export interface ModuleData {
  title: string;
  inputs: Input[];
  formula: string;
}