import { Sparkles, Lightbulb, Search, DollarSign, Target } from 'lucide-react';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTIONS = [
  {
    icon: Lightbulb,
    label: 'I have a startup idea',
    prompt: "I have an idea for a startup but I'm not sure where to start. Can you help me think through it?",
  },
  {
    icon: Search,
    label: 'I want to explore a market',
    prompt: "I'm interested in the AI tools market. Can you help me understand the landscape and find opportunities?",
  },
  {
    icon: DollarSign,
    label: 'I need financial help',
    prompt: "I'm building a SaaS product and need help figuring out pricing and financial projections.",
  },
  {
    icon: Target,
    label: 'I need a go-to-market plan',
    prompt: "I have a product nearly ready and need a go-to-market strategy. How should I launch?",
  },
];

export default function EmptyState({ onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-2xl mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>

      <h1 className="text-2xl font-bold mb-2 text-foreground">
        Your AI Co-Founder
      </h1>
      <p className="text-foreground-muted mb-8 max-w-md">
        Just start chatting — I'll automatically adapt and bring in the right expertise as we go. No need to pick a mode.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {SUGGESTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() => onPromptClick(s.prompt)}
              className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surface-hover transition-all duration-200 text-left cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                <Icon className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors duration-200" />
              </div>
              <div>
                <div className="text-sm font-medium mb-0.5">{s.label}</div>
                <div className="text-xs text-foreground-muted line-clamp-2">
                  {s.prompt}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
