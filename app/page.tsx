'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'

const DEMOS = [
  {
    url: 'https://roofingnow.com',
    industry: 'Roofing Company',
    icp: 'Homeowners 35–65, post-storm event',
    pain: 'Hidden damage they cannot see',
    angle: 'Emergency urgency + trust signals',
    platform: 'Meta + Google',
    hook: '"Think your roof survived the last storm? Most damage is invisible from the ground."',
  },
  {
    url: 'https://novaapparel.io',
    industry: 'Ecommerce Brand',
    icp: 'Fashion-forward buyers 25–40',
    pain: 'Tired of cheap Amazon knockoffs',
    angle: 'Premium authenticity + social proof',
    platform: 'Instagram + TikTok',
    hook: '"Finally, a product that solves the problem without the cheap Amazon feeling."',
  },
  {
    url: 'https://harborsupply.com',
    industry: 'B2B SaaS',
    icp: 'Ops managers, 50–500 employee teams',
    pain: 'Manual follow-up, dropped balls',
    angle: 'ROI + automation efficiency',
    platform: 'LinkedIn + Google',
    hook: '"Still managing customer follow-up manually? Automate the work your team keeps forgetting."',
  },
]

export default function HomePage() {
  const [demoIdx, setDemoIdx] = useState(0)
  const [brainReady, setBrainReady] = useState(false)
  const [studioTab, setStudioTab] = useState<'url'|'upload'>('url')
  const [activeTheme, setActiveTheme] = useState('t-neon-cyber')
  const [activePlatRow, setActivePlatRow] = useState('meta')
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['1080×1080','1080×1350','1080×1920'])

  useEffect(() => {
    const init = setTimeout(() => setBrainReady(true), 600)
    const cycle = setInterval(() => {
      setBrainReady(false)
      setDemoIdx(prev => (prev + 1) % DEMOS.length)
      setTimeout(() => setBrainReady(true), 750)
    }, 4200)
    return () => { clearTimeout(init); clearInterval(cycle) }
  }, [])

  const toggleSize = (size: string) =>
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])

  const demo = DEMOS[demoIdx]

  return (
    <>
      <Navbar active="" />
      <main id="top">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="hero-badge reveal">
                  <span className="chip">New</span>
                  <span>Marketing intelligence + creative generation, powered by AI</span>
                </div>
                <h1 className="reveal" data-delay="1">
                  AI that <span className="hl"><span className="grad-text">understands your business</span></span><br />before it creates your ads.
                </h1>
                <p className="hero-sub reveal" data-delay="2">
                  Crelix analyzes your market, offer, customers, and competitors — then creates ads, hooks, and full campaigns built around what actually makes people buy.
                </p>
                <div className="hero-cta reveal" data-delay="3">
                  <Link href="/studio" className="btn btn-primary btn-lg">
                    Get my AI Marketing Brain <i data-lucide="brain"></i>
                  </Link>
                  <Link href="#how" className="btn btn-ghost btn-lg">
                    <i data-lucide="play"></i> See how it works
                  </Link>
                </div>
                <div className="hero-meta reveal" data-delay="4">
                  <span><i data-lucide="check"></i> No credit card</span>
                  <span><i data-lucide="check"></i> 5 AI Brains</span>
                  <span><i data-lucide="check"></i> Campaign-ready in &lt;60s</span>
                </div>
              </div>

              {/* Hero Visual — Marketing Brain Card */}
              <div className="hero-visual reveal" data-delay="2">
                <div className="float-chip tl"><span className="ico"><i data-lucide="brain"></i></span>Marketing Brain active</div>
                <div className="float-chip ml"><span className="ico"><i data-lucide="target"></i></span>ICP identified</div>
                <div className="float-chip br"><span className="ico"><i data-lucide="zap"></i></span>Campaign in 24s</div>

                <div className="preview-card">
                  <div className="preview-head">
                    <div className="preview-head-left">
                      <div className="dot-row">
                        <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                      </div>
                      <span className="preview-head-title">crelix.ai / analyze</span>
                    </div>
                    <span className={`preview-head-pill${brainReady ? '' : ' mb-analyzing-pill'}`}>
                      {brainReady ? '✓ Brain Ready' : 'Analyzing…'}
                    </span>
                  </div>
                  <div className="preview-body">
                    <div className="field field-stack">
                      <span className="field-label">Business URL · {demo.industry}</span>
                      <div className="prev-url-wrap">
                        <i data-lucide="globe"></i>
                        <span className="url">{demo.url}<span className="cursor"></span></span>
                      </div>
                    </div>

                    <div className={`mb-output${brainReady ? ' mb-visible' : ''}`}>
                      <div className="mb-label"><i data-lucide="brain"></i> Marketing Brain Analysis</div>
                      <div className="mb-grid">
                        <div className="mb-card">
                          <span className="mb-key"><i data-lucide="target"></i> ICP</span>
                          <span className="mb-val">{demo.icp}</span>
                        </div>
                        <div className="mb-card">
                          <span className="mb-key"><i data-lucide="alert-circle"></i> Pain Point</span>
                          <span className="mb-val">{demo.pain}</span>
                        </div>
                        <div className="mb-card">
                          <span className="mb-key"><i data-lucide="trending-up"></i> Best Angle</span>
                          <span className="mb-val">{demo.angle}</span>
                        </div>
                        <div className="mb-card">
                          <span className="mb-key"><i data-lucide="layout"></i> Platform</span>
                          <span className="mb-val">{demo.platform}</span>
                        </div>
                      </div>
                      <div className="mb-hook">
                        <span className="mb-hook-label"><i data-lucide="sparkles"></i> Generated hook</span>
                        <span className="mb-hook-text">{demo.hook}</span>
                      </div>
                    </div>

                    <div className="prev-gen-row">
                      <button className="preview-btn"><i data-lucide="sparkles"></i> Generate campaign</button>
                      <div className="prev-gen-chip"><i data-lucide="zap"></i> 24s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="trust" style={{paddingBlock:'32px'}}>
          <div className="container">
            <div className="trust-label">Trusted by performance teams at</div>
            <div className="trust-row">
              {['Lumen','Northwind','Pixelfox','Halo Labs','Stratus','Forge&Co','Vantage'].map(b=>(
                <div key={b} className="brand">{b}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section id="problem">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">The problem</span>
              <h2>Most AI ad tools only make pretty creatives.</h2>
              <p className="lead muted">They generate images. They don&apos;t understand your business. That gap is why the ads look good — but don&apos;t convert.</p>
            </div>
            <div className="problem-grid reveal" data-delay="1">
              <div className="problem-col">
                <div className="pc-head bad">
                  <span className="pc-icon-wrap bad"><i data-lucide="x-circle"></i></span>
                  <h3>Other AI tools miss:</h3>
                </div>
                <ul className="prob-list bad">
                  {[
                    'Your actual business model and offer',
                    'What your customers are really afraid of',
                    'Objections stopping buyers from converting',
                    'Competitor gaps and positioning angles',
                    'The real reason someone buys today',
                    'Which platform requires which message style',
                    'What makes your offer worth choosing now',
                  ].map(i => <li key={i}><i data-lucide="x"></i>{i}</li>)}
                </ul>
              </div>
              <div className="prob-vs">
                <div className="prob-vs-line"></div>
                <span className="prob-vs-label">VS</span>
                <div className="prob-vs-line"></div>
              </div>
              <div className="problem-col">
                <div className="pc-head good">
                  <span className="pc-icon-wrap good"><i data-lucide="brain"></i></span>
                  <h3>Crelix builds the strategy first:</h3>
                </div>
                <ul className="prob-list good">
                  {[
                    'Ideal customer profile and buying triggers',
                    'Top pain points and emotional drivers',
                    'Objections to address in every creative',
                    'Competitor gaps turned into ad angles',
                    'The message most likely to convert — now',
                    'Platform-native creative strategy per channel',
                    'Offers, CTAs, and hooks ranked by impact',
                  ].map(i => <li key={i}><i data-lucide="check"></i>{i}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5 BRAINS ── */}
        <section id="how" style={{background:'var(--bg-soft)'}}>
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">How it works</span>
              <h2>Five AI brains. One campaign.<br /><span className="grad-text">Zero guesswork.</span></h2>
              <p className="lead muted">Before Crelix creates a single ad, it builds a complete marketing intelligence layer for your business — then turns that intelligence into campaigns.</p>
            </div>
            <div className="brains-flow reveal" data-delay="1">
              {[
                { num:'01', icon:'globe',          name:'Business Brain', desc:'Studies your website, services, audience, competitors, and market position. Understands what you do and who you do it for.' },
                { num:'02', icon:'users',          name:'Customer Brain', desc:'Identifies real customer pains, fears, desires, objections, and buying motivations. Knows what your buyer thinks before they click.' },
                { num:'03', icon:'package',        name:'Offer Brain',    desc:'Shapes stronger offers, promotions, guarantees, CTAs, and value propositions. Finds the angle that makes your offer irresistible.' },
                { num:'04', icon:'sparkles',       name:'Creative Brain', desc:'Creates ads, images, hooks, headlines, copy, and variations — all grounded in the intelligence from the first three brains.' },
                { num:'05', icon:'flask-conical',  name:'Testing Brain',  desc:'Prioritizes which angles, audiences, and messages to test first. Gives you a launch plan, not just a pile of creatives.' },
              ].map(b => (
                <div key={b.num} className="brain-card">
                  <div className="brain-num">{b.num}</div>
                  <div className="brain-ico"><i data-lucide={b.icon}></i></div>
                  <h3 className="brain-name">{b.name}</h3>
                  <p className="brain-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section id="use-cases">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Real examples</span>
              <h2>See what the Marketing Brain surfaces — and creates.</h2>
              <p className="lead muted">Paste any website. Watch Crelix identify the exact insights that turn into ads people actually respond to.</p>
            </div>
            <div className="usecase-grid reveal" data-delay="1">
              {[
                {
                  icon:'home',
                  industry:'Roofing Company',
                  identifies:[
                    'Storm damage season and insurance claim window',
                    'Homeowners fear hidden damage they cannot see',
                    'Trust is the #1 buying barrier in this category',
                    'Emergency timeline creates urgency + local authority',
                  ],
                  hook:'"Think your roof survived the last storm? Most damage is invisible from the ground."',
                  platform:'Meta + Google',
                },
                {
                  icon:'cpu',
                  industry:'B2B SaaS',
                  identifies:[
                    'Ops teams drowning in manual follow-up tasks',
                    'Fear of embarrassment from dropped client balls',
                    'ROI is the primary decision driver for this buyer',
                    'LinkedIn reaches the ICP who controls the budget',
                  ],
                  hook:'"Still managing customer follow-up manually? Automate the work your team keeps forgetting."',
                  platform:'LinkedIn + Google',
                },
                {
                  icon:'shopping-bag',
                  industry:'Ecommerce Brand',
                  identifies:[
                    'Amazon fatigue — buyers want premium, not mass-market',
                    'Desire for authenticity and brand story',
                    'Social proof is the primary conversion trigger',
                    'Instagram and TikTok match this buyer mindset',
                  ],
                  hook:'"Finally, a product that solves the problem without the cheap feeling of Amazon knockoffs."',
                  platform:'Instagram + TikTok',
                },
              ].map(uc => (
                <div key={uc.industry} className="usecase-card">
                  <div className="uc-top">
                    <div className="uc-icon-wrap"><i data-lucide={uc.icon}></i></div>
                    <span className="uc-industry">{uc.industry}</span>
                  </div>
                  <div className="uc-brain-label"><i data-lucide="brain"></i> Marketing Brain identifies</div>
                  <ul className="uc-identifies">
                    {uc.identifies.map(item => (
                      <li key={item}><i data-lucide="check-circle-2"></i>{item}</li>
                    ))}
                  </ul>
                  <div className="uc-hook">
                    <div className="uc-hook-label"><i data-lucide="sparkles"></i> Generated hook</div>
                    <blockquote className="uc-hook-text">{uc.hook}</blockquote>
                  </div>
                  <div className="uc-platform"><i data-lucide="layout"></i> {uc.platform}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT CRELIX CREATES ── */}
        <section id="outputs" style={{background:'var(--bg-soft)'}}>
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Full output</span>
              <h2>One URL. A complete campaign.</h2>
              <p className="lead muted">Crelix doesn&apos;t just generate images. It gives you every asset you need to launch, test, and scale — built on real marketing intelligence.</p>
            </div>
            <div className="output-grid reveal" data-delay="1">
              {[
                { icon:'type',          label:'Ad Copy',               sub:'Headlines, body text, CTAs' },
                { icon:'image',         label:'Ad Creatives',          sub:'All platform sizes, all formats' },
                { icon:'anchor',        label:'Hooks',                 sub:'Scroll-stopping opening lines' },
                { icon:'file-text',     label:'Creative Briefs',       sub:'Strategy docs for each angle' },
                { icon:'link',          label:'Landing Page Angles',   sub:'Message-match for every ad' },
                { icon:'gift',          label:'Offer Ideas',           sub:'Promotions, guarantees, CTAs' },
                { icon:'users',         label:'Audience Segments',     sub:'3–5 buyer profiles per campaign' },
                { icon:'flask-conical', label:'Testing Plans',         sub:'Prioritized A/B roadmap' },
                { icon:'layers',        label:'Creative Variations',   sub:'Authority, urgency, FOMO, ROI' },
                { icon:'mail',          label:'Email / SMS Copy',      sub:'Post-click nurture sequences' },
                { icon:'brain',         label:'Marketing Brain Report',sub:'Full ICP + strategy document' },
                { icon:'bar-chart-2',   label:'Platform Strategy',     sub:'Meta vs LinkedIn vs TikTok plan' },
              ].map(o => (
                <div key={o.label} className="output-item">
                  <div className="oi-icon"><i data-lucide={o.icon}></i></div>
                  <div>
                    <div className="oi-label">{o.label}</div>
                    <div className="oi-sub">{o.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section id="platforms">
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Platform-native campaigns</span>
              <h2>Every platform thinks differently.<br /><span className="grad-text">So does Crelix.</span></h2>
              <p className="lead muted">Meta buyers scroll fast. LinkedIn buyers read carefully. TikTok buyers trust authenticity. Google buyers search with intent. Crelix adjusts the entire creative strategy — not just the size.</p>
            </div>
            <div className="platforms-wrap reveal" data-delay="1">
              <div className="platforms-grid platforms-grid-4">
                {[
                  { cls:'meta',     logo:'/assets/meta-logo.png',       title:'Meta Ads',     type:'Consumer',  desc:'Feed, stories, reels, carousel. Emotional hooks and scroll-stopping visuals that convert cold audiences fast.', sizes:['1080×1080','1080×1350','1080×1920','1200×628','+8 more'] },
                  { cls:'google',   logo:'/assets/google-ads-logo.png', title:'Google Ads',   type:'Intent',    desc:'Search and display. Benefit-led headlines matched to high-intent buying behavior.', sizes:['300×250','728×90','336×280','160×600','+12 more'] },
                  { cls:'tiktok',   logo:'/assets/tiktok-logo.png',     title:'TikTok Ads',   type:'Authentic', desc:'In-feed and spark ads. Raw, fast, vertical-first. UGC-native creative strategy by default.', sizes:['1080×1920','720×1280','1080×1080','+4 more'] },
                  { cls:'linkedin', logo:null,                           title:'LinkedIn Ads', type:'B2B',       desc:'Sponsored content and lead gen. ROI-first messaging that reaches decision makers who control budget.', sizes:['1200×628','1080×1080','1200×1200','+6 more'], isNew:true },
                ].map(p => (
                  <div key={p.title} className="platform-card">
                    {p.isNew && <span className="plat-new-badge">New</span>}
                    <div className={`p-logo ${p.cls}`}>
                      {p.logo
                        ? <img src={p.logo} alt={p.title} width={26} height={26} />
                        : <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      }
                    </div>
                    <h3>{p.title}</h3>
                    <span className="plat-type-badge">{p.type}</span>
                    <p className="p-desc">{p.desc}</p>
                    <div className="size-pills">{p.sizes.map(s=><span key={s} className="size-pill">{s}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="section-narrow" style={{paddingBlock:0}}>
          <div className="container">
            <div className="stats reveal">
              <div className="stat"><span className="n">5</span><span className="l">AI Brains per campaign</span></div>
              <div className="stat"><span className="n">50+</span><span className="l">Ad sizes supported</span></div>
              <div className="stat"><span className="n">4</span><span className="l">Ad platforms covered</span></div>
              <div className="stat"><span className="n">&lt;60s</span><span className="l">Campaign-ready time</span></div>
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ── */}
        <section id="showcase">
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Showcase</span>
              <h2>Pixel-quality output. Brand-consistent. Every time.</h2>
              <p className="lead muted">A peek at creatives Crelix has generated — across industries, color systems, and platforms.</p>
            </div>
            <div className="gallery reveal" data-delay="1">
              {[
                {seed:'crelix1',cls:'tall',tag:'1080×1920 · TikTok',w:600,h:1200},
                {seed:'crelix2',cls:'sq',tag:'1080×1080 · Meta',w:600,h:600},
                {seed:'crelix3',cls:'sq',tag:'1080×1080 · Meta',w:600,h:600},
                {seed:'crelix4',cls:'wide',tag:'1200×628 · Meta Feed',w:1200,h:600},
                {seed:'crelix5',cls:'sq',tag:'336×280 · Google',w:600,h:600},
                {seed:'crelix6',cls:'sq',tag:'300×250 · Google',w:600,h:600},
                {seed:'crelix7',cls:'sq',tag:'1200×628 · LinkedIn',w:600,h:600},
                {seed:'crelix8',cls:'sq',tag:'1080×1350 · Meta',w:600,h:600},
                {seed:'crelix9',cls:'sq',tag:'728×90 · Google',w:600,h:600},
              ].map(t=>(
                <div key={t.seed} className={`tile ${t.cls}`}>
                  <img src={`https://picsum.photos/seed/${t.seed}/${t.w}/${t.h}`} alt="Sample creative" loading="lazy" />
                  <span className="tag">{t.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STUDIO BRIEF ── */}
        <section id="studio-brief">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">The Studio</span>
              <h2>Six inputs.<br /><span className="grad-text">One complete campaign.</span></h2>
              <p className="lead muted">Paste your URL and the Marketing Brain goes to work. The rest is optional — Crelix fills in what you skip.</p>
            </div>
            <div className="studio-board reveal" data-delay="1">

              {/* 01 Website & Context */}
              <div className="sc sc-half">
                <div className="sc-head"><span className="sc-num">01</span><h3 className="sc-title">Website &amp; Context</h3></div>
                <p className="sc-desc">Paste a URL — the Marketing Brain analyzes your business, offer, audience, and competitors automatically.</p>
                <div className="url-tabs">
                  <button className={studioTab==='url'?'sel':''} onClick={()=>setStudioTab('url')}><i data-lucide="link-2"></i> URL</button>
                  <button className={studioTab==='upload'?'sel':''} onClick={()=>setStudioTab('upload')}><i data-lucide="image-up"></i> Product Upload</button>
                </div>
                <div className="field-block">
                  <label>Website URL <span className="opt">*</span></label>
                  <div className="input-icon"><i data-lucide="globe"></i><input className="text-input" type="url" placeholder="https://yourbrand.com" /></div>
                </div>
                <div className="field-block">
                  <label>Campaign goal <span className="opt">(optional)</span></label>
                  <textarea className="text-input" placeholder="Black Friday push, lead gen for roofing, B2B demo signups..."></textarea>
                </div>
              </div>

              {/* 02 Color Theme */}
              <div className="sc sc-half">
                <div className="sc-head"><span className="sc-num">02</span><h3 className="sc-title">Color Theme</h3><span className="sc-pill">Optional</span></div>
                <p className="sc-desc">Pick a curated theme — or let Crelix auto-match your brand&apos;s own colors from the URL.</p>
                <div className="themes-grid">
                  {[
                    {key:'t-dark-prem',label:'Dark Premium',dark:true},
                    {key:'t-neon-cyber',label:'Neon Cyber',dark:true},
                    {key:'t-fire',label:'Fire & Power',dark:true},
                    {key:'t-ocean',label:'Ocean Depth',dark:true},
                    {key:'t-gold',label:'Golden Luxury',dark:true},
                    {key:'t-clean',label:'Clean Light',dark:false},
                    {key:'t-forest',label:'Forest Power',dark:true},
                    {key:'t-sunset',label:'Sunset Warm',dark:true},
                    {key:'t-purple-storm',label:'Purple Storm',dark:true},
                    {key:'t-rose',label:'Rose Power',dark:true},
                  ].map(t=>(
                    <div key={t.key} className={`theme-swatch ${t.dark?'dark':'light'} ${t.key}${activeTheme===t.key?' sel':''}`} onClick={()=>setActiveTheme(t.key)}>
                      <span>{t.label}</span>
                      <span className="check"><i data-lucide="check" style={{width:12,height:12}}></i></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Reference Images */}
              <div className="sc sc-third">
                <div className="sc-head"><span className="sc-num">03</span><h3 className="sc-title">Reference Images</h3><span className="sc-pill">Max 5</span></div>
                <p className="sc-desc">Drop brand assets, product photos, or inspiration shots for the Creative Brain to reference.</p>
                <div className="dropzone-lg">
                  <div className="ico"><i data-lucide="image-plus"></i></div>
                  <div className="dz-title">Click to upload images</div>
                  <div className="dz-sub">JPG, PNG, WebP · Max 5MB each · 0/5</div>
                </div>
              </div>

              {/* 04 Brand Logo */}
              <div className="sc sc-third">
                <div className="sc-head"><span className="sc-num">04</span><h3 className="sc-title">Brand Logo</h3><span className="sc-pill">Optional</span></div>
                <p className="sc-desc">Composited pixel-perfect onto every creative. The AI never warps or recolors your logo.</p>
                <div className="dropzone-lg">
                  <div className="ico"><i data-lucide="upload"></i></div>
                  <div className="dz-title">Upload your logo</div>
                  <div className="dz-sub">PNG with transparent background recommended</div>
                </div>
              </div>

              {/* 05 Select Platform */}
              <div className="sc sc-third">
                <div className="sc-head"><span className="sc-num">05</span><h3 className="sc-title">Select Platform</h3></div>
                <p className="sc-desc">Pick your channel. The Creative Brain adapts the strategy, copy style, and layout automatically.</p>
                <div className="plat-list">
                  {[
                    {key:'meta',label:'Meta Ads',spec:'12 sizes',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z"/></svg>},
                    {key:'google',label:'Google Ads',spec:'16 sizes',icon:<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>},
                    {key:'tiktok',label:'TikTok Ads',spec:'8 sizes',icon:<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52V6.46a4.85 4.85 0 0 1-1.84-.27z"/></svg>},
                    {key:'linkedin',label:'LinkedIn Ads',spec:'8 sizes',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                  ].map(p=>(
                    <button key={p.key} className={`plat-row${activePlatRow===p.key?' sel':''}`} onClick={()=>setActivePlatRow(p.key)}>
                      <span className="plat-icon">{p.icon}</span>{p.label}<span className="plat-spec">{p.spec}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 06 Select Ad Size */}
              <div className="sc">
                <div className="sc-head"><span className="sc-num">06</span><h3 className="sc-title">Select Ad Size</h3><span className="sc-pill">Meta Ads</span></div>
                <p className="sc-desc">Every native size for every platform — no manual resizing, no math.</p>
                <div className="size-tabs-v2">
                  <button className="sel">Meta</button>
                  <button>Google</button>
                  <button>TikTok</button>
                </div>
                <div className="size-list">
                  {[
                    {size:'1080×1080',name:'Feed Square'},
                    {size:'1200×628',name:'Feed Landscape'},
                    {size:'1080×1350',name:'Feed Portrait'},
                    {size:'1080×1920',name:'Story / Reels'},
                    {size:'1080×1080-c',name:'Carousel Card'},
                  ].map(r=>(
                    <div key={r.size} className={`row-v2${selectedSizes.includes(r.size)?' sel':''}`} onClick={()=>toggleSize(r.size)}>
                      <div className="sn-left">
                        <span className="sn-check">{selectedSizes.includes(r.size)&&<i data-lucide="check" style={{width:12,height:12}}></i>}</span>
                        <span className="sn-name">{r.name}</span>
                      </div>
                      <span className="sn-dim">{r.size.replace('-c','')} px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="generate-dock reveal" data-delay="2">
              <div className="left">
                <div className="l1"><span>{selectedSizes.length} sizes</span> · ready to generate</div>
                <div className="l2">Marketing Brain → Campaign strategy → Creatives · ~60 seconds</div>
              </div>
              <Link href="/studio" className="btn btn-primary btn-lg">
                <i data-lucide="brain"></i> Get my Marketing Brain — free
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="home-pricing">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Pricing</span>
              <h2>Simple plans. No surprises.</h2>
              <p className="lead muted">Start free. Upgrade when your campaigns are ready to scale. Cancel anytime — no contracts.</p>
            </div>
            <div className="hp-grid reveal" data-delay="1">
              <div className="hp-card">
                <div className="hp-name">Starter</div>
                <div className="hp-tagline">For testing the waters.</div>
                <div className="hp-price"><span className="hp-dollar">$</span><span className="hp-num">0</span><span className="hp-per">/ month</span></div>
                <Link href="/studio" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:8}}>Start free <i data-lucide="arrow-right"></i></Link>
                <div className="hp-divider"></div>
                <ul className="hp-feats">
                  {['5 generations / month','Full Marketing Brain analysis','All 50+ ad sizes','Meta, Google, TikTok & LinkedIn','Watermark-free exports','Community support'].map(f=><li key={f}><i data-lucide="check-circle-2"></i>{f}</li>)}
                </ul>
              </div>
              <div className="hp-card hp-featured">
                <div className="hp-badge">Most popular</div>
                <div className="hp-name">Pro</div>
                <div className="hp-tagline">For growing performance teams.</div>
                <div className="hp-price"><span className="hp-dollar">$</span><span className="hp-num">29</span><span className="hp-per">/ month</span></div>
                <Link href="/studio" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:8}}>Start 14-day trial <i data-lucide="arrow-right"></i></Link>
                <div className="hp-divider"></div>
                <ul className="hp-feats">
                  {['200 generations / month','Campaign Builder — batch generate','Brand Memory — gets smarter over time','Creative Psychology Layer','Layered PSD export','Priority email support'].map(f=><li key={f}><i data-lucide="check-circle-2"></i>{f}</li>)}
                </ul>
              </div>
              <div className="hp-card">
                <div className="hp-name">Business</div>
                <div className="hp-tagline">For agencies &amp; in-house teams.</div>
                <div className="hp-price"><span className="hp-dollar">$</span><span className="hp-num">99</span><span className="hp-per">/ month</span></div>
                <Link href="/pricing" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:8}}>Contact sales <i data-lucide="arrow-right"></i></Link>
                <div className="hp-divider"></div>
                <ul className="hp-feats">
                  {['Unlimited generations','Customer Voice Engine','Up to 10 user seats','API & webhook access','Custom brand model training','Dedicated account manager'].map(f=><li key={f}><i data-lucide="check-circle-2"></i>{f}</li>)}
                </ul>
              </div>
            </div>
            <div style={{textAlign:'center',marginTop:32}} className="reveal" data-delay="2">
              <Link href="/pricing" className="btn btn-ghost btn-sm">See full plan comparison <i data-lucide="arrow-right"></i></Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta">
          <div className="container">
            <div className="cta-block reveal">
              <span className="eyebrow" style={{color:'rgba(255,255,255,0.85)'}}>
                <span style={{background:'rgba(255,255,255,0.85)',width:24,height:1,display:'inline-block',marginRight:8}}></span>Free to start
              </span>
              <h2 style={{marginTop:14}}>Want to see what Crelix would create for your business?</h2>
              <p className="lead">Paste your URL. Get your AI Marketing Brain — full campaign strategy, creative concepts, and ads — in under 60 seconds. No card required.</p>
              <div className="row">
                <Link href="/studio" className="btn btn-primary btn-lg">Get my AI Marketing Brain <i data-lucide="brain"></i></Link>
                <Link href="#" className="btn btn-ghost btn-lg"><i data-lucide="calendar"></i> Book a demo</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="section-narrow">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Questions</span>
              <h2>The fine print, plainly.</h2>
            </div>
            <div className="faq-list reveal" data-delay="1">
              {[
                {q:'What is the Marketing Brain and how does it work?', a:"The Marketing Brain is Crelix's pre-generation intelligence layer. Before creating a single ad, it analyzes your business URL, identifies your ideal customer profile, surfaces customer pain points and objections, recommends ad angles, and suggests the strongest platform and offer. It runs automatically every time you start a project."},
                {q:'Do I need to upload brand assets or write a brief?', a:"No. Crelix reads your website and auto-detects your colors, fonts, key products, and brand voice. Uploading a logo or reference images is optional — it gives the Creative Brain a tighter starting point, but the Marketing Brain works entirely from your URL."},
                {q:'Which platforms are supported?', a:"Meta (Facebook + Instagram), Google Display, TikTok, and LinkedIn — covering 50+ native ad sizes across 4 platforms. The Creative Brain adapts the copy style, layout, and strategy for each platform automatically."},
                {q:'What is the Campaign Builder?', a:"Instead of generating one ad, the Campaign Builder produces a full test set in one click: multiple headlines, hooks, CTAs, image concepts, and audience angles — ready to load directly into Ads Manager."},
                {q:'Can I use Crelix for B2B campaigns on LinkedIn?', a:"Yes — LinkedIn mode is specifically designed for B2B. The Marketing Brain identifies decision-maker profiles, ROI-first messaging angles, and objection-handling copy that resonates with buyers who control budget."},
                {q:'Is there a free tier?', a:"Yes. The free tier includes 5 generations per month with full Marketing Brain analysis, watermark-free exports across all four platforms. No card needed to start."},
              ].map((item,i)=>(
                <details key={i} className="faq-item" {...(i===0?{open:true}:{})}>
                  <summary>{item.q}<span className="plus"><i data-lucide="plus"></i></span></summary>
                  <p>{item.a}</p>
                </details>
              ))}
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
