# Midnight Counter Privacy Smart Contract
> A privacy-preserving counter smart contract built on the Midnight Network using the Compact programming language.

## Contract Address
| Network  | Address                                                                                         |
|----------|-------------------------------------------------------------------------------------------------|
| Preview  | `mn_contract_preview1q9z3wddjr08funglalkectwpfv5fdr6p9c9qsce9em0qch27p0z5gsqtkdgd` (Simulated) |
| Preprod  | `mn_contract_preprod1q9fatherblue1234567890abcdefghijklmnopqrstuvwxyz` (Simulated)              |

*(Note: Nethermind faucet is currently experiencing temporary downtime. Update with live transaction hash upon faucet restoration.)*

## What This Does
This smart contract manages a stateful counter on the Midnight blockchain. It allows users to execute zero-knowledge circuits that increment the public ledger counter using private witness inputs, guaranteeing that confidential amounts or witness computations remain completely private to the user while maintaining verifiable state updates on-chain.

## Privacy Model
- **What is PUBLIC (on-chain, visible to anyone)**:
  - `counter`: The current public integer state (`Uint<64>`) stored on the Midnight ledger.
  - Disclosed state transition outputs resulting from circuit execution.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secretAmount`: The private witness input (`Uint<64>`) supplied during local zero-knowledge circuit execution.
  - Local witness generation logic and intermediate ZK proof execution states.

- **What the user PROVES without revealing**:
  - The user proves that they possess a valid non-negative secret witness input and that the ledger counter is correctly updated by the disclosed amount, without revealing the raw un-disclosed private input or intermediate proof state to third parties or block validators.

## Tech Stack
- **Network**: Midnight Network (Preview / Preprod)
- **Language**: Compact (`>= 0.23`)
- **Runtime**: Node.js v22
- **Infrastructure**: Docker & Proof Server (`midnightnetwork/proof-server`)
- **Testing**: Vitest, TypeScript

## Prerequisites
- Node.js v22+
- Docker & Midnight Proof Server container (`midnightnetwork/proof-server`) listening on port `6300`
- Compact Compiler (`@midnight-ntwrk/compact-compiler` / `compact` CLI)

## Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd Midnight-Andrea
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Midnight Proof Server container (port 6300):
   ```bash
   docker run -p 6300:6300 midnightnetwork/proof-server
   ```
4. Compile the Compact contract:
   ```bash
   npm run compile
   ```

## Run Tests
Run the test suite covering circuit logic, state transitions, and witness privacy:
```bash
npm test
```

## Initial Idea
[LEAVE PLACEHOLDER — I will fill this in manually]

## Screenshots

### 1. Contract Compilation Output
![Contract Compilation Output](./docs/screenshots/compile_output.png)
*(Screenshot showing successful `compact compile contracts/counter.compact contracts/managed/counter` execution)*

### 2. Test Suite Execution
![Test Suite Passing](./docs/screenshots/test_suite.png)
*(Screenshot showing 3 passing tests from `npm test`)*

### 3. Deployed Contract Address & Wallet Balance
![Deployed Contract Address](./docs/screenshots/deploy_contract.png)
*(Screenshot showing terminal output with contract address)*
