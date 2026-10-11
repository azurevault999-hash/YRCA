import React from 'react';
import {
  User,
  Shield,
  Phone,
  Calendar,
  X,
  LogOut,
  HardDrive,
  Award,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setAuthModalOpen, logoutUser, manuals, videos } = useApp();

  if (!isOpen) return null;

  const cachedCount = manuals.filter(m => m.offlineCached).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-military">
                Personnel Profile Dossier
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                YRCCC Operational Learner Record
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dossier Card */}
        <div className="space-y-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Full Name & Rank:</span>
            <span className="text-slate-200 font-semibold">{currentUser.rank} {currentUser.fullName}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Service Number:</span>
            <span className="font-mono font-bold text-amber-400">{currentUser.serviceNumber}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Assigned Unit:</span>
            <span className="text-slate-200">{currentUser.unit}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Registered Contact:</span>
            <span className="font-mono text-slate-300">{currentUser.phone}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Current Cohort:</span>
            <span className="text-slate-300">{currentUser.cohort}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Active Role:</span>
            <span className="text-amber-400 font-mono font-semibold uppercase">{currentUser.role}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400 font-mono">Offline Storage:</span>
            <span className="text-emerald-400 font-mono">{cachedCount} manuals cached</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              setAuthModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 text-xs font-mono font-semibold flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Switch Role or Service ID</span>
          </button>

          <button
            onClick={() => {
              logoutUser();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 text-xs font-mono font-semibold flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Reset to Baseline Learner</span>
          </button>
        </div>
      </div>
    </div>
  );
};
