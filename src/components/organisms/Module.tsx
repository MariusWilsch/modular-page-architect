import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import FormulaEditor from '../FormulaEditor';
import ModuleHeader from '../molecules/ModuleHeader';
import ModuleContent from '../molecules/ModuleContent';

interface ModuleProps {
  title: string;
  inputs: { label: string; value: string | number; unit?: string }[];
  formula: string;
  isFormulaView: boolean;
}

const Module: React.FC<ModuleProps> = ({ title, inputs, formula, isFormulaView }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md relative flex flex-col h-full">
      <Sheet>
        <SheetTrigger asChild>
          <ModuleHeader title={title} isFormulaView={isFormulaView} onEditClick={() => {}} />
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Edit Formula</SheetTitle>
            <SheetDescription>
              Modify existing formulas or create new ones using the options below.
            </SheetDescription>
          </SheetHeader>
          <FormulaEditor formula={formula} />
        </SheetContent>
      </Sheet>
      <ModuleContent isFormulaView={isFormulaView} formula={formula} inputs={inputs} />
    </div>
  );
};

export default Module;