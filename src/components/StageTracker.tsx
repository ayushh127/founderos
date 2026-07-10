import React from 'react';
import { cn } from '../lib/utils';
import { Check, Sparkles, Circle } from 'lucide-react';

interface StageTrackerProps {
  stages: { id: string; label: string; active: boolean; completed: boolean }[];
  onStageClick?: (stageId: string) => void;
}

export function StageTracker({ stages, onStageClick }: StageTrackerProps) {
  if (!stages.length) return null;

  return (
    <div className="py-1">
      <div className="flex items-center gap-0.5">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onStageClick?.(stage.id)}
                className={cn(
                  'group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300',
                  'hover:bg-surface-hover/60',
                  stage.active && 'bg-surface-elevated shadow-sm',
                  stage.completed && 'hover:bg-surface-hover/40',
                  onStageClick && 'cursor-pointer'
                )}
              >
                {/* Status icon */}
                <div className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                  stage.completed
                    ? 'bg-gradient-to-br from-success to-success/70'
                    : stage.active
                      ? 'bg-gradient-to-br from-primary to-accent animate-pulse-subtle'
                      : 'bg-surface-elevated border border-border/60'
                )}>
                  {stage.completed ? (
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  ) : stage.active ? (
                    <Sparkles className="w-3 h-3 text-white" strokeWidth={2.5} />
                  ) : (
                    <Circle className="w-2 h-2 text-foreground-subtle/50" strokeWidth={2} />
                  )}
                </div>

                {/* Label */}
                <span className={cn(
                  'text-[11px] font-medium transition-colors duration-300 whitespace-nowrap',
                  stage.active
                    ? 'text-foreground'
                    : stage.completed
                      ? 'text-foreground-muted/70'
                      : 'text-foreground-subtle/50'
                )}>
                  {stage.label}
                </span>

                {/* Active glow */}
                {stage.active && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 pointer-events-none" />
                )}
              </button>

              {/* Connector line */}
              {!isLast && (
                <div className="w-4 h-px flex-shrink-0 relative overflow-hidden">
                  <div className={cn(
                    'absolute inset-0 transition-all duration-500',
                    stage.completed ? 'bg-gradient-to-r from-success/60 to-primary/40' : 'bg-border/40'
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
