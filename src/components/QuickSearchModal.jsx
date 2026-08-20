import React, { useState, useEffect } from 'react';
import { Search, X, Mail, FileText, GraduationCap, AlertTriangle, CheckSquare, Cpu, ArrowRight } from 'lucide-react';
import { espList } from '../data/espData';
import { sopsList } from '../data/sopData';
import { trainingTracks } from '../data/trainingData';
import { troubleshootingList } from '../data/troubleshootingData';
import { qaChecklists } from '../data/qaData';

export default function QuickSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = [];
  const q = query.toLowerCase().trim();

  if (q.length > 0) {
    // Search ESPs
    espList.forEach((esp) => {
      if (
        esp.name.toLowerCase().includes(q) ||
        esp.description.toLowerCase().includes(q) ||
        esp.overview.introduction.toLowerCase().includes(q)
      ) {
        results.push({
          id: esp.id,
          title: `${esp.name} ESP Documentation`,
          category: 'ESP',
          snippet: esp.description,
          icon: Mail,
          view: 'esp',
          itemId: esp.id
        });
      }
    });

    // Search SOPs
    sopsList.forEach((sop) => {
      if (
        sop.title.toLowerCase().includes(q) ||
        sop.purpose.toLowerCase().includes(q) ||
        sop.instructions.some((inst) => inst.title.toLowerCase().includes(q) || inst.details.toLowerCase().includes(q))
      ) {
        results.push({
          id: sop.id,
          title: sop.title,
          category: 'SOP',
          snippet: sop.purpose,
          icon: FileText,
          view: 'sops',
          itemId: sop.id
        });
      }
    });

    // Search Training
    trainingTracks.forEach((track) => {
      track.courses.forEach((course) => {
        if (
          course.title.toLowerCase().includes(q) ||
          course.summary.toLowerCase().includes(q) ||
          course.topics.some((t) => t.toLowerCase().includes(q))
        ) {
          results.push({
            id: course.id,
            title: course.title,
            category: `Training (${track.level})`,
            snippet: course.summary,
            icon: GraduationCap,
            view: 'training',
            itemId: course.id
          });
        }
      });
    });

    // Search Troubleshooting
    troubleshootingList.forEach((tb) => {
      if (
        tb.title.toLowerCase().includes(q) ||
        tb.symptoms.toLowerCase().includes(q) ||
        tb.rootCause.toLowerCase().includes(q)
      ) {
        results.push({
          id: tb.id,
          title: tb.title,
          category: 'Troubleshooting',
          snippet: tb.symptoms,
          icon: AlertTriangle,
          view: 'troubleshooting',
          itemId: tb.id
        });
      }
    });

    // Search QA
    qaChecklists.forEach((qa) => {
      if (qa.title.toLowerCase().includes(q) || qa.description.toLowerCase().includes(q)) {
        results.push({
          id: qa.id,
          title: qa.title,
          category: 'QA Checklist',
          snippet: qa.description,
          icon: CheckSquare,
          view: 'qa',
          itemId: qa.id
        });
      }
    });
  }

  const filteredResults =
    activeFilter === 'All' ? results : results.filter((r) => r.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Search Header */}
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search processes, ESPs, SOPs, deliverability, troubleshooting..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs dark:border-slate-800 dark:bg-slate-800/40">
          {['All', 'ESP', 'SOP', 'Training', 'Troubleshooting', 'QA'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-40 text-blue-500" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">Search Operations Knowledge Base</p>
              <p className="mt-1">Search 6 ESPs, 15 SOPs, 3 Training Tracks, and 8 Troubleshooting guides.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400">
              No documentation found matching "<span className="font-semibold text-slate-700 dark:text-slate-300">{query}</span>".
            </div>
          ) : (
            filteredResults.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    onNavigate(item.view, item.itemId);
                    onClose();
                  }}
                  className="group flex w-full items-start rounded-xl p-3 text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="mr-3 mt-0.5 rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 truncate">
                        {item.title}
                      </h4>
                      <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{item.snippet}</p>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
