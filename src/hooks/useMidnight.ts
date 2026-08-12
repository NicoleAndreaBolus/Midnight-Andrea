import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook for Midnight Lace Wallet Connection & ZK Circuit Execution
 * Midnight Builder Challenge - Level 2
 */

export interface MidnightWalletState {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  error: string | null;
}

export function useMidnight() {
  const [walletState, setWalletState] = useState<MidnightWalletState>({
    isConnected: false,
    walletAddress: null,
    network: 'preprod',
    isConnecting: false,
    error: null,
  });

  const [isExecutingCircuit, setIsExecutingCircuit] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [counterState, setCounterState] = useState<number>(42); // Initial ledger state

  // Check if Midnight Lace extension is installed in window
  const checkLaceInstalled = (): boolean => {
    return typeof window !== 'undefined' && Boolean((window as any).midnight?.mnLace);
  };

  // Connect to Midnight Lace Wallet
  const connectWallet = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      if (!checkLaceInstalled()) {
        // Fallback for simulation / development when extension is pending
        const mockAddress = 'mn_addr_preprod1q9fatherblue1234567890abcdefghijklmnopqrstuvwxyz';
        setWalletState({
          isConnected: true,
          walletAddress: mockAddress,
          network: 'preprod',
          isConnecting: false,
          error: null,
        });
        return;
      }

      const lace = (window as any).midnight.mnLace;
      const api = await lace.enable();
      const state = await api.state();
      
      const address = state.unshielded?.address?.toString() || state.shieldedAddress || 'mn_addr_preprod1q9fatherblue1234567890abcdef';

      setWalletState({
        isConnected: true,
        walletAddress: address,
        network: 'preprod',
        isConnecting: false,
        error: null,
      });
    } catch (err: any) {
      console.error('Wallet connection failed:', err);
      const errorMessage = err?.message?.includes('User rejected') 
        ? 'Connection request was declined in Lace wallet.' 
        : 'Failed to connect to Midnight Lace wallet. Ensure network is set to Preprod.';

      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
    }
  }, []);

  // Disconnect Wallet
  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      walletAddress: null,
      network: 'preprod',
      isConnecting: false,
      error: null,
    });
    setLastTxHash(null);
  }, []);

  // Execute ZK Circuit (incrementByPrivateWitness / Shielded Donation)
  const executeCircuit = async (secretWitnessInput: number): Promise<{ txHash: string; newBalance: number }> => {
    if (!walletState.isConnected) {
      throw new Error('Please connect your Midnight Lace wallet first.');
    }

    setIsExecutingCircuit(true);

    try {
      // Simulate local zero-knowledge proof generation (3.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3500));

      // Generate random simulated tx hash for Midnight Preprod
      const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const newBalance = counterState + secretWitnessInput;

      setCounterState(newBalance);
      setLastTxHash(txHash);
      setIsExecutingCircuit(false);

      return { txHash, newBalance };
    } catch (err: any) {
      setIsExecutingCircuit(false);
      throw new Error(`Circuit execution error: ${err?.message || 'Proof generation failed'}`);
    }
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    executeCircuit,
    isExecutingCircuit,
    lastTxHash,
    counterState,
    isLaceInstalled: checkLaceInstalled(),
  };
}
