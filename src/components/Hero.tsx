import React from 'react';
import { ShieldCheck, Lock, Heart, EyeOff, Sparkles } from 'lucide-react';

interface HeroProps {
  totalRaised: number;
}

export const Hero: React.FC<HeroProps> = ({ totalRaised }) => {
  return (
    <section className="text-center max-w-4xl mx-auto pt-6 pb-4 space-y-6 relative">
      {/* Floating Orange Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/15 blur-[100px] pointer-events-none rounded-full" />

      {/* Security Badge Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge-orange border border-orange-400/40 text-xs font-bold text-orange-950 shadow-sm animate-float">
        <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm">
          <Lock className="w-3 h-3" />
        </div>
        <span>Midnight Zero-Knowledge Privacy Protocol</span>
      </div>

      {/* Main Reference Headline: Anonymous Donation */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Anonymous Donation
        </h1>
        <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-bold">
          <span className="text-slate-300">Give with heart.</span>
          <span className="text-orange-500 font-extrabold flex items-center gap-1.5">
            Stay anonymous.
            <Heart className="w-5 h-5 fill-orange-500 text-orange-500 inline" />
          </span>
        </div>
      </div>

      <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Support emergency natural disaster relief campaigns on the Midnight Network. 
        Your contribution updates the public relief ledger in real-time while your identity, wallet address, and personal net worth remain 100% private.
      </p>

      {/* SaaS Platform Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center shadow-sm backdrop-blur-md">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Relief Pool</p>
          <p className="text-xl font-extrabold text-orange-400 font-mono mt-1">${totalRaised.toLocaleString()} tNIGHT</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center shadow-sm backdrop-blur-md">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Shielded Donors</p>
          <p className="text-xl font-extrabold text-emerald-400 font-mono mt-1">1,420+</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center shadow-sm backdrop-blur-md">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Campaigns</p>
          <p className="text-xl font-extrabold text-cyan-400 font-mono mt-1">3 Zones</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center shadow-sm backdrop-blur-md">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ZK Proofs Verified</p>
          <p className="text-xl font-extrabold text-amber-400 font-mono mt-1">100%</p>
        </div>
      </div>
    </section>
  );
};
