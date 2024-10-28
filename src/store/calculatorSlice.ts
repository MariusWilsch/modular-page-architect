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
    selectedNTFModel: string;
    ntfUtilizationRate: number | null;
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
  },
};

const ntfModels = [
  { model: "NTF50", wastewaterCapacity: 18 },
  { model: "NTF100", wastewaterCapacity: 62 },
  { model: "NTF200", wastewaterCapacity: 185 },
  { model: "NTF300", wastewaterCapacity: 277 },
  { model: "NTF400", wastewaterCapacity: 357 }
];

export const calculateResults = createAsyncThunk(
  "calculator/calculateResults",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { modules, globalConstants } = state.calculator;

    let totalPower = 0;
    let totalFlow = 0;
    let selectedNTFModel = null;
    let ntfUtilizationRate = null;
    let energyMixerPower = 0;
    let selectorVolume = 0;

    // Calculate volume first
    const volumeModule = modules.find(m => m.title === "Volume Calculator (B68)");
    if (volumeModule) {
      const timeB45 = Number(volumeModule.inputs.find(i => i.label === "Time (B45)")?.value) || 0;
      const flowB63 = Number(volumeModule.inputs.find(i => i.label === "Flow Return Sludge (B63)")?.value) || 0;
      const flowB53 = Number(volumeModule.inputs.find(i => i.label === "Influent Flow Bio (B53)")?.value) || 0;
      const flowB65 = Number(volumeModule.inputs.find(i => i.label === "Recycle Flow AT (B65)")?.value) || 0;

      selectorVolume = (timeB45 / 60) * (flowB63 + flowB53 + flowB65);
    }

    modules.forEach((module) => {
      if (module.title === "Feed Pump") {
        const Q = Number(module.inputs.find(input => input.label === "Flow rate (Q)")?.value) || 0;
        const H = Number(module.inputs.find(input => input.label === "Head (H)")?.value) || 0;
        const η = Number(module.inputs.find(input => input.label === "Efficiency (η)")?.value) || 0;
        const ρ = globalConstants.find(constant => constant.label === "Water Density (ρ)")?.value || 0;
        const g = globalConstants.find(constant => constant.label === "Gravity (g)")?.value || 0;

        const power = (Q * H * ρ * g) / (3600 * 1000 * η);
        totalPower += power;
        totalFlow += Q;
      } else if (module.title === "NTF Value Finder") {
        const flowRate = Number(module.inputs.find(input => input.label === "Flow Rate")?.value) || 0;
        const peakFactor = Number(module.inputs.find(input => input.label === "Peak Factor")?.value) || 1;
        
        const peakFlowRate = flowRate * peakFactor;
        
        const ntfModels = [
          { model: "NTF50", wastewaterCapacity: 18 },
          { model: "NTF100", wastewaterCapacity: 62 },
          { model: "NTF200", wastewaterCapacity: 185 },
          { model: "NTF300", wastewaterCapacity: 277 },
          { model: "NTF400", wastewaterCapacity: 357 }
        ];
        
        selectedNTFModel = ntfModels.find(model => model.wastewaterCapacity > peakFlowRate);
        
        if (selectedNTFModel) {
          ntfUtilizationRate = (peakFlowRate / selectedNTFModel.wastewaterCapacity) * 100;
        }
      } else if (module.title === "Power B70 - Energy Mixer") {
        const mixingEnergy = Number(module.inputs.find(input => input.label === "Mixing Energy")?.value) || 0;
        energyMixerPower = (selectorVolume * mixingEnergy) / 1000;
        totalPower += energyMixerPower;
      }
    });

    const energyConsumption = totalPower * 24;

    return {
      installedPower: Number(totalPower.toFixed(3)),
      totalFlow: Number(totalFlow.toFixed(3)),
      energyConsumption: Number(energyConsumption.toFixed(3)),
      selectedNTFModel: selectedNTFModel ? selectedNTFModel.model : "No suitable model found",
      ntfUtilizationRate: ntfUtilizationRate ? Number(ntfUtilizationRate.toFixed(2)) : null,
      energyMixerPower: Number(energyMixerPower.toFixed(3)),
      selectorVolume: Number(selectorVolume.toFixed(3)),
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
