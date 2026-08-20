import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  CheckCircle,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { troubleshootingList, diagnosticWizardSteps } from '../data/troubleshootingData';

export default function TroubleshootingView() {
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  // Diagnostic Wizard State
  const [wizardStepId, setWizardStepId] = useState(1);
  const [wizardResult, setWizardResult] = useState(null);
  const [isWizardActive, setIsWizardActive] = useState(false);

  const filteredIssues = troubleshootingList;
  const activeIssue = troubleshootingList.find((i) => i.id === (wizardResult || selectedIssueId)) || troubleshootingList[0];

  const handleWizardOptionClick = (opt) => {
    if (opt.resultId) {
      setWizardResult(opt.resultId);
      setSelectedIssueId(opt.resultId);
    } else if (opt.nextStep) {
      setWizardStepId(opt.nextStep);
    }
  };

  const handleResetWizard = () => {
    setWizardStepId(1);
    setWizardResult(null);
    setIsWizardActive(false);
  };

  const currentWizardStep = diagnosticWizardSteps.find((s) => s.id === wizardStepId) || diagnosticWizardSteps[0];

  return (
    <div className="space-y-6 pb-12">

      {/* Interactive Diagnostic Wizard Panel */}
      {isWizardActive && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20 space-y-4 animate-fade-in shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center">
              <Sparkles className="mr-1.5 h-4 w-4 text-amber-500" />
              Interactive Diagnostic Wizard
            </h3>
            <button onClick={handleResetWizard} className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center">
              <RotateCcw className="mr-1 h-3 w-3" /> Reset Wizard
            </button>
          </div>

          {!wizardResult ? (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{currentWizardStep.question}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentWizardStep.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWizardOptionClick(opt)}
                    className="flex items-center justify-between rounded-xl border border-amber-200 bg-white p-3 text-left text-xs font-semibold text-slate-800 hover:border-amber-500 hover:bg-amber-100/50 dark:border-amber-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-amber-900/40 transition-all shadow-xs"
                  >
                    <span>{opt.label}</span>
                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white p-4 dark:bg-slate-900 border border-amber-300 dark:border-amber-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Root Cause Matched</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeIssue?.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">{activeIssue?.symptoms}</p>
            </div>
          )}
        </div>
      )}

      {/* Issues Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="space-y-2">
          {filteredIssues.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              No matching troubleshooting guides found.
            </div>
          ) : (
            filteredIssues.map((issue) => {
              const isSelected = activeIssue?.id === issue.id;
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`flex w-full items-start justify-between rounded-xl p-3.5 text-left border transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500'
                      : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                      {issue.category}
                    </span>
                    <h4 className="text-xs font-bold truncate">{issue.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{issue.symptoms}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Detail Pane */}
        {activeIssue && (
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                {activeIssue.category}
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">{activeIssue.title}</h2>
            </div>

            {/* Symptoms & Root Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4 dark:border-rose-900/30 dark:bg-rose-950/20 space-y-1">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Symptoms</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{activeIssue.symptoms}</p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20 space-y-1">
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Root Cause Analysis</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{activeIssue.rootCause}</p>
              </div>
            </div>

            {/* Resolution Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step-by-Step Resolution Plan
              </h3>
              <div className="space-y-2">
                {activeIssue.resolution.map((res, idx) => (
                  <div key={idx} className="flex items-start space-x-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Rule */}
            <div className="pt-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/30 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Prevention Rule</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeIssue.prevention}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
