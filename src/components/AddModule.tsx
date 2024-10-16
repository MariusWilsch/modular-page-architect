import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddModuleModal from './AddModuleModal';

const AddModule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors h-[250px] overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={48} className="text-green-500 mb-2" />
        <span className="text-lg font-semibold">Add Module</span>
      </div>
      <AddModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AddModule;
