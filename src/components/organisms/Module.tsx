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
    dispatch(updateModuleInput({ moduleIndex, inputIndex, value: newValue }));
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
                    math={`${input.label.split(" ")[0]} = ${input.value || 0}${
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
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-3 sm:text-lg border-gray-300 rounded-md bg-gray-50"
                    value={input.value}
                    onChange={(e) =>
                      handleInputChange(moduleInputs.indexOf(input), e.target.value)
                    }
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
