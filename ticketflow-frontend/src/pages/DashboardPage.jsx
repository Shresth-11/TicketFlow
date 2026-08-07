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
    <div className="min-h-screen bg-[#fbf7ee] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Page Title & Main Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-serif font-bold text-black tracking-tight">Support Queue</h1>
              <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-red-100 text-red-700 border-2 border-red-700">
                {isStaff ? 'Staff View' : 'My Tickets'}
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              {isStaff
                ? 'Manage IT support requests, triage priority urgency, and assign support agents.'
                : 'Submit IT support tickets and track resolution status in real time.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border-2 border-black transition-colors"
              title="Refresh Queue"
            >
              <RotateCw className={`w-4 h-4 text-black ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              New Ticket
            </button>
          </div>
        </div>

        {/* Metric Cards Grid matching heyparker.ai Macintosh shell cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-[#eae3d2] p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">Total Tickets</p>
              <p className="text-3xl font-serif font-bold text-black mt-0.5">{totalTickets}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white border-2 border-black text-black">
              <Inbox className="w-5 h-5 text-black" />
            </div>
          </div>

          <div className="bg-[#eae3d2] p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">Open</p>
              <p className="text-3xl font-serif font-bold text-black mt-0.5">{openCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-100 border-2 border-black text-blue-900">
              <Clock className="w-5 h-5 text-blue-900" />
            </div>
          </div>

          <div className="bg-[#eae3d2] p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">In Progress</p>
              <p className="text-3xl font-serif font-bold text-black mt-0.5">{inProgressCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-100 border-2 border-black text-amber-900">
              <Activity className="w-5 h-5 text-amber-900" />
            </div>
          </div>

          <div className="bg-[#eae3d2] p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">Critical</p>
              <p className="text-3xl font-serif font-bold text-black mt-0.5">{criticalCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-red-100 border-2 border-black text-red-900">
              <ShieldAlert className="w-5 h-5 text-red-900" />
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
