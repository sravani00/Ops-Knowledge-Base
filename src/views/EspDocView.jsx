import React, { useState } from 'react';
import {
  Mail,
  Shield,
  Layers,
  FileCode,
  BarChart,
  AlertOctagon,
  HelpCircle,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Send,
  Play,
  Settings,
  User,
  LayoutGrid,
  LayoutDashboard,
  Users,
  Menu,
  ChevronDown,
  ChevronUp,
  Filter,
  Sliders,
  CheckCircle2,
  Clock,
  Zap,
  Target
} from 'lucide-react';
import { espList } from '../data/espData';

const moduleIconMap = {
  LayoutDashboard,
  Send,
  Users,
  FileCode,
  BarChart,
  Settings,
  User,
  Menu
};

const usageStatusColors = {
  'Frequently Used': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Used': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Admin Only': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Not Used': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  'Optional': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Not Currently Used': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
};

function PlatformModulesTab({ modules }) {
  const [expandedModule, setExpandedModule] = useState(modules[0]?.id || null);

  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
          <LayoutGrid className="mr-2 h-4 w-4 text-blue-500" />
          Platform Module Architecture
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Platform consists of {modules.length} primary modules. Click any module below to explore its sub-modules, organizational usage, and key activities.
        </p>
      </div>

      {/* Module Accordion */}
      {modules.map((mod) => {
        const IconComp = moduleIconMap[mod.icon] || LayoutGrid;
        const isExpanded = expandedModule === mod.id;

        return (
          <div key={mod.id} className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden transition-all">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                  <IconComp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mod.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {mod.subModules.length} sub-modules
                    <span className="mx-1.5">•</span>
                    {mod.subModules.filter(s => s.usageStatus === 'Frequently Used' || s.usageStatus === 'Used').length} actively used
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{mod.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mod.subModules.map((sub, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 space-y-2.5 transition-all ${
                        sub.usageStatus === 'Not Used' || sub.usageStatus === 'Not Currently Used'
                          ? 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/20 opacity-60'
                          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</h5>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${usageStatusColors[sub.usageStatus] || usageStatusColors['Not Used']}`}>
                          {sub.usageStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{sub.purpose}</p>
                      {sub.usageNote && (
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium italic">{sub.usageNote}</p>
                      )}
                      {sub.keyActivities && sub.keyActivities.length > 0 && (sub.usageStatus !== 'Not Used' && sub.usageStatus !== 'Not Currently Used') && (
                        <div className="pt-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Key Activities:</span>
                          <div className="flex flex-wrap gap-1">
                            {sub.keyActivities.map((act, aIdx) => (
                              <span key={aIdx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function EspDocView({ espId, onSelectEsp }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedTag, setCopiedTag] = useState(null);

  const esp = espList.find((e) => e.id === espId) || espList[0];

  const handleCopyTag = (tag) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Mail },
    { id: 'campaign', label: 'Campaign Process', icon: Play },
    { id: 'lists', label: 'Lists & Segments', icon: Layers },
    { id: 'templates', label: 'Templates & Variables', icon: FileCode }
  ];

  if (esp.modules) {
    tabs.push({ id: 'modules', label: 'Platform Modules', icon: LayoutGrid });
  }

  if (esp.settings) {
    tabs.push({ id: 'settings', label: 'Settings Module', icon: Settings });
  }

  if (esp.profile) {
    tabs.push({ id: 'profile', label: 'Profile & Account Module', icon: User });
  }

  tabs.push(
    { id: 'errors', label: 'Common Errors', icon: AlertOctagon },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle }
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Selector bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white font-extrabold text-sm ${esp.logoBg} shadow-md`}>
            {esp.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{esp.name} Documentation</h1>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {esp.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{esp.description}</p>
          </div>
        </div>

        {/* ESP Quick Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">Switch ESP:</span>
          <select
            value={esp.id}
            onChange={(e) => onSelectEsp(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {espList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Navigation (Single Streamlined Sticky Header) */}
      <div className="sticky top-16 z-20 flex space-x-1.5 overflow-x-auto border border-slate-200/80 bg-white/90 p-1.5 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-xs scrollbar-none transition-all">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}

      {/* 1. Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Introduction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{esp.overview.introduction}</p>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider pt-2">Key Platform Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {esp.overview.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider pt-2">Primary Use Cases</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-2">
              {esp.overview.useCases.map((uc, idx) => (
                <li key={idx}>{uc}</li>
              ))}
            </ul>
          </div>

          {/* Login Process & Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                <Shield className="mr-2 h-4 w-4 text-blue-500" />
                Login Process & SSO
              </h3>
              <p className="text-xs text-slate-500">
                Portal URL:{' '}
                <a href={esp.overview.loginProcess.url} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center font-mono">
                  {esp.overview.loginProcess.url} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </p>
              <div className="space-y-2 pt-2">
                {esp.overview.loginProcess.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                <BarChart className="mr-2 h-4 w-4 text-emerald-500" />
                Dashboard Overview
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {esp.overview.dashboardOverview}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Campaign Process */}
      {activeTab === 'campaign' && (
        <div className="space-y-6">
          {/* Visual Step-by-Step UI Card Blueprint */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-6 dark:border-blue-900/50 dark:from-slate-900 dark:to-blue-950/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                <Target className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                Visual Guide — 4-Step Campaign Creation Wizard ({esp.name})
              </h3>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                Self-Service Walkthrough
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Follow this step-by-step visual blueprint when building real campaigns on {esp.name} without needing external assistance.
            </p>

            {/* Visual Step Wireframe Diagrams */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
                  <span className="text-[10px] font-bold uppercase text-blue-600">Settings</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Step 1 — Email Settings</h4>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div>Sender: Daily Deals</div>
                  <div>From: news@domain.com</div>
                  <div>Unsub Link: Enabled</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">2</span>
                  <span className="text-[10px] font-bold uppercase text-purple-600">Creative</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Step 2 — Design & Copy</h4>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div>Subject: Flash Sale 50% Off</div>
                  <div>Width: 600px Responsive</div>
                  <div>Tag: Hello {'{{firstname}}'}</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">3</span>
                  <span className="text-[10px] font-bold uppercase text-emerald-600">Audience</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Step 3 — Audience Selection</h4>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div>Include: 7-Day Opener</div>
                  <div>Exclude: Suppressions</div>
                  <div>Route: Amazon SES / Netcore</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">4</span>
                  <span className="text-[10px] font-bold uppercase text-amber-600">Schedule</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Step 4 — Schedule & Throttle</h4>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div>Time: 9:00 AM Local STD</div>
                  <div>Rate: 15,000 / hour</div>
                  <div>Status: Ready to Launch</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Detailed Campaign Execution Workflow
              </h3>
              <span className="text-xs text-slate-400">Total Steps: {esp.campaignProcess.length}</span>
            </div>

            {/* Visual Step Timeline */}
            <div className="relative space-y-4 before:absolute before:left-3.5 before:top-2 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {esp.campaignProcess.map((step) => (
                <div key={step.step} className="relative flex items-start space-x-4 pl-1">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm ring-4 ring-white dark:ring-slate-900">
                    {step.step}
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Lists & Segments */}
      {activeTab === 'lists' && (
        <div className="space-y-6">
          {/* Visual Segment Builder Diagram Card */}
          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/80 to-indigo-50/50 p-6 dark:border-purple-900/50 dark:from-slate-900 dark:to-purple-950/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                <Sliders className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                Visual Guide — Interactive Segment Builder Rules Blueprint
              </h3>
              <span className="rounded-full bg-purple-600 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                48,250 Live Target Contacts
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Visual reference for building high-converting dynamic segment queries. Always verify matching contact count before campaign dispatch.
            </p>

            {/* Segment Query Logic Visualizer */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Segment Filter Logic Rules</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Active Logic Validated
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-950 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 shrink-0">[RULE 1 - Location]</span>
                  <span>Contact Attribute: Country EQUALS "United States"</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-blue-50 text-blue-950 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                  <span className="font-bold text-blue-700 dark:text-blue-300 shrink-0">[AND RULE 2 - Engagement]</span>
                  <span>Behavioral Rule: Opened Any Email IN LAST 7 Days</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-purple-50 text-purple-950 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                  <span className="font-bold text-purple-700 dark:text-purple-300 shrink-0">[AND RULE 3 - CTR]</span>
                  <span>Behavioral Rule: Clicked Link IN LAST 30 Days</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-rose-50 text-rose-950 dark:bg-rose-900/30 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
                  <span className="font-bold text-rose-700 dark:text-rose-300 shrink-0">[EXCLUDE RULE 4 - Hygiene]</span>
                  <span>Suppression Filter: Exclude Hard Bounces & Complaints List</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500">Calculated Dynamic Target Audience:</span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                  48,250 Verified Contacts Ready
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">List Upload & Import</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{esp.listsAndSegments.uploadProcess}</p>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pt-2">Standard Attributes</h4>
              <div className="flex flex-wrap gap-1.5">
                {esp.listsAndSegments.attributes.map((attr, idx) => (
                  <span key={idx} className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Segmentation & Suppression</h3>
              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Segmentation Rules:</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{esp.listsAndSegments.segmentation}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Suppression Handling:</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{esp.listsAndSegments.suppression}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">List Hygiene Validation:</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{esp.listsAndSegments.validation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Templates & Variables */}
      {activeTab === 'templates' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Creating & Editing Templates</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{esp.templates.creation}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Dynamic Tag Cheat-sheet ({esp.name})</h3>
            <div className="space-y-2">
              {esp.templates.variables.map((v, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{v.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="rounded bg-slate-200 px-2 py-1 font-mono text-xs font-bold text-blue-700 dark:bg-slate-700 dark:text-blue-300">
                      {v.tag}
                    </code>
                    <button
                      onClick={() => handleCopyTag(v.tag)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
                      title="Copy Tag"
                    >
                      {copiedTag === v.tag ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Personalization Rules</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{esp.templates.personalization}</p>
          </div>
        </div>
      )}

      {/* 5. Platform Modules */}
      {activeTab === 'modules' && esp.modules && (
        <PlatformModulesTab modules={esp.modules} />
      )}

      {/* 6. Settings Module */}
      {activeTab === 'settings' && esp.settings && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
              <Settings className="mr-2 h-4 w-4 text-blue-500" />
              Settings Module Architecture
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {esp.settings.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {esp.settings.subModules.map((sub, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</h4>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${usageStatusColors[sub.usageStatus] || usageStatusColors['Used']}`}>
                    {sub.usageStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sub.purpose}</p>
                {sub.keyActivities && sub.keyActivities.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Key Actions:</span>
                    <div className="flex flex-wrap gap-1">
                      {sub.keyActivities.map((act, aIdx) => (
                        <span key={aIdx} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Profile Module */}
      {activeTab === 'profile' && esp.profile && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
              <User className="mr-2 h-4 w-4 text-purple-500" />
              Profile & Account Management
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {esp.profile.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {esp.profile.subModules.map((sub, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</h4>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${usageStatusColors[sub.usageStatus] || usageStatusColors['Used']}`}>
                    {sub.usageStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sub.purpose}</p>
                {sub.keyActivities && sub.keyActivities.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Key Actions:</span>
                    <div className="flex flex-wrap gap-1">
                      {sub.keyActivities.map((act, aIdx) => (
                        <span key={aIdx} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Common Errors */}
      {activeTab === 'errors' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Common Errors & Quick Resolutions</h3>
          <div className="space-y-3">
            {esp.commonErrors.map((err, idx) => (
              <div key={idx} className="rounded-xl border border-rose-100 bg-rose-50/50 p-4 dark:border-rose-900/30 dark:bg-rose-950/20 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <AlertOctagon className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{err.code} — {err.message}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 pl-6 leading-relaxed">
                  <strong className="text-rose-700 dark:text-rose-300">Resolution:</strong> {err.resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. FAQs */}
      {activeTab === 'faqs' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {esp.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                  <HelpCircle className="mr-1.5 h-4 w-4 text-blue-500" />
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
