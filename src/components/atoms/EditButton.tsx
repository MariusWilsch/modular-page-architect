import React from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../ui/button';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="absolute top-2 right-2 p-2 transition-colors hover:bg-gray-200"
      variant="ghost"
      onClick={onClick}
    >
      <Edit size={16} />
    </Button>
  );
};

export default EditButton;