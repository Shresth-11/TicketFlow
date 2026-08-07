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
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-red-100 text-red-700 border-2 border-red-700 shadow-[1px_1px_0px_0px_rgba(185,28,28,1)]">
          <ShieldAlert className="w-3 h-3 text-red-700 shrink-0" />
          CRITICAL
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border-2 border-amber-700 shadow-[1px_1px_0px_0px_rgba(180,83,9,1)]">
          <AlertTriangle className="w-3 h-3 text-amber-800 shrink-0" />
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-yellow-100 text-yellow-900 border-2 border-yellow-700">
          <Info className="w-3 h-3 text-yellow-800 shrink-0" />
          MEDIUM
        </span>
      );
    case 'LOW':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border-2 border-slate-700">
          <ArrowDownCircle className="w-3 h-3 text-slate-600 shrink-0" />
          LOW
        </span>
      );
  }
};

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'OPEN':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border-2 border-blue-800">
          <Circle className="w-2 h-2 fill-blue-600 text-blue-600 animate-pulse" />
          Open
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border-2 border-amber-800">
          <Clock className="w-3 h-3 text-amber-800 shrink-0" />
          In Progress
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-900 border-2 border-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-800 shrink-0" />
          Resolved
        </span>
      );
    case 'CLOSED':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-800 border-2 border-slate-800">
          <XCircle className="w-3 h-3 text-slate-700 shrink-0" />
          Closed
        </span>
      );
  }
};
