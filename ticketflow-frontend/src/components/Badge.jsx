import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  ArrowDownCircle, 
  Circle, 
  Clock, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const PriorityBadge = ({ priority }) => {
  switch (priority) {
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25">
          <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
          CRITICAL
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/25">
          <Info className="w-3 h-3 text-violet-400 shrink-0" />
          MEDIUM
        </span>
      );
    case 'LOW':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
          <ArrowDownCircle className="w-3 h-3 text-slate-400 shrink-0" />
          LOW
        </span>
      );
  }
};

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'OPEN':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/25">
          <Circle className="w-2 h-2 fill-blue-400 text-blue-400 animate-pulse" />
          Open
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25">
          <Clock className="w-3 h-3 text-amber-400 shrink-0" />
          In Progress
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          Resolved
        </span>
      );
    case 'CLOSED':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
          <XCircle className="w-3 h-3 text-slate-400 shrink-0" />
          Closed
        </span>
      );
  }
};
