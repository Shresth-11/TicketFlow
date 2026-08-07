import React, { useState } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { X, Sparkles, User, Calendar, CheckCircle, Copy, Check, Shield, UserCheck, AlertTriangle } from 'lucide-react';
import api from '../services/api';

export const TicketDetailModal = ({ ticket, isOpen, onClose, currentUser, onTicketUpdated, agents }) => {
  if (!isOpen || !ticket) return null;

  const [status, setStatus] = useState(ticket.status);
  const [assignedToId, setAssignedToId] = useState(ticket.assignedTo?.id || '');
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const isStaff = currentUser?.role === 'AGENT' || currentUser?.role === 'ADMIN';

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await api.patch(`/tickets/${ticket.id}/status`, { status: newStatus });
      setStatus(newStatus);
      setMessage('Status updated successfully!');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignAgent = async (agentId) => {
    if (!agentId) return;
    try {
      setUpdating(true);
      const res = await api.patch(`/tickets/${ticket.id}/assign`, { assignedToUserId: parseInt(agentId, 10) });
      setAssignedToId(agentId);
      setMessage('Ticket assigned successfully!');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to assign ticket.');
    } finally {
      setUpdating(false);
    }
  };

  const handleApplyAiSuggestions = async () => {
    if (!ticket.aiSuggestedPriority && !ticket.aiSuggestedCategory) return;
    try {
      setUpdating(true);
      const payload = {};
      if (ticket.aiSuggestedPriority) payload.priority = ticket.aiSuggestedPriority;
      if (ticket.aiSuggestedCategory) payload.categoryId = ticket.aiSuggestedCategory.id;

      const res = await api.put(`/tickets/${ticket.id}`, payload);
      setMessage('AI Suggestions applied to ticket!');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to apply AI suggestions.');
    } finally {
      setUpdating(false);
    }
  };

  const copyAiResponse = () => {
    if (ticket.aiSuggestedResponse) {
      navigator.clipboard.writeText(ticket.aiSuggestedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-indigo-400">#{ticket.id}</span>
            <StatusBadge status={status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {message && (
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              {message}
            </div>
          )}

          {/* Title & Description */}
          <div>
            <h2 className="text-lg font-bold text-white mb-2">{ticket.title}</h2>
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Category</span>
              <span className="text-slate-200 font-medium">{ticket.category?.name || 'General'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Requested By</span>
              <span className="text-slate-200 font-medium">{ticket.createdBy?.fullName || 'User'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Assigned Agent</span>
              <span className="text-slate-200 font-medium">
                {ticket.assignedTo ? ticket.assignedTo.fullName : 'Unassigned'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Created Date</span>
              <span className="text-slate-200 font-medium">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* AI TRIAGE SUGGESTIONS CARD */}
          {(ticket.aiSuggestedPriority || ticket.aiSuggestedCategory || ticket.aiSuggestedResponse) ? (
            <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-4 space-y-3 relative overflow-hidden shadow-lg shadow-indigo-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    AI Triage Assistant Suggestions
                  </h4>
                </div>

                {isStaff && (
                  <button
                    onClick={handleApplyAiSuggestions}
                    disabled={updating}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow shadow-indigo-600/20 disabled:opacity-50"
                  >
                    Apply AI Classification
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-lg border border-indigo-500/20">
                <div>
                  <span className="text-slate-400 block text-[10px]">Suggested Priority</span>
                  <span className="font-semibold text-indigo-300">{ticket.aiSuggestedPriority || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Suggested Department</span>
                  <span className="font-semibold text-indigo-300">{ticket.aiSuggestedCategory?.name || 'N/A'}</span>
                </div>
              </div>

              {ticket.aiSuggestedResponse && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Drafted Agent Response:</span>
                    <button
                      onClick={copyAiResponse}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy Response'}
                    </button>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
                    "{ticket.aiSuggestedResponse}"
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-slate-800/30 border border-slate-800 rounded-xl text-center text-xs text-slate-500 italic">
              AI Triage pending or API key not configured.
            </div>
          )}

          {/* STAFF MANAGEMENT ACTIONS (For AGENT and ADMIN) */}
          {isStaff && (
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Support Management Actions
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Updater */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Update Ticket Status
                  </label>
                  <div className="flex items-center gap-2">
                    {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleUpdateStatus(s)}
                        disabled={updating}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${
                          status === s
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agent Assignment */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Assign Support Agent
                  </label>
                  <select
                    value={assignedToId}
                    onChange={(e) => handleAssignAgent(e.target.value)}
                    disabled={updating}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Unassigned</option>
                    {agents?.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.fullName} ({agent.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
