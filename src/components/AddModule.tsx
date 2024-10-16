import React from 'react';
import { Plus } from 'lucide-react';

const AddModule: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
      <Plus className="mr-2" />
      <span className="text-lg font-semibold">Add Module</span>
    </div>
  );
};

export default AddModule;