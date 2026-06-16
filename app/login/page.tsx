'use client'
import { useState } from 'react'
import Link from 'next/link'
import LucideInit from '@/components/LucideInit'

export default function LoginPage() {
  const [mode, setMode] = useState<'login'|'signup'>('login')

  const isSignup = mode === 'signup'

  return (
    <>
      <style>{`body { background: #fff; }`}</style>

      <div className="auth-nav-strip">
        <Link href="/" className="logo">
          <img src="/assets/crelix-logo.png" alt="Crelix" />
        </Link>
        <div style={{marginLeft:'auto',fontSize:13,color:'var(--c-muted)'}}>
          New to Crelix?{' '}
          <button onClick={()=>setMode('signup')} style={{color:'var(--c-purple)',fontWeight:600,background:'none',border:'none',cursor:'pointer',fontSize:13}}>
            Create an account
          </button>
        </div>
      </div>

      <main className="auth-wrap">
        {/* LEFT: form */}
        <section className="auth-left">
          <h1>{isSignup ? 'Create your account.' : 'Welcome back.'}</h1>
          <p className="lead">
            {isSignup
              ? 'Start free. Generate your first 5 creatives on us — no card required.'
              : 'Sign in to keep generating scroll-stopping ad creatives — in one click.'}
          </p>

          <form className="auth-form" onSubmit={e=>e.preventDefault()}>
            {isSignup && (
              <div className="field-grp">
                <label htmlFor="auth-name">Full name</label>
                <input className="text-input" id="auth-name" type="text" placeholder="Ria Mehta" autoComplete="name" />
              </div>
            )}
            <div className="field-grp">
              <label htmlFor="auth-email">Work email</label>
              <input className="text-input" id="auth-email" type="email" placeholder="you@brand.com" autoComplete="email" />
            </div>
            <div className="field-grp">
              <label htmlFor="auth-pass">Password</label>
              <input className="text-input" id="auth-pass" type="password" placeholder="••••••••" autoComplete={isSignup?'new-password':'current-password'} />
            </div>

            {!isSignup && (
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:13}}>
                <label style={{display:'inline-flex',alignItems:'center',gap:6,color:'var(--c-ink-2)',fontWeight:500,letterSpacing:0,textTransform:'none'}}>
                  <input type="checkbox" style={{accentColor:'var(--c-purple)'}} /> Remember me
                </label>
                <a href="#" style={{color:'var(--c-purple)',fontWeight:600}}>Forgot password?</a>
              </div>
            )}

            <button className="btn btn-primary" type="submit" style={{width:'100%',justifyContent:'center'}}>
              {isSignup ? 'Create account' : 'Sign in'} <i data-lucide="arrow-right"></i>
            </button>

            <div className="or">or continue with</div>
            <div className="social">
              <button type="button">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M17.05 12.04c-.03-2.85 2.33-4.21 2.43-4.28-1.32-1.94-3.39-2.2-4.13-2.23-1.76-.18-3.43 1.03-4.32 1.03-.9 0-2.27-1-3.73-.97-1.92.03-3.69 1.11-4.68 2.83-2 3.46-.51 8.58 1.43 11.39.95 1.38 2.07 2.92 3.54 2.87 1.42-.06 1.96-.92 3.68-.92 1.72 0 2.21.92 3.72.89 1.54-.03 2.51-1.4 3.44-2.79 1.09-1.6 1.53-3.15 1.55-3.23-.03-.01-2.96-1.13-2.99-4.5z M14.69 3.81c.78-.95 1.31-2.27 1.17-3.58-1.13.05-2.5.75-3.31 1.7-.72.84-1.36 2.18-1.19 3.47 1.26.1 2.55-.64 3.33-1.59z"/></svg>
                Apple
              </button>
            </div>
          </form>

          <p className="auth-foot">
            {isSignup
              ? <><button onClick={()=>setMode('login')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--c-purple)',fontWeight:600}}>Sign in</button> if you already have an account.</>
              : <>Don&apos;t have an account? <button onClick={()=>setMode('signup')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--c-purple)',fontWeight:600}}>Create one — it&apos;s free.</button></>
            }
            <br />
            <span style={{display:'block',marginTop:8}}>
              By continuing you agree to our{' '}
              <a href="#" style={{color:'var(--c-ink-2)',textDecoration:'underline',textUnderlineOffset:2}}>Terms</a> and{' '}
              <a href="#" style={{color:'var(--c-ink-2)',textDecoration:'underline',textUnderlineOffset:2}}>Privacy Policy</a>.
            </span>
          </p>
        </section>

        {/* RIGHT: marketing panel */}
        <aside className="auth-right">
          <div>
            <span className="eyebrow" style={{color:'#fff'}}>
              <span style={{background:'#fff',width:24,height:1,display:'inline-block',marginRight:8}}></span>What you get
            </span>
            <p className="quote" style={{marginTop:22}}>From URL to scroll-stopping ad — in under 60 seconds.</p>
            <div className="feat-list">
              {[
                {icon:'zap',title:'One-click generation.',desc:'Paste a website. Pick a platform. Get publish-ready creatives in 50+ sizes.'},
                {icon:'palette',title:'Auto brand detection.',desc:'Crelix reads your colors, fonts, and product imagery — no style guide upload.'},
                {icon:'badge-check',title:'Logo stays your logo.',desc:'Composited last, never warped or recolored by AI.'},
                {icon:'download',title:'Layered exports.',desc:'PNG, JPG, or PSD — swap copy, regenerate variants, ship to Ads Manager.'},
              ].map(f=>(
                <div key={f.title} className="f-row">
                  <span className="f-ico"><i data-lucide={f.icon}></i></span>
                  <div><b>{f.title}</b> {f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:36,padding:18,background:'rgba(255,255,255,0.12)',borderRadius:16,backdropFilter:'blur(8px)'}}>
              <p style={{fontSize:13.5,color:'rgba(255,255,255,0.92)',lineHeight:1.55}}>
                &quot;We replaced a $4k/month freelance designer with Crelix in week one. CTR went up, not down.&quot;
              </p>
              <div className="att" style={{marginTop:14}}>
                <div className="av">SR</div>
                <div className="who"><div className="n">Sam Rios</div><div className="r">Head of Growth · Sundry</div></div>
              </div>
            </div>
          </div>
          <div className="stats-mini">
            <div><div className="n">12,400+</div><div className="l">brands shipping</div></div>
            <div><div className="n">1.2M</div><div className="l">creatives generated</div></div>
            <div><div className="n">&lt;30s</div><div className="l">avg. generation</div></div>
          </div>
        </aside>
      </main>
      <LucideInit />
    </>
  )
}
