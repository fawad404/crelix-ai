'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'
import type { MarketingBrainResult } from '@/lib/marketing-brain'
import type { CreativeItem } from '@/lib/image-gen'

const META_SIZES = [
  { size: '1080×1080', name: 'Feed Square' },
  { size: '1200×628', name: 'Feed Landscape' },
  { size: '1080×1350', name: 'Feed Portrait' },
  { size: '1080×1920', name: 'Story / Reels' },
  { size: '1080×1080-c', name: 'Carousel Card' },
]

const BRAIN_STEPS = [
  { label: 'Business Brain', desc: 'Identifying what you sell and who you serve…' },
  { label: 'Customer Brain', desc: 'Mapping real customer pain points and desires…' },
  { label: 'Offer Brain', desc: 'Building irresistible offer and angle recommendations…' },
  { label: 'Creative Brain', desc: 'Writing hooks, headlines, and CTAs…' },
  { label: 'Testing Brain', desc: 'Selecting best platforms and prioritizing angles…' },
]

const GEN_STEPS = [
  'Composing visual scene…',
  'Rendering lighting and atmosphere…',
  'Applying brand aesthetic…',
  'Finalizing production quality…',
]

export default function StudioPage() {
  const [urlTab, setUrlTab] = useState<'url' | 'upload'>('url')
  const [activeTheme, setActiveTheme] = useState('t-neon-cyber')
  const [activePlat, setActivePlat] = useState('meta')
  const [selectedSizes, setSelectedSizes] = useState(['1080×1080', '1080×1350', '1080×1920'])
  const [variants, setVariants] = useState(4)

  // Marketing Brain
  const [brainUrl, setBrainUrl] = useState('https://novaapparel.io')
  const [brainGoal, setBrainGoal] = useState('')
  const [brainLoading, setBrainLoading] = useState(false)
  const [brainStep, setBrainStep] = useState(0)
  const [brainResult, setBrainResult] = useState<MarketingBrainResult | null>(null)
  const [brainError, setBrainError] = useState('')
  const [brainTab, setBrainTab] = useState<'intel' | 'copy'>('intel')
  const brainTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Creative Generation
  const [generating, setGenerating] = useState(false)
  const [genStep, setGenStep] = useState(0)
  const [creatives, setCreatives] = useState<CreativeItem[]>([])
  const [genError, setGenError] = useState('')
  const [activeCreative, setActiveCreative] = useState<CreativeItem | null>(null)
  const genTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const toggleSize = (s: string) =>
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  function startStepCycle(
    setter: (n: number) => void,
    total: number,
    interval: number,
    timerRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  ) {
    setter(0)
    let i = 0
    timerRef.current = setInterval(() => {
      i = (i + 1) % total
      setter(i)
    }, interval)
  }

  useEffect(() => () => {
    if (brainTimer.current) clearInterval(brainTimer.current)
    if (genTimer.current) clearInterval(genTimer.current)
  }, [])

  async function runBrain() {
    if (!brainUrl.trim()) return
    setBrainLoading(true)
    setBrainError('')
    setBrainResult(null)
    startStepCycle(setBrainStep, BRAIN_STEPS.length, 1800, brainTimer)

    try {
      const res = await fetch('/api/marketing-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: brainUrl, goal: brainGoal }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Analysis failed')
      setBrainResult(json.data)
    } catch (err) {
      setBrainError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBrainLoading(false)
      if (brainTimer.current) clearInterval(brainTimer.current)
    }
  }

  const generateCreatives = useCallback(async () => {
    setGenerating(true)
    setGenError('')
    setCreatives([])
    setActiveCreative(null)
    startStepCycle(setGenStep, GEN_STEPS.length, 3500, genTimer)

    setTimeout(() => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)

    try {
      const res = await fetch('/api/generate-creatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: brainUrl,
          goal: brainGoal,
          theme: activeTheme,
          platform: activePlat,
          primarySize: selectedSizes[0] ?? '1080×1080',
          variants,
          brain: brainResult,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Generation failed')
      setCreatives(json.creatives)
      setActiveCreative(json.creatives[0] ?? null)
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setGenerating(false)
      if (genTimer.current) clearInterval(genTimer.current)
    }
  }, [brainUrl, brainGoal, activeTheme, activePlat, selectedSizes, variants, brainResult])

  function downloadCreative(item: CreativeItem) {
    const a = document.createElement('a')
    a.href = item.imageData
    a.download = `crelix-creative-v${item.variant}-${item.size.replace('×', 'x')}.png`
    a.click()
  }

  return (
    <>
      <Navbar active="studio" />
      <main>
        {/* ── HERO ── */}
        <section className="studio-hero-v2">
          <div className="container">
            <span className="eyebrow reveal">The Studio</span>
            <h1 className="reveal" data-delay="1">
              Your AI Marketing Brain<br /><span className="grad-text">runs before anything else.</span>
            </h1>
            <p className="lead reveal" data-delay="2">
              Paste your URL. Crelix maps your ICP, pain points, best angles, and winning hooks — then generates scroll-stopping creatives built on that intelligence.
            </p>
          </div>
        </section>

        {/* ── STEP 1: MARKETING BRAIN ── */}
        <section className="brain-section">
          <div className="container">
            <div className="studio-step-label reveal">
              <span className="step-badge">Step 1</span>
              <span className="step-name">Run your Marketing Brain</span>
              <span className="step-opt">Recommended — unlocks intelligent creatives</span>
            </div>

            <div className="brain-panel reveal">
              <div className="brain-panel-head">
                <div className="brain-panel-title">
                  <div className="brain-icon-wrap">
                    <i data-lucide="brain-circuit"></i>
                  </div>
                  <div>
                    <h2 className="brain-panel-h">Marketing Brain</h2>
                    <p className="brain-panel-sub">AI intelligence layer that analyzes your business before a single ad is generated</p>
                  </div>
                </div>
                <div className="brain-badges">
                  <span className="brain-badge"><i data-lucide="zap"></i> Grok Research</span>
                  <span className="brain-badge"><i data-lucide="cpu"></i> Claude Synthesis</span>
                </div>
              </div>

              <div className="brain-input-row">
                <div className="brain-url-wrap">
                  <i data-lucide="globe"></i>
                  <input
                    className="brain-url-input"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={brainUrl}
                    onChange={e => setBrainUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && runBrain()}
                  />
                </div>
                <input
                  className="brain-goal-input"
                  type="text"
                  placeholder="Campaign goal (optional) — e.g. Black Friday, lead gen, B2B demo"
                  value={brainGoal}
                  onChange={e => setBrainGoal(e.target.value)}
                />
                <button
                  className="btn btn-primary brain-run-btn"
                  onClick={runBrain}
                  disabled={brainLoading || !brainUrl.trim()}
                >
                  {brainLoading
                    ? <><i data-lucide="loader-circle" className="spin"></i> Analyzing…</>
                    : <><i data-lucide="brain-circuit"></i> Run Marketing Brain</>}
                </button>
              </div>

              {/* Brain loading */}
              {brainLoading && (
                <div className="brain-loading">
                  <div className="brain-steps">
                    {BRAIN_STEPS.map((s, i) => (
                      <div key={s.label} className={`brain-step${i === brainStep ? ' active' : i < brainStep ? ' done' : ''}`}>
                        <div className="bst-dot">
                          {i < brainStep
                            ? <i data-lucide="check" style={{ width: 12, height: 12 }}></i>
                            : i === brainStep
                              ? <i data-lucide="loader-circle" className="spin" style={{ width: 12, height: 12 }}></i>
                              : <span>{i + 1}</span>}
                        </div>
                        <div className="bst-text">
                          <span className="bst-label">{s.label}</span>
                          {i === brainStep && <span className="bst-desc">{s.desc}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {brainError && (
                <div className="brain-error">
                  <i data-lucide="alert-circle"></i> {brainError}
                </div>
              )}

              {/* Brain results */}
              {brainResult && !brainLoading && (
                <div className="brain-results">
                  <div className="brain-summary-bar">
                    <div className="bsb-item">
                      <span className="bsb-label">Business</span>
                      <span className="bsb-val">{brainResult.business.name}</span>
                    </div>
                    <div className="bsb-div"></div>
                    <div className="bsb-item">
                      <span className="bsb-label">Type</span>
                      <span className="bsb-val">{brainResult.business.type}</span>
                    </div>
                    <div className="bsb-div"></div>
                    <div className="bsb-item">
                      <span className="bsb-label">Primary ICP</span>
                      <span className="bsb-val">{brainResult.icp.primary}</span>
                    </div>
                    <div className="bsb-div bsb-div-hide"></div>
                    <div className="bsb-item bsb-item-hide">
                      <span className="bsb-label">Best Platform</span>
                      <span className="bsb-val">{brainResult.recommendedPlatforms[0]?.platform}</span>
                    </div>
                  </div>

                  <div className="brain-insight">
                    <i data-lucide="lightbulb"></i>
                    <p><strong>Key Insight:</strong> {brainResult.messagingInsight}</p>
                  </div>

                  <div className="brain-tabs">
                    <button className={brainTab === 'intel' ? 'sel' : ''} onClick={() => setBrainTab('intel')}>
                      <i data-lucide="bar-chart-2"></i> Intelligence
                    </button>
                    <button className={brainTab === 'copy' ? 'sel' : ''} onClick={() => setBrainTab('copy')}>
                      <i data-lucide="pencil-line"></i> Ad Copy
                    </button>
                  </div>

                  {brainTab === 'intel' && (
                    <div className="brain-intel-grid">
                      <div className="brain-intel-card">
                        <div className="bic-head"><i data-lucide="heart-crack"></i><h4>Pain Points</h4></div>
                        <ul className="bic-list">
                          {brainResult.painPoints?.map((p, i) => <li key={i}><i data-lucide="arrow-right"></i>{p}</li>)}
                        </ul>
                      </div>
                      <div className="brain-intel-card">
                        <div className="bic-head"><i data-lucide="shield-x"></i><h4>Purchase Blockers</h4></div>
                        <ul className="bic-list">
                          {brainResult.objections?.map((o, i) => <li key={i}><i data-lucide="arrow-right"></i>{o}</li>)}
                        </ul>
                      </div>
                      <div className="brain-intel-card">
                        <div className="bic-head"><i data-lucide="flame"></i><h4>Buying Triggers</h4></div>
                        <ul className="bic-list">
                          {brainResult.buyingTriggers?.map((t, i) => <li key={i}><i data-lucide="arrow-right"></i>{t}</li>)}
                        </ul>
                      </div>
                      <div className="brain-intel-card brain-intel-card-wide">
                        <div className="bic-head"><i data-lucide="target"></i><h4>Recommended Ad Angles</h4></div>
                        <div className="bic-angles">
                          {brainResult.recommendedAngles?.map((a, i) => (
                            <div key={i} className="bic-angle">
                              <span className="bic-angle-num">{i + 1}</span>
                              <div><strong>{a.angle}</strong><p>{a.why}</p></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="brain-intel-card">
                        <div className="bic-head"><i data-lucide="layout-grid"></i><h4>Platform Strategy</h4></div>
                        <div className="bic-platforms">
                          {brainResult.recommendedPlatforms?.map((p, i) => (
                            <div key={i} className="bic-plat">
                              <span className={`bic-plat-badge ${p.priority}`}>{p.priority}</span>
                              <strong>{p.platform}</strong>
                              <p>{p.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="brain-intel-card">
                        <div className="bic-head"><i data-lucide="gift"></i><h4>Offer Ideas</h4></div>
                        <ul className="bic-list">
                          {brainResult.recommendedOffers?.map((o, i) => <li key={i}><i data-lucide="arrow-right"></i>{o}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {brainTab === 'copy' && (
                    <div className="brain-copy-grid">
                      <div className="brain-copy-card brain-copy-card-full">
                        <div className="bcc-head">
                          <i data-lucide="zap"></i>
                          <h4>Scroll-Stopping Hooks</h4>
                          <span className="bcc-sub">These hooks will be used as your creative variants</span>
                        </div>
                        <div className="bcc-hooks">
                          {brainResult.hooks?.map((h, i) => (
                            <div key={i} className="bcc-hook">
                              <span className="bcc-hook-num">{i + 1}</span>
                              <p>{h}</p>
                              <button className="bcc-copy" onClick={() => navigator.clipboard?.writeText(h)} title="Copy">
                                <i data-lucide="copy" style={{ width: 14, height: 14 }}></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="brain-copy-card">
                        <div className="bcc-head"><i data-lucide="type"></i><h4>Headlines</h4></div>
                        <div className="bcc-items">
                          {brainResult.headlines?.map((h, i) => (
                            <div key={i} className="bcc-item">
                              <p>{h}</p>
                              <button className="bcc-copy" onClick={() => navigator.clipboard?.writeText(h)} title="Copy">
                                <i data-lucide="copy" style={{ width: 14, height: 14 }}></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="brain-copy-card">
                        <div className="bcc-head"><i data-lucide="mouse-pointer-click"></i><h4>Call-to-Actions</h4></div>
                        <div className="bcc-items">
                          {brainResult.ctas?.map((c, i) => (
                            <div key={i} className="bcc-item">
                              <p>{c}</p>
                              <button className="bcc-copy" onClick={() => navigator.clipboard?.writeText(c)} title="Copy">
                                <i data-lucide="copy" style={{ width: 14, height: 14 }}></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="brain-results-footer">
                    <span className="brain-results-note">
                      <i data-lucide="check-circle-2"></i> Intelligence loaded — your creatives will be built on this
                    </span>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setBrainResult(null); setBrainError('') }}>
                      <i data-lucide="rotate-ccw"></i> Run new analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── STEP 2: CONFIGURE CREATIVE ── */}
        <section>
          <div className="container">
            <div className="studio-step-label reveal">
              <span className="step-badge">Step 2</span>
              <span className="step-name">Configure your creative</span>
              <span className="step-opt">Choose theme, platform, and sizes</span>
            </div>

            <div className="studio-board">
              {/* 01 Website & Context */}
              <div className="sc sc-half reveal">
                <div className="sc-head"><span className="sc-num">01</span><h3 className="sc-title">Website &amp; Context</h3></div>
                <p className="sc-desc">Paste your website URL. Crelix uses the same URL as the Marketing Brain above.</p>
                <div className="url-tabs">
                  <button className={urlTab === 'url' ? 'sel' : ''} onClick={() => setUrlTab('url')}><i data-lucide="link-2"></i> URL</button>
                  <button className={urlTab === 'upload' ? 'sel' : ''} onClick={() => setUrlTab('upload')}><i data-lucide="image-up"></i> Product Upload</button>
                </div>
                <div className="field-block">
                  <label>Website URL <span className="opt">*</span></label>
                  <div className="input-icon">
                    <i data-lucide="globe"></i>
                    <input className="text-input" type="url" placeholder="https://yourbrand.com" value={brainUrl} onChange={e => setBrainUrl(e.target.value)} />
                  </div>
                </div>
                <div className="field-block">
                  <label>Campaign goal <span className="opt">(optional)</span></label>
                  <textarea className="text-input" placeholder="Bold, premium, urgent — Black Friday push…" value={brainGoal} onChange={e => setBrainGoal(e.target.value)}></textarea>
                </div>
              </div>

              {/* 02 Color Theme */}
              <div className="sc sc-half reveal" data-delay="1">
                <div className="sc-head"><span className="sc-num">02</span><h3 className="sc-title">Color Theme</h3><span className="sc-pill">Optional</span></div>
                <p className="sc-desc">Pick one of 10 curated themes — or let Crelix auto-match the website&apos;s own colors.</p>
                <div className="themes-grid">
                  {[
                    { key: 't-dark-prem', label: 'Dark Premium', dark: true },
                    { key: 't-neon-cyber', label: 'Neon Cyber', dark: true },
                    { key: 't-fire', label: 'Fire & Power', dark: true },
                    { key: 't-ocean', label: 'Ocean Depth', dark: true },
                    { key: 't-gold', label: 'Golden Luxury', dark: true },
                    { key: 't-clean', label: 'Clean Light', dark: false },
                    { key: 't-forest', label: 'Forest Power', dark: true },
                    { key: 't-sunset', label: 'Sunset Warm', dark: true },
                    { key: 't-purple-storm', label: 'Purple Storm', dark: true },
                    { key: 't-rose', label: 'Rose Power', dark: true },
                  ].map(t => (
                    <div key={t.key} className={`theme-swatch ${t.dark ? 'dark' : 'light'} ${t.key}${activeTheme === t.key ? ' sel' : ''}`} onClick={() => setActiveTheme(t.key)}>
                      <span>{t.label}</span><span className="check"><i data-lucide="check" style={{ width: 12, height: 12 }}></i></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Reference Images */}
              <div className="sc sc-third reveal">
                <div className="sc-head"><span className="sc-num">03</span><h3 className="sc-title">Reference Images</h3><span className="sc-pill">Max 5</span></div>
                <p className="sc-desc">Drop brand assets, product photos, or inspiration shots.</p>
                <div className="dropzone-lg">
                  <div className="ico"><i data-lucide="image-plus"></i></div>
                  <div className="dz-title">Click to upload images</div>
                  <div className="dz-sub">JPG, PNG, WebP · Max 5MB each · 0/5</div>
                </div>
              </div>

              {/* 04 Brand Logo */}
              <div className="sc sc-third reveal" data-delay="1">
                <div className="sc-head"><span className="sc-num">04</span><h3 className="sc-title">Brand Logo</h3><span className="sc-pill">Optional</span></div>
                <p className="sc-desc">Composited onto the final image pixel-perfect.</p>
                <div className="dropzone-lg">
                  <div className="ico"><i data-lucide="upload"></i></div>
                  <div className="dz-title">Upload your logo</div>
                  <div className="dz-sub">PNG with transparent background recommended</div>
                </div>
              </div>

              {/* 05 Select Platform */}
              <div className="sc sc-third reveal" data-delay="2">
                <div className="sc-head"><span className="sc-num">05</span><h3 className="sc-title">Select Platform</h3></div>
                <p className="sc-desc">Pick where the campaign runs. Sizes adapt automatically.</p>
                <div className="plat-list">
                  {[
                    { key: 'meta', label: 'Meta Ads', spec: '12 sizes', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" /></svg> },
                    { key: 'google', label: 'Google Ads', spec: '16 sizes', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> },
                    { key: 'tiktok', label: 'TikTok Ads', spec: '8 sizes', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52V6.46a4.85 4.85 0 0 1-1.84-.27z" /></svg> },
                  ].map(p => (
                    <button key={p.key} className={`plat-row${activePlat === p.key ? ' sel' : ''}`} onClick={() => setActivePlat(p.key)}>
                      <span className="plat-icon">{p.icon}</span>{p.label}<span className="plat-spec">{p.spec}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 06 Select Ad Size */}
              <div className="sc reveal" data-delay="3">
                <div className="sc-head"><span className="sc-num">06</span><h3 className="sc-title">Select Ad Size</h3><span className="sc-pill">Meta Ads</span></div>
                <p className="sc-desc">Every native size for every platform — no manual resizing.</p>
                <div className="size-tabs-v2">
                  <button className="sel">Meta</button><button>Google</button><button>TikTok</button>
                </div>
                <div className="size-list">
                  {META_SIZES.map(r => (
                    <div key={r.size} className={`row-v2${selectedSizes.includes(r.size) ? ' sel' : ''}`} onClick={() => toggleSize(r.size)}>
                      <div className="sn-left">
                        <span className="sn-check">{selectedSizes.includes(r.size) && <i data-lucide="check" style={{ width: 12, height: 12 }}></i>}</span>
                        <span className="sn-name">{r.name}</span>
                      </div>
                      <span className="sn-dim">{r.size.replace('-c', '')} px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate dock */}
            <div className="generate-dock reveal">
              <div className="left">
                <div className="l1">
                  <span>{selectedSizes.length} size{selectedSizes.length !== 1 ? 's' : ''}</span>
                  {brainResult
                    ? <> · <span style={{ color: 'var(--c-purple)', fontWeight: 600 }}><i data-lucide="brain-circuit" style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }}></i>Marketing Brain loaded</span></>
                    : ' · ready to generate'}
                </div>
                <div className="l2">
                  Generating <b>{variants} variants</b> for <b>{selectedSizes[0]}</b> · ~30–60 seconds
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div className="variants-control">
                  <button onClick={() => setVariants(v => Math.max(1, v - 1))} disabled={variants <= 1}>−</button>
                  <span>{variants} variants</span>
                  <button onClick={() => setVariants(v => Math.min(4, v + 1))} disabled={variants >= 4}>+</button>
                </div>
                <button className="btn btn-ghost btn-lg"><i data-lucide="settings-2"></i> Advanced</button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={generateCreatives}
                  disabled={generating || !brainUrl.trim()}
                >
                  {generating
                    ? <><i data-lucide="loader-circle" className="spin"></i> Generating…</>
                    : <><i data-lucide="sparkles"></i> Generate creatives</>}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEP 3: CREATIVE GALLERY ── */}
        <section ref={galleryRef} className="gallery-section">
          <div className="container">
            <div className="studio-step-label">
              <span className="step-badge">Step 3</span>
              <span className="step-name">Your AI creatives</span>
              {creatives.length > 0 && (
                <span className="step-opt">{creatives.length} variant{creatives.length !== 1 ? 's' : ''} generated · {creatives[0]?.size}</span>
              )}
            </div>

            {/* Generating state */}
            {generating && (
              <div className="gen-loading">
                <div className="gen-loading-inner">
                  <div className="gen-spinner">
                    <div className="gen-ring"></div>
                    <div className="gen-ring-2"></div>
                    <i data-lucide="sparkles" className="gen-spark"></i>
                  </div>
                  <div className="gen-loading-text">
                    <h3>Creating your {variants} ad creatives</h3>
                    <p className="gen-step-text">{GEN_STEPS[genStep]}</p>
                  </div>
                  <div className="gen-skeletons">
                    {Array.from({ length: variants }).map((_, i) => (
                      <div key={i} className="gen-skeleton">
                        <div className="gen-skeleton-img"></div>
                        <div className="gen-skeleton-line"></div>
                        <div className="gen-skeleton-line short"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {genError && !generating && (
              <div className="gen-error">
                <i data-lucide="alert-triangle"></i>
                <div>
                  <strong>Generation failed</strong>
                  <p>{genError}</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={generateCreatives}>
                  <i data-lucide="rotate-ccw"></i> Try again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!generating && !genError && creatives.length === 0 && (
              <div className="gen-empty">
                <div className="gen-empty-ico"><i data-lucide="image"></i></div>
                <h3>Your creatives will appear here</h3>
                <p>Configure your creative above and click <strong>Generate creatives</strong> to start.</p>
                {!brainResult && (
                  <p className="gen-empty-tip">
                    <i data-lucide="lightbulb"></i> Tip: Run the Marketing Brain first for intelligent, hook-driven creatives.
                  </p>
                )}
              </div>
            )}

            {/* Results */}
            {creatives.length > 0 && !generating && (
              <div className="creatives-layout">
                {/* Main preview */}
                {activeCreative && (
                  <div className="creative-main">
                    {/* Ad mockup card */}
                    <div className="ad-mockup">
                      {/* Platform bar (like a real Facebook/Instagram post) */}
                      <div className="ad-mockup-bar">
                        <div className="ad-mockup-avatar">
                          {activeCreative.businessName ? activeCreative.businessName[0].toUpperCase() : 'B'}
                        </div>
                        <div className="ad-mockup-meta">
                          <span className="ad-mockup-name">{activeCreative.businessName || 'Your Business'}</span>
                          <span className="ad-mockup-sponsored">Sponsored · <i data-lucide="globe-2" style={{width:11,height:11,verticalAlign:'middle'}}></i></span>
                        </div>
                        <div className="ad-mockup-dots">···</div>
                      </div>

                      {/* Image with full ad text overlay */}
                      <div className="ad-mockup-img-wrap">
                        <Image
                          src={activeCreative.imageData}
                          alt={activeCreative.hook}
                          fill
                          className="ad-mockup-img"
                          unoptimized
                        />
                        {/* Complete ad overlay: brand + hook + benefits + CTA */}
                        <div className="ad-overlay">
                          {/* Brand name top-left */}
                          <div className="ad-overlay-brand-bar">
                            <span className="ad-overlay-brand-dot"></span>
                            <span className="ad-overlay-brand-name">{activeCreative.businessName}</span>
                          </div>

                          {/* Bottom copy block */}
                          <div className="ad-overlay-bottom">
                            {activeCreative.headline && (
                              <div className="ad-overlay-eyebrow">{activeCreative.headline}</div>
                            )}
                            <div className="ad-overlay-hook">{activeCreative.hook}</div>

                            {activeCreative.benefits.length > 0 && (
                              <ul className="ad-overlay-benefits">
                                {activeCreative.benefits.map((b, i) => (
                                  <li key={i}>
                                    <span className="ad-benefit-check">✓</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            <button className="ad-overlay-cta">{activeCreative.cta || 'Learn More'}</button>
                          </div>
                        </div>

                        {/* Size badge */}
                        <div className="ad-size-badge">{activeCreative.size} · V{activeCreative.variant}</div>
                      </div>

                      {/* Facebook-style bottom card */}
                      <div className="ad-mockup-footer">
                        <div className="ad-mockup-footer-text">
                          <div className="ad-mockup-domain">{brainUrl.replace(/https?:\/\/(www\.)?/, '').split('/')[0].toUpperCase()}</div>
                          <div className="ad-mockup-hook-preview">{activeCreative.businessName} — {activeCreative.benefits[0] || activeCreative.hook}</div>
                        </div>
                        <button className="ad-mockup-cta-btn">{activeCreative.cta || 'Learn More'}</button>
                      </div>
                    </div>
                    <div className="creative-main-actions">
                      <div className="creative-main-copy">
                        <div className="cmc-label">Hook</div>
                        <div className="cmc-text">{activeCreative.hook}</div>
                        {activeCreative.headline && (
                          <>
                            <div className="cmc-label" style={{ marginTop: 10 }}>Headline</div>
                            <div className="cmc-text">{activeCreative.headline}</div>
                          </>
                        )}
                        {activeCreative.cta && (
                          <>
                            <div className="cmc-label" style={{ marginTop: 10 }}>CTA</div>
                            <div className="cmc-text">{activeCreative.cta}</div>
                          </>
                        )}
                      </div>
                      <div className="creative-main-btns">
                        <button className="btn btn-primary" onClick={() => downloadCreative(activeCreative)}>
                          <i data-lucide="download"></i> Download PNG
                        </button>
                        <button className="btn btn-ghost" onClick={() => navigator.clipboard?.writeText(activeCreative.hook)}>
                          <i data-lucide="copy"></i> Copy hook
                        </button>
                        <button className="btn btn-ghost" onClick={generateCreatives}>
                          <i data-lucide="refresh-cw"></i> Regenerate all
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Variant strip */}
                <div className="creative-strip">
                  <div className="creative-strip-label">All {creatives.length} variants</div>
                  <div className="creative-thumbs">
                    {creatives.map(c => (
                      <div
                        key={c.variant}
                        className={`creative-thumb${activeCreative?.variant === c.variant ? ' active' : ''}`}
                        onClick={() => setActiveCreative(c)}
                      >
                        <div className="ct-img-wrap">
                          <Image src={c.imageData} alt={c.hook} fill className="ct-img" unoptimized />
                          <div className="ct-hook-overlay">
                            <div className="ct-hook-text">{c.hook}</div>
                          </div>
                        </div>
                        <div className="ct-label">Variant {c.variant}</div>
                        <button className="ct-dl" onClick={e => { e.stopPropagation(); downloadCreative(c) }} title="Download">
                          <i data-lucide="download" style={{ width: 13, height: 13 }}></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tips */}
        <section className="section-narrow">
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Tips for great creatives</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>Three minutes here saves a week of revisions.</h2>
            </div>
            <div className="features reveal">
              {[
                { icon: 'brain-circuit', title: 'Run Brain first', desc: 'The Marketing Brain unlocks your best hooks and angles before a pixel is generated. Always run it first.' },
                { icon: 'image', title: 'Use product on white', desc: 'Transparent or white-background product shots composite cleanest. Avoid busy backgrounds.' },
                { icon: 'palette', title: 'Pick your theme', desc: 'Theme drives the visual mood of the entire creative. Neon Cyber for tech, Golden Luxury for premium, Clean Light for wellness.' },
                { icon: 'layers', title: 'Start with 1 platform', desc: 'Get one platform looking great, then duplicate and re-export for others. Faster iteration.' },
                { icon: 'badge-check', title: 'Upload a transparent logo', desc: 'PNG with transparency gives the cleanest comp. SVG works too — vector means perfect at any size.' },
                { icon: 'zap', title: 'Generate 4 variants', desc: 'Each variant uses a different hook. Keep the best one, regenerate the rest. Beats one-shot prompting.' },
              ].map(f => (
                <div key={f.title} className="feature">
                  <div className="ico-sq"><i data-lucide={f.icon}></i></div>
                  <h3>{f.title}</h3><p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="cta-block reveal">
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ background: 'rgba(255,255,255,0.85)', width: 24, height: 1, display: 'inline-block', marginRight: 8 }}></span>Free to start
              </span>
              <h2 style={{ marginTop: 14 }}>Stop briefing. Start shipping.</h2>
              <p className="lead">First 5 generations are on us. No card needed.</p>
              <div className="row">
                <Link href="/pricing" className="btn btn-primary btn-lg">See pricing <i data-lucide="arrow-right"></i></Link>
                <Link href="/showcase" className="btn btn-ghost btn-lg"><i data-lucide="image"></i> See showcase</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LucideInit />
      <RevealInit />
    </>
  )
}
