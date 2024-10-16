import React from 'react';
import Module from './Module';
import AddModule from './AddModule';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Main Content Area</h2>
      <div className="space-y-6">
        <Module title="Module 1" />
        <Module title="Module 2" />
        <AddModule />
      </div>
    </main>
  );
};

export default MainContent;