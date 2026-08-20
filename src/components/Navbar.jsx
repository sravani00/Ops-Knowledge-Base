import React from 'react';
import { Search, Sun, Moon, BookOpen } from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  userRole,
  setUserRole,
  onOpenSearch,
  onOpenAiAssistant,
  currentView,
  selectedItemId
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 transition-colors">
      {/* Left: Dynamic Breadcrumb & Context */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center text-slate-700 font-semibold dark:text-slate-200">
          <BookOpen className="mr-1.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
          OpsPortal
        </span>
        <span>/</span>
        <span className="capitalize font-medium text-slate-900 dark:text-white">
          {currentView === 'dashboard'
            ? 'Dashboard'
            : currentView === 'esp'
            ? 'ESP Docs'
            : currentView === 'sops'
            ? 'SOP Library'
            : currentView === 'training'
            ? 'Training Center'
            : currentView === 'troubleshooting'
            ? 'Troubleshooting Center'
            : currentView === 'qa'
            ? 'QA Center'
            : currentView}
        </span>
        {(currentView === 'esp' || currentView === 'sops') && selectedItemId && (
          <>
            <span>/</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">
              {selectedItemId.replace('-', ' ')}
            </span>
          </>
        )}
      </div>

      {/* Center: Global Search Bar Trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className="flex items-center w-full justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-slate-400" />
            <span>Search processes, ESPs, SOPs, troubleshooting, QA...</span>
          </div>
          <kbd className="hidden sm:inline-block rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Actions: Theme Switcher */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Search Documentation"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Light / Dark Mode"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
}
