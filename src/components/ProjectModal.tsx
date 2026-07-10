import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}

export default function ProjectModal({ open, onClose, onCreate }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setError('');
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    try {
      await onCreate(name.trim(), description.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create project. Try again?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-venture-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 id="new-venture-title" className="text-base font-semibold">New Venture</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 text-foreground-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1.5">
              What are you building?
            </label>
            <input
              ref={nameRef}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Protein Powder Brand, AI Scheduling App..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1.5">
              Short description <span className="opacity-60">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What problem does it solve? Who is it for?"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 outline-none resize-none"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-all duration-150 cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-medium hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Venture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
