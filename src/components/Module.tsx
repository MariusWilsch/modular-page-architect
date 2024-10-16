import React from 'react';

interface ModuleProps {
  title: string;
}

const Module: React.FC<ModuleProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>This is a placeholder for the {title} content.</p>
    </div>
  );
};

export default Module;