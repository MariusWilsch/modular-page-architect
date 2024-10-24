import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { RootState } from "./index";
import { dummyModules, globalConstants } from "../constants/dummyData";

interface CalculatorState {
  modules: typeof dummyModules;
  globalConstants: typeof globalConstants;
  results: {
    installedPower: number;
    totalFlow: number;
    energyConsumption: number;
  };
}

const initialState: CalculatorState = {
  modules: dummyModules,
  globalConstants,
  results: {
    installedPower: 0,
    totalFlow: 0,
    energyConsumption: 0,
  },
};

export const calculateResults = createAsyncThunk(
  "calculator/calculateResults",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { modules, globalConstants } = state.calculator;

    let totalPower = 0;
    let totalFlow = 0;

    modules.forEach((module) => {
      if (module.title === "Feed Pump") {
        const Q =
          Number(
            module.inputs.find((input) => input.label === "Flow rate (Q)")
              ?.value
          ) || 0;
        const H =
          Number(
            module.inputs.find((input) => input.label === "Head (H)")?.value
          ) || 0;
        const η =
          Number(
            module.inputs.find((input) => input.label === "Efficiency (η)")
              ?.value
          ) || 0;
        const ρ =
          globalConstants.find(
            (constant) => constant.label === "Water Density (ρ)"
          )?.value || 0;
        const g =
          globalConstants.find((constant) => constant.label === "Gravity (g)")
            ?.value || 0;

        const power = (Q * H * ρ * g) / (3600 * 1000 * η);
        totalPower += power;
        totalFlow += Q;
      }
    });

    const energyConsumption = totalPower * 24; // Assuming 24 hours operation

    // Round the results to 3 decimal places
    const roundedInstalledPower = Number(totalPower.toFixed(3));
    const roundedTotalFlow = Number(totalFlow.toFixed(3));
    const roundedEnergyConsumption = Number(energyConsumption.toFixed(3));

    return {
      installedPower: roundedInstalledPower,
      totalFlow: roundedTotalFlow,
      energyConsumption: roundedEnergyConsumption,
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

export const { updateModuleInput, updateGlobalConstant } =
  calculatorSlice.actions;

export const selectModules = (state: RootState) => state.calculator.modules;
export const selectGlobalConstants = (state: RootState) =>
  state.calculator.globalConstants;
export const selectResults = (state: RootState) => state.calculator.results;

export { debouncedCalculateResults };

export default calculatorSlice.reducer;
