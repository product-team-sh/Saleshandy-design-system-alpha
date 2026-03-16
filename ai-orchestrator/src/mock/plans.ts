import { CampaignPlan } from '@/types/plan';

export const mockPlans: Record<string, CampaignPlan> = {
  'plan-001': {
    id: 'plan-001',
    campaignId: 'camp-001',
    steps: [
      {
        index: 0,
        channel: 'email',
        action: 'Send personalized initial outreach email',
        subject: 'Quick question about {{company}} growth, {{firstName}}',
        content:
          'Hi {{firstName}},\n\nI noticed {{company}} recently closed a Series A — congrats! Scaling a sales team post-raise is one of the trickiest parts, and I thought this might be relevant.\n\nWe help SaaS companies like yours automate outbound prospecting without sacrificing personalization. Teams using Saleshandy typically see 3x more qualified meetings within the first month.\n\nWould you be open to a 15-minute call this week to see if it could be a fit?\n\nBest,\n{{senderFirstName}}',
        delayDays: 0,
      },
      {
        index: 1,
        channel: 'linkedin',
        action: 'Send LinkedIn connection request with note',
        content:
          'Hi {{firstName}}, I came across {{company}} and love what you are building in the {{industry}} space. Would be great to connect and share some ideas on scaling outbound. — {{senderFirstName}}',
        delayDays: 1,
      },
      {
        index: 2,
        channel: 'email',
        action: 'Send follow-up email with social proof',
        subject: 'Re: Quick question about {{company}} growth, {{firstName}}',
        content:
          'Hi {{firstName}},\n\nJust following up on my last note. Wanted to share a quick stat — one of our customers in a similar space booked 47 meetings in their first 30 days using our AI-assisted sequences.\n\nI put together a short breakdown of how they did it. Worth a 10-minute look?\n\nHappy to send it over or walk you through it live.\n\n{{senderFirstName}}',
        delayDays: 3,
        conditions: 'If no reply to Step 0',
      },
      {
        index: 3,
        channel: 'voice',
        action: 'Place a brief intro call',
        content:
          'Call script: "Hi {{firstName}}, this is {{senderFirstName}} from Saleshandy. I sent you an email a few days ago about helping {{company}} scale outbound — I saw you opened it and wanted to quickly check if it caught your interest. Do you have 2 minutes?"',
        delayDays: 5,
        conditions: 'If opened email but no reply to any previous step',
      },
      {
        index: 4,
        channel: 'email',
        action: 'Send breakup email',
        subject: 'Closing the loop, {{firstName}}',
        content:
          'Hi {{firstName}},\n\nI have reached out a few times and I do not want to be a bother. I will assume the timing is not right.\n\nIf scaling outbound becomes a priority down the line, feel free to reach out — I am always happy to help.\n\nWishing you and the {{company}} team continued success.\n\nBest,\n{{senderFirstName}}',
        delayDays: 9,
        conditions: 'If no reply to any previous step',
      },
    ],
    estimatedDuration: '9 days',
    totalProspects: 245,
  },
};
