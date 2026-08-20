import React, { useState } from 'react';
import {
  Home,
  Mail,
  FileText,
  GraduationCap,
  AlertTriangle,
  CheckSquare,
  Cpu,
  Shield,
  Layers,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import { espList } from '../data/espData';
import { sopsList } from '../data/sopData';
import { trainingTracks } from '../data/trainingData';

export default function Sidebar({
  currentView,
  setCurrentView,
  selectedItemId,
  setSelectedItemId,
  userRole
}) {
  const [espOpen, setEspOpen] = useState(true);
  const [sopsOpen, setSopsOpen] = useState(true);
  const [showAllSops, setShowAllSops] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home, badge: null },
    { id: 'training', label: 'Training Center', icon: GraduationCap, badge: `${trainingTracks.length} Modules` },
    { id: 'esp', label: 'ESP Documentation', icon: Mail, badge: espList.length, hasSub: true },
    { id: 'sops', label: 'Process SOP Library', icon: FileText, badge: sopsList.length, hasSub: true },
    { id: 'troubleshooting', label: 'Troubleshooting Center', icon: AlertTriangle, badge: '8 Issues' },
    { id: 'qa', label: 'QA Checklists', icon: CheckSquare, badge: '10 Guides' }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (viewId === 'training') {
      if (!selectedItemId) setSelectedItemId('beginner');
    } else if (viewId === 'esp') {
      if (!selectedItemId) setSelectedItemId('ongage');
    } else if (viewId === 'sops') {
      if (!selectedItemId) setSelectedItemId('campaign-execution');
    } else {
      setSelectedItemId(null);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 focus:outline-none"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center px-5 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold shadow-md">
              OP
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">Ops Knowledge Base</h1>
              <p className="text-[10px] text-slate-400">Process & Training Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation Scrollable Body */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  onClick={() => {
                    if (item.id === 'esp') setEspOpen(!espOpen);
                    else if (item.id === 'sops') setSopsOpen(!sopsOpen);
                    handleNavClick(item.id);
                  }}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isActive
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.hasSub && (
                      <span className="text-slate-500">
                        {(item.id === 'esp' && espOpen) || (item.id === 'sops' && sopsOpen) ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </button>

                {/* Submenu for ESP Documentation */}
                {item.id === 'esp' && espOpen && (
                  <div className="ml-6 space-y-0.5 border-l border-slate-800 pl-2.5 pt-1">
                    {espList.map((esp) => (
                      <button
                        key={esp.id}
                        onClick={() => {
                          setCurrentView('esp');
                          setSelectedItemId(esp.id);
                          setIsMobileOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                          currentView === 'esp' && selectedItemId === esp.id
                            ? 'bg-slate-800 text-blue-400 font-semibold'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate text-left min-w-0 pr-1">{esp.name.replace(' Marketing Cloud', '')}</span>
                        <span className="text-[10px] text-slate-500 shrink-0">{esp.category.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Submenu for SOPs */}
                {item.id === 'sops' && sopsOpen && (
                  <div className="ml-6 space-y-0.5 border-l border-slate-800 pl-2.5 pt-1 max-h-80 overflow-y-auto scrollbar-thin">
                    {(showAllSops ? sopsList : sopsList.slice(0, 7)).map((sop) => (
                      <button
                        key={sop.id}
                        onClick={() => {
                          setCurrentView('sops');
                          setSelectedItemId(sop.id);
                          setIsMobileOpen(false);
                        }}
                        className={`flex w-full items-center truncate text-left rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                          currentView === 'sops' && selectedItemId === sop.id
                            ? 'bg-slate-800 text-blue-400 font-semibold'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{sop.title.replace(' SOP', '')}</span>
                      </button>
                    ))}
                    {sopsList.length > 7 && (
                      <button
                        onClick={() => setShowAllSops(!showAllSops)}
                        className="text-[11px] text-blue-400 hover:underline px-2.5 py-1 font-semibold block text-left"
                      >
                        {showAllSops ? 'Show Less' : `+ ${sopsList.length - 7} more SOPs...`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <span>Ops Platform v2.4</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <p className="mt-1 text-[10px] text-slate-600">Centralized Operations Hub</p>
        </div>
      </aside>
    </>
  );
}
