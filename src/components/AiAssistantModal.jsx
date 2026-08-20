import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { espList } from '../data/espData';
import { sopsList } from '../data/sopData';
import { troubleshootingList } from '../data/troubleshootingData';

export default function AiAssistantModal({ isOpen, onClose, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Operations Assistant. Ask me anything about ESP configurations, SOP guidelines, deliverability troubleshooting, or campaign QA processes!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How do I setup DMARC for Netcore?',
    'What is the Gmail 550 5.7.1 resolution?',
    'What are the steps for Campaign Execution SOP?',
    'How to handle weekend suppression list updates?'
  ];

  const handleSend = (userText) => {
    const text = userText || input;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!userText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botAnswer = generateBotResponse(text);
      setMessages([...newMessages, { sender: 'bot', text: botAnswer.text, link: botAnswer.link }]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();

    // Check Gmail 550 rate limit
    if (q.includes('gmail') || q.includes('550') || q.includes('rate limit')) {
      return {
        text: 'For Gmail 550 5.7.1 rate limit errors:\n1. Pause active Gmail sends immediately.\n2. Check Gmail Postmaster Tools for reputation drops.\n3. Reduce hourly sending rate by 60%.\n4. Send only to 3-day active openers until reputation recovers.',
        link: { view: 'troubleshooting', itemId: 'tb-001', label: 'View Troubleshooting Guide (tb-001)' }
      };
    }

    // Check DMARC / Netcore / SPF
    if (q.includes('dmarc') || q.includes('netcore') || q.includes('spf') || q.includes('dkim')) {
      return {
        text: 'Netcore Domain Authentication requires:\n• SPF: v=spf1 include:netcorecloud.net ~all\n• DKIM: CNAME netcore._domainkey.domain.com\n• DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@domain.com\nMake sure total SPF DNS lookups remain under 10.',
        link: { view: 'esp', itemId: 'netcore', label: 'View Netcore Domain Setup' }
      };
    }

    // Check SOP Execution
    if (q.includes('sop') || q.includes('campaign execution') || q.includes('steps')) {
      return {
        text: 'The Campaign Execution SOP involves 7 core steps:\n1. Log into ESP workspace\n2. Import & scrub list\n3. Load HTML & Subject line\n4. Attach UTM tracking\n5. Send seed test email\n6. Dispatch with throttling\n7. Perform 15-min post-send bounce check.',
        link: { view: 'sops', itemId: 'campaign-execution', label: 'Open Campaign Execution SOP' }
      };
    }

    // Check Ongage
    if (q.includes('ongage')) {
      return {
        text: 'Ongage is a Multi-Vendor ESP Front-End. Key features include dynamic token syntaxes like {{contact.first_name}} and {{system.unsubscribe_url}}, multi-SMTP vendor routing, and relational attributes.',
        link: { view: 'esp', itemId: 'ongage', label: 'Open Ongage Docs' }
      };
    }

    // Default fallback
    return {
      text: `Based on your query regarding "${query}", I recommend searching our standardized SOP library or checking the interactive diagnostic wizard in the Troubleshooting Center.`,
      link: { view: 'troubleshooting', itemId: null, label: 'Open Troubleshooting Center' }
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-[560px] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Ops Process AI Assistant</h3>
              <p className="text-[10px] text-blue-100">Live operational knowledge base engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/40 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-indigo-600 text-white shadow-xs'
                }`}
              >
                {m.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs whitespace-pre-line leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}
              >
                {m.text}
                {m.link && (
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => {
                        onNavigate(m.link.view, m.link.itemId);
                        onClose();
                      }}
                      className="inline-flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{m.link.label}</span> →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-500" />
              <span>AI is searching operations documentation...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex space-x-1.5 overflow-x-auto border-t border-slate-200 bg-white px-3 py-2 text-[11px] dark:border-slate-800 dark:bg-slate-900 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about ESP, SOP, or deliverability..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="ml-2 rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
