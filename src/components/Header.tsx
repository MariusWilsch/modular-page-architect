import React from 'react';
import { Button } from './ui/button';
import AdvancedSettings from './AdvancedSettings';

interface HeaderProps {
  isFormulaView: boolean;
  toggleView: () => void;
}

const Header: React.FC<HeaderProps> = ({ isFormulaView, toggleView }) => {
  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Wastewater Treatment Design Tool</h1>
      <div className="flex space-x-4">
        <AdvancedSettings />
        <Button
          onClick={toggleView}
          className={`${isFormulaView ? 'bg-green-500' : 'bg-blue-500'} text-white`}
        >
          {isFormulaView ? 'View Default' : 'View Formulas'}
        </Button>
      </div>
    </header>
  );
};

export default Header;