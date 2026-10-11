import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { LearningHub } from './components/LearningHub';
import { VideoLibrary } from './components/VideoLibrary';
import { AssessmentView } from './components/AssessmentView';
import { SkillsRubricView } from './components/SkillsRubricView';
import { FeedbackView } from './components/FeedbackView';
import { CertificateView } from './components/CertificateView';
import { FacultyWorkspace } from './components/FacultyWorkspace';
import { AdminWorkspace } from './components/AdminWorkspace';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { VerificationModal } from './components/VerificationModal';

export const App: React.FC = () => {
  const { activeScreen } = useApp();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header onOpenProfile={() => setProfileModalOpen(true)} />

      {/* Navigation Sub-bar */}
      <Navigation />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeScreen === 'dashboard' && <Dashboard />}
        {activeScreen === 'manuals' && <LearningHub />}
        {activeScreen === 'videos' && <VideoLibrary />}
        {activeScreen === 'assessments' && <AssessmentView />}
        {activeScreen === 'skills' && <SkillsRubricView />}
        {activeScreen === 'feedback' && <FeedbackView />}
        {activeScreen === 'certificate' && <CertificateView />}
        {activeScreen === 'faculty' && <FacultyWorkspace />}
        {activeScreen === 'admin' && <AdminWorkspace />}
      </main>

      {/* Footer */}
      <footer className="hidden sm:block border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs font-mono text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Yoddha Rakshak (YRCCC Digital Companion) • Army Medical Services
          </span>
          <span>
            Moodle 5.2.4 Web Services API • PostgreSQL 17 (m_ schema)
          </span>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <AuthModal />
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <VerificationModal />
    </div>
  );
};

export default App;
