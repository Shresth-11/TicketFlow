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
    <div className="min-h-screen bg-[#fbf7ee] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#eae3d2] border-2 border-black rounded-3xl p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-base flex items-center justify-center mx-auto mb-2 shadow-xs">
            <LifeBuoy className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-black tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-700 font-medium">Join ResolvIT Service Desk</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="flex items-center gap-2 p-2.5 bg-red-100 border-2 border-black text-red-900 font-bold text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-black mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Sarah Jenkins"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="sarah@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-bold focus:outline-none"
            >
              <option value="EMPLOYEE">Employee (Submit Tickets)</option>
              <option value="AGENT">Support Agent (Triage & Resolve)</option>
              <option value="ADMIN">Administrator (Full Access)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-bold text-white bg-black hover:bg-slate-800 rounded-full transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="pt-3 border-t-2 border-black text-center">
          <p className="text-[11px] text-slate-700 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-red-700 hover:underline font-bold">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
