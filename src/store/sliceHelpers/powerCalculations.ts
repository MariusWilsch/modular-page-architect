import { ModuleData } from "../../types/moduleTypes";

export const calculatePowerResults = (modules: ModuleData[], globalConstants: any, powerLookupTable: any) => {
  let totalPower = 0;
  let totalFlow = 0;
  let balanceTankPower = 0;
  let energyMixerPower = 0;
  let selectorVolume = 0;

  // First calculate B68 (Volume Calculator) result
  const volumeCalculatorModule = modules.find(m => m.title === "Volume Calculator (B68)");
  if (volumeCalculatorModule) {
    const time = Number(volumeCalculatorModule.inputs.find(i => i.label === "Time (B45)")?.value) || 0;
    const flowReturnSludge = Number(volumeCalculatorModule.inputs.find(i => i.label === "Flow Return Sludge (B63)")?.value) || 0;
    const influentFlowBio = Number(volumeCalculatorModule.inputs.find(i => i.label === "Influent Flow Bio (B53)")?.value) || 0;
    const recycleFlowAT = Number(volumeCalculatorModule.inputs.find(i => i.label === "Recycle Flow AT (B65)")?.value) || 0;

    // Calculate B68 volume
    selectorVolume = (time / 60) * (flowReturnSludge + influentFlowBio + recycleFlowAT);
  }

  // Then calculate B70 (Energy Mixer Power) using B68 result
  const energyMixerModule = modules.find(m => m.title === "Power B70 - Energy Mixer");
  if (energyMixerModule && selectorVolume > 0) {
    const mixingEnergy = Number(energyMixerModule.inputs.find(i => i.label === "Mixing Energy")?.value) || 0;
    energyMixerPower = (selectorVolume * mixingEnergy) / 1000;
    totalPower += energyMixerPower;
  }

  // Calculate other powers
  modules.forEach((module) => {
    if (module.title === "Power Calculation for Balance Tank (N46)") {
      const tankSize = Number(module.inputs.find(i => i.label === "Tank Size (F51)")?.value) || 1;
      const powerEntry = powerLookupTable.find((entry: any) => entry.id === tankSize);
      if (powerEntry) {
        balanceTankPower = powerEntry.power;
        totalPower += balanceTankPower;
      }
    }
    if (module.title === "Feed Pump") {
      const Q = Number(module.inputs.find(input => input.label === "Flow rate (Q)")?.value) || 0;
      const H = Number(module.inputs.find(input => input.label === "Head (H)")?.value) || 0;
      const η = Number(module.inputs.find(input => input.label === "Efficiency (η)")?.value) || 0;
      const ρ = globalConstants.find((constant: any) => constant.label === "Water Density (ρ)")?.value || 0;
      const g = globalConstants.find((constant: any) => constant.label === "Gravity (g)")?.value || 0;

      const power = (Q * H * ρ * g) / (3600 * 1000 * η);
      totalPower += power;
      totalFlow += Q;
    }
  });

  const energyConsumption = totalPower * 24;

  return {
    installedPower: totalPower,
    totalFlow,
    energyConsumption,
    energyMixerPower,
    selectorVolume,
    balanceTankPower
  };
};