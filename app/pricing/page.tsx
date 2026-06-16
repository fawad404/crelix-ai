'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'

const PRICES = { monthly: { pro: 29, business: 99 }, yearly: { pro: 23, business: 79 } }

export default function PricingPage() {
  const [bill, setBill] = useState<'monthly'|'yearly'>('monthly')

  return (
    <>
      <Navbar active="pricing" />
      <main>
        <section className="pricing-hero">
          <div className="container">
            <span className="eyebrow reveal">Pricing</span>
            <h1 className="reveal" data-delay="1">Simple plans. No surprises.</h1>
            <p className="lead reveal" data-delay="2">Start free. Upgrade when your campaigns are ready to scale. Cancel anytime — no contracts.</p>
            <div className="reveal" data-delay="3" style={{marginTop:28,display:'inline-flex',alignItems:'center',gap:8,padding:6,background:'#fff',border:'1px solid var(--c-line)',borderRadius:'var(--r-pill)',boxShadow:'var(--shadow-sm)'}}>
              <button className={`bill-toggle${bill==='monthly'?' sel':''}`} onClick={()=>setBill('monthly')}>Monthly</button>
              <button className={`bill-toggle${bill==='yearly'?' sel':''}`} onClick={()=>setBill('yearly')}>
                Yearly <span style={{fontSize:11,color:'var(--c-purple)',marginLeft:6,fontWeight:700}}>−20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <div className="price-grid-v2">
              {/* Starter */}
              <div className="price-card-v2 reveal">
                <div><div className="pc-name">Starter</div><div className="pc-tagline">For testing the waters.</div></div>
                <div className="pc-amount"><span className="dollar">$</span><span className="num">0</span><span className="per">/ month</span></div>
                <div className="pc-cta"><Link href="/studio" className="btn btn-ghost">Start free <i data-lucide="arrow-right"></i></Link></div>
                <div className="pc-divider"></div>
                <div className="pc-feat-list">
                  {['5 generations / month','All 50+ ad sizes','Meta, Google & TikTok','Watermark-free exports','Full-resolution PNG / JPG','Community support'].map(f=>(
                    <div key={f} className="row"><i data-lucide="check-circle-2"></i> {f}</div>
                  ))}
                </div>
              </div>

              {/* Pro */}
              <div className="price-card-v2 featured reveal" data-delay="1">
                <span className="pc-tag">Most popular</span>
                <div><div className="pc-name">Pro</div><div className="pc-tagline">For growing performance teams.</div></div>
                <div className="pc-amount"><span className="dollar">$</span><span className="num">{PRICES[bill].pro}</span><span className="per">/ month</span></div>
                <div className="pc-cta"><Link href="/studio" className="btn btn-primary">Start 14-day trial <i data-lucide="arrow-right"></i></Link></div>
                <div className="pc-divider"></div>
                <div className="pc-feat-list">
                  {['200 generations / month','Auto brand-kit detection','Batch generate (up to 20)','Layered PSD export','Custom aspect ratios','Priority email support'].map(f=>(
                    <div key={f} className="row"><i data-lucide="check-circle-2"></i> {f}</div>
                  ))}
                </div>
              </div>

              {/* Business */}
              <div className="price-card-v2 reveal" data-delay="2">
                <div><div className="pc-name">Business</div><div className="pc-tagline">For agencies &amp; in-house teams.</div></div>
                <div className="pc-amount"><span className="dollar">$</span><span className="num">{PRICES[bill].business}</span><span className="per">/ month</span></div>
                <div className="pc-cta"><Link href="#" className="btn btn-ghost">Contact sales <i data-lucide="arrow-right"></i></Link></div>
                <div className="pc-divider"></div>
                <div className="pc-feat-list">
                  {['Unlimited generations','Up to 10 user seats','API & webhook access','Custom brand model training','SSO & SAML','Dedicated access manager'].map(f=>(
                    <div key={f} className="row"><i data-lucide="check-circle-2"></i> {f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section>
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Compare</span>
              <h2>Every feature, side by side.</h2>
              <p className="lead muted">If you&apos;re trying to decide between Pro and Business, this is the table you want.</p>
            </div>
            <div className="reveal" data-delay="1" style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--c-line)'}}>
                    <th style={{textAlign:'left',padding:'12px 16px',fontFamily:'var(--font-display)',fontWeight:700}}>Feature</th>
                    {['Starter','Pro','Business'].map(p=><th key={p} style={{padding:'12px 16px',fontFamily:'var(--font-display)',fontWeight:700,color:p==='Pro'?'var(--c-purple)':''}}>{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Monthly generations','5','200','Unlimited'],
                    ['Variants per batch','1','20','50'],
                    ['Brand kits stored','—','5','Unlimited'],
                    ['Ad sizes available','50+','150+','150+ w/ support'],
                    ['Meta · Google · TikTok exports','✓','✓','✓'],
                    ['Watermark-free','✓','✓','✓'],
                    ['Layered PSD export','—','✓','✓'],
                    ['Custom aspect ratios','—','✓','✓'],
                    ['White-label / no Crelix mark','—','—','✓'],
                    ['Team seats','—','—','Up to 10 (more)'],
                    ['API & webhook access','—','—','✓'],
                    ['Custom brand model training','—','—','✓'],
                    ['SSO / SAML','—','—','✓'],
                    ['Priority support','Community','Email · 24h','Dedicated · SLA'],
                    ['Data retention','30 days','1 year','Unlimited'],
                  ].map(([feat,...vals])=>(
                    <tr key={feat} style={{borderBottom:'1px solid var(--c-line)'}}>
                      <td style={{padding:'12px 16px',color:'var(--c-body)'}}>{feat}</td>
                      {vals.map((v,i)=><td key={i} style={{padding:'12px 16px',textAlign:'center',color:v==='—'?'var(--c-muted)':v==='✓'?'var(--c-purple)':'var(--c-ink)',fontWeight:v==='✓'?700:400}}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ADD-ONS */}
        <section>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">Add-ons</span>
              <h2>Buy only what you actually need.</h2>
              <p className="lead muted">Top-up generations, add seats, or unlock pro features per-project — no plan upgrade required.</p>
            </div>
            <div className="reveal" data-delay="1" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))',gap:20,marginTop:8}}>
              {[
                {icon:'plus-circle',title:'+50 generations',sub:'When the top-up serves your monthly cap, these extras are unused.',price:'$15'},
                {icon:'users',title:'Extra team seat',sub:'Per seat per month, shared brand kits &amp; shared generation quota.',price:'$12/m'},
                {icon:'cpu',title:'Custom brand model',sub:'Train Crelix on your brand library for tighter fidelity output. One-time setup.',price:'$499'},
              ].map(a=>(
                <div key={a.title} style={{padding:28,background:'#fff',border:'1px solid var(--c-line)',borderRadius:'var(--r-xl)',display:'flex',flexDirection:'column',gap:10}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'var(--c-purple-tint)',color:'var(--c-purple)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}><i data-lucide={a.icon}></i></div>
                  <h3 style={{fontSize:17,marginTop:4}} dangerouslySetInnerHTML={{__html:a.title}}></h3>
                  <p style={{fontSize:13,color:'var(--c-body)',lineHeight:1.5}} dangerouslySetInnerHTML={{__html:a.sub}}></p>
                  <div style={{fontSize:24,fontFamily:'var(--font-display)',fontWeight:700,color:'var(--c-ink)',marginTop:4}}>{a.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-narrow">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Pricing FAQ</span>
              <h2>Questions we get a lot.</h2>
            </div>
            <div className="faq-list reveal" data-delay="1">
              {[
                {q:'Can I switch plans later?',a:"Yes — upgrade, downgrade, or cancel anytime from your dashboard. Prorated billing applied automatically. If you cancel, your plan is saved for 1 months' surprises."},
                {q:"What counts as one 'generation'?",a:"One generation = one creative at one size. If you generate 4 variants × 3 sizes, that's 12 generations."},
                {q:"Do unused generations roll over?",a:"No — generations reset on your billing date. Top-ups can be purchased and do carry over for 30 days."},
                {q:"Is there a free trial of Pro?",a:"Yes. Every new account gets a 14-day Pro trial, no card required. After 14 days you drop to Starter unless you upgrade."},
                {q:"How does annual billing work?",a:"Pay annually and save 20%. You're billed once for the full year. We'll remind you 30 days before renewal."},
                {q:"Do you offer non-profit or education discounts?",a:"Yes — email us at hello@crelix.ai with proof of status. We offer 50% off Pro for qualifying organisations."},
                {q:"What payment methods do you accept?",a:"Visa, Mastercard, Amex, and Apple Pay via Stripe. Bank transfer available on Business annual plans."},
              ].map((item,i)=>(
                <details key={i} className="faq-item" {...(i===0?{open:true}:{})}>
                  <summary>{item.q}<span className="plus"><i data-lucide="plus"></i></span></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="container">
            <div className="cta-block reveal">
              <span className="eyebrow" style={{color:'rgba(255,255,255,0.85)'}}>
                <span style={{background:'rgba(255,255,255,0.85)',width:24,height:1,display:'inline-block',marginRight:8}}></span>Free to start
              </span>
              <h2 style={{marginTop:14}}>Stop briefing. Start shipping.</h2>
              <p className="lead">Your first 3 creatives are on us. Full-resolution, fully exportable, no card required.</p>
              <div className="row">
                <Link href="/studio" className="btn btn-primary btn-lg">Try Studio free <i data-lucide="arrow-right"></i></Link>
                <Link href="#" className="btn btn-ghost btn-lg"><i data-lucide="calendar"></i> Book a demo</Link>
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
