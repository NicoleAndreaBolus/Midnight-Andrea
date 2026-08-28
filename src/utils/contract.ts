/**
 * ReliefShield Smart Contract Interaction Helpers
 * Midnight Network - Preprod / Preview
 */

export interface ContractConfig {
  contractAddress: string;
  network: 'preprod' | 'preview' | 'testnet';
  proofServerUrl?: string;
  indexerUrl?: string;
}

export const DEFAULT_CONTRACT_CONFIG: ContractConfig = {
  contractAddress: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2',
  network: 'preprod',
  proofServerUrl: 'https://proof-server.preprod.midnight.network',
  indexerUrl: 'https://indexer.preprod.midnight.network/api/v1/graphql',
};

/**
 * Format raw contract address into shortened readable display
 */
export function formatAddress(address: string, prefixLen = 8, suffixLen = 6): string {
  if (!address) return '';
  if (address.length <= prefixLen + suffixLen) return address;
  return `${address.slice(0, prefixLen)}...${address.slice(-suffixLen)}`;
}

/**
 * Calculate expected new public relief pool balance given secret witness input
 */
export function computeNewPoolBalance(currentPool: number, secretWitnessAmount: number): number {
  if (secretWitnessAmount <= 0) {
    throw new Error('Secret witness contribution amount must be greater than 0');
  }
  return currentPool + secretWitnessAmount;
}

/**
 * Validates whether the provided witness amount satisfies ZK circuit constraints
 */
export function validateWitnessConstraints(secretAmount: number, userBalance: number): { valid: boolean; error?: string } {
  if (isNaN(secretAmount) || secretAmount <= 0) {
    return { valid: false, error: 'Contribution amount must be a positive number.' };
  }
  if (secretAmount > userBalance) {
    return { valid: false, error: 'Insufficient wallet balance for this shielded contribution.' };
  }
  return { valid: true };
}
