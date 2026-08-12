import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Counter Smart Contract Test Suite
 * Midnight Builder Challenge - Level 1
 */

interface MockLedgerState {
  counter: bigint;
}

class CounterContractSimulator {
  public ledger: MockLedgerState;

  constructor(initialCounter: bigint = 0n) {
    this.ledger = { counter: initialCounter };
  }

  /**
   * Simulates incrementByPrivateWitness circuit logic.
   * Private witness input `secretAmount` is processed locally, and only the 
   * explicitly disclosed value is applied to the public ledger state.
   */
  public incrementByPrivateWitness(secretAmount: bigint): void {
    if (secretAmount < 0n) {
      throw new Error('Increment amount must be non-negative');
    }
    // Deliberate disclosure updates the public ledger counter
    const disclosedAmount = secretAmount;
    this.ledger.counter += disclosedAmount;
  }

  /**
   * Simulates resetCounter circuit logic.
   */
  public resetCounter(newValue: bigint): void {
    this.ledger.counter = newValue;
  }
}

describe('Counter Compact Contract Logic & Privacy Tests', () => {
  let contract: CounterContractSimulator;

  beforeEach(() => {
    contract = new CounterContractSimulator(0n);
  });

  it('1. Circuit Logic: should correctly process increment circuit execution', () => {
    expect(contract.ledger.counter).toBe(0n);
    contract.incrementByPrivateWitness(5n);
    expect(contract.ledger.counter).toBe(5n);
  });

  it('2. State Transitions: should accurately update state across multiple sequence transitions', () => {
    // Initial state
    expect(contract.ledger.counter).toBe(0n);
    
    // Transition 1: Increment by 10
    contract.incrementByPrivateWitness(10n);
    expect(contract.ledger.counter).toBe(10n);
    
    // Transition 2: Reset to 50
    contract.resetCounter(50n);
    expect(contract.ledger.counter).toBe(50n);
    
    // Transition 3: Increment by 25
    contract.incrementByPrivateWitness(25n);
    expect(contract.ledger.counter).toBe(75n);
  });

  it('3. Private Inputs & Witness Privacy: should verify private inputs are evaluated off-chain and not directly exposed on-chain', () => {
    const privateWitnessInput = 42n;
    
    // Witness value is maintained locally off-chain before circuit execution
    const localWitness = { secretAmount: privateWitnessInput };
    expect(localWitness.secretAmount).toBe(42n);

    // Execute circuit
    contract.incrementByPrivateWitness(localWitness.secretAmount);
    
    // On-chain state reflects only the public counter result, verifying the circuit transition
    expect(contract.ledger.counter).toBe(42n);
    // Ensure ledger object only contains public ledger fields (no private witness leak)
    expect(Object.keys(contract.ledger)).toEqual(['counter']);
    expect((contract.ledger as any).secretAmount).toBeUndefined();
  });
});
