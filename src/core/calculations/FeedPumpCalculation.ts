import { BaseCalculation } from './BaseCalculation';

export class FeedPumpCalculation extends BaseCalculation {
  calculate(): number {
    const flowRate = this.inputs.get('Flow rate (Q)') || 0;
    const head = this.inputs.get('Head (H)') || 0;
    const efficiency = this.inputs.get('Efficiency (η)') || 0.7;
    
    // Feed pump power calculation (kW)
    return (flowRate * head * 9.81) / (3600 * efficiency * 1000);
  }
} 