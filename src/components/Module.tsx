import React from 'react';
import { Edit } from 'lucide-react';
import { Button } from './ui/button';

interface ModuleProps {
  title: string;
  inputs: { label: string; value: string | number; unit?: string }[];
  formula: string;
  isFormulaView: boolean;
}

const Module: React.FC<ModuleProps> = ({ title, inputs, formula, isFormulaView }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md relative">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Button
        className="absolute top-2 right-2 p-2"
        variant="ghost"
        onClick={() => {/* TODO: Implement formula editing */}}
      >
        <Edit size={16} />
      </Button>
      {isFormulaView ? (
        <div className="flex justify-center items-center h-24">
          <span className="text-lg">{formula}</span>
        </div>
      ) : (
        inputs.map((input, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">{input.label}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={input.value}
                onChange={() => {}} // We'll implement this later
              />
              {input.unit && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{input.unit}</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Module;