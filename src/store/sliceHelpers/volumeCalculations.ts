import { ModuleData } from "../../types/moduleTypes";

export const calculateVolumeResults = (modules: ModuleData[]) => {
  let selectorVolume = 0;
  let bufferTankSize = 0;

  modules.forEach((module) => {
    if (module.title === "Volume Calculator (B68)") {
      const B45 = Number(module.inputs.find(i => i.label === "Time (B45)")?.value) || 0;
      const B63 = Number(module.inputs.find(i => i.label === "Flow Return Sludge (B63)")?.value) || 0;
      const B53 = Number(module.inputs.find(i => i.label === "Influent Flow Bio (B53)")?.value) || 0;
      const B65 = Number(module.inputs.find(i => i.label === "Recycle Flow AT (B65)")?.value) || 0;

      selectorVolume = (B45 / 60) * (B63 + B53 + B65);
    }
    else if (module.title === "Buffer Tank Size Calculator (N43)") {
      const A = Number(module.inputs.find(i => i.label === "Running Hours Water Treatment After BT (F54)")?.value) || 0;
      const B = Number(module.inputs.find(i => i.label === "Incoming Water Hours (F44)")?.value) || 0;
      const C = Number(module.inputs.find(i => i.label === "Flow (F43)")?.value) || 0;
      const D = Number(module.inputs.find(i => i.label === "Minimal Residence Time (F46)")?.value) || 0;
      const E = Number(module.inputs.find(i => i.label === "Flow (F42)")?.value) || 0;
      const F = Number(module.inputs.find(i => i.label === "Running Hours Water Treatment After BT (F45)")?.value) || 0;
      const Y = Number(module.inputs.find(i => i.label === "Netto/Bruto (F49)")?.value) || 1;

      let X;
      if ((A - B) < 3) {
        X = C * D;
      } else {
        X = (E / F) * (F - B);
      }

      bufferTankSize = X / Y;
    }
  });

  return { selectorVolume, bufferTankSize };
};