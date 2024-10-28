import { ModuleData, InputType } from "../types/moduleTypes";

export const globalConstants = [
  { label: "Water Density (ρ)", value: 1000, unit: "kg/m³" },
  { label: "Gravity (g)", value: 9.81, unit: "m/s²" },
];

// Lookup table for power calculations
export const powerLookupTable = [
  { id: 1, power: 0.75 },
  { id: 2, power: 1.1 },
  { id: 3, power: 1.5 },
  { id: 4, power: 2.2 },
  { id: 5, power: 3.0 },
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
    title: "Volume Calculator (B68)",
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
  },
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
    title: "Buffer Tank Size Calculator (N43)",
    inputs: [
      {
        label: "Running Hours Water Treatment After BT (F54)",
        value: 0,
        unit: "h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Incoming Water Hours (F44)",
        value: 0,
        unit: "h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Flow (F43)",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Minimal Residence Time (F46)",
        value: 0,
        unit: "h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Flow (F42)",
        value: 0,
        unit: "m³/h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Running Hours Water Treatment After BT (F45)",
        value: 0,
        unit: "h",
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
      {
        label: "Netto/Bruto (F49)",
        value: 0,
        type: InputType.FREQUENT,
        validation: { min: 0 },
      },
    ],
    formula: "I = \\frac{X}{Y} \\quad \\text{where} \\quad X = \\begin{cases} C \\cdot D & \\text{if } (A - B) < 3 \\\\ \\frac{E}{F} \\cdot (F - B) & \\text{otherwise} \\end{cases}",
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
];
