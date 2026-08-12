import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Lock, 
  Truck, 
  QrCode, 
  CheckCircle2, 
  Zap, 
  Users, 
  ShieldCheck, 
  Heart, 
  EyeOff, 
  TrendingUp, 
  Sparkles,
  ExternalLink,
  Wallet
} from 'lucide-react';

interface SariPayLandingProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onOpenDashboard: () => void;
  counterState: number;
  isExecutingCircuit: boolean;
  onExecuteCircuit: (amount: number) => Promise<{ txHash: string; newBalance: number }>;
}

export const SariPayLanding: React.FC<SariPayLandingProps> = ({
  isConnected,
  walletAddress,
  network,
  isConnecting,
  onConnect,
  onDisconnect,
  onOpenDashboard,
  counterState,
  isExecutingCircuit,
  onExecuteCircuit,
}) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'donor' | 'admin'>('donor');
  const [contributionAmount, setContributionAmount] = useState<number>(100);
  const [txResultHash, setTxResultHash] = useState<string | null>(null);

  const handleCircuitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    try {
      const res = await onExecuteCircuit(contributionAmount);
      setTxResultHash(res.txHash);
    } catch (err) {
      console.error(err);
    }
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
    : '';

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#059669] selection:text-white">
      {/* Sticky Navigation Bar (Matching SariPay style) */}
      <nav className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo with Emerald Gradient Shield */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#34D399] p-0.5 shadow-md shadow-[#059669]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#FAFAF9] rounded-[14px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#059669]" />
              </div>
            </div>
            <span className="font-sans font-extrabold text-xl text-[#111827] tracking-tight">
              Relief<span className="text-[#059669]">Shield</span>
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#6B7280]">
            <a href="#features" className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#059669] hover:after:w-full after:transition-all">Features</a>
            <a href="#how-it-works" className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#059669] hover:after:w-full after:transition-all">How It Works</a>
            <a href="#solutions" className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#059669] hover:after:w-full after:transition-all">Live Demo</a>
            <a href="#security" className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#059669] hover:after:w-full after:transition-all">Security</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
                  {truncatedAddress}
                </span>
                <button
                  onClick={onDisconnect}
                  className="text-xs font-semibold text-[#6B7280] hover:text-rose-600 px-2 py-1"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="hidden sm:inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F3F4F6] transition-all"
              >
                {isConnecting ? 'Connecting...' : 'Connect Lace'}
              </button>
            )}

            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center justify-center text-xs font-bold px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white shadow-sm shadow-[#059669]/20 active:scale-95 transition-all gap-2"
            >
              <span>Open SaaS Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Dual Column matching SariPay flow) */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#059669]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#059669]/10 rounded-full border border-[#059669]/20 text-xs font-semibold text-[#059669] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Midnight ZK Disaster Relief & Shielded Escrow Network
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12] mb-6">
            Transparent Funds.<br />
            <span className="text-[#059669]">Shielded Donors.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed mb-8 max-w-xl">
            ReliefShield protects donor privacy and disaster victim dignity through Zero-Knowledge smart contract escrow circuits on the Midnight Network, ensuring 100% verified ledger transparency without exposing identity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onConnect}
              className="px-8 py-3.5 bg-[#059669] hover:bg-[#10B981] text-white text-sm font-extrabold rounded-xl shadow-md shadow-[#059669]/20 flex items-center justify-center gap-2.5 transition-all"
            >
              <span>{isConnected ? 'Wallet Connected ✓' : 'Connect Wallet to Contribute'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDashboard}
              className="px-8 py-3.5 bg-white text-[#111827] border border-[#E5E7EB] text-sm font-bold rounded-xl hover:bg-stone-50 shadow-sm flex items-center justify-center gap-2.5 transition-all"
            >
              View Admin Dashboard
            </button>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-[#E5E7EB] w-full">
            <div>
              <p className="text-2xl font-black text-[#111827]">99.9%</p>
              <p className="text-xs text-[#6B7280] font-normal mt-1">ZK Proof Verification Rate</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#059669] font-mono">${counterState.toLocaleString()} tNIGHT</p>
              <p className="text-xs text-[#6B7280] font-normal mt-1">Total Public Relief Pool</p>
            </div>
          </div>
        </div>

        {/* Hero Right Column: Interactive Live App Card (Matching SariPay browser card) */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full z-10">
          <div className="w-full max-w-[540px] bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden relative">
            {/* Mock Browser Header */}
            <div className="bg-[#FAFAF9] border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
              </div>
              <div className="text-[10px] text-[#6B7280] font-mono bg-white px-6 py-0.5 rounded-md border border-[#E5E7EB] select-none">
                dashboard.reliefshield.org/zk-escrow
              </div>
              <div className="w-10" />
            </div>

            {/* Live Interactive Form inside Card */}
            <div className="p-6 bg-[#FAFAF9]/40 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Public Relief Pool</span>
                  <span className="text-lg font-black text-[#111827] font-mono mt-1 block">${counterState.toLocaleString()}.00</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm relative overflow-hidden">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Privacy Protocol</span>
                  <span className="text-sm font-bold text-[#059669] mt-1 block flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#059669]" />
                    ZK Witness Active
                  </span>
                  <span className="absolute top-3 right-3 text-[9px] bg-[#059669]/10 text-[#059669] px-2 py-0.5 rounded-full font-semibold border border-[#059669]/10">
                    Preprod
                  </span>
                </div>
              </div>

              {/* Interactive Contribution Form */}
              <form onSubmit={handleCircuitSubmit} className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#111827]">Shielded Contribution (tNIGHT)</span>
                  <span className="text-[10px] text-[#6B7280] font-mono">Proved without revealing input</span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(Number(e.target.value))}
                    disabled={!isConnected || isExecutingCircuit}
                    className="w-full bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm font-mono font-bold text-[#111827] focus:border-[#059669] outline-none"
                    placeholder="100.00"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isConnected || isExecutingCircuit}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#059669] hover:bg-[#10B981] shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isExecutingCircuit ? (
                    <span>Proving ZK Circuit locally...</span>
                  ) : !isConnected ? (
                    'Connect Wallet to Execute ZK Circuit'
                  ) : (
                    'Execute ZK Contribution Circuit'
                  )}
                </button>
              </form>

              {txResultHash && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-[11px] font-mono text-emerald-800 break-all">
                  ✓ Tx Hash: {txResultHash}
                </div>
              )}
            </div>
          </div>

          {/* Floating Mobile QR Card (Matching SariPay reference design overlay) */}
          <div className="absolute bottom-[-24px] right-[-10px] md:right-[-20px] w-[190px] bg-white rounded-3xl border-4 border-[#111827] shadow-2xl overflow-hidden hidden sm:block animate-float">
            <div className="bg-[#111827] h-4 w-28 mx-auto rounded-b-xl flex justify-center items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
            <div className="p-3 bg-white text-left flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-1.5">
                <span className="text-[8px] font-bold text-[#6B7280] font-mono">Aid QR Handoff</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex flex-col items-center bg-[#FAFAF9] p-2 rounded-xl border border-[#E5E7EB] text-center">
                <p className="text-[9px] font-bold text-[#111827]">Disaster Aid Verification</p>
                <div className="w-20 h-20 my-2 bg-white border border-[#E5E7EB] p-1.5 rounded-lg flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#111827]" />
                </div>
                <span className="text-[8px] text-[#6B7280]">Show to Field Officer</span>
              </div>
              <div className="bg-[#059669]/10 rounded-lg p-1.5 border border-[#059669]/20 text-center">
                <p className="text-[9px] font-bold text-[#059669]">ZK Proof Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner Section (Matching SariPay structure) */}
      <section className="w-full bg-white border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">$500K+</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Processed Relief</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">1,420+</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Shielded Donors</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">100%</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">ZK Verified</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">99.9%</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Ledger Uptime</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#059669]">Zero</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Identity Leakage</p>
          </div>
        </div>
      </section>

      {/* 6 Core Capabilities Section (Matching SariPay features section) */}
      <section id="features" className="w-full bg-[#FAFAF9] py-24 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#059669] text-xs font-bold uppercase tracking-widest block mb-3">Core Platform Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">Built for Zero-Knowledge Trust</h2>
            <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">ReliefShield removes identity exposure while delivering complete public transaction verification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Smart ZK Escrow</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Donation funds are secured in Compact smart contracts before release to authorized disaster logistics.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">QR Aid Verification</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Disaster victims scan secure QR handoff codes for physical aid delivery without revealing legal names.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Public Fund Transparency</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Real-time public tally on the Midnight Preprod ledger allows anyone to audit accumulated relief funds.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <EyeOff className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Donor Privacy Guarantee</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Private witness inputs remain inside your browser memory. Wallet addresses are never leaked on-chain.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Instant Settlement</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Verified zero-knowledge circuits trigger immediate aid grant release to field units in under 5 seconds.</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-sm hover:border-[#059669]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Auditor Trust Alignment</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">Align relief organizations and public donors with auditable, zero-knowledge cryptographic proofs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works Section (Matching SariPay 4-box step flow) */}
      <section id="how-it-works" className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="mb-16">
          <span className="text-[#059669] text-xs font-bold uppercase tracking-widest block mb-3">Simple Handoff Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">How ReliefShield Works</h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">
            A frictionless zero-knowledge relief cycle designed to protect both the donor and the disaster victim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm text-center relative group hover:border-[#059669]/40 transition-all">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB]">01</span>
            <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-6 mx-auto">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Connect Wallet</h3>
            <p className="text-xs text-[#6B7280]">Donor connects Midnight Lace wallet without filling personal KYC forms.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm text-center relative group hover:border-[#059669]/40 transition-all">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB]">02</span>
            <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-6 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Execute ZK Circuit</h3>
            <p className="text-xs text-[#6B7280]">Local Compact prover generates zero-knowledge proof in browser memory.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm text-center relative group hover:border-[#059669]/40 transition-all">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB]">03</span>
            <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-6 mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">QR Aid Verification</h3>
            <p className="text-xs text-[#6B7280]">Disaster victims verify relief claim using secure QR handoff tokens.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm text-center relative group hover:border-[#059669]/40 transition-all">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB]">04</span>
            <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-6 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Automatic Settlement</h3>
            <p className="text-xs text-[#6B7280]">Verified proof updates the public relief pool on-chain automatically.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#111827] text-white py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base">ReliefShield</span>
          </div>

          <p className="text-slate-400">
            © 2026 ReliefShield — Midnight Builder Challenge Level 2 Project
          </p>

          <div className="flex items-center gap-6 font-medium text-slate-300">
            <a href="https://github.com/NicoleAndreaBolus/Midnight-Andrea" target="_blank" rel="noreferrer" className="hover:text-[#059669] transition-colors">
              GitHub Repo
            </a>
            <a href="https://midnight.network" target="_blank" rel="noreferrer" className="hover:text-[#059669] transition-colors">
              Midnight Network
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
