export abstract class BaseCalculation {
  protected moduleId: string;
  protected inputs: Map<string, number>;

  constructor(moduleId: string) {
    this.moduleId = moduleId;
    this.inputs = new Map();
  }

  abstract calculate(): number;

  setInputs(values: Record<string, number>) {
    Object.entries(values).forEach(([key, value]) => {
      this.inputs.set(key, value);
    });
  }
} 