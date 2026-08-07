import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LifeBuoy, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Zap, 
  Lock, 
  Users, 
  Headset, 
  User, 
  ChevronRight,
  Activity,
  Layers
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
                <LifeBuoy className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white tracking-tight">TicketFlow</span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">Service Desk</span>
              </div>
            </div>

            {/* Nav links & CTA */}
            <div className="flex items-center gap-4">
              <a href="#features" className="text-xs font-medium text-slate-400 hover:text-white transition-colors hidden md:inline-block">
                Features
              </a>
              <a href="#security" className="text-xs font-medium text-slate-400 hover:text-white transition-colors hidden md:inline-block">
                Security
              </a>
              <a href="#demo" className="text-xs font-medium text-slate-400 hover:text-white transition-colors hidden md:inline-block">
                Recruiter Demo
              </a>

              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Go to Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Next-Generation AI Service Desk Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            IT Service Desk Management, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Accelerated by Artificial Intelligence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            TicketFlow streamlines corporate IT helpdesks with automated GPT-4o ticket triage, SLA priority routing, role-based IDOR security, and Linear-style slide-over drawer workflows.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
            >
              1-Click Recruiter Demo
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Live Preview Card Mockup */}
          <div className="mt-14 max-w-5xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl text-left relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-500 font-mono ml-2">ticketflow.internal.company.com/queue</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                  <Activity className="w-3 h-3 animate-pulse" /> Live SLA Queue
                </span>
              </div>
            </div>

            {/* Preview Ticket Row */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-400">TKT-108</span>
                  <h4 className="text-sm font-bold text-white">Laptop display flickers violently and turns pitch black</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    CRITICAL
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    In Progress
                  </span>
                </div>
              </div>

              {/* AI Triage Banner */}
              <div className="bg-blue-950/40 border border-blue-500/30 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-3">
                <Bot className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-300 text-xs">AI Smart Triage Recommendation:</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">GPT-4o</span>
                  </div>
                  <p className="italic text-slate-300 text-[11px]">
                    "GPU power distribution fault detected. Suggested priority: CRITICAL. Category: IT Hardware. Candidate response drafted."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3 Core Feature Pillars */}
      <section id="features" className="py-16 bg-slate-950/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Built for Modern Enterprise IT Operations
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Designed from basic principles to advanced production standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Automated AI Triage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uses OpenAI GPT-4o structured JSON function calling to classify urgency, route department categories, and draft agent responses without raw text failures.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">IDOR & Enterprise Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protects against OWASP Top 10 vulnerabilities. Enforces Spring Security RBAC and database query-level scoping so employees can only access their own tickets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Linear-Style Drawer UI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern slide-over inspection drawer, real-time SLA metrics, 1-click triage accept, and clear role-aware views for employees vs support staff.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Recruiter Quick-Access Demo Hub */}
      <section id="demo" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Recruiter Sandbox</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Test TicketFlow Live in 1 Click
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Select any pre-configured demo portal to launch directly into the dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Employee Portal */}
            <button
              onClick={() => handleQuickDemoLogin('employee@ticketflow.com')}
              className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Employee Portal
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Submit new support requests & track personal tickets with IDOR query guards.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1">
                Launch Portal <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Agent Console */}
            <button
              onClick={() => handleQuickDemoLogin('agent@ticketflow.com')}
              className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <Headset className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Support Agent Console
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  View company ticket queue, accept AI smart triage, assign agents, and resolve incidents.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1">
                Launch Console <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Admin Console */}
            <button
              onClick={() => handleQuickDemoLogin('admin@ticketflow.com')}
              className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  System Admin Suite
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Full system control, ticket deletion, category management, and user administration.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1">
                Launch Suite <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TicketFlow Service Desk</span>
            <span>— Developed with Spring Boot 3 & React 18</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};
