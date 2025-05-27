const REGISTER_MAP: Record<number, { name: string; multiplier: number; measureItem: string; dataLength?: number }> = {

    4000: { name: 'voltageL1', multiplier: 0.1, measureItem: 'V' },
    4001: { name: 'voltageL2', multiplier: 0.1, measureItem: 'V' },
    4002: { name: 'voltageL3', multiplier: 0.1, measureItem: 'V' },
    4003: { name: 'minVoltageL1', multiplier: 0.1, measureItem: 'V' },
    4004: { name: 'minVoltageL2', multiplier: 0.1, measureItem: 'V' },
    4005: { name: 'minVoltageL3', multiplier: 0.1, measureItem: 'V' },
    4006: { name: 'maxVoltageL1', multiplier: 0.1, measureItem: 'V' },
    4007: { name: 'maxVoltageL2', multiplier: 0.1, measureItem: 'V' },
    4008: { name: 'maxVoltageL3', multiplier: 0.1, measureItem: 'V' },
    4009: { name: 'avgVoltageL1', multiplier: 0.1, measureItem: 'V' },
    4010: { name: 'avgVoltageL2', multiplier: 0.1, measureItem: 'V' },
    4011: { name: 'avgVoltageL3', multiplier: 0.1, measureItem: 'V' },
  
    4024: { name: 'currentL1', multiplier: 0.001, measureItem: 'A' },
    4025: { name: 'currentL2', multiplier: 0.001, measureItem: 'A' },
    4026: { name: 'currentL3', multiplier: 0.001, measureItem: 'A' },
    4040: { name: 'frequencyL1', multiplier: 0.01, measureItem: 'Hz' },
  
    4043: { name: 'pfL1', multiplier: 0.001, measureItem: '' },
    4044: { name: 'pfL2', multiplier: 0.001, measureItem: '' },
    4045: { name: 'pfL3', multiplier: 0.001, measureItem: '' },
    4046: { name: 'pfTotal', multiplier: 0.001, measureItem: '' },
  
    4047: { name: 'cosPhiL1', multiplier: 0.001, measureItem: '' },
    4048: { name: 'cosPhiL2', multiplier: 0.001, measureItem: '' },
    4049: { name: 'cosPhiL3', multiplier: 0.001, measureItem: '' },
  
    4050: { name: 'unbalanceVoltage', multiplier: 0.001, measureItem: '%' },
    4051: { name: 'unbalanceCurrent', multiplier: 0.001, measureItem: '%' },
  
    4140: { name: 'activePowerL1', multiplier: 0.001, measureItem: 'W', dataLength: 2 },
    4146: { name: 'totalActivePower', multiplier: 0.001, measureItem: 'W', dataLength: 2 },
  
    4222: { name: 'totalImportEnergy', multiplier: 1, measureItem: 'Wh', dataLength: 4 },
  };

  export default REGISTER_MAP;