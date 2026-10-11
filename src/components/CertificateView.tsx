import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Download,
  Printer,
  ExternalLink,
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileBadge,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CertificateView: React.FC = () => {
  const {
    certificate,
    isEligibleForCertificate,
    currentUser,
    setVerificationModalCertificateId,
    quizAttempts,
    skills,
    feedbacks,
    setActiveScreen,
  } = useApp();

  const postTestPassed = quizAttempts['quiz-post']?.passed;
  const passedSkillsCount = skills.filter(s => s.status === 'passed').length;
  const feedbackSubmitted = feedbacks.length > 0;

  const handlePrint = () => {
    window.print();
  };

  const handleVerify = () => {
    setVerificationModalCertificateId(certificate.certificateId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              CREDENTIALING & CERTIFICATION
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Official Course Completion Credential
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Digitally verifiable combat casualty care certification backed by Moodle completion ledgers.
          </p>
        </div>

        {isEligibleForCertificate && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleVerify}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Verify Authenticity</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        )}
      </div>

      {/* Completion Requirements Status Checklist (if not eligible or for tracking) */}
      {!isEligibleForCertificate ? (
        <div className="rounded-2xl bg-slate-900 border border-amber-600/40 p-5 sm:p-6 space-y-4 no-print shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Course Completion Criteria Outstanding
              </h2>
              <p className="text-xs text-slate-400">
                To issue the verified YRCCC certificate, satisfy the required milestones:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Milestone 1: Post-Course Exam */}
            <div
              onClick={() => setActiveScreen('assessments')}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                postTestPassed
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold">1. Post-Course Exam</span>
                {postTestPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">Pending</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Achieve minimum 80% passing score on the summative MCQ exam.
              </p>
            </div>

            {/* Milestone 2: Practical Skills */}
            <div
              onClick={() => setActiveScreen('skills')}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                passedSkillsCount === skills.length
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold">2. Skills Sign-Off</span>
                {passedSkillsCount === skills.length ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">
                    {passedSkillsCount}/{skills.length}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Obtain faculty rubric certification for all 5 practical drills.
              </p>
            </div>

            {/* Milestone 3: Feedback Survey */}
            <div
              onClick={() => setActiveScreen('feedback')}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                feedbackSubmitted
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold">3. Feedback Survey</span>
                {feedbackSubmitted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">Optional</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Complete institutional course and faculty quality evaluation.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Official Certificate Canvas Component */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border-2 border-amber-600/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black">
        {/* Subtle Watermark Crest Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <Award className="w-96 h-96 text-amber-400" />
        </div>

        {/* Certificate Decorative Border Frame */}
        <div className="border border-amber-500/30 p-6 sm:p-8 rounded-2xl relative bg-slate-950/60 print:bg-white print:border-black">
          {/* Top Header & Emblem */}
          <div className="text-center space-y-2 pb-6 border-b border-amber-500/20 print:border-black">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-950/80 border-2 border-amber-500 shadow-lg text-amber-400 mb-1">
              <span className="text-2xl font-bold font-military">YR</span>
            </div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
              HEADQUARTERS INTEGRATED DEFENCE STAFF • ARMED FORCES MEDICAL SERVICES
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-military tracking-wide text-slate-100 print:text-black uppercase">
              Yoddha Rakshak Combat Casualty Care Course
            </h2>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 print:text-black">
              CERTIFICATE OF OPERATIONAL COMPETENCY • YRCCC-C2604
            </div>
          </div>

          {/* Recipient Details Body */}
          <div className="py-8 text-center space-y-4">
            <p className="text-xs sm:text-sm font-mono text-slate-400 print:text-gray-700 uppercase">
              This is to officially certify that
            </p>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-bold font-military text-amber-300 print:text-black tracking-wide">
                {currentUser.rank} {currentUser.fullName}
              </div>
              <div className="text-xs sm:text-sm font-mono text-slate-300 print:text-black">
                Service Number: <strong className="text-amber-400 print:text-black font-semibold">{currentUser.serviceNumber}</strong> • Unit: <strong className="text-slate-200 print:text-black">{currentUser.unit}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 print:text-black max-w-2xl mx-auto leading-relaxed pt-2">
              has successfully satisfied all instructional modules, tactical simulations, Care Under Fire protocols,
              14-Gauge tension thoracostomy decompression drills, and achieved certified mastery in Tactical Field Care
              in accordance with authoritative YRCCC combat casualty care standards.
            </p>
          </div>

          {/* Certificate Metadata & Signatures Grid */}
          <div className="pt-6 border-t border-amber-500/20 print:border-black grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Left: Signatures */}
            <div className="text-left space-y-1">
              <div className="font-military font-bold text-xs text-amber-400 print:text-black">
                Dr. Ananya Sen, VSM
              </div>
              <div className="text-[10px] font-mono text-slate-400 print:text-black leading-tight">
                Surgeon Commander, IN<br />Chief Course Evaluator, YRCCC
              </div>
            </div>

            {/* Middle: QR Verification Stamp */}
            <div className="flex flex-col items-center justify-center text-center">
              {/* Simulated QR Code SVG Graphic */}
              <div
                onClick={handleVerify}
                className="w-20 h-20 bg-white p-1.5 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                title="Click to inspect verification authenticity"
              >
                <div className="w-full h-full border-2 border-slate-900 grid grid-cols-4 gap-0.5 p-1 bg-white">
                  <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs" />
                  <div className="bg-slate-900 col-span-1" />
                  <div className="bg-slate-900 col-span-1" />
                  <div className="bg-slate-900 col-span-1" />
                  <div className="bg-slate-900 col-span-2 row-span-2 rounded-xs" />
                  <div className="bg-slate-900 col-span-1" />
                </div>
              </div>
              <span className="text-[9px] font-mono text-amber-400 print:text-black mt-1 font-bold">
                SCAN TO VERIFY
              </span>
              <span className="text-[8px] font-mono text-slate-500 print:text-black">
                {certificate.certificateId}
              </span>
            </div>

            {/* Right: Commandant Signature */}
            <div className="text-right space-y-1">
              <div className="font-military font-bold text-xs text-amber-400 print:text-black">
                K. S. Rathore
              </div>
              <div className="text-[10px] font-mono text-slate-400 print:text-black leading-tight">
                Colonel, ARTRAC Directorate<br />Issuing Authority
              </div>
            </div>
          </div>

          {/* Cryptographic Ledger Footer */}
          <div className="mt-6 pt-3 border-t border-slate-800 print:border-black flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-slate-500 print:text-black gap-2">
            <span>ISSUED: {certificate.issueDate} • VALIDITY: {certificate.expiryDate}</span>
            <span>HASH: {certificate.verificationHash.slice(0, 24)}... [SHA-256]</span>
            <span className="text-emerald-400 print:text-black font-semibold">
              STATUS: {certificate.status} (MOODLE 5.2.4 RECORDED)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
