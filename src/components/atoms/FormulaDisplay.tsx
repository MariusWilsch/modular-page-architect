import React from 'react';

interface FormulaDisplayProps {
  formula: string;
}

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula }) => {
  return <span className="text-lg text-center">{formula}</span>;
};

export default FormulaDisplay;