import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { TicketTable } from '../components/TicketTable';
import { CreateTicketModal } from '../components/CreateTicketModal';
import { TicketDetailDrawer } from '../components/TicketDetailDrawer';
import { PlusCircle, Inbox, Clock, Activity, ShieldAlert, RotateCw } from 'lucide-react';
import api from '../services/api';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const isStaff = user?.role === 'AGENT' || user?.role === 'ADMIN';

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const promises = [
        api.get('/tickets'),
        api.get('/categories')
      ];

      if (isStaff) {
        promises.push(api.get('/users/agents'));
      }

      const results = await Promise.all(promises);
      setTickets(results[0].data);
      setCategories(results[1].data);
      if (results[2]) {
        setAgents(results[2].data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleCreateTicket = async (ticketData) => {
    const res = await api.post('/tickets', ticketData);
    setTickets([res.data, ...tickets]);
  };

  const handleTicketUpdated = (updatedTicket, deletedId) => {
    if (deletedId) {
      setTickets(tickets.filter((t) => t.id !== deletedId));
      setSelectedTicket(null);
    } else if (updatedTicket) {
      setTickets(tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
      setSelectedTicket(updatedTicket);
    }
  };

  // Compute Metrics
  const totalTickets = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter((t) => t.status === 'IN_PROGRESS').length;
  const criticalCount = tickets.filter((t) => t.priority === 'CRITICAL').length;

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Page Title & Main Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Support Tickets</h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {isStaff ? 'Staff Queue' : 'My Requests'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isStaff
                ? 'Manage service desk requests, triage priority, and assign support agents.'
                : 'Submit IT support tickets and track resolution status in real time.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="p-2 rounded-lg bg-[#121218] hover:bg-[#181822] text-slate-400 hover:text-white border border-[#20202c] transition-colors"
              title="Refresh Queue"
            >
              <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              New Ticket
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-[#101014] p-4 rounded-xl border border-[#20202a] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">Total Tickets</p>
              <p className="text-2xl font-bold text-white mt-0.5">{totalTickets}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#101014] p-4 rounded-xl border border-[#20202a] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">Open</p>
              <p className="text-2xl font-bold text-white mt-0.5">{openCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#101014] p-4 rounded-xl border border-[#20202a] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-white mt-0.5">{inProgressCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#101014] p-4 rounded-xl border border-[#20202a] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">Critical</p>
              <p className="text-2xl font-bold text-white mt-0.5">{criticalCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Ticket Table */}
        <TicketTable
          tickets={tickets}
          categories={categories}
          onSelectTicket={(ticket) => setSelectedTicket(ticket)}
          loading={loading}
        />

      </main>

      {/* Modals & Slide-over Drawer */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        categories={categories}
        onSubmit={handleCreateTicket}
      />

      <TicketDetailDrawer
        ticket={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        currentUser={user}
        onTicketUpdated={handleTicketUpdated}
        agents={agents}
      />

    </div>
  );
};
