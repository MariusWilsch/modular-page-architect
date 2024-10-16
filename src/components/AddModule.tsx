import React from 'react';
import { Plus } from 'lucide-react';

const AddModule: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
      <Plus size={48} className="text-green-500 mb-2" />
      <span className="text-lg font-semibold">Add Module</span>
    </div>
  );
};

export default AddModule;