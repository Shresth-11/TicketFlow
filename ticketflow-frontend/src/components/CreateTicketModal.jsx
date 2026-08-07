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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-[#fbf7ee] border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-black space-y-5">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-black">Create New Support Ticket</h3>
              <p className="text-xs text-slate-700">Describe your IT issue for queue assignment</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-red-100 border-2 border-black text-red-900 font-bold text-xs rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-black mb-1">Subject Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Cannot connect to corporate VPN"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-black mb-1">Category</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-bold focus:outline-none"
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
                <label className="block font-bold text-black mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black font-bold focus:outline-none"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-black mb-1">Issue Description</label>
              <textarea
                required
                rows="4"
                placeholder="Provide detailed error messages, device name, or troubleshooting steps taken..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-black placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-black">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black rounded-full hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors disabled:opacity-50 shadow-xs"
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
