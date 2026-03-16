import { useChatStore } from '@/stores/useChatStore';
import { randomDelay } from '@/mock/delays';
import { ChatMessageMetadata, MessageContentType } from '@/types/chat';

// ─── Response shape ────────────────────────────────────────────────────────────

type MockResponse = {
  contentType: MessageContentType;
  content: string;
  metadata?: ChatMessageMetadata;
};

// ─── Shared mock data ──────────────────────────────────────────────────────────

const MOCK_LEADS = [
  { name: 'Sarah Chen', company: 'Acme Corp', title: 'VP Operations', icpScore: 94, location: 'San Francisco, CA' },
  { name: 'James Patel', company: 'BuildCo', title: 'Director of Ops', icpScore: 91, location: 'New York, NY' },
  { name: 'Maria Lopez', company: 'ScaleUp Inc', title: 'VP Revenue', icpScore: 88, location: 'Austin, TX' },
  { name: 'Tom Wright', company: 'GrowthLabs', title: 'Head of Operations', icpScore: 86, location: 'Chicago, IL' },
  { name: 'Priya Kumar', company: 'DataFlow', title: 'VP of Sales', icpScore: 83, location: 'Boston, MA' },
  { name: 'Alex Morgan', company: 'TechStack', title: 'Operations Director', icpScore: 81, location: 'Seattle, WA' },
  { name: 'Chris Lee', company: 'Foundry AI', title: 'VP Business Ops', icpScore: 79, location: 'Denver, CO' },
  { name: 'Emma Davis', company: 'CloudBase', title: 'Director of Growth', icpScore: 78, location: 'Miami, FL' },
  { name: 'Ryan Kim', company: 'PipelinePro', title: 'VP Sales Ops', icpScore: 76, location: 'Atlanta, GA' },
  { name: 'Nina Park', company: 'SalesTech', title: 'Head of Revenue Ops', icpScore: 74, location: 'Los Angeles, CA' },
];

const MOCK_EMAIL_ACCOUNTS = [
  { email: 'hello@company.com', provider: 'gmail' as const, dailyLimit: 120, warmupStatus: 'off' as const, healthScore: 42, spfDkim: true, dmarc: false },
  { email: 'sales@company.com', provider: 'gmail' as const, dailyLimit: 50, warmupStatus: 'healthy' as const, healthScore: 91, spfDkim: true, dmarc: true },
  { email: 'outreach@company.com', provider: 'outlook' as const, dailyLimit: 80, warmupStatus: 'warming' as const, healthScore: 67, spfDkim: true, dmarc: true },
];

// ─── Phase handler type ────────────────────────────────────────────────────────

type PhaseEntry = { response: MockResponse; nextPhase: string };
type PhaseHandler = Record<string, PhaseEntry>;

// ─── Phase machine ─────────────────────────────────────────────────────────────

const PHASE_MACHINE: Record<string, PhaseHandler> = {

  // SCALE FLOW ─────────────────────────────────────────────────────────────────

  scale_start: {
    default: {
      response: {
        contentType: 'text',
        content: `That's a serious operation — and completely doable. Let me map this out properly so nothing breaks at volume.\n\nFor 1M prospects/month you need three things locked in sequence:\n1. **Infrastructure** — ~200 email accounts, ~40 domains, properly warmed\n2. **Sequence** — 4-5 unique emails per prospect, AI-personalized at scale\n3. **Leads** — sourced, verified, ICP-scored before any send\n\nLet's start at the top. Tell me about your company — what do you sell, and who buys it?`,
        metadata: {
          questionOptions: [
            'We sell SaaS to mid-market companies',
            'We sell services to enterprise',
            'We target SMB owners',
            'We sell to VPs and Directors',
          ],
        },
      },
      nextPhase: 'scale_icp_industry',
    },
  },

  scale_icp_industry: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Got it. Which job titles drive the buying decision at your target companies?`,
        metadata: {
          questionOptions: [
            'VP Sales / VP Revenue',
            'CEO / Founder',
            'Head of Operations / VP Ops',
            'Director of Growth / CMO',
          ],
        },
      },
      nextPhase: 'scale_icp_titles',
    },
  },

  scale_icp_titles: {
    default: {
      response: {
        contentType: 'icp_card',
        content: `Here's the ICP I've built from what you told me. This will drive lead sourcing, email personalization, and sequence strategy.\n\nConfirm or adjust before we go further:`,
        metadata: {
          icpTitle: 'VP / Director of Operations & Revenue',
          icpCompanyType: 'Mid-market B2B SaaS companies',
          icpIndustries: ['SaaS', 'Tech', 'FinTech', 'MarTech'],
          icpPainPoints: [
            'Manual outbound slowing growth',
            'Scaling without adding SDR headcount',
            'Inconsistent pipeline quality',
            'Low email deliverability',
          ],
          icpCompanySize: '50–500 employees',
          shLink: 'https://app.saleshandy.com/prospects',
          shLinkLabel: 'View Prospects',
        },
      },
      nextPhase: 'scale_icp_review',
    },
  },

  scale_icp_review: {
    adjust: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to adjust?`,
        metadata: {
          questionOptions: [
            'Different company size range',
            'Different industries',
            'Different job titles',
            'Add more pain points',
          ],
        },
      },
      nextPhase: 'scale_icp_titles',
    },
    default: {
      response: {
        contentType: 'email_accounts_health',
        content: `ICP locked. Now let me audit your email infrastructure.\n\nFor 1M/month you need 200 warmed accounts across 40 domains. Here's what you have today:`,
        metadata: {
          emailAccounts: MOCK_EMAIL_ACCOUNTS,
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'scale_infra_audit',
    },
  },

  scale_infra_audit: {
    default: {
      response: {
        contentType: 'text',
        content: `**Current capacity: ~170 emails/day — that's 5,100/month. You need 35,000/day.**\n\nHere's my provisioning plan:\n\n**40 new domains** (variations of your brand, .io / .co / .com)\n— Registered automatically, DNS configured in minutes\n\n**160 new mailboxes** (4 per domain)\n— Mix: Google Workspace 70% + Microsoft 365 30%\n— Naming: firstname@domain, outreach@domain\n\n**Warmup timeline**\n— Days 1–7: 5 emails/day per account\n— Days 8–14: Ramp to 25/day\n— Days 15–21: Full 50–60/day capacity\n— **First full-volume sends: Day 22**\n\nWhile new accounts warm, I'll run 30% capacity on your 3 existing accounts — pipeline from day one.\n\nApprove this infrastructure setup?`,
        metadata: {
          questionOptions: [
            'Approve — provision everything',
            'Start smaller — 20 domains first',
            'I already have domains to use',
          ],
          shLink: 'https://app.saleshandy.com/email-warmup',
          shLinkLabel: 'Warmup Dashboard',
        },
      },
      nextPhase: 'scale_infra_plan',
    },
  },

  scale_infra_plan: {
    smaller: {
      response: {
        contentType: 'text',
        content: `Smart. Starting with 20 domains keeps things clean and lets us validate deliverability before scaling.\n\n**Revised plan:** 20 domains → 80 mailboxes → ~16,000 sends/day at full warmup\n**Ready for full volume:** Day 22\n**Cost:** ~$240/month\n\nApprove revised setup?`,
        metadata: {
          questionOptions: ['Approve 20-domain setup', 'Go back to 40 domains'],
        },
      },
      nextPhase: 'scale_infra_approved',
    },
    default: {
      response: {
        contentType: 'status_update',
        content: `Infrastructure setup initiated.\n\n**Provisioning now:**\n- Registering 40 domains (ETA: 2 hours)\n- Creating 160 mailboxes\n- Configuring SPF, DKIM, DMARC for all domains automatically\n- Starting warmup protocol — Day 1\n\nTrack setup at [Email Accounts](https://app.saleshandy.com/settings/email-accounts) when each batch is ready.\n\nWhile that runs in the background — let's build your sequence. What's the primary goal for this outreach?`,
        metadata: {
          questionOptions: [
            'Book meetings',
            'Get a reply / start a conversation',
            'Drive to a demo page',
            'Build awareness, then convert',
          ],
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Track provisioning',
        },
      },
      nextPhase: 'scale_infra_approved',
    },
  },

  scale_infra_approved: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Sequence goal locked.\n\nNow — what tone fits your brand? I'll use this to calibrate every email across all 1M touches.`,
        metadata: {
          questionOptions: [
            'Friendly & direct — peer-to-peer',
            'Professional — executive-grade',
            'Bold & confident — challenger sale',
            'Consultative — lead with insight',
          ],
        },
      },
      nextPhase: 'scale_tone_select',
    },
  },

  scale_tone_select: {
    default: {
      response: {
        contentType: 'brain_card',
        content: `Tone profile saved to your AI Brain. Every email will write in this voice — adapting per prospect based on their LinkedIn activity, company news, and role.\n\nLet me start drafting your sequence. Building 4 steps — each email with a different angle.\n\nHere's **Step 1 — the cold opener. Day 0:**`,
        metadata: {
          brainTopic: 'Brand voice & tone profile',
          brainHealthPercent: 28,
          brainKeyResult: 'Tone calibrated across 4 writing dimensions',
        },
      },
      nextPhase: 'scale_email_step1_show',
    },
  },

  scale_email_step1_show: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `**Step 1 — Day 0: Cold opener.** Leads with their scaling pain point. Ends with a soft meeting ask. Each prospect gets a unique version using 9 context layers.`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `scaling {{Company}} outbound without adding headcount`,
          emailBody: `Hi {{FirstName}},

Noticed {{Company}} has been growing fast — congrats on the recent expansion.

Most revenue leaders at your stage tell me the same thing: outbound is still largely manual, and adding more SDRs feels like the only way to scale. The economics rarely work out.

We built Outbound Octopus for exactly this — AI that handles the full outreach process end to end. You tell it who to reach, it handles everything else.

Would 15 minutes make sense this week to show you how it works for a company like {{Company}}?

Best,
{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Company growth signal', 'LinkedIn hiring data', 'Recent funding round', 'Brain: pain points'],
        },
      },
      nextPhase: 'scale_email_step1_review',
    },
  },

  scale_email_step1_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to change on Step 1?`,
        metadata: {
          questionOptions: [
            'Make it shorter — 3 sentences max',
            'Change the CTA — ask for a quick call instead',
            'More casual tone',
            'Lead with a different pain point',
          ],
        },
      },
      nextPhase: 'scale_email_step1_editing',
    },
    regenerate: {
      response: {
        contentType: 'email_preview',
        content: `Fresh take on Step 1 — different angle. This one leads with a competitor insight.`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `how competitors are running outbound at your scale`,
          emailBody: `Hi {{FirstName}},

Quick one — I noticed teams competing with {{Company}} are running fully AI-automated outbound. They're running 10x the volume with the same headcount.

Wanted to show you what that looks like in practice.

Worth a 15-min call this week?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Competitor signal', 'Industry benchmarks', 'Brain: competitive positioning'],
        },
      },
      nextPhase: 'scale_email_step1_review',
    },
    default: {
      response: {
        contentType: 'email_preview',
        content: `**Step 1 locked ✓**\n\nHere's **Step 2 — Day 3: Value proof follow-up.** Same prospect, different angle. Leads with a concrete result from a similar company.`,
        metadata: {
          emailStepNumber: 2,
          emailTotalSteps: 4,
          emailSubject: `re: scaling {{Company}} outbound`,
          emailBody: `Hi {{FirstName}},

Just following up on my note from Monday.

Thought you'd find this relevant: we helped a {{CompanySizeRange}} company in {{Industry}} go from 200 to 3,400 outbound touches per week — without adding a single SDR. They booked 34 meetings in the first 30 days.

Happy to show you what that looked like if you have 15 minutes.

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Similar company benchmark', 'Industry match', 'Brain: customer results'],
        },
      },
      nextPhase: 'scale_email_step2_review',
    },
  },

  scale_email_step1_editing: {
    shorter: {
      response: {
        contentType: 'email_preview',
        content: `Updated — tighter version of Step 1. Under 60 words.`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `scaling {{Company}} outbound`,
          emailBody: `Hi {{FirstName}},

Congrats on the growth at {{Company}}.

We help revenue teams run 10x the outbound without adding headcount. AI handles sourcing, writing, and sending — you just review replies.

Worth a 15-min look this week?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Company growth signal', 'Brain: pain points'],
        },
      },
      nextPhase: 'scale_email_step1_review',
    },
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated Step 1 — applied your feedback. How does this feel?`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `quick question for {{FirstName}}`,
          emailBody: `Hi {{FirstName}},

Saw {{Company}} has been scaling fast. Quick question — is your outbound keeping up with that growth?

Most teams I talk to at your stage are still running manual SDR processes. We've built something that changes that completely.

15 minutes to show you?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Growth signal', 'Brain: tone — direct & casual'],
        },
      },
      nextPhase: 'scale_email_step1_review',
    },
  },

  scale_email_step2_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to adjust on Step 2?`,
        metadata: {
          questionOptions: [
            'Use a different customer result',
            'Add more specific numbers',
            'Remove the follow-up reference',
            'More casual opening',
          ],
        },
      },
      nextPhase: 'scale_email_step2_editing',
    },
    regenerate: {
      response: {
        contentType: 'email_preview',
        content: `Fresh take on Step 2 — leads with a direct question instead of a result.`,
        metadata: {
          emailStepNumber: 2,
          emailTotalSteps: 4,
          emailSubject: `re: outbound at {{Company}}`,
          emailBody: `Hi {{FirstName}},

One question: if you could double your outbound volume tomorrow without hiring anyone, would you?

That's what we do for teams like {{Company}}. The AI handles sourcing, writing, and sending. You only deal with replies.

15 minutes?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Brain: challenge question format', 'Tone: bold'],
        },
      },
      nextPhase: 'scale_email_step2_review',
    },
    default: {
      response: {
        contentType: 'email_preview',
        content: `**Step 2 locked ✓**\n\nHere's **Step 3 — Day 6: Social proof nudge.** Pairs a case study from your Brain with a stat that shifts perspective.`,
        metadata: {
          emailStepNumber: 3,
          emailTotalSteps: 4,
          emailSubject: `how [CustomerName] scaled to 8,000 outbound touches/week`,
          emailBody: `Hi {{FirstName}},

Wanted to share something — we just published a case study on how a {{IndustryPeer}} company went from 300 to 8,000 outbound touches per week in 45 days.

The part that surprises people: their reply rate went *up* at scale — from 2.1% to 4.7% — because the AI personalizes every message.

Might be relevant for what you're building at {{Company}}. Happy to send it over.

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Brain: case study library', 'Industry peer match', 'Metric personalization'],
        },
      },
      nextPhase: 'scale_email_step3_review',
    },
  },

  scale_email_step2_editing: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated Step 2 with your feedback. How's this?`,
        metadata: {
          emailStepNumber: 2,
          emailTotalSteps: 4,
          emailSubject: `re: outbound at {{Company}}`,
          emailBody: `Hi {{FirstName}},

Following up quickly — wanted to share a concrete result.

A {{Industry}} company with {{CompanySize}} employees used Outbound Octopus to book **47 meetings in 30 days** from cold outreach. No new hires. Full AI automation.

Worth a quick look for {{Company}}?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Industry match', 'Company size match', 'Brain: specific metrics'],
        },
      },
      nextPhase: 'scale_email_step2_review',
    },
  },

  scale_email_step3_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to change on Step 3?`,
        metadata: {
          questionOptions: [
            'Make it shorter',
            'Lead with a different case study angle',
            'Change the subject line',
            'Add a direct CTA',
          ],
        },
      },
      nextPhase: 'scale_email_step3_editing',
    },
    default: {
      response: {
        contentType: 'email_preview',
        content: `**Step 3 locked ✓**\n\nFinal step — **Step 4 — Day 10: The breakup email.** Direct. Gives them an easy out. Converts 15–20% of non-responders.`,
        metadata: {
          emailStepNumber: 4,
          emailTotalSteps: 4,
          emailSubject: `closing the loop, {{FirstName}}`,
          emailBody: `Hi {{FirstName}},

I'll keep this short — I've reached out a few times and haven't heard back. No problem at all.

If outbound scale isn't a priority right now, I completely understand. I'll stop following up.

But if the timing ever changes, you know where to find me. Happy to pick this up whenever it makes sense for {{Company}}.

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Soft close', 'Brain: breakup tone', 'No pressure CTA'],
        },
      },
      nextPhase: 'scale_email_step4_review',
    },
  },

  scale_email_step3_editing: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated Step 3 — tightened and more direct.`,
        metadata: {
          emailStepNumber: 3,
          emailTotalSteps: 4,
          emailSubject: `one case study worth reading, {{FirstName}}`,
          emailBody: `Hi {{FirstName}},

Quick share: a case study on scaling outbound from 300 to 8,000 touches/week — might be useful for {{Company}}.

The key insight: reply rate went up, not down, at scale. Because every message is personalized by AI.

Happy to walk through the specifics.

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Brain: case study library', 'Industry peer'],
        },
      },
      nextPhase: 'scale_email_step3_review',
    },
  },

  scale_email_step4_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to change on the breakup email?`,
        metadata: {
          questionOptions: [
            'Make it shorter — 2 sentences',
            'Add one final value proposition',
            'More direct, less apologetic',
            'Change subject line',
          ],
        },
      },
      nextPhase: 'scale_email_step4_editing',
    },
    default: {
      response: {
        contentType: 'sequence_overview',
        content: `**All 4 steps locked ✓**\n\nHere's your complete sequence for the 1M outreach campaign. Each email is AI-personalized per prospect using 9 context layers from your Brain.`,
        metadata: {
          sequenceName: 'Scale Outbound Q1 — 1M',
          sequenceId: 'seq-1m-001',
          sequenceSteps: [
            { step: 1, channel: 'email', day: 0, subject: 'scaling {{Company}} outbound without adding headcount', description: 'Cold opener — pain-point lead, soft meeting ask', status: 'locked' },
            { step: 2, channel: 'email', day: 3, subject: 're: scaling {{Company}} outbound', description: 'Value proof — concrete customer result', status: 'locked' },
            { step: 3, channel: 'email', day: 6, subject: 'how [CustomerName] scaled to 8,000 outbound touches/week', description: 'Social proof — case study from Brain', status: 'locked' },
            { step: 4, channel: 'email', day: 10, subject: 'closing the loop, {{FirstName}}', description: 'Breakup email — direct, easy out, converts non-responders', status: 'locked' },
          ],
          shLink: 'https://app.saleshandy.com/sequences/seq-1m-001',
          shLinkLabel: 'Open Sequence in Saleshandy',
        },
      },
      nextPhase: 'scale_sequence_review',
    },
  },

  scale_email_step4_editing: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated breakup email — more direct, no apology.`,
        metadata: {
          emailStepNumber: 4,
          emailTotalSteps: 4,
          emailSubject: `last note, {{FirstName}}`,
          emailBody: `Hi {{FirstName}},

Last one from me.

If scaling outbound becomes a priority at {{Company}}, I'd love to show you what we've built.

If not — no worries at all.

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Brain: direct tone', 'Minimal CTA'],
        },
      },
      nextPhase: 'scale_email_step4_review',
    },
  },

  scale_sequence_review: {
    default: {
      response: {
        contentType: 'text',
        content: `Sequence saved. [Open in Saleshandy →](https://app.saleshandy.com/sequences/seq-1m-001)\n\nNow let's source your leads. Pulling from:\n- **LinkedIn Sales Navigator** — company filters + hiring signals\n- **Apollo.io** — verified emails + enrichment\n- **Saleshandy database** — ICP-scored, deduplicated\n\nFor your ICP (VP/Director Ops, 50–500 employee SaaS), I'm estimating **1.1–1.4M qualifying contacts** globally.\n\nRunning enrichment and ICP scoring...`,
        metadata: {
          questionOptions: ['Show me a sample', 'Add more filters first', 'Exclude certain companies'],
          shLink: 'https://app.saleshandy.com/sequences/seq-1m-001',
          shLinkLabel: 'View Sequence',
        },
      },
      nextPhase: 'scale_lead_sourcing',
    },
  },

  scale_lead_sourcing: {
    filter: {
      response: {
        contentType: 'clarifying_question',
        content: `What additional filters do you want to apply?`,
        metadata: {
          questionOptions: [
            'US & Canada only',
            'Exclude Fortune 500 companies',
            'Recently funded (last 12 months)',
            'Currently hiring for sales roles',
          ],
        },
      },
      nextPhase: 'scale_lead_filter',
    },
    exclude: {
      response: {
        contentType: 'clarifying_question',
        content: `Which companies or domains should I exclude?`,
        metadata: {
          questionOptions: [
            'Our existing customers',
            'Companies under 50 employees',
            'Specific competitors',
            'I\'ll type the exclusion list',
          ],
        },
      },
      nextPhase: 'scale_lead_filter',
    },
    default: {
      response: {
        contentType: 'lead_table',
        content: `Found **1,247,000 verified contacts** matching your ICP. ICP scores range from 74–99.\n\nHere's a sample of 10 from the top of the list:`,
        metadata: {
          leads: MOCK_LEADS,
          shLink: 'https://app.saleshandy.com/prospects?list=lst-1m-001',
          shLinkLabel: 'View all 1.24M prospects',
        },
      },
      nextPhase: 'scale_leads_review',
    },
  },

  scale_lead_filter: {
    default: {
      response: {
        contentType: 'lead_table',
        content: `Filtered list ready — **847,000 contacts** after applying your criteria. Higher average ICP score (84 vs 78 before filtering). Better list, tighter targeting.\n\nSample of top prospects:`,
        metadata: {
          leads: MOCK_LEADS.map(l => ({ ...l, icpScore: Math.min(99, l.icpScore + 6) })),
          shLink: 'https://app.saleshandy.com/prospects?list=lst-1m-filtered',
          shLinkLabel: 'View filtered list',
        },
      },
      nextPhase: 'scale_leads_review',
    },
  },

  scale_leads_review: {
    adjust: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to adjust about the lead list?`,
        metadata: {
          questionOptions: [
            'Different company size range',
            'Exclude a specific industry',
            'Higher ICP score threshold (80+)',
            'Add a geography filter',
          ],
        },
      },
      nextPhase: 'scale_lead_filter',
    },
    default: {
      response: {
        contentType: 'campaign_summary',
        content: `Everything is ready. Here's your full campaign overview before launch:`,
        metadata: {
          channel: 'Email — 4-step sequence, 10 days',
          estimatedVolume: '35,000/day at full warmup (Day 22)',
          emailAccountsCount: 163,
          shLink: 'https://app.saleshandy.com/campaigns',
          shLinkLabel: 'View in Campaigns',
        },
      },
      nextPhase: 'scale_final_review',
    },
  },

  scale_final_review: {
    default: {
      response: {
        contentType: 'status_update',
        content: `Campaign is live.\n\n**What's happening right now:**\n- Sourcing first batch of 200 prospects from your list\n- Validating emails (bounce protection active)\n- First sends scheduled for today at 9am in each prospect's local time\n\n**At full warmup (Day 22):**\n- 35,000 sends/day across 163 accounts\n- Expected: ~4,200 replies/day at 3% reply rate\n- Expected: ~840 meetings/month at 20% reply-to-meeting\n\nTrack everything live → [Campaign Dashboard](https://app.saleshandy.com/analytics/seq-1m-001)\n\nI'll notify you when the first replies come in. You handle hot leads — I handle everything else.`,
        metadata: {
          shLink: 'https://app.saleshandy.com/analytics/seq-1m-001',
          shLinkLabel: 'Campaign Dashboard',
        },
      },
      nextPhase: 'scale_launched',
    },
  },

  scale_launched: {
    default: {
      response: {
        contentType: 'text',
        content: `**Day 1 update:**\n\n- 200 sent · 142 opened (71%) · 8 replies\n- 2 positive replies — flagged for your review\n- 1 unsubscribe · 0 bounces · 0 spam flags\n- Top opener: Step 1 subject — 78% open rate\n\nAll replies waiting in your [Inbox →](https://app.saleshandy.com/conversations)\n\nWarmup on track — accounts ramp to 50/day by Day 7.`,
        metadata: {
          shLink: 'https://app.saleshandy.com/conversations',
          shLinkLabel: 'View Replies',
        },
      },
      nextPhase: 'scale_monitoring',
    },
  },

  scale_monitoring: {
    default: {
      response: {
        contentType: 'text',
        content: `**Week 1 summary:**\n\n- 1,400 sent · 67% avg open rate · 3.1% reply rate\n- **43 positive replies** · 12 meetings booked\n- 1 account flagged: \`hello@company.com\` hitting 8% bounce on 1 domain — paused and rerouted automatically\n- Warmup on track — all 40 new domains passing SPF/DKIM checks\n\n**Best performing:**\nStep 1 → 71% open · Step 3 → 4.7% reply rate (social proof working)\n\n**Recommendation:** Duplicate Step 3's angle into Step 2 for the next batch.\n\nWant me to A/B test it?\n\n[Full analytics →](https://app.saleshandy.com/analytics/seq-1m-001)`,
        metadata: {
          questionOptions: [
            'Yes — run the A/B test',
            'Show me the positive replies',
            'Expand to 500 new prospects/day',
            'Pause the campaign temporarily',
          ],
          shLink: 'https://app.saleshandy.com/analytics/seq-1m-001',
          shLinkLabel: 'View Analytics',
        },
      },
      nextPhase: 'generic_monitoring',
    },
  },

  // FIND LEADS FLOW ────────────────────────────────────────────────────────────

  leads_start: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Let's find your ideal leads end-to-end — I'll source, score, and load them into a sequence ready to send.\n\nFirst: what do you sell, and who's your ideal customer?`,
        metadata: {
          questionOptions: [
            'We sell SaaS to mid-market companies',
            'We sell services to enterprise',
            'We target SMB owners',
            'Let me describe it myself',
          ],
        },
      },
      nextPhase: 'leads_icp_industry',
    },
  },

  leads_icp_industry: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Got it. Which titles have budget authority and make the final call?`,
        metadata: {
          questionOptions: [
            'VP Sales / VP Revenue',
            'CEO / Founder / Co-founder',
            'Head of Operations / Director of Ops',
            'CMO / Head of Growth',
          ],
        },
      },
      nextPhase: 'leads_icp_titles',
    },
  },

  leads_icp_titles: {
    default: {
      response: {
        contentType: 'icp_card',
        content: `Here's your ICP — built from what you told me. I'll use this to source and score leads.\n\nConfirm this before I start sourcing:`,
        metadata: {
          icpTitle: 'VP / Head of Sales & Revenue',
          icpCompanyType: 'B2B SaaS companies',
          icpIndustries: ['SaaS', 'Tech', 'FinTech'],
          icpPainPoints: ['Low pipeline coverage', 'Manual prospecting', 'Slow revenue growth'],
          icpCompanySize: '50–500 employees',
          shLink: 'https://app.saleshandy.com/prospects',
          shLinkLabel: 'Prospects',
        },
      },
      nextPhase: 'leads_icp_review',
    },
  },

  leads_icp_review: {
    adjust: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to adjust?`,
        metadata: {
          questionOptions: ['Different company size', 'Different industry', 'Different job titles', 'Add pain points'],
        },
      },
      nextPhase: 'leads_icp_titles',
    },
    default: {
      response: {
        contentType: 'text',
        content: `ICP confirmed. Sourcing now from LinkedIn, Apollo, and our verified database.\n\nApplying:\n- **Email verification** — removing unverifiable addresses before they bounce\n- **ICP scoring** — each lead gets a 0–100 match score\n- **Deduplication** — no one contacted twice\n- **Enrichment** — LinkedIn URL, company size, recent news, hiring signals\n\nGive me a moment...`,
        metadata: {
          questionOptions: ['Show results as they come in', 'I can wait for the full batch'],
          shLink: 'https://app.saleshandy.com/prospects',
          shLinkLabel: 'View Prospects',
        },
      },
      nextPhase: 'leads_sourcing',
    },
  },

  leads_sourcing: {
    default: {
      response: {
        contentType: 'lead_table',
        content: `Found **3,847 verified prospects** matching your ICP. Average ICP score: 82/100.\n\nHere are the top 10. Full list ready in Saleshandy:`,
        metadata: {
          leads: MOCK_LEADS,
          shLink: 'https://app.saleshandy.com/prospects?list=lst-abc123',
          shLinkLabel: 'View all 3,847 prospects',
        },
      },
      nextPhase: 'leads_preview_review',
    },
  },

  leads_preview_review: {
    adjust: {
      response: {
        contentType: 'clarifying_question',
        content: `What filters would you like to apply?`,
        metadata: {
          questionOptions: [
            'Only US-based companies',
            'ICP score 80+ only',
            'Recently funded companies only',
            'Hiring for sales roles right now',
          ],
        },
      },
      nextPhase: 'leads_sourcing',
    },
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Leads confirmed. Now let's build a sequence for them.\n\nWhat's the goal of this outreach?`,
        metadata: {
          questionOptions: [
            'Book a discovery call',
            'Get a reply and start a conversation',
            'Drive to a free trial signup',
            'Invite to a webinar or event',
          ],
        },
      },
      nextPhase: 'leads_sequence_goal',
    },
  },

  leads_sequence_goal: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Building your sequence. Here's **Step 1 — the cold opener:**`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 3,
          emailSubject: `{{Company}} + Outbound Octopus`,
          emailBody: `Hi {{FirstName}},

Came across {{Company}} while looking at fast-growing SaaS teams in {{Industry}}.

Most VP-level folks I talk to at your stage say pipeline coverage is their biggest headache — keeping it full without burning out the team.

We fix that with AI-powered outbound. Happy to show you a 15-min demo and let the results speak for themselves.

Worth a quick look?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Industry signal', 'Company growth', 'Brain: pain points'],
        },
      },
      nextPhase: 'leads_email1_review',
    },
  },

  leads_email1_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to change?`,
        metadata: {
          questionOptions: [
            'Make it shorter',
            'More specific to their industry',
            'Different CTA',
            'Start with a question',
          ],
        },
      },
      nextPhase: 'leads_email1_editing',
    },
    default: {
      response: {
        contentType: 'sequence_overview',
        content: `All steps drafted and ready. Here's your complete 3-step sequence:`,
        metadata: {
          sequenceName: 'ICP Outreach — Q1',
          sequenceId: 'seq-leads-001',
          sequenceSteps: [
            { step: 1, channel: 'email', day: 0, subject: '{{Company}} + Outbound Octopus', description: 'Cold opener — growth signal + pain point', status: 'locked' },
            { step: 2, channel: 'email', day: 4, subject: 're: outbound at {{Company}}', description: 'Value proof — customer result relevant to their stage', status: 'locked' },
            { step: 3, channel: 'email', day: 9, subject: 'last note, {{FirstName}}', description: 'Breakup — soft close, easy opt-out', status: 'locked' },
          ],
          shLink: 'https://app.saleshandy.com/sequences/seq-leads-001',
          shLinkLabel: 'Open Sequence',
        },
      },
      nextPhase: 'leads_sequence_review',
    },
  },

  leads_email1_editing: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated Step 1 — applied your feedback. Opens with a question:`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 3,
          emailSubject: `quick question, {{FirstName}}`,
          emailBody: `Hi {{FirstName}},

How is {{Company}}'s outbound performing right now?

I ask because most revenue leaders in {{Industry}} are hitting the same wall — too manual, too slow, not enough pipeline.

We've built an AI that fixes it end-to-end. Worth 15 minutes?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'Sarah Chen <sarah@acme.com>',
          personalizationHighlights: ['Industry match', 'Brain: pain points'],
        },
      },
      nextPhase: 'leads_email1_review',
    },
  },

  leads_sequence_review: {
    default: {
      response: {
        contentType: 'status_update',
        content: `Campaign launched with 3,847 prospects loaded.\n\nFirst sends going out now at each prospect's optimal send time.\n\n[Track opens, replies, meetings →](https://app.saleshandy.com/sequences/seq-leads-001)\n[Full prospect list →](https://app.saleshandy.com/prospects?list=lst-abc123)`,
        metadata: {
          shLink: 'https://app.saleshandy.com/sequences/seq-leads-001',
          shLinkLabel: 'View Live Campaign',
        },
      },
      nextPhase: 'generic_monitoring',
    },
  },

  // INFRA FLOW ─────────────────────────────────────────────────────────────────

  infra_start: {
    default: {
      response: {
        contentType: 'email_accounts_health',
        content: `Let me first audit what you have. Here are your currently connected accounts:`,
        metadata: {
          emailAccounts: MOCK_EMAIL_ACCOUNTS,
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'infra_audit_review',
    },
  },

  infra_audit_review: {
    default: {
      response: {
        contentType: 'text',
        content: `**Issues found:**\n\n1. \`hello@company.com\` — warmup is **OFF**. Daily limit of 120 is way too high for an un-warmed account. Fix: reduce to 20/day, enable warmup immediately.\n\n2. \`outreach@company.com\` — warming but **DMARC is missing**. Outlook servers will start soft-rejecting in ~2 weeks. Fix: add DMARC record to DNS today.\n\n3. \`sales@company.com\` — **healthy**. No changes needed.\n\nShould I apply all fixes automatically?`,
        metadata: {
          questionOptions: [
            'Apply all fixes',
            'Show me the DNS records first',
            'Add more email accounts',
            'Apply fixes one at a time',
          ],
          shLink: 'https://app.saleshandy.com/email-warmup',
          shLinkLabel: 'Warmup Settings',
        },
      },
      nextPhase: 'infra_fix_review',
    },
  },

  infra_fix_review: {
    dns: {
      response: {
        contentType: 'text',
        content: `Here's the exact DMARC record for \`outreach@company.com\`:\n\n**Add to your domain's DNS:**\n\`\`\`\nType: TXT\nName: _dmarc\nValue: v=DMARC1; p=quarantine; rua=mailto:dmarc@company.com; pct=100\n\`\`\`\n\nDMARC verification passes in 24–48 hours after adding. Want me to apply the warmup fixes now while you update DNS?`,
        metadata: {
          questionOptions: ['Apply warmup fixes now', "I'll update DNS first, then apply"],
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'infra_fix_review',
    },
    add: {
      response: {
        contentType: 'clarifying_question',
        content: `To add more accounts, how do you want to set them up?`,
        metadata: {
          questionOptions: [
            'Connect existing Gmail accounts',
            'Connect existing Outlook accounts',
            'Buy new domains — full managed setup',
            'Import SMTP credentials manually',
          ],
        },
      },
      nextPhase: 'infra_add_accounts',
    },
    default: {
      response: {
        contentType: 'status_update',
        content: `All fixes applied:\n\n✓ \`hello@company.com\` — daily limit → 20, warmup enabled (ramps to 50/day over 14 days)\n✓ \`outreach@company.com\` — DMARC instructions sent · warmup continuing\n✓ \`sales@company.com\` — no changes, already healthy\n\n**Combined healthy capacity:** ~120/day now → 170/day in 14 days\n\n[View updated accounts →](https://app.saleshandy.com/settings/email-accounts)\n\nWant me to add more accounts to increase capacity?`,
        metadata: {
          questionOptions: ['Yes — add more accounts', 'No — this is enough', 'Show me warmup progress'],
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'infra_complete',
    },
  },

  infra_add_accounts: {
    default: {
      response: {
        contentType: 'text',
        content: `Setting up managed email infrastructure:\n\n**Step 1:** Register 5 new domains (brand variations)\n**Step 2:** Create 3 mailboxes per domain (15 total)\n**Step 3:** Configure SPF, DKIM, DMARC automatically\n**Step 4:** Start warmup — 5/day → 50/day over 14 days\n\n**Additional capacity:** +750 emails/day at full warmup\n**Estimated cost:** ~$85/month\n\nApprove?`,
        metadata: {
          questionOptions: ['Approve — start setup', 'Adjust domain count', 'I\'ll supply my own domains'],
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'infra_complete',
    },
  },

  infra_complete: {
    default: {
      response: {
        contentType: 'text',
        content: `Your email infrastructure is in great shape:\n\n- **3 accounts** running · **15 being provisioned**\n- **Combined capacity:** 170/day now → 920/day in 14 days\n- **Deliverability:** SPF ✓ DKIM ✓ DMARC ✓ on all healthy accounts\n- **Warmup:** Active on all accounts\n\n[Monitor warmup progress →](https://app.saleshandy.com/email-warmup)\n\nReady to run a campaign on these accounts?`,
        metadata: {
          questionOptions: ['Yes — start a campaign', 'Not yet — just monitoring', 'Check warmup progress first'],
          shLink: 'https://app.saleshandy.com/email-warmup',
          shLinkLabel: 'Warmup Dashboard',
        },
      },
      nextPhase: 'generic_monitoring',
    },
  },

  // SEQUENCE CREATION FLOW ─────────────────────────────────────────────────────

  sequence_start: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Let's build this sequence. What's the primary goal?`,
        metadata: {
          questionOptions: [
            'Book a meeting / discovery call',
            'Get a reply — start a conversation',
            'Drive to a demo or free trial',
            'Invite to a webinar or event',
          ],
        },
      },
      nextPhase: 'sequence_goal',
    },
  },

  sequence_goal: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `Good. Who's the audience for this sequence?`,
        metadata: {
          questionOptions: [
            'Cold leads — never contacted',
            'Warm leads — have engaged before',
            'Re-engagement — went cold 90+ days ago',
            'Specific account list — ABM style',
          ],
        },
      },
      nextPhase: 'sequence_audience',
    },
  },

  sequence_audience: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `How many steps do you want?`,
        metadata: {
          questionOptions: [
            '3 steps — compact, high-quality',
            '4 steps — balanced (recommended)',
            '5–6 steps — aggressive follow-up',
            'Let AI decide based on goal',
          ],
        },
      },
      nextPhase: 'sequence_steps',
    },
  },

  sequence_steps: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Building now. Here's **Step 1 — Day 0: The opener:**`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `{{FirstName}}, quick question about {{Company}}'s outbound`,
          emailBody: `Hi {{FirstName}},

I came across {{Company}} and wanted to reach out directly.

Most revenue leaders I speak with are dealing with the same challenge: building a predictable outbound pipeline without burning through SDR budget.

We've helped 200+ SaaS teams solve this with AI-automated outreach — and I think there's a relevant angle for {{Company}}.

Open to a 15-minute walkthrough?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'James Patel <james@buildco.com>',
          personalizationHighlights: ['Company name', 'Industry role match', 'Brain: pain points library'],
        },
      },
      nextPhase: 'sequence_email1_review',
    },
  },

  sequence_email1_review: {
    edit: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to change?`,
        metadata: {
          questionOptions: [
            'Make the opener more specific',
            'Shorter — under 50 words',
            'Lead with a question instead',
            'Include a specific result or stat',
          ],
        },
      },
      nextPhase: 'sequence_email1_editing',
    },
    regenerate: {
      response: {
        contentType: 'email_preview',
        content: `New angle for Step 1 — leads with a provocative question:`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `is {{Company}}'s outbound keeping up?`,
          emailBody: `Hi {{FirstName}},

One question: is your outbound engine keeping pace with {{Company}}'s growth right now?

Most teams I talk to at your stage say no — and the fix is usually not more SDRs.

Worth a 15-min look at what we're doing differently?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'James Patel <james@buildco.com>',
          personalizationHighlights: ['Company growth signal', 'Brain: challenge opener'],
        },
      },
      nextPhase: 'sequence_email1_review',
    },
    default: {
      response: {
        contentType: 'sequence_overview',
        content: `Sequence built — all 4 steps ready:`,
        metadata: {
          sequenceName: 'New Outreach Sequence',
          sequenceId: 'seq-new-001',
          sequenceSteps: [
            { step: 1, channel: 'email', day: 0, subject: "{{FirstName}}, quick question about {{Company}}'s outbound", description: 'Opener — peer-to-peer tone, pain-point hook', status: 'locked' },
            { step: 2, channel: 'email', day: 4, subject: 're: outbound at {{Company}}', description: 'Follow-up — concrete result from similar company', status: 'locked' },
            { step: 3, channel: 'linkedin', day: 7, subject: 'LinkedIn connection + note', description: 'Multi-channel touch — personalized connection request', status: 'locked' },
            { step: 4, channel: 'email', day: 12, subject: 'last note, {{FirstName}}', description: 'Breakup — direct, respectful close', status: 'locked' },
          ],
          shLink: 'https://app.saleshandy.com/sequences/seq-new-001',
          shLinkLabel: 'Open Sequence in Saleshandy',
        },
      },
      nextPhase: 'sequence_final_review',
    },
  },

  sequence_email1_editing: {
    default: {
      response: {
        contentType: 'email_preview',
        content: `Updated Step 1 with your feedback:`,
        metadata: {
          emailStepNumber: 1,
          emailTotalSteps: 4,
          emailSubject: `{{FirstName}} — quick question`,
          emailBody: `Hi {{FirstName}},

How is {{Company}}'s outbound pipeline looking right now?

We help teams like yours scale it without adding headcount. Takes 15 minutes to show you.

Interested?

{{SenderFirstName}}`,
          emailFrom: 'you@company.com',
          emailTo: 'James Patel <james@buildco.com>',
          personalizationHighlights: ['Brain: concise tone'],
        },
      },
      nextPhase: 'sequence_email1_review',
    },
  },

  sequence_final_review: {
    default: {
      response: {
        contentType: 'status_update',
        content: `Sequence saved and ready.\n\n[Open in Saleshandy →](https://app.saleshandy.com/sequences/seq-new-001)\n\nYou can now attach this sequence to any prospect list and launch. Want me to find leads to run it on?`,
        metadata: {
          questionOptions: [
            'Yes — find matching leads',
            'I have a list already — upload it',
            'Not yet — reviewing first',
          ],
          shLink: 'https://app.saleshandy.com/sequences/seq-new-001',
          shLinkLabel: 'View Sequence',
        },
      },
      nextPhase: 'generic_monitoring',
    },
  },

  // ANALYZE FLOW ───────────────────────────────────────────────────────────────

  analyze_start: {
    default: {
      response: {
        contentType: 'email_accounts_health',
        content: `Running a full audit of your setup...\n\nHere's your email infrastructure health:`,
        metadata: {
          emailAccounts: MOCK_EMAIL_ACCOUNTS,
          shLink: 'https://app.saleshandy.com/settings/email-accounts',
          shLinkLabel: 'Email Accounts',
        },
      },
      nextPhase: 'analyze_results',
    },
  },

  analyze_results: {
    default: {
      response: {
        contentType: 'text',
        content: `**Full Audit Results:**\n\n**Email Health** ⚠️\n- 3 accounts · avg deliverability: 67/100\n- \`hello@company.com\` — warmup OFF, daily limit too high\n- \`outreach@company.com\` — DMARC missing (high bounce risk soon)\n- \`sales@company.com\` — healthy\n\n**Active Sequences**\n- 2 running · 847 prospects in active steps\n- [View Sequences →](https://app.saleshandy.com/sequences)\n\n**Performance** ⚠️\n- Avg open rate: 34% (good)\n- Avg reply rate: 2.1% (below 5% target)\n- Bounce rate: 4.2% (above 2% threshold)\n\n**Root causes:**\n1. Step 2 in "SaaS Founders" sequence is nearly identical to Step 1 — needs differentiation\n2. \`hello@company.com\` hitting spam on 8% of sends — warmup is off\n3. Subject lines across 3 sequences are too generic\n\nFix everything?`,
        metadata: {
          questionOptions: [
            'Fix everything — apply all recommendations',
            'Fix email health issues first',
            'Rewrite the underperforming sequences',
            'Show me which subject lines to change',
          ],
          shLink: 'https://app.saleshandy.com/analytics',
          shLinkLabel: 'Full Analytics',
        },
      },
      nextPhase: 'analyze_fix',
    },
  },

  analyze_fix: {
    default: {
      response: {
        contentType: 'status_update',
        content: `All fixes applied:\n\n✓ \`hello@company.com\` — warmup enabled, daily limit → 20\n✓ \`outreach@company.com\` — DMARC instructions sent\n✓ Step 2 in "SaaS Founders" — rewritten with social proof angle\n✓ 6 subject lines rewritten with power words + personalization tokens\n\n**Projected improvement:**\n- Reply rate: 2.1% → 3.8–4.5%\n- Bounce rate: 4.2% → under 1.5% once warmup kicks in\n\n[View updated sequences →](https://app.saleshandy.com/sequences)\n[Email health →](https://app.saleshandy.com/email-warmup)`,
        metadata: {
          shLink: 'https://app.saleshandy.com/analytics',
          shLinkLabel: 'Monitor Results',
        },
      },
      nextPhase: 'generic_monitoring',
    },
  },

  // GENERIC FALLBACK ────────────────────────────────────────────────────────────

  generic_monitoring: {
    default: {
      response: {
        contentType: 'clarifying_question',
        content: `What would you like to do next?`,
        metadata: {
          questionOptions: [
            'Check campaign performance',
            'Add more prospects to a sequence',
            'Create a new sequence',
            'Fix deliverability issues',
          ],
        },
      },
      nextPhase: 'fresh',
    },
  },
};

// ─── Initial intent → starting phase ──────────────────────────────────────────

function detectStartingPhase(text: string): string {
  const t = text.toLowerCase();

  if (t.includes('1 million') || t.includes('1m prospect') || t.includes('million prospect') || t.includes('reach 1m')) return 'scale_start';
  if ((t.includes('find') && (t.includes('lead') || t.includes('ideal'))) || t.includes('reach my ideal')) return 'leads_start';
  if (t.includes('email account') || t.includes('email infra') || t.includes('set up email')) return 'infra_start';
  if (t.includes('create') && t.includes('sequence')) return 'sequence_start';
  if (t.includes('sequence') && !t.includes('create')) return 'sequence_start';
  if (t.includes('analyze') || t.includes('audit') || t.includes('current setup') || t.includes('fix') || t.includes('deliverability')) return 'analyze_start';
  if (t.includes('warmup') || t.includes('warm up')) return 'infra_start';
  if (t.includes('launch') && t.includes('campaign')) return 'leads_start';
  if (t.includes('start a new outreach')) return 'leads_start';
  if (t.includes('set up email infrastructure')) return 'infra_start';
  if (t.includes('fix or improve')) return 'analyze_start';
  if (t.includes('create a sequence') || t.includes('create an email sequence')) return 'sequence_start';

  return 'fresh';
}

// ─── Keyword matching within a phase ──────────────────────────────────────────

function matchPhaseKey(handler: PhaseHandler, text: string): string {
  const t = text.toLowerCase();
  const keys = Object.keys(handler).filter(k => k !== 'default');
  for (const key of keys) {
    if (t.includes(key)) return key;
  }
  return 'default';
}

// ─── Fresh fallback ────────────────────────────────────────────────────────────

const FRESH_RESPONSE: MockResponse = {
  contentType: 'clarifying_question',
  content: `I can handle that. What would you like to do?`,
  metadata: {
    questionOptions: [
      'Start a new outreach campaign',
      'Find & reach my ideal leads',
      'Set up email infrastructure',
      'Fix or improve an existing campaign',
    ],
  },
};

// ─── Main handler ──────────────────────────────────────────────────────────────

export async function handleUserMessage(chatId: string, userContent: string) {
  const { setAiThinking, addAiMessage, setPhase, getPhase } = useChatStore.getState();

  setAiThinking(chatId, true);
  await randomDelay(700, 1400);

  const currentPhase = getPhase(chatId);

  let response: MockResponse;
  let nextPhase: string;

  if (currentPhase === 'fresh' || !PHASE_MACHINE[currentPhase]) {
    const startingPhase = detectStartingPhase(userContent);

    if (startingPhase === 'fresh') {
      response = FRESH_RESPONSE;
      nextPhase = 'fresh';
    } else {
      const handler = PHASE_MACHINE[startingPhase];
      const key = matchPhaseKey(handler, userContent);
      const entry = handler[key] ?? handler['default'];
      response = entry.response;
      nextPhase = entry.nextPhase;
    }
  } else {
    const handler = PHASE_MACHINE[currentPhase];
    const key = matchPhaseKey(handler, userContent);
    const entry = handler[key] ?? handler['default'];
    response = entry.response;
    nextPhase = entry.nextPhase;
  }

  addAiMessage(chatId, {
    contentType: response.contentType as never,
    content: response.content,
    metadata: response.metadata,
  });

  setPhase(chatId, nextPhase);
  setAiThinking(chatId, false);
}
