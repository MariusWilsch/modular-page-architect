import React from "react";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import FormulaEditor from "../FormulaEditor";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { Input, InputType } from "../../types/moduleTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateModuleInput,
  debouncedCalculateResults,
} from "../../store/calculatorSlice";
import { RootState } from "../../store";

interface ModuleProps {
  title: string;
  inputs: Input[];
  advancedInputs?: Input[];
  formula: string;
  isFormulaView: boolean;
  moduleIndex: number;
}

const Module: React.FC<ModuleProps> = ({
  title,
  inputs,
  advancedInputs,
  formula,
  isFormulaView,
  moduleIndex,
}) => {
  const dispatch = useDispatch();
  const moduleInputs = useSelector(
    (state: RootState) => state.calculator.modules[moduleIndex].inputs
  );
  const moduleAdvancedInputs = useSelector(
    (state: RootState) => state.calculator.modules[moduleIndex].advancedInputs
  );

  const handleInputChange = (inputIndex: number, newValue: string, isAdvanced: boolean = false) => {
    const input = isAdvanced ? moduleAdvancedInputs[inputIndex] : moduleInputs[inputIndex];
    let parsedValue = parseFloat(newValue);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (input.validation) {
      if (input.validation.min !== undefined && parsedValue < input.validation.min) {
        parsedValue = input.validation.min;
      }
      if (input.validation.max !== undefined && parsedValue > input.validation.max) {
        parsedValue = input.validation.max;
      }
    }

    dispatch(updateModuleInput({ moduleIndex, inputIndex, value: parsedValue, isAdvanced }));
    debouncedCalculateResults(dispatch);
  };

  const frequentInputs = moduleInputs.filter(
    (input) => input.type === InputType.FREQUENT
  );
  const rareInputs = moduleInputs.filter(
    (input) => input.type === InputType.RARE
  );

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md relative flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      {isFormulaView && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className={`absolute top-4 right-4 p-2 transition-colors hover:bg-gray-200`}
              variant="ghost"
            >
              <Edit size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Edit Formula</SheetTitle>
              <SheetDescription>
                Modify existing formulas or create new ones using the options
                below.
              </SheetDescription>
            </SheetHeader>
            <FormulaEditor formula={formula} />
          </SheetContent>
        </Sheet>
      )}
      <div className="flex-grow flex flex-col">
        {isFormulaView ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <BlockMath math={formula} />
            <div className="mt-4 text-sm text-gray-600">
              {moduleInputs.map((input, index) => (
                <div key={index} className="mb-1">
                  <InlineMath
                    math={`${input.label} = ${input.value || 0}${
                      input.unit ? ` \\text{${input.unit}}` : ""
                    }`}
                  />
                </div>
              ))}
              {moduleAdvancedInputs && moduleAdvancedInputs.map((input, index) => (
                <div key={`advanced-${index}`} className="mb-1">
                  <InlineMath
                    math={`${input.label} = ${input.value || 0}${
                      input.unit ? ` \\text{${input.unit}}` : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex-grow">
            {frequentInputs.map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {input.label}
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-3 sm:text-lg border-gray-300 rounded-md bg-gray-50"
                    value={input.value}
                    onChange={(e) =>
                      handleInputChange(moduleInputs.indexOf(input), e.target.value)
                    }
                    min={input.validation?.min}
                    max={input.validation?.max}
                    step="any"
                  />
                  {input.unit && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 sm:text-lg">
                        {input.unit}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(rareInputs.length > 0 || (moduleAdvancedInputs && moduleAdvancedInputs.length > 0)) && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  Advanced Settings
                </h4>
                {rareInputs.map((input, index) => (
                  <div key={`rare-${index}`} className="text-sm text-gray-600 mb-1">
                    {input.label}: {input.value} {input.unit}
                  </div>
                ))}
                {moduleAdvancedInputs && moduleAdvancedInputs.map((input, index) => (
                  <div key={`advanced-${index}`} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {input.label}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                        value={input.value}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value, true)
                        }
                        min={input.validation?.min}
                        max={input.validation?.max}
                        step="any"
                      />
                      {input.unit && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">{input.unit}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;