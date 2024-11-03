import React from 'react';
import { motion } from 'framer-motion';
import { PHASES } from '../constants/moduleConfiguration';

interface LeftSidebarProps {
  selectedPhase: string;
  onPhaseSelect: (phase: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ selectedPhase, onPhaseSelect }) => {
  return (
    <motion.aside
      className="bg-gray-800 text-white w-64"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Phases</h2>
        <div className="space-y-2">
          {PHASES.map((phase) => (
            <button
              key={phase.title}
              onClick={() => onPhaseSelect(phase.title)}
              className={`w-full text-left py-2 px-4 rounded transition-colors ${
                selectedPhase === phase.title ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              {phase.title}
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default LeftSidebar;