import React, { useState } from 'react';
import { User, Building2, Lock, Bell, Sliders, Save } from 'lucide-react';

interface SettingsPageProps {
  onShowToast: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'organization' | 'security' | 'notifications' | 'preferences'>('profile');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Settings successfully saved.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Platform Settings</h2>
        <p className="text-xs text-slate-500">Configure administrative profile, organization preferences, and security.</p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-600 overflow-x-auto">
        {(['profile', 'organization', 'security', 'notifications', 'preferences'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-blue-600 text-white font-bold shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6 max-w-xl">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Profile Information</h3>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input type="email" defaultValue="john.doe@reliefshield.org" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <input type="text" defaultValue="+1 (555) 019-2834" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Security Settings</h3>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none" />
              </div>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Organization Settings</h3>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Organization Name</label>
                <input type="text" defaultValue="ReliefShield Global Operations" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
};
