import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CalculationItem from "./CalculationItem";
import { selectResults } from "../store/calculatorSlice";
import NTFResults from "./NTFResults";
import { CalculatorResults } from "../types/moduleTypes";
import { cn } from "@/lib/utils";

const RightSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    {
      label: "Balance Tank Power",
      value: results.balanceTankPower,
      unit: "kW",
    },
    {
      label: "Equipment Comparison Result",
      value: results.comparisonResult || 0,
      unit: "",
    },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "48px" : "256px",
        transition: { duration: 0.3 },
      }}
      className={cn(
        "bg-green-50 border-l border-green-200 relative h-full flex flex-col",
        isCollapsed ? "w-12" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute left-0 top-4 bg-green-100 p-2 rounded-r hover:bg-green-200 transition-colors"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="h-4 w-4 text-green-800" />
        </motion.div>
      </button>

      <div
        className={cn(
          "transition-opacity duration-300 flex-1 overflow-y-auto",
          isCollapsed ? "opacity-0" : "opacity-100 p-4"
        )}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Real-time Calculations
        </h2>
        <div className="space-y-4">
          <NTFResults />
          {calculations.map((calc, index) => (
            <CalculationItem key={index} {...calc} />
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default RightSidebar;
