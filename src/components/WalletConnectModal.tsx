import React from 'react';
import { Shield, ExternalLink, X, AlertCircle, CheckCircle2, Wallet } from 'lucide-react';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  isLaceInstalled: boolean;
  errorMessage: string | null;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  isLaceInstalled,
  errorMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#EFEBE6] shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#EFEBE6] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#ea580c] flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1C1917]">Midnight Lace Connection</h3>
              <p className="text-[11px] text-[#78716C]">Official Midnight DApp Connector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isLaceInstalled ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                <AlertCircle className="w-4 h-4 text-[#ea580c]" />
                <span>Lace Extension Not Detected</span>
              </div>
              <p className="leading-relaxed">
                The <strong>Midnight Lace Wallet</strong> extension was not detected in this browser tab.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#78716C]">
              <p className="font-bold text-[#1C1917]">Quick Troubleshooting Steps:</p>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>Make sure you have the <strong>Midnight Lace Chrome Extension</strong> installed.</li>
                <li>Check your browser extension settings to ensure Lace has access to <strong>relief-shield.vercel.app</strong>.</li>
                <li>Unlock your Lace wallet in your browser toolbar before connecting.</li>
              </ol>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href="https://chromewebstore.google.com/detail/midnight-lace/jaebnkeghdfbbkfdckhfpflfaeafpjnp"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#d97706] text-white font-bold text-xs shadow-md shadow-[#ea580c]/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Install Midnight Lace Extension</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onRetry}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#EFEBE6] hover:bg-stone-200/60 text-[#1C1917] font-bold text-xs transition-all"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Midnight Lace Detected</span>
              </div>
              <p>
                Click below to request the authorization popup from your Lace extension.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {errorMessage}
              </div>
            )}

            <button
              onClick={onRetry}
              className="w-full py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#d97706] text-white font-bold text-xs shadow-md shadow-[#ea580c]/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Authorize Connection in Lace</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
