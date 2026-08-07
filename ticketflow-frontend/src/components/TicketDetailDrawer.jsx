import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { X, Check, Copy, User, Calendar, Tag, Sliders } from 'lucide-react';
import api from '../services/api';

export const TicketDetailDrawer = ({
  ticket,
  isOpen,
  onClose,
  currentUser,
  onTicketUpdated,
  agents = []
}) => {
  const [status, setStatus] = useState('');
  const [assignedToId, setAssignedToId] = useState('');
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setAssignedToId(ticket.assignedTo ? ticket.assignedTo.id.toString() : '');
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const isStaff = currentUser?.role === 'AGENT' || currentUser?.role === 'ADMIN';

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await api.patch(`/tickets/${ticket.id}/status`, { status: newStatus });
      setStatus(newStatus);
      setMessage('Status updated successfully.');
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
      const updateData = {};
      if (ticket.aiSuggestedPriority) updateData.priority = ticket.aiSuggestedPriority;
      if (ticket.aiSuggestedCategory) updateData.categoryId = ticket.aiSuggestedCategory.id;

      const res = await api.put(`/tickets/${ticket.id}`, updateData);
      if (onTicketUpdated) onTicketUpdated(res.data);
      setMessage('Applied suggestions.');
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0d0d12] border-l border-[#20202c] shadow-2xl text-slate-100 flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-[#20202c] bg-[#121218] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-violet-400">
                TKT-{ticket.id}
              </span>
              <StatusBadge status={status} />
              <PriorityBadge priority={ticket.priority} />
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback Message Alert */}
          {message && (
            <div className="mx-6 mt-4 p-2.5 bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs rounded-md flex items-center gap-2">
              <Check className="w-4 h-4 text-violet-400" />
              <span>{message}</span>
            </div>
          )}

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white leading-tight">
                {ticket.title}
              </h2>
              <div className="bg-[#14141d] border border-[#242432] rounded-lg p-4 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {ticket.description}
              </div>
            </div>

            {/* Smart Categorization Card */}
            {(ticket.aiSuggestedPriority || ticket.aiSuggestedCategory || ticket.aiSuggestedResponse) && (
              <div className="bg-violet-950/20 border border-violet-500/25 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-violet-300">
                    Smart Categorization Suggestions
                  </h4>

                  {isStaff && (
                    <button
                      onClick={handleApplyAiSuggestions}
                      disabled={updating}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:opacity-50"
                    >
                      Apply Suggestions
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#14141d] p-3 rounded-lg border border-[#242432]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Suggested Urgency</span>
                    <span className="font-semibold text-slate-200">{ticket.aiSuggestedPriority || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Suggested Category</span>
                    <span className="font-semibold text-slate-200">{ticket.aiSuggestedCategory?.name || 'N/A'}</span>
                  </div>
                </div>

                {ticket.aiSuggestedResponse && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Suggested Initial Response:</span>
                      <button
                        onClick={copyAiResponse}
                        className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy Draft'}
                      </button>
                    </div>
                    <div className="bg-[#14141d] p-3 rounded-lg border border-[#242432] text-xs text-slate-300 leading-relaxed italic">
                      "{ticket.aiSuggestedResponse}"
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Properties Panel */}
            <div className="bg-[#121218] border border-[#20202c] rounded-xl p-4 space-y-4 text-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ticket Properties
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-[11px] font-medium mb-1">Status</label>
                  {isStaff ? (
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={updating}
                      className="w-full bg-[#181822] border border-[#282836] rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-violet-500 font-medium"
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  ) : (
                    <div className="py-1">
                      <StatusBadge status={status} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-medium mb-1">Assignee</label>
                  {isStaff ? (
                    <select
                      value={assignedToId}
                      onChange={(e) => handleAssignAgent(e.target.value)}
                      disabled={updating}
                      className="w-full bg-[#181822] border border-[#282836] rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-violet-500 font-medium"
                    >
                      <option value="">Unassigned</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.fullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-slate-300 font-semibold">
                      {ticket.assignedTo ? ticket.assignedTo.fullName : 'Unassigned'}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-medium mb-1">Category</label>
                  <span className="text-slate-300 font-semibold">{ticket.category?.name}</span>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-medium mb-1">Reporter</label>
                  <span className="text-slate-300 font-semibold">{ticket.createdBy?.fullName}</span>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-medium mb-1">Created Date</label>
                  <span className="text-slate-400 font-mono">{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="px-6 py-3 border-t border-[#20202c] bg-[#121218] flex items-center justify-between">
            {isStaff ? (
              <button
                onClick={handleDeleteTicket}
                disabled={updating}
                className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500/20 rounded-md transition-colors disabled:opacity-50"
              >
                Delete Ticket
              </button>
            ) : <div />}

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#181822] border border-[#282836] hover:bg-[#20202c] rounded-md transition-colors"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
