import React from 'react'
import { COURSES, SITE } from '../utils/constants'
import logoImg from '../assets/logo.jpg'

export default function CertOverlay({ open, courseId, studentName, onClose }) {
  const course = COURSES.find(c => c.id===courseId)
  const today  = new Date().toLocaleDateString('en-NG', { day:'numeric', month:'long', year:'numeric' })

  if (!open || !course) return null

  return (
    <div className="cert-overlay is-open" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="cert-box">
        <div className="cert-design">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
            <img src={logoImg} alt="Digitree" style={{ width:48, height:48, borderRadius:10, objectFit:'cover', border:'2px solid rgba(255,255,255,0.2)' }} />
            <div style={{ textAlign:'left' }}>
              <div style={{ fontWeight:900, fontSize:'1.1rem' }}>DIGITREE INNOVATION</div>
              <div style={{ fontSize:'0.68rem', opacity:0.6, letterSpacing:'2px', textTransform:'uppercase' }}>{SITE.location}</div>
            </div>
          </div>
          <div style={{ height:1, background:'rgba(255,255,255,0.18)', margin:'0 0 2rem' }} />
          <div style={{ fontSize:'0.7rem', letterSpacing:'3px', textTransform:'uppercase', opacity:0.6, marginBottom:'0.75rem' }}>Certificate of Completion</div>
          <div style={{ fontSize:'0.9rem', opacity:0.72, marginBottom:'1.25rem' }}>This is to certify that</div>
          <div style={{ fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:900, borderBottom:'2px solid rgba(255,255,255,0.25)', paddingBottom:'0.75rem', marginBottom:'1rem' }}>
            {studentName || 'Student Name'}
          </div>
          <div style={{ fontSize:'0.9rem', opacity:0.82, marginBottom:'0.5rem' }}>has successfully completed the course</div>
          <div style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'2rem' }}>{course.title}</div>
          <div style={{ display:'flex', justifyContent:'center', gap:'4rem', fontSize:'0.78rem', opacity:0.55 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.35)', paddingTop:'0.5rem', marginTop:'0.5rem' }}>Digitree Innovation</div>
              <div style={{ opacity:0.7, fontSize:'0.68rem', marginTop:'0.15rem' }}>Director</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.35)', paddingTop:'0.5rem', marginTop:'0.5rem' }}>{today}</div>
              <div style={{ opacity:0.7, fontSize:'0.68rem', marginTop:'0.15rem' }}>Date Issued</div>
            </div>
          </div>
        </div>
        <div className="cert-actions">
          <button className="btn-dl" onClick={() => alert('Your certificate PDF will be emailed to you within 24 hours. Contact us on WhatsApp to request it directly.')}>
            <i className="fas fa-download" /> Download Certificate
          </button>
          <button className="btn-close-cert" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
