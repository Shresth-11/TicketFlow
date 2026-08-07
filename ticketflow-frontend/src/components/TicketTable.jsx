import React, { useState } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { Search, Filter, Calendar, Hash, FileText, Tag, User, UserCheck } from 'lucide-react';

export const TicketTable = ({ tickets, categories, onSelectTicket, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm) ||
      ticket.createdBy.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    const matchesCategory = !categoryFilter || ticket.category?.id.toString() === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-[#101014] border border-[#20202a] rounded-xl shadow-xl overflow-hidden">
      
      {/* Search & Filter Control Bar */}
      <div className="p-4 border-b border-[#20202a] bg-[#14141a] flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets by title, ID, reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#181820] border border-[#282834] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#181820] border border-[#282834] rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#181820] border border-[#282834] rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            <option value="">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#181820] border border-[#282834] rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#14141a] border-b border-[#20202a] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4 font-semibold w-24">Key</th>
              <th className="py-3 px-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold w-40">Category</th>
              <th className="py-3 px-4 font-semibold w-32">Priority</th>
              <th className="py-3 px-4 font-semibold w-32">Status</th>
              <th className="py-3 px-4 font-semibold w-44">Reporter</th>
              <th className="py-3 px-4 font-semibold w-44">Assignee</th>
              <th className="py-3 px-4 font-semibold w-28 text-right">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a24] text-xs">
            {loading ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span>Loading queue...</span>
                  </div>
                </td>
              </tr>
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-500">
                  No support tickets found matching current filters.
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className="hover:bg-[#181822] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-violet-400 group-hover:text-violet-300">
                    TKT-{ticket.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200 group-hover:text-white max-w-xs truncate">
                    {ticket.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-[#16161e] border border-[#242432] px-2 py-0.5 rounded">
                      {ticket.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <PriorityBadge priority={ticket.priority} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center border border-slate-700">
                        {ticket.createdBy?.fullName ? ticket.createdBy.fullName.charAt(0) : 'U'}
                      </div>
                      <span className="truncate">{ticket.createdBy?.fullName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-violet-950/80 text-violet-300 font-bold text-[10px] flex items-center justify-center border border-violet-500/30">
                          {ticket.assignedTo.fullName.charAt(0)}
                        </div>
                        <span className="text-slate-300 truncate">{ticket.assignedTo.fullName}</span>
                      </div>
                    ) : (
                      <span className="text-slate-600 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500 font-mono text-[11px]">
                    {formatDate(ticket.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
