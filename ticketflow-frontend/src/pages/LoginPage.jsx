import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, LifeBuoy } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (!err.response) {
        setError('Backend server is waking up on Render. Please wait 15 seconds and try again!');
      } else if (err.response.status === 401) {
        setError('Invalid email or password. Click one of the quick demo buttons below!');
      } else if (err.response.status >= 500) {
        setError('Server is initializing database. Please try again in 15 seconds.');
      } else {
        setError(err.response?.data?.message || 'Authentication error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('TicketFlow2026!');
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#101014] border border-[#20202a] rounded-xl shadow-2xl p-6 space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-bold text-base flex items-center justify-center mx-auto mb-3 shadow-md shadow-violet-600/20">
            <LifeBuoy className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Sign in to TicketFlow</h1>
          <p className="text-xs text-slate-400">Access enterprise IT service desk portal</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-600/20 transition-all hover:scale-[1.01] disabled:opacity-50 mt-1 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Server...</span>
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Demo Links at bottom */}
        <div className="pt-3 border-t border-[#1e1e28] text-center space-y-2">
          <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">Quick Demo Login:</p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleDemoFill('employee@ticketflow.com')}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Employee
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('agent@ticketflow.com')}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Agent
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('admin@ticketflow.com')}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Admin
            </button>
          </div>

          <p className="text-[11px] text-slate-400 pt-1">
            Need an account?{' '}
            <Link to="/signup" className="text-violet-400 hover:underline font-semibold">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
