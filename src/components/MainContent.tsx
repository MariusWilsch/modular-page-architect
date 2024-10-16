import React from 'react';
import Module from './Module';
import AddModule from './AddModule';

const dummyModules = [
  {
    title: "Feed Pump",
    inputs: [
      { label: "Power", value: 50, unit: "kW" },
      { label: "Flow", value: 100, unit: "m³/h" },
    ],
  },
  {
    title: "Level Control (LC)",
    inputs: [
      { label: "Type", value: "Radar" },
      { label: "Range", value: "0-5", unit: "m" },
    ],
  },
];

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Equipment Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyModules.map((module, index) => (
          <Module key={index} title={module.title} inputs={module.inputs} />
        ))}
        <AddModule />
      </div>
    </main>
  );
};

export default MainContent;