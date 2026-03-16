# OUTBOUND-OCTOPUS.md
# Outbound Octopus — Claude Code Product Specification

> **This is the single source of truth for building Outbound Octopus.**
> Read this entire document before writing any code. Every screen, flow, interaction, and design decision is documented here.

---

## Product Identity

**Outbound Octopus** is a chat-first AI SDR product built by SalesHandy. It removes the process headache of outbound — finding email accounts, finding ICPs, writing emails, setting up warmup, building sequences. We are NOT claiming results. We are eliminating complexity. The user talks to one intelligent companion that handles everything.

**Core Metaphor**: One brain, many arms. An octopus — intelligent, adaptive, reaching everywhere at once. The user is the strategist. The AI is their tireless team.

**Tagline Energy**: "You say who you want to reach. We handle everything else."

---

## The Interface: Chat-First, Everything-In-Chat

### The Big Shift

This is NOT a traditional dashboard with a sidebar and tables. The primary interface is a **single chat box at the center of the screen**. Everything happens through conversation. The AI opens artifacts, previews, tables, and interactive elements **inline in the chat** for the user to review, edit, and approve — right there in the conversation flow.

**Two layers work together:**

1. **The Chat (Command Center)** — ONE continuous conversation thread. Handles ALL campaigns, ALL features, ALL of SalesHandy. User can say "pause Campaign A", "show leads from Campaign B", "set up a new sequence" — all in the same chat. Like Claude's interface — modals, cards, previews, approvals, questions all happen in the chat. No page navigation needed.

2. **SalesHandy UI (Operations Floor)** — The existing SalesHandy navigation still works. Prospect tables, reports, settings, sequences — all accessible via the normal UI. Users who prefer clicking over chatting can use direct controls. Chat and UI are synced — change something in chat, it reflects in UI and vice versa.

**The rule: Chat can do everything. UI can also do everything. User picks their preferred mode.** Chat is for people who want to talk naturally. UI is for people who want to click. Both are first-class citizens.

The chat can handle:
- Everything in current SalesHandy (sequences, email accounts, warmup, lead finder, email verification, etc.)
- Everything new in Outbound Octopus (AI campaigns, ICP generation, unique email writing, multi-channel orchestration, Brain knowledge base, etc.)
- Cross-campaign operations ("pause Campaign A", "compare Campaign A vs B", "show hot leads across all campaigns")
- Running campaign modifications ("change ICP for Campaign B", "increase daily limit on Campaign A")

### The Landing Screen

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   [subtle background: email/outbound vectors, octopus motifs,    │
│    gentle parallax on scroll, lift on hover — soothing,          │
│    not busy. Sand-50 base with ocean-50 accents]                 │
│                                                                  │
│                        🐙                                        │
│                                                                  │
│              What can I help you with?                            │
│                                                                  │
│   ┌──────────────────────────────────────────────────────┐       │
│   │  Tell me what you need...                        [→] │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                  │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│   │ 🎯 Find &   │ │ ✉️ Set up   │ │ 📝 Create a │               │
│   │ reach my    │ │ my email    │ │ sequence    │               │
│   │ ideal leads │ │ accounts    │ │             │               │
│   └─────────────┘ └─────────────┘ └─────────────┘               │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│   │ 🔥 Apply    │ │ 🧠 Build my │ │ 🐙 Launch   │               │
│   │ warmup best │ │ AI Brain    │ │ AI outreach │               │
│   │ practices   │ │             │ │ campaign    │               │
│   └─────────────┘ └─────────────┘ └─────────────┘               │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│   │ 🔍 Analyze  │ │ 📊 AI       │ │ ⚡ I want to│               │
│   │ my current  │ │ column for  │ │ reach 1M    │               │
│   │ setup       │ │ my leads    │ │ prospects   │               │
│   └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                  │
│   ── or just type anything. I handle all of SalesHandy. ──      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### What the Recipes Are

Recipes are **pre-written starting prompts** displayed as clickable cards below the chat input. They are NOT features — they are conversation starters that route to different capabilities. Clicking a recipe fills the chat input with a starting message and sends it.

**Recipe Categories:**

**SalesHandy Core (existing product capabilities)**:
- "Set up my email accounts" → walks through connecting/creating email accounts, DNS, SPF/DKIM/DMARC
- "Create a sequence" → builds an email sequence step by step
- "Apply warmup best practices" → analyzes current accounts, applies optimal warmup settings
- "Create an AI column for my leads" → sets up AI-powered enrichment columns
- "Analyze my current setup" → audits existing sequences, accounts, deliverability health
- "Help me verify my lead list" → email verification flow

**Outbound Octopus AI (new capabilities)**:
- "Find & reach my ideal leads" → ICP definition → lead finding → campaign creation, end to end
- "Build my AI Brain" → guided knowledge base setup (docs, voice, case studies, pricing)
- "Launch AI outreach campaign" → the full campaign creation chat
- "I want to reach 1M prospects this month" → scale planning: infrastructure, accounts, ICP, sequences
- "Learn from my winning emails" → upload emails that converted, AI extracts patterns
- "Find companies like my best customers" → lookalike ICP from customer list

**The Recipe Grid UX:**
- 3-column grid (2 columns on mobile)
- Each card: icon + title (2-3 words) + optional one-line description
- Hover: subtle lift (translateY -2px) + shadow increase + background shifts to ocean-50
- Cards have rounded corners (12px), sand-50 background, sand-200 border
- The grid fades slightly as the user starts typing — attention shifts to the chat
- After the first message is sent, recipes collapse and the chat expands to full height

---

## Background Design: Subtle Vectors & Atmosphere

### Visual Atmosphere

The landing screen and chat background should feel **soothing, intelligent, and alive** without being distracting. Think: a calm ocean surface with subtle movement.

**Background Elements:**

```
LAYER 1 — Base
- Background: Sand-50 (#FAFAF9) — warm, not clinical white
- Very subtle noise texture (1-2% opacity) for depth

LAYER 2 — Geometric Vectors (Email/Outbound Theme)
- Scattered, very low opacity (3-5%) line drawings:
  - Envelope outlines (open and closed)
  - @ symbols
  - Arrow paths (representing sequences/flows)
  - Connection nodes (representing multi-channel reach)
  - Calendar icons (representing meetings booked)
  - Inbox shapes
- Style: single-weight line art, Ocean-200 color at 4% opacity
- Positioned around the edges, NOT behind the chat input
- Slight parallax effect on scroll (elements move at 0.95x speed)

LAYER 3 — Octopus Motifs
- 2-3 very subtle octopus tentacle curves (not literal cartoon octopuses)
  - Abstract, flowing curves that suggest tentacles reaching outward
  - Ocean-100 color at 3-5% opacity
  - One anchored near bottom-left, curving upward
  - One near top-right, curving downward
  - Suggests "reach" without being literal or silly
- On hover over a recipe card, the nearest tentacle vector subtly brightens (8% opacity)
  - This creates a feeling of the octopus "reaching toward" what you're about to do
  - Transition: 600ms ease-out, very gentle

LAYER 4 — Ambient Glow
- Soft radial gradient behind the chat input area:
  - Center: rgba(37, 99, 235, 0.03) — barely perceptible ocean glow
  - Fades to transparent at edges
- Creates a subtle "spotlight" on the chat without a visible circle
```

**Important**: The background should be SO subtle that most users don't consciously notice it. It's felt, not seen. If someone looks closely, they discover the email vectors and octopus curves — that's a delight moment. But it never competes with the chat interface for attention.

**State Changes:**
- When chat is empty (landing): full background visible, recipes prominent
- When user starts typing: background dims slightly (opacity 60%), recipes start fading
- When in active conversation: background is minimal (30% opacity), chat takes full focus
- When AI shows an artifact/preview: background completely fades, artifact gets full attention

---

## Chat Behavior: How Conversations Work

### The Chat is the Product

Every interaction happens in chat. The AI doesn't redirect to other pages, dashboards, or settings screens. Instead, it opens **inline artifacts** — interactive elements rendered directly in the conversation.

### Inline Artifacts (Opened Inside Chat)

When the AI needs to show something complex, it renders an artifact directly in the chat flow. The user interacts with it right there — no page navigation.

**Types of Inline Artifacts:**

| Artifact | When Shown | What It Contains |
|----------|-----------|-----------------|
| **Email Preview Card** | AI drafts an email for review | Full email rendered in a styled card: subject, body, personalization highlights. "Approve", "Edit", "Regenerate" buttons. |
| **Lead Preview Table** | AI finds demo leads | Mini TanStack table: 5-10 sample leads with name, company, title, ICP score. "These look right" / "Adjust targeting" buttons. |
| **ICP Profile Card** | AI generates an ICP | Visual persona card: title, company type, industry, pain points, company size. Edit-in-place fields. |
| **Sequence Builder** | User creates a sequence | Step-by-step sequence visualizer: email steps, wait days, conditions. Inline editing. Add/remove steps. |
| **Email Account Status** | Account setup/review | Account cards showing: email address, warmup status (progress bar), deliverability health, DNS status. |
| **Warmup Pipeline** | During email setup | Progress bars per mailbox: provisioning → warmup → ready. Concrete ready date. |
| **Campaign Summary Card** | Before launching a campaign | ICP, value prop, channels, estimated volume, email accounts selected. "Launch" button. |
| **Brain Knowledge Card** | Adding to Brain | Shows what the AI learned from uploaded docs/URL. Edit/confirm interface. |
| **Brand Voice Samples** | During voice calibration | 3 email samples in different tones. Click to select. Feedback input. |
| **Settings Panel** | When adjusting configuration | Inline settings: sending schedule, daily limits, follow-up cadence. Toggle switches and dropdowns inside the chat. |
| **Analytics Snapshot** | When asking about performance | Meetings booked (big number), reply rate, sentiment breakdown, funnel visualization. All inline. |
| **Prospect Detail** | When discussing a specific lead | Full prospect card: profile, conversation history, AI decisions, next action. |

### How the AI Handles Any Request

The chat should handle requests from simple to massive. Here's the behavior spectrum:

**Simple Requests** (single artifact, immediate):
```
User: "Set up warmup on my email accounts"
AI: "Let me check your accounts..." [shows account status artifact]
    "Accounts 2 and 3 need warmup. I'll configure optimal settings:
     - Daily ramp: 5→50 over 14 days
     - Reply rate target: 30%
     - Warmup hours: 8am-6pm
     [Settings panel artifact with toggles]
     Want me to apply these?"
```

**Medium Requests** (multi-step conversation):
```
User: "Create a sequence for SaaS founders"
AI: "Let's build this. A few questions:
     What's the goal — book a meeting, get a reply, or drive to a page?"
User: "Book meetings"
AI: "Got it. Here's a 4-step sequence optimized for meeting bookings:"
    [Sequence builder artifact]
    "Step 1: Pain-point opener (Day 0)
     Step 2: Value proof follow-up (Day 3)
     Step 3: Social proof nudge (Day 6)
     Step 4: Breakup email (Day 10)
     
     Want me to draft the emails for each step?"
User: "Yes"
AI: [Shows email preview artifact for Step 1]
    "Here's the opener. It leads with the scaling pain point
     and ends with a soft meeting ask."
```

**Massive Requests** (full orchestration):
```
User: "I want to reach 1M new prospects each month"
AI: "That's a serious operation. Let me plan this out.
     I need to understand a few things first:

     1. Who are these prospects? Do you have an ICP, or
        should I help define one?"
User: "We sell HR software to mid-market companies"
AI: "Good start. Let me narrow this down:"
    [ICP Profile Card artifact — editable]
    "Here's what I'd suggest: HR Directors at companies
     with 200-2000 employees, across tech, healthcare,
     and financial services.

     For 1M/month, here's the infrastructure you'll need:"
    [Infrastructure plan artifact]
    "- 200 email accounts across 40 domains
     - Mix of Azure (70%) + Google Workspace (30%)
     - Estimated monthly cost: $X
     - Warmup timeline: 15 days for first batch,
       staggered rollout for the rest
     - Daily sending capacity once warmed: ~35,000/day
     
     Want me to also find sample leads so you can
     see who we'd be reaching?"
User: "Yes show me"
AI: [Lead Preview Table artifact — 10 sample leads]
    "Here are 10 matching prospects. ICP score ranges
     from 78-94. Does this look like your target?"
```

### Conversation Continuity

The chat remembers everything. If a user set up their Brain last week, and now creates a campaign, the AI references what it already knows:

```
User: "Create a new campaign"
AI: "Your Brain already knows your product and voice from
     last week. Let's just define who to target this time.
     
     Last campaign targeted VP Engineering at fintech.
     Same audience, or different?"
```

### SalesHandy Legacy Features in Chat

Every existing SalesHandy feature should be accessible through the chat. The AI translates natural language into product actions:

| User Says | AI Does |
|-----------|---------|
| "Create a sequence" | Opens sequence builder artifact inline |
| "Show my email accounts" | Shows account status cards with health |
| "Apply best practices to my warmup" | Analyzes current settings, shows recommended changes, applies with approval |
| "Add an AI column to my lead list" | Walks through column creation: what data to enrich, which list |
| "Find prospects matching [description]" | Runs lead finder, shows preview table |
| "Verify these emails" | Accepts CSV or list, runs verification, shows results |
| "What's my deliverability like?" | Shows per-account health dashboard inline |
| "Help me write a cold email" | Asks context questions, drafts email, shows preview |
| "Set up my domain DNS" | Walks through SPF/DKIM/DMARC with clear instructions |

---

## The Onboarding Experience (Chat-Based)

### First-Time User Flow

When a new user first opens the product, the chat is empty. The recipes are visible. The background vectors create atmosphere. The AI greets them:

```
AI: "Welcome to Outbound Octopus 🐙

     I'm your AI outreach companion. I handle everything —
     finding the right people, writing unique emails, setting
     up accounts, managing deliverability, booking meetings.

     You tell me who you want to reach. I handle the process.

     What do you have to get started?"

     [4 option cards rendered as chat artifacts]:
     ┌─────────────────────────────────────────┐
     │ 👥 I have existing customers             │
     │ Upload a list → I'll find similar leads  │
     ├─────────────────────────────────────────┤
     │ ✉️ I have winning outreach emails        │
     │ Share them → I'll learn your style       │
     ├─────────────────────────────────────────┤
     │ 📄 I have my website / docs              │
     │ Share a URL → I'll learn your business   │
     ├─────────────────────────────────────────┤
     │ 💬 I just have my knowledge              │
     │ I'll ask questions → build your profile  │
     └─────────────────────────────────────────┘

     Pick one or more. Or just tell me what you need.
```

These are multi-selectable cards. The user can pick combinations. The AI then adapts the conversation flow based on what they selected — exactly as described in the blueprint's 4 onboarding paths.

### The AI Interview (Path D) in Chat

```
AI: "Let's build your profile. I'll ask a few questions —
     answer however you'd like. Casual is fine.

     First: what does your company do? Explain it like
     you'd tell a friend at dinner."

User: "We make project management software for
       construction companies"

AI: "Construction PM software — that's a specific market.
     Love it. A few more:

     Who typically buys this? The owner? A project manager?
     Someone at HQ?"

User: "Usually the operations director or VP of ops"

AI: "Got it. And what's the main problem you solve?
     What are they doing before they find you?"

User: "They're tracking everything in spreadsheets and
       losing money on every project because of bad
       estimates and missed deadlines"

AI: "Spreadsheet chaos → missed deadlines → lost money.
     That's a strong pain point.

     Here's what I've documented so far:"
     [Brain Knowledge Card artifact]
     "Business: Construction project management software
      Target buyer: VP/Director of Operations
      Pain point: Manual spreadsheet tracking causing
      inaccurate estimates and missed deadlines
      Value prop: [AI-generated from conversation]

      Sound right? I'll use this for all your outreach."
```

---

## Multi-Channel: Open Implementation Decisions

### What's Decided

Email is **fully native** — SalesHandy's core. Complete sending, warmup, deliverability, reply handling stack.

### What's NOT Decided

For LinkedIn, phone, WhatsApp, and SMS — the implementation model is still open:

| Channel | Possible Models | Decision Status |
|---------|----------------|-----------------|
| LinkedIn | Native, third-party automation partner, or task creation | ⚠️ Open |
| Phone/Calling | AI voice via provider (Bland/Vapi), task creation for human callers, or external dialer integration | ⚠️ Open |
| WhatsApp | WhatsApp Business API, third-party messaging platform, or task creation | ⚠️ Open |
| SMS | Native via Twilio/similar, or task creation | ⚠️ Open |

### Three Implementation Models

**Model A: Fully Native** — We own execution. Best UX. Highest investment. Email today.

**Model B: Third-Party Integration** — Partner executes via API. Feels native to user. Partner invisible.

**Model C: Task Creation** — AI does all thinking (who, when, what to say). Creates task with content ready. User or external tool executes. Fastest to ship.

**Recommended**: Ship task creation at launch for non-email channels. Build native/third-party in parallel. Each channel graduates independently.

### Task-Based Channels in Chat

When the AI creates a task for a non-native channel, it shows it inline:

```
AI: "Sarah Chen is showing high engagement — opened your
     email 3 times. I'd normally call her now, but phone
     is in task mode. Here's what I've prepared:"

     [Phone Task Card artifact]
     "📞 Call Task: Sarah Chen, VP Eng at Acme Corp
      Best time: Now (she just opened your email)
      Phone: +1-555-0142

      Talking Points:
      • Reference the email about their scaling challenges
      • Their engineering team grew 40% this year
      • Ask about their current deployment process
      • If interested: offer Thursday 2pm meeting

      Objection Handling (from Brain):
      • 'We use [Competitor]' → [approved rebuttal]
      • 'Not the right time' → [snooze and re-engage]

      [Mark as Called] [Skip] [Snooze]"
```

---

## The Workspace Brain

### Brain in Chat Context

The Brain is built and maintained through chat, but also has a dedicated view accessible via navigation. In chat, Brain interactions feel natural:

```
User: "I just got a great case study from a customer"
AI: "Nice! Share it with me — paste the text, upload a PDF,
     or give me a link. I'll add it to your Brain and
     reference it when reaching similar prospects."

User: [uploads PDF]

AI: [Brain Knowledge Card artifact]
    "Added: Acme Corp case study
     Industry: Construction
     Key result: 40% reduction in project overruns
     
     I'll reference this when reaching out to construction
     companies. Your Brain health is now 78%."
```

### Brain Answers Prospect Questions Autonomously

```
[In the Conversations/inbox view]

Prospect: "How much does your enterprise plan cost?"

AI (autonomous reply): "Thanks for asking! Our enterprise
plan starts at $X/month for teams of 50+. It includes
[features from Brain]. Happy to walk you through what
would make sense for your team size — want to hop on
a quick call?"

[Tagged in timeline: "Answered from Brain: Pricing"]
[User can review, correct, or approve on next check-in]
```

---

## The Prospect Table (After Campaign Launch)

Once a campaign is active, the chat transitions to show the prospect table as the primary operational view. But the chat is always accessible — it slides in as a panel from the right or bottom.

### Three Column Groups (Expandable/Collapsible)

**Group 1: Prospect Info** (Name column always pinned)
- Name (clickable → prospect detail in chat panel)
- Company
- Title
- ICP Score (0-100, color-coded)
- Location

**Group 2: Outreach Status**
- Channel (icons: solid = AI executed, outlined with dot = task ready for user)
- Step ("Follow-up 2 of 3")
- Last Action (timestamp)
- Status (Researching / Contacted / Replied / Meeting Booked / Escalated / Snoozed / Paused)

**Group 3: Engagement Signals**
- Opens (count)
- Clicks (count)
- Replies (count + sentiment dot: green/yellow/red)
- Sentiment (Positive / Neutral / Negative / OOO)

### Row Expansion
Click prospect → inline detail: profile, conversation thread, AI decisions, next action preview with approve/edit/skip.

---

## Conversations (Global Inbox)

Every inbound reply across all campaigns. Unified view.

### Three States
- **Needs Attention**: Escalated. Coral accent. AI paused, waiting for human.
- **AI Handling**: Autonomous. Visible but not highlighted. User can review.
- **Resolved**: Outcome reached (meeting, decline, unsubscribe).

**Headline**: "Your AI is handling 47 conversations. 3 need your attention."

---

## Agent Configuration

### Presets (Beginners)
- Balanced Outreach: All agents, email + LinkedIn primary, 3 follow-ups, auto-book
- Email-First: Email primary, others as fallback
- Multi-Channel Blitz: All max, parallel, 5 follow-ups
- Warm & Steady: Slower, more personalization, ask before booking

### Granular (Power Users)
"Customize individual agents" toggle reveals per-agent config for all 8 agents.

---

## Agent Best Practices → Visible in Chat & Timeline

| Agent Behavior | User Sees |
|----------------|-----------|
| Lead Extraction validates emails | "47 found, 3 invalid removed. 44 verified." |
| Orchestrator prevents concurrent sending | "Holding LinkedIn — email sent 2h ago." |
| Orchestrator acts on real-time engagement | "Sarah just opened. Calling now." |
| Orchestrator matches optimal time | "Sent 10:14am — Sarah's peak hour." |
| Context Synthesizer avoids superficial hooks | "Referenced hiring push, not funding." |
| Voice Agent pivots mid-call | "Tom driving. Email in 60 seconds." |
| Orchestrator snoozes OOO | "Sarah out until March 15. Re-engaging then." |

---

## Copy Quality Gate

Hard block with three options:
1. **"Let AI fix it"** (default) — side-by-side, one-click approve
2. **"Rewrite myself"** — inline editor with AI hints
3. **"Send anyway"** (reason required) — AI learns, logged

**Framing**: NEVER "This failed." ALWAYS "I held this back because it might not land well."

---

## Unique Email Generation

Every email is unique. Zero templates. 9 context layers:
1. Role & responsibilities (Lead Extraction + LinkedIn)
2. Company situation (Context Synthesizer)
3. Industry pain points (Brain + ICP)
4. Social signals (LinkedIn, blogs, podcasts)
5. Previous interactions (conversation history)
6. Brand voice (Brain)
7. Case studies (Brain)
8. Campaign angle (campaign chat)
9. Winning copy patterns (Brain)

"Why this email" expandable on every sent message shows AI reasoning.

---

## Prospect Deduplication

Hard rule: no prospect in multiple campaigns. System blocks overlaps:
- "Found 50 leads, 4 already in Campaign A. Added 46."
- Manual add blocked: "Sarah is in Campaign A. Move her here?"
- Move between campaigns: full history travels.

---

## Human-in-the-Loop

### Control Spectrum
- **Full Autonomy**: Approved emails, channel pivots, voicemails, Brain-confident answers
- **Informed Autonomy**: Channel selection, A/B testing, timing optimization
- **Collaborative**: Quality-blocked drafts, complex escalations, calendar conflicts, Brain gaps
- **Human Override**: Manual reply, pause campaign, edit ICP, correct Brain

### Escalation Behavior
- Lead is **PAUSED**. No timeout. No fallback. Human decides.
- Notifications via user's preferred channels (in-app, Slack, email)
- Delegation to teammates when unavailable

---

## Email Infrastructure & Warmup Pipeline

### Two Paths
- **Bring Your Own**: Connect Gmail/Outlook via OAuth. System checks health.
- **Managed Setup**: System buys domains, creates mailboxes, handles warmup.
  - Provider options: Azure (budget), Google Workspace (premium), mixed, custom
  - One-click budget approval

### Warmup Pipeline
- 5 stages: Provisioning → Early Warmup → Mid → Late → Ready
- Progress bar per mailbox with concrete ready date
- "All mailboxes ready by [date]"

### 30% Volume Bridge
Users start at 30% capacity immediately using pre-warmed accounts. System auto-scales as mailboxes complete warmup. Value from day one.

---

## Integrations

### Slack
- Escalation notifications with Approve/Edit/Skip buttons
- Thread-based per escalation
- Daily/weekly digests

### CRM
- Salesforce, HubSpot, Pipedrive
- Bidirectional sync, duplicate detection, owned-lead handling

---

## Settings Architecture

### Global Defaults (Org Level)

| Setting | Default |
|---------|---------|
| Sending Schedule | Mon-Fri, 9-5 prospect local time |
| Follow-up Cadence | 3 follow-ups, 3/5/7 day spacing |
| Active Channels | Email + LinkedIn |
| Messaging Tone | Professional-casual (from Brain) |
| Meeting Booking | Auto-book when positive |
| Daily Contact Limit | 50 new leads/day |
| Blacklist | Empty |
| Escalation Channels | In-app + Slack |
| Agent Preset | Balanced Outreach |

### Campaign Overrides
Each campaign can override any global default. Shows "Custom" badge. "Reset to default" available.

---

## Visual Design System

### Colors
```css
/* Primary — Ocean Blue */
--ocean-900: #0A1628;  /* Sidebar, dark backgrounds */
--ocean-500: #2563EB;  /* Primary actions, buttons, links */
--ocean-50:  #EFF6FF;  /* Light backgrounds, hover states */

/* Neutrals — Warm Sand (NOT cold gray) */
--sand-50:  #FAFAF9;   /* Page background */
--sand-200: #E7E5E4;   /* Borders */
--sand-600: #57534E;   /* Body text */

/* Functional Accents (one job each) */
--mint:    #3CCBA0;    /* Success, healthy, active */
--amber:   #F59E0B;    /* Warming, in progress, caution */
--coral:   #F97066;    /* Needs attention, errors */
--lavender:#8B5CF6;    /* Milestones, meetings, celebrations */
```

**Rule**: Blue acts. Green confirms. Amber waits. Coral asks.

### Typography
```css
--font-display: 'DM Serif Display', Georgia, serif;  /* Headlines, celebrations */
--font-body:    'DM Sans', sans-serif;                /* Everything else */
--font-mono:    'JetBrains Mono', monospace;          /* Data, scores, timestamps */
```

### Chat Styling
- AI avatar: 🐙 on gradient background (Ocean-500 → Mint)
- AI bubbles: white, sand-200 border, rounded (16px), left-aligned
- User bubbles: Ocean-500 solid, white text, right-aligned
- Typing indicator: 3 bouncing dots (not "thinking..." text)
- Message entrance: fade-up 300ms ease-out, 100ms stagger
- Artifacts: rendered as full-width cards within the chat flow, sand-50 bg, sand-200 border, 16px radius

### Background Vectors
- Email/outbound line-art vectors at 3-5% opacity
- Abstract octopus tentacle curves at 3-5% opacity
- Hover on recipe cards brightens nearest vector to 8%
- Background dims as conversation starts (60% → 30%)
- Transitions: 600ms ease-out

### Motion
- **Fast (150ms)**: Hover states, focus rings
- **Normal (250ms)**: Button state changes, card lifts
- **Slow (400ms)**: Panel slides, modal entrances
- **Entrance (600ms)**: Page load, major state changes
- **Stagger (80-120ms)**: Consecutive items
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1) for everything
- **Spring**: cubic-bezier(0.34, 1.56, 0.64, 1) for celebrations only
- **NEVER**: bounce on errors, spin UI elements, animations > 800ms

### Spacing
- When in doubt, add more space
- Card padding: 24px
- Section gaps: 48-64px
- Table rows: 52px minimum height
- Chat messages: 16px gap between messages

---

## Emotional Design

| Moment | Emotion | Design |
|--------|---------|--------|
| Landing screen | Curiosity + calm | Soothing vectors, welcoming headline, recipe cards |
| AI learns from URL/docs | Amazement | Live processing feed, checkmarks appearing |
| First campaign launched | Anticipation | Prospect table populates live |
| First email sent | Relief + trust | Row updates, expand to see unique email |
| AI narrates smart decision | Deep trust | "Called because she opened 3 min ago" |
| First meeting booked | Celebration | Confetti (once only), prominent card |
| Brain reaches 100% | Completeness | Health bar fills green |

### Celebration Budget
- Confetti: ONE TIME ONLY (first meeting ever)
- Subsequent meetings: green pulse on counter
- Milestones (10th, 25th): special card with lavender accent
- Over-celebrating devalues moments. Restraint is key.

---

## Product Positioning

**We are NOT claiming**: guaranteed meetings, specific conversion rates, or outcomes.

**We ARE removing**: the process headache. Finding email accounts. Finding ICPs. Writing emails. Setting up warmup. Building sequences. Managing deliverability. Handling replies. Coordinating channels.

**The user's job**: Tell us who they want to reach. Review what matters. Book the meeting.

**Our job**: Everything else.

---

## Key Principles for Development

1. **Chat is the product.** Every feature, old and new, is accessible through conversation.
2. **Artifacts render inline.** No page navigation. Everything opens in the chat flow.
3. **The AI leads with intelligence.** It suggests before it asks. It shows understanding before it requests input.
4. **One voice.** The user talks to one entity. Multiple agents work behind the scenes.
5. **Org once, campaign many.** Brand voice, Brain, infrastructure — set up once. Campaigns are lightweight.
6. **Every email is unique.** 9 context layers. Zero templates. Always.
7. **Human authority on edge cases.** Pause, ask, wait. No timeouts. No rogue actions.
8. **Show the AI's intelligence.** Every smart decision is narrated. Trust compounds.
9. **Calm confidence everywhere.** Warm sand neutrals. Generous spacing. Gentle motion. Never alarm.
10. **5-minute daily check-in.** If users spend > 10 minutes daily, the product is failing.