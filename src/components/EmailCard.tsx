import { useState } from 'react';
import { Mail, Send, Copy, Check, Pencil, X, CheckCircle2 } from 'lucide-react';
import type { ComposedEmail } from '../types';

interface EmailCardProps {
  email: ComposedEmail;
}

export default function EmailCard({ email: initialEmail }: EmailCardProps) {
  const [email, setEmail] = useState<ComposedEmail>(initialEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCopy = async () => {
    const fullText = `To: ${email.to || '(recipient not specified)'}\nSubject: ${email.subject}\n\n${email.body}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGmailCompose = () => {
    const params = new URLSearchParams({
      su: email.subject,
      body: email.body,
    });
    if (email.to) params.set('to', email.to);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEmail(initialEmail);
    setIsEditing(false);
  };

  return (
    <div className="mt-3 rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-accent/5 border-b border-border">
        <Mail className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">Composed Email</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
          Ready to send
        </span>
      </div>

      {isEditing ? (
        /* ─── Edit Mode ─── */
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-foreground-muted mb-1">To</label>
            <input
              type="email"
              value={email.to}
              onChange={(e) => setEmail({ ...email, to: e.target.value })}
              placeholder="recipient@example.com"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground-muted mb-1">Subject</label>
            <input
              type="text"
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground-muted mb-1">Body</label>
            <textarea
              value={email.body}
              onChange={(e) => setEmail({ ...email, body: e.target.value })}
              rows={10}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-y font-sans"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer active:scale-[0.97]"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer active:scale-[0.97]"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ─── Preview Mode ─── */
        <>
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-medium text-foreground-muted w-14 flex-shrink-0">To</span>
              <span className="text-sm text-foreground">{email.to || <span className="text-foreground-subtle italic">Not specified — add recipient before sending</span>}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-medium text-foreground-muted w-14 flex-shrink-0">Subject</span>
              <span className="text-sm font-medium text-foreground">{email.subject}</span>
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="text-sm text-foreground-muted whitespace-pre-wrap leading-relaxed border-t border-border pt-3">
              {email.body}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-surface/30">
            <button
              onClick={handleGmailCompose}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-200 cursor-pointer active:scale-[0.97] shadow-sm"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Opened in Gmail
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Open in Gmail
                </>
              )}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-success" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
