import { BaseCalculation } from './calculations/BaseCalculation';

export class CalculationFactory {
  private static registry = new Map<string, new (moduleId: string) => BaseCalculation>();

  static register(type: string, CalculationClass: new (moduleId: string) => BaseCalculation) {
    this.registry.set(type, CalculationClass);
  }

  static create(type: string, moduleId: string): BaseCalculation {
    const CalculationClass = this.registry.get(type);
    if (!CalculationClass) {
      throw new Error(`Unknown calculation type: ${type}`);
    }
    return new CalculationClass(moduleId);
  }
} 