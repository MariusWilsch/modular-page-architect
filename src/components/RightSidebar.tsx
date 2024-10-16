import React from 'react';
import CalculationItem from './CalculationItem';

const calculations = [
  { label: 'Installed Power', value: 75, unit: 'kW' },
  { label: 'Total Flow', value: 150, unit: 'm³/h' },
  { label: 'Energy Consumption', value: 1800, unit: 'kWh/day' },
];

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Real-time Calculations</h2>
      <div className="space-y-4">
        {calculations.map((calc, index) => (
          <CalculationItem key={index} {...calc} />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;