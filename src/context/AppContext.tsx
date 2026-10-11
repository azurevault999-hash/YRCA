import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  ManualResource,
  VideoResource,
  QuizAttempt,
  SkillItem,
  FeedbackSubmission,
  CertificateData,
  MoodleSyncState,
} from '../types';
import {
  INITIAL_USER,
  DEMO_PROFILES,
  MANUALS,
  VIDEOS,
  INITIAL_SKILLS,
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  switchUser: (profile: UserProfile) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  loginUser: (serviceNumber: string, rank: string, unit: string, phone: string, role: UserRole) => void;
  logoutUser: () => void;
  // Offline & Network
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  // Manuals
  manuals: ManualResource[];
  toggleManualOffline: (manualId: string) => void;
  selectedManual: ManualResource | null;
  setSelectedManual: (m: ManualResource | null) => void;
  // Videos
  videos: VideoResource[];
  markVideoCompleted: (videoId: string) => void;
  selectedVideo: VideoResource | null;
  setSelectedVideo: (v: VideoResource | null) => void;
  // Quizzes
  quizAttempts: Record<string, QuizAttempt>;
  saveQuizAttempt: (attempt: QuizAttempt) => void;
  // Skills
  skills: SkillItem[];
  updateSkillEvaluation: (skillId: string, status: 'passed' | 'remediation' | 'pending', score: number, notes: string) => void;
  // Feedback
  feedbacks: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt'>) => void;
  // Certificate
  certificate: CertificateData;
  isEligibleForCertificate: boolean;
  // Moodle sync
  moodleState: MoodleSyncState;
  syncWithMoodle: () => Promise<void>;
  // Verification dialog
  verificationModalCertificateId: string | null;
  setVerificationModalCertificateId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('yrca_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [activeScreen, setActiveScreen] = useState<string>('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  const [manuals, setManuals] = useState<ManualResource[]>(() => {
    const saved = localStorage.getItem('yrca_manuals');
    return saved ? JSON.parse(saved) : MANUALS;
  });

  const [selectedManual, setSelectedManual] = useState<ManualResource | null>(null);

  const [videos, setVideos] = useState<VideoResource[]>(() => {
    const saved = localStorage.getItem('yrca_videos');
    return saved ? JSON.parse(saved) : VIDEOS;
  });

  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);

  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>(() => {
    const saved = localStorage.getItem('yrca_quiz_attempts');
    if (saved) return JSON.parse(saved);
    // Default baseline initial pre-test
    return {
      'quiz-pre': {
        quizId: 'quiz-pre',
        score: 3,
        total: 3,
        percentage: 100,
        passed: true,
        completedAt: '2026-10-08 10:15',
        answers: { 'q-pre-1': 1, 'q-pre-2': 1, 'q-pre-3': 1 },
        moodleGradeSyncStatus: 'synced',
      },
      'quiz-post': {
        quizId: 'quiz-post',
        score: 5,
        total: 5,
        percentage: 100,
        passed: true,
        completedAt: '2026-10-10 16:45',
        answers: { 'q-post-1': 1, 'q-post-2': 0, 'q-post-3': 2, 'q-post-4': 0, 'q-post-5': 1 },
        moodleGradeSyncStatus: 'synced',
      },
    };
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('yrca_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('yrca_feedbacks');
    return saved ? JSON.parse(saved) : [
      {
        id: 'fb-01',
        ratingOverall: 5,
        ratingDrills: 5,
        ratingFaculty: 5,
        ratingContent: 5,
        isAnonymous: false,
        serviceNumber: 'IC-78291X',
        comments: 'High fidelity tension pneumothorax drill gave unmatched confidence. Practical needle landmark instructions were top tier.',
        suggestions: 'Recommend adding tactical tourniquet application under simulated night vision goggles in Phase 2.',
        submittedAt: '2026-10-10 17:00',
      },
    ];
  });

  const [moodleState, setMoodleState] = useState<MoodleSyncState>({
    connected: true,
    host: '127.0.0.1:8000 (moodle-docker / GCP VM)',
    moodleVersion: 'Moodle 5.2.4 (Build: 20261005)',
    databaseTablesCount: 490,
    tablePrefix: 'm_',
    lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    activeToken: 'yr_ws_c2604_live_490m',
    pendingRequests: 0,
  });

  const [verificationModalCertificateId, setVerificationModalCertificateId] = useState<string | null>(null);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('yrca_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('yrca_manuals', JSON.stringify(manuals));
  }, [manuals]);

  useEffect(() => {
    localStorage.setItem('yrca_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('yrca_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('yrca_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('yrca_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Certificate eligibility: Passed post-course test (>=80%) + all 5 skills passed + feedback submitted
  const isPostTestPassed = quizAttempts['quiz-post']?.passed === true;
  const areAllSkillsPassed = skills.length > 0 && skills.every(s => s.status === 'passed');
  const isFeedbackSubmitted = feedbacks.some(f => f.serviceNumber === currentUser.serviceNumber || f.isAnonymous);
  const isEligibleForCertificate = isPostTestPassed && areAllSkillsPassed;

  const certificate: CertificateData = {
    certificateId: `YRCCC-2026-TFC-0842`,
    recipientName: currentUser.fullName,
    serviceNumber: currentUser.serviceNumber,
    rank: currentUser.rank,
    unit: currentUser.unit,
    courseTitle: 'Yoddha Rakshak Combat Casualty Care Course (YRCCC)',
    courseCode: 'YRCCC-C2604',
    issueDate: '11 October 2026',
    expiryDate: '11 October 2028 (2-Year Tactical Currency)',
    verificationHash: '9e7b23f81c4e90a6d5104278efbc018a38b5601247c729',
    verifyingAuthority: 'Headquarters Integrated Defence Staff / Army Medical Corps',
    qrPayload: `YRCCC_VERIFY:ID=YRCCC-2026-TFC-0842;SVC=${currentUser.serviceNumber};NAME=${currentUser.fullName};STAT=VALID;MOODLE=5.2.4`,
    status: 'VALID',
  };

  const switchUser = (profile: UserProfile) => {
    setCurrentUser(profile);
    if (profile.role === 'faculty') {
      setActiveScreen('faculty');
    } else if (profile.role === 'admin') {
      setActiveScreen('admin');
    } else {
      setActiveScreen('dashboard');
    }
  };

  const loginUser = (serviceNumber: string, rank: string, unit: string, phone: string, role: UserRole) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      serviceNumber,
      rank,
      fullName: `${rank} ${serviceNumber}`,
      unit: unit || 'Combat Formation',
      phone,
      role,
      cohort: 'YRCCC Cohort 26-Alpha',
      joinedAt: new Date().toISOString().split('T')[0],
      securityAcknowledged: true,
    };
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    if (role === 'faculty') setActiveScreen('faculty');
    else if (role === 'admin') setActiveScreen('admin');
    else setActiveScreen('dashboard');
  };

  const logoutUser = () => {
    // Revert to demo student
    setCurrentUser(INITIAL_USER);
    setActiveScreen('dashboard');
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  const toggleManualOffline = (manualId: string) => {
    setManuals(prev =>
      prev.map(m => (m.id === manualId ? { ...m, offlineCached: !m.offlineCached } : m))
    );
  };

  const markVideoCompleted = (videoId: string) => {
    setVideos(prev =>
      prev.map(v => (v.id === videoId ? { ...v, completed: true } : v))
    );
    // record sync
    setMoodleState(prev => ({
      ...prev,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
  };

  const saveQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts(prev => ({
      ...prev,
      [attempt.quizId]: attempt,
    }));
    setMoodleState(prev => ({
      ...prev,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
  };

  const updateSkillEvaluation = (
    skillId: string,
    status: 'passed' | 'remediation' | 'pending',
    score: number,
    notes: string
  ) => {
    setSkills(prev =>
      prev.map(s =>
        s.id === skillId
          ? {
              ...s,
              status,
              score,
              facultyNotes: notes,
              evaluatedBy: `${currentUser.rank} ${currentUser.fullName}`,
              evaluatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            }
          : s
      )
    );
    setMoodleState(prev => ({
      ...prev,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
  };

  const submitFeedback = (data: Omit<FeedbackSubmission, 'id' | 'submittedAt'>) => {
    const newFeedback: FeedbackSubmission = {
      ...data,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
    setMoodleState(prev => ({
      ...prev,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
  };

  const syncWithMoodle = async () => {
    setMoodleState(prev => ({ ...prev, pendingRequests: prev.pendingRequests + 1 }));
    // Simulate API round-trip to Moodle Web Services rest endpoint
    await new Promise(r => setTimeout(r, 700));
    setMoodleState(prev => ({
      ...prev,
      pendingRequests: Math.max(0, prev.pendingRequests - 1),
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        switchUser,
        activeScreen,
        setActiveScreen,
        authModalOpen,
        setAuthModalOpen,
        loginUser,
        logoutUser,
        isOfflineMode,
        toggleOfflineMode,
        manuals,
        toggleManualOffline,
        selectedManual,
        setSelectedManual,
        videos,
        markVideoCompleted,
        selectedVideo,
        setSelectedVideo,
        quizAttempts,
        saveQuizAttempt,
        skills,
        updateSkillEvaluation,
        feedbacks,
        submitFeedback,
        certificate,
        isEligibleForCertificate,
        moodleState,
        syncWithMoodle,
        verificationModalCertificateId,
        setVerificationModalCertificateId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
