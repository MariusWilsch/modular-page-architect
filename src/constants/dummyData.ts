import { ModuleData, InputType } from '../types/moduleTypes';

export const globalConstants = [
  { label: "Water Density (ρ)", value: 1000, unit: "kg/m³" },
  { label: "Gravity (g)", value: 9.81, unit: "m/s²" },
];

export const dummyModules: ModuleData[] = [
  {
    title: "Feed Pump",
    inputs: [
      {
        label: "Flow rate (Q)",
        value: 50,
        unit: "m³/h",
        type: InputType.FREQUENT,
      },
      { label: "Head (H)", value: 8, unit: "m", type: InputType.FREQUENT },
      { label: "Efficiency (η)", value: 0.7, type: InputType.RARE },
    ],
    formula: "P = \\frac{Q \\cdot H \\cdot \\rho \\cdot g}{3600 \\cdot \\eta}",
  },
  {
    title: "Level Control (LC)",
    inputs: [{ label: "Type", value: "Example here", type: InputType.FREQUENT }],
    formula: "To be defined",
  },
];

export const calculations = [
  { label: 'Installed Power', value: 75, unit: 'kW' },
  { label: 'Total Flow', value: 150, unit: 'm³/h' },
  { label: 'Energy Consumption', value: 1800, unit: 'kWh/day' },
];