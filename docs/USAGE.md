# How to Use ReliefShield

Welcome to **ReliefShield** — the zero-knowledge disaster relief and shielded emergency aid distribution platform on the Midnight Network.

This guide walks you through connecting your wallet, executing a shielded contribution, verifying aid allocations, and understanding the privacy guarantees of Midnight.

---

## What You Need

1. **A Chromium-Based Web Browser**: Google Chrome, Brave, or Microsoft Edge.
2. **Lace Midnight Wallet Extension**: Installed from the Chrome Web Store and set to the **Midnight Preprod Testnet**.
3. **Preprod $tNIGHT Test Tokens**: Obtain test tokens from the official Midnight Preprod Faucet.

---

## Step-by-Step Guide

### 1. Open the Live Application
Navigate to the live web app: **[https://relief-shield.vercel.app/](https://relief-shield.vercel.app/)**

### 2. Connect Your Midnight Lace Wallet
1. Click the **`Connect Lace Wallet`** button in the top navigation bar or the hero card.
2. The official Midnight Lace extension popup will appear on your screen.
3. Review the connection request and click **`Authorize`**.
4. Once connected, your shortened address (e.g., `0082a356...3edc05`) and your live `$tNIGHT` balance will be displayed in the top navbar.

### 3. Make a Shielded Relief Contribution
1. Select or enter the amount of **$tNIGHT** you wish to contribute to the emergency relief fund (presets available: `$50`, `$100`, `$250`, `$500`).
2. Click **`Execute ZK Contribution Circuit`**.
3. Your browser client will locally compute the Zero-Knowledge SNARK proof via the Midnight prover.
4. The transaction will be submitted to the Midnight Preprod blockchain.
5. Once confirmed, you will see a green checkmark along with your on-chain **Transaction Hash**, and the public relief pool total will increment in real time.

### 4. Admin & Field Officer Verification (SaaS Dashboard)
1. Toggle to the **`SaaS Admin`** view using the floating mode switcher at the bottom-left.
2. View campaign metrics, recent activity logs, and real-time relief allocations.
3. Use the **`Donate / Receive via QR`** tool to simulate field officer eligibility verification and rapid aid grant disbursement.

---

## What Gets Proved (and What Stays Private)

| Data Point | Visibility | Explanation |
|---|---|---|
| **Public Relief Pool Total** | **PUBLIC** | Visible on-chain to all auditors, donors, and block explorers. |
| **ZK Proof Validity** | **PUBLIC** | Confirms that the transaction satisfied Compact circuit arithmetic rules. |
| **Donor Contribution Amount** | **PRIVATE** | Processed as a private witness inside your browser memory; never revealed on-chain. |
| **Donor Identity & Wallet History** | **PRIVATE** | No observer can link your wallet address or net worth to the contribution. |
| **Beneficiary Aid Grant Claims** | **PRIVATE** | Disaster victims claim aid without exposing their legal identities on a public ledger. |

---

## Troubleshooting

### 1. "Midnight Lace Wallet extension was not detected"
- Ensure the Midnight Lace extension is installed in your browser.
- Open your browser's extension manager (`chrome://extensions`) and make sure Lace is enabled.
- Ensure you are not in Incognito mode unless extension access in Incognito is allowed.

### 2. "Connection request was declined / rejected"
- Unlock your Lace wallet by entering your password in the extension popup before clicking connect.
- Refresh the webpage and click **`Connect Lace Wallet`** again.

### 3. Transaction Taking Longer Than Expected
- Zero-knowledge proof generation is computed on your client device (typically takes 2-4 seconds).
- Ensure your network connection to the Midnight Preprod RPC endpoint is stable.
