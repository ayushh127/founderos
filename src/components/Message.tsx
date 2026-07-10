import { useState } from 'react';
import { Bot, User, Copy, Check, ArrowRight, Globe, ExternalLink } from 'lucide-react';
import { RichMessage } from './RichMessage';
import EmailCard from './EmailCard';
import type { ChatMessage, ComposedEmail } from '../types';

interface MessageProps {
  message: ChatMessage;
  onNextStep?: (step: string) => void;
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1 rounded hover:bg-surface-hover"
      aria-label={copied ? 'Copied' : 'Copy message'}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-foreground-muted" />}
    </button>
  );
}

export default function Message({ message, onNextStep }: MessageProps) {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming;

  return (
    <article
      className={`group flex gap-3 px-4 py-4 ${
        isUser ? 'bg-transparent' : 'bg-surface/50'
      } ${isStreaming ? 'animate-in' : ''}`}
      role="article"
      aria-label={`${isUser ? 'You' : 'AI Co-Founder'} said:`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-surface-elevated text-foreground-muted'
            : 'bg-accent/10 text-accent'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'Co-Founder'}
          </span>
          {message.metadata?.mode && message.metadata.mode !== 'general' && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent uppercase tracking-wide">
              {String(message.metadata.mode).replace('_', ' ')}
            </span>
          )}
          {isStreaming && (
            <span className="flex gap-0.5 ml-1">
              <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
        </div>

        <RichMessage content={message.content} isStreaming={isStreaming} />

        {!isUser && !isStreaming && message.content && (
          <div className="mt-2">
            <CopyButton content={message.content} />
          </div>
        )}

        {!isUser && !isStreaming && message.sources && message.sources.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Globe className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-[11px] font-medium text-foreground-muted uppercase tracking-wider">Sources</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {message.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/src flex items-start gap-2 px-3 py-2 rounded-lg border border-border bg-surface-elevated hover:border-accent-cyan/40 hover:bg-surface-hover/50 transition-all duration-200"
                >
                  <span className="text-[10px] font-mono text-foreground-subtle mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground-muted group-hover/src:text-foreground transition-colors truncate">
                      {src.title}
                    </p>
                    <p className="text-[11px] text-foreground-subtle truncate">
                      {src.url}
                    </p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-foreground-subtle group-hover/src:text-accent-cyan transition-colors flex-shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}

        {!isUser && !isStreaming && message.metadata?.email && (
          <EmailCard email={message.metadata.email as ComposedEmail} />
        )}

        {!isUser && !isStreaming && message.metadata?.next_steps && message.metadata.next_steps.length > 0 && onNextStep && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.metadata.next_steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => onNextStep(step)}
                className="group/btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-elevated text-xs text-foreground-muted hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                {step}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200" />
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
