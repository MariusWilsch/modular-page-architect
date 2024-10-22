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
      {
        label: "Flow Rate",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
    ],
    advancedInputs: [
      {
        label: "Peak Factor",
        value: 0,
        type: InputType.RARE,
        validation: { min: 1 },
      },
    ],
    formula: "X = \\frac{\\text{Flow Rate}}{\\text{Peak Factor}}\\quad \\text{\n} \\quad Y = X \\leq (\\text{list of values})",
  }
];