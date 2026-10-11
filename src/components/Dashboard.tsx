import React from 'react';
import {
  Award,
  BookOpen,
  Video,
  FileCheck2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const {
    currentUser,
    manuals,
    videos,
    quizAttempts,
    skills,
    setActiveScreen,
    isEligibleForCertificate,
  } = useApp();

  const completedVideosCount = videos.filter(v => v.completed).length;
  const passedSkillsCount = skills.filter(s => s.status === 'passed').length;
  const postTestAttempt = quizAttempts['quiz-post'];
  const preTestAttempt = quizAttempts['quiz-pre'];

  // Overall readiness calculation
  const knowledgePercent = postTestAttempt ? postTestAttempt.percentage : (preTestAttempt ? preTestAttempt.percentage : 0);
  const practicalPercent = Math.round((passedSkillsCount / skills.length) * 100);
  const videoPercent = Math.round((completedVideosCount / videos.length) * 100);
  const overallReadiness = Math.round((knowledgePercent * 0.4) + (practicalPercent * 0.4) + (videoPercent * 0.2));

  return (
    <div className="space-y-6 pb-12">
      {/* Tactical Banner */}
      <div className="rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-800/40 p-4 sm:p-5 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-red-600/30 text-red-300 border border-red-500/30 uppercase">
                SECURITY CLASSIFICATION: RESTRICTED
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUser.cohort}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
              Welcome, {currentUser.rank} {currentUser.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-mono">
              Service ID: <span className="text-amber-400 font-semibold">{currentUser.serviceNumber}</span> • Assigned Unit: {currentUser.unit}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Tactical Readiness</div>
              <div className="text-2xl font-bold font-military text-emerald-400 flex items-center gap-1 justify-end">
                {overallReadiness}%
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-[10px] font-mono text-emerald-500/80">Combat Mission Capable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Action Banner */}
      <div className="rounded-xl bg-amber-950/40 border border-amber-600/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Current Mission Directive
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {!postTestAttempt?.passed
                ? 'Complete Summative Certification Exam (MARCH Protocol)'
                : passedSkillsCount < skills.length
                ? 'Complete Faculty Evaluated Practical Skills Drills'
                : 'All YRCCC Milestones Satisfied. Digitally Verifiable Certificate Ready!'}
            </div>
            <p className="text-xs text-slate-400">
              {!postTestAttempt?.passed
                ? 'Summative MCQ requires 80% minimum score for course certification.'
                : passedSkillsCount < skills.length
                ? `${passedSkillsCount}/${skills.length} skills signed off. Present to faculty evaluator.`
                : 'Moodle gradebook synchronised. Download or present cryptographic certificate.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (!postTestAttempt?.passed) setActiveScreen('assessments');
            else if (passedSkillsCount < skills.length) setActiveScreen('skills');
            else setActiveScreen('certificate');
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <span>
            {!postTestAttempt?.passed
              ? 'Start Assessment'
              : passedSkillsCount < skills.length
              ? 'View Skills Rubric'
              : 'Claim Certificate'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Knowledge Score */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Knowledge Score</span>
            <FileCheck2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-military text-slate-100">
            {postTestAttempt ? `${postTestAttempt.percentage}%` : 'Pending'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Pre-Test: {preTestAttempt ? `${preTestAttempt.percentage}%` : 'N/A'}</span>
            <span className={postTestAttempt?.passed ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
              {postTestAttempt?.passed ? 'Passed (80% req)' : 'Requires Exam'}
            </span>
          </div>
        </div>

        {/* Practical Skills */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Skills Signed Off</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-military text-slate-100">
            {passedSkillsCount} / {skills.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Faculty Rubric</span>
            <span className={passedSkillsCount === skills.length ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
              {passedSkillsCount === skills.length ? 'All Certified' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Video Drills */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Tactical Drills</span>
            <Video className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-military text-slate-100">
            {completedVideosCount} / {videos.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>CUF & TFC Simulations</span>
            <span className="text-purple-400 font-semibold">{videoPercent}% Done</span>
          </div>
        </div>

        {/* Certificate Status */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Certification</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-military text-amber-400">
            {isEligibleForCertificate ? 'QUALIFIED' : 'PENDING'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>QR Verifiable</span>
            <button
              onClick={() => setActiveScreen('certificate')}
              className="text-amber-400 hover:underline font-mono"
            >
              Inspect →
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Columns: Quick Hub & Tactical Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Access Modules */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-military text-slate-200 uppercase tracking-wide">
              Core YRCCC Learning Domains
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Moodle Course ID: YRCCC-C2604
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Massive Hemorrhage Card */}
            <div
              onClick={() => setActiveScreen('manuals')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-600/50 hover:bg-slate-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                  MARCH: M
                </span>
                <span className="text-xs text-slate-500 font-mono">SOP-MED-01</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                Extremity & Junctional Hemorrhage
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Rapid C-A-T Gen 7 deployment under fire, wound packing with QuikClot Combat Gauze, pressure dressings.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>6 min read</span>
                <span className="text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Access Manual →
                </span>
              </div>
            </div>

            {/* Respiration / Tension Pneumothorax Card */}
            <div
              onClick={() => setActiveScreen('manuals')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-600/50 hover:bg-slate-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  MARCH: R
                </span>
                <span className="text-xs text-slate-500 font-mono">SOP-MED-03</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                Tension Pneumothorax & Needle Decompression
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Clinical signs of tension kill, anatomical landmarks (2nd ICS MCL & 5th ICS AAL), 14G catheter protocol.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>7 min read</span>
                <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Access Manual →
                </span>
              </div>
            </div>

            {/* Tactical Airway Card */}
            <div
              onClick={() => setActiveScreen('manuals')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 hover:bg-slate-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  MARCH: A
                </span>
                <span className="text-xs text-slate-500 font-mono">SOP-MED-02</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                Tactical Airway & NPA Insertion
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Unconscious casualty recovery positioning, nasopharyngeal airway placement, surgical cricothyroidotomy cues.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>8 min read</span>
                <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Access Manual →
                </span>
              </div>
            </div>

            {/* CASEVAC Card */}
            <div
              onClick={() => setActiveScreen('manuals')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-600/50 hover:bg-slate-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
                  CASEVAC
                </span>
                <span className="text-xs text-slate-500 font-mono">SOP-OPS-09</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                9-Line MEDEVAC & MIST Handover
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Standardised transmission script, grid coordinates, triage precedence, MIST card formatting.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>6 min read</span>
                <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Access Manual →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tactical Schedule & Verification Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-military text-slate-200 uppercase tracking-wide">
              Course Cadence
            </h2>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Pre-Course Diagnostic Test</span>
                  <span className="text-[10px] font-mono text-emerald-400">COMPLETED</span>
                </div>
                <p className="text-[11px] text-slate-400">Baseline MARCH doctrine assessment.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Care Under Fire Drills</span>
                  <span className="text-[10px] font-mono text-emerald-400">COMPLETED</span>
                </div>
                <p className="text-[11px] text-slate-400">Sub-60s C-A-T application under active hostile fire.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Tactical Field Care Rubrics</span>
                  <span className="text-[10px] font-mono text-emerald-400">SIGNED OFF</span>
                </div>
                <p className="text-[11px] text-slate-400">Needle decompression, airway, and hypothermia wraps.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Certification Summative Exam</span>
                  <span className="text-[10px] font-mono text-amber-400">VERIFIED</span>
                </div>
                <p className="text-[11px] text-slate-400">Final score: 100% (Passed criteria &ge;80%).</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Digital Certificate Issuance</span>
                  <span className="text-[10px] font-mono text-amber-400">ELIGIBLE</span>
                </div>
                <p className="text-[11px] text-slate-400">Cryptographically verifiable QR code credential.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
