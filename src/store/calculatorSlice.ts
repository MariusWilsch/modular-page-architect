import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { RootState } from "./index";
import { dummyModules, globalConstants, powerLookupTable } from "../constants/dummyData";

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
  },
};

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
    let bufferTankSize = 0;
    let balanceTankPower = 0;

    modules.forEach((module) => {
      if (module.title === "Power Calculation for Balance Tank (N46)") {
        const tankSize = Number(module.inputs.find(i => i.label === "Tank Size (F51)")?.value) || 1;
        const powerEntry = powerLookupTable.find(entry => entry.id === tankSize);
        if (powerEntry) {
          balanceTankPower = powerEntry.power;
          totalPower += balanceTankPower;
        }
      }
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
      } else if (module.title === "Buffer Tank Size Calculator (N43)") {
        const A = Number(module.inputs.find(i => i.label === "Running Hours Water Treatment After BT (F54)")?.value) || 0;
        const B = Number(module.inputs.find(i => i.label === "Incoming Water Hours (F44)")?.value) || 0;
        const C = Number(module.inputs.find(i => i.label === "Flow (F43)")?.value) || 0;
        const D = Number(module.inputs.find(i => i.label === "Minimal Residence Time (F46)")?.value) || 0;
        const E = Number(module.inputs.find(i => i.label === "Flow (F42)")?.value) || 0;
        const F = Number(module.inputs.find(i => i.label === "Running Hours Water Treatment After BT (F45)")?.value) || 0;
        const Y = Number(module.inputs.find(i => i.label === "Netto/Bruto (F49)")?.value) || 1;

        // Calculate X based on conditions
        let X;
        if ((A - B) < 3) {
          X = C * D;
        } else {
          X = (E / F) * (F - B);
        }

        // Calculate buffer tank size
        bufferTankSize = X / Y;
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
      bufferTankSize: Number(bufferTankSize.toFixed(3)),
      balanceTankPower: Number(balanceTankPower.toFixed(3)),
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
