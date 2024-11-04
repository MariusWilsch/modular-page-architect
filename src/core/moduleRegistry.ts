import { ModuleDefinition } from "./types/moduleTypes";

export const feedPumpDefinition: ModuleDefinition = {
  id: "feed-pump",
  title: "Feed Pump",
  calculationType: "feed-pump",
  inputs: [
    {
      label: "Flow rate (Q)",
      value: 0,
      unit: "m³/h",
      validation: { min: 0 },
    },
    {
      label: "Head (H)",
      value: 0,
      unit: "m",
      validation: { min: 0 },
    },
    {
      label: "Efficiency (η)",
      value: 0.7,
      validation: { min: 0, max: 1, step: 0.1 },
    },
  ],
};
