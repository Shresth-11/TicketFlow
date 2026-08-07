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
  Coffee,
  Smile,
  CheckCircle2,
  Key,
  ShieldAlert
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

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] text-slate-900 font-sans flex flex-col selection:bg-red-500 selection:text-white scroll-smooth">
      
      {/* Floating Pill Nav Bar matching heyparker.ai */}
      <header className="sticky top-4 z-40 px-4 mb-4">
        <div className="max-w-5xl mx-auto bg-white border-2 border-black rounded-full px-6 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          
          {/* Brand Logo - Red Serif logo matching Parker */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-xs">
              <LifeBuoy className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-red-600 tracking-tight">
              ResolvIT
            </span>
          </div>

          {/* Center Navigation Links with Smooth Scroll */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-black">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-red-600 transition-colors">
              How it works
            </a>
            <a href="#demo" onClick={(e) => scrollToSection(e, 'demo')} className="hover:text-red-600 transition-colors">
              Demo Portals
            </a>
            <a href="#security" onClick={(e) => scrollToSection(e, 'security')} className="hover:text-red-600 transition-colors">
              Security
            </a>
          </div>

          {/* Right Action Button */}
          <div>
            {user ? (
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs inline-flex items-center gap-1.5"
              >
                Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
              >
                Sign In Today
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* Hero Section matching heyparker.ai Vintage Mac Monitor & Retro Graphics */}
      <section className="pt-10 pb-16 px-4 relative overflow-hidden">
        
        {/* Left Hand-Drawn Coffee Cup Graphic (heyparker.ai style) */}
        <div className="hidden lg:flex flex-col items-center absolute left-8 top-36 pointer-events-none opacity-90 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-24 h-32 bg-amber-400 border-3 border-black rounded-b-3xl rounded-t-xl flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="w-20 h-4 bg-black rounded-t-md absolute -top-4" />
            <Coffee className="w-10 h-10 text-black stroke-[2.5]" />
            <span className="font-mono text-[9px] font-bold text-black mt-1">IT CAFFEINE</span>
          </div>
        </div>

        {/* Right Hand-Drawn Mascot Graphic (heyparker.ai style) */}
        <div className="hidden lg:flex flex-col items-center absolute right-8 top-36 pointer-events-none opacity-90">
          <div className="w-24 h-32 bg-emerald-400 border-3 border-black rounded-full flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
            <Smile className="w-12 h-12 text-black stroke-[2.5]" />
            <span className="font-mono text-[9px] font-bold text-black mt-1">SLA 100%</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Main Retro Macintosh Computer Frame (heyparker.ai Hero Monitor) */}
          <div className="bg-[#eae3d2] border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6 relative max-w-2xl mx-auto">
            
            {/* White Monitor Screen Box */}
            <div className="bg-white border-3 border-black rounded-2xl p-8 sm:p-12 shadow-inner text-center space-y-4">
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-black leading-tight tracking-tight">
                The way you manage IT support is about to change forever
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-lg mx-auto">
                ResolvIT streamlines corporate helpdesks with automated ticket triage, SLA priority routing, and slide-over inspector workflows.
              </p>
            </div>

            {/* Macintosh Floppy Disk Drive Slot & Label */}
            <div className="flex flex-col items-center justify-center gap-1.5 pt-2">
              <span className="font-mono text-[10px] font-bold text-slate-800 uppercase tracking-widest">Scroll down ↓</span>
              <div className="w-48 h-3.5 bg-[#dcd4c0] border-2 border-black rounded-sm shadow-inner relative flex items-center justify-center">
                <div className="w-12 h-1 bg-black rounded-full" />
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Sign In to Service Desk
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demo"
              onClick={(e) => scrollToSection(e, 'demo')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-black border-2 border-black text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Explore Demo Accounts
            </a>
          </div>

        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="py-16 bg-[#eae3d2] border-y-2 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-serif font-bold text-black">Built for Speed & Reliability</h2>
            <p className="text-xs font-medium text-slate-700">Everything your IT support team needs in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-black flex items-center justify-center text-red-600 mb-3">
                <Inbox className="w-5 h-5 text-red-700" />
              </div>
              <h3 className="text-base font-serif font-bold text-black">Centralized Queue</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Filter and manage incoming IT support requests across categories, priority urgency, and agent assignment.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-black flex items-center justify-center text-amber-800 mb-3">
                <Lock className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-black">Data Privacy & Security</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Built with Spring Security 6 and JPA query-level scoping to ensure employee accounts only view their own tickets.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-black flex items-center justify-center text-purple-800 mb-3">
                <Zap className="w-5 h-5 text-purple-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-black">Slide-over Inspector</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Linear-style right drawer for quick ticket inspection, status updates, agent assignment, and response drafting.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Recruiter Quick Demo Hub */}
      <section id="demo" className="py-16 bg-[#fbf7ee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div>
            <h2 className="text-3xl font-serif font-bold text-black tracking-tight">
              Test Portal Accounts
            </h2>
            <p className="text-xs font-medium text-slate-700 mt-1">
              Select a demo role below to launch directly into the dashboard queue:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            
            <button
              onClick={() => handleQuickDemoLogin('employee@ticketflow.com')}
              className="bg-white border-2 border-black p-5 rounded-2xl transition-all group flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-black" />
                  <span className="text-sm font-bold text-black font-serif">
                    Employee Account
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  Submit new requests and track personal tickets with strict privacy controls.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1">
                Sign in as Employee <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('agent@ticketflow.com')}
              className="bg-white border-2 border-black p-5 rounded-2xl transition-all group flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Headset className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-bold text-black font-serif">
                    Support Agent
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  Manage organization queue, review auto-suggestions, assign agents, and resolve incidents.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1">
                Sign in as Agent <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin@ticketflow.com')}
              className="bg-white border-2 border-black p-5 rounded-2xl transition-all group flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span className="text-sm font-bold text-black font-serif">
                    System Admin
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  Full administrative access, ticket deletion, category management, and user controls.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1">
                Sign in as Admin <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

        </div>
      </section>

      {/* Security & Architecture Section */}
      <section id="security" className="py-16 bg-[#eae3d2] border-t-2 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-black tracking-tight">
              Enterprise Security Architecture
            </h2>
            <p className="text-xs font-medium text-slate-700">
              Hardened with OWASP security standards and Spring Security 6 stateless architecture
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-serif">
                <Key className="w-4 h-4" />
                <span>Stateless JWT Authentication</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Tokens are signed via HMAC-SHA256 with 24-hour expiration, preventing session hijacking and eliminating server-side session state.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-sm font-serif">
                <ShieldCheck className="w-4 h-4" />
                <span>IDOR Query Scoping</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Prevents Insecure Direct Object References by scoping database JPA queries to match the authenticated user ID for employee roles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm font-serif">
                <ShieldAlert className="w-4 h-4" />
                <span>Rate Limiting Filter</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Built-in servlet filter enforces sliding window request limits per client IP to prevent brute-force attacks and queue flooding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-serif">
                <CheckCircle2 className="w-4 h-4" />
                <span>Method-Level RBAC</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Spring `@PreAuthorize` annotations restrict agent assignment, ticket status updates, and administrative deletion to authorized roles.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-black bg-white py-6 text-xs text-black">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-red-600 text-sm">ResolvIT</span>
            <span>— Java 17 Spring Boot + React 18</span>
          </div>
          <div className="font-mono text-[11px] text-slate-700">
            Enterprise IT Support Desk System
          </div>
        </div>
      </footer>

    </div>
  );
};
