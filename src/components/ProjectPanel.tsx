import type { Project } from '../types';
import { TrendingUp, DollarSign, Target, Users, Calendar } from 'lucide-react';

interface ProjectPanelProps {
  project: Project | undefined;
}

export default function ProjectPanel({ project }: ProjectPanelProps) {
  if (!project) {
    return (
      <aside className="w-80 flex-shrink-0 border-l border-border bg-surface p-5 hidden xl:flex flex-col">
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-foreground-subtle" />
            </div>
            <p className="text-sm text-foreground-muted">Select a project to see its live evaluation canvas.</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 flex-shrink-0 border-l border-border bg-surface p-5 hidden xl:flex flex-col overflow-y-auto">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-foreground">Live Evaluation Canvas</h2>
        <p className="text-xs text-foreground-subtle mt-0.5">Highlights from your co-founder session</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-border bg-surface-elevated">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Stage</span>
          </div>
          <p className="text-sm font-medium text-foreground capitalize">{project.stage}</p>
          <p className="text-xs text-foreground-subtle mt-1">
            Current focus area for your venture.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-elevated">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Financial Model</span>
          </div>
          <p className="text-sm text-foreground-muted">No projections yet.</p>
          <p className="text-xs text-foreground-subtle mt-1">Ask your co-founder about unit economics, pricing, or runway.</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-elevated">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Target Market</span>
          </div>
          <p className="text-sm text-foreground-muted">No persona defined yet.</p>
          <p className="text-xs text-foreground-subtle mt-1">Run market research to build an ICP.</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-elevated">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Action Items</span>
          </div>
          <ul className="text-sm text-foreground-muted space-y-1">
            <li>Start your first conversation</li>
            <li>Define the problem statement</li>
            <li>Identify your ideal customer</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
