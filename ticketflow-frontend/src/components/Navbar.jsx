import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LifeBuoy, ShieldCheck, Headphones, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            Admin
          </span>
        );
      case 'AGENT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/25">
            <Headphones className="w-3 h-3 text-violet-400" />
            Agent
          </span>
        );
      case 'EMPLOYEE':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
            <UserCheck className="w-3 h-3 text-slate-400" />
            Employee
          </span>
        );
    }
  };

  return (
    <header className="bg-[#0a0a0d]/80 backdrop-blur-md border-b border-[#1f1f28] sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-violet-600/20">
              <LifeBuoy className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                TicketFlow
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                / Service Desk
              </span>
            </div>
          </div>

          {/* User profile */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 font-semibold text-xs flex items-center justify-center">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">{user.fullName}</span>
                  {getRoleBadge(user.role)}
                </div>
              </div>

              <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
