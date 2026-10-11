import React, { useState } from 'react';
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  Check,
  Maximize2,
  AlertCircle,
  X,
  Volume2,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoResource } from '../types';

export const VideoLibrary: React.FC = () => {
  const { videos, markVideoCompleted, selectedVideo, setSelectedVideo } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleOpenVideo = (video: VideoResource) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setActiveStepIndex(0);
  };

  const handleCompleteActivity = (videoId: string) => {
    markVideoCompleted(videoId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
              HIGH-INTENSITY COMBAT DRILLS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Tactical Video Library & Step Drilldown
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Demonstrations of vital combat lifesaving maneuvers, CUF rapid drags, and needle thoracostomy.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          <span>
            {videos.filter(v => v.completed).length} of {videos.length} Drills Completed
          </span>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {videos.map(video => (
          <div
            key={video.id}
            className="rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between group shadow-lg transition-all"
          >
            <div>
              {/* Thumbnail Container */}
              <div
                onClick={() => handleOpenVideo(video)}
                className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[11px] font-mono font-semibold text-slate-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {video.category}
                </div>

                {video.completed && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-600 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    COMPLETED
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4 sm:p-5">
                <div className="text-[10px] font-mono text-slate-400 mb-1">
                  ACTIVITY: {video.code} • MOODLE: {video.moodleActivityId}
                </div>
                <h2
                  onClick={() => handleOpenVideo(video)}
                  className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {video.title}
                </h2>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {video.summary}
                </p>

                {/* Quick Steps Preview */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {video.steps.map((st, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                    >
                      {st.time} {st.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                {video.completed ? 'Moodle completion recorded' : 'Uncompleted activity'}
              </span>

              <div className="flex items-center gap-2">
                {!video.completed && (
                  <button
                    onClick={() => handleCompleteActivity(video.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                  >
                    Mark Done
                  </button>
                )}
                <button
                  onClick={() => handleOpenVideo(video)}
                  className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono transition-colors"
                >
                  Launch Drill
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  TACTICAL SIMULATION • {selectedVideo.code}
                </span>
                <h2 className="text-sm sm:text-base font-bold font-military text-slate-100 truncate max-w-xl">
                  {selectedVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport Simulated Player */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Military HUD Overlays */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                REC • 1080P HD • SECURE DRILL FEED
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                STEP {activeStepIndex + 1}/{selectedVideo.steps.length}: {selectedVideo.steps[activeStepIndex]?.label}
              </div>

              {/* Center Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center hover:scale-110 hover:bg-amber-400 transition-all shadow-2xl cursor-pointer"
              >
                {isPlaying ? <Play className="w-7 h-7 fill-current ml-1" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>

              {/* Player Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-3 pt-6 flex flex-col gap-2">
                {/* Timeline Progress */}
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
                  <div
                    className="bg-amber-500 h-full transition-all"
                    style={{ width: `${((activeStepIndex + 1) / selectedVideo.steps.length) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-amber-400 hover:text-amber-300 font-bold"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <span>
                      {selectedVideo.steps[activeStepIndex]?.time} / {selectedVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveStepIndex(0)}
                      className="hover:text-slate-100 flex items-center gap-1 text-[11px]"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Replay Step</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Steps & Takeaways Tab Bar */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-900">
              {/* Steps timeline clickable buttons */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Procedural Milestones:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedVideo.steps.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 mb-0.5">
                        <span>STEP 0{idx + 1}</span>
                        <span>{st.time}</span>
                      </div>
                      <div className="font-semibold text-slate-200">{st.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{st.detail}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tactical Takeaways */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Crucial Doctrinal Takeaways</span>
                </div>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-300">
                  {selectedVideo.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  markVideoCompleted(selectedVideo.id);
                  setSelectedVideo(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase font-mono flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Mark Activity Complete in Moodle</span>
              </button>

              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
