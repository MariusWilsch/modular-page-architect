import { ModuleData, InputType } from "../../types/moduleTypes";

export const basicModules: ModuleData[] = [
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
    title: "Feed Pump (Specs)",
    inputs: [
      { label: "Status", value: "To be defined", type: InputType.FREQUENT },
    ],
    formula: "To be defined",
  },
  {
    title: "Feed Pump (Civil)",
    inputs: [
      { label: "Status", value: "To be defined", type: InputType.FREQUENT },
    ],
    formula: "To be defined",
  },
  {
    title: "Level Control (LC)",
    inputs: [
      { label: "Type", value: "Not implemented yet", type: InputType.FREQUENT },
    ],
    formula: "To be defined",
  },
];
