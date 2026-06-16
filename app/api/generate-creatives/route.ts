import { generateSingleCreative, type CreativeItem } from '@/lib/image-gen'
import type { MarketingBrainResult } from '@/lib/marketing-brain'

// Allow up to 5 minutes for image generation
export const maxDuration = 300

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      url?: string
      goal?: string
      theme?: string
      platform?: string
      primarySize?: string
      variants?: number
      brain?: MarketingBrainResult | null
    }

    const {
      url = '',
      goal = '',
      theme = 't-dark-prem',
      platform = 'meta',
      primarySize = '1080×1080',
      variants = 4,
      brain = null,
    } = body

    const count = Math.min(Math.max(variants, 1), 4)
    const fallback = `${url} — ${goal}`.trim()

    // Generate all variants in parallel
    const promises = Array.from({ length: count }, (_, i) =>
      generateSingleCreative(brain, theme, platform, primarySize, i, fallback)
        .then(result => ({ status: 'fulfilled' as const, result }))
        .catch(err => ({
          status: 'rejected' as const,
          error: err instanceof Error ? err.message : 'Generation failed',
          variant: i + 1,
        }))
    )

    const settled = await Promise.all(promises)

    const creatives: CreativeItem[] = []
    const errors: string[] = []

    for (const s of settled) {
      if (s.status === 'fulfilled') {
        creatives.push(s.result)
      } else {
        errors.push(`Variant ${s.variant}: ${s.error}`)
      }
    }

    if (creatives.length === 0) {
      return Response.json(
        { error: `All generations failed. ${errors.join('; ')}` },
        { status: 500 }
      )
    }

    return Response.json({ success: true, creatives, errors })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[generate-creatives]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
