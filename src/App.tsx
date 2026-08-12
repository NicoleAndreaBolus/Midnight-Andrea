import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DonationCard } from './components/DonationCard';
import { FeatureBar } from './components/FeatureBar';
import { HowItWorks } from './components/HowItWorks';
import { PrivacyMatrix } from './components/PrivacyMatrix';
import { Shield, Github, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-orange-500 selection:text-white font-sans antialiased relative">
      {/* Ambient Radial Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Header Bar */}
      <Navbar
        isConnected={isConnected}
        walletAddress={walletAddress}
        network={network}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />

      {/* Main SaaS Web Application Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">
        {/* Hero Headline & Platform Metrics */}
        <Hero totalRaised={counterState} />

        {/* Primary Interactive Claymorphic Donation Card */}
        <DonationCard
          isConnected={isConnected}
          counterState={counterState}
          isExecutingCircuit={isExecutingCircuit}
          lastTxHash={lastTxHash}
          onExecuteCircuit={executeCircuit}
        />

        {/* 3-Pillar Feature Bar matching Reference Design */}
        <FeatureBar />

        {/* 3-Step "How It Works" Section */}
        <HowItWorks />

        {/* Privacy Audit Guarantee Matrix */}
        <PrivacyMatrix />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-20 py-10 bg-slate-950/90 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-white">ReliefShield</p>
              <p className="text-[11px] text-slate-400">Midnight Builder Challenge Level 2</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="https://github.com/NicoleAndreaBolus/Midnight-Andrea" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a href="https://midnight.network" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">
              Midnight Network
            </a>
            <a href="https://docs.midnight.network" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
