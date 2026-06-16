import { scrapeWebsite } from '@/lib/scrape'
import { runMarketingBrain } from '@/lib/marketing-brain'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, goal } = body as { url?: string; goal?: string }

    if (!url || typeof url !== 'string') {
      return Response.json({ error: 'url is required' }, { status: 400 })
    }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const site = await scrapeWebsite(parsedUrl.toString())
    const result = await runMarketingBrain(site, goal ?? undefined)

    return Response.json({ success: true, data: result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[marketing-brain]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
