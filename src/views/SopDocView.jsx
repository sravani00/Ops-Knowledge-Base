import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  Clock,
  Shield,
  Layers,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { sopsList } from '../data/sopData';

export default function SopDocView({ sopId, onSelectSop, onNavigate }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const sop = sopsList.find((s) => s.id === sopId) || sopsList[0];

  const handleCopyShareableLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Selector & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              {sop.category}
            </span>
            <span className="text-xs text-slate-400">ID: SOP-{sop.id.toUpperCase()}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{sop.title}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{sop.purpose}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyShareableLink}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
            <span>{copiedLink ? 'Copied' : 'Share SOP'}</span>
          </button>

          <select
            value={sop.id}
            onChange={(e) => onSelectSop(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {sopsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scope & Prerequisites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <Shield className="mr-2 h-4 w-4 text-blue-500" />
            Applicable Scope
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{sop.scope}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <CheckSquare className="mr-2 h-4 w-4 text-emerald-500" />
            Mandatory Prerequisites
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {sop.prerequisites.map((pre, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{pre}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Step-by-Step Operating Instructions
        </h3>

        <div className="space-y-4">
          {sop.instructions.map((inst) => (
            <div key={inst.step} className="flex items-start space-x-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-sm">
                {inst.step}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{inst.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{inst.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist, Common Mistakes & Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verification Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
            Verification Checklist
          </h3>
          <div className="space-y-2">
            {sop.checklist.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-rose-500" />
            Common Pitfalls & Mistakes
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {sop.commonMistakes.map((m, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best Practices */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center">
            <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
            Recommended Best Practices
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {sop.bestPractices.map((bp, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
