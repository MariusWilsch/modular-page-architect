import { ModuleDefinition } from "./types/moduleTypes";
import { CalculationObserver } from "./CalculationObserver";
import { CalculationFactory } from "./CalculationFactory";
import { BaseCalculation } from "./calculations/BaseCalculation";

export class CalculationRegistry {
  static registerCalculationType(
    type: string,
    CalculationClass: new (moduleId: string) => BaseCalculation
  ) {
    CalculationFactory.register(type, CalculationClass);
  }

  static registerModule(definition: ModuleDefinition) {
    CalculationObserver.registerModule(definition);
  }
}
