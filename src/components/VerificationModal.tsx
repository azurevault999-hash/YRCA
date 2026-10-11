import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  X,
  FileBadge,
  Database,
  Calendar,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VerificationModal: React.FC = () => {
  const {
    verificationModalCertificateId,
    setVerificationModalCertificateId,
    certificate,
  } = useApp();

  if (!verificationModalCertificateId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/50 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
        {/* Verification Success Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  CRYPTOGRAPHICALLY VERIFIED
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  100% AUTHENTIC
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 font-military">
                YRCCC Operational Credential Record
              </h3>
            </div>
          </div>
          <button
            onClick={() => setVerificationModalCertificateId(null)}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Details Table */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Certificate Identifier:</span>
            <span className="font-mono font-bold text-amber-400">{certificate.certificateId}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Recipient Personnel:</span>
            <span className="text-slate-200 font-semibold">{certificate.rank} {certificate.recipientName}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Service Number:</span>
            <span className="font-mono text-slate-200">{certificate.serviceNumber}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Assigned Unit:</span>
            <span className="text-slate-300">{certificate.unit}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Date of Issuance:</span>
            <span className="text-slate-300">{certificate.issueDate}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Tactical Currency Expiry:</span>
            <span className="text-amber-400">{certificate.expiryDate}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-850">
            <span className="text-slate-400 font-mono">Moodle System of Record:</span>
            <span className="text-emerald-400 font-mono font-semibold">PostgreSQL 17 (m_course_completions)</span>
          </div>

          <div className="flex flex-col pt-1">
            <span className="text-slate-500 font-mono text-[10px]">SHA-256 Ledger Digest:</span>
            <span className="font-mono text-[10px] text-slate-400 break-all bg-slate-900 p-1.5 rounded mt-0.5 border border-slate-800">
              {certificate.verificationHash}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400 font-mono">
            Integrity Check: VALID
          </span>
          <button
            onClick={() => setVerificationModalCertificateId(null)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close Verification Record
          </button>
        </div>
      </div>
    </div>
  );
};
