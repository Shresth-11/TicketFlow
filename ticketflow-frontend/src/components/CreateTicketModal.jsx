import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';

export const CreateTicketModal = ({ isOpen, onClose, categories, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Please select a category');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit({
        title,
        description,
        categoryId: parseInt(categoryId, 10),
        priority,
      });

      setTitle('');
      setDescription('');
      setCategoryId('');
      setPriority('MEDIUM');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-[#0d0d12] border border-[#20202c] rounded-xl shadow-2xl p-6 text-slate-100 space-y-5">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-[#20202c] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Create New Support Ticket</h3>
              <p className="text-xs text-slate-400">Describe your IT issue for queue assignment</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-md">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Subject Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Cannot connect to corporate VPN"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Category</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Issue Description</label>
              <textarea
                required
                rows="4"
                placeholder="Provide detailed error messages, device name, or troubleshooting steps taken..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#14141d] border border-[#242432] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#20202c]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-[#181822] border border-[#282836] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-600/20 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Ticket
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
