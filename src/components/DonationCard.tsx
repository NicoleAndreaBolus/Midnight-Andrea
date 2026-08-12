import React, { useState } from 'react';
import { Heart, Lock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Sparkles, UserCheck, Shield } from 'lucide-react';

interface DonationCardProps {
  isConnected: boolean;
  counterState: number;
  isExecutingCircuit: boolean;
  lastTxHash: string | null;
  onExecuteCircuit: (secretAmount: number) => Promise<{ txHash: string; newBalance: number }>;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  isConnected,
  counterState,
  isExecutingCircuit,
  lastTxHash,
  onExecuteCircuit,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState<string>('100');
  const [activeTab, setActiveTab] = useState<'donor' | 'victim'>('donor');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('typhoon');
  const [txSuccessInfo, setTxSuccessInfo] = useState<{ txHash: string; amount: number } | null>(null);
  const [circuitError, setCircuitError] = useState<string | null>(null);

  const getEffectiveAmount = (): number => {
    if (selectedPreset === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 10 : parsed;
    }
    return selectedPreset;
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    setCircuitError(null);
    const amount = getEffectiveAmount();

    try {
      const result = await onExecuteCircuit(amount);
      setTxSuccessInfo({
        txHash: result.txHash,
        amount,
      });
    } catch (err: any) {
      setCircuitError(err?.message || 'Circuit execution failed.');
    }
  };

  return (
    <div id="donate" className="w-full max-w-2xl mx-auto my-6 relative">
      {/* Light Claymorphic Card Container matching reference image */}
      <div className="clay-card-light p-6 sm:p-10 text-slate-900 transition-all relative z-10">
        
        {/* Mode Switcher: Shielded Donor vs Victim Aid Claim */}
        <div className="flex items-center justify-center p-1.5 rounded-2xl bg-slate-200/80 mb-8 border border-slate-300/80">
          <button
            type="button"
            onClick={() => setActiveTab('donor')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'donor'
                ? 'bg-white text-orange-600 shadow-md border border-orange-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>Shielded Donor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('victim')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'victim'
                ? 'bg-white text-emerald-600 shadow-md border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>Victim Aid Claim (ZK)</span>
          </button>
        </div>

        {/* Campaign Selection Header */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
              Active Disaster Campaign
            </span>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="mt-1 block font-extrabold text-lg text-slate-900 bg-transparent border-none p-0 focus:ring-0 cursor-pointer"
            >
              <option value="typhoon">🌀 Typhoon Relief Emergency Fund</option>
              <option value="earthquake">🌋 Earthquake Shelter & Medical Aid</option>
              <option value="flood">🌧️ Flood Disaster Rescue Operation</option>
            </select>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Public Relief Pool</p>
            <p className="text-2xl font-black text-orange-600 font-mono">${counterState.toLocaleString()}.00</p>
          </div>
        </div>

        {activeTab === 'donor' ? (
          <form onSubmit={handleDonateSubmit} className="space-y-6">
            {/* Card Subtitle matching reference */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                Select an Amount to Donate
              </h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60">
                ZK Shielded
              </span>
            </div>

            {/* Input Box matching reference design (Amount $ | Value) */}
            <div className="flex items-center rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-inner focus-within:border-orange-500 transition-all">
              <div className="px-5 py-4 bg-slate-50 border-r border-slate-200 font-extrabold text-slate-600 text-sm flex items-center gap-1">
                <span>Amount</span>
                <span className="text-orange-500">$</span>
              </div>
              <input
                type="number"
                min="1"
                step="any"
                value={selectedPreset === 'custom' ? customAmount : selectedPreset}
                onChange={(e) => {
                  setSelectedPreset('custom');
                  setCustomAmount(e.target.value);
                }}
                disabled={!isConnected || isExecutingCircuit}
                className="w-full px-5 py-4 font-mono font-bold text-xl text-slate-900 bg-transparent border-none focus:ring-0 outline-none disabled:opacity-50"
                placeholder="100.00"
                required
              />
            </div>

            {/* Presets Grid matching reference design */}
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setSelectedPreset(50)}
                className={`py-4 rounded-2xl font-black text-base transition-all ${
                  selectedPreset === 50 ? 'clay-pill-active' : 'clay-pill-inactive'
                }`}
              >
                $50.00
              </button>

              <button
                type="button"
                onClick={() => setSelectedPreset(150)}
                className={`py-4 rounded-2xl font-black text-base transition-all ${
                  selectedPreset === 150 ? 'clay-pill-active' : 'clay-pill-inactive'
                }`}
              >
                $150.00
              </button>

              <button
                type="button"
                onClick={() => setSelectedPreset(100)}
                className={`py-4 rounded-2xl font-black text-base transition-all ${
                  selectedPreset === 100 ? 'clay-pill-active' : 'clay-pill-inactive'
                }`}
              >
                $100.00
              </button>

              <button
                type="button"
                onClick={() => setSelectedPreset('custom')}
                className={`py-4 rounded-2xl font-extrabold text-sm transition-all ${
                  selectedPreset === 'custom' ? 'clay-pill-active' : 'clay-pill-inactive'
                }`}
              >
                Custom Amount
              </button>
            </div>

            {/* Dual Action Area matching reference design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Vibrant Orange "Donate Now" Button */}
              <button
                type="submit"
                disabled={!isConnected || isExecutingCircuit}
                className="clay-button-orange py-4 px-6 rounded-2xl font-black text-base text-white flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {isExecutingCircuit ? (
                  <span className="flex items-center gap-2 text-sm">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Proving ZK...
                  </span>
                ) : !isConnected ? (
                  <span>Connect Lace to Donate</span>
                ) : (
                  <>
                    <span>Donate Now</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-white text-white" />
                    </div>
                  </>
                )}
              </button>

              {/* Security Trust Badge Box matching reference design */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-snug">Your donation.</p>
                  <p className="text-xs font-bold text-orange-600 leading-snug">Your identity stays private.</p>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Victim Aid Claim Mode */
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Zero-Knowledge Victim Aid Grant</span>
              </div>
              <p>
                If you are an affected resident in a declared disaster zone, you can claim emergency aid with full dignity. The ZK circuit verifies your eligibility proof without revealing your legal name or home location on the public blockchain.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800">Disaster Resident Verification Code</label>
              <input
                type="text"
                placeholder="Enter private disaster registration code..."
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              onClick={() => handleDonateSubmit({ preventDefault: () => {} } as any)}
              disabled={!isConnected || isExecutingCircuit}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg disabled:opacity-50"
            >
              {isExecutingCircuit ? 'Proving Victim Eligibility in ZK...' : 'Claim $100 Emergency Aid (Zero-Data)'}
            </button>
          </div>
        )}

        {/* Loading Indicator Details during ZK Proof Generation */}
        {isExecutingCircuit && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2 animate-pulse shadow-xl">
            <div className="flex items-center justify-between text-orange-400 font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Local Proof Server Active
              </span>
              <span>Executing Circuit...</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Evaluating local witness variables in browser memory. Proving that valid donation funds are added to the campaign without transmitting raw private keys or personal identity.
            </p>
          </div>
        )}

        {/* Transaction Success Output */}
        {txSuccessInfo && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-950 text-white text-xs space-y-2 border border-emerald-700 shadow-xl">
            <div className="flex items-center justify-between text-emerald-300 font-black text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                On-Chain State Updated
              </span>
              <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-full font-mono">Confirmed</span>
            </div>
            <p className="text-slate-200">
              Contribution of <strong className="text-emerald-300 font-mono">${txSuccessInfo.amount} tNIGHT</strong> successfully proved. Public relief pool is now <strong className="text-emerald-300 font-mono">${counterState} tNIGHT</strong>.
            </p>
            <div className="pt-2 border-t border-emerald-800/80 font-mono text-[11px] text-slate-300 break-all">
              <span className="text-slate-400">Transaction Hash: </span>
              <span className="text-cyan-300">{txSuccessInfo.txHash}</span>
            </div>
          </div>
        )}

        {circuitError && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{circuitError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
