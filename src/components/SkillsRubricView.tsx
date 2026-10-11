import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  Edit3,
  Check,
  X,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SkillItem } from '../types';

export const SkillsRubricView: React.FC = () => {
  const { skills, updateSkillEvaluation, currentUser, currentRole } = useApp();
  const [evaluatingSkill, setEvaluatingSkill] = useState<SkillItem | null>(null);
  const [evalScore, setEvalScore] = useState<number>(90);
  const [evalStatus, setEvalStatus] = useState<'passed' | 'remediation' | 'pending'>('passed');
  const [evalNotes, setEvalNotes] = useState<string>('');

  const isFacultyOrAdmin = currentRole === 'faculty' || currentRole === 'admin';

  const handleOpenEvaluation = (skill: SkillItem) => {
    setEvaluatingSkill(skill);
    setEvalScore(skill.score || 85);
    setEvalStatus(skill.status);
    setEvalNotes(skill.facultyNotes || '');
  };

  const handleSaveEvaluation = () => {
    if (!evaluatingSkill) return;
    updateSkillEvaluation(evaluatingSkill.id, evalStatus, evalScore, evalNotes);
    setEvaluatingSkill(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              FACULTY RUBRIC & COMPETENCY MATRIX
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Skills Assessment & Practical Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Standardised performance criteria evaluated by certified YRCCC instructional staff.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>
            {skills.filter(s => s.status === 'passed').length} of {skills.length} Practical Drills Signed Off
          </span>
        </div>
      </div>

      {/* Role Tip */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isFacultyOrAdmin
              ? `Logged in as Evaluator (${currentUser.rank} ${currentUser.fullName}). You have full authority to score and certify criteria.`
              : `Viewing learner record. For live evaluator grading, switch persona to Faculty in the top bar.`}
          </span>
        </div>
      </div>

      {/* Skills Rubrics Grid */}
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div
            key={skill.id}
            className={`rounded-2xl border p-5 transition-all shadow-md ${
              skill.status === 'passed'
                ? 'bg-slate-900/90 border-emerald-800/40'
                : skill.status === 'remediation'
                ? 'bg-slate-900/90 border-amber-800/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-amber-400">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    PRACTICAL PROTOCOL RUBRIC
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-100">{skill.name}</h2>

                <p className="text-xs font-mono text-amber-300/90 mt-1 bg-amber-950/30 p-2 rounded border border-amber-900/30 inline-block">
                  Standard: {skill.criticalStandard}
                </p>

                {/* Sub-criteria list */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Core Evaluated Criteria:
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pl-1">
                    {skill.criteria.map((cr, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{cr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status and Score Card */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Sign-Off Status</div>
                  <div
                    className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded mt-0.5 inline-block ${
                      skill.status === 'passed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : skill.status === 'remediation'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {skill.status}
                  </div>
                </div>

                {skill.score !== undefined && (
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Evaluator Score</div>
                    <div className="text-xl font-bold font-military text-slate-100">
                      {skill.score} / 100
                    </div>
                  </div>
                )}

                {isFacultyOrAdmin && (
                  <button
                    onClick={() => handleOpenEvaluation(skill)}
                    className="mt-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Evaluate</span>
                  </button>
                )}
              </div>
            </div>

            {/* Evaluator Notes & Signoff */}
            {skill.facultyNotes && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Evaluated by: <strong className="text-slate-200">{skill.evaluatedBy}</strong> ({skill.evaluatedAt})
                  </span>
                </div>
                <div className="text-xs text-slate-300 italic">
                  "{skill.facultyNotes}"
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Faculty Grading Modal */}
      {evaluatingSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  FACULTY EVALUATION DESK
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {evaluatingSkill.name}
                </h3>
              </div>
              <button
                onClick={() => setEvaluatingSkill(null)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Score Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400 uppercase">Proficiency Score:</span>
                <span className="text-amber-400 font-bold">{evalScore} / 100</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={evalScore}
                onChange={e => setEvalScore(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Status Selector */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Outcome:</div>
              <div className="grid grid-cols-3 gap-2">
                {(['passed', 'remediation', 'pending'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setEvalStatus(st)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      evalStatus === st
                        ? st === 'passed'
                          ? 'bg-emerald-600 text-slate-950'
                          : st === 'remediation'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-700 text-white'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Faculty Notes */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                Instructional Notes / Drill Feedback:
              </div>
              <textarea
                value={evalNotes}
                onChange={e => setEvalNotes(e.target.value)}
                placeholder="e.g. Tourniquet occluded distal radial pulse in 48s. Good form under simulated pressure."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setEvaluatingSkill(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvaluation}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase font-mono shadow-md"
              >
                Commit Sign-Off
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
