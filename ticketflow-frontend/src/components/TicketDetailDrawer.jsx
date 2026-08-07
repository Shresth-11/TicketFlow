import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { X, Check, Copy, UserCheck, Bot, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';

export const TicketDetailDrawer = ({ ticket, isOpen, onClose, currentUser, onTicketUpdated, agents }) => {
  if (!isOpen || !ticket) return null;

  const [status, setStatus] = useState(ticket.status);
  const [assignedToId, setAssignedToId] = useState(ticket.assignedTo?.id || '');
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStatus(ticket.status);
    setAssignedToId(ticket.assignedTo?.id || '');
  }, [ticket]);

  const isStaff = currentUser?.role === 'AGENT' || currentUser?.role === 'ADMIN';

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await api.patch(`/tickets/${ticket.id}/status`, { status: newStatus });
      setStatus(newStatus);
      setMessage('Ticket status updated.');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignAgent = async (agentId) => {
    try {
      setUpdating(true);
      const assignedToUserId = agentId ? parseInt(agentId, 10) : null;
      const res = await api.patch(`/tickets/${ticket.id}/assign`, { assignedToUserId });
      setAssignedToId(agentId);
      setMessage(assignedToUserId ? 'Agent assigned successfully.' : 'Ticket unassigned successfully.');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update agent assignment.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTicket = async () => {
    if (!window.confirm(`Are you sure you want to delete ticket TKT-${ticket.id}? This action cannot be undone.`)) {
      return;
    }
    try {
      setUpdating(true);
      await api.delete(`/tickets/${ticket.id}`);
      onClose();
      if (onTicketUpdated) onTicketUpdated(null, ticket.id);
    } catch (err) {
      setMessage('Failed to delete ticket.');
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
      setMessage('Smart suggestions applied to ticket.');
      if (onTicketUpdated) onTicketUpdated(res.data);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to apply suggestions.');
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                TKT-{ticket.id}
              </span>
              <StatusBadge status={status} />
              <PriorityBadge priority={ticket.priority} />
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body - Split into Main & Sidebar */}
          <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* Main Column */}
            <div className="flex-1 p-6 space-y-6">
              
              {message && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  {message}
                </div>
              )}

              {/* Title & Description */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3">{ticket.title}</h2>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {ticket.description}
                </div>
              </div>

              {/* Smart Triage Card */}
              {(ticket.aiSuggestedPriority || ticket.aiSuggestedCategory || ticket.aiSuggestedResponse) && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">
                        Smart Categorization Suggestions
                      </h4>
                    </div>

                    {isStaff && (
                      <button
                        onClick={handleApplyAiSuggestions}
                        disabled={updating}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
                      >
                        Apply Suggestions
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-white p-2.5 rounded border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Suggested Urgency</span>
                      <span className="font-semibold text-slate-800">{ticket.aiSuggestedPriority || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Suggested Category</span>
                      <span className="font-semibold text-slate-800">{ticket.aiSuggestedCategory?.name || 'N/A'}</span>
                    </div>
                  </div>

                  {ticket.aiSuggestedResponse && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>Suggested Initial Response:</span>
                        <button
                          onClick={copyAiResponse}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy Draft'}
                        </button>
                      </div>
                      <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-600 leading-relaxed italic">
                        "{ticket.aiSuggestedResponse}"
                      </div>
                    </div>
                  )}
                </div>
              )}


            </div>

            {/* Right Properties Sidebar */}
            <div className="w-full md:w-64 p-6 bg-slate-50/40 space-y-5 text-xs">
              
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400 mb-3">
                  Ticket Properties
                </h4>

                {/* Status Switcher (For Staff) */}
                <div className="space-y-1 mb-4">
                  <label className="text-slate-500 block text-[11px] font-medium">Status</label>
                  {isStaff ? (
                    <select
                      value={status}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      disabled={updating}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  ) : (
                    <StatusBadge status={status} />
                  )}
                </div>

                {/* Assignee (For Staff) */}
                <div className="space-y-1 mb-4">
                  <label className="text-slate-500 block text-[11px] font-medium">Assignee</label>
                  {isStaff ? (
                    <select
                      value={assignedToId}
                      onChange={(e) => handleAssignAgent(e.target.value)}
                      disabled={updating}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Unassigned</option>
                      {agents?.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.fullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-medium text-slate-800">
                      {ticket.assignedTo ? ticket.assignedTo.fullName : 'Unassigned'}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-1 mb-4">
                  <label className="text-slate-500 block text-[11px] font-medium">Category</label>
                  <span className="font-semibold text-slate-800">{ticket.category?.name || 'General'}</span>
                </div>

                {/* Reporter */}
                <div className="space-y-1 mb-4">
                  <label className="text-slate-500 block text-[11px] font-medium">Reporter</label>
                  <span className="font-medium text-slate-800">{ticket.createdBy?.fullName || 'User'}</span>
                  <span className="text-slate-400 block text-[10px]">{ticket.createdBy?.email}</span>
                </div>

                {/* Created At */}
                <div className="space-y-1">
                  <label className="text-slate-500 block text-[11px] font-medium">Created Date</label>
                  <span className="text-slate-600 font-mono text-[11px]">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
            {isStaff ? (
              <button
                onClick={handleDeleteTicket}
                disabled={updating}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-md transition-colors disabled:opacity-50"
              >
                Delete Ticket
              </button>
            ) : <div />}

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-md shadow-xs transition-colors"
            >
              Close Drawer
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};
