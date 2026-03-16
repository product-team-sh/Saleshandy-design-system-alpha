export interface Context {
  id: string;
  name: string;
  accentColor: string;
  accentHover: string;
  accentPressed: string;
  logoUrl?: string;
  description?: string;
  createdAt?: string;
  memberCount?: number;
  campaignCount?: number;
  prospectCount?: number;
}

export type Workspace = Context;
