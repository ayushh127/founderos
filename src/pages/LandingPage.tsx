import { useState, useEffect } from 'react';
import { Logo } from '../components/Logo';
import {
  Sparkles,
  ArrowRight,
  Rocket,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Star,
  CheckCircle2,
  Quote,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Brainstorming',
      description: 'Generate startup ideas, validate concepts, and get strategic insights from your AI co-founder.',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'MVP Planning',
      description: 'Map out your Minimum Viable Product with step-by-step guidance from ideation to launch.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Market Research',
      description: 'Analyze competitors, identify target audiences, and understand market dynamics with AI assistance.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Rapid Iteration',
      description: 'Get instant feedback on your ideas, pivot strategies, and refine your business model on the fly.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Risk Analysis',
      description: 'Identify potential risks, regulatory challenges, and mitigation strategies before you commit.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Strategy',
      description: 'Plan your go-to-market strategy, customer acquisition channels, and scaling roadmap.',
    },
  ];

  const testimonials = [
    {
      quote: "FounderOS helped me validate my idea in 48 hours. The AI co-founder asked questions I hadn't even considered.",
      author: 'Sarah Chen',
      role: 'Founder, TechStart',
      rating: 5,
    },
    {
      quote: "It's like having a experienced co-founder who never sleeps. The strategic insights have been invaluable for our pivot.",
      author: 'Marcus Johnson',
      role: 'CEO, DataFlow',
      rating: 5,
    },
    {
      quote: "From concept to MVP roadmap in one week. FounderOS saved us months of trial and error.",
      author: 'Elena Rodriguez',
      role: 'Co-founder, GreenPath',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo className="w-7 h-7" />
              <span className="font-bold text-lg">FounderOS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Pricing
              </a>
              <button
                onClick={onLogin}
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onRegister}
                className="px-4 py-2 rounded-lg bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 border border-[var(--border)] text-[var(--foreground)] text-sm font-medium transition-all"
              >
                Get Started
              </button>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg)] border-b border-[var(--border)]">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-sm text-[var(--foreground-muted)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-sm text-[var(--foreground-muted)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block text-sm text-[var(--foreground-muted)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <button
                onClick={onLogin}
                className="block text-sm text-[var(--foreground-muted)] w-full text-left"
              >
                Sign In
              </button>
              <button
                onClick={onRegister}
                className="w-full px-4 py-2 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] text-[var(--foreground)] text-sm font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Startup Co-founder</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Build Your Startup
              <br />
              <span className="gradient-text">With AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Your AI co-founder that helps you ideate, validate, and plan your startup from
              concept to launch. Get strategic insights, market analysis, and actionable
              roadmaps — 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onRegister}
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--on-primary)] font-semibold text-base transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Start Building Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium text-base transition-all border border-[var(--border)] hover:border-[var(--border-hover)]"
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8 border-y border-[var(--border)]">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">10k+</div>
                <div className="text-sm text-[var(--foreground-subtle)]">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">50+</div>
                <div className="text-sm text-[var(--foreground-subtle)]">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">24/7</div>
                <div className="text-sm text-[var(--foreground-subtle)]">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo / Mockup */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Glow under mockup */}
            <div className="absolute -inset-4 bg-[var(--primary)]/20 blur-[40px] rounded-3xl opacity-50" />

            {/* Mockup container */}
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-light)] bg-[var(--surface)]/50">
                <div className="w-3 h-3 rounded-full bg-[var(--danger)]/80" />
                <div className="w-3 h-3 rounded-full bg-[var(--warning)]/80" />
                <div className="w-3 h-3 rounded-full bg-[var(--success)]/80" />
                <div className="ml-4 text-xs text-[var(--foreground-subtle)]">FounderOS — AI Co-founder</div>
              </div>

              {/* Chat mockup */}
              <div className="p-6 space-y-4">
                {/* AI Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[var(--on-primary)]" />
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="rounded-xl rounded-tl-sm bg-[var(--surface)]/80 border border-[var(--border)] p-3">
                      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                        Hey! I see you want to build a SaaS startup. Let's start by understanding your target market and value proposition. What problem are you solving?
                      </p>
                    </div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-1 ml-1">FounderAI</div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-hover)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[var(--foreground-subtle)] font-medium">You</span>
                  </div>
                  <div className="flex-1 max-w-md flex justify-end">
                    <div className="rounded-xl rounded-tr-sm bg-[var(--primary)] p-3">
                      <p className="text-sm text-[var(--on-primary)] leading-relaxed">
                        I want to help small businesses automate their customer support with AI.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Response with suggestions */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[var(--on-primary)]" />
                  </div>
                  <div className="flex-1 max-w-lg">
                    <div className="rounded-xl rounded-tl-sm bg-[var(--surface)]/80 border border-[var(--border)] p-3 space-y-3">
                      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                        Great problem space! The SMB customer support market is massive. Let me help you validate this idea. Here are some next steps:
                      </p>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 rounded-lg bg-[var(--surface-hover)]/50 border border-[var(--border)] text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors flex items-center gap-2">
                          <Target className="w-4 h-4 text-[var(--primary)]" />
                          Define your target customer persona
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg bg-[var(--surface-hover)]/50 border border-[var(--border)] text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                          Analyze market size & competition
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg bg-[var(--surface-hover)]/50 border border-[var(--border)] text-sm text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors flex items-center gap-2">
                          <Rocket className="w-4 h-4 text-[var(--primary)]" />
                          Build an MVP feature roadmap
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-1 ml-1">FounderAI</div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[var(--on-primary)]" />
                  </div>
                  <div className="flex items-center gap-1 px-4 py-2 rounded-xl rounded-tl-sm bg-[var(--surface)]/80 border border-[var(--border)]">
                    <div className="w-2 h-2 rounded-full bg-[var(--foreground-subtle)] animate-bounce-dot" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[var(--foreground-subtle)] animate-bounce-dot" style={{ animationDelay: '200ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[var(--foreground-subtle)] animate-bounce-dot" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="px-4 py-3 border-t border-[var(--border-light)] bg-[var(--surface)]/50">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-hover)]/50 border border-[var(--border)]">
                  <div className="flex-1 h-5 bg-[var(--foreground-subtle)]/20 rounded animate-pulse" />
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/80 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-[var(--on-primary)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Build</span>
            </h2>
            <p className="text-lg text-[var(--foreground-muted)]">
              From the first spark of an idea to a fully-fledged business plan, FounderOS guides you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)] hover:bg-[var(--surface-elevated)]/80 hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <div className="text-[var(--primary)]">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-[var(--foreground-muted)]">
              Three simple steps to get your startup from idea to execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Share Your Idea',
                description: 'Tell our AI about your startup concept, target market, and goals. The more details, the better the guidance.',
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                step: '02',
                title: 'Get Strategic Insights',
                description: 'Receive market analysis, competitive research, validation frameworks, and actionable recommendations.',
                icon: <Target className="w-6 h-6" />,
              },
              {
                step: '03',
                title: 'Build & Launch',
                description: 'Create your MVP roadmap, define milestones, and track progress as you build your startup.',
                icon: <Rocket className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="p-6 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                      <div className="text-[var(--primary)]">{item.icon}</div>
                    </div>
                    <span className="text-4xl font-bold text-[var(--primary)]/20">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-[var(--foreground-subtle)]/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Founders</span>
            </h2>
            <p className="text-lg text-[var(--foreground-muted)]">
              Join thousands of entrepreneurs who are building the future with FounderOS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[var(--warning)] fill-[var(--warning)]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[var(--primary)]/30 mb-3" />
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-[var(--on-primary)] font-semibold text-sm">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[var(--foreground)]">{testimonial.author}</div>
                    <div className="text-xs text-[var(--foreground-subtle)]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[var(--surface)]/50 border border-[var(--border)] p-8 md:p-12 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your
                <br />
                <span className="gradient-text">Startup?</span>
              </h2>
              <p className="text-lg text-[var(--foreground-muted)] max-w-lg mx-auto mb-8">
                Join 10,000+ founders using AI to turn their ideas into reality. Start for free, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onRegister}
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--on-primary)] font-semibold text-base transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start Building Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onLogin}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium text-base transition-all border border-[var(--border)] hover:border-[var(--border-hover)]"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-subtle)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                  Free forever plan
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-subtle)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                  No credit card
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-subtle)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                  Unlimited projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--on-primary)]" />
              </div>
              <span className="font-bold text-lg">FounderOS</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors">
                Contact
              </a>
            </div>
            <div className="text-sm text-[var(--foreground-subtle)]">
              © 2025 FounderOS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
