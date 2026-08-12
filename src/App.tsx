import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { Shield, EyeOff, Lock, CheckCircle2, HeartHandshake, FileCode2 } from 'lucide-react';

export const App: React.FC = () => {
  const {
    isConnected,
    walletAddress,
    network,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    executeCircuit,
    isExecutingCircuit,
    lastTxHash,
    counterState,
  } = useMidnight();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Top Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                ReliefShield
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Midnight ZK Disaster Relief Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Midnight Preprod
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10 relative z-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Shielded Natural Disaster Relief</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
            Transparent Fund Totals. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              100% Shielded Donors & Victims.
            </span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Execute zero-knowledge smart contract circuits on the Midnight Network to contribute to disaster relief campaigns. Your donation updates the public on-chain relief tally without ever exposing your private wallet identity or net worth.
          </p>
        </section>

        {/* Step 3 Component: Wallet Connection */}
        <section>
          <WalletConnect
            isConnected={isConnected}
            walletAddress={walletAddress}
            network={network}
            isConnecting={isConnecting}
            error={error}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
          />
        </section>

        {/* Step 4 Component: Circuit Call */}
        <section>
          <CircuitCall
            isConnected={isConnected}
            counterState={counterState}
            isExecutingCircuit={isExecutingCircuit}
            lastTxHash={lastTxHash}
            onExecuteCircuit={executeCircuit}
          />
        </section>

        {/* Privacy Claim Section (Mandatory for Level 2) */}
        <section className="max-w-3xl mx-auto bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-emerald-400" />
            Official Privacy Claim & Observer Audit Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>What On-Chain Observers CAN See</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 font-mono list-disc list-inside">
                <li>Total public relief fund balance</li>
                <li>Valid Zero-Knowledge proof verification state</li>
                <li>On-chain transaction hash timestamp</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <EyeOff className="w-4 h-4" />
                <span>What On-Chain Observers CANNOT See</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 font-mono list-disc list-inside">
                <li>Raw private witness inputs</li>
                <li>Donor wallet identity / address linkage</li>
                <li>Un-disclosed local proof variables</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-16 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ReliefShield — Midnight Builder Challenge Level 2</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <a href="https://midnight.network" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
              Midnight.network
            </a>
            <a href="https://docs.midnight.network" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
