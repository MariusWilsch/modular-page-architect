import { ModuleData } from "../types/moduleTypes";
import { globalConstants, powerLookupTable, comparisonLookupTables } from "./globalConstants";
import { basicModules } from "./moduleDefinitions/basicModules";
import { calculationModules } from "./moduleDefinitions/calculationModules";
import { powerModules } from "./moduleDefinitions/powerModules";

export { globalConstants, powerLookupTable, comparisonLookupTables };

export const dummyModules: ModuleData[] = [
  ...basicModules,
  ...calculationModules,
  ...powerModules,
];