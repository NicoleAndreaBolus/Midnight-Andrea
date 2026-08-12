import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Wallet, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface TopNavProps {
  activeTab: ActiveTab;
  sidebarCollapsed: boolean;
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  sidebarCollapsed,
  isConnected,
  walletAddress,
  network,
  isConnecting,
  onConnect,
  onDisconnect,
  onOpenNotifications,
  unreadCount,
}) => {
  const getPageTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'dashboard': return 'Platform Overview';
      case 'requests': return 'Requests & Case Management';
      case 'request-detail': return 'Case Details View';
      case 'organizations': return 'Organizations & Directory';
      case 'reports': return 'Performance & Analytics';
      case 'notifications': return 'Notification Center';
      case 'settings': return 'Platform Settings';
      default: return 'Dashboard';
    }
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
    : '';

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white border-b border-surface-border z-30 transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Left Breadcrumb & Page Title */}
      <div className="flex items-center gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>ReliefShield</span>
            <span>/</span>
            <span className="text-slate-700 capitalize">{activeTab.replace('-', ' ')}</span>
          </nav>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">
            {getPageTitle(activeTab)}
          </h1>
        </div>
      </div>

      {/* Right Actions & Controls */}
      <div className="flex items-center gap-4">
        {/* Compact Search */}
        <div className="relative hidden md:block w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search requests, IDs..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        {/* Midnight Network Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Midnight <strong className="text-blue-600">PREPROD</strong></span>
        </div>

        {/* Wallet Connect Control */}
        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{truncatedAddress}</span>
            </div>
            <button
              onClick={onDisconnect}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{isConnecting ? 'Connecting...' : 'Connect Lace'}</span>
          </button>
        )}

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>

        {/* Help Icon */}
        <button
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all hidden sm:block"
          title="Help & Midnight Docs"
          onClick={() => window.open('https://docs.midnight.network', '_blank')}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User Avatar"
            className="w-8 h-8 rounded-lg object-cover border border-slate-200"
          />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
