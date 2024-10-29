import { ModuleData, InputType } from "../../types/moduleTypes";

export const powerModules: ModuleData[] = [
  {
    title: "Power B70 - Energy Mixer",
    inputs: [
      {
        label: "Mixing Energy",
        value: 0,
        unit: "W/m³",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
    ],
    formula: "P_{B70} = \\frac{V_{B68} \\cdot E_{mixing}}{1000}",
  },
  {
    title: "Power Calculation for Balance Tank (N46)",
    inputs: [
      {
        label: "Tank Size (F51)",
        value: 1,
        type: InputType.FREQUENT,
        validation: { min: 1, max: 5 },
      }
    ],
    formula: "P = LOOKUP(F51, PowerTable)",
  },
  {
    title: "Unit Comparison",
    inputs: [
      {
        label: "First Value (V44)",
        value: 0,
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Second Value (V46)",
        value: 0,
        type: InputType.FREQUENT,
        validation: { min: 0 },
      }
    ],
    formula: "Result = \\max(X_{43}, Z_{43}) \\quad \\text{where} \\quad X_{43} = XLOOKUP(V_{44}) \\quad \\text{and} \\quad Z_{43} = XLOOKUP(V_{46})",
  },
];