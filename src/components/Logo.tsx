import { cn } from '../lib/utils';

export function Logo({ className, iconOnly = false, dark = false }: { className?: string; iconOnly?: boolean; dark?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden',
        dark
          ? 'bg-white'
          : 'bg-gradient-to-br from-primary to-accent'
      )}>
        <span className={cn(
          'font-bold text-sm leading-none',
          dark ? 'text-background' : 'text-white'
        )}>
          F
        </span>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
      </div>
      {!iconOnly && (
        <span className={cn(
          'font-semibold text-[15px] tracking-tight',
          dark ? 'text-white' : 'text-foreground'
        )}>
          FounderOS
        </span>
      )}
    </div>
  );
}
