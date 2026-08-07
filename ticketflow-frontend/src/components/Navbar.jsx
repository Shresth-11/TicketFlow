import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LifeBuoy, ShieldCheck, Headphones, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldCheck className="w-3 h-3 text-purple-600" />
            Admin
          </span>
        );
      case 'AGENT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            <Headphones className="w-3 h-3 text-blue-600" />
            Agent
          </span>
        );
      case 'EMPLOYEE':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            <UserCheck className="w-3 h-3 text-slate-500" />
            Employee
          </span>
        );
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
              <LifeBuoy className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 tracking-tight">
                TicketFlow
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                / Service Desk
              </span>
            </div>
          </div>

          {/* User profile */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs flex items-center justify-center">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">{user.fullName}</span>
                  {getRoleBadge(user.role)}
                </div>
              </div>

              <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
