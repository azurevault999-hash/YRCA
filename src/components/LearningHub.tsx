import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  CheckCircle,
  AlertOctagon,
  X,
  Share2,
  FileText,
  Clock,
  HardDriveDownload,
  BookmarkCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ManualResource } from '../types';

export const LearningHub: React.FC = () => {
  const { manuals, toggleManualOffline, selectedManual, setSelectedManual } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'MARCH', 'SOP', 'CASEVAC'];

  const filteredManuals = manuals.filter(m => {
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              TACTICAL FIELD REPOSITORIES
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Learning Hub & Operational Manuals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Authoritative YRCCC tactical protocols, MARCH algorithms, and field SOP cards.
          </p>
        </div>

        {/* Caching Status Note */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Offline Storage: {manuals.filter(m => m.offlineCached).length} of {manuals.length} cached
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SOP code, MARCH topic..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Manuals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredManuals.map(manual => (
          <div
            key={manual.id}
            className="rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden group shadow-md"
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-400 border border-slate-700">
                  {manual.code}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/80">
                  {manual.category}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                {manual.title}
              </h2>

              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {manual.summary}
              </p>

              <div className="flex items-center gap-3 mt-4 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {manual.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-500" />
                  {manual.downloadSize}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-4 py-3 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleManualOffline(manual.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  manual.offlineCached
                    ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/50'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
                }`}
                title={manual.offlineCached ? 'Available Offline' : 'Cache to Device'}
              >
                {manual.offlineCached ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Cached</span>
                  </>
                ) : (
                  <>
                    <HardDriveDownload className="w-3 h-3" />
                    <span>Download</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedManual(manual)}
                className="px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold font-mono flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Read SOP</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Manual Reader Modal */}
      {selectedManual && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedManual.code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedManual.category} PROTOCOL
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-military text-slate-100">
                  {selectedManual.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedManual(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-200">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedManual.summary}
              </div>

              {selectedManual.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-bold font-military text-amber-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xs font-mono">
                      {idx + 1}
                    </span>
                    {sec.heading}
                  </h3>

                  <ul className="space-y-2 pl-2">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {sec.criticalCaution && (
                    <div className="mt-3 p-3 rounded-lg bg-red-950/60 border border-red-700/60 flex items-start gap-2.5 text-xs text-red-200">
                      <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold font-mono tracking-wider text-red-400 block mb-0.5">
                          TACTICAL CAUTION:
                        </span>
                        {sec.criticalCaution}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-400">
                YRCCC Official Doctrine • Sync status: Verified
              </span>
              <button
                onClick={() => setSelectedManual(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Close SOP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
