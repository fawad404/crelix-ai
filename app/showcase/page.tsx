'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'

const ITEMS = [
  {seed:'crx-a1',ar:[9,16],tags:['tiktok','vertical'],title:'Nova Apparel · Drop 03',tag:'1080×1920'},
  {seed:'crx-a2',ar:[1,1],tags:['meta','square'],title:'Lunar Café · Spring',tag:'1080×1080'},
  {seed:'crx-a3',ar:[4,5],tags:['meta','vertical'],title:'Halo Labs · Launch',tag:'1080×1350'},
  {seed:'crx-a4',ar:[191,100],tags:['google','banner'],title:'Forge&Co · Retarget',tag:'1200×628'},
  {seed:'crx-a5',ar:[1,1],tags:['google','square'],title:'Vantage · Display',tag:'336×280'},
  {seed:'crx-a6',ar:[9,16],tags:['tiktok','vertical'],title:'Stratus · Founders',tag:'720×1280'},
  {seed:'crx-a7',ar:[1,1],tags:['meta','square'],title:'Pixelfox · Pro',tag:'1080×1080'},
  {seed:'crx-a8',ar:[4,5],tags:['meta','vertical'],title:'Northwind · Q4',tag:'1080×1350'},
  {seed:'crx-a9',ar:[1,1],tags:['google','square'],title:'Lumen · Black Friday',tag:'300×250'},
  {seed:'crx-aa',ar:[9,16],tags:['tiktok','vertical'],title:'Harbor Supply · Sale',tag:'1080×1920'},
  {seed:'crx-ab',ar:[1,1],tags:['meta','square'],title:'Parallax Books · Pre',tag:'1080×1080'},
  {seed:'crx-ac',ar:[4,5],tags:['meta','vertical'],title:'Acme Studio · Intro',tag:'1080×1350'},
  {seed:'crx-ad',ar:[191,100],tags:['google','banner'],title:'Atlas · Skyscraper',tag:'728×90'},
  {seed:'crx-ae',ar:[1,1],tags:['meta','square'],title:'Mira & Co · Holiday',tag:'1080×1080'},
  {seed:'crx-af',ar:[9,16],tags:['tiktok','vertical'],title:'Sundry · Behind',tag:'1080×1920'},
  {seed:'crx-ag',ar:[4,5],tags:['meta','vertical'],title:'Drift · Story',tag:'1080×1350'},
  {seed:'crx-ah',ar:[1,1],tags:['google','square'],title:'Tinybird · Display',tag:'336×280'},
  {seed:'crx-ai',ar:[9,16],tags:['tiktok','vertical'],title:'Hold · Capsule',tag:'1080×1920'},
]

const INDUSTRIES = [
  {icon:'shirt',title:'Apparel & DTC',desc:'Product-on-figure, flatlays, lookbook stills. Editorial type with brand-correct colors.',count:'4,200+'},
  {icon:'utensils',title:'Food & Beverage',desc:'Hero shots, lifestyle context, bold price callouts. Built for high-frequency promo cycles.',count:'2,800+'},
  {icon:'cpu',title:'B2B SaaS',desc:'Product UI screenshots, feature callouts, before/after framing — clean and confidence-building.',count:'3,100+'},
  {icon:'landmark',title:'Fintech & Services',desc:'Trust-first, compliance-aware compositions. Clear value-prop hierarchy and bold CTAs.',count:'1,400+'},
  {icon:'sparkles',title:'Beauty & Wellness',desc:'Product hero shots, ingredient callouts, glow-up stills. Premium type, generous whitespace.',count:'980+'},
  {icon:'gamepad-2',title:'Gaming & Entertainment',desc:'High-contrast key art, action callouts, character-forward compositions. Built for clicks.',count:'610+'},
  {icon:'home',title:'Home & Lifestyle',desc:'In-context product shots, room scenes, season-driven palette swaps. Catalog-quality output.',count:'1,100+'},
  {icon:'briefcase',title:'Agencies',desc:'White-label exports, multi-brand workspaces. Run 10 client accounts from one dashboard.',count:'340+'},
]

export default function ShowcasePage() {
  const [filter, setFilter] = useState('all')

  const filtered = ITEMS.filter(it => filter === 'all' || it.tags.includes(filter))

  return (
    <>
      <Navbar active="showcase" />
      <main>
        <section className="page-head">
          <div className="container">
            <div className="page-head-2col">
              <div className="ph-left">
                <span className="eyebrow reveal">Showcase</span>
                <h1 className="reveal" data-delay="1">
                  Pixel-quality output.<br /><span className="grad-text">Brand-consistent.</span> Every time.
                </h1>
                <p className="lead reveal" data-delay="2">
                  A peek at creatives Crelix has generated — across industries, color systems, and platforms. Hover any tile to see details.
                </p>
                <div className="reveal" data-delay="3" style={{marginTop:32,display:'flex',gap:12,flexWrap:'wrap'}}>
                  <Link href="/studio" className="btn btn-primary">Generate yours <i data-lucide="arrow-right"></i></Link>
                  <Link href="/gallery" className="btn btn-ghost"><i data-lucide="folder"></i> See my gallery</Link>
                </div>
              </div>
              <div className="ph-right reveal" data-delay="2">
                <div className="ph-collage">
                  <div className="ph-collage-tile tall">
                    <span className="tag">1080×1920</span>
                    <img src="https://picsum.photos/seed/sh-h1/500/780" alt="" loading="lazy" />
                  </div>
                  <div className="ph-collage-tile sq">
                    <span className="tag">1080×1080</span>
                    <img src="https://picsum.photos/seed/sh-h2/500/500" alt="" loading="lazy" />
                  </div>
                  <div className="ph-collage-tile sq">
                    <span className="tag">1200×628</span>
                    <img src="https://picsum.photos/seed/sh-h3/500/500" alt="" loading="lazy" />
                  </div>
                  <span className="ph-collage-counter">+ 248 more</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{paddingTop:24}}>
          <div className="container">
            <div className="filter-bar reveal">
              {['all','meta','google','tiktok','square','vertical','banner'].map(f=>(
                <button key={f} className={filter===f?'sel':''} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
              ))}
            </div>

            <div className="masonry reveal" data-delay="1">
              {filtered.map(it=>{
                const W = 600, H = Math.round(W * it.ar[1] / it.ar[0])
                return (
                  <div key={it.seed} className="m-item">
                    <img src={`https://picsum.photos/seed/${it.seed}/${W}/${H}`} alt="" loading="lazy" />
                    <div className="meta">
                      <div><div className="title">{it.title}</div></div>
                      <div className="tag">{it.tag}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Built for every category</span>
              <h2>From scrappy DTC to enterprise SaaS, <span className="grad-text">Crelix flexes.</span></h2>
              <p className="lead muted">Auto-detection adapts to your category&apos;s visual language — same six fields, very different output.</p>
            </div>
            <div className="reveal" data-delay="1" style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:16}}>
              {INDUSTRIES.map(ind=>(
                <div key={ind.title} style={{padding:'28px 24px',background:'#fff',border:'1px solid var(--c-line)',borderRadius:'var(--r-lg)',display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'var(--c-purple-tint)',color:'var(--c-purple)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}><i data-lucide={ind.icon}></i></div>
                  <h3 style={{fontSize:17,marginTop:6}}>{ind.title}</h3>
                  <p style={{fontSize:13,color:'var(--c-body)',lineHeight:1.5}}>{ind.desc}</p>
                  <div style={{fontSize:11.5,color:'var(--c-muted)',marginTop:4}}>{ind.count} brands</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Before · After</span>
              <h2>From product page to ad creative — automatically.</h2>
              <p className="lead muted">Crelix doesn&apos;t just resize your hero image. It restages, recolors, recomposes — and writes copy that earns the click.</p>
            </div>
            <div className="reveal" data-delay="1" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              <div style={{position:'relative',borderRadius:'var(--r-lg)',overflow:'hidden',border:'1px solid var(--c-line)'}}>
                <div style={{position:'absolute',top:14,left:14,background:'rgba(14,10,31,0.85)',color:'#fff',fontSize:11,fontWeight:600,padding:'5px 11px',borderRadius:'var(--r-pill)',letterSpacing:'0.06em',textTransform:'uppercase',zIndex:1}}>Source · product page</div>
                <img src="https://picsum.photos/seed/before1/900/600" alt="Source page" loading="lazy" style={{width:'100%',aspectRatio:'3/2',objectFit:'cover',display:'block'}} />
              </div>
              <div style={{position:'relative',borderRadius:'var(--r-lg)',overflow:'hidden',border:'1px solid var(--c-purple)'}}>
                <div style={{position:'absolute',top:14,left:14,background:'var(--gradient-cta)',color:'#fff',fontSize:11,fontWeight:600,padding:'5px 11px',borderRadius:'var(--r-pill)',letterSpacing:'0.06em',textTransform:'uppercase',zIndex:1,display:'inline-flex',alignItems:'center',gap:4}}><i data-lucide="sparkles" style={{width:11,height:11}}></i> Generated</div>
                <img src="https://picsum.photos/seed/after1/900/600" alt="Generated creative" loading="lazy" style={{width:'100%',aspectRatio:'3/2',objectFit:'cover',display:'block'}} />
              </div>
            </div>
          </div>
        </section>

        {/* Case study */}
        <section>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Case in point</span>
              <h2>One brand. Twelve creatives. <span className="grad-text">Eighteen minutes.</span></h2>
              <p className="lead muted">Nova Apparel&apos;s launch campaign — generated, exported, and live on Meta + TikTok before lunch.</p>
            </div>
            <div className="reveal" data-delay="1" style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:16}}>
              {[1,2,3,4].map(n=>(
                <div key={n} className="tile sq">
                  <img src={`https://picsum.photos/seed/case${n}/600/600`} alt="" loading="lazy" />
                  <span className="tag">1080×1080 · Meta</span>
                </div>
              ))}
            </div>
            <div className="reveal" data-delay="2" style={{marginTop:36,padding:28,background:'#fff',border:'1px solid var(--c-line)',borderRadius:'var(--r-xl)',display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:24}}>
              {[['18min','From URL → live ads'],['12','Creatives generated'],['3.4×','CTR vs. prior campaign'],['$0','Spent on design']].map(([n,l])=>(
                <div key={l}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:32,letterSpacing:'-0.02em',color:'var(--c-ink)'}}>{n}</div>
                  <div style={{fontSize:12.5,color:'var(--c-muted)',marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="container">
            <div className="cta-block reveal">
              <span className="eyebrow" style={{color:'rgba(255,255,255,0.85)'}}>
                <span style={{background:'rgba(255,255,255,0.85)',width:24,height:1,display:'inline-block',marginRight:8}}></span>Your turn
              </span>
              <h2 style={{marginTop:14}}>Generate creatives like these — for your brand.</h2>
              <p className="lead">Drop your URL in Studio. The first 5 are free.</p>
              <div className="row">
                <Link href="/studio" className="btn btn-primary btn-lg">Open Studio <i data-lucide="arrow-right"></i></Link>
                <Link href="/pricing" className="btn btn-ghost btn-lg">See pricing</Link>
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
