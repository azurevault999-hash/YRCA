import React from 'react';
import {
  Shield,
  Wifi,
  WifiOff,
  RefreshCw,
  User,
  Database,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_PROFILES } from '../data/mockData';

interface HeaderProps {
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  const {
    currentUser,
    switchUser,
    isOfflineMode,
    toggleOfflineMode,
    moodleState,
    syncWithMoodle,
    setAuthModalOpen,
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);
  const [syncing, setSyncing] = React.useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await syncWithMoodle();
    setTimeout(() => setSyncing(false), 500);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Crest */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-950/80 border border-red-700/60 shadow-inner">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="text-[8px] font-bold text-slate-950">★</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-military font-bold text-base sm:text-lg tracking-wider text-amber-400">
                YODDHA RAKSHAK
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-slate-800 text-slate-300 border border-slate-700 rounded">
                YRCCC COMPANION
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[200px] sm:max-w-none">
              Combat Casualty Care Course • Cohort 26-Alpha
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Moodle 5.2.4 Status Pill */}
          <button
            onClick={handleSync}
            title={`Moodle 5.2.4 Web Services (${moodleState.databaseTablesCount} tables m_ prefix). Click to test sync.`}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 text-xs rounded-md bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px]">Moodle 5.2.4 Synced</span>
            <RefreshCw
              className={`w-3 h-3 text-slate-400 ${syncing ? 'animate-spin text-amber-400' : ''}`}
            />
          </button>

          {/* Field Offline Mode Toggle */}
          <button
            onClick={toggleOfflineMode}
            title={isOfflineMode ? 'Tactical Offline Mode Enabled' : 'Online Mode'}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              isOfflineMode
                ? 'bg-amber-950/70 border-amber-600/70 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Offline (Field)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Online</span>
              </>
            )}
          </button>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 transition-colors"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-400">Role:</span>
              <span className="font-semibold capitalize text-amber-300">
                {currentUser.role}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  Switch Demo Persona
                </div>
                {DEMO_PROFILES.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      switchUser(profile);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex flex-col gap-0.5 transition-colors ${
                      currentUser.id === profile.id
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{profile.fullName}</span>
                      <span className="text-[10px] uppercase px-1 rounded bg-slate-800 font-mono text-slate-400">
                        {profile.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {profile.serviceNumber} • {profile.unit.slice(0, 20)}
                    </span>
                  </button>
                ))}
                <div className="border-t border-slate-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-amber-400 hover:bg-slate-800 rounded font-medium"
                  >
                    + Enter New Service Credentials
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-amber-400">
              <User className="w-3 h-3" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-mono text-[11px] font-semibold text-slate-200 leading-tight">
                {currentUser.serviceNumber}
              </span>
              <span className="text-[9px] text-slate-400 leading-none truncate max-w-[80px]">
                {currentUser.rank}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
