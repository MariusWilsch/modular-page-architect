import React from 'react';
import EditButton from '../atoms/EditButton';

interface ModuleHeaderProps {
  title: string;
  isFormulaView: boolean;
  onEditClick: () => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, isFormulaView, onEditClick }) => {
  return (
    <div className="relative">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {isFormulaView && <EditButton onClick={onEditClick} />}
    </div>
  );
};

export default ModuleHeader;