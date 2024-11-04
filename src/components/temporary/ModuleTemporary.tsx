import React from "react";
import { CalculationObserver } from "../../core/CalculationObserver";

interface InputValues {
  flowRate: number;
  head: number;
  efficiency: number;
}

const ModuleTemporary: React.FC = () => {
  const [inputs, setInputs] = React.useState<InputValues>({
    flowRate: 0,
    head: 0,
    efficiency: 0.7,
  });

  const handleInputChange = (field: keyof InputValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setInputs((prev) => ({ ...prev, [field]: value }));
    
    // Trigger calculation with new inputs
    CalculationObserver.setInputs("feed-pump", {
      flowRate: field === "flowRate" ? value : inputs.flowRate,
      head: field === "head" ? value : inputs.head,
      efficiency: field === "efficiency" ? value : inputs.efficiency,
    });
    CalculationObserver.notify("feed-pump");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Feed Pump</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-32">Flow rate (Q):</label>
          <input
            type="number"
            value={inputs.flowRate}
            onChange={handleInputChange("flowRate")}
            className="border rounded px-3 py-2 w-32"
            placeholder="m³/h"
          />
          <span className="ml-2">m³/h</span>
        </div>
        <div className="flex items-center">
          <label className="w-32">Head (H):</label>
          <input
            type="number"
            value={inputs.head}
            onChange={handleInputChange("head")}
            className="border rounded px-3 py-2 w-32"
            placeholder="m"
          />
          <span className="ml-2">m</span>
        </div>
        <div className="flex items-center">
          <label className="w-32">Efficiency (η):</label>
          <input
            type="number"
            value={inputs.efficiency}
            onChange={handleInputChange("efficiency")}
            className="border rounded px-3 py-2 w-32"
            step="0.1"
            min="0"
            max="1"
          />
        </div>
      </div>
    </div>
  );
};

export default ModuleTemporary; 