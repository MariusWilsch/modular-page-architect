import React, { useState } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

const Layout: React.FC = () => {
  const [isFormulaView, setIsFormulaView] = useState(false);

  const toggleView = () => {
    setIsFormulaView(!isFormulaView);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header isFormulaView={isFormulaView} toggleView={toggleView} />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <MainContent isFormulaView={isFormulaView} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;