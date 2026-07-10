export interface Project {
  id: string;
  name: string;
  description: string;
  stage: Stage;
  stage_data: Record<string, unknown>;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export type Stage = 'discovery' | 'planner' | 'market_research' | 'manufacturer' | 'finance' | 'strategy' | 'branding' | 'complete';

export type Mode = 'auto' | 'general' | 'discovery' | 'planner' | 'market_research' | 'manufacturer' | 'finance' | 'branding' | 'strategy';

export interface AppStage {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

export interface Conversation {
  id: number;
  project_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  mode: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  mode?: string;
  metadata?: Record<string, unknown>;
  isStreaming?: boolean;
  sources?: SourceData[];
}

// Rich content structures for AI message rendering
export interface MetricData {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableRow {
  [key: string]: string | number | boolean;
}

export interface TimelineItem {
  week: string;
  milestone: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface SourceData {
  title: string;
  url: string;
  provider: string;
  confidence: number;
  retrievedAt?: string;
}

export interface RecommendationData {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
}

export const STAGES: { id: Stage; label: string; icon: string; description: string }[] = [
  { id: 'discovery', label: 'Discovery', icon: 'Lightbulb', description: 'Refine your idea' },
  { id: 'planner', label: 'Planning', icon: 'ScrollText', description: 'Build roadmap & milestones' },
  { id: 'market_research', label: 'Research', icon: 'Search', description: 'Market intelligence' },
  { id: 'manufacturer', label: 'Manufacturer', icon: 'Bot', description: 'Supply chain & logistics' },
  { id: 'finance', label: 'Finance', icon: 'DollarSign', description: 'Financial modeling' },
  { id: 'branding', label: 'Branding', icon: 'Sparkles', description: 'Brand identity & positioning' },
  { id: 'strategy', label: 'Strategy', icon: 'Target', description: 'Go-to-market plan' },
  { id: 'complete', label: 'Complete', icon: 'CheckCircle', description: 'Ready to launch' },
];

export const STAGE_ORDER: Stage[] = ['discovery', 'planner', 'market_research', 'manufacturer', 'finance', 'branding', 'strategy', 'complete'];
