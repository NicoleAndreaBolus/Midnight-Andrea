import React from 'react';
import { Shield, Lock, Wallet, ExternalLink, CheckCircle, ChevronDown } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  walletAddress,
  network,
  isConnecting,
  onConnect,
  onDisconnect,
}) => {
  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}`
    : '';

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-400 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">ReliefShield</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                Midnight ZK
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Zero-Knowledge Transparent Disaster Relief
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#donate" className="hover:text-orange-400 transition-colors">Donate</a>
          <a href="#how-it-works" className="hover:text-orange-400 transition-colors">How It Works</a>
          <a href="#privacy-claim" className="hover:text-orange-400 transition-colors">Privacy Audit</a>
          <a href="#tech-stack" className="hover:text-orange-400 transition-colors">Tech Stack</a>
        </nav>

        {/* Action Controls & Wallet Connection */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Network: <strong className="text-orange-400">{network.toUpperCase()}</strong></span>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-orange-300 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{truncatedAddress}</span>
              </div>
              <button
                onClick={onDisconnect}
                className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-rose-950/30 border border-slate-800 rounded-xl transition-all active:scale-95"
                title="Disconnect Wallet"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="clay-button-orange text-xs font-extrabold text-white px-5 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4 text-white" />
              <span>{isConnecting ? 'Connecting Lace...' : 'Connect Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
