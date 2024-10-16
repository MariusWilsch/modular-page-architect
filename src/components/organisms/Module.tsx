import React, { useState } from "react";
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

interface Input {
  label: string;
  value: string | number;
  unit?: string;
}

interface ModuleProps {
  title: string;
  inputs: Input[];
  formula: string;
  isFormulaView: boolean;
}

const Module: React.FC<ModuleProps> = ({
  title,
  inputs: initialInputs,
  formula,
  isFormulaView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChange = (index: number, newValue: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], value: newValue };
    setInputs(updatedInputs);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md relative flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      {isFormulaView && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className={`absolute top-4 right-4 p-2 transition-colors ${
                isHovered ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
      <div className="flex-grow overflow-y-auto">
        {isFormulaView ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-xl text-center">{formula}</span>
          </div>
        ) : (
          <div className="space-y-4">
            {inputs.map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {input.label}
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-3 sm:text-lg border-gray-300 rounded-md bg-gray-50"
                    value={input.value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                  {input.unit && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 sm:text-lg">{input.unit}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;