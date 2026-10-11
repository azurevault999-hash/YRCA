import React, { useState } from 'react';
import {
  Shield,
  Lock,
  X,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  User,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_PROFILES } from '../data/mockData';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, switchUser } = useApp();

  const [serviceNumber, setServiceNumber] = useState('');
  const [rank, setRank] = useState('Captain');
  const [unit, setUnit] = useState('9 PARA (Special Forces)');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [role, setRole] = useState<UserRole>('student');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [securityAcknowledged, setSecurityAcknowledged] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceNumber.trim()) {
      setErrorMsg('Please enter a valid military Service Number.');
      return;
    }
    if (!securityAcknowledged) {
      setErrorMsg('You must review and acknowledge the security classification notice.');
      return;
    }
    setErrorMsg('');
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4 && otpCode !== '1234') {
      // Allow any 4-digit or default
      setErrorMsg('Enter the 4-digit verification OTP (Use 1234 for simulation).');
      return;
    }
    loginUser(serviceNumber, rank, unit, phone, role);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest bg-red-600/30 text-red-300 px-2 py-0.5 rounded uppercase">
                  RESTRICTED ACCESS
                </span>
                <span className="text-xs font-mono text-slate-400">YRCCC-2026</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-military text-slate-100">
                Institutional Military Sign-In
              </h2>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-700 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!otpStep ? (
          /* Step 1: Credentials Form */
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Service Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service / Identification No.*
                </label>
                <input
                  type="text"
                  placeholder="e.g. IC-78291X"
                  value={serviceNumber}
                  onChange={e => setServiceNumber(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-amber-300 placeholder-slate-600 focus:outline-none focus:border-amber-500 uppercase"
                />
              </div>

              {/* Military Rank */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Military Rank*
                </label>
                <select
                  value={rank}
                  onChange={e => setRank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Captain">Captain</option>
                  <option value="Major">Major</option>
                  <option value="Lieutenant">Lieutenant</option>
                  <option value="Subedar">Subedar</option>
                  <option value="Havildar">Havildar</option>
                  <option value="Naik">Naik</option>
                  <option value="Sepoy">Sepoy</option>
                  <option value="Surgeon Commander">Surgeon Commander</option>
                  <option value="Colonel">Colonel</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Unit / Regiment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Unit / Formation
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9 PARA (SF)"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Access Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Authorized Role*
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                >
                  <option value="student">Student / Learner</option>
                  <option value="faculty">Faculty / Evaluator</option>
                  <option value="admin">Administrator (Moodle Bridge)</option>
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Registered Mobile Number (for 2FA OTP)
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Security Declaration */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityAcknowledged}
                  onChange={e => setSecurityAcknowledged(e.target.checked)}
                  className="mt-0.5 accent-amber-500"
                />
                <span className="text-[11px] text-slate-300 leading-snug">
                  I acknowledge that all YRCCC combat casualty care doctrine, training videos, and
                  tactical clinical scenarios are restricted military property and subject to official
                  confidentiality regulations.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Transmit OTP Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <Smartphone className="w-6 h-6 text-amber-400 mx-auto" />
              <div className="text-xs font-semibold text-slate-200">
                OTP Transmitted to {phone}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Enter simulated code: <strong className="text-amber-400">1234</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 text-center">
                4-Digit Authentication Code
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="1234"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                className="w-36 mx-auto block bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-center text-lg font-mono tracking-widest text-amber-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-semibold"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider shadow-lg"
              >
                Authenticate
              </button>
            </div>
          </form>
        )}

        {/* Demo Fast Pickers */}
        <div className="border-t border-slate-800 pt-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
            Or quick select verified demo personnel:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {DEMO_PROFILES.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  switchUser(p);
                  setAuthModalOpen(false);
                }}
                className="text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono transition-colors"
              >
                <div className="text-amber-300 font-semibold">{p.rank} {p.fullName}</div>
                <div className="text-slate-500 text-[10px]">{p.serviceNumber} • {p.role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
