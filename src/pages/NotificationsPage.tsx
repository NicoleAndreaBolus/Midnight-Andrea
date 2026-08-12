import React from 'react';
import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsPageProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAllAsRead,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notification Center</h2>
          <p className="text-xs text-slate-500">Platform updates, audit notifications, and system alerts.</p>
        </div>
        <button
          onClick={onMarkAllAsRead}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <CheckCheck className="w-4 h-4 text-blue-600" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 flex items-center justify-between gap-4 transition-colors ${n.read ? 'bg-white' : 'bg-blue-50/40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-xs ${n.read ? 'text-slate-700' : 'font-bold text-slate-900'}`}>{n.title}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{n.timestamp}</p>
              </div>
            </div>
            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
