export const dummyModules = [
  {
    title: "Feed Pump",
    inputs: [
      { label: "Power", value: 50, unit: "kW" },
      { label: "Flow", value: 100, unit: "m³/h" },
    ],
    formula: "P = ρ g Q H / η",
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