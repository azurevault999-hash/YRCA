import React, { useState } from 'react';
import {
  Users,
  Search,
  Award,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COHORT_ROSTER } from '../data/mockData';

export const FacultyWorkspace: React.FC = () => {
  const { currentUser, setActiveScreen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredRoster = COHORT_ROSTER.filter(cadet => {
    const matchesSearch =
      cadet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === 'ALL' ||
      (statusFilter === 'CERTIFIED' && cadet.status === 'Certified') ||
      (statusFilter === 'IN_TRAINING' && cadet.status === 'In Training') ||
      (statusFilter === 'REMEDIATION' && cadet.status === 'Remediation Required');
    return matchesSearch && matchesFilter;
  });

  const handleExportCSV = () => {
    const header = 'ServiceNumber,Rank,Name,Unit,PreTest,PostTest,SkillsScore,Progress,Status\n';
    const rows = COHORT_ROSTER.map(
      c => `${c.serviceNumber},${c.rank},"${c.name}","${c.unit}",${c.preTest},${c.postTest},${c.skillsScore},${c.progress},${c.status}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YRCCC_Cohort_26_Alpha_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              INSTRUCTIONAL FACULTY CONSOLE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Cohort Trainee Roster & Live Evaluation Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Instructor oversight for Cohort 26-Alpha, practical rubric sign-offs, and readiness tracking.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Gradebook CSV</span>
        </button>
      </div>

      {/* Cohort Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Enrolled Personnel</div>
          <div className="text-2xl font-bold font-military text-slate-100 mt-1">
            {COHORT_ROSTER.length} Trainees
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">Cohort 26-Alpha</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Certified Combat Ready</div>
          <div className="text-2xl font-bold font-military text-emerald-400 mt-1">
            {COHORT_ROSTER.filter(c => c.status === 'Certified').length}
          </div>
          <div className="text-[11px] font-mono text-emerald-500/80 mt-0.5">Met 80% + 5 Drills</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">In Active Drills</div>
          <div className="text-2xl font-bold font-military text-amber-400 mt-1">
            {COHORT_ROSTER.filter(c => c.status === 'In Training').length}
          </div>
          <div className="text-[11px] font-mono text-amber-500/80 mt-0.5">On Schedule</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Requires Remediation</div>
          <div className="text-2xl font-bold font-military text-red-400 mt-1">
            {COHORT_ROSTER.filter(c => c.status === 'Remediation Required').length}
          </div>
          <div className="text-[11px] font-mono text-red-500/80 mt-0.5">Post-Test &lt;80%</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Trainees' },
            { id: 'CERTIFIED', label: 'Certified' },
            { id: 'IN_TRAINING', label: 'In Training' },
            { id: 'REMEDIATION', label: 'Remediation' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === f.id
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service no, name, unit..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Service Personnel</th>
                <th className="py-3.5 px-4">Assigned Unit</th>
                <th className="py-3.5 px-4">Pre-Test</th>
                <th className="py-3.5 px-4">Post-Test (Exam)</th>
                <th className="py-3.5 px-4">Practical Skills</th>
                <th className="py-3.5 px-4">Overall Progress</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Faculty Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredRoster.map(trainee => (
                <tr key={trainee.serviceNumber} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">
                      {trainee.rank} {trainee.name}
                    </div>
                    <div className="text-[11px] font-mono text-amber-400/90">
                      {trainee.serviceNumber}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {trainee.unit}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {trainee.preTest}%
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={
                        trainee.postTest >= 80 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'
                      }
                    >
                      {trainee.postTest}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-200">
                    {trainee.skillsScore} / 100
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full"
                        style={{ width: `${trainee.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      {trainee.progress}% Completed
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase inline-block ${
                        trainee.status === 'Certified'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : trainee.status === 'In Training'
                          ? 'bg-blue-950 text-blue-300 border border-blue-700'
                          : 'bg-red-950 text-red-300 border border-red-700'
                      }`}
                    >
                      {trainee.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveScreen('skills')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 text-[11px] font-mono cursor-pointer"
                    >
                      Grade Rubric →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
