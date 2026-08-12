import React from 'react';
import { Wallet, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          How ReliefShield Works
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Simple 3-Step Zero-Knowledge Flow
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Understand how Midnight combines total public ledger transparency with complete donor privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="clay-card p-6 space-y-4 hover:border-orange-500/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
            1
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-orange-400" />
              Connect Lace Wallet
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect your Midnight Lace extension. No account creation, passwords, or personal identity details required.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="clay-card p-6 space-y-4 hover:border-orange-500/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
            2
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              Local ZK Proof Generation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your browser memory executes the Compact smart contract circuit locally. Private witnesses are never transmitted.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="clay-card p-6 space-y-4 hover:border-orange-500/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
            3
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Transparent Ledger Update
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The verified proof updates the public relief pool total on-chain while keeping your donor identity 100% confidential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
