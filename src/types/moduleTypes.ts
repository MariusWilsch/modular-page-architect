export enum InputType {
  FREQUENT = "FREQUENT",
  RARE = "RARE",
}

export interface Input {
  label: string;
  value: string | number;
  unit?: string;
  type: InputType;
  validation?: {
    min?: number;
    max?: number;
  };
  description?: string;
}

export interface ModuleData {
  title: string;
  inputs: Input[];
  formula: string;
}

export interface CalculatorResults {
  installedPower: number;
  totalFlow: number;
  energyConsumption: number;
  selectedNTFModel: string;
  ntfUtilizationRate: number | null;
  energyMixerPower: number;
  selectorVolume: number;
  bufferTankSize: number;
  balanceTankPower: number;
  comparisonResult: number | null;
}