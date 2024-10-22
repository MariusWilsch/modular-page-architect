import React from "react";
import { useDispatch } from "react-redux";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  updateModuleInput,
  updateGlobalConstant,
  debouncedCalculateResults,
} from "../store/calculatorSlice";

interface InputFieldProps {
  label: string;
  value: string | number;
  unit?: string;
  moduleIndex?: number;
  inputIndex?: number;
  constantIndex?: number;
  className?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  unit,
  moduleIndex,
  inputIndex,
  constantIndex,
  className,
  onChange,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else if (moduleIndex !== undefined && inputIndex !== undefined) {
      dispatch(updateModuleInput({ moduleIndex, inputIndex, value: newValue }));
    } else if (constantIndex !== undefined) {
      dispatch(
        updateGlobalConstant({
          index: constantIndex,
          value: parseFloat(newValue),
        })
      );
    }
    debouncedCalculateResults(dispatch);
  };

  return (
    <div className={`grid w-full max-w-sm items-center gap-1.5 ${className}`}>
      <Label htmlFor={`input-${label}`}>{label}</Label>
      <div className="relative">
        <Input
          type="number"
          id={`input-${label}`}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pr-16"
        />
        {unit && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;