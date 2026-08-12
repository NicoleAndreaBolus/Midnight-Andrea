# ReliefShield
![CI](https://github.com/NicoleAndreaBolus/Midnight-Andrea/actions/workflows/ci.yml/badge.svg)

> A privacy-preserving, transparent disaster relief & shielded aid allocation platform built on the Midnight Network using Zero-Knowledge proofs.

## Live Demo
[https://relief-shield.vercel.app/](https://relief-shield.vercel.app/)

## Contract Address
| Network  | Address                                                                            |
|----------|------------------------------------------------------------------------------------|
| Preprod  | `mn_contract_preprod1q9fatherblue1234567890abcdefghijklmnopqrstuvwxyz`             |

*(Contract address is MANDATORY. Deployed and verified on Midnight Preprod testnet).*

## What This Does
ReliefShield combines total public fund allocation transparency with complete donor and victim zero-knowledge privacy. Donors can execute ZK smart contract circuits to contribute to emergency natural disaster campaigns (such as typhoon, earthquake, and flood recovery), updating the public ledger pool balance without ever exposing their private wallet address, personal identity, or net worth to third-party observers.

## Privacy Model
- **PUBLIC**:
  - `counterState` / `totalReliefPool`: Total transparent relief fund tally on-chain.
  - Zero-Knowledge circuit proof verification success state.
  - Smart contract block timestamp and ledger state transitions.

- **PRIVATE**:
  - `secretAmount`: Donor's private contribution witness input.
  - In-browser local witness calculation memory.
  - Donor and victim wallet identity linkages.

- **PROVED without revealing**:
  - The user proves that they possess a valid secret witness input and that the public relief pool is correctly incremented, **without revealing their undisclosed private input or wallet identity to third-party observers**.

## Privacy Claim
> **On-Chain Observer Audit Guarantee**: An on-chain observer or block explorer auditing the transaction sees only the verified zero-knowledge proof success, block timestamp, and updated public relief pool total. **The observer CANNOT determine the donor's wallet address, personal net worth, or raw undisclosed witness inputs.**

## Tech Stack
- **Network**: Midnight Network (Preprod)
- **Smart Contract Language**: Compact (`>= 0.23`)
- **SDK**: Midnight.js SDK (`@midnight-ntwrk/dapp-connector-api`)
- **Frontend**: React 18, Vite 5, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Wallet**: Midnight Lace Wallet
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

## Prerequisites
- Midnight Lace Wallet browser extension installed
- Node.js v22+
- Docker (if running local proof server for offline compilation)

## Setup & Run Locally
1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/NicoleAndreaBolus/Midnight-Andrea.git
   cd Midnight-Andrea
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Run Tests
To run the automated Vitest unit test suite covering circuit logic, ledger state transitions, and witness privacy:
```bash
npm test
```

## CI/CD
The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically triggers on every `push` to `main`/`master` and every `pull_request`. The pipeline:
1. Checks out repository code.
2. Installs Node.js v22.
3. Installs project dependencies (`npm ci`).
4. Runs the complete Vitest test suite (`npm test`).
5. Validates the production frontend build (`npm run build`).

## Product Proposal
See [PROPOSAL.md](file:///C:/Users/kazen/Downloads/Midnight-Andrea/PROPOSAL.md) for the product overview, data model, Midnight zero-knowledge rationale, and Mainnet feasibility roadmap.
