import React, { useState } from 'react';
import { PriorityBadge, StatusBadge } from './Badge';
import { Search } from 'lucide-react';

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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-[#eae3d2] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      
      {/* Search & Filter Control Bar */}
      <div className="p-3.5 border-b-2 border-black bg-[#e2dac7] flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets by title, ID, reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border-2 border-black rounded-full text-xs text-black placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border-2 border-black rounded-full text-xs font-bold text-black focus:outline-none"
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
            className="px-3 py-1.5 bg-white border-2 border-black rounded-full text-xs font-bold text-black focus:outline-none"
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
            className="px-3 py-1.5 bg-white border-2 border-black rounded-full text-xs font-bold text-black focus:outline-none"
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

      {/* Main Data Table without horizontal scrollbar */}
      <div className="w-full overflow-hidden">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#dfd7c2] border-b-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider text-black">
              <th className="py-3 px-3 w-[8%]">Key</th>
              <th className="py-3 px-3 w-[26%]">Subject</th>
              <th className="py-3 px-3 w-[16%]">Category</th>
              <th className="py-3 px-3 w-[11%]">Priority</th>
              <th className="py-3 px-3 w-[12%]">Status</th>
              <th className="py-3 px-3 w-[13%]">Reporter</th>
              <th className="py-3 px-3 w-[14%]">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black text-xs">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-black bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono font-bold">Loading queue...</span>
                  </div>
                </td>
              </tr>
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-700 font-medium bg-white">
                  No support tickets found matching current filters.
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className="bg-white hover:bg-[#fbf6e9] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 font-mono font-bold text-red-600 group-hover:underline truncate">
                    TKT-{ticket.id}
                  </td>
                  <td className="py-3 px-3 font-bold text-black truncate" title={ticket.title}>
                    {ticket.title}
                  </td>
                  <td className="py-3 px-3 truncate">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-black bg-[#f1ebd9] border-2 border-black px-2 py-0.5 rounded-md truncate max-w-full">
                      {ticket.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="py-3 px-3 truncate">
                    <PriorityBadge priority={ticket.priority} />
                  </td>
                  <td className="py-3 px-3 truncate">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="py-3 px-3 text-black font-medium truncate" title={ticket.createdBy?.fullName}>
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {ticket.createdBy?.fullName ? ticket.createdBy.fullName.charAt(0) : 'U'}
                      </div>
                      <span className="truncate">{ticket.createdBy?.fullName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-black font-medium truncate" title={ticket.assignedTo?.fullName || 'Unassigned'}>
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-1.5 truncate">
                        <div className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {ticket.assignedTo.fullName.charAt(0)}
                        </div>
                        <span className="text-black font-semibold truncate">{ticket.assignedTo.fullName}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">Unassigned</span>
                    )}
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
