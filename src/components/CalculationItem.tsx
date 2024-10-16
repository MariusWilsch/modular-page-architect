import React from "react";

interface CalculationItemProps {
  label: string;
  value: number;
  unit: string;
}

const CalculationItem: React.FC<CalculationItemProps> = ({
  label,
  value,
  unit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{label}</h3>
      <p className="text-2xl font-bold">
        {value}{" "}
        <span className="text-lg font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );
};

export default CalculationItem;
