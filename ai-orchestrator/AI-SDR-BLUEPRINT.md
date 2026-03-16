# AI SDR Experience Blueprint — v3

> **Product**: AI SDR by SalesHandy
> **Purpose**: This document is the single source of truth for the AI SDR product experience. It covers every screen, flow, edge case, AI intervention, and human-in-the-loop decision. Use this to understand the full product before writing any code.
> **Last Updated**: March 2026

---

## Table of Contents

1. [Product Philosophy](#1-product-philosophy)
2. [Information Architecture](#2-information-architecture)
3. [One-Time Org Setup: Multi-Path Onboarding](#3-one-time-org-setup)
4. [Workspace Brain](#4-workspace-brain)
5. [Email Infrastructure & Warmup Pipeline](#5-email-infrastructure--warmup-pipeline)
6. [Multi-Channel Architecture](#6-multi-channel-architecture)
7. [Agent Configuration](#7-agent-configuration)
8. [Agent Best Practices as Visible Behaviors](#8-agent-best-practices-as-visible-behaviors)
9. [Complete Screen Inventory](#9-complete-screen-inventory)
10. [Campaign Creation Chat](#10-campaign-creation-chat)
11. [Campaign Detail: Prospect Table](#11-prospect-table)
12. [Global Conversations Inbox](#12-global-conversations-inbox)
13. [Integrations](#13-integrations)
14. [User Flows](#14-user-flows)
15. [Negative Flows & Edge Cases](#15-negative-flows--edge-cases)
16. [AI Intervention Points](#16-ai-intervention-points)
17. [Human-in-the-Loop Design](#17-human-in-the-loop-design)
18. [Copy Quality Gate](#18-copy-quality-gate)
19. [Unique Email Generation](#19-unique-email-generation)
20. [Emotional Design Moments](#20-emotional-design-moments)
21. [Analytics & Confidence Building](#21-analytics)
22. [Settings Architecture](#22-settings-architecture)
23. [Prospect Deduplication](#23-prospect-deduplication)
24. [UX Psychology Map](#24-ux-psychology-map)
25. [Open Questions](#25-open-questions)

---

## 1. Product Philosophy

### Core Identity

The AI SDR is a **trusted companion**, not a tool. The user is the strategist. The AI is their tireless, intelligent sales team running 24/7. The system generates truly unique, context-rich outreach for every single prospect — never templates, never spray-and-pray. The AI answers prospect questions from the org's knowledge base and only escalates when it genuinely needs human judgment.

**Guiding Metaphor**: A founder who hired a great sales team. They brief the team once, create missions (campaigns), and the team executes. The founder sleeps well knowing the pipeline is being built.

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Radical Transparency** | Users see everything in the prospect table in real-time. Every AI decision is logged, every email is unique, every action is visible. Trust through evidence. |
| **One Voice, Many Capabilities** | Single unified AI entity. Specialized agents work behind the scenes. User never needs to know which agent did what. |
| **Org Once, Campaign Many** | Brand voice, tone, guidelines, help docs, case studies — set up once in the Workspace Brain. Campaigns inherit automatically. Never ask twice. |
| **Meet Users Where They Are** | Multiple onboarding paths. Some have customers, some have winning copy, some have nothing but knowledge in their head. The system adapts. |
| **Human Authority on Edge Cases** | Complex or low-confidence situations pause and ask the human. No timeouts. No autonomous fallback. Lead waits until human decides. |
| **Every Email is Unique** | Every outreach is generated fresh from the prospect's specific context. Context Synthesizer avoids superficial hooks. No templated messages ever. |
| **Managed Infrastructure** | Users can bring own email accounts OR let the system handle domain purchases, mailbox creation, warmup, and provider selection. |
| **All Channels, One System** | Email, LinkedIn, phone/calling, WhatsApp, SMS — all first-class channels. Orchestrator decides optimal channel mix per prospect. |

---

## 2. Information Architecture

The product has two distinct levels: **Org (workspace)** and **Campaign**.

### Org-Level (Set Once)

| Element | Source | Purpose |
|---------|--------|---------|
| Brand Voice & Tone | Onboarding calibration | How the AI sounds everywhere |
| Help Docs / Knowledge Base | User uploads, URL crawl | AI answers prospect questions autonomously |
| Case Studies | PDF uploads, links, text | AI references in outreach when industry matches |
| Winning Copy Patterns | Uploaded examples that converted | AI reverse-engineers tone, structure, hooks, length |
| Brand Guidelines | Document uploads | Formatting, terminology, messaging rules |
| Competitor Intelligence | User-provided or AI-researched | Handles competitive objections |
| Objection Playbook | Common objections + approved responses | Foundation for objection handling |
| AI-Generated Context Doc | Built from interview path | Business profile from conversation |
| Lookalike ICP Profile | Generated from customer list | Template for campaign targeting |
| Agent Configuration | Presets or granular config | Agent behavior rules |
| Email Infrastructure | Domains, mailboxes, warmup | Managed or BYOA sending accounts |
| Channel Accounts | LinkedIn, phone, WhatsApp, SMS | Connected channel credentials |
| Slack / CRM Connections | Integration settings | Notifications and data sync |
| Escalation Preferences | Notification routing | Where HITL notifications go |
| Global Defaults | Settings values | Sending schedule, limits, cadence, etc. |
| Existing Customer List | Optional upload | Used for lookalike ICP generation |

### Campaign-Level (Per Campaign)

| Element | Purpose |
|---------|---------|
| ICP / Target Audience | Who this campaign targets |
| Campaign Purpose | What this campaign achieves |
| Messaging Angle | Specific value prop for this audience |
| Email Account Selection | Which mailboxes this campaign uses |
| Campaign-Level Overrides | Any org defaults changed for this campaign |
| Prospect List | Leads found or imported |

> **Key Principle**: If the user provided brand voice during org setup, they are NEVER asked for it again. Campaigns inherit all org-level intelligence. Campaign creation should take 2 minutes, not 10.

---

## 3. One-Time Org Setup

Onboarding happens **once**. It sets up the workspace foundation. After this, campaign creation is lightweight.

### 3.1 Guided Choice Screen

After account creation, the user sees: **"What do you have to get started?"**

- Subtext: "Pick whatever applies. The more you share, the smarter your AI starts. You can always add more later."
- **Multi-select** — paths are combinable. Someone might have customers AND winning copy.

### Path A: "I have existing customers"

- **Input**: Customer list (CSV, CRM sync, or manual entry)
- **AI does**: Analyzes customer list → builds lookalike ICP automatically
- **Output**: "Based on your customers, your ideal prospect is: [auto-generated ICP]. Does this look right?"
- **Flow**: Customer list → AI generates lookalike ICP → User confirms/adjusts → Proceeds to voice calibration

### Path B: "I have winning outreach copy"

- **Input**: Emails, scripts, messages that actually converted (paste or upload)
- **AI does**: Reverse-engineers patterns — tone, structure, hooks, CTAs, length, personalization style
- **Output**: "Your winning emails are direct, lead with pain points, and keep it under 100 words. I'll match this pattern."
- **Flow**: Winning copy → AI extracts patterns → Generates sample in same style → User confirms → Saved to Brain

### Path C: "I have docs and guidelines"

- **Input**: Website URL, brand guidelines, help docs, case studies, pitch decks
- **AI does**: Crawls website, processes docs, extracts brand voice, positioning, features, pricing, competitive landscape
- **Flow**: URL + uploads → AI processes → Shows summary → User confirms/corrects → Brain populated

### Path D: "I don't have any of these — just my knowledge"

- **Input**: Nothing upfront. AI interviews the user.
- **AI does**: Conducts structured interview (5-8 questions). Builds Brain context docs in the background.
- **Interview questions**:
  - "What does your company do? Explain it like you'd tell a friend."
  - "Who are your best customers? What do they look like?"
  - "What problem do you solve that nobody else does well?"
  - "How do you want to sound? Casual? Formal? Direct? Warm?"
  - "What's your pricing model?"
  - "Who are your main competitors? What do you do better?"
  - "Any phrases or words you always use or never use?"
- **Output**: "Here's what I've documented about your business. Sound right?" User reviews and confirms.

### Onboarding Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Tiny customer list (< 5) | "Small sample — I'll use it as starting point and ask a few questions to refine." Hybrid path. |
| Winning copy is generic templates | "These look like templates. Let me ask how YOU sound." Redirect to interview. |
| Terse interview answers | Follow-up questions: "Tell me more" / "Can you give an example?" |
| User drops off mid-setup | All progress saved. "Welcome back! Pick up where you left off." |
| User wants to skip everything | Allowed with warning: "I'll do my best, but more info = better outreach. Add to Brain anytime." |
| Website unreachable | "Can't access site. Try again, different URL, or describe your business directly." |
| Email OAuth fails | Troubleshooting steps. Try different account. Never a dead end. |

### Common Steps (After Guided Choice)

1. **Email Infrastructure Setup** — see [Section 5](#5-email-infrastructure--warmup-pipeline)
2. **Channel Connections** — LinkedIn, phone, WhatsApp, SMS (all optional)
3. **Integrations** — Slack + CRM (optional, can do later)
4. **Completion** → "Your AI is ready. Create your first campaign." → Transitions to campaign chat

If warmup is in progress: "Your email accounts are warming up. Start outreach now at 30% volume — I'll scale up as more mailboxes are ready."

---

## 4. Workspace Brain

The Brain is the org-level knowledge base powering everything. Single source of truth. Every campaign, every email, every autonomous reply draws from it.

### 4.1 Knowledge Types

| Type | Sources | AI Usage |
|------|---------|----------|
| Brand Voice & Tone | Onboarding, winning copy, manual | Applied to every outreach and reply |
| Product/Service Info | Website crawl, AI interview, manual | Outreach angles + prospect Q&A |
| Help Docs / FAQ | Uploads, help center URL crawl | Answers prospect questions autonomously |
| Case Studies | PDF, links, text | Referenced when industry matches |
| Winning Copy Patterns | Uploaded converted emails | Reverse-engineered tone, structure, hooks |
| Brand Guidelines | Document uploads | Formatting, terminology, dos/don'ts |
| Competitor Intelligence | User-provided or AI-researched | Competitive objection handling |
| Pricing Overview | User-provided | Answers pricing questions without escalating |
| Objection Playbook | Objections + approved responses | Foundation for reply handling |
| AI-Generated Context Doc | Built from Path D interview | Comprehensive business profile |
| Lookalike ICP Profile | From Path A customer list | Campaign targeting template |

### 4.2 Brain UI

- **Top-level navigation item** — NOT buried in settings
- **Card-based layout**: each knowledge type is a card showing content status (populated / empty / needs review), last updated, quick actions
- **Empty states**: "Add case studies — your AI will reference these when reaching similar companies. Prospects trust results over promises."
- **"Test my knowledge" button**: user asks the Brain a question, sees how AI would answer. E.g., "How much does our product cost?" → AI's response
- **Brain Health Score**: "Your AI's knowledge is 72% complete. Adding pricing info and case studies would help."

### 4.3 Autonomous Replies from Brain

When a prospect asks a product question (pricing, features, integrations), the AI draws from the Brain to answer autonomously.

- **Confidence threshold**: Clear Brain info → autonomous reply. Ambiguous/missing → escalate to human.
- **Visibility**: Every autonomous reply logged: "Answered from Brain: Pricing." User can review and correct.
- **Learning loop**: User correction updates the Brain: "Got it — I'll answer this way going forward."

### 4.4 Brain as Living Document

Three improvement mechanisms:
1. **User additions**: uploading new case studies, updating pricing, adding objection responses
2. **AI learning**: corrections to autonomous replies update the Brain
3. **AI suggestions**: "I've noticed 5 prospects asked about SOC2 compliance and I couldn't answer. Want to add this to the Brain?"

---

## 5. Email Infrastructure & Warmup Pipeline

### 5.1 Two Paths

#### Path A: Bring Your Own Accounts (BYOA)

- User connects existing Gmail/Outlook via OAuth
- System checks deliverability health: domain reputation, SPF/DKIM/DMARC
- Already warmed → ready to send
- Needs warmup → enters warmup pipeline

#### Path B: Managed Setup

System handles domain purchase, mailbox creation, warmup, and provider selection.

**Step 1 — Budget & Volume**: "How many leads do you want to contact per day?" → AI recommends mailbox count and domain strategy. "To safely contact 100 leads/day, I'd recommend 5 mailboxes across 3 domains."

**Step 2 — Provider Selection**:

| Option | Provider | Cost | Best For |
|--------|----------|------|----------|
| Budget-friendly | Azure (Outlook) | Lowest per mailbox | High volume, cost-sensitive |
| Premium deliverability | Google Workspace (annual) | Higher, best reputation | Inbox placement priority |
| Balanced mix | Azure + Google | Medium | Diversified sending |
| Custom | User specifies | Varies | Specific IT requirements |

**Step 3 — Approval**: "3 domains, 5 mailboxes, $XX/month. Approve?" → One-click. System handles everything.

**Step 4 — Warmup begins automatically**.

### 5.2 Warmup Pipeline View

Accessible from Settings > Email Infrastructure. Also surfaced during onboarding.

| Stage | Duration | What Happens | User Sees |
|-------|----------|-------------|-----------|
| Provisioning | 1-2 days | Domain purchased, DNS configured, mailbox created | "Setting up yourdomain.com — configuring DNS..." |
| Early Warmup | Days 1-5 | Low-volume sending to warmup network | "Warming up — 10-20 emails/day to build reputation" |
| Mid Warmup | Days 6-10 | Increasing volume, monitoring bounces/spam | "Reputation growing — 30-50 emails/day" |
| Late Warmup | Days 11-15 | Near-full volume, final health checks | "Almost ready — 80% warmed up, 2 days remaining" |
| Ready | Day 15+ | Full capacity, monitoring continues | "Ready to send — full capacity" (green) |

**Pipeline UX**:
- Progress bar per mailbox: 0% → 100%. Gray → yellow → green.
- Health indicators: bounce rate, spam rate, sender score per mailbox.
- Aggregate: "3 of 5 mailboxes ready. 2 warming up (4 days remaining)."
- Concrete date: "All mailboxes will be ready by [date]."

### 5.3 Early Outreach (30% Volume Bridge)

Users should NOT wait 15 days for value.

- **30% volume start**: "Start outreach now at 30% volume using pre-warmed accounts. I'll scale as more come online."
- **Volume ramp chart**: Current daily capacity vs. target, with projected ramp.
- **Automatic migration**: New warmed mailboxes auto-distribute sending load. No user action.
- **Notification**: "2 more mailboxes ready! Capacity increased from 30 to 60 leads/day."

### 5.4 Per-Campaign Email Account Selection

When creating a campaign:
- Use existing warmed accounts (default — system picks healthiest)
- Connect a new personal account
- Request new managed accounts (triggers setup + warmup + budget approval)
- AI recommendation: "For enterprise CTOs, I'd recommend Google Workspace accounts — best deliverability to corporate inboxes."

---

## 6. Multi-Channel Architecture

All five channels are **first-class v1 citizens**. The orchestrator decides optimal mix per prospect.

### Channel Overview

| Channel | Primary Use | Capabilities | Orchestrator Logic |
|---------|-------------|-------------|-------------------|
| Email | Foundation. First touch for most. | Personalized cold email, follow-ups, warmup, deliverability monitoring | Default first channel |
| LinkedIn | Professional relationship building. | Connection requests, InMail, DMs, profile engagement (likes/comments before outreach) | High social engagement or email non-response |
| Phone | Highest-intent. Direct conversation. | AI voice calls, voicemail, real-time conversation, dynamic pivoting | High-intent leads or after positive signals |
| WhatsApp | Informal, high open-rate. | Personalized messages, media, quick replies | Markets where WhatsApp is primary, or follow-up |
| SMS | Brief, high-urgency. | Short messages, meeting reminders, follow-ups | Sparingly. Confirmations, time-sensitive, last resort |

### Channel Interaction Patterns

- **Sequential escalation**: Email → LinkedIn (no response) → Phone (high intent) → WhatsApp/SMS (final touch)
- **Parallel engagement**: LinkedIn connection + email simultaneously for high-priority prospects
- **Dynamic pivoting**: Mid-call "I'm driving" → contextual email within 60 seconds. "Email me" on call → email sent immediately.
- **Signal-based acceleration**: 3x email opens + LinkedIn profile view → orchestrator triggers phone call at optimal time
- **Concurrent sending prevention**: Orchestrator ensures no two channels fire simultaneously for same prospect

### Channel Setup in Onboarding

Presented as a visual checklist. Email is primary, others additive:

- **Email**: "Your foundation. Required." (Must connect or set up managed)
- **LinkedIn**: "Adds personal touch. Great for executives." (Daily limit guidance)
- **Phone**: "AI makes calls, leaves voicemails, handles conversations. Highest conversion."
- **WhatsApp**: "Popular internationally. High open rates. Requires WhatsApp Business."
- **SMS**: "Quick, direct. Best for confirmations and time-sensitive follow-ups."

### Channel Visibility in Prospect Table

- Channel icons per prospect: active (filled) vs. available but unused (outline)
- Channel history on row expansion: full thread across all channels chronologically
- Pivot entries in timeline: "Switched from email to LinkedIn after 2 unreplied emails"

---

## 7. Agent Configuration

Org-level. Two modes.

### 7.1 Preset Mode (Beginners)

| Preset | Description | Behavior |
|--------|-------------|----------|
| Balanced Outreach | Even channel mix, moderate follow-up | All agents. Email + LinkedIn primary. 3 follow-ups. Auto-book. |
| Email-First | Email primary, others as fallback | Email agent primary. Others only after full sequence with no response. |
| Multi-Channel Blitz | Aggressive, high volume | All agents max. Parallel outreach. 5 follow-ups. |
| Warm & Steady | Conservative, relationship-focused | Slower cadence. Fewer follow-ups. More personalization. Ask before booking. |

Visual cards. Recommended tag on most common. One-click apply.

### 7.2 Granular Mode (Power Users)

Accessible via **"Customize individual agents"** toggle.

| Agent | Configurable Parameters |
|-------|------------------------|
| Lead Extraction | Max contacts/company (default: 2), lead scoring weights, ICP strictness, email validation rules, data sources |
| Context Synthesizer | Research depth (fast/standard/deep), signal priorities (news, social, hiring, funding), context refresh frequency |
| Orchestrator | Concurrent sending rules, real-time engagement response speed, optimal timing preferences, channel escalation thresholds |
| Email Agent | Warmup settings, volume per account, reply aggressiveness, email length, follow-up timing |
| LinkedIn Agent | Daily connection limit, InMail vs. connection note, pre-engagement actions (like/comment first) |
| Voice AI Agent | Call windows, voicemail behavior, pivot rules, conversation style, hold/transfer handling |
| WhatsApp Agent | Message frequency, opt-in handling, media sharing rules, business hours |
| SMS Agent | Frequency caps, message length, use cases (confirmations only vs. outreach) |

---

## 8. Agent Best Practices as Visible Behaviors

Every agent best practice has a corresponding **user-facing transparency moment**. When users see the AI making smart decisions, trust compounds.

| Agent Best Practice | User Sees | Where |
|--------------------|-----------|-------|
| Lead Extraction validates emails before adding | "47 leads found, 3 removed (invalid emails). 44 verified leads added." | Campaign timeline + prospect count |
| Orchestrator prevents concurrent sending | "Holding LinkedIn — email sent 2 hours ago. LinkedIn tomorrow." | Prospect timeline (expanded row) |
| Orchestrator detects real-time engagement, acts immediately | "Sarah just opened your email. Calling now — best moment to reach her." | Prospect timeline + live notification |
| Orchestrator matches optimal outreach time | "Sent at 10:14am EST — Sarah's timezone. When she typically opens emails." | Prospect timeline ("Why this timing") |
| Context Synthesizer avoids superficial hooks | "Referenced Acme's engineering hiring push, not their funding round (everyone mentions that)." | "Why this email" expandable |
| Context Synthesizer refreshes context before follow-ups | "Updated context: Acme just launched a new product. Adjusted messaging." | Prospect timeline |
| Copy Quality Check blocks templated content | "Held back — too generic. Here's a rewrite with stronger personalization." | Copy quality gate |
| Email Agent distributes across mailboxes | "Sent from mailbox 3 (healthiest reputation). Rotating across 5 accounts." | Prospect timeline (detail) |
| Voice Agent pivots mid-call | "Tom said he's driving. Pivoted to email within 60 seconds." | Timeline + channel pivot indicator |
| Orchestrator snoozes OOO and re-engages later | "Sarah is out until March 15. Snoozed. Will re-engage March 16." | Table (status) + timeline |
| Lead Extraction checks prospect overlap | "Found 50 leads, 4 already in Campaign A. Added 46." | Campaign timeline |
| Orchestrator respects daily limits | "Reached today's limit of 50. Remaining queued for tomorrow." | Campaign timeline |

### Progressive Disclosure of Intelligence

- **Prospect table (default)**: Outcomes only. "Email sent 2h ago" / "Meeting booked."
- **Row expansion (one click)**: Key decisions — channel choice, timing logic, next action.
- **Full timeline (dedicated view)**: Every decision, action, quality check, context refresh.
- **"Why this email" / "Why this timing"**: Small expandable on sent messages. Available but not in-your-face.

> **Design Principle**: The AI should narrate its intelligence. "Called at 10:14am because Sarah opened your email 3 minutes ago" — this isn't random automation, it's intelligent behavior. These moments compound into deep trust.

---

## 9. Complete Screen Inventory

### Top-Level Navigation

| Nav Item | Screen | Purpose |
|----------|--------|---------|
| Command Center | Home / Dashboard | All campaigns overview, north star metrics, quick actions |
| Campaigns | Campaign list + detail | Create, manage, monitor campaigns |
| Conversations | Global inbox | Every inbound reply across all campaigns |
| Brain | Workspace knowledge base | Org-level voice, docs, case studies, guidelines |
| Settings | Org + account settings | Global defaults, agents, email infra, integrations, team |

### Command Center

- **North Star**: Total meetings booked (week/month) with trend
- **Campaign Cards**: Name, ICP summary, health pulse (green/yellow/red), key stats, last activity, escalation badge
- **Quick Actions**: "Create New Campaign" always visible
- **Email Infra Status**: "5/5 mailboxes ready" or "2 warming up (4 days left)"
- **Empty State**: "Your AI knows your business. Let's give them their first mission." → "Create your first campaign"

### Campaign Detail

State-dependent landing:

| State | Lands On | Why |
|-------|----------|-----|
| New | Campaign Chat | User still briefing the AI |
| Active | Prospect Table | Operational home — main working view |
| Paused | Prospect Table | See state before deciding to resume |
| Completed | Overview (analytics) | Historical results |

Tabs:

| Tab | Content |
|-----|---------|
| Chat | Campaign briefing and adjustments (primary for new campaigns) |
| Prospects | TanStack table with all leads and outreach status (primary for active) |
| Overview | Campaign Brain context, analytics, funnel, campaign comparison |
| Meetings | Calendar view with prep briefs |
| Settings | Campaign overrides + email account selection |

### Settings Screens

| Section | Content |
|---------|---------|
| Global Defaults | Sending schedule, follow-up cadence, daily limits, tone, booking mode, blacklist |
| Agent Configuration | Presets or granular per-agent config |
| Email Infrastructure | Managed domains + mailboxes, warmup pipeline, BYOA, provider selection |
| Channel Accounts | LinkedIn, phone, WhatsApp, SMS connections and limits |
| Integrations | Slack, CRM, webhooks |
| Escalation Preferences | Notification channels, routing rules |
| Team Management | Invite teammates, delegation, permissions |

---

## 10. Campaign Creation Chat

Lightweight because the Brain already knows the business.

### What the Chat Covers

- Who to target (ICP) — can reference lookalike profiles from existing customers
- What this campaign is for (specific product, use case, angle)
- Campaign-specific messaging nuances
- Whether to replicate an existing campaign's settings
- Channel preferences (if different from org defaults)
- Email account selection: use warmed accounts, connect own, or request new managed

### Chat UX

- **AI leads with intelligence**: "Based on your product and lookalike ICP, I'd suggest targeting [description]. Adjust?"
- **Replication**: "Replicate Campaign A with new audience, or start fresh?"
- **No brand voice questions**: Brain handles this automatically
- **Email account prompt**: Shows warmed accounts with health indicators. Option to add new.
- **New managed accounts**: Budget approval inline. "3 new mailboxes, $XX/month. Approve?" Warmup begins immediately, campaign starts at reduced volume.
- **Launch CTA**: "Launch Campaign" → transitions to Prospect Table

> **Target: 2-minute campaign creation.** Brain knows the business. User says who, why, special angle. AI does the rest. If chat takes > 3 minutes, the experience is failing.

---

## 11. Prospect Table

The **primary operational view** for active campaigns. TanStack-powered. Where the user spends 80% of their time.

### 11.1 Three Column Groups (Expandable / Collapsible)

#### Group 1: Prospect Info

Name column is always pinned (never collapsible).

| Column | Content | Sortable |
|--------|---------|----------|
| Name | Full name (clickable → prospect detail) | Yes |
| Company | Company name | Yes |
| Title | Job title / role | Yes |
| ICP Score | AI match score (0-100) with color | Yes |
| Location | City / timezone | Yes |

#### Group 2: Outreach Status

| Column | Content | Sortable |
|--------|---------|----------|
| Channel | Active channel icons (email, LinkedIn, phone, WA, SMS) | Filterable |
| Step | Position in sequence ("Follow-up 2 of 3") | Yes |
| Last Action | Most recent event + timestamp | Yes (by time) |
| Status | Researching / Contacted / Replied / Meeting Booked / Escalated / Snoozed / Paused | Filterable |

#### Group 3: Engagement Signals

| Column | Content | Sortable |
|--------|---------|----------|
| Opens | Email open count | Yes |
| Clicks | Link click count | Yes |
| Replies | Count + sentiment dot (green/yellow/red) | Yes |
| Sentiment | Latest: Positive / Neutral / Negative / OOO | Filterable |

### 11.2 Column Group Behavior

- **Collapse**: Hides columns, shows summary indicator. Collapsed "Engagement" → single heat-map dot.
- **Group header aggregates**: "Engagement Signals (23 opens, 4 replies)"
- **Column reordering**: Drag within groups. Groups maintain order.
- **Saved views**: Users save configurations: "My daily view", "Reply focus", etc.

### 11.3 Row Expansion (Prospect Journey)

Click prospect name or expand row → inline detail panel:

- **Profile + context**: Prospect details, company context from Context Synthesizer, ICP match reasoning
- **Conversation thread**: All outreach + replies across all channels, chronological
- **AI decisions (summary)**: Key decisions with reasoning ("Why this channel", "Why this timing")
- **Next action preview**: What AI will do next, when. User can approve, edit, skip, pause.
- **Manual overrides**: Write message, pause, move to another campaign, remove

### 11.4 Full Prospect Timeline

Slide-out panel or separate page. Complete chronological history:

| Entry Type | Example |
|-----------|---------|
| Lead Discovered | "Found via Lead Extraction — ICP score 87" |
| Context Synthesized | "Acme: Series B, 120 employees, hiring engineers" |
| Outreach Drafted | "Unique email referencing Acme's hiring push" |
| Quality Check | "Passed — 8.9/10. Personalization: strong." |
| Email Sent | "Sent via Gmail at 10:14am EST" |
| Email Opened | "Opened 3 times over 2 days" |
| Channel Pivot | "No reply after 5 days. LinkedIn connection request." |
| Reply Received | "'Interesting, but we use [Competitor]' — Sentiment: Objection" |
| AI Autonomous Reply | "Responded with competitor comparison from Brain" |
| Escalation | "Low confidence — paused, waiting for human" |
| Meeting Booked | "Thursday 2pm confirmed. Prep brief generated." |

### 11.5 Table Actions

- Multi-select → Pause, Resume, Remove, Move to another campaign
- Filter and search all columns
- Export as CSV
- "Add prospects" — import CSV or let AI find more matching ICP

---

## 12. Global Conversations Inbox

Top-level nav item. Every inbound reply across **all campaigns** in one unified view.

### Layout

- **Left panel**: Conversation list — prospect name, company, campaign, message preview, sentiment, timestamp, escalation badge
- **Right panel**: Full conversation thread across all channels, including AI-sent and autonomous replies (tagged)

### Filters

- By campaign (multi-select)
- By sentiment (Positive / Neutral / Negative / OOO)
- By status (Needs Attention / AI Handling / Resolved / Escalated)
- By channel (Email / LinkedIn / Phone / WhatsApp / SMS)
- Unread / All toggle

### Key Distinction

- **Needs Attention**: Escalated conversations. Highlighted and badged.
- **AI Handling**: AI managing autonomously. Visible but not highlighted. User can review.
- **Resolved**: Reached outcome (meeting, decline, unsubscribe).

**Headline framing**: "Your AI is handling 47 conversations. 3 need your attention." Emphasis on what needs the user, NOT total volume.

### Actions

- Reply manually (take over conversation)
- Approve AI's suggested reply
- Edit and send AI's draft
- "Let AI continue" — dismiss
- View in campaign — jump to prospect row
- Snooze conversation

> **Psychology**: Don't create email anxiety. Default state should feel managed, not overwhelming. Spark Effect (#26) — minimal effort to stay in control.

---

## 13. Integrations

### 13.1 Slack

- Escalation notifications with context + quick-action buttons (Approve, Edit, Skip)
- Thread-based: each escalation is a thread
- Daily/weekly digest summaries to chosen channel
- Per-campaign channel routing (optional)
- Real-time alerts for meetings, deliverability issues, milestones

### 13.2 CRM

- **Supported**: Salesforce, HubSpot, Pipedrive (initial)
- New leads created in CRM when first contacted
- Meeting outcomes synced
- Conversation history attached to CRM contact
- Bidirectional status sync (CRM "closed" → AI stops outreach)
- Custom field mapping (ICP score, sentiment, campaign source)
- Duplicate detection: links to existing CRM records
- Owned lead handling: skip or flag for user decision

---

## 14. User Flows

### 14.1 First-Time User: Path A (Has Existing Customers)

1. Sign up → Guided choice: "I have existing customers"
2. Upload customer list (CSV or CRM sync)
3. AI generates lookalike ICP → user confirms/adjusts
4. Calibrate brand voice (picks from samples or provides winning copy)
5. Email setup: managed (approve budget) or connect own
6. Connect LinkedIn, phone (optional)
7. Connect Slack + CRM (optional)
8. "Create first campaign" → chat with pre-filled ICP from lookalike
9. 2-minute campaign setup → Launch
10. If warmup in progress: starts at 30%, scales automatically

### 14.2 First-Time User: Path D (Nothing — AI Interviews)

1. Sign up → Guided choice: "I don't have any of these"
2. AI interviews: 5-8 questions about business, customers, product, tone
3. AI builds context doc in background
4. Shows summary → user confirms/edits
5. AI generates voice samples from answers → user picks closest
6. Email setup + channels + integrations
7. First campaign via chat

### 14.3 Second Campaign

1. "Create New Campaign" from Command Center
2. Chat: "Replicate Campaign A with new audience, or start fresh?"
3. New ICP + angle (Brain knows everything else)
4. Email account selection
5. Launch → dedup check → table populates

### 14.4 Daily Check-In (5 Minutes)

1. Command Center: campaign health + meetings + warmup status
2. Conversations badge: "3 need attention" → review, respond
3. Campaign prospect table: live status, expand hot leads
4. Meetings tab: prep briefs for upcoming meetings
5. Close → 5 minutes total

### 14.5 Managing Email Infrastructure

1. Settings → Email Infrastructure → Pipeline view
2. All mailboxes visible: 3 ready (green), 2 warming (yellow, 4 days)
3. "Add more capacity" → budget approval → provisioned
4. Automatic volume ramp
5. Health alerts if issues

### 14.6 Autonomous Reply (No Human)

1. Prospect: "How much does your enterprise plan cost?"
2. Sentiment: inquiry. Brain has pricing.
3. AI drafts response from Brain
4. Quality check passes
5. Sent automatically
6. Logged: "Answered from Brain: Pricing"
7. User reviews on next check-in

### 14.7 Human Escalation

1. Prospect: "We use [Competitor], why switch?"
2. Sentiment: complex objection, low confidence
3. Lead paused. Escalation created.
4. User notified via preferred channels
5. Sees analysis + 2-3 suggested responses
6. Picks one, edits, approves → sent → lead unpaused

### 14.8 Updating the Brain

1. New case study from customer
2. Brain → Case Studies → "Add"
3. Upload or paste
4. AI: "Added. I'll reference this for [industry] prospects."
5. Health: 72% → 78%
6. Future outreach auto-incorporates

---

## 15. Negative Flows & Edge Cases

### 15.1 Onboarding

| Edge Case | Handling |
|-----------|----------|
| Tiny customer list | Hybrid: use as starting point + interview |
| Generic winning copy | Redirect to interview for real voice |
| Terse interview | Follow-up questions |
| Drop-off | Saved progress, resume prompt |
| Skip everything | Warning + allow. Add to Brain later. |
| Website unreachable | Try again, alt URL, or describe directly |
| OAuth fail | Troubleshoot + try different account |

### 15.2 Email Infrastructure

| Edge Case | Handling |
|-----------|----------|
| Domain purchase fails | "Couldn't purchase [domain]. Here are 3 alternatives." |
| Warmup health drops | "Mailbox 3 showing issues. Paused. Investigating." Auto-remediation. |
| All warming, user wants to start NOW | "Start at 30% with pre-warmed. Scaling over 2 weeks." |
| BYOA poor deliverability | "Low sender score. Recommend managed accounts or warmup first." |
| Budget limit reached | "Reached mailbox budget. Upgrade or connect own." |
| Warmup takes longer | "Adjusted ready date to [new date]. Active campaigns unaffected." |

### 15.3 Campaign Execution

| Edge Case | Handling |
|-----------|----------|
| ICP exhausted | "Reached all 342. Expand or new campaign?" |
| Bounce rate spikes | "Paused Gmail. Analysis: [details]" |
| Unsubscribe | Auto-compliance. Removed. No escalation. |
| Prospect overlap | "50 found, 4 in Campaign A. Added 46." |
| Copy fails 3x | Escalation: "Needs your touch." |
| Foreign language reply | Escalation: "Replied in Portuguese. Language?" |
| Dynamic pivot (driving) | "Pivoted to email in 60 seconds." Autonomous. |
| Calendar deadlock | Escalation: "She suggested 7am Tuesday. Accept?" |
| Brain knowledge gap | Escalation: "Asked about SOC2. Don't have info." + add to Brain option |
| CRM owned lead | "Owned by [Rep]. Skip or contact?" |
| AI answers incorrectly | User corrects → Brain updates → corrected follow-up |
| LinkedIn daily limit | "Limit reached. Queued for tomorrow." |
| WhatsApp no opt-in | "Can't message on WA — no opt-in. Using email." |
| Hostile phone call | Escalation: "Call ended negatively. Recommend pausing. Your call." |

### 15.4 Trust-Breaking Moments

**Bad email slips through**: Immediate escalation, honest analysis, recovery options (apologize/remove/respond), pattern flagged for learning.

**Wrong ICP**: Quick pause, chat-based refinement, already-contacted get no more outreach.

**Wrong Brain answer**: User corrects in Conversations, Brain update prompt, future responses fixed.

**Warmup delayed**: Proactive notification with new date. Active campaigns unaffected.

---

## 16. AI Intervention Points

| Intervention | Trigger | Channel | Urgency |
|-------------|---------|---------|---------|
| Complex reply | Low confidence sentiment | User's preferred | High — lead paused |
| Calendar conflict | Scheduling deadlock | User's preferred | High |
| Brain gap | Can't answer prospect question | User's preferred | High — lead paused |
| Hostile prospect | Negative call/reply | User's preferred | High |
| Copy quality block | Draft fails check | In-app | Medium |
| Performance alert | Reply rate drops 3+ days | In-app | Medium |
| Deliverability warning | Bounce spike / warmup issue | In-app + email + Slack | High |
| Warmup progress | Milestone or issue | In-app | Low-Medium |
| Warmup complete | All mailboxes ready | In-app + email | Medium |
| Milestone celebration | 1st meeting, 10th, etc. | In-app | Low |
| ICP exhaustion | All leads contacted | In-app | Medium |
| Brain gap pattern | Repeated unanswerable questions | In-app (Brain) | Low |
| Campaign suggestion | Opportunity to adjust | In-app | Low |
| Weekly digest | End of week | Email | Low |
| Meeting prep brief | 24h before meeting | Email + in-app | Medium |

> **Rule**: Every intervention answers three questions: What happened? Why does it matter? What should the user do?

---

## 17. Human-in-the-Loop Design

### Control Spectrum

| Level | AI Authority | Examples |
|-------|-------------|----------|
| **Full Autonomy** | Decides and acts | Approved emails, channel pivots, unsubscribe compliance, voicemails, Brain-confident answers, concurrent prevention, optimal timing |
| **Informed Autonomy** | Decides, acts, reports | Channel selection, A/B testing, timing optimization, mailbox rotation, Brain replies |
| **Collaborative** | Proposes, user approves | Quality-blocked drafts, complex escalations, calendar conflicts, Brain gaps, budget approvals |
| **Human Override** | User takes control | Manual reply, pause campaign, edit ICP, correct Brain, remove prospect, change infra |

### Notification Channels

- **In-app**: Bell icon badge, campaign card badges, conversation highlighting
- **Slack**: Rich messages with Approve/Edit/Skip buttons, thread-based
- **Email**: Critical escalations only, CTA linking to in-app

User chooses preferred channels during org setup. Can change anytime.

### Delegation

- Assign escalations to teammate (per campaign or globally)
- All actions logged with attribution
- Owner retains visibility on return

### Lead Behavior on Escalation

**Lead is PAUSED. No timeout. No autonomous fallback.** The lead waits until the human responds. This is the #1 trust mechanism.

---

## 18. Copy Quality Gate

Prevents weak, templated, or off-brand content. Especially critical with unique generation — ensures "unique" also means "good."

### Three Options (Hard Block with Choice)

**Option 1: "Let AI fix it" (Default/Prominent)**
- "I held this back because [reason]. Here's a rewrite."
- Side-by-side comparison. One-click approve.

**Option 2: "Rewrite myself"**
- Inline editor with AI hints: "Consider mentioning their recent [event]."
- New draft re-runs quality check.

**Option 3: "Send it anyway" (reason required)**
- "If you have a reason for keeping it, let me know."
- User types reason. AI learns from override. Logged in timeline.

> **Framing**: NEVER "This email failed." ALWAYS "I held this back because it might not land well." Quality-conscious colleague, not disapproving teacher.

---

## 19. Unique Email Generation

**Foundational principle.** Every outreach generated fresh from prospect's specific context. No templates ever.

### Context Layers

| Layer | Source | Example |
|-------|--------|---------|
| Role & responsibilities | Lead Extraction + LinkedIn | "As someone leading engineering at a scaling startup..." |
| Company situation | Context Synthesizer | "Acme just closed Series B — scaling usually means..." |
| Industry pain points | Brain + ICP | "Most fintech CTOs struggle with compliance..." |
| Social signals | LinkedIn, blogs, podcasts | "Your post about microservices resonated..." |
| Previous interactions | Conversation history | "Following up on our conversation about..." |
| Brand voice | Brain | Casual/formal, short/long, humor/straight |
| Case studies | Brain | "We helped [similar company] reduce deployment by 60%..." |
| Campaign angle | Campaign chat | Specific value prop for this campaign |
| Winning copy patterns | Brain (from onboarding) | Structure, hooks, length, CTA style from proven emails |

### User Visibility

- **Personalization highlights**: Prospect-specific content subtly highlighted in sent emails
- **"Why this email"**: Expandable on each sent message showing AI's reasoning

### Quality Safeguards

- No superficial hooks (Context Synthesizer designed to avoid shallow personalization)
- Factual accuracy check (referenced facts verified as current)
- Tone consistency check (validated against Brain's voice profile)
- Spam trigger scan (checked for spam-filter phrases)

---

## 20. Emotional Design Moments

| Moment | Emotion | Design | Psychology |
|--------|---------|--------|------------|
| Org setup complete | Readiness | "Your AI knows your business. First campaign?" | Fresh Start (#61) |
| Warmup starts | Patience + progress | Pipeline with daily progress, concrete ready date | Labor Illusion (#62), Feedforward (#52) |
| 30% outreach begins | Early validation | "Starting with ready accounts. Scaling as more come online." | Spark Effect (#26) |
| Warmup complete | Unlocked potential | "All mailboxes ready! Full capacity unlocked." | Goal Gradient (#51) |
| First campaign launched | Anticipation | Prospect table populates live | Commitment (#66) |
| First email sent | Relief + trust | Row updates. Expand to see unique email. | Feedforward (#52) |
| AI narrates smart decision | Trust building | "Called Sarah — she opened your email 3 min ago." | Labor Illusion (#62) |
| First reply | Excitement | Conversations badge. "Sarah says: Tell me more." | Variable Reward (#44) |
| First meeting booked | Celebration | Prominent celebration. Counter starts. | Peak-End Rule (#91) |
| Brain health 100% | Completeness | "Fully equipped. Can answer any prospect question." | Goal Gradient (#51) |
| 10th meeting | Confidence | "10 meetings. Your outreach is working." | Social Proof (#30) |
| Campaign comparison | Strategic growth | "Campaign A books 2x faster. Shorter emails." | Curiosity Gap (#32) |
| AI corrects from feedback | Partnership | "Thanks for correction. Updated for next time." | Feedback Loop (#27) |
| Slow week digest | Reassurance | "Quieter week. Normal — here's what I'm adjusting." | Expectations Bias (#28) |

---

## 21. Analytics

### Tier 1: North Star (Always Visible)

Meetings booked. Trend line. Shown on Command Center and every campaign.

### Tier 2: Confidence Builders (Campaign Overview)

- Reply rates + sentiment breakdown
- Funnel: Leads → Contacted → Replied → Positive → Meeting
- Campaign comparison with AI insights
- Channel performance per campaign

### Tier 3: AI Transparency (On-Demand)

- AI decision log: channel choices, timing, messaging reasoning
- A/B test results
- Quality check stats and trends
- Brain usage: how often autonomous, which topics, accuracy
- Email infrastructure health: deliverability per mailbox

---

## 22. Settings Architecture

### Global Defaults

| Setting | Default | Controls |
|---------|---------|----------|
| Sending Schedule | Mon-Fri, 9-5 prospect local time | When outreach is sent |
| Follow-up Cadence | 3 follow-ups, 3/5/7 day spacing | Aggressiveness |
| Active Channels | Email + LinkedIn | Which channels AI uses |
| Messaging Tone | Professional-casual (from Brain) | How AI writes |
| Meeting Booking | Auto-book when positive | Auto vs. ask-before-booking |
| Daily Contact Limit | 50 new leads/day | Max volume |
| Blacklist | Empty | Companies/domains to never contact |
| Escalation Channels | In-app + Slack | HITL notification routing |
| Agent Preset | Balanced Outreach | Agent behavior profile |

### Campaign Overrides

Each campaign setting shows global default + "Customize" toggle.
- **Overrides** show "Custom" badge
- **"Reset to default"** available on any override
- **Visual**: Global defaults muted. Overrides highlighted.

---

## 23. Prospect Deduplication

**Hard rule**: No prospect in multiple campaigns simultaneously.

| Scenario | Behavior | UX |
|----------|----------|-----|
| Extraction finds overlap | Excluded | "Found 50, 4 in Campaign A. Added 46." |
| Manual add of existing | Blocked | "Sarah is in Campaign A. Move her here?" |
| Similar ICP across campaigns | Warning | "ICP overlaps with Campaign A. Some may be excluded." |

**Moving prospects**: "Move to Campaign B" on any row. Full history travels. Timeline entry in both. AI adjusts messaging.

---

## 24. UX Psychology Map

| Principle | Where Applied | How |
|-----------|---------------|-----|
| Labor Illusion (#62) | Domain ingestion, warmup pipeline, research, synthesis | Show AI and infrastructure working live |
| Feedforward (#52) | Warmup dates, email previews, quality checks, next actions | User sees what will happen before it happens |
| IKEA Effect (#88) | Voice calibration, Brain curation, winning copy, feedback | User co-creates AI's knowledge |
| Endowment Effect (#94) | Brain ownership, campaigns, managed infrastructure | System feels personally built |
| Investment Loops (#64) | Brain smarter over time, corrections, warmup accumulates | Switching costs increase naturally |
| Peak-End Rule (#91) | First meeting, warmup complete, milestones | Celebrate peaks |
| Default Bias (#63) | Agent presets, global defaults, smart account selection | Great experience without settings |
| Progressive Disclosure (#7) | Agent config, settings, table groups, timeline depth | Simple default, powerful on demand |
| Spark Effect (#26) | 30% during warmup, 5-min check-ins, Slack approvals | Minimal effort, immediate value |
| Variable Reward (#44) | Real-time table, reply notifications, AI intelligence narration | Unpredictable positive events |
| Goal Gradient (#51) | Brain health, warmup progress, funnel visualization | Progress motivates |
| Curiosity Gap (#32) | "Why this email", campaign comparison, AI reasoning | Users want to understand AI's logic |
| Fresh Start Effect (#61) | New campaigns, weekly digests, warmup completion | Each milestone = new beginning |

---

## 25. Open Questions

### Design Questions

1. **Managed email pricing**: Bundled or billed separately? Affects budget approval UX.
2. **Warmup network**: Own network or third-party? Affects pipeline view detail.
3. **LinkedIn compliance**: How to stay within ToS? Limits, rules, quotas.
4. **Voice AI provider**: Who powers calls? Customizable voice?
5. **WhatsApp templates**: WA requires approved templates. How does this interact with "no templates" principle?
6. **Multi-user Brain editing**: Permission model? Version history?
7. **Prospect table real-time**: Websocket vs. polling? Affects feel and cost.
8. **Mobile experience**: Card-based prospect list with swipe actions?

### Recommended Next Steps

1. **Wireframe the prospect table** — column groups, expand/collapse, row expansion. #1 UI component.
2. **Prototype multi-path onboarding** — test all 4 paths with real users.
3. **Design warmup pipeline view** — novel pattern, needs testing for clarity.
4. **Build Brain UI** — card-based with health score and "Test my knowledge."
5. **Design Conversations inbox** — Needs Attention / AI Handling / Resolved.
6. **Map agent practices to timeline entries** — component library for visible behaviors.
7. **Test 30% early outreach** — validate value-during-warmup experience.
