'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'

const MetaIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z"/></svg>
const TikTokIcon = () => <svg width="11" height="11" viewBox="0 0 24 24"><path fill="#000" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52V6.46a4.85 4.85 0 0 1-1.84-.27z"/></svg>
const GoogleIcon = () => <svg width="11" height="11" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>

type Creative = { seed: string; ar: string; platform: 'meta'|'tiktok'|'google'; name: string; dim: string; starred: boolean }

const NOVA: Creative[] = [
  {seed:'nova-1',ar:'ar-9-16',platform:'tiktok',name:'Drop 03 · v1',dim:'1080×1920',starred:true},
  {seed:'nova-2',ar:'ar-1-1',platform:'meta',name:'Drop 03 · v2',dim:'1080×1080',starred:false},
  {seed:'nova-3',ar:'ar-4-5',platform:'meta',name:'Drop 03 · v3',dim:'1080×1350',starred:true},
  {seed:'nova-4',ar:'ar-9-16',platform:'tiktok',name:'Drop 03 · v4',dim:'720×1280',starred:false},
]
const LUNAR: Creative[] = [
  {seed:'lunar-1',ar:'ar-1-1',platform:'meta',name:'Spring · Hero',dim:'1080×1080',starred:true},
  {seed:'lunar-2',ar:'ar-1-1',platform:'meta',name:'Spring · Latte',dim:'1080×1080',starred:false},
  {seed:'lunar-3',ar:'ar-4-5',platform:'meta',name:'Spring · Pastry',dim:'1080×1350',starred:false},
  {seed:'lunar-4',ar:'ar-1-1',platform:'meta',name:'Spring · Combo',dim:'1080×1080',starred:true},
]
const HALO: Creative[] = [
  {seed:'halo-1',ar:'ar-191-100',platform:'google',name:'Q2 · Hero banner',dim:'1200×628',starred:false},
  {seed:'halo-2',ar:'ar-1-1',platform:'meta',name:'Q2 · Feature 01',dim:'1080×1080',starred:true},
  {seed:'halo-3',ar:'ar-1-1',platform:'google',name:'Q2 · 300×250',dim:'336×280',starred:false},
  {seed:'halo-4',ar:'ar-4-5',platform:'meta',name:'Q2 · Story',dim:'1080×1350',starred:false},
]

function CreativeCard({ c }: { c: Creative }) {
  const [starred, setStarred] = useState(c.starred)
  const Icon = c.platform === 'meta' ? MetaIcon : c.platform === 'tiktok' ? TikTokIcon : GoogleIcon
  const label = c.platform === 'meta' ? 'Meta' : c.platform === 'tiktok' ? 'TikTok' : 'Google'
  const imgH = c.ar === 'ar-9-16' ? 710 : c.ar === 'ar-4-5' ? 625 : c.ar === 'ar-191-100' ? 314 : 500
  const imgW = c.ar === 'ar-191-100' ? 600 : 500
  return (
    <div className="creative">
      <div className={`thumb ${c.ar}`}>
        <img src={`https://picsum.photos/seed/${c.seed}/${imgW}/${imgH}`} alt="" loading="lazy" />
        <div className="top-meta">
          <span className="platform-badge"><Icon /> {label}</span>
          <button className={`star${starred?' on':''}`} aria-label="Star" onClick={()=>setStarred(!starred)}>
            <i data-lucide="star" style={{width:13,height:13,fill:starred?'currentColor':'none'}}></i>
          </button>
        </div>
        <div className="ovr">
          <div className="ovr-actions">
            <button><i data-lucide="download" style={{width:12,height:12}}></i> Export</button>
            <button><i data-lucide="copy" style={{width:12,height:12}}></i> Duplicate</button>
          </div>
        </div>
      </div>
      <div className="info"><span className="name">{c.name}</span><span className="dim">{c.dim}</span></div>
    </div>
  )
}

function Project({ initials, name, meta, tags, creatives }: { initials:string; name:string; meta:string; tags:string[]; creatives:Creative[] }) {
  return (
    <div className="project reveal">
      <div className="project-head">
        <div className="pinfo">
          <div className="pthumb">{initials}</div>
          <div>
            <div className="pname">{name}</div>
            <div className="pmeta">{meta}</div>
            <div className="ptags">
              {initials==='NA'&&<span className="ptag live"><span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:'#0E8567',marginRight:5}}></span>Live</span>}
              {tags.map(t=><span key={t} className="ptag">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="pactions">
          <button className="btn btn-ghost btn-sm"><i data-lucide="download"></i> Export all</button>
          <button className="btn btn-primary btn-sm"><i data-lucide="sparkles"></i> Regenerate</button>
          <button className="btn btn-ghost btn-sm" style={{padding:10}}><i data-lucide="more-horizontal"></i></button>
        </div>
      </div>
      <div className="creatives-grid">{creatives.map(c=><CreativeCard key={c.seed} c={c} />)}</div>
    </div>
  )
}

export default function GalleryPage() {
  const [chip, setChip] = useState('all')
  return (
    <>
      <Navbar active="gallery" />
      <main>
        <section className="page-head" style={{paddingBottom:24}}>
          <div className="container">
            <div className="page-head-2col">
              <div className="ph-left">
                <span className="eyebrow reveal">My Gallery</span>
                <h1 className="reveal" data-delay="1">Everything you&apos;ve shipped<br /><span className="grad-text">with Crelix.</span></h1>
                <p className="lead reveal" data-delay="2">All your generated creatives, organized by project. Star the keepers, regenerate variants, or pick up where you left off.</p>
                <div className="reveal" data-delay="3" style={{marginTop:32,display:'flex',gap:12,flexWrap:'wrap'}}>
                  <Link href="/studio" className="btn btn-primary"><i data-lucide="plus"></i> New project</Link>
                  <Link href="/showcase" className="btn btn-ghost"><i data-lucide="image"></i> Browse showcase</Link>
                </div>
              </div>
              <div className="ph-right reveal" data-delay="2">
                <div className="ph-stats">
                  <div className="ph-stat-tile tall">
                    <span className="ico-tile"><i data-lucide="folder-heart"></i></span>
                    <div className="n">8</div>
                    <div className="l">Active projects · 184 creatives generated this month alone.</div>
                  </div>
                  <div className="ph-stat-tile"><div className="n">312</div><div className="l">Total creatives</div></div>
                  <div className="ph-stat-tile"><div className="n">42</div><div className="l">Starred favorites</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{paddingTop:24}}>
          <div className="container">
            <div className="gal-stats reveal">
              <div className="gal-stat-cell"><div className="n">312</div><div className="l">Total creatives <span className="delta">+184 this month</span></div></div>
              <div className="gal-stat-cell"><div className="n">8</div><div className="l">Active projects</div></div>
              <div className="gal-stat-cell"><div className="n">42</div><div className="l">Starred</div></div>
              <div className="gal-stat-cell"><div className="n">186</div><div className="l">Generations used <span style={{fontSize:11,color:'var(--c-muted)',marginLeft:6}}>/ 200</span></div></div>
            </div>

            <div className="new-project-banner reveal">
              <div className="npb-text">
                <h3>Ready for the next campaign?</h3>
                <p>You have <b>14 generations</b> left this month — and a Pro plan that doesn&apos;t reset until June 12.</p>
                <div className="meta-row">
                  <span><i data-lucide="zap" style={{width:12,height:12}}></i> 14 / 200 generations left</span>
                  <span><i data-lucide="clock" style={{width:12,height:12}}></i> Resets in 19 days</span>
                </div>
              </div>
              <Link href="/studio" className="btn btn-primary btn-lg">Start a new project <i data-lucide="arrow-right"></i></Link>
            </div>

            <div className="gal-toolbar reveal">
              <div className="left">
                <div className="gal-search"><i data-lucide="search"></i><input type="text" placeholder="Search projects, creatives, sizes..." /></div>
                <div className="gal-chips">
                  {[{f:'all',label:'All 312'},{f:'starred',label:'Starred'},{f:'meta',label:'Meta'},{f:'google',label:'Google'},{f:'tiktok',label:'TikTok'},{f:'square',label:'Square'},{f:'vertical',label:'Vertical'}].map(c=>(
                    <button key={c.f} className={`gal-chip${chip===c.f?' sel':''}`} onClick={()=>setChip(c.f)}>{c.label}</button>
                  ))}
                </div>
              </div>
              <button className="gal-sort"><i data-lucide="arrow-down-up" style={{width:13,height:13}}></i> Recent first <i data-lucide="chevron-down" style={{width:13,height:13}}></i></button>
            </div>

            <Project initials="NA" name="Nova Apparel · Drop 03" meta="Started 2 days ago · 12 creatives · Meta + TikTok" tags={['Meta','TikTok']} creatives={NOVA} />
            <Project initials="LC" name="Lunar Café · Spring Menu" meta="Started 5 days ago · 8 creatives · Meta" tags={['Meta','Square']} creatives={LUNAR} />
            <Project initials="HL" name="Halo Labs · Q2 Launch" meta="Started 1 week ago · 24 creatives · Meta + Google" tags={['Meta','Google','Banner']} creatives={HALO} />

            <div className="reveal" style={{textAlign:'center',padding:'56px 24px',color:'var(--c-muted)',fontSize:13.5}}>
              <i data-lucide="folder-search" style={{width:32,height:32,color:'var(--c-line-strong)',marginBottom:12,display:'block',margin:'0 auto 12px'}}></i>
              That&apos;s everything in this view. Want more? <Link href="/studio" style={{color:'var(--c-purple)',fontWeight:600}}>Start a new project →</Link>
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
