import { ModuleData } from "../types/moduleTypes";
import { dummyModules } from "./dummyData";

export type PhaseConfig = {
  title: string;
  modules: string[];
};

export const PHASES: PhaseConfig[] = [
  {
    title: "Filter",
    modules: [
      "Feed Pump",
      "Level Control (LC)",
      "NTF Value Finder"
    ]
  },
  {
    title: "Pre-treatment",
    modules: [
      "Feed Pump (Specs)",
      "Feed Pump (Civil)",
      "Mixer (Specs -- N46)",
      "Level Control (LC)"
    ]
  },
  {
    title: "Bio",
    modules: [
      "Feed Pump (Civil -- B68)",
      "Power B70 - Energy Mixer",
      "Feed Pump (Specs)",
      "Level Control (LC)"
    ]
  },
  {
    title: "Polish",
    modules: []
  },
  {
    title: "Dewatering",
    modules: []
  }
];

export const getModulesForPhase = (phase: string, allModules: ModuleData[]): ModuleData[] => {
  const phaseConfig = PHASES.find(p => p.title === phase);
  if (!phaseConfig) return [];
  
  return allModules.filter(module => 
    phaseConfig.modules.includes(module.title)
  ).sort((a, b) => {
    const indexA = phaseConfig.modules.indexOf(a.title);
    const indexB = phaseConfig.modules.indexOf(b.title);
    return indexA - indexB;
  });
};