import React from 'react';

interface InputDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
}

const InputDisplay: React.FC<InputDisplayProps> = ({ label, value, unit }) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
          value={value}
          readOnly
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDisplay;