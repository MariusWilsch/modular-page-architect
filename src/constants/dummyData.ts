import { ModuleData, InputType } from "../types/moduleTypes";

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
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
      },
      { label: "Head (H)", value: 0, unit: "m", type: InputType.FREQUENT },
      { label: "Efficiency (η)", value: 0.7, type: InputType.RARE },
    ],
    formula: "P = \\frac{Q \\cdot H \\cdot \\rho \\cdot g}{3600 \\cdot \\eta}",
  },
  {
    title: "Level Control (LC)",
    inputs: [
      { label: "Type", value: "Not implemented yet", type: InputType.FREQUENT },
    ],
    formula: "To be defined",
  },
  {
    title: "NTF Value Finder (NTF)",
    inputs: [
        { label: "A", value: 0, unit: "", type: InputType.FREQUENT },
        { label: "B", value: 0, unit: "", type: InputType.FREQUENT },
    ],
    formula: "X = \\frac{A}{b}\\quad \\text{\n} \\quad Y = X \\leq (\\text{list of values})",
  }
];
