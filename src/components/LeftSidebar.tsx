import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeftSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.aside
      className="bg-gray-100 p-4 overflow-hidden"
      animate={{
        width: isExpanded ? '16rem' : '4rem',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.h2
              className="text-xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              Left Sidebar
            </motion.h2>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
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
          >
            {/* Add content for left sidebar here */}
            <p>Sidebar content goes here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default LeftSidebar;