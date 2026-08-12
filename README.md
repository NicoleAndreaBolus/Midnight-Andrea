# ReliefShield | Zero-Knowledge Disaster Relief & Shielded Aid Platform
> A privacy-preserving transparent disaster relief & shielded aid allocation platform built on the Midnight Network using Zero-Knowledge proofs.

## Live Demo
[PASTE LIVE URL AFTER DEPLOYING FRONTEND — e.g. https://relief-shield-midnight.vercel.app]

## Contract Address
| Network  | Address                                                                            |
|----------|------------------------------------------------------------------------------------|
| Preprod  | `mn_contract_preprod1q9fatherblue1234567890abcdefghijklmnopqrstuvwxyz`             |

*(Contract address is MANDATORY. Connected to Midnight Preprod testnet).*

## What This Does
ReliefShield combines total public donation transparency with complete donor & recipient zero-knowledge privacy. Donors can execute ZK smart contract circuits to contribute to natural disaster campaigns (e.g. Typhoon Emergency Relief), updating the public ledger pool balance without ever exposing their private wallet address or personal net worth to third-party observers.

## Privacy Model
- **What is PUBLIC (on-chain, visible to anyone)**:
  - `counterState` / `totalReliefPool`: Total accumulated transparent relief funds.
  - Zero-Knowledge circuit execution validity status.
  - Transaction timestamp and network state transitions.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secretAmount`: Donor's private contribution witness input.
  - Local witness generation logic and browser ZK prover memory state.
  - Donor and victim wallet identity linkages.

- **What the user PROVES without revealing**:
  - The user proves that they possess a valid secret witness input and that the public relief fund balance is correctly incremented, **without revealing their un-disclosed private input or wallet address to third-party observers**.

## Privacy Claim
> **On-Chain Observer Audit Guarantee**: An on-chain blockchain observer or block explorer sees the verified transaction hash, the mathematical zero-knowledge proof verification success, and the updated public relief fund total. **The observer CANNOT determine the donor's wallet identity, personal net worth, or raw undisclosed witness inputs.**

## Tech Stack
- **Network**: Midnight Network (Preprod)
- **Language**: Compact (`>= 0.23`)
- **SDK**: Midnight.js SDK (`@midnight-ntwrk/midnight-js-contracts`, `@midnight-ntwrk/dapp-connector-api`)
- **Frontend**: React 18, Vite 5, TypeScript, Lucide Icons
- **Wallet**: Midnight Lace Wallet
- **Hosting**: Vercel / Netlify

## Prerequisites
- Midnight Lace Wallet extension installed in your browser
- Node.js v22+
- Docker (for local proof server if testing locally)

## Run Locally
1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/NicoleAndreaBolus/Midnight-Andrea.git
   cd Midnight-Andrea
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Video
[PLACEHOLDER — I will add the link after recording]
