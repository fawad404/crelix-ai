import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import type { SiteContent } from './scrape'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
})

export interface MarketingBrainResult {
  business: {
    name: string
    type: string
    description: string
    keyProducts: string[]
  }
  icp: {
    primary: string
    demographics: string
    psychographics: string
  }
  painPoints: string[]
  objections: string[]
  buyingTriggers: string[]
  recommendedAngles: Array<{ angle: string; why: string }>
  recommendedPlatforms: Array<{ platform: string; reason: string; priority: 'primary' | 'secondary' | 'optional' }>
  recommendedOffers: string[]
  hooks: string[]
  headlines: string[]
  ctas: string[]
  messagingInsight: string
  industryIntelligence: string
}

// Business Brain + Customer Brain — powered by Grok
async function runBusinessAndCustomerBrain(site: SiteContent, goal?: string): Promise<string> {
  const response = await grok.chat.completions.create({
    model: 'grok-4.20-0309-non-reasoning',
    messages: [
      {
        role: 'system',
        content:
          'You are a market intelligence expert who deeply understands consumer psychology, category dynamics, and what drives purchase decisions in every industry. You study businesses with the eye of a direct-response copywriter who has run $100M+ in ad spend.',
      },
      {
        role: 'user',
        content: `Analyze this business and return deep market intelligence.

URL: ${site.url}
Title: ${site.title}
Meta Description: ${site.description}
H1: ${site.h1}
Website Content: ${site.content.slice(0, 2200)}
${goal ? `Campaign Goal: ${goal}` : ''}

Return HIGHLY SPECIFIC intelligence (not generic marketing advice) about:

1. BUSINESS TYPE — Exact classification (e.g. "Local residential roofing contractor" not "service business")
2. IDEAL CUSTOMER PROFILE — Who is buying this, why, when, in what life situation
3. TOP 5 CUSTOMER PAIN POINTS — The real fears, frustrations, anxieties this customer carries (in their own words if possible)
4. TOP 3 PURCHASE BLOCKERS — Why people want to buy but don't pull the trigger
5. URGENCY TRIGGERS — What specific events make someone search for and buy this RIGHT NOW
6. EMOTIONAL LANGUAGE — Real words and phrases customers use when they're desperate for this solution
7. COMPETITOR FAILURES — What people complain about regarding other businesses in this category
8. MESSAGING INSIGHT — The single most powerful emotional truth that should drive all ad copy for this business

Be specific. Be direct. This analysis will drive real ad creative generation.`,
      },
    ],
    max_tokens: 1200,
  })

  return response.choices[0].message.content ?? ''
}

const MARKETING_BRAIN_TOOL: Anthropic.Tool = {
  name: 'marketing_brain_output',
  description: 'Structured Marketing Brain output for ad creative generation',
  input_schema: {
    type: 'object' as const,
    properties: {
      business: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          description: { type: 'string', description: '1-2 sentence description of what they do and who they serve' },
          keyProducts: { type: 'array', items: { type: 'string' }, description: 'Top 3 products or services' },
        },
        required: ['name', 'type', 'description', 'keyProducts'],
      },
      icp: {
        type: 'object',
        properties: {
          primary: { type: 'string', description: 'Primary ICP in one clear sentence' },
          demographics: { type: 'string', description: 'Age, role, life situation' },
          psychographics: { type: 'string', description: 'What they fear, want, and believe' },
        },
        required: ['primary', 'demographics', 'psychographics'],
      },
      painPoints: {
        type: 'array',
        items: { type: 'string' },
        description: 'Top 5 customer pain points, most powerful first — specific not generic',
      },
      objections: {
        type: 'array',
        items: { type: 'string' },
        description: 'Top 3 reasons prospects hesitate or do not buy',
      },
      buyingTriggers: {
        type: 'array',
        items: { type: 'string' },
        description: 'Top 3 specific events or realizations that make someone buy NOW',
      },
      recommendedAngles: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            angle: { type: 'string' },
            why: { type: 'string', description: 'Why this angle works for this specific business' },
          },
          required: ['angle', 'why'],
        },
        description: '3 recommended ad angles with specific reasoning',
      },
      recommendedPlatforms: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            platform: { type: 'string' },
            reason: { type: 'string' },
            priority: { type: 'string', enum: ['primary', 'secondary', 'optional'] },
          },
          required: ['platform', 'reason', 'priority'],
        },
        description: 'Platform recommendations with reasoning — most relevant first',
      },
      recommendedOffers: {
        type: 'array',
        items: { type: 'string' },
        description: '3 specific offer ideas that would convert well for this business',
      },
      hooks: {
        type: 'array',
        items: { type: 'string' },
        description: '5 scroll-stopping ad hooks — ready-to-use opening lines, not templates',
      },
      headlines: {
        type: 'array',
        items: { type: 'string' },
        description: '3 high-converting ad headlines',
      },
      ctas: {
        type: 'array',
        items: { type: 'string' },
        description: '3 call-to-action options ranging from soft to direct',
      },
      messagingInsight: {
        type: 'string',
        description: 'The single most important insight that must drive all messaging for this business',
      },
      industryIntelligence: {
        type: 'string',
        description: 'Brief 2-3 sentence summary of the key industry context used in this analysis',
      },
    },
    required: [
      'business', 'icp', 'painPoints', 'objections', 'buyingTriggers',
      'recommendedAngles', 'recommendedPlatforms', 'recommendedOffers',
      'hooks', 'headlines', 'ctas', 'messagingInsight', 'industryIntelligence',
    ],
  },
}

// Creative Brain + Offer Brain + Testing Brain — powered by Claude
async function runCreativeBrain(
  site: SiteContent,
  industryIntelligence: string,
  goal?: string
): Promise<MarketingBrainResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    tools: [MARKETING_BRAIN_TOOL],
    tool_choice: { type: 'tool', name: 'marketing_brain_output' },
    messages: [
      {
        role: 'user',
        content: `You are an elite direct-response marketing strategist. Build a complete Marketing Brain for this business that will power AI ad creative generation.

WEBSITE: ${site.url}
TITLE: ${site.title}
H1: ${site.h1}
CONTENT: ${site.content.slice(0, 2000)}
${goal ? `CAMPAIGN GOAL: ${goal}` : ''}

MARKET INTELLIGENCE (from business + customer analysis):
${industryIntelligence}

Your job: synthesize all of this into a structured Marketing Brain.

Rules:
- Every pain point must feel real, not corporate. Use the customer's internal monologue.
- Hooks must be ready to paste into an ad. No placeholders like [PRODUCT NAME].
- Platforms must be specific to this business's actual buyer behavior.
- The messaging insight must be the one thing a copywriter needs to know above all else.
- Be ruthlessly specific to THIS business, not the category in general.

Think like the world's best DR copywriter who has studied this market for 10 years.`,
      },
    ],
  })

  const toolBlock = response.content.find((c): c is Anthropic.ToolUseBlock => c.type === 'tool_use')
  if (!toolBlock) throw new Error('Claude did not return structured output')

  return normalizeBrainResult(toolBlock.input as MarketingBrainResult)
}

// Claude's tool-use output isn't strictly type-checked against the schema, so
// array fields occasionally come back as a string or object instead of an array.
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(v => (typeof v === 'string' ? v : JSON.stringify(v)))
  if (typeof value === 'string') return [value]
  if (value && typeof value === 'object') return Object.values(value).map(v => String(v))
  return []
}

function normalizeBrainResult(result: MarketingBrainResult): MarketingBrainResult {
  return {
    ...result,
    business: { ...result.business, keyProducts: toStringArray(result.business?.keyProducts) },
    painPoints: toStringArray(result.painPoints),
    objections: toStringArray(result.objections),
    buyingTriggers: toStringArray(result.buyingTriggers),
    recommendedOffers: toStringArray(result.recommendedOffers),
    hooks: toStringArray(result.hooks),
    headlines: toStringArray(result.headlines),
    ctas: toStringArray(result.ctas),
    recommendedAngles: Array.isArray(result.recommendedAngles) ? result.recommendedAngles : [],
    recommendedPlatforms: Array.isArray(result.recommendedPlatforms) ? result.recommendedPlatforms : [],
  }
}

export async function runMarketingBrain(
  site: SiteContent,
  goal?: string
): Promise<MarketingBrainResult> {
  const [industryIntelligence] = await Promise.all([
    runBusinessAndCustomerBrain(site, goal),
  ])

  const result = await runCreativeBrain(site, industryIntelligence, goal)
  return result
}
