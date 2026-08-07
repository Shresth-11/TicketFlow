import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LifeBuoy, 
  ArrowRight, 
  Zap, 
  Lock, 
  Headset, 
  User, 
  ChevronRight,
  ShieldCheck,
  Inbox,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleQuickDemoLogin = async (email) => {
    try {
      await login(email, 'TicketFlow2026!');
      navigate('/dashboard');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 font-sans flex flex-col selection:bg-violet-500 selection:text-white">
      
      {/* Navigation Bar */}
      <header className="bg-[#0a0a0d]/80 backdrop-blur-md border-b border-[#1f1f28] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-violet-600/20">
                <LifeBuoy className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-white tracking-tight">TicketFlow</span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">/ Service Desk</span>
              </div>
            </div>

            {/* Nav CTAs */}
            <div className="flex items-center gap-3">
              <a href="#demo" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden sm:inline-block">
                Demo Accounts
              </a>

              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02]"
                >
                  Open Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02]"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#0c0c10] via-[#08080a] to-[#0a0a0d] border-b border-[#1f1f28] relative overflow-hidden">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span>Next-Gen Enterprise Service Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            IT Support & Incident Response, <br />
            <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Built for Modern Teams.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            TicketFlow is a high-performance Service Desk platform for managing internal helpdesk queues, tracking SLA resolution times, and assigning support tickets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02]"
            >
              Sign In to Portal
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#121218] hover:bg-[#181822] text-slate-200 border border-[#20202c] text-xs font-semibold shadow-sm transition-all"
            >
              Explore Demo Accounts
            </a>
          </div>

          {/* Parker Dark Theme Queue Mockup Card */}
          <div className="mt-12 bg-[#101014] border border-[#20202a] rounded-xl p-4 shadow-2xl text-left max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between border-b border-[#1c1c26] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">TicketFlow / Active Staff Queue</span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                12 Active Tickets
              </span>
            </div>

            {/* Sample Ticket Row */}
            <div className="bg-[#14141d] border border-[#242432] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-violet-400 font-bold">TKT-102</span>
                <span className="font-semibold text-slate-200">Laptop screen flickers violently and turns pitch black</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25">
                  CRITICAL
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  In Progress
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-14 bg-[#08080a] border-b border-[#1f1f28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl border border-[#20202a] bg-[#101014] space-y-2.5 hover:border-violet-500/40 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3 group-hover:scale-105 transition-transform">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Centralized Queue</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter and manage incoming IT support requests across categories, priority urgency, and agent assignment.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#20202a] bg-[#101014] space-y-2.5 hover:border-violet-500/40 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Data Privacy & Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built with Spring Security 6 and JPA query-level scoping to ensure employee accounts only view their own tickets.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#20202a] bg-[#101014] space-y-2.5 hover:border-violet-500/40 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Slide-over Inspector</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linear-style right drawer for quick ticket inspection, status updates, agent assignment, and response drafting.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Recruiter Quick Demo Hub */}
      <section id="demo" className="py-14 bg-[#0a0a0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Test Portal Accounts
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a demo role below to launch directly into the dashboard queue:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            
            <button
              onClick={() => handleQuickDemoLogin('employee@ticketflow.com')}
              className="bg-[#101014] hover:bg-[#14141c] border border-[#20202a] hover:border-violet-500/50 p-5 rounded-xl transition-all group flex flex-col justify-between space-y-3 shadow-xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors" />
                  <span className="text-xs font-bold text-white group-hover:text-violet-300">
                    Employee Account
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Submit new requests and track personal tickets with strict privacy controls.
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-400 inline-flex items-center gap-1">
                Sign in as Employee <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('agent@ticketflow.com')}
              className="bg-[#101014] hover:bg-[#14141c] border border-[#20202a] hover:border-violet-500/50 p-5 rounded-xl transition-all group flex flex-col justify-between space-y-3 shadow-xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Headset className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-bold text-white group-hover:text-violet-300">
                    Support Agent
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Manage organization queue, review auto-suggestions, assign agents, and resolve incidents.
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-400 inline-flex items-center gap-1">
                Sign in as Agent <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin@ticketflow.com')}
              className="bg-[#101014] hover:bg-[#14141c] border border-[#20202a] hover:border-violet-500/50 p-5 rounded-xl transition-all group flex flex-col justify-between space-y-3 shadow-xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white group-hover:text-violet-300">
                    System Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Full administrative access, ticket deletion, category management, and user controls.
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-400 inline-flex items-center gap-1">
                Sign in as Admin <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1f1f28] bg-[#08080a] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">TicketFlow Service Desk</span>
            <span>— Java 17 Spring Boot + React 18</span>
          </div>
          <div className="text-slate-500 text-[11px] font-mono">
            Enterprise IT Support Desk System
          </div>
        </div>
      </footer>

    </div>
  );
};
