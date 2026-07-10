import { useState, useRef, useEffect } from 'react';
import { Plus, LayoutDashboard, ScrollText, Settings, Folder, MoreVertical, Pencil, Trash2, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import type { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onCreateProject: () => void;
  onRenameProject: (id: string, name: string) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  userEmail: string | null;
  onSignOut: () => void;
}

export default function Sidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  userEmail,
  onSignOut,
}: SidebarProps) {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const renameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (renamingId) {
      setTimeout(() => {
        renameRef.current?.focus();
        renameRef.current?.select();
      }, 50);
    }
  }, [renamingId]);

  const startRename = (project: Project) => {
    setRenamingId(project.id);
    setRenameValue(project.name);
    setMenuOpenId(null);
  };

  const confirmRename = async () => {
    if (renamingId && renameValue.trim()) {
      await onRenameProject(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete "${name}" and all its conversations? This cannot be undone.`)) {
      await onDeleteProject(id);
    }
    setMenuOpenId(null);
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-surface flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 flex-shrink-0 border-b border-border-light">
        <Logo />
        <span className="px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-[10px] font-semibold text-foreground-muted uppercase tracking-wider">
          Beta
        </span>
      </div>

      {/* Workspace nav */}
      <nav className="px-3 py-4 flex-shrink-0" aria-label="Workspace">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle px-3 mb-2">
          Workspace
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-primary text-on-primary text-sm font-medium transition-colors cursor-pointer">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover text-sm font-medium transition-colors cursor-pointer mt-0.5">
          <ScrollText className="w-4 h-4" />
          Execution Logs
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover text-sm font-medium transition-colors cursor-pointer mt-0.5">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </nav>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle">
            Projects
          </span>
          <button
            onClick={onCreateProject}
            className="p-1 rounded-md hover:bg-surface-hover text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Create new project"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {projects.length === 0 && (
          <p className="text-xs text-foreground-subtle px-3 py-2">
            No projects yet. Start one!
          </p>
        )}

        {projects.map((p) => (
          <div
            key={p.id}
            className={`relative group flex items-center rounded-lg transition-all duration-200 ${
              p.id === activeProjectId
                ? 'bg-primary text-on-primary'
                : 'text-foreground-muted hover:text-foreground hover:bg-surface-hover'
            }`}
          >
            {renamingId === p.id ? (
              <input
                ref={renameRef}
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={confirmRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmRename();
                  if (e.key === 'Escape') setRenamingId(null);
                }}
                className="flex-1 mx-1 px-2 py-1.5 rounded-md border border-primary/30 bg-surface text-sm text-foreground outline-none"
              />
            ) : (
              <button
                onClick={() => onSelectProject(p.id)}
                className="flex items-center gap-3 w-full px-3 py-2 text-left cursor-pointer"
              >
                <Folder className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate flex-1">{p.name}</span>
              </button>
            )}

            {renamingId !== p.id && (
              <div className="relative flex-shrink-0 opacity-0 group-hover:opacity-100" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenId(menuOpenId === p.id ? null : p.id);
                  }}
                  className={`p-1.5 rounded hover:bg-surface-hover transition-colors cursor-pointer ${
                    p.id === activeProjectId ? 'hover:bg-on-primary/10' : ''
                  }`}
                  aria-label="Project options"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
                {menuOpenId === p.id && (
                  <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-border bg-surface shadow-lg py-1 z-50">
                    <button
                      onClick={() => startRename(p)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" /> Rename
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User footer */}
      <div className="flex-shrink-0 border-t border-border-light p-3 relative" ref={userMenuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-medium flex-shrink-0">
            {userEmail ? userEmail[0].toUpperCase() : '?'}
          </div>
          <div className="flex-1 text-left overflow-hidden">
            <div className="text-sm font-medium truncate text-foreground">{userEmail?.split('@')[0] || 'User'}</div>
            <div className="text-xs text-foreground-subtle truncate">{userEmail}</div>
          </div>
        </button>
        {showUserMenu && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-lg border border-border bg-surface shadow-lg py-1 z-50">
            <button
              onClick={() => {
                setShowUserMenu(false);
                onSignOut();
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
