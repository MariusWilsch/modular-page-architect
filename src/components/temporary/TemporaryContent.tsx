import React from "react";
import { CalculationObserver } from "../../core/CalculationObserver";
import { CalculationRegistry } from "../../core/CalculationRegistry";
import { CalculationFactory } from "../../core/CalculationFactory";
import { feedPumpDefinition } from "../../core/moduleRegistry";
import GenericModule from "./GenericModule";
import { FeedPumpCalculation } from "../../core/calculations/FeedPumpCalculation";

interface Results {
  power: number;
  flow: number;
  energy: number;
}

const TemporaryContent: React.FC = () => {
  const [results, setResults] = React.useState<Results>({
    power: 0,
    flow: 0,
    energy: 0,
  });

  React.useEffect(() => {
    // Register calculation type first
    CalculationFactory.register("feed-pump", FeedPumpCalculation);

    // Then register module
    CalculationRegistry.registerModule(feedPumpDefinition);

    // Create result display handler
    const handleCalculation = () => {
      const power = CalculationObserver.getResult(feedPumpDefinition.id);
      setResults({
        power,
        flow: power * 0.8, // Example calculation
        energy: power * 24,
      });
    };

    // Subscribe to feed pump changes
    CalculationObserver.subscribe("result-display", [feedPumpDefinition.id]);
    handleCalculation();

    return () => {
      CalculationObserver.unregisterModule(feedPumpDefinition.id);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Feed Pump Calculation</h2>
        <GenericModule definition={feedPumpDefinition} />
      </div>
      <ResultsPanel results={results} />
    </div>
  );
};

// Separate Results Panel Component
const ResultsPanel: React.FC<{ results: Results }> = ({ results }) => (
  <div className="w-64 bg-gray-50 p-6 border-l">
    <div className="space-y-6">
      <ResultItem label="Installed Power" value={results.power} unit="kW" />
      <ResultItem label="Total Flow" value={results.flow} unit="m³/h" />
      <ResultItem
        label="Energy Consumption"
        value={results.energy}
        unit="kWh/day"
      />
    </div>
  </div>
);

const ResultItem: React.FC<{ label: string; value: number; unit: string }> = ({
  label,
  value,
  unit,
}) => (
  <div>
    <h3 className="font-semibold mb-2">{label}</h3>
    <p className="text-xl">
      {value.toFixed(2)} {unit}
    </p>
  </div>
);

export default TemporaryContent;
