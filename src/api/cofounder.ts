import { supabase } from '../lib/supabase';
import type { ChatMessage, ComposedEmail } from '../types';

const EDGE_FUNCTION_URL = 'https://tewfnsbvfjrarodqgwnm.supabase.co/functions/v1/ai-cofounder';

export interface StreamAIResponseOptions {
  projectId: string;
  messages: ChatMessage[];
  mode: string;
  onChunk: (text: string) => void;
  onMetadata?: (metadata: { mode?: string; stage?: string }) => void;
  onSources?: (sources: { title: string; url: string; score: number }[]) => void;
  onEmail?: (email: ComposedEmail) => void;
  onNextSteps?: (steps: string[]) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
}

export async function streamAIResponse(options: StreamAIResponseOptions): Promise<void> {
  const { projectId, messages, mode, onChunk, onMetadata, onSources, onEmail, onNextSteps, onDone, onError } = options;

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

  const userMessage = messages[messages.length - 1];
  const history = messages.slice(0, -1).map((m) => ({ role: m.role, content: m.content }));

  const response = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      message: userMessage?.content || '',
      mode,
      project_id: projectId,
      history,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const parsed = JSON.parse(errorText);
      throw new Error(parsed.error || `Server error (${response.status})`);
    } catch {
      throw new Error(errorText || `Server error (${response.status})`);
    }
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response stream');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const chunk = trimmed.slice(6);
        if (!chunk || chunk === '[DONE]') continue;
        try {
          const parsed = JSON.parse(chunk);
          if (parsed.type === 'meta') {
            onMetadata?.({
              mode: parsed.mode,
              stage: parsed.stage,
            });
          } else if (parsed.type === 'sources') {
            onSources?.(parsed.sources || []);
          } else if (parsed.type === 'email') {
            onEmail?.(parsed.email);
          } else if (parsed.type === 'token') {
            onChunk(parsed.text);
          } else if (parsed.type === 'end') {
            onNextSteps?.(parsed.next_steps || []);
            onDone?.();
          }
        } catch {
          // Not valid JSON — skip
        }
      }
    }

    // Process remaining buffer
    if (buffer.startsWith('data: ')) {
      const chunk = buffer.slice(6).trim();
      if (chunk && chunk !== '[DONE]') {
        try {
          const parsed = JSON.parse(chunk);
          if (parsed.type === 'end') {
            onNextSteps?.(parsed.next_steps || []);
            onDone?.();
          }
        } catch {
          // Not valid JSON — skip
        }
      }
    }

    onDone?.();
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    onError?.(error);
    throw error;
  }
}
