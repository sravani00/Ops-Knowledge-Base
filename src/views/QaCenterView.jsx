import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { qaChecklists } from '../data/qaData';

export default function QaCenterView() {
  const [selectedQaId, setSelectedQaId] = useState('pre-send');
  const [checkedItems, setCheckedItems] = useState({});
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const activeQa = qaChecklists.find((q) => q.id === selectedQaId) || qaChecklists[0];

  const handleToggleItem = (itemId) => {
    setCheckedItems((prev) => {
      const nextState = { ...prev, [itemId]: !prev[itemId] };

      // Check if all items in active QA are checked -> fire confetti!
      const allChecked = activeQa.items.every((it) => nextState[it.id]);
      if (allChecked) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      return nextState;
    });
  };

  const handleResetChecklist = () => {
    const updated = { ...checkedItems };
    activeQa.items.forEach((it) => {
      delete updated[it.id];
    });
    setCheckedItems(updated);
  };

  // Score calculation
  const totalItems = activeQa.items.length;
  const checkedCount = activeQa.items.filter((it) => checkedItems[it.id]).length;
  const scorePct = Math.round((checkedCount / totalItems) * 100);

  const handleCopyAuditReceipt = () => {
    const receiptText = `=== OPS QA AUDIT COMPLIANCE RECEIPT ===
Checklist: ${activeQa.title} (${activeQa.category})
Date: ${new Date().toISOString()}
Pass Score: ${scorePct}% (${checkedCount}/${totalItems} Completed)
Status: ${scorePct === 100 ? 'PASSED & APPROVED FOR SEND' : 'PENDING QA INCOMPLETE'}

Items Audit:
${activeQa.items.map((it) => `[${checkedItems[it.id] ? 'X' : ' '}] ${it.text}`).join('\n')}
=======================================`;

    navigator.clipboard.writeText(receiptText);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <CheckSquare className="mr-2 h-5 w-5 text-emerald-600" />
            Operations Quality Assurance (QA) Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive pre-send, post-send, domain, and data validation audit checklists with real-time pass scoring.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetChecklist}
            className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" /> <span>Reset Active Checklist</span>
          </button>
          <button
            onClick={handleCopyAuditReceipt}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition-all"
          >
            {copiedReceipt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedReceipt ? 'Receipt Copied!' : 'Export Audit Receipt'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Checklist Selector & Interactive Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Checklist Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            QA Checklists ({qaChecklists.length})
          </h3>
          {qaChecklists.map((qa) => {
            const isSelected = qa.id === activeQa.id;
            const qaCheckedCount = qa.items.filter((it) => checkedItems[it.id]).length;
            const isComplete = qaCheckedCount === qa.items.length;

            return (
              <button
                key={qa.id}
                onClick={() => setSelectedQaId(qa.id)}
                className={`flex w-full items-center justify-between rounded-xl p-3 text-left border transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{qa.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{qa.category}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isComplete
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {qaCheckedCount}/{qa.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Interactive QA Execution Board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6 shadow-xs">
            {/* Checklist Title & Progress Meter */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {activeQa.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{activeQa.title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeQa.description}</p>
              </div>

              {/* Readiness Meter */}
              <div className="flex items-center space-x-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                <div className="text-right">
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{scorePct}%</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Compliance Score</div>
                </div>
                <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-emerald-500 flex items-center justify-center dark:border-slate-700">
                  {scorePct === 100 ? (
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Checklist Interactive Items */}
            <div className="space-y-3">
              {activeQa.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`flex items-start space-x-3 rounded-xl p-3.5 border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-emerald-200 bg-emerald-50/50 text-slate-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${isChecked ? 'line-through opacity-70' : ''}`}>
                          {item.text}
                        </span>
                        {item.mandatory && (
                          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Required</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Banner */}
            {scorePct === 100 ? (
              <div className="rounded-xl bg-emerald-100/70 p-4 text-center text-xs font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                🎉 100% QA Validation Achieved! Campaign is fully compliant for immediate queue dispatch.
              </div>
            ) : (
              <div className="rounded-xl bg-amber-50 p-3 text-center text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Complete all required QA check items before approving campaign for queue dispatch.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
