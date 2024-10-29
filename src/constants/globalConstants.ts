export const globalConstants = [
  { label: "Water Density (ρ)", value: 1000, unit: "kg/m³" },
  { label: "Gravity (g)", value: 9.81, unit: "m/s²" },
];

export const powerLookupTable = [
  { id: 1, power: 0.75 },
  { id: 2, power: 1.1 },
  { id: 3, power: 1.5 },
  { id: 4, power: 2.2 },
  { id: 5, power: 3.0 },
];

export const comparisonLookupTables = {
  table1: {
    lookupArray: [], // AM111:AM121
    returnArray: [], // AJ111:AJ121
    description: "Please input comma-separated values for the first lookup table (AM111:AM121 and AJ111:AJ121)"
  },
  table2: {
    lookupArray: [], // AN111:AN121
    returnArray: [], // AJ111:AJ121 (same as table1)
    description: "Please input comma-separated values for the second lookup table (AN111:AN121)"
  }
};