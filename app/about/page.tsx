'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LucideInit from '@/components/LucideInit'
import RevealInit from '@/components/RevealInit'

export default function AboutPage() {
  return (
    <>
      <Navbar active="about" />
      <main>
        {/* HERO */}
        <section className="page-head about-hero">
          <div className="container">
            <div className="page-head-2col">
              <div className="ph-left">
                <span className="eyebrow reveal">About Crelix</span>
                <h1 className="reveal" data-delay="1">
                  Performance marketers shouldn&apos;t<br />have to <span className="grad-text">wait on design.</span>
                </h1>
                <p className="lead reveal" data-delay="2">
                  We&apos;re building the shortest path from &quot;I have an idea&quot; to &quot;the ad is live.&quot; No briefs, no Slack threads, no four-day turnaround. Paste a URL. Ship the campaign.
                </p>
                <div className="about-meta reveal" data-delay="3">
                  <div className="item"><span className="k">Founded</span><span className="v">2024</span></div>
                  <div className="item"><span className="k">Based in</span><span className="v">San Francisco · Remote</span></div>
                  <div className="item"><span className="k">Team</span><span className="v">12 people</span></div>
                  <div className="item"><span className="k">Backed by</span><span className="v">Sequoia, YC, angels</span></div>
                </div>
              </div>
              <div className="ph-right reveal" data-delay="2">
                <div className="ph-stats">
                  <div className="ph-stat-tile tall">
                    <span className="ico-tile"><i data-lucide="rocket"></i></span>
                    <div className="n">12,400+</div>
                    <div className="l">Brands shipping with Crelix every month, across 38 countries.</div>
                  </div>
                  <div className="ph-stat-tile"><div className="n">1.2M</div><div className="l">Creatives generated</div></div>
                  <div className="ph-stat-tile"><div className="n">&lt;30s</div><div className="l">Avg. generation time</div></div>
                </div>
              </div>
            </div>
            <div className="about-img-block reveal" data-delay="4">
              <img src="https://picsum.photos/seed/crelix-team-hero/1600/700" alt="Crelix team at work" loading="lazy" />
            </div>
          </div>
        </section>

        {/* STORY */}
        <section>
          <div className="container">
            <div className="about-grid">
              <div className="reveal">
                <span className="eyebrow">Our story</span>
                <h2 style={{marginTop:14,fontSize:'clamp(28px, 3.5vw, 40px)'}}>From spreadsheet of ad sizes to one-click creative.</h2>
              </div>
              <div className="reveal" data-delay="1">
                <p>We were running performance marketing at a Series-B startup. Every campaign had the same workflow: brief the designer, wait three days, get four creatives back, request changes, wait two more days, finally ship something that may or may not work.</p>
                <p>The bottleneck wasn&apos;t ideas. It wasn&apos;t budget. It wasn&apos;t even quality. It was <b>time-to-creative</b>. By the time the new ad shipped, the trend had moved on.</p>
                <p>So we built the thing we wanted to use ourselves: paste a URL, pick a platform, get scroll-stopping creatives — sized, styled, on-brand — in under a minute. No briefs. No back-and-forth. No design debt.</p>
                <p>That tool became Crelix. We launched in 2024, and today it powers ad creative for performance teams shipping thousands of campaigns a month.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">What we believe</span>
              <h2 style={{fontSize:'clamp(28px, 3.5vw, 40px)'}}>Three things that guide every product decision.</h2>
            </div>
            <div className="values reveal" data-delay="1">
              <div className="value-card"><span className="num">01</span><h3>Speed is the feature.</h3><p>Most creative tools optimize for control. We optimize for time-to-shipped. If a feature adds five seconds to your workflow, we have to be very sure it&apos;s worth it.</p></div>
              <div className="value-card"><span className="num">02</span><h3>Defaults that don&apos;t suck.</h3><p>You shouldn&apos;t need a design degree to get a great-looking ad. Every default in Crelix is tuned by working designers — so the first output is already shippable.</p></div>
              <div className="value-card"><span className="num">03</span><h3>The brand is yours.</h3><p>We never warp your logo. Never recolor it. Never invent fake products. Crelix amplifies your brand — it doesn&apos;t replace it with AI slop.</p></div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">The team</span>
              <h2 style={{fontSize:'clamp(28px, 3.5vw, 40px)'}}>A small, opinionated crew.</h2>
              <p className="lead muted">Designers, ML engineers, and former performance marketers. We use Crelix daily — and ship a new feature most weeks.</p>
            </div>
            <div className="team reveal" data-delay="1">
              {[
                {img:12,name:'Ria Mehta',role:'Co-founder · CEO'},
                {img:33,name:'Daniel Park',role:'Co-founder · CTO'},
                {img:47,name:'Sofia Alvarez',role:'Head of Design'},
                {img:68,name:'Marcus Lee',role:'Head of ML'},
                {img:22,name:'Anna Volkov',role:'Product Engineer'},
                {img:55,name:'Tomás Ribeiro',role:'Growth · Marketing'},
                {img:42,name:'Priya Shah',role:'Customer Success'},
                {img:58,name:'Jonas Berg',role:'ML Engineer'},
              ].map(m=>(
                <div key={m.name} className="team-card">
                  <div className="team-avatar"><img src={`https://i.pravatar.cc/400?img=${m.img}`} alt="" loading="lazy" /></div>
                  <div><div className="name">{m.name}</div><div className="role">{m.role}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BACKED BY */}
        <section className="section-narrow">
          <div className="container">
            <div className="sec-head center reveal">
              <span className="eyebrow center">Backed by &amp; built with</span>
              <h2 style={{fontSize:'clamp(24px, 3vw, 32px)'}}>In good company.</h2>
            </div>
            <div className="trust-row reveal" data-delay="1">
              {['Sequoia','Y Combinator','South Park','Lerer Hippeau','Hustle Fund','Acrew'].map(b=><div key={b} className="brand">{b}</div>)}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">How we got here</span>
              <h2 style={{fontSize:'clamp(28px, 3.5vw, 40px)'}}>From side project to 12,400 brands.</h2>
            </div>
            <div className="reveal" data-delay="1" style={{borderLeft:'2px solid var(--c-line)',paddingLeft:32,display:'flex',flexDirection:'column',gap:36,maxWidth:720}}>
              {[
                {date:'Feb 2024',title:'Idea over a Slack DM.',desc:"Two co-founders, both frustrated with the brief → design → revision loop. We sketched the URL-to-creative flow on a napkin in week one."},
                {date:'Jun 2024',title:'Closed beta · 50 brands.',desc:"Hand-onboarded the first 50 brands. Half were performance marketers, half were founders shipping their own ads. The signal was unmistakable."},
                {date:'Oct 2024',title:'Seed round · public launch.',desc:"Raised $4.5M led by Sequoia. Launched publicly on Product Hunt — #1 product of the day, #2 of the week."},
                {date:'May 2026',title:'12,400 brands. 1.2M creatives.',desc:"Now powering ad creative for performance teams across 38 countries — from solo founders to in-house teams running 100+ campaigns a month."},
              ].map(item=>(
                <div key={item.date} style={{position:'relative'}}>
                  <div style={{position:'absolute',left:-41,top:0,width:18,height:18,borderRadius:'50%',background:'var(--c-purple)',border:'3px solid #fff',boxShadow:'0 0 0 2px var(--c-purple)'}}></div>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:13,color:'var(--c-purple)',letterSpacing:'0.08em',textTransform:'uppercase'}}>{item.date}</div>
                  <h3 style={{marginTop:4,fontSize:18}}>{item.title}</h3>
                  <p style={{marginTop:6,color:'var(--c-body)',fontSize:14.5}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="eyebrow">In the press</span>
              <h2 style={{fontSize:'clamp(28px, 3.5vw, 40px)'}}>What people are saying.</h2>
            </div>
            <div className="reveal" data-delay="1" style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:20}}>
              {[
                {pub:'TechCrunch',quote:'"The fastest path from URL to publish-ready ad creative we\'ve tested. Crelix isn\'t a generator — it\'s a creative ops team in a box."',date:'Oct 2024'},
                {pub:'The Information',quote:'"In a category crowded with AI image tools, Crelix wins by aggressively narrowing the surface. Six fields. One button. The output is shippable."',date:'Jan 2025'},
                {pub:'Marketing Brew',quote:'"For performance teams who measure in hours, not weeks. Crelix is the rare AI tool that respects the constraints of paid social."',date:'Mar 2025'},
              ].map(p=>(
                <div key={p.pub} style={{padding:28,background:'#fff',border:'1px solid var(--c-line)',borderRadius:'var(--r-lg)'}}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:15,color:'var(--c-ink)',marginBottom:12}}>{p.pub}</div>
                  <p style={{fontSize:14.5,color:'var(--c-body)',lineHeight:1.6}}>{p.quote}</p>
                  <div style={{marginTop:16,fontSize:12,color:'var(--c-muted)'}}>{p.date}</div>
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
                <span style={{background:'rgba(255,255,255,0.85)',width:24,height:1,display:'inline-block',marginRight:8}}></span>Join us
              </span>
              <h2 style={{marginTop:14}}>We&apos;re hiring engineers and designers.</h2>
              <p className="lead">Small team, big leverage, real problems. We ship a meaningful release most weeks.</p>
              <div className="row">
                <Link href="#" className="btn btn-primary btn-lg">See open roles <i data-lucide="arrow-right"></i></Link>
                <Link href="#" className="btn btn-ghost btn-lg"><i data-lucide="mail"></i> hello@crelix.ai</Link>
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
