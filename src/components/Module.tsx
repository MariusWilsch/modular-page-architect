import React from 'react';

interface ModuleProps {
  title: string;
  inputs: { label: string; value: string | number; unit?: string }[];
}

const Module: React.FC<ModuleProps> = ({ title, inputs }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {inputs.map((input, index) => (
        <div key={index} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{input.label}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={input.value}
              onChange={() => {}} // We'll implement this later
            />
            {input.unit && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{input.unit}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Module;