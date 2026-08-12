import React from 'react';
import { BarChart3, Download, PieChart, TrendingUp, FileSpreadsheet, FileText } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip } from 'recharts';

interface ReportsPageProps {
  onShowToast: (msg: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onShowToast }) => {
  const categoryData = [
    { name: 'Typhoon Relief', value: 45, color: '#2563eb' },
    { name: 'Earthquake Aid', value: 25, color: '#f59e0b' },
    { name: 'Medical Emergency', value: 15, color: '#16a34a' },
    { name: 'Flood Recovery', value: 15, color: '#0284c7' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-xs text-slate-500">Platform performance, category breakdown, and exportable audit reports.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('CSV Report exported successfully.')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => onShowToast('PDF Audit Report exported successfully.')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold">Total Requests</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">1,248</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold">Approved Rate</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">84.2%</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold">Completed Aid</p>
          <p className="text-2xl font-black text-blue-600 font-mono mt-1">856</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold">Rejected Rate</p>
          <p className="text-2xl font-black text-rose-600 font-mono mt-1">3.1%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Category Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
