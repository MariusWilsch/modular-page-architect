import { CalculationObserver } from "./CalculationObserver";

export class CalculationRegistry {
  static registerCalculation(
    calculationId: string,
    dependencies: string[],
    calculationFn: (inputs: any) => number
  ) {
    CalculationObserver.subscribe(calculationId, dependencies);
    CalculationObserver.registerCalculation(calculationId, () => {
      const inputs = CalculationObserver.getInputs(calculationId);
      return calculationFn(inputs);
    });
  }
} 