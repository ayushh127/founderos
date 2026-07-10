import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './lib/supabase';
import type { Project, ChatMessage, AppStage, Mode, Stage, SourceData } from './types';
import { streamAIResponse } from './api/cofounder';
import { useTheme } from './lib/theme';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

import Sidebar from './components/Sidebar';
import ProjectModal from './components/ProjectModal';
import EmptyState from './components/EmptyState';
import Message from './components/Message';
import { StageTracker } from './components/StageTracker';
import { Logo } from './components/Logo';

import {
  Send, Loader2, Sparkles, Bot, User, Lightbulb, Search,
  ArrowRight, ChevronDown, ScrollText, Settings, Wand2,
  Moon, Sun, Target, Zap
} from 'lucide-react';

const ALL_STAGES: AppStage[] = [
  { id: 'discovery', label: 'Discovery', icon: Lightbulb, description: 'Define the problem and vision' },
  { id: 'planner', label: 'Planning', icon: ScrollText, description: 'Build roadmap and strategy' },
  { id: 'market_research', label: 'Market', icon: Search, description: 'Research and validate' },
  { id: 'manufacturer', label: 'Manufacturer', icon: Bot, description: 'Supply chain and logistics' },
  { id: 'finance', label: 'Finance', icon: Settings, description: 'Financial modeling and projections' },
  { id: 'branding', label: 'Branding', icon: Sparkles, description: 'Brand identity and positioning' },
  { id: 'strategy', label: 'Strategy', icon: Target, description: 'Go-to-market plan' },
];

const MODES: { id: Mode; label: string; color: string; icon: React.ElementType }[] = [
  { id: 'auto', label: 'Auto', color: 'text-[#10B981]', icon: Zap },
  { id: 'general', label: 'General', color: 'text-foreground-muted', icon: Wand2 },
  { id: 'discovery', label: 'Discovery', color: 'text-[#6366F1]', icon: Lightbulb },
  { id: 'planner', label: 'Planner', color: 'text-[#8B5CF6]', icon: ScrollText },
  { id: 'market_research', label: 'Market', color: 'text-[#3B82F6]', icon: Search },
  { id: 'manufacturer', label: 'Manufacturer', color: 'text-[#22C55E]', icon: Bot },
  { id: 'finance', label: 'Finance', color: 'text-[#F59E0B]', icon: Settings },
  { id: 'branding', label: 'Branding', color: 'text-[#EC4899]', icon: Sparkles },
  { id: 'strategy', label: 'Strategy', color: 'text-[#EF4444]', icon: Target },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'app'>('landing');
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [mode, setMode] = useState<Mode>('auto');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setView('app');
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setView('app');
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load projects
  useEffect(() => {
    if (!user) return;
    loadProjects();
  }, [user]);

  // Load messages when switching projects
  useEffect(() => {
    if (!activeProjectId) {
      setMessages([]);
      return;
    }
    loadMessages(activeProjectId);
  }, [activeProjectId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close mode dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(e.target as Node)) {
        setShowModeDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) return;
    setProjects(data || []);
    if (data && data.length > 0 && !activeProjectId) {
      setActiveProjectId(data[0].id);
    }
  }

  async function loadMessages(projectId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });
    if (error) return;
    setMessages(
      (data || []).map((m) => ({
        id: String(m.id),
        role: m.role as 'user' | 'assistant',
        content: m.content,
        mode: m.mode,
        metadata: m.metadata,
        sources: (m.metadata?.sources as SourceData[]) || undefined,
      }))
    );
  }

  async function handleLogin(email: string, password: string) {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function handleRegister(name: string, email: string, password: string) {
    setAuthError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) setAuthError(error.message);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setView('landing');
    setProjects([]);
    setActiveProjectId(null);
    setMessages([]);
  }

  async function handleCreateProject(name: string, description: string) {
    if (!user) return;
    const { data, error } = await supabase
      .from('projects')
      .insert({ name, description, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    setProjects((prev) => [data, ...prev]);
    setActiveProjectId(data.id);
  }

  async function handleRenameProject(id: string, name: string) {
    const { error } = await supabase.from('projects').update({ name }).eq('id', id);
    if (error) throw error;
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  async function handleDeleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProjectId === id) setActiveProjectId(null);
  }

  const handleSend = useCallback(async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text || !activeProjectId || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Messages are saved server-side by the Edge Function now

    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
      isStreaming: true,
      metadata: { mode },
    };

    setMessages((prev) => [...prev, assistantMsg]);

    // Track assistant response for updating project stage
    let detectedStage = '';

    try {
      await streamAIResponse({
        projectId: activeProjectId,
        messages: [...messages, userMsg],
        mode,
        onChunk: (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk, isStreaming: true }
                : m
            )
          );
        },
        onMetadata: (metadata) => {
          if (metadata.stage) detectedStage = metadata.stage;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, metadata: { ...m.metadata, ...metadata } } : m
            )
          );
          // Only update the mode dropdown if user is NOT in auto mode
          if (metadata.mode && mode !== 'auto') setMode(metadata.mode as Mode);
        },
        onSources: (sources) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, sources: sources.map((s) => ({ title: s.title, url: s.url, provider: 'Web Search', confidence: s.score })) }
                : m
            )
          );
        },
        onNextSteps: (steps) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, metadata: { ...m.metadata, next_steps: steps } }
                : m
            )
          );
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, isStreaming: false } : m))
          );
          setLoading(false);
        },
        onError: (err) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: `Something went wrong: ${err.message}`, isStreaming: false }
                : m
            )
          );
          setLoading(false);
        },
      });

      // Update project stage in local state after successful response
      if (detectedStage && activeProjectId) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === activeProjectId
              ? { ...p, stage: detectedStage as Stage, updated_at: new Date().toISOString() }
              : p
          )
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Failed to get a response. Please try again.', isStreaming: false }
            : m
        )
      );
      setLoading(false);
    }
  }, [input, activeProjectId, loading, messages, mode]);

  const handleNextStep = useCallback(
    (step: string) => {
      handleSend(step);
    },
    [handleSend]
  );

  const handlePromptClick = useCallback(
    (prompt: string) => {
      handleSend(prompt);
    },
    [handleSend]
  );

  const getStages = (): { id: string; label: string; active: boolean; completed: boolean }[] => {
    const activeIndex = ALL_STAGES.findIndex((s) => s.id === activeProject?.stage) ?? 0;
    return ALL_STAGES.map((s, i) => ({
      id: s.id,
      label: s.label,
      active: s.id === activeProject?.stage || (i === 0 && !activeProject?.stage),
      completed: i < activeIndex,
    }));
  };

  // ---- View Routing ----

  if (view === 'landing') {
    return (
      <LandingPage
        onLogin={() => setView('login')}
        onRegister={() => setView('register')}
      />
    );
  }

  if (view === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onNavigateToRegister={() => { setAuthError(null); setView('register'); }}
        onNavigateToHome={() => { setAuthError(null); setView('landing'); }}
        error={authError}
      />
    );
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onNavigateToLogin={() => { setAuthError(null); setView('login'); }}
        onNavigateToHome={() => { setAuthError(null); setView('landing'); }}
        error={authError}
      />
    );
  }

  // ---- App View ----

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[var(--bg)] text-[var(--foreground)]">
      {/* Left Sidebar */}
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        onCreateProject={() => setShowProjectModal(true)}
        onRenameProject={handleRenameProject}
        onDeleteProject={handleDeleteProject}
        userEmail={user?.email || null}
        onSignOut={handleSignOut}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-14 flex-shrink-0 border-b border-[var(--border)] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {activeProject ? (
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{activeProject.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-wider font-semibold">
                  {activeProject.stage || 'Discovery'}
                </span>
              </div>
            ) : (
              <span className="text-sm text-[var(--foreground-subtle)]">Select a project to start</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--foreground-muted)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.97]"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mode selector */}
            <div className="relative" ref={modeDropdownRef}>
              <button
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] text-sm transition-all cursor-pointer"
              >
                {(() => {
                  const m = MODES.find((x) => x.id === mode) || MODES[0];
                  const Icon = m.icon;
                  return (
                    <>
                      <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                      <span className="text-[var(--foreground-muted)]">{m.label}</span>
                    </>
                  );
                })()}
                <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
              </button>

              {showModeDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-lg)] py-1 z-50">
                  {MODES.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMode(m.id);
                          setShowModeDropdown(false);
                        }}
                        className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors cursor-pointer ${
                          mode === m.id
                            ? 'bg-[var(--primary)]/10 text-[var(--foreground)]'
                            : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${m.color}`} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stage tracker */}
        {activeProject && (
          <div className="px-6 py-2 border-b border-[var(--border)] flex-shrink-0 overflow-x-auto">
            <StageTracker stages={getStages()} />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState onPromptClick={handlePromptClick} />
          ) : (
            <div className="max-w-3xl mx-auto py-6 space-y-1">
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} onNextStep={handleNextStep} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 border-t border-[var(--border)] px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-4 py-3 focus-within:border-[var(--primary)]/30 focus-within:ring-1 focus-within:ring-[var(--primary)]/10 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={activeProject ? 'Ask your co-founder anything...' : 'Create a project first'}
                rows={1}
                disabled={!activeProject || loading}
                className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] text-sm resize-none outline-none min-h-[20px] max-h-[120px] py-1"
                style={{ fieldSizing: 'content' } as any}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || !activeProject || loading}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--on-primary)] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.02] active:scale-[0.97]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[11px] text-[var(--foreground-subtle)]">
                AI can make mistakes. Always verify critical information.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Project Modal */}
      <ProjectModal
        open={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}
