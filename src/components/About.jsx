import React from 'react'
import { SITE } from '../utils/constants'
import logoImg from '../assets/logo.jpg'

export default function About() {
  const pillars = [
    { icon: 'fas fa-graduation-cap', title: 'Tech Education',  desc: 'In-demand digital skills' },
    { icon: 'fas fa-lightbulb',      title: 'Incubation Hub',  desc: 'Support for startups'     },
    { icon: 'fas fa-mobile-alt',     title: 'Gadget Sales',    desc: 'Quality tech products'    },
    { icon: 'fas fa-users',          title: 'Community',       desc: 'Creators & leaders'       },
  ]
  return (
    <section id="about" style={{ background:'var(--color-off-white)', padding:'var(--section-pad)' }}>
      <div className="container grid-2">
        {/* Visual */}
        <div style={{ position:'relative' }}>
          <div className="card" style={{ overflow:'hidden' }}>
            <div style={{ height:200, background:'linear-gradient(135deg,var(--color-primary),var(--color-dark))', display:'flex', alignItems:'center', justifyContent:'center', gap:'1.5rem' }}>
              <img src={logoImg} alt="Digitree" style={{ width:80, height:80, borderRadius:16, objectFit:'cover', border:'3px solid rgba(255,255,255,0.2)', boxShadow:'0 8px 30px rgba(0,0,0,0.3)' }} />
              <div style={{ color:'#fff' }}>
                <div style={{ fontWeight:900, fontSize:'1.4rem', letterSpacing:'-0.5px' }}>DIGITREE</div>
                <div style={{ fontSize:'0.78rem', opacity:0.65, marginTop:'0.2rem' }}>Innovation Hub</div>
              </div>
            </div>
            <div style={{ padding:'1.75rem' }}>
              <h3 style={{ fontWeight:700, marginBottom:'0.75rem' }}>Our Mission</h3>
              <p style={{ color:'var(--color-muted)', lineHeight:1.8, fontSize:'0.92rem' }}>
                To build a community of creators, problem solvers, and leaders who will use technology to drive progress and deliver solutions to challenges worldwide — starting from Nsukka.
              </p>
            </div>
          </div>
          <div style={{ position:'absolute', top:-20, right:-20, background:'linear-gradient(135deg,var(--color-accent),#ffcc44)', color:'#fff', borderRadius:14, padding:'1.1rem 1.5rem', textAlign:'center', boxShadow:'0 8px 24px rgba(240,165,0,0.4)' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.75rem', fontWeight:700 }}>Since</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.75rem', fontWeight:700 }}>{SITE.founded}</div>
            <div style={{ fontSize:'0.72rem', opacity:0.88 }}>Growing Strong</div>
          </div>
        </div>
        {/* Text */}
        <div>
          <div className="section-label">About Digitree</div>
          <h2 className="section-title">Shaping a Future Powered by Technology</h2>
          <p style={{ color:'var(--color-muted)', lineHeight:1.85, marginBottom:'1rem', fontSize:'0.97rem' }}>
            At Digitree, we combine technology education with practical innovation. Through our training programs, we equip individuals with in-demand digital skills, preparing them to succeed in the global technology industry.
          </p>
          <p style={{ color:'var(--color-muted)', lineHeight:1.85, fontSize:'0.97rem', marginBottom:'1.5rem' }}>
            Our vision is to shape a future where technology becomes a powerful tool for solving challenges — starting right here in {SITE.location}.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem', marginTop:'1.5rem' }}>
            {pillars.map(p => (
              <div key={p.title} style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'1rem', background:'#fff', borderRadius:12, border:'1px solid var(--color-border)' }}>
                <div style={{ width:36, height:36, minWidth:36, background:'var(--blue-50)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--color-primary)', fontSize:'0.9rem' }}>
                  <i className={p.icon} />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'0.88rem', marginBottom:'0.2rem' }}>{p.title}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--color-muted)' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
