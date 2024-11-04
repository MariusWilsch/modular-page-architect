import { ModuleDefinition } from './types/moduleTypes';
import { CalculationFactory } from './CalculationFactory';
import { BaseCalculation } from './calculations/BaseCalculation';

export class CalculationObserver {
  private static modules = new Map<string, ModuleDefinition>();
  private static calculations = new Map<string, BaseCalculation>();
  private static results = new Map<string, number>();
  private static listeners = new Map<string, Set<string>>();

  static registerModule(definition: ModuleDefinition) {
    this.modules.set(definition.id, definition);
    const calculation = CalculationFactory.create(
      definition.calculationType,
      definition.id
    );
    this.calculations.set(definition.id, calculation);
    
    if (definition.dependencies) {
      this.subscribe(definition.id, definition.dependencies);
    }
  }

  static setInputs(moduleId: string, values: Record<string, number>) {
    const calculation = this.calculations.get(moduleId);
    if (calculation) {
      calculation.setInputs(values);
      this.recalculate(moduleId);
    }
  }

  static getResult(moduleId: string): number {
    return this.results.get(moduleId) || 0;
  }

  private static recalculate(moduleId: string) {
    const calculation = this.calculations.get(moduleId);
    if (calculation) {
      const result = calculation.calculate();
      this.results.set(moduleId, result);
      this.notifyListeners(moduleId);
    }
  }

  static subscribe(listenerId: string, dependencies: string[]) {
    dependencies.forEach((depId) => {
      const current = this.listeners.get(depId) || new Set();
      current.add(listenerId);
      this.listeners.set(depId, current);
    });
  }

  private static notifyListeners(moduleId: string) {
    const listeners = this.listeners.get(moduleId) || new Set();
    listeners.forEach((listenerId) => {
      this.recalculate(listenerId);
    });
  }

  static unregisterModule(moduleId: string) {
    this.modules.delete(moduleId);
    this.calculations.delete(moduleId);
    this.results.delete(moduleId);
    this.listeners.forEach((listeners) => {
      listeners.delete(moduleId);
    });
  }
}
