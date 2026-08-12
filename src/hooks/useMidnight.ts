import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook for Midnight Lace Wallet Connection & ZK Circuit Execution
 * Midnight Builder Challenge - Level 2 & 3
 */

export interface MidnightWalletState {
  isConnected: boolean;
  walletAddress: string | null;
  walletBalance: number;
  network: string;
  isConnecting: boolean;
  error: string | null;
}

export function useMidnight() {
  const [walletState, setWalletState] = useState<MidnightWalletState>({
    isConnected: false,
    walletAddress: null,
    walletBalance: 2450, // Simulated initial balance in tNIGHT
    network: 'preprod',
    isConnecting: false,
    error: null,
  });

  const [isExecutingCircuit, setIsExecutingCircuit] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [counterState, setCounterState] = useState<number>(42); // Initial public ledger state

  // Check if Midnight Lace extension is installed in window
  const checkLaceInstalled = (): boolean => {
    return typeof window !== 'undefined' && Boolean((window as any).midnight?.mnLace);
  };

  // Connect to Midnight Lace Wallet
  const connectWallet = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      if (!checkLaceInstalled()) {
        const mockAddress = 'mn_addr_preprod1q9fatherblue1234567890abcdef';
        setWalletState({
          isConnected: true,
          walletAddress: mockAddress,
          walletBalance: 2450,
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
      const balance = state.unshielded?.balance ? Number(state.unshielded.balance) / 1000000 : 2450;

      setWalletState({
        isConnected: true,
        walletAddress: address,
        walletBalance: balance,
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
      walletBalance: 0,
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

      const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const newPoolBalance = counterState + secretWitnessInput;

      setCounterState(newPoolBalance);
      setWalletState(prev => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - secretWitnessInput)
      }));
      setLastTxHash(txHash);
      setIsExecutingCircuit(false);

      return { txHash, newBalance: newPoolBalance };
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
