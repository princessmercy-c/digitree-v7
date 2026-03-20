import React from 'react'
import { TESTIMONIALS } from '../utils/constants'

export default function Testimonials() {
  return (
    <section style={{ background:'var(--color-off-white)', padding:'var(--section-pad)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Success Stories</div>
          <h2 className="section-title">What Our Students Say</h2>
        </div>
        <div className="grid-auto-300">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card" style={{ padding:'1.75rem' }}>
              <div style={{ color:'var(--color-accent)', fontSize:'0.9rem', marginBottom:'1rem', letterSpacing:2 }}>★★★★★</div>
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
  )
}
