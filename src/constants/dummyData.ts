import { ModuleData } from '../types/moduleTypes';

export const dummyModules: ModuleData[] = [
  {
    title: "Feed Pump",
    inputs: [
      { label: "Flow rate (Q)", value: 50, unit: "m³/h" },
      { label: "Head (H)", value: 8, unit: "m" },
      { label: "Density (ρ)", value: 1000, unit: "kg/m³" },
      { label: "Gravity (g)", value: 9.81, unit: "m/s²" },
      { label: "Efficiency (η)", value: 0.7 },
    ],
    formula: "P = \\frac{Q \\cdot H \\cdot \\rho \\cdot g}{3600 \\cdot \\eta}",
  },
  {
    title: "Level Control (LC)",
    inputs: [
      { label: "Type", value: "Radar" },
      { label: "Range", value: "0-5", unit: "m" },
    ],
    formula: "h = h_0 + (Q_in - Q_out) * t / A",
  },
];

export const calculations = [
  { label: 'Installed Power', value: 75, unit: 'kW' },
  { label: 'Total Flow', value: 150, unit: 'm³/h' },
  { label: 'Energy Consumption', value: 1800, unit: 'kWh/day' },
];
