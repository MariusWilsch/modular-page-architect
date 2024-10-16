import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface FormulaEditorProps {
  formula: string;
}

const FormulaEditor: React.FC<FormulaEditorProps> = ({ formula }) => {
  const [editedFormula, setEditedFormula] = useState(formula);

  const handleVariableSelect = (value: string) => {
    setEditedFormula(prev => prev + ' ' + value);
  };

  const handleOperationClick = (operation: string) => {
    setEditedFormula(prev => prev + ' ' + operation);
  };

  return (
    <div className="space-y-4 mt-4">
      <Select onValueChange={handleVariableSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select Variable" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="P">Power (P)</SelectItem>
          <SelectItem value="Q">Flow Rate (Q)</SelectItem>
          <SelectItem value="H">Head (H)</SelectItem>
          <SelectItem value="η">Efficiency (η)</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex space-x-2">
        <Button onClick={() => handleOperationClick('+')}>+</Button>
        <Button onClick={() => handleOperationClick('-')}>-</Button>
        <Button onClick={() => handleOperationClick('×')}>×</Button>
        <Button onClick={() => handleOperationClick('÷')}>÷</Button>
      </div>

      <Textarea
        value={editedFormula}
        onChange={(e) => setEditedFormula(e.target.value)}
        placeholder="Describe the formula you want to create..."
        className="h-32"
      />

      <Button className="w-full" onClick={() => {/* TODO: Implement formula update logic */}}>
        Update Formula
      </Button>
    </div>
  );
};

export default FormulaEditor;