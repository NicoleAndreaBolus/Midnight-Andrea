import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit2, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  ArrowUpDown
} from 'lucide-react';
import { ReliefRequest, RequestStatus } from '../types';

interface RequestsPageProps {
  requests: ReliefRequest[];
  onCreateRequest: () => void;
  onSelectRequest: (req: ReliefRequest) => void;
}

export const RequestsPage: React.FC<RequestsPageProps> = ({
  requests,
  onCreateRequest,
  onSelectRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || req.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || req.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Approved</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Completed</span>;
      case 'Under Review':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Under Review</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Pending</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Requests & Case Management</h2>
          <p className="text-xs text-slate-500">Manage and monitor all submitted disaster relief requests.</p>
        </div>
        <button
          onClick={onCreateRequest}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Request</span>
        </button>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search request ID, requester..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-semibold outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-semibold outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Typhoon Relief">Typhoon Relief</option>
              <option value="Earthquake Aid">Earthquake Aid</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Flood Recovery">Flood Recovery</option>
              <option value="Food & Shelter">Food & Shelter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Responsive Table View */}
      <div className="hidden md:block rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Request ID</th>
              <th className="py-3.5 px-4">Requester</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Date Submitted</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Assigned To</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-900 font-medium">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-blue-600">{req.id}</td>
                <td className="py-4 px-4 font-bold">{req.requester}</td>
                <td className="py-4 px-4 text-slate-600">{req.category}</td>
                <td className="py-4 px-4 font-mono text-slate-500">{req.dateSubmitted}</td>
                <td className="py-4 px-4">{getStatusBadge(req.status)}</td>
                <td className="py-4 px-4 text-slate-600">{req.assignedTo}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onSelectRequest(req)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                      title="Edit Case"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No requests found</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden space-y-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-blue-600">{req.id}</span>
              {getStatusBadge(req.status)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{req.requester}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{req.description}</p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
              <span>{req.dateSubmitted}</span>
              <button
                onClick={() => onSelectRequest(req)}
                className="font-semibold text-blue-600"
              >
                View Case Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
