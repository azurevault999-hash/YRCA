export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  serviceNumber: string;
  rank: string;
  fullName: string;
  unit: string;
  phone: string;
  role: UserRole;
  cohort: string;
  joinedAt: string;
  securityAcknowledged: boolean;
}

export interface ManualResource {
  id: string;
  code: string;
  title: string;
  category: 'MARCH' | 'SOP' | 'CASEVAC' | 'PROCEDURE';
  summary: string;
  readTime: string;
  downloadSize: string;
  sections: {
    heading: string;
    points: string[];
    criticalCaution?: string;
  }[];
  offlineCached: boolean;
  moodleResourceUrl?: string;
}

export interface VideoResource {
  id: string;
  code: string;
  title: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
  summary: string;
  keyTakeaways: string[];
  steps: { time: string; label: string; detail: string }[];
  completed: boolean;
  moodleActivityId: string;
}

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  code: string;
  type: 'pre_test' | 'post_test' | 'module_check';
  description: string;
  timeLimitMinutes: number;
  passingScorePct: number;
  questions: Question[];
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  answers: Record<string, number>;
  moodleGradeSyncStatus: 'synced' | 'pending' | 'offline_queued';
}

export interface SkillItem {
  id: string;
  name: string;
  criticalStandard: string;
  criteria: string[];
  status: 'passed' | 'remediation' | 'pending';
  score?: number; // 0 to 100
  evaluatedBy?: string;
  evaluatedAt?: string;
  facultyNotes?: string;
}

export interface FeedbackSubmission {
  id: string;
  ratingOverall: number;
  ratingDrills: number;
  ratingFaculty: number;
  ratingContent: number;
  isAnonymous: boolean;
  serviceNumber?: string;
  comments: string;
  suggestions: string;
  submittedAt: string;
}

export interface CertificateData {
  certificateId: string;
  recipientName: string;
  serviceNumber: string;
  rank: string;
  unit: string;
  courseTitle: string;
  courseCode: string;
  issueDate: string;
  expiryDate: string;
  verificationHash: string;
  verifyingAuthority: string;
  qrPayload: string;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
}

export interface MoodleSyncState {
  connected: boolean;
  host: string;
  moodleVersion: string;
  databaseTablesCount: number;
  tablePrefix: string;
  lastSyncTimestamp: string;
  activeToken: string;
  pendingRequests: number;
}
