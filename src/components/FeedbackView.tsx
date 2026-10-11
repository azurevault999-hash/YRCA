import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Lock,
  Send,
  EyeOff,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeedbackView: React.FC = () => {
  const { feedbacks, submitFeedback, currentUser } = useApp();
  const [ratingOverall, setRatingOverall] = useState(5);
  const [ratingDrills, setRatingDrills] = useState(5);
  const [ratingFaculty, setRatingFaculty] = useState(5);
  const [ratingContent, setRatingContent] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comments, setComments] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submittedAlert, setSubmittedAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      ratingOverall,
      ratingDrills,
      ratingFaculty,
      ratingContent,
      isAnonymous,
      serviceNumber: isAnonymous ? undefined : currentUser.serviceNumber,
      comments: comments.trim() || 'Instruction and practical simulation met all expectations.',
      suggestions: suggestions.trim() || 'Continue high-fidelity realistic casualty moulage.',
    });
    setSubmittedAlert(true);
    setComments('');
    setSuggestions('');
    setTimeout(() => setSubmittedAlert(false), 4000);
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          className="p-1 transition-transform hover:scale-110 cursor-pointer"
        >
          <Star
            className={`w-5 h-5 ${
              star <= value
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-600'
            }`}
          />
        </button>
      ))}
      <span className="text-xs font-mono text-amber-400 ml-2">{value} / 5</span>
    </div>
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            COURSE EVALUATION & QUALITY AUDIT
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
          Course & Faculty Feedback Survey
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Structured evaluation for continuous curriculum enhancement and operational fidelity.
        </p>
      </div>

      {submittedAlert && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <strong>Evaluation Recorded:</strong> Your feedback has been securely committed and mirrored to the institutional evaluation dataset.
          </div>
        </div>
      )}

      {/* Main Feedback Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-5 shadow-xl"
        >
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-slate-100">
              YRCCC Curriculum & Practical Drills Rating
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Please score the primary dimensions of your Combat Casualty Care training.
            </p>
          </div>

          {/* Dimension Ratings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                1. Overall Course Quality & Organization
              </label>
              <StarRating value={ratingOverall} onChange={setRatingOverall} />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                2. Realism of Practical Combat Drills
              </label>
              <StarRating value={ratingDrills} onChange={setRatingDrills} />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                3. Faculty Instruction & Clinical Coaching
              </label>
              <StarRating value={ratingFaculty} onChange={setRatingFaculty} />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                4. Learning Hub Manuals & Videos Clarity
              </label>
              <StarRating value={ratingContent} onChange={setRatingContent} />
            </div>
          </div>

          {/* Qualitative Inputs */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Specific Comments on Practical Drills & Scenarios:
              </label>
              <textarea
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Highlight drill realism, needle decompression training, or tourniquet proficiency feedback..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Recommendations for Curriculum Improvement:
              </label>
              <textarea
                value={suggestions}
                onChange={e => setSuggestions(e.target.value)}
                placeholder="Suggestions for additional tactical scenarios, night drills, or CASEVAC equipment..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Anonymity Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isAnonymous ? (
                <EyeOff className="w-4 h-4 text-amber-400" />
              ) : (
                <User className="w-4 h-4 text-emerald-400" />
              )}
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  {isAnonymous ? 'Anonymous Submission Mode' : 'Attributed with Service Number'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAnonymous
                    ? 'Your service number and rank will not be appended to this response.'
                    : `Will be associated with ${currentUser.rank} ${currentUser.serviceNumber}.`}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                isAnonymous
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAnonymous ? 'ANONYMOUS' : 'MAKE ANONYMOUS'}
            </button>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Institutional Feedback</span>
          </button>
        </form>

        {/* Previous Feedback Submissions History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-military text-slate-300 uppercase tracking-wide">
              Recorded Submissions ({feedbacks.length})
            </h3>
            <MessageSquare className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {feedbacks.map(fb => (
              <div
                key={fb.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                  <span>{fb.submittedAt}</span>
                  <span className="text-amber-400">
                    ★ {fb.ratingOverall}.0 / 5.0
                  </span>
                </div>

                <div className="text-slate-300 italic">
                  "{fb.comments}"
                </div>

                {fb.suggestions && (
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="text-amber-400/80 font-mono">Suggested: </span>
                    {fb.suggestions}
                  </div>
                )}

                <div className="text-[10px] font-mono text-slate-500 pt-1 flex items-center justify-between">
                  <span>
                    Sender: {fb.isAnonymous ? 'REDACTED [ANONYMOUS]' : fb.serviceNumber}
                  </span>
                  <span>Moodle Survey: Synced</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
