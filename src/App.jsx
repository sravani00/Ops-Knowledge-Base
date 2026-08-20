import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import QuickSearchModal from './components/QuickSearchModal';
import AiAssistantModal from './components/AiAssistantModal';

import DashboardView from './views/DashboardView';
import EspDocView from './views/EspDocView';
import SopDocView from './views/SopDocView';
import TrainingView from './views/TrainingView';
import TroubleshootingView from './views/TroubleshootingView';
import QaCenterView from './views/QaCenterView';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [userRole, setUserRole] = useState('Admin');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (viewId, itemId = null) => {
    setCurrentView(viewId);
    setSelectedItemId(itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col transition-colors">
      <div className="flex flex-1">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          userRole={userRole}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            userRole={userRole}
            setUserRole={setUserRole}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAiAssistant={() => setIsAiOpen(true)}
            currentView={currentView}
            selectedItemId={selectedItemId}
          />

          {/* View Container */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
            {currentView === 'dashboard' && (
              <DashboardView onNavigate={handleNavigate} />
            )}

            {currentView === 'esp' && (
              <EspDocView
                espId={selectedItemId || 'ongage'}
                onSelectEsp={(id) => setSelectedItemId(id)}
              />
            )}

            {currentView === 'sops' && (
              <SopDocView
                sopId={selectedItemId || 'campaign-execution'}
                onSelectSop={(id) => setSelectedItemId(id)}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'training' && (
              <TrainingView initialTrackId={selectedItemId || 'beginner'} />
            )}

            {currentView === 'troubleshooting' && <TroubleshootingView />}

            {currentView === 'qa' && <QaCenterView />}
          </main>
        </div>
      </div>

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* AI Assistant Chatbot Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
