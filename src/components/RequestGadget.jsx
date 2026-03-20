import React, { useState } from 'react'
import { SITE } from '../utils/constants'

export default function RequestGadget() {
  const [form, setForm] = useState({ name:'', type:'', desc:'' })
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }))

  const handleSubmit = () => {
    if (!form.name || !form.type || !form.desc) { alert('Please fill all fields.'); return }
    const msg = `Hello Digitree! 📦\n\nGadget Request:\nName: ${form.name}\nType: ${form.type}\nDescription: ${form.desc}\n\nPlease advise on availability and pricing. Thank you!`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

  const field = { width:'100%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:9, padding:'0.75rem 1rem', color:'#fff', fontFamily:'var(--font-sans)', fontSize:'0.9rem', outline:'none' }

  return (
    <section style={{ background:'linear-gradient(135deg,var(--color-primary) 0%,var(--color-dark) 100%)', color:'#fff', padding:'var(--section-pad)' }}>
      <div className="container grid-2" style={{ gap:'4rem' }}>
        <div>
          <div style={{ display:'inline-block', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'2.5px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', padding:'0.35rem 0.9rem', borderRadius:999, marginBottom:'1rem' }}>Can't find it?</div>
          <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:800, marginBottom:'1rem', lineHeight:1.2 }}>Request Any Gadget</h2>
          <p style={{ opacity:0.82, lineHeight:1.85, marginBottom:'2rem' }}>Don't see what you need? Send us a WhatsApp request and we'll source it at the best price. Fast response guaranteed from our {SITE.location} team.</p>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>

            <i className="fab fa-whatsapp" style={{ fontSize:'1.2rem' }} /> Request on WhatsApp
          </a>
        </div>
        <div style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', borderRadius:22, padding:'2rem', border:'1px solid rgba(255,255,255,0.12)' }}>
          <h3 style={{ fontSize:'1.05rem', fontWeight:700, marginBottom:'1.25rem' }}>📦 Quick Request Form</h3>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', fontSize:'0.82rem', opacity:0.8, marginBottom:'0.4rem' }}>Your Name</label>
            <input type="text" value={form.name} placeholder="Enter your name" onChange={e => set('name',e.target.value)} style={field} />
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', fontSize:'0.82rem', opacity:0.8, marginBottom:'0.4rem' }}>Gadget Type</label>
            <select value={form.type} onChange={e => set('type',e.target.value)} style={{ ...field, background:'rgba(20,40,100,0.7)' }}>
              <option value="">-- Select type --</option>
              {['Laptop','Smartphone','Tablet','Accessories','Other'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:'1.25rem' }}>
            <label style={{ display:'block', fontSize:'0.82rem', opacity:0.8, marginBottom:'0.4rem' }}>Specifications / Description</label>
            <textarea value={form.desc} placeholder="e.g. MacBook Air M2, 16GB RAM, 256GB SSD" onChange={e => set('desc',e.target.value)} style={{ ...field, height:85, resize:'none' }} />
          </div>
          <button onClick={handleSubmit} className="btn btn-whatsapp btn-block" style={{ justifyContent:'center', padding:'0.9rem' }}>
            <i className="fab fa-whatsapp" /> Send via WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
