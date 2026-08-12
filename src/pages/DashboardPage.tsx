import React, { useState } from 'react';
import { 
  FileText, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  ShieldCheck, 
  ArrowUpRight,
  Shield,
  Lock,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { mockChartData, mockActivities } from '../data/mockData';

interface DashboardPageProps {
  onCreateRequest: () => void;
  onViewRequests: () => void;
  isConnected: boolean;
  counterState: number;
  isExecutingCircuit: boolean;
  lastTxHash: string | null;
  onExecuteCircuit: (amount: number) => Promise<{ txHash: string; newBalance: number }>;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onCreateRequest,
  onViewRequests,
  isConnected,
  counterState,
  isExecutingCircuit,
  lastTxHash,
  onExecuteCircuit,
}) => {
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '3M' | '1Y'>('7D');
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [circuitSuccess, setCircuitSuccess] = useState<string | null>(null);

  const handleCircuitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    try {
      const res = await onExecuteCircuit(donationAmount);
      setCircuitSuccess(res.txHash);
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    {
      label: 'Total Requests',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      subtext: 'vs last month',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      label: 'Active Cases',
      value: '324',
      change: '+8.2%',
      trend: 'up',
      subtext: 'vs last month',
      icon: Activity,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      label: 'Completed',
      value: '856',
      change: '+14.3%',
      trend: 'up',
      subtext: 'vs last month',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      label: 'Pending Review',
      value: '68',
      change: '-5.4%',
      trend: 'down',
      subtext: 'vs last month',
      icon: Clock,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, Admin</h2>
          <p className="text-xs text-slate-500 font-medium">Here's an overview of your platform activity & Midnight ZK status.</p>
        </div>
        <button
          onClick={onCreateRequest}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Request</span>
        </button>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stat.value}</span>
                <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Analytics & Interactive ZK Circuit Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart Section (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Activity Overview</h3>
              <p className="text-xs text-slate-500">Submitted vs Completed relief requests</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {(['7D', '30D', '3M', '1Y'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    timeFilter === filter ? 'bg-white text-blue-600 shadow-sm font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }} />
                <Area type="monotone" dataKey="Requests" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                <Area type="monotone" dataKey="Completed" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive ZK Circuit Action Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-900 text-white border border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Midnight Smart Contract
              </span>
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>

            <h3 className="text-lg font-bold text-white mt-3">Execute ZK Relief Circuit</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Contribute to the public relief pool using Zero-Knowledge proofs. Your private witness remains on your machine.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Public Relief Pool:</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">${counterState.toLocaleString()} tNIGHT</span>
            </div>
          </div>

          <form onSubmit={handleCircuitSubmit} className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Shielded Amount (tNIGHT)</label>
              <input
                type="number"
                min="1"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                disabled={!isConnected || isExecutingCircuit}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-blue-500 outline-none disabled:opacity-50"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Proved without revealing your input</span>
            </div>

            <button
              type="submit"
              disabled={!isConnected || isExecutingCircuit}
              className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isExecutingCircuit ? (
                <span>Generating ZK Proof in Browser...</span>
              ) : !isConnected ? (
                'Connect Wallet to Execute'
              ) : (
                'Execute Circuit (Shielded Contribution)'
              )}
            </button>
          </form>

          {circuitSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-[11px] text-emerald-300 font-mono break-all">
              ✓ Tx Hash: {circuitSuccess.slice(0, 24)}...
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
            <p className="text-xs text-slate-500">Real-time audit log of platform actions</p>
          </div>
          <button
            onClick={onViewRequests}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View all cases</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {mockActivities.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{act.user}</p>
                  <p className="text-xs text-slate-500">{act.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  act.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  act.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {act.status}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">{act.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
