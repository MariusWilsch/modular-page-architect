import React from 'react';
import Module from './organisms/Module';
import AddModule from './AddModule';

interface MainContentProps {
  isFormulaView: boolean;
}

const dummyModules = [
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

const MainContent: React.FC<MainContentProps> = ({ isFormulaView }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Equipment Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyModules.map((module, index) => (
          <Module
            key={index}
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