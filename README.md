# ReliefShield
[![CI](https://github.com/NicoleAndreaBolus/Midnight-Andrea/actions/workflows/ci.yml/badge.svg)](https://github.com/NicoleAndreaBolus/Midnight-Andrea/actions/workflows/ci.yml)

> A privacy-preserving, transparent disaster relief & shielded aid allocation platform built on the Midnight Network.

## Live Demo
[https://relief-shield.vercel.app/](https://relief-shield.vercel.app/)

## Contract Address
| Network  | Address                                                          |
|----------|------------------------------------------------------------------|
| Preprod  | `7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2` |
| Preview  | `7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2` |

## What This Does
ReliefShield is a decentralized, zero-knowledge disaster relief and aid management platform that allows donors, relief agencies, and disaster victims to allocate and disburse emergency funds securely on the Midnight Network. Using zero-knowledge proofs generated locally in the browser via the Lace Midnight Wallet DApp Connector, donors can contribute to public emergency relief campaigns and transition contract state without exposing their underlying financial figures, personal identities, or wallet addresses to the public.

## Privacy Model
- **PUBLIC:**
  - Public ledger state (`counter`), representing aggregated public relief fund tallies and on-chain verified output metrics.
  - Contract verification keys and transaction hashes.
- **PRIVATE:**
  - Private circuit witness inputs (`secretAmount`), which remain strictly on the user's local device.
  - Individual donor inputs, secret contribution amounts, and beneficiary tokens.
- **PROVED without revealing:**
  - Proves that the state update satisfies Compact circuit rules and arithmetic constraints without disclosing the private witness input value.

## Privacy Claim
**What an on-chain observer sees:** An observer scanning the Midnight blockchain or indexer sees only valid state transitions, zero-knowledge proofs, and the resulting public ledger counter state.

**What an on-chain observer CANNOT see:** An observer cannot inspect, reverse-engineer, or deduce the donor's private witness input (`secretAmount`), as the private input never leaves the user's browser client and is never written to the blockchain.

## Tech Stack
Midnight network, Compact, Midnight.js SDK, React/Vite, Lace wallet, GitHub Actions CI/CD

## Prerequisites
- Lace Midnight Wallet extension installed in browser
- Node.js v22+
- Docker Desktop (for local proof server testing)

## Setup & Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/NicoleAndreaBolus/Midnight-Andrea.git
   cd Midnight-Andrea
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile Compact contract:**
   ```bash
   npm run compile
   ```

4. **Start local dev server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Run Tests
```bash
npm test
```

## CI/CD
The project features an automated GitHub Actions CI/CD pipeline defined in `.github/workflows/ci.yml`. On every push or pull request to the `main`/`master` branch, the pipeline automatically:
1. Checks out the code repository.
2. Configures a Node.js v22 environment.
3. Downloads and installs the official Compact compiler.
4. Installs project dependencies (`npm install`).
5. Compiles Compact smart contracts (`npm run compile`).
6. Executes the 3+ unit test suite verifying circuit logic, state transitions, and witness privacy (`npm test`).
7. Builds the production frontend bundle (`npm run build`).

## Product Proposal
See [PROPOSAL.md](PROPOSAL.md)
