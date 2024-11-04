import React from "react";
import { CalculationObserver } from "../../core/CalculationObserver";

interface InputValues {
  flowRate: number;
  head: number;
  efficiency: number;
}

const FeedPumpModule: React.FC = () => {
  const [inputs, setInputs] = React.useState<InputValues>({
    flowRate: 0,
    head: 0,
    efficiency: 0.7,
  });

  const handleInputChange = (field: keyof InputValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    CalculationObserver.setInputs("feed-pump", newInputs);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Feed Pump</h3>
      <div className="space-y-4">
        <InputField
          label="Flow rate (Q)"
          value={inputs.flowRate}
          onChange={handleInputChange("flowRate")}
          unit="m³/h"
        />
        <InputField
          label="Head (H)"
          value={inputs.head}
          onChange={handleInputChange("head")}
          unit="m"
        />
        <InputField
          label="Efficiency (η)"
          value={inputs.efficiency}
          onChange={handleInputChange("efficiency")}
          step="0.1"
          min="0"
          max="1"
        />
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  step?: string;
  min?: string;
  max?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  unit,
  ...props
}) => (
  <div className="flex items-center">
    <label className="w-32">{label}:</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-32"
      {...props}
    />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

export default FeedPumpModule; 