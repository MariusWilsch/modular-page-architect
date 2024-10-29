import { ModuleData } from "../../types/moduleTypes";

export const calculateNTFResults = (modules: ModuleData[]) => {
  let selectedNTFModel = "No suitable model found";
  let ntfUtilizationRate: number | null = null;

  const ntfModule = modules.find(m => m.title === "NTF Value Finder");
  if (ntfModule) {
    const flowRate = Number(ntfModule.inputs.find(input => input.label === "Flow Rate")?.value) || 0;
    const peakFactor = Number(ntfModule.inputs.find(input => input.label === "Peak Factor")?.value) || 1;
    
    const peakFlowRate = flowRate * peakFactor;
    
    const ntfModels = [
      { model: "NTF50", wastewaterCapacity: 18 },
      { model: "NTF100", wastewaterCapacity: 62 },
      { model: "NTF200", wastewaterCapacity: 185 },
      { model: "NTF300", wastewaterCapacity: 277 },
      { model: "NTF400", wastewaterCapacity: 357 }
    ];
    
    const selectedModel = ntfModels.find(model => model.wastewaterCapacity > peakFlowRate);
    
    if (selectedModel) {
      selectedNTFModel = selectedModel.model;
      ntfUtilizationRate = (peakFlowRate / selectedModel.wastewaterCapacity) * 100;
    }
  }

  return { selectedNTFModel, ntfUtilizationRate };
};