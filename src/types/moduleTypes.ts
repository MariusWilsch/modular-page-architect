export enum InputType {
  CONSTANT = 'constant',
  FREQUENT = 'frequent',
  RARE = 'rare',
}

export interface InputValidation {
  min?: number;
  max?: number;
}

export interface Input {
  label: string;
  value: string | number;
  unit?: string;
  type: InputType;
  validation?: InputValidation;
}

export interface ModuleData {
  title: string;
  inputs: Input[];
  advancedInputs?: Input[];
  formula: string;
}