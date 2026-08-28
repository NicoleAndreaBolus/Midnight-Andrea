import React from 'react';
import { Shield, Lock, ExternalLink, Heart } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

interface LayoutProps {
  children: React.ReactNode;
  isConnected: boolean;
  walletAddress: string | null;
  walletBalance: number;
  network: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onOpenDashboard?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isConnected,
  walletAddress,
  walletBalance,
  network,
  isConnecting,
  onConnect,
  onDisconnect,
  onOpenDashboard,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#ea580c] selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#EFEBE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center font-black shadow-md shadow-[#ea580c]/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">ReliefShield</span>
              <span className="block text-[10px] text-[#78716C] font-semibold tracking-wider uppercase">
                Midnight Network
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EFEBE6] hover:bg-stone-100 text-xs font-bold text-[#1C1917] transition-all shadow-sm"
              >
                <span>Admin View</span>
              </button>
            )}

            <WalletConnect
              isConnected={isConnected}
              walletAddress={walletAddress}
              walletBalance={walletBalance}
              network={network}
              isConnecting={isConnecting}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EFEBE6] bg-white/50 py-6 text-center text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#ea580c]" />
            <span className="font-bold text-[#1C1917]">ReliefShield</span>
            <span>— Zero-Knowledge Disaster Relief on Midnight</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://relief-shield.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ea580c] flex items-center gap-1 transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/NicoleAndreaBolus/Midnight-Andrea"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ea580c] flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
