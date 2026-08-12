import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Paperclip, 
  User, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Edit3, 
  Check, 
  X 
} from 'lucide-react';
import { ReliefRequest } from '../types';

interface RequestDetailPageProps {
  request: ReliefRequest;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const RequestDetailPage: React.FC<RequestDetailPageProps> = ({
  request,
  onBack,
  onShowToast,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Link & Header */}
      <div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Requests</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 font-mono">{request.id}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {request.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{request.category} • Submitted on {request.dateSubmitted}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast(`Request ${request.id} status updated to Approved.`)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>

            <button
              onClick={() => onShowToast(`Request ${request.id} status updated to Rejected.`)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-200"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Information & Attachments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Request Information
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Requester:</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{request.requester}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Amount Requested:</span>
                <span className="font-extrabold text-blue-600 font-mono mt-0.5 block">${request.amountRequested} tNIGHT</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Location:</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{request.location}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Assigned Staff:</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{request.assignedTo}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-slate-400 font-medium text-xs block mb-1">Description:</span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                {request.description}
              </p>
            </div>

            {/* Attachments Section */}
            {request.attachments && (
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-900 block mb-2">Attachments ({request.attachments.length})</span>
                <div className="flex flex-wrap gap-2">
                  {request.attachments.map((file, idx) => (
                    <div key={idx} className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Vertical Activity Timeline */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Activity Timeline
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {request.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                  step.completed ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                }`}>
                  {step.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{step.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
