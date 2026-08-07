import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { X, Check, Copy } from 'lucide-react';
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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#fbf7ee] border-l-2 border-black shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] text-black flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b-2 border-black bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-red-600">
                TKT-{ticket.id}
              </span>
              <StatusBadge status={status} />
              <PriorityBadge priority={ticket.priority} />
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback Message Alert */}
          {message && (
            <div className="mx-6 mt-4 p-2.5 bg-emerald-100 border-2 border-black text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-800" />
              <span>{message}</span>
            </div>
          )}

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-black leading-tight">
                {ticket.title}
              </h2>
              <div className="bg-white border-2 border-black rounded-xl p-4 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {ticket.description}
              </div>
            </div>

            {/* Smart Categorization Card */}
            {(ticket.aiSuggestedPriority || ticket.aiSuggestedCategory || ticket.aiSuggestedResponse) && (
              <div className="bg-amber-100 border-2 border-black rounded-2xl p-4 space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                    Smart Categorization Suggestions
                  </h4>

                  {isStaff && (
                    <button
                      onClick={handleApplyAiSuggestions}
                      disabled={updating}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-black hover:bg-slate-800 text-white transition-colors disabled:opacity-50"
                    >
                      Apply Suggestions
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border-2 border-black">
                  <div>
                    <span className="text-slate-600 block text-[10px] font-mono">Suggested Urgency</span>
                    <span className="font-bold text-black">{ticket.aiSuggestedPriority || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px] font-mono">Suggested Category</span>
                    <span className="font-bold text-black">{ticket.aiSuggestedCategory?.name || 'N/A'}</span>
                  </div>
                </div>

                {ticket.aiSuggestedResponse && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-black font-semibold">
                      <span>Suggested Initial Response:</span>
                      <button
                        onClick={copyAiResponse}
                        className="inline-flex items-center gap-1 text-red-600 hover:underline font-bold"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy Draft'}
                      </button>
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-black text-xs text-slate-800 leading-relaxed italic">
                      "{ticket.aiSuggestedResponse}"
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Properties Panel */}
            <div className="bg-[#eae3d2] border-2 border-black rounded-2xl p-4 space-y-4 text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                Ticket Properties
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-[11px] font-mono font-semibold mb-1">Status</label>
                  {isStaff ? (
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={updating}
                      className="w-full bg-white border-2 border-black rounded-full px-4 py-1.5 text-black font-bold text-xs focus:outline-none shadow-xs"
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
                  <label className="block text-slate-700 text-[11px] font-mono font-semibold mb-1">Assignee</label>
                  {isStaff ? (
                    <select
                      value={assignedToId}
                      onChange={(e) => handleAssignAgent(e.target.value)}
                      disabled={updating}
                      className="w-full bg-white border-2 border-black rounded-full px-4 py-1.5 text-black font-bold text-xs focus:outline-none shadow-xs"
                    >
                      <option value="">Unassigned</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.fullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-black font-bold">
                      {ticket.assignedTo ? ticket.assignedTo.fullName : 'Unassigned'}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 text-[11px] font-mono font-semibold mb-1">Category</label>
                  <span className="text-black font-bold">{ticket.category?.name}</span>
                </div>

                <div>
                  <label className="block text-slate-700 text-[11px] font-mono font-semibold mb-1">Reporter</label>
                  <span className="text-black font-bold">{ticket.createdBy?.fullName}</span>
                </div>

                <div>
                  <label className="block text-slate-700 text-[11px] font-mono font-semibold mb-1">Created Date</label>
                  <span className="text-black font-mono font-medium">{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="px-6 py-3 border-t-2 border-black bg-white flex items-center justify-between">
            {isStaff ? (
              <button
                onClick={handleDeleteTicket}
                disabled={updating}
                className="px-4 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 border-2 border-red-700 rounded-full transition-colors disabled:opacity-50"
              >
                Delete Ticket
              </button>
            ) : <div />}

            <button
              onClick={onClose}
              className="px-5 py-1.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full transition-colors"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
