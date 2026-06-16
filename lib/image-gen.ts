import OpenAI from 'openai'
import type { MarketingBrainResult } from './marketing-brain'

const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
})

export interface CreativeItem {
  imageData: string
  hook: string
  headline: string
  cta: string
  businessName: string
  benefits: string[]
  variant: number
  size: string
}

// ─── Theme → lighting & color grade (NOT the subject) ───────────────────────
const THEME_LIGHTING: Record<string, string> = {
  't-dark-prem':    'moody dark studio lighting, deep shadows, dramatic chiaroscuro, premium black tones',
  't-neon-cyber':   'electric purple and cyan accent rim lighting, dark environment, glowing neon reflections on skin/surfaces',
  't-fire':         'warm red-orange backlight, intense dramatic warmth, powerful golden-hour style',
  't-ocean':        'cool blue-teal environmental lighting, calm professional atmosphere, soft diffused light',
  't-gold':         'warm gold and amber lighting, rich metallic reflections, luxury editorial feel',
  't-clean':        'bright clean white studio lighting, airy, natural daylight feel, sharp shadows',
  't-forest':       'natural green-toned ambient light, organic soft shadows, earthy color grade',
  't-sunset':       'warm amber and coral sunset backlighting, golden hour, cinematic warmth',
  't-purple-storm': 'deep purple tonal lighting, atmospheric depth, dramatic backlight',
  't-rose':         'soft rose-pink diffused lighting, cinematic pastel tones, warm and intimate',
}

// ─── Platform → frame & composition ─────────────────────────────────────────
const PLATFORM_COMP: Record<string, string> = {
  meta:    'square frame, subject centered or rule-of-thirds, close-up to mid-shot, strong eye-level connection',
  google:  'horizontal wide frame, subject left-aligned, clean negative space on right for text',
  tiktok:  'vertical portrait frame, dynamic close-up, bold expressive composition, subject fills frame',
}

// ─── Derive the character from ICP ──────────────────────────────────────────
function deriveCharacter(brain: MarketingBrainResult): string {
  const demo   = brain.icp.demographics.toLowerCase()
  const type   = brain.business.type.toLowerCase()
  const psycho = brain.icp.psychographics.toLowerCase()

  const ageMatch = brain.icp.demographics.match(/(\d+)[^0-9]+(\d+)/)
  const age = ageMatch ? `${ageMatch[1]}–${ageMatch[2]} years old` : '35–45 years old'

  // B2B / SaaS / Software / Agency / Platform
  if (/saas|software|platform|agency|b2b|enterprise|dashboard|crm|tool|app/.test(type)) {
    const gender = /female|woman|women/.test(demo) ? 'woman' : /male|man|men/.test(demo) ? 'man' : 'person'
    return `A professional ${age} ${gender}, business casual clothing, sitting at a modern desk with a laptop and multiple monitors showing graphs and dashboards. Their face shows a moment of focused confidence — they are in control, things are working. Clean open-plan office with soft background blur.`
  }

  // Ecommerce / Fashion / Apparel / Brand
  if (/ecommerce|fashion|apparel|clothing|brand|style|boutique/.test(type)) {
    const gender = /female|woman|women/.test(demo) ? 'stylish woman' : /male|man|men/.test(demo) ? 'stylish man' : 'stylish person'
    return `A ${age} ${gender}, wearing premium trendy clothing, in an aspirational urban lifestyle setting — modern apartment, city street, or curated studio. Their expression is confident and effortlessly cool. The clothing or product is prominently visible.`
  }

  // Home services / Roofing / Construction / Contractor
  if (/roof|home|house|contractor|plumb|hvac|electr|construction|repair|renovation/.test(type)) {
    return `A ${age} homeowner — relaxed, casually dressed — standing in front of or inside their home. Their face shows relief and satisfaction. Bright suburban or residential environment. The home looks well-maintained and safe.`
  }

  // Health / Wellness / Fitness / Medical
  if (/health|wellness|fitness|gym|medical|supplement|diet|nutrition|therapy/.test(type)) {
    const gender = /female|woman|women/.test(demo) ? 'woman' : /male|man|men/.test(demo) ? 'man' : 'person'
    return `A ${age} ${gender} radiating vitality and confidence — active, glowing skin, genuine smile. In a clean gym, wellness space, or bright outdoor setting. They look like the after, not the before. The picture of what the customer wants to become.`
  }

  // Food / Restaurant / Cafe
  if (/restaurant|food|cafe|catering|meal|cuisine|chef|bakery/.test(type)) {
    return `A beautifully plated dish or food product as the hero subject — professional food photography style, macro details, steam or freshness visible. Warm, appetizing lighting. Real, artisan feel.`
  }

  // Finance / Insurance / Investment / Legal
  if (/financ|insurance|invest|legal|law|accounting|tax|mortgage|loan/.test(type)) {
    const gender = /female|woman|women/.test(demo) ? 'woman' : /male|man|men/.test(demo) ? 'man' : 'person'
    return `A confident ${age} ${gender} in professional attire, standing or seated in a sleek modern office. Their expression is calm, assured, and in control. Background shows subtle signs of prosperity — clean desk, city view, or professional environment.`
  }

  // Real estate
  if (/real estate|property|realtor|realty|home buy|home sell/.test(type)) {
    return `A ${age} couple or individual standing outside a beautiful home, smiling and holding keys or paperwork. Expression of joy and pride. The home is attractive and aspirational. Bright natural daylight.`
  }

  // Education / Coaching / Training
  if (/educat|coach|training|course|learn|mentor|tutor/.test(type)) {
    const gender = /female|woman|women/.test(demo) ? 'woman' : 'person'
    return `A ${age} ${gender} looking engaged and motivated — studying, taking notes, or looking at a screen with a focused but excited expression. Bright, clean learning environment. The transformation is visible in their confident posture.`
  }

  // Fallback — use ICP primary description
  return `A ${age} person matching this profile: "${brain.icp.primary}". Photographed in their natural environment, authentic expression that shows either the pain they feel or the relief/success of having solved it. Relatable, real, human.`
}

// ─── Derive the scene / moment from hook and angle ──────────────────────────
function deriveScene(brain: MarketingBrainResult, hookIdx: number): string {
  const hook   = brain.hooks?.[hookIdx] ?? ''
  const angle  = brain.recommendedAngles?.[0]?.angle ?? ''
  const pain   = brain.painPoints?.[0] ?? ''
  const trigger = brain.buyingTriggers?.[0] ?? ''
  const h = hook.toLowerCase()

  // Question hook → show the pain moment (relatable)
  if (h.startsWith('"think') || h.startsWith('"still') || h.startsWith('"are you') || h.startsWith('"is your') || h.startsWith('"do you')) {
    return `The scene captures the relatable frustration moment — the person is experiencing the pain: "${pain}". Their expression is subtly stressed or concerned but still composed and recognizable. Lighting is slightly cooler or moodier to match the tension.`
  }

  // Finally / No more / Done with → show the breakthrough/after moment
  if (h.includes('finally') || h.includes('no more') || h.includes('done with') || h.includes('stop') || h.includes('never again')) {
    return `The scene captures a breakthrough moment — the person has just discovered the solution. Expression shifts from relief to confident excitement. Lighting is warm and energizing. This is the "after" moment.`
  }

  // ROI / results / money / growth → show success
  if (h.includes('roi') || h.includes('revenue') || h.includes('growth') || h.includes('results') || h.includes('profit') || angle.toLowerCase().includes('roi')) {
    return `The scene shows measurable success — graphs going up on a screen, a satisfied smile, or a moment of celebration. The person is reviewing positive results. Confident body language. Premium environment suggesting achievement.`
  }

  // Default: aspirational success / transformation moment
  return `The scene shows the aspirational outcome — the person is experiencing the benefit of the product/service: "${trigger}". Their posture is open, confident, and satisfied. The environment reflects success and ease. This is the life the customer wants.`
}

// ─── Build the final image prompt ────────────────────────────────────────────
function buildPrompt(
  brain: MarketingBrainResult | null,
  theme: string,
  platform: string,
  hookIdx: number,
  fallbackContext: string
): string {
  const lighting = THEME_LIGHTING[theme] ?? THEME_LIGHTING['t-dark-prem']
  const comp     = PLATFORM_COMP[platform] ?? PLATFORM_COMP['meta']

  if (!brain) {
    return `Professional advertising background photograph for: ${fallbackContext}. A relatable human subject in a relevant environment, authentic expression. ${lighting}. ${comp}. The bottom 40% of the image must fade to near-black so white text can be overlaid. CRITICAL: NO text, NO words, NO letters, NO logos, NO watermarks anywhere.`
  }

  const character = deriveCharacter(brain)
  const scene     = deriveScene(brain, hookIdx)

  return `Hyper-realistic professional advertising BACKGROUND photograph for a ${brain.business.type}.

SUBJECT:
${character}

SCENE & EMOTIONAL MOMENT:
${scene}

LIGHTING & COLOR GRADE:
${lighting}. Cinematic color grading. The upper portion of the image is vivid and clear — this is where the emotion lives. The bottom 40% of the image gradually darkens into deep shadow or near-black, creating a natural dark canvas for white text to be overlaid on top.

FRAMING & COMPOSITION:
${comp}. Subject is positioned in the upper-center or upper-left of the frame, looking slightly toward the camera. The lower third of the frame is intentionally less busy — this reserved space is where ad copy text will appear.

PRODUCTION QUALITY:
Professional camera, 85mm portrait lens, shallow depth of field. Ultra-high resolution. Magazine advertising quality. Cinematic.

⚠️ ABSOLUTE NON-NEGOTIABLE RULE: ZERO text, ZERO words, ZERO letters, ZERO numbers, ZERO logos, ZERO watermarks, ZERO signs with writing ANYWHERE in this image. Any text ruins the image completely. This is a background photo — all copy is added externally.`
}

// ─── Derive 3 short benefit bullets from brain ───────────────────────────────
function deriveBenefits(brain: MarketingBrainResult, hookIdx: number): string[] {
  const raw: string[] = []

  // Pull from recommendedOffers — these are already positive statements
  const offers = brain.recommendedOffers ?? []
  for (const o of offers.slice(0, 3)) {
    // Trim long offers to a punchy phrase (split on " — " or "," and take first part)
    const short = o.split(/[—–,]/)[0].trim()
    raw.push(short.length > 52 ? short.slice(0, 50) + '…' : short)
  }

  // If fewer than 3, pull from pain points (flip to benefit framing)
  const pains = brain.painPoints ?? []
  const painBenefits = pains
    .slice(0, 3)
    .map(p => {
      const s = p.split(/[.!?,]/)[0].trim()
      return s.length > 52 ? s.slice(0, 50) + '…' : s
    })

  while (raw.length < 3 && painBenefits.length > 0) {
    raw.push(painBenefits.shift()!)
  }

  return raw.slice(0, 3)
}

// ─── Generate one creative ───────────────────────────────────────────────────
export async function generateSingleCreative(
  brain: MarketingBrainResult | null,
  theme: string,
  platform: string,
  primarySize: string,
  hookIdx: number,
  fallbackContext: string
): Promise<CreativeItem> {
  const prompt       = buildPrompt(brain, theme, platform, hookIdx, fallbackContext)
  const hook         = brain?.hooks?.[hookIdx] ?? `Variant ${hookIdx + 1}`
  const headline     = brain?.headlines?.[Math.min(hookIdx, (brain.headlines?.length ?? 1) - 1)] ?? ''
  const cta          = brain?.ctas?.[Math.min(hookIdx, (brain.ctas?.length ?? 1) - 1)] ?? 'Learn More'
  const businessName = brain?.business?.name ?? ''
  const benefits     = brain ? deriveBenefits(brain, hookIdx) : []

  const response = await grok.images.generate({
    model: 'grok-imagine-image-quality',
    prompt,
    n: 1,
  })

  const imgData = response.data?.[0]
  if (!imgData) throw new Error('No image returned')

  const imageData = imgData.b64_json
    ? `data:image/png;base64,${imgData.b64_json}`
    : imgData.url ?? ''

  if (!imageData) throw new Error('Empty image data returned')

  return { imageData, hook, headline, cta, businessName, benefits, variant: hookIdx + 1, size: primarySize }
}
