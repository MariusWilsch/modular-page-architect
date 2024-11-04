import { CalculationRegistry } from "../CalculationRegistry";

const TEST_CONSTANTS = {
  waterDensity: 1000,
  gravity: 9.81
};

export const registerFeedPumpCalculation = () => {
  CalculationRegistry.registerCalculation(
    "feed-pump",
    [],
    (inputs) => {
      if (!inputs) return 0;
      const { flowRate, head, efficiency } = inputs;
      const { waterDensity, gravity } = TEST_CONSTANTS;
      return (flowRate * head * waterDensity * gravity) / (3600 * 1000 * efficiency);
    }
  );
};
