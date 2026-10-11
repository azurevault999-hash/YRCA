import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileCheck2,
  Award,
  MessageSquare,
  Sparkles,
  Users,
  Settings,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { activeScreen, setActiveScreen, currentRole } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manuals', label: 'Learning Hub', icon: BookOpen },
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'assessments', label: 'Assessments', icon: FileCheck2 },
    { id: 'skills', label: 'Skills Rubric', icon: Award },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'certificate', label: 'Certificate', icon: Sparkles },
    ...(currentRole === 'faculty' || currentRole === 'admin'
      ? [{ id: 'faculty', label: 'Faculty Roster', icon: Users }]
      : []),
    ...(currentRole === 'admin'
      ? [{ id: 'admin', label: 'Admin & Moodle', icon: Settings }]
      : []),
  ];

  return (
    <>
      {/* Desktop Navigation Tabs Bar */}
      <nav className="hidden md:block bg-slate-900 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-md transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-medium leading-none">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
          {navItems.length > 5 && (
            <button
              onClick={() => {
                // If on one of the latter screens, cycle or pick certificate
                if (['feedback', 'certificate', 'faculty', 'admin'].includes(activeScreen)) {
                  setActiveScreen('certificate');
                } else {
                  setActiveScreen('certificate');
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-md transition-colors ${
                ['feedback', 'certificate', 'faculty', 'admin'].includes(activeScreen)
                  ? 'text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">More</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
