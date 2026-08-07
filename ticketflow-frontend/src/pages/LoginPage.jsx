import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

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
        setError('Backend server is waking up on Render. Please wait 30 seconds and try again!');
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-9 h-9 rounded-md bg-blue-600 text-white font-bold text-base flex items-center justify-center mx-auto mb-2">
            TF
          </div>
          <h1 className="text-lg font-bold text-slate-900">Sign in to Service Desk</h1>
          <p className="text-xs text-slate-500">Enter your credentials to access IT support</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xs transition-colors disabled:opacity-50 mt-1 flex items-center justify-center gap-2"
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

        {/* Subtle Demo Links at bottom */}
        <div className="pt-3 border-t border-slate-100 text-center space-y-2">
          <p className="text-[11px] text-slate-400 font-medium">Quick Demo Credentials:</p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleDemoFill('employee@ticketflow.com')}
              className="text-blue-600 hover:underline font-medium"
            >
              Employee
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('agent@ticketflow.com')}
              className="text-blue-600 hover:underline font-medium"
            >
              Agent
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => handleDemoFill('admin@ticketflow.com')}
              className="text-blue-600 hover:underline font-medium"
            >
              Admin
            </button>
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            Need an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
