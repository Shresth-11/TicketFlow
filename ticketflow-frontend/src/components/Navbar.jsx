import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LifeBuoy, ShieldCheck, Headphones, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border-2 border-purple-800">
            <ShieldCheck className="w-3 h-3 text-purple-800" />
            Admin
          </span>
        );
      case 'AGENT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 border-2 border-red-800">
            <Headphones className="w-3 h-3 text-red-800" />
            Agent
          </span>
        );
      case 'EMPLOYEE':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border-2 border-amber-800">
            <UserCheck className="w-3 h-3 text-amber-800" />
            Employee
          </span>
        );
    }
  };

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 mb-4">
      {/* Floating Pill Nav Bar matching heyparker.ai */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-full px-6 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
        
        {/* Brand Logo - Red Serif logo matching Parker */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-xs">
            <LifeBuoy className="w-4 h-4 text-white" />
          </div>
          <span className="text-2xl font-serif font-bold text-red-600 tracking-tight">
            ResolvIT
          </span>
        </div>

        {/* User profile & Sign Out Button */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-bold text-black">{user.fullName}</span>
              {getRoleBadge(user.role)}
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Sign In Today
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
