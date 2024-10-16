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

interface ModuleProps {
  title: string;
  inputs: { label: string; value: string | number; unit?: string }[];
  formula: string;
  isFormulaView: boolean;
}

const Module: React.FC<ModuleProps> = ({
  title,
  inputs,
  formula,
  isFormulaView,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md relative flex flex-col h-[250px] overflow-hidden">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {isFormulaView && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className={`absolute top-2 right-2 p-2 transition-colors ${
                isHovered ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Edit size={16} />
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
            <span className="text-lg text-center">{formula}</span>
          </div>
        ) : (
          <div className="space-y-2">
            {inputs.map((input, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={input.value}
                    onChange={() => {}} // We'll implement this later
                  />
                  {input.unit && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {input.unit}
                      </span>
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
