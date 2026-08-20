import React, { useState } from 'react';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Upload,
  History,
  CheckCircle,
  FileText,
  MessageSquare,
  Eye,
  GitCompare,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { sopsList } from '../data/sopData';

export default function AdminWorkbenchView() {
  const [docs, setDocs] = useState(sopsList);
  const [selectedDocId, setSelectedDocId] = useState(sopsList[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  // Form State
  const [editTitle, setEditTitle] = useState('');
  const [editPurpose, setEditPurpose] = useState('');
  const [editStatus, setEditStatus] = useState('Published');
  const [comments, setComments] = useState([
    { id: 1, author: 'Sarah Jenkins (Ops Manager)', date: '2026-08-05', text: 'Verified step 4 matches Netcore rate limits.' },
    { id: 2, author: 'Alex Rivera (Lead Ops)', date: '2026-08-06', text: 'Approved for publication across team.' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(['campaign_flow_diagram.png', 'sop_compliance_v2.pdf']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeDoc = docs.find((d) => d.id === selectedDocId) || docs[0];

  const handleStartEdit = (doc) => {
    setEditTitle(doc.title);
    setEditPurpose(doc.purpose);
    setEditStatus('Published');
    setIsEditing(true);
  };

  const handleSave = () => {
    setDocs((prev) =>
      prev.map((d) => (d.id === activeDoc.id ? { ...d, title: editTitle, purpose: editPurpose } : d))
    );
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this document from the portal?')) {
      const next = docs.filter((d) => d.id !== id);
      setDocs(next);
      if (next.length > 0) setSelectedDocId(next[0].id);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), author: 'Administrator', date: 'Just now', text: newComment }
    ]);
    setNewComment('');
  };

  const handleFileUploadSim = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, file.name]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              Admin Governance Mode
            </span>
            <span className="text-xs text-slate-400">Role: Administrator</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-amber-500" />
            Admin Content Workbench & Version Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create, edit, publish, upload media assets, review version diffs, and manage approval workflows.
          </p>
        </div>

        <button
          onClick={() => {
            const newId = `custom-sop-${Date.now()}`;
            const newObj = {
              id: newId,
              title: 'New Operational SOP Draft',
              category: 'Custom Process',
              purpose: 'Describe purpose here...',
              scope: 'All team members',
              prerequisites: ['Standard ESP Access'],
              instructions: [{ step: 1, title: 'Step 1', details: 'Instruction detail...' }],
              checklist: ['Checklist item 1'],
              commonMistakes: ['Mistake 1'],
              bestPractices: ['Best practice 1'],
              relatedDocs: [],
              revisionHistory: [{ version: 'v1.0', date: 'Today', author: 'Admin', changes: 'Initial draft created.' }]
            };
            setDocs([newObj, ...docs]);
            setSelectedDocId(newId);
            handleStartEdit(newObj);
          }}
          className="flex items-center space-x-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-500 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" /> <span>Create New Document</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="rounded-xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>Document changes saved and published successfully!</span>
        </div>
      )}

      {/* Grid: Document Selector & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Managed Documents ({docs.length})
          </h3>
          {docs.map((d) => {
            const isSelected = d.id === activeDoc.id;
            return (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedDocId(d.id);
                  setIsEditing(false);
                }}
                className={`group flex items-center justify-between rounded-xl p-3.5 border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs font-bold truncate">{d.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{d.category}</p>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(d.id);
                    }}
                    className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                    title="Delete Document"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Editor & Management Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Document ID: {activeDoc.id}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{activeDoc.title}</h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowDiff(!showDiff)}
                  className="flex items-center space-x-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <GitCompare className="h-3.5 w-3.5 text-blue-500" />
                  <span>{showDiff ? 'Hide Version Diff' : 'Compare Revisions'}</span>
                </button>

                {!isEditing ? (
                  <button
                    onClick={() => handleStartEdit(activeDoc)}
                    className="flex items-center space-x-1 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-500"
                  >
                    <Edit className="h-3.5 w-3.5" /> <span>Edit Content</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500"
                  >
                    <Save className="h-3.5 w-3.5" /> <span>Save Changes</span>
                  </button>
                )}
              </div>
            </div>

            {/* Version Diff View Component */}
            {showDiff && (
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-200 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">
                  Side-by-Side Version Comparison (v2.1 vs Current Draft)
                </div>
                <div className="space-y-1">
                  <div className="bg-rose-950/60 text-rose-300 p-2 rounded">
                    - Step 7: Check bounce rates after 30 minutes of sending.
                  </div>
                  <div className="bg-emerald-950/60 text-emerald-300 p-2 rounded">
                    + Step 7: Perform mandatory 15-Minute Post-Send Health Check (Bounce cap strictly &lt; 2%).
                  </div>
                </div>
              </div>
            )}

            {/* Editor vs View Mode */}
            {isEditing ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Document Title:</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Purpose & Summary Statement:</label>
                  <textarea
                    rows={3}
                    value={editPurpose}
                    onChange={(e) => setEditPurpose(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Approval Workflow Status:</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Pending Review">Pending Manager Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Published">Published & Live</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Purpose</h4>
                  <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">{activeDoc.purpose}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Scope</h4>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{activeDoc.scope}</p>
                </div>
              </div>
            )}

            {/* Asset Media Uploader Simulator */}
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-5 dark:border-slate-700 dark:bg-slate-800/30 text-center space-y-2">
              <Upload className="mx-auto h-6 w-6 text-slate-400" />
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Upload Images, Flowcharts, Videos, or PDF Manuals
              </div>
              <p className="text-[11px] text-slate-400">Supports PNG, JPG, MP4, PDF up to 50MB</p>
              <label className="inline-block cursor-pointer rounded-xl bg-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
                Browse File
                <input type="file" onChange={handleFileUploadSim} className="hidden" />
              </label>

              {/* Uploaded Files List */}
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {uploadedFiles.map((fn, idx) => (
                  <span key={idx} className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-xs dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <FileText className="mr-1 h-3 w-3 text-blue-500" /> {fn}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments & Team Discussion Section */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                <MessageSquare className="mr-1.5 h-4 w-4 text-blue-500" /> Team Review Comments & Feedback
              </h4>

              <div className="space-y-2">
                {comments.map((c) => (
                  <div key={c.id} className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/40">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{c.author}</span>
                      <span>{c.date}</span>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex space-x-2 pt-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add review comment or suggestion..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
