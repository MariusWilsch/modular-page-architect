import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Module</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          This AI-powered module creator will generate a custom module based on your input.
        </p>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the module you want to create..."
          className="w-full mb-4"
          rows={5}
        />
        <div className="flex justify-end">
          <Button onClick={() => {/* TODO: Implement module creation logic */}}>
            Create Module
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;