import { Channel } from './campaign';

export type RightPanelView =
  | 'guided_start'
  | 'plan_review'
  | 'content_editor'
  | 'prospect_list'
  | 'live_dashboard'
  | 'sequence_timeline'
  | 'settings';

export interface PanelData {
  planId?: string;
  editingStepIndex?: number;
  activeChannel?: Channel;
  prospectSearchQuery?: string;
}
