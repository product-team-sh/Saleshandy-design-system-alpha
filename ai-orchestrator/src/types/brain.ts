export type KnowledgeCardType =
  | 'brand_voice'
  | 'help_docs'
  | 'case_studies'
  | 'winning_copy'
  | 'competitor_intel'
  | 'icp_profile'
  | 'objection_handling'
  | 'pricing'
  | 'product_info'
  | 'meeting_playbook'
  | 'industry_context';

export interface KnowledgeCard {
  id: string;
  type: KnowledgeCardType;
  title: string;
  description: string;
  emptyStateMessage: string;
  completeness: number;
  lastUpdatedAt: string | null;
  itemCount: number;
  isEmpty: boolean;
}

export interface BrainHealth {
  healthScore: number;
  lastTestedAt: string | null;
}
