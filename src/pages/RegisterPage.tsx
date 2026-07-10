import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Eye, EyeOff, Lock, Mail, User, AlertCircle, ChevronLeft, CheckCircle
} from 'lucide-react';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  onNavigateToLogin: () => void;
  onNavigateToHome: () => void;
  error: string | null;
}

export function RegisterPage({ onRegister, onNavigateToLogin, onNavigateToHome, error }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoading(true);
    try {
      await onRegister(name, email, password);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--success)]/10 rounded-full blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[var(--success)]" />
          </div>
          <h1 className="text-2xl font-bold mb-3 text-[var(--foreground)]">Account created!</h1>
          <p className="text-[var(--foreground-subtle)] text-sm mb-8 leading-relaxed">
            We&apos;ve sent a confirmation email to <strong className="text-[var(--foreground)]">{email}</strong>.
            Please check your inbox and verify your email to get started.
          </p>
          <button
            onClick={onNavigateToLogin}
            className="flex items-center justify-center gap-2 mx-auto bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--on-primary)] px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            Go to Sign In
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Back button */}
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)] text-sm mb-8 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-[var(--on-primary)]" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Create your account</h1>
          <p className="text-[var(--foreground-subtle)] text-sm">Start building with your AI co-founder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-4 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/20 text-[var(--error)] text-sm"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all duration-200 outline-none text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all duration-200 outline-none text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all duration-200 outline-none text-sm"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !name || !email || !password}
            className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--on-primary)] py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[var(--on-primary)]/30 border-t-[var(--on-primary)] rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--foreground-subtle)]">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[var(--primary)] hover:text-[var(--secondary)] font-medium transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
