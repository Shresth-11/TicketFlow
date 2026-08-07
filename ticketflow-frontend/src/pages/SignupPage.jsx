import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, LifeBuoy } from 'lucide-react';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(fullName, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#101014] border border-[#20202a] rounded-xl shadow-2xl p-6 space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-bold text-base flex items-center justify-center mx-auto mb-3 shadow-md shadow-violet-600/20">
            <LifeBuoy className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-400">Join TicketFlow Service Desk</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Sarah Jenkins"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="sarah@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
            >
              <option value="EMPLOYEE">Employee (Submit Tickets)</option>
              <option value="AGENT">Support Agent (Triage & Resolve)</option>
              <option value="ADMIN">Administrator (Full Access)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-600/20 transition-all hover:scale-[1.01] disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="pt-3 border-t border-[#1e1e28] text-center">
          <p className="text-[11px] text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
