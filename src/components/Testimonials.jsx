import React from 'react'
import { TESTIMONIALS } from '../utils/constants'
import logoImg from '../assets/logo.jpg'

export default function Testimonials() {
  return (
    <>
      <section style={{ background:'var(--color-off-white)', padding:'var(--section-pad)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Success Stories</div>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <div className="grid-auto-300">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card" style={{ padding:'1.75rem' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`gold-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F5D060" />
                          <stop offset="50%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill={`url(#gold-grad-${i})`}
                        stroke="#B8860B"
                        strokeWidth="0.5"
                      />
                    </svg>
                  ))}
                </div>

                <p style={{ fontSize:'0.9rem', color:'var(--color-muted)', lineHeight:1.8, marginBottom:'1.25rem', fontStyle:'italic' }}>{t.text}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,var(--color-primary),var(--color-primary-bright))', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'0.88rem', flexShrink:0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'0.88rem' }}>{t.name}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--color-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End Banner — pure white with logo */}
      <section style={{
        background: '#FFFFFF',
        padding: '80px 5%',
        textAlign: 'center',
      }}>
        <div className="container" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
          <img src={logoImg} alt="Digitree Innovation" style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
          <h2 style={{ fontSize:'clamp(1.4rem, 3vw, 2rem)', fontWeight:900, color:'var(--color-dark)', letterSpacing:'-0.5px' }}>
            DIGI<span style={{ color:'var(--color-primary-bright)' }}>TREE</span> INNOVATION
          </h2>
          <p style={{ color:'var(--color-muted)', fontSize:'1rem', maxWidth:480, lineHeight:1.7 }}>
            Innovate, earn and lead a digital generation.
          </p>
        </div>
      </section>
    </>
  )
}
