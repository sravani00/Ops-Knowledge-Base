import React from 'react';
import {
  Mail,
  FileText,
  GraduationCap,
  AlertTriangle,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Shield,
  BookOpen,
  Zap,
  Activity
} from 'lucide-react';
import { espList } from '../data/espData';
import { sopsList } from '../data/sopData';
import { trainingTracks } from '../data/trainingData';

export default function DashboardView({ onNavigate }) {
  const mainHubs = [
    {
      id: 'training',
      title: 'Training Center',
      subtitle: 'Structured operations modules with interactive quizzes & certifications.',
      icon: GraduationCap,
      color: 'purple',
      badge: `${trainingTracks.length} Modules`,
      targetId: null
    },
    {
      id: 'esp',
      title: 'ESP Documentation',
      subtitle: 'Comprehensive guides for Ongage, Netcore & Maropost, domain auth & tags.',
      icon: Mail,
      color: 'blue',
      badge: `${espList.length} ESPs`,
      targetId: 'ongage'
    },
    {
      id: 'sops',
      title: 'Process SOP Library',
      subtitle: 'Standardized SOPs for campaign execution, suppression, and dispatch scheduling.',
      icon: FileText,
      color: 'emerald',
      badge: `${sopsList.length} SOPs`,
      targetId: 'campaign-execution'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting & QA',
      subtitle: 'Interactive diagnostic guides for deliverability blocks & pre-send QA checklists.',
      icon: AlertTriangle,
      color: 'amber',
      badge: 'Interactive',
      targetId: null
    }
  ];

  const quickStats = [
    { label: 'Supported ESPs', value: `${espList.length} Platforms`, icon: Mail, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Active Process SOPs', value: `${sopsList.length} Standardized`, icon: FileText, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { label: 'Training Tracks', value: `${trainingTracks.length} Certifications`, icon: GraduationCap, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' },
    { label: 'Pre-Send QA', value: '10 Checklists', icon: CheckSquare, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Sleek Professional Welcome Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs transition-all">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Operations Knowledge Hub</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Email Campaign Operations Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Centralized platform for ESP technical guides, standardized process SOPs, pre-flight QA checklists, and operations team certification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('training')}
              className="inline-flex items-center rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700 shadow-sm active:scale-95 transition-all"
            >
              <GraduationCap className="mr-2 h-4 w-4 text-purple-200" /> Training Center
            </button>
            <button
              onClick={() => onNavigate('sops', 'campaign-execution')}
              className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm active:scale-95 transition-all"
            >
              <FileText className="mr-2 h-4 w-4" /> Campaign SOP
            </button>
            <button
              onClick={() => onNavigate('qa')}
              className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
            >
              <CheckSquare className="mr-2 h-4 w-4 text-emerald-500" /> Pre-Send QA
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center space-x-3"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-medium text-slate-400 block truncate">{stat.label}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block mt-0.5">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Core Module Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
          <Activity className="mr-2 h-4 w-4 text-blue-600" /> Operational Hubs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainHubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div
                key={hub.id}
                onClick={() => onNavigate(hub.id, hub.targetId)}
                className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-xs ${
                      hub.color === 'blue' ? 'bg-blue-600' :
                      hub.color === 'emerald' ? 'bg-emerald-600' :
                      hub.color === 'purple' ? 'bg-purple-600' : 'bg-amber-500'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {hub.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {hub.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {hub.subtitle}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Explore Hub</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported ESP Platforms Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <Mail className="mr-2 h-4 w-4 text-blue-600" /> Supported ESP Platforms
          </h3>
          <button
            onClick={() => onNavigate('esp', 'ongage')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            View All ESP Guides <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {espList.map((esp) => (
            <div
              key={esp.id}
              onClick={() => onNavigate('esp', esp.id)}
              className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-xs shadow-xs ${esp.logoBg}`}>
                  {esp.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">{esp.category}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {esp.name}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {esp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
