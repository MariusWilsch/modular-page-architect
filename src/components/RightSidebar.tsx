import React from "react";
import { useSelector } from "react-redux";
import CalculationItem from "./CalculationItem";
import { selectResults } from "../store/calculatorSlice";
import NTFResults from "./NTFResults";

const RightSidebar: React.FC = () => {
  const results = useSelector(selectResults);

  const calculations = [
    { label: "Installed Power", value: results.installedPower, unit: "kW" },
    { label: "Total Flow", value: results.totalFlow, unit: "m³/h" },
    {
      label: "Energy Consumption",
      value: results.energyConsumption,
      unit: "kWh/day",
    },
  ];

  return (
    <aside className="w-64 bg-slate-50 p-4 overflow-y-auto border-l border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Real-time Calculations</h2>
      <div className="space-y-4">
        <NTFResults />
        {calculations.map((calc, index) => (
          <CalculationItem key={index} {...calc} />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;