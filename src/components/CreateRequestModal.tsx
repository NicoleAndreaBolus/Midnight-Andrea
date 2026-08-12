import React, { useState } from 'react';
import { X, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { ReliefRequest } from '../types';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReq: Partial<ReliefRequest>) => void;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [requester, setRequester] = useState('');
  const [category, setCategory] = useState<'Typhoon Relief' | 'Earthquake Aid' | 'Medical Emergency' | 'Flood Recovery' | 'Food & Shelter'>('Typhoon Relief');
  const [amount, setAmount] = useState<number>(500);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      requester: requester || 'Verifiable Resident',
      category,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: 'Unassigned',
      amountRequested: amount,
      location: location || 'Disaster Zone',
      description,
      timeline: [
        { title: 'Request Submitted', timestamp: 'Just now', completed: true },
        { title: 'Under Local Review', timestamp: 'Pending', completed: false }
      ]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Create Relief Request</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Requester Name / Organization</label>
            <input
              type="text"
              required
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              placeholder="e.g. Maria Santos / Red Cross Chapter"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Typhoon Relief">Typhoon Relief</option>
                <option value="Earthquake Aid">Earthquake Aid</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Flood Recovery">Flood Recovery</option>
                <option value="Food & Shelter">Food & Shelter</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Amount (tNIGHT)</label>
              <input
                type="number"
                min="10"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Cebu Province, Philippines"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Request Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide emergency details and resource breakdown..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
