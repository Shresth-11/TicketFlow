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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Page Title & Main Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Support Tickets</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-200 text-slate-700">
                {isStaff ? 'Staff Queue' : 'My Requests'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isStaff
                ? 'Manage service desk requests, triage priority, and assign support agents.'
                : 'Submit IT support tickets and track resolution status in real time.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="p-2 rounded-md bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shadow-2xs"
              title="Refresh Queue"
            >
              <RotateCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              New Ticket
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Tickets</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalTickets}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Inbox className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Open</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{openCount}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{inProgressCount}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Critical</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{criticalCount}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
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
