import React from "react";
import { ModuleDefinition } from "../../core/types/moduleTypes";
import { CalculationObserver } from "../../core/CalculationObserver";

interface GenericModuleProps {
  definition: ModuleDefinition;
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  unit,
  validation = {}
}) => (
  <div className="flex items-center">
    <label className="w-32">{label}:</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-32"
      step={validation.step}
      min={validation.min}
      max={validation.max}
    />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

const GenericModule: React.FC<GenericModuleProps> = ({ definition }) => {
  const [inputs, setInputs] = React.useState<Record<string, number>>(
    Object.fromEntries(
      definition.inputs.map((input) => [input.label, input.value])
    )
  );

  const handleInputChange =
    (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      const newInputs = { ...inputs, [label]: value };
      setInputs(newInputs);
      CalculationObserver.setInputs(definition.id, newInputs);
    };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{definition.title}</h3>
      <div className="space-y-4">
        {definition.inputs.map((input) => (
          <InputField
            key={input.label}
            label={input.label}
            value={inputs[input.label]}
            onChange={handleInputChange(input.label)}
            unit={input.unit}
            {...input.validation}
          />
        ))}
      </div>
    </div>
  );
};

export default GenericModule;
