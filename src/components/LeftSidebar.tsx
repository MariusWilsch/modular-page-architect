import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LeftSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`bg-gray-100 p-4 overflow-y-auto transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-between items-center mb-4">
        {isExpanded && <h2 className="text-xl font-semibold">Left Sidebar</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div>
          {/* Add content for left sidebar here */}
          <p>Sidebar content goes here.</p>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;