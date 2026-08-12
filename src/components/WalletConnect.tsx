import React from 'react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  network,
  isConnecting,
  error,
  onConnect,
  onDisconnect,
}) => {
  // Format address snippet (e.g. mn_addr...1234)
  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 14)}...${walletAddress.slice(-8)}`
    : '';

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl transition-all">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isConnected ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-rose-500 animate-pulse'}`} />
          <div>
            <h3 className="text-sm font-semibold text-slate-300">Midnight Network Status</h3>
            <p className="text-xs text-slate-400 font-mono">
              {isConnected ? `Network: ${network.toUpperCase()}` : 'Disconnected'}
            </p>
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-300">
              {truncatedAddress}
            </div>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-800/50 rounded-xl transition-all active:scale-95 shadow-md"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting Lace...
              </>
            ) : (
              'Connect Lace Wallet'
            )}
          </button>
        )}
      </div>

      {/* Connected Address Display Card */}
      {isConnected && walletAddress && (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-300 flex items-center justify-between">
          <span className="text-slate-400">Full Wallet Address:</span>
          <span className="text-emerald-400 font-semibold break-all pl-2">{walletAddress}</span>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-start gap-2 animate-shake">
          <span className="font-bold">⚠️ Error:</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
