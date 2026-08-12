import React from 'react';
import { UserX, EyeOff, Heart, ShieldCheck } from 'lucide-react';

export const FeatureBar: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto my-10">
      <div className="clay-card p-6 sm:p-8 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {/* Feature 1 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <UserX className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">No Personal Information</h4>
              <p className="text-xs text-orange-100 mt-0.5">Zero KYC, names, or addresses required.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <EyeOff className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">100% Private & Confidential</h4>
              <p className="text-xs text-orange-100 mt-0.5">Protected by Midnight ZK proofs.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Focus on What Matters</h4>
              <p className="text-xs text-orange-100 mt-0.5">Transparent aid to disaster victims.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
