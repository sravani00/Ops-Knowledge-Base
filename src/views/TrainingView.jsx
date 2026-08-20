import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  BookMarked
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trainingTracks } from '../data/trainingData';

export default function TrainingView({ initialTrackId = 'beginner' }) {
  const [activeTrackId, setActiveTrackId] = useState(initialTrackId);
  const [selectedCourseId, setSelectedCourseId] = useState('b-101');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  React.useEffect(() => {
    if (initialTrackId && trainingTracks.some((t) => t.id === initialTrackId)) {
      setActiveTrackId(initialTrackId);
      const foundTrack = trainingTracks.find((t) => t.id === initialTrackId);
      if (foundTrack && foundTrack.courses && foundTrack.courses.length > 0) {
        setSelectedCourseId(foundTrack.courses[0].id);
      }
    }
  }, [initialTrackId]);

  const [completedModules, setCompletedModules] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});
  const [quizScores, setQuizScores] = useState({});

  if (!trainingTracks || trainingTracks.length === 0) {
    return (
      <div className="space-y-6 pb-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/30">
            <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Training Modules Available</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            All training tracks and sub-modules have been deleted.
          </p>
        </div>
      </div>
    );
  }

  const track = trainingTracks.find((t) => t.id === activeTrackId) || trainingTracks[0];
  const course = track && track.courses && track.courses.length > 0
    ? (track.courses.find((c) => c.id === selectedCourseId) || track.courses[0])
    : null;

  const handleSelectAnswer = (questionId, optionIdx) => {
    if (!course) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [course.id]: {
        ...(prev[course.id] || {}),
        [questionId]: optionIdx
      }
    }));
  };

  const handleSubmitQuiz = () => {
    if (!course || !course.quiz) return;
    let correctCount = 0;
    const userAns = quizAnswers[course.id] || {};

    course.quiz.questions.forEach((q) => {
      if (userAns[q.id] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / course.quiz.questions.length) * 100);
    setQuizScores((prev) => ({ ...prev, [course.id]: scorePct }));
    setQuizSubmitted((prev) => ({ ...prev, [course.id]: true }));

    if (scorePct >= course.quiz.passScore) {
      setCompletedModules((prev) => ({ ...prev, [course.id]: true }));
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    if (!course) return;
    setQuizSubmitted((prev) => ({ ...prev, [course.id]: false }));
  };

  // Calculate overall track progress %
  const trackCourses = track ? track.courses : [];
  const completedCount = trackCourses.filter((c) => completedModules[c.id]).length;
  const progressPct = trackCourses.length > 0 ? Math.round((completedCount / trackCourses.length) * 100) : 0;

  const renderFormattedExplanation = (text) => {
    if (!text) return null;
    const clean = text.replace(/[#*]/g, '');
    const blocks = clean.split('\n\n');

    return (
      <div className="space-y-4">
        {blocks.map((block, bIdx) => {
          const lines = block.trim().split('\n');
          const firstLine = lines[0] ? lines[0].trim() : '';
          const isHeaderBlock = lines.length > 1 && !firstLine.includes(':') && firstLine.length < 80;

          return (
            <div key={bIdx} className="space-y-2.5 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                if (lIdx === 0 && isHeaderBlock) {
                  return (
                    <h5 key={lIdx} className="text-sm font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 pb-1.5 border-b border-purple-200 dark:border-purple-900/60 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                      {trimmed}
                    </h5>
                  );
                }

                if (trimmed.includes(':') && !trimmed.toLowerCase().startsWith('http')) {
                  const colonIdx = trimmed.indexOf(':');
                  const label = trimmed.slice(0, colonIdx).trim();
                  const content = trimmed.slice(colonIdx + 1).trim();

                  return (
                    <div key={lIdx} className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3 text-sm py-1">
                      <span className="font-bold text-slate-900 dark:text-white shrink-0 bg-purple-100/80 dark:bg-purple-900/50 text-purple-950 dark:text-purple-200 px-2.5 py-0.5 rounded text-xs">
                        {label}:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 self-center leading-relaxed">
                        {content}
                      </span>
                    </div>
                  );
                }

                if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
                  return (
                    <div key={lIdx} className="pt-1">
                      <a
                        href={trimmed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Reference Guide: {trimmed}</span>
                      </a>
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Track Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <GraduationCap className="mr-2.5 h-6 w-6 text-purple-600" />
              Operations Training & Certification Platform
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Structured learning paths with comprehensive guides, protocols, certifications, and interactive quizzes.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all shadow-xs"
              title={isSidebarMinimized ? "Expand Modules List" : "Minimize Modules List"}
            >
              {isSidebarMinimized ? (
                <>
                  <PanelLeftOpen className="h-4 w-4 text-purple-600" />
                  <span>Show Modules Sidebar</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="h-4 w-4 text-purple-600" />
                  <span>Minimize Modules Sidebar</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="text-xs font-medium text-slate-500">Progress:</span>
              <div className="w-28 rounded-full bg-slate-200 h-2.5 dark:bg-slate-700 overflow-hidden">
                <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{progressPct}%</span>
            </div>
          </div>
        </div>

        {/* Track Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {trainingTracks.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTrackId(t.id);
                setSelectedCourseId(t.courses[0].id);
              }}
              className={`flex flex-col justify-between rounded-xl p-3.5 text-left border transition-all ${
                activeTrackId === t.id
                  ? 'border-purple-600 bg-purple-50/80 text-purple-950 dark:bg-purple-900/30 dark:text-purple-200 font-bold shadow-xs ring-1 ring-purple-500'
                  : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  t.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                  t.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                  t.level === 'Advanced' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' :
                  t.level === 'Expert' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                }`}>
                  {t.level}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">{t.courses.length} Sub-modules</span>
              </div>
              <div>
                <div className="text-xs font-bold truncate">{t.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Learning Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Course Modules List (Collapsible / Minimizable) */}
        {!isSidebarMinimized && (
          <div className="space-y-3 lg:col-span-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {track.title} Modules
              </h3>
              <button
                onClick={() => setIsSidebarMinimized(true)}
                className="text-[11px] text-purple-600 hover:underline font-semibold flex items-center"
              >
                <PanelLeftClose className="h-3.5 w-3.5 mr-1" /> Minimize
              </button>
            </div>
            <div className="space-y-2">
              {track.courses.map((c, idx) => {
                const isSelected = c.id === course.id;
                const isDone = completedModules[c.id];
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCourseId(c.id)}
                    className={`flex w-full items-start justify-between rounded-xl p-3.5 text-left border transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-sm ring-1 ring-purple-500'
                        : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">{c.title}</h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area (Spans full width if sidebar minimized) */}
        <div className={`space-y-6 transition-all duration-300 ${isSidebarMinimized ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          {/* Module Content Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Module Lesson Content
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{course.title}</h2>
              </div>
              {completedModules[course.id] && (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Award className="mr-1.5 h-4 w-4" /> Passed & Certified
                </span>
              )}
            </div>

            {/* External Links Track Display */}
            {course.links && course.links.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <BookMarked className="h-4 w-4 text-purple-600" />
                  <span>External Learning Modules & Direct References</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.links.map((linkItem, lIdx) => (
                    <div key={lIdx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between hover:border-purple-300 transition-all">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                            {linkItem.category}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">{linkItem.publisher}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{linkItem.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{linkItem.description}</p>
                      </div>
                      <a
                        href={linkItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-purple-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-purple-500 active:scale-95 transition-all shadow-xs"
                      >
                        <span>Open Link Outside the Box</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Rendering */}
            {course.imageUrl && (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <img src={course.imageUrl} alt={course.title} className="max-w-full h-auto object-cover max-h-96" />
                </div>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{course.summary}</p>

            {course.explanation && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Lesson Explanation & Technical Guide</h4>
                {renderFormattedExplanation(course.explanation)}
              </div>
            )}

            {/* Key Topics */}
            {course.topics && course.topics.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Key Topics Covered</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {course.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start space-x-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/40">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Assignment */}
            {course.assignment && (
              <div className="pt-2">
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-1.5">
                  <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" /> Practical Assignment
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{course.assignment}</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Quiz Engine */}
          {course.quiz && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                    {course.quiz.title}
                  </h3>
                  <p className="text-xs text-slate-400">Pass Score Threshold: {course.quiz.passScore}%</p>
                </div>
                {quizSubmitted[course.id] && (
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> <span>Retake Quiz</span>
                  </button>
                )}
              </div>

              {/* Quiz Questions */}
              <div className="space-y-6">
                {course.quiz.questions.map((q, qIdx) => {
                  const userChoice = (quizAnswers[course.id] || {})[q.id];
                  const isSubmitted = quizSubmitted[course.id];
                  const isCorrect = userChoice === q.correct;

                  return (
                    <div key={q.id} className="space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Q{qIdx + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userChoice === optIdx;
                          let btnStyle = 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200 hover:bg-slate-100';

                          if (isSubmitted) {
                            if (optIdx === q.correct) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 font-bold';
                            } else if (isSelected && optIdx !== q.correct) {
                              btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-purple-600 bg-purple-50 text-purple-950 dark:bg-purple-900/30 dark:text-purple-200 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`flex w-full items-center justify-between rounded-xl p-3.5 text-left border text-xs sm:text-sm transition-all ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSelected && <span className="text-[10px] font-bold uppercase ml-2">Selected</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation post submit */}
                      {isSubmitted && (
                        <div className={`rounded-xl p-3 text-xs leading-relaxed ${isCorrect ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button & Score Banner */}
              {!quizSubmitted[course.id] ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full rounded-xl bg-purple-600 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-purple-500 active:scale-95 transition-all shadow-md"
                >
                  Submit & Score Quiz
                </button>
              ) : (
                <div className={`rounded-xl p-4 text-center space-y-2 ${
                  quizScores[course.id] >= course.quiz.passScore
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-900/40 dark:text-rose-200 dark:border-rose-800'
                }`}>
                  <h4 className="text-sm sm:text-base font-extrabold">
                    {quizScores[course.id] >= course.quiz.passScore ? '🎉 Quiz Passed!' : '❌ Pass Threshold Not Met'}
                  </h4>
                  <p className="text-xs sm:text-sm">
                    Your Score: <strong>{quizScores[course.id]}%</strong> (Required: {course.quiz.passScore}%)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
