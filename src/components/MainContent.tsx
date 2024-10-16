import React from "react";
import Module from "./organisms/Module";
import AddModule from "./AddModule";
import { dummyModules } from "../constants/dummyData";

interface MainContentProps {
  isFormulaView: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isFormulaView }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Equipment Modules</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 auto-rows-fr">
        {dummyModules.map((module, index) => (
          <Module
            key={index}
            moduleIndex={index}
            title={module.title}
            inputs={module.inputs}
            formula={module.formula}
            isFormulaView={isFormulaView}
          />
        ))}
        <AddModule />
      </div>
    </main>
  );
};

export default MainContent;
