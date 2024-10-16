import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeItem {
  name: string;
  children?: TreeItem[];
}

const treeData: TreeItem[] = [
  {
    name: "Filter",
    children: [
      { name: "Mesh Filter" },
      { name: "Sand Filter" },
      { name: "Cartridge Filter" },
    ]
  },
  {
    name: "Pre-treatment",
    children: [
      { name: "Chemical Dosing" },
      { name: "pH Adjustment" },
      { name: "Coagulation" },
    ]
  },
  {
    name: "Bio",
    children: [
      { name: "Aerobic Digestion" },
      { name: "Anaerobic Digestion" },
      { name: "Membrane Bioreactor" },
    ]
  },
  {
    name: "Polish",
    children: [
      { name: "Activated Carbon" },
      { name: "UV Disinfection" },
      { name: "Ozonation" },
    ]
  },
  {
    name: "Dewatering",
    children: [
      { name: "Belt Press" },
      { name: "Centrifuge" },
      { name: "Filter Press" },
    ]
  },
];

const TreeNode: React.FC<{ item: TreeItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div 
        className="flex items-center cursor-pointer py-2 px-4 hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.children && (
          isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />
        )}
        <span className="ml-2">{item.name}</span>
      </div>
      {item.children && isOpen && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <TreeNode key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.aside
      className="bg-gray-800 text-white overflow-hidden"
      animate={{
        width: isExpanded ? '16rem' : '4rem',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <div className="flex justify-between items-center p-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.h2
              className="text-xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              Phases
            </motion.h2>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            {treeData.map((item, index) => (
              <TreeNode key={index} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default LeftSidebar;