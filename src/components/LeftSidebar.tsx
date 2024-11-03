import React from 'react';
import { motion } from 'framer-motion';

interface LeftSidebarProps {
  selectedPhase: string;
  onPhaseSelect: (phase: string) => void;
}

const phases = ["Filter", "Pre-treatment", "Bio", "Polish", "Dewatering"];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ selectedPhase, onPhaseSelect }) => {
  return (
    <motion.aside
      className="bg-gray-800 text-white w-64"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Phases</h2>
        <div className="space-y-2">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => onPhaseSelect(phase)}
              className={`w-full text-left py-2 px-4 rounded transition-colors ${
                selectedPhase === phase ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default LeftSidebar;