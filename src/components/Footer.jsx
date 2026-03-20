import React from 'react'
import { SITE } from '../utils/constants'
import logoImg from '../assets/logo.jpg'

const SOCIALS = [
  { icon:'fab fa-instagram',  href:SITE.instagram, label:'Instagram', hover:'#E1306C' },
  { icon:'fab fa-tiktok',     href:SITE.tiktok,    label:'TikTok',    hover:'#010101' },
  { icon:'fab fa-facebook-f', href:SITE.facebook,  label:'Facebook',  hover:'#1877F2' },
]

export default function Footer() {
  return (
    <footer id="contact" style={{ background:'var(--color-dark)', color:'#fff', padding:'60px 5% 28px' }}>
      <div style={{ maxWidth:'var(--max-width)', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1.2fr', gap:'3rem', marginBottom:'3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'0.85rem' }}>
              <img src={logoImg} alt="Digitree" style={{ width:38, height:38, borderRadius:8, objectFit:'cover' }} />
              <span style={{ fontWeight:900, fontSize:'1.1rem', letterSpacing:'-0.5px' }}>DIGI<span style={{ color:'var(--color-primary-bright)' }}>TREE</span></span>
            </div>
            <p style={{ fontSize:'0.87rem', opacity:0.58, lineHeight:1.8, marginBottom:'1.25rem' }}>{SITE.tagline}. Building a thriving tech ecosystem from {SITE.location}.</p>
            <div style={{ display:'flex', gap:'0.65rem' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  style={{ width:38, height:38, background:'rgba(255,255,255,0.1)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', textDecoration:'none', fontSize:'1rem', transition:'0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background=s.hover; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='none' }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize:'0.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', opacity:0.45, marginBottom:'1.25rem' }}>Quick Links</h4>
            <ul style={{ listStyle:'none' }}>
              {[['#about','About Us'],['#services','Services'],['#courses','Courses'],['#gadgets','Gadgets'],['#team','Team'],['#blog','Blog']].map(([href,label]) => (
                <li key={href} style={{ marginBottom:'0.6rem' }}>
                  <a href={href} style={{ color:'rgba(255,255,255,0.68)', textDecoration:'none', fontSize:'0.87rem', transition:'0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--color-primary-bright)'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.68)'}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontSize:'0.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', opacity:0.45, marginBottom:'1.25rem' }}>Programs</h4>
            <ul style={{ listStyle:'none' }}>
              {['Web Development','Data Science','UI/UX Design','Cybersecurity','Digital Marketing'].map(p => (
                <li key={p} style={{ marginBottom:'0.6rem' }}>
                  <a href="#courses" style={{ color:'rgba(255,255,255,0.68)', textDecoration:'none', fontSize:'0.87rem', transition:'0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--color-primary-bright)'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.68)'}>{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize:'0.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', opacity:0.45, marginBottom:'1.25rem' }}>Contact Us</h4>
            {[
              { icon:'fas fa-envelope',       text:SITE.email,    href:`mailto:${SITE.email}` },
              { icon:'fab fa-whatsapp',        text:SITE.phone,    href:`https://wa.me/${SITE.whatsapp}` },
              { icon:'fas fa-map-marker-alt',  text:SITE.location, href:null },
            ].map(c => (
              <div key={c.text} style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', marginBottom:'0.75rem' }}>
                <i className={c.icon} style={{ color:'var(--color-primary-bright)', marginTop:3, minWidth:14, fontSize:'0.85rem' }} />
                {c.href
                  ? <a href={c.href} target="_blank" rel="noreferrer" style={{ color:'rgba(255,255,255,0.68)', fontSize:'0.85rem', textDecoration:'none', lineHeight:1.5 }}>{c.text}</a>
                  : <span style={{ color:'rgba(255,255,255,0.68)', fontSize:'0.85rem', lineHeight:1.5 }}>{c.text}</span>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'0.75rem' }}>
          <p style={{ fontSize:'0.8rem', opacity:0.4 }}>© {SITE.founded} {SITE.name}. All rights reserved.</p>
          <p style={{ fontSize:'0.8rem', opacity:0.4 }}>Built with ❤️ in {SITE.location}</p>
        </div>
      </div>
      <style>{`@media(max-width:900px){footer>div>div:first-child{grid-template-columns:1fr 1fr!important;}}@media(max-width:550px){footer>div>div:first-child{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  )
}
