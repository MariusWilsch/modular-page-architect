import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../ui/button';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      className={`absolute top-2 right-2 p-2 transition-colors ${
        isHovered ? 'bg-gray-200' : ''
      }`}
      variant="ghost"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Edit size={16} />
    </Button>
  );
};

export default EditButton;