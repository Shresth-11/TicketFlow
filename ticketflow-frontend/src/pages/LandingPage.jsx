import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LifeBuoy, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Users, 
  Headset, 
  User, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Inbox
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <LifeBuoy className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">TicketFlow</span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">/ Service Desk</span>
              </div>
            </div>

            {/* Nav CTAs */}
            <div className="flex items-center gap-3">
              <a href="#demo" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block">
                Demo Accounts
              </a>

              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                >
                  Open Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
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
      <section className="pt-12 pb-14 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Enterprise Support & Incident Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            IT Helpdesk & Incident Response, <br className="hidden sm:inline" />
            Streamlined for Modern Teams.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TicketFlow is a full-stack Service Desk platform for logging employee requests, tracking SLA resolution queues, and assigning support tickets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              Sign In to Portal
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors"
            >
              Explore Demo Accounts
            </a>
          </div>

          {/* Clean Dashboard Preview Container */}
          <div className="mt-10 bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-left max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-500 font-medium ml-2">TicketFlow / Staff Queue</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                12 Active Tickets
              </span>
            </div>

            {/* Sample Ticket Row */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 font-semibold">TKT-102</span>
                <span className="font-semibold text-slate-900">Laptop screen flickers violently and turns pitch black</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Critical
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  In Progress
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-9 h-9 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <Inbox className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Centralized Queue</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter and manage incoming IT support requests across categories, priority urgency, and agent assignment.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-9 h-9 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Data Privacy & Security</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Built with Spring Security 6 and JPA query-level scoping to ensure employee accounts only view their own tickets.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Slide-over Inspector</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Linear-style right drawer for quick ticket inspection, status updates, agent assignment, and initial response drafting.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Recruiter Quick Demo Hub */}
      <section id="demo" className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Test Portal Accounts
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a demo role below to launch directly into the dashboard queue:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            
            <button
              onClick={() => handleQuickDemoLogin('employee@ticketflow.com')}
              className="bg-white hover:bg-slate-100/80 border border-slate-200 p-5 rounded-lg transition-colors group flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    Employee Account
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Submit new requests and track personal tickets with strict privacy controls.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                Sign in as Employee <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('agent@ticketflow.com')}
              className="bg-white hover:bg-slate-100/80 border border-slate-200 p-5 rounded-lg transition-colors group flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Headset className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    Support Agent
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Manage organization queue, review auto-suggestions, assign agents, and resolve incidents.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                Sign in as Agent <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin@ticketflow.com')}
              className="bg-white hover:bg-slate-100/80 border border-slate-200 p-5 rounded-lg transition-colors group flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    System Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Full administrative access, ticket deletion, category management, and user controls.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                Sign in as Admin <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">TicketFlow Service Desk</span>
            <span>— Java 17 Spring Boot + React 18</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Enterprise IT Support Desk System
          </div>
        </div>
      </footer>

    </div>
  );
};
