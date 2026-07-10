import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface RichMessageProps {
  content: string;
  isStreaming?: boolean;
}

// Custom markdown components for premium dark rendering
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-[18px] font-semibold text-foreground tracking-tight mt-5 mb-3 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[15px] font-semibold text-foreground tracking-tight mt-4 mb-2.5 flex items-center gap-2">
      <div className="w-1 h-4 rounded-full bg-gradient-to-b from-primary to-accent" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[13px] font-semibold text-foreground-muted uppercase tracking-[0.08em] mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[14px] leading-[1.75] text-foreground-muted mb-3.5 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3.5 pl-5 space-y-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3.5 pl-5 space-y-1.5 list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-[14px] leading-[1.75] text-foreground-muted relative">
      <span className="absolute -left-4 text-primary text-[10px] mt-1.5">●</span>
      <span className="ml-0">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground-muted/80">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary pl-4 py-2 my-3 bg-surface-elevated rounded-r-lg pr-3">
      <div className="text-[14px] leading-[1.7] text-foreground-muted/90 italic">
        {children}
      </div>
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="text-[13px] px-1.5 py-0.5 rounded-md bg-surface-elevated text-accent-cyan font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className="text-[13px] font-mono block whitespace-pre overflow-x-auto">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface-elevated border border-border rounded-xl p-3.5 my-3 overflow-x-auto">
      {children}
    </pre>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary-hover transition-colors underline underline-offset-2 decoration-primary/40"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-border my-4" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-3 rounded-xl border border-border">
      <table className="w-full text-[13px] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-elevated">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-border last:border-b-0 hover:bg-surface-hover/50 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2.5 text-foreground-muted leading-relaxed">
      {children}
    </td>
  ),
};

export function RichMessage({ content, isStreaming }: RichMessageProps) {
  return (
    <div className={isStreaming ? 'streaming-cursor' : ''}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
