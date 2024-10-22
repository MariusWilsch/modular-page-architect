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
import InputField from "../InputField";

interface ModuleProps {
  title: string;
  inputs: Input[];
  formula: string;
  isFormulaView: boolean;
  moduleIndex: number;
}

const Module: React.FC<ModuleProps> = ({
  title,
  inputs,
  formula,
  isFormulaView,
  moduleIndex,
}) => {
  const dispatch = useDispatch();
  const moduleInputs = useSelector(
    (state: RootState) => state.calculator.modules[moduleIndex].inputs
  );

  const handleInputChange = (inputIndex: number, newValue: string) => {
    const input = moduleInputs[inputIndex];
    let parsedValue = parseFloat(newValue);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (input.validation) {
      if (
        input.validation.min !== undefined &&
        parsedValue < input.validation.min
      ) {
        parsedValue = input.validation.min;
      }
      if (
        input.validation.max !== undefined &&
        parsedValue > input.validation.max
      ) {
        parsedValue = input.validation.max;
      }
    }

    dispatch(
      updateModuleInput({ moduleIndex, inputIndex, value: parsedValue })
    );
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
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex-grow">
            {frequentInputs.map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {input.label}
                </label>
                <InputField
                  label={input.label}
                  value={input.value}
                  unit={input.unit}
                  moduleIndex={moduleIndex}
                  inputIndex={moduleInputs.indexOf(input)}
                  onChange={(newValue) =>
                    handleInputChange(moduleInputs.indexOf(input), newValue)
                  }
                />
                {input.example && (
                  <p className="mt-1 text-sm text-gray-500">
                    Example: {input.example}
                  </p>
                )}
              </div>
            ))}
            {rareInputs.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  Other Parameters
                </h4>
                {rareInputs.map((input, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    {input.label}: {input.value} {input.unit}
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
