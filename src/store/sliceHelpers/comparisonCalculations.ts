import { ModuleData } from "../../types/moduleTypes";

export const calculateComparisonResults = (modules: ModuleData[], comparisonLookupTables: any) => {
  let comparisonResult: number | null = null;

  const comparisonModule = modules.find(m => m.title === "Unit Comparison");
  if (comparisonModule) {
    const v44 = Number(comparisonModule.inputs.find(i => i.label === "First Value (V44)")?.value) || 0;
    const v46 = Number(comparisonModule.inputs.find(i => i.label === "Second Value (V46)")?.value) || 0;
    
    // Compare results
    comparisonResult = Math.max(v44, v46);
  }

  return { comparisonResult };
};