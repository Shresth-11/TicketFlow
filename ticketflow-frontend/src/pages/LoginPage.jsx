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
    setPassword('ResolvIT2026!');
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#eae3d2] border-2 border-black rounded-3xl p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-base flex items-center justify-center mx-auto mb-2 shadow-xs">
            <LifeBuoy className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-black tracking-tight">Sign in to ResolvIT</h1>
          <p className="text-xs text-slate-700 font-medium">Access enterprise IT service desk portal</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-2 p-2.5 bg-red-100 border-2 border-black text-red-900 text-xs font-bold rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-black mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2 text-black placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2 text-black placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-bold text-white bg-black hover:bg-slate-800 rounded-full transition-all disabled:opacity-50 mt-1 flex items-center justify-center gap-2"
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
        <div className="pt-3 border-t-2 border-black text-center space-y-2">
          <p className="text-[11px] text-slate-700 font-mono font-bold uppercase tracking-wider">Quick Demo Login:</p>
          <div className="flex items-center justify-center gap-3 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleDemoFill('employee@ticketflow.com')}
              className="text-red-700 hover:underline"
            >
              Employee
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('agent@ticketflow.com')}
              className="text-red-700 hover:underline"
            >
              Agent
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('admin@ticketflow.com')}
              className="text-red-700 hover:underline"
            >
              Admin
            </button>
          </div>

          <p className="text-[11px] text-slate-700 pt-1 font-medium">
            Need an account?{' '}
            <Link to="/signup" className="text-red-700 hover:underline font-bold">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
