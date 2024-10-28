import React from "react";
import { useSelector } from "react-redux";
import CalculationItem from "./CalculationItem";
import { selectResults } from "../store/calculatorSlice";
import NTFResults from "./NTFResults";
import { CalculatorResults } from "../types/moduleTypes";

const RightSidebar: React.FC = () => {
  const results = useSelector(selectResults) as CalculatorResults;

  const calculations = [
    { label: "Installed Power", value: results.installedPower, unit: "kW" },
    { label: "Total Flow", value: results.totalFlow, unit: "m³/h" },
    {
      label: "Energy Consumption",
      value: results.energyConsumption,
      unit: "kWh/day",
    },
    {
      label: "Energy Mixer Power",
      value: results.energyMixerPower,
      unit: "kW",
    },
    {
      label: "Selector Volume",
      value: results.selectorVolume,
      unit: "m³",
    },
    {
      label: "Buffer Tank Size",
      value: results.bufferTankSize,
      unit: "m³",
    },
  ];

  return (
    <aside className="w-64 bg-green-50 p-4 overflow-y-auto border-l border-green-200">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Real-time Calculations</h2>
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