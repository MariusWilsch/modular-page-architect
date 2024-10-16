import React from 'react';
import FormulaDisplay from '../atoms/FormulaDisplay';
import InputDisplay from '../atoms/InputDisplay';

interface ModuleContentProps {
  isFormulaView: boolean;
  formula: string;
  inputs: { label: string; value: string | number; unit?: string }[];
}

const ModuleContent: React.FC<ModuleContentProps> = ({ isFormulaView, formula, inputs }) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      {isFormulaView ? (
        <FormulaDisplay formula={formula} />
      ) : (
        <div className="w-full space-y-2">
          {inputs.map((input, index) => (
            <InputDisplay key={index} {...input} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleContent;