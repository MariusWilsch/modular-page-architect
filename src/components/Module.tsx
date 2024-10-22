import React, { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import FormulaEditor from "./FormulaEditor";
import InputField from "./InputField";

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
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md relative min-w-[250px] min-h-[200px] flex flex-col">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {isFormulaView && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="absolute top-2 right-2 p-2 transition-colors"
              variant="ghost"
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
      <div className="flex-grow flex items-center justify-center">
        {isFormulaView ? (
          <span className="text-lg text-center">{formula}</span>
        ) : (
          <div className="w-full space-y-2">
            {inputs.map((input, index) => (
              <InputField
                key={index}
                label={input.label}
                value={input.value}
                unit={input.unit}
                moduleIndex={null}
                inputIndex={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;
