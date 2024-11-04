import { ModuleData, InputType } from "../../types/moduleTypes";

export const calculationModules: ModuleData[] = [
  {
    title: "NTF Value Finder",
    inputs: [
      {
        label: "Flow Rate",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Peak Factor",
        value: 0,
        type: InputType.RARE,
        validation: { min: 1 },
      },
    ],
    formula:
      "X = \\frac{\\text{Flow Rate}}{\\text{Peak Factor}}\\quad \\text{\n} \\quad Y = X \\leq (\\text{list of values})",
  },
  {
    title: "Feed Pump (Civil -- B68)",
    inputs: [
      {
        label: "Time (B45)",
        value: 0,
        unit: "min",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Flow Return Sludge (B63)",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Influent Flow Bio (B53)",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Recycle Flow AT (B65)",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
    ],
    formula: "V_{B68} = \\frac{t_{B45}}{60} \\cdot (Q_{B63} + Q_{B53} + Q_{B65})",
  }
];