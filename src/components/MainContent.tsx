import React from "react";
import Module from "./organisms/Module";
import AddModule from "./AddModule";
import { dummyModules } from "../constants/dummyData";

interface MainContentProps {
  isFormulaView: boolean;
  selectedPhase: string;
}

const phaseModules = {
  "Filter": ["Feed Pump", "Level Control (LC)", "NTF Value Finder"],
  "Pre-treatment": [
    "Feed Pump (Specs)",
    "Feed Pump (Civil)",
    "Mixer (Specs -- N46)",
    "Level Control (LC)"
  ],
  "Bio": [
    "Feed Pump (Civil -- B68)",
    "Power B70 - Energy Mixer",
    "Feed Pump (Specs)",
    "Level Control (LC)"
  ],
  "Polish": [],
  "Dewatering": []
};

const MainContent: React.FC<MainContentProps> = ({ isFormulaView, selectedPhase }) => {
  const filteredModules = dummyModules.filter(module => 
    phaseModules[selectedPhase as keyof typeof phaseModules].includes(module.title)
  );

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Equipment Modules</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 auto-rows-auto">
        {filteredModules.map((module, index) => (
          <Module
            key={index}
            moduleIndex={dummyModules.indexOf(module)}
            title={module.title}
            inputs={module.inputs}
            formula={module.formula}
            isFormulaView={isFormulaView}
          />
        ))}
        <AddModule />
      </div>
    </main>
  );
};

export default MainContent;