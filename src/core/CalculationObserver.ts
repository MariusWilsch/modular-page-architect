export class CalculationObserver {
  private static inputs = new Map<string, any>();
  private static calculations = new Map<string, Function>();
  private static results = new Map<string, any>();
  private static listeners = new Map<string, Set<string>>();

  static setInputs(moduleId: string, values: any) {
    this.inputs.set(moduleId, values);
    this.recalculate(moduleId);
  }

  static getInputs(moduleId: string) {
    return this.inputs.get(moduleId);
  }

  static getResult(moduleId: string) {
    return this.results.get(moduleId);
  }

  private static recalculate(moduleId: string) {
    const calc = this.calculations.get(moduleId);
    if (calc) {
      const result = calc();
      this.results.set(moduleId, result);
      this.notifyListeners(moduleId);
    }
  }

  private static notifyListeners(moduleId: string) {
    const listeners = this.listeners.get(moduleId) || new Set();
    listeners.forEach(listenerId => {
      const listenerCalc = this.calculations.get(listenerId);
      if (listenerCalc) listenerCalc();
    });
  }

  static subscribe(listenerId: string, dependencies: string[]) {
    dependencies.forEach(depId => {
      const current = this.listeners.get(depId) || new Set();
      current.add(listenerId);
      this.listeners.set(depId, current);
    });
  }

  static registerCalculation(moduleId: string, calc: Function) {
    this.calculations.set(moduleId, calc);
  }
} 