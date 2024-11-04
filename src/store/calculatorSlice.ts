import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { RootState } from "./index";
import { dummyModules, globalConstants, powerLookupTable, comparisonLookupTables } from "../constants/dummyData";
import { calculatePowerResults } from "./sliceHelpers/powerCalculations";
import { calculateVolumeResults } from "./sliceHelpers/volumeCalculations";
import { calculateComparisonResults } from "./sliceHelpers/comparisonCalculations";
import { calculateNTFResults } from "./sliceHelpers/ntfCalculations";

interface CalculatorState {
  modules: typeof dummyModules;
  globalConstants: typeof globalConstants;
  results: {
    installedPower: number;
    totalFlow: number;
    energyConsumption: number;
    selectedNTFModel: string;
    ntfUtilizationRate: number | null;
    energyMixerPower: number;
    selectorVolume: number;
    bufferTankSize: number;
    balanceTankPower: number;
    comparisonResult: number | null;
  };
}

const initialState: CalculatorState = {
  modules: dummyModules,
  globalConstants,
  results: {
    installedPower: 0,
    totalFlow: 0,
    energyConsumption: 0,
    selectedNTFModel: "No suitable model found",
    ntfUtilizationRate: null,
    energyMixerPower: 0,
    selectorVolume: 0,
    bufferTankSize: 0,
    balanceTankPower: 0,
    comparisonResult: null,
  },
};

export const calculateResults = createAsyncThunk(
  "calculator/calculateResults",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { modules, globalConstants } = state.calculator;

    const results = {
      ...calculatePowerResults(modules, globalConstants, powerLookupTable),
      ...calculateVolumeResults(modules),
      ...calculateComparisonResults(modules, comparisonLookupTables),
      ...calculateNTFResults(modules),
    };

    return {
      ...results,
      installedPower: Number(results.installedPower.toFixed(3)),
      totalFlow: Number(results.totalFlow.toFixed(3)),
      energyConsumption: Number(results.energyConsumption.toFixed(3)),
      energyMixerPower: Number(results.energyMixerPower.toFixed(3)),
      selectorVolume: Number(results.selectorVolume.toFixed(3)),
      bufferTankSize: Number(results.bufferTankSize.toFixed(3)),
      balanceTankPower: Number(results.balanceTankPower.toFixed(3)),
      comparisonResult: results.comparisonResult !== null ? Number(results.comparisonResult.toFixed(3)) : null,
      ntfUtilizationRate: results.ntfUtilizationRate !== null ? Number(results.ntfUtilizationRate.toFixed(2)) : null,
    };
  }
);

const debouncedCalculateResults = debounce((dispatch) => {
  dispatch(calculateResults());
}, 500);

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    updateModuleInput: (
      state,
      action: PayloadAction<{
        moduleIndex: number;
        inputIndex: number;
        value: string | number;
      }>
    ) => {
      const { moduleIndex, inputIndex, value } = action.payload;
      state.modules[moduleIndex].inputs[inputIndex].value = value;
    },
    updateGlobalConstant: (
      state,
      action: PayloadAction<{ index: number; value: number }>
    ) => {
      const { index, value } = action.payload;
      state.globalConstants[index].value = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateResults.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const { updateModuleInput, updateGlobalConstant } = calculatorSlice.actions;

export const selectModules = (state: RootState) => state.calculator.modules;
export const selectGlobalConstants = (state: RootState) => state.calculator.globalConstants;
export const selectResults = (state: RootState) => state.calculator.results;

export { debouncedCalculateResults };

export default calculatorSlice.reducer;