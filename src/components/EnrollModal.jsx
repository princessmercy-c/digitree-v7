import React, { useState, useEffect } from 'react'
import { COURSES, BANK, SITE, fmt } from '../utils/constants'

export default function EnrollModal({ open, courseId, currentUser, onClose, onEnrolled }) {
  const [step, setStep]         = useState(1)
  const [plan, setPlan]         = useState(null)
  const [email, setEmail]       = useState('')
  const [name,  setName]        = useState('')

  const course = COURSES.find(c => c.id === courseId)

  useEffect(() => {
    if (open) {
      setStep(1); setPlan(null)
      setEmail(currentUser?.email || '')
      setName(currentUser?.name  || '')
    }
  }, [open, currentUser])

  const copyAcc = () => navigator.clipboard.writeText(BANK.accountNo).then(() => alert('Copied!'))

  const sendWA = () => {
    const p   = course.plans[plan]
    const msg = `Hello Digitree! 🎓\n\nCourse Enrollment Payment:\nCourse: ${course.title}\nPlan: ${p.name} — ${fmt(p.price)}\nStudent: ${name}\nEmail: ${email}\n\nReceipt attached. Please unlock my course access. Thank you!`
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    onEnrolled({ courseId:course.id, name:name.trim(), email:email.trim() })
    onClose()
  }

  if (!open || !course) return null

  const icons = ['fas fa-star','fas fa-crown','fas fa-gem']

  return (
    <div className="modal-overlay is-open" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth:520 }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ fontSize:'1rem', maxWidth:'80%' }}>{course.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div className="step-progress">
            {[1,2,3].map(s => <div key={s} className={`step-dot ${step>=s?'active':''}`} />)}
          </div>

          {step===1 && (
            <>
              <p style={{ fontSize:'0.9rem', color:'var(--color-muted)', marginBottom:'1.25rem' }}>Select your preferred learning plan:</p>
              {course.plans.map((p,i) => (
                <div key={i} className={`plan-option ${plan===i?'selected':''}`} onClick={() => setPlan(i)}>
                  <div className="plan-icon"><i className={icons[i]} /></div>
                  <div className="plan-details">
                    <div className="plan-name">{p.name}</div>
                    <div className="plan-desc">{p.desc}</div>
                  </div>
                  <div className="plan-price">{fmt(p.price)}</div>
                </div>
              ))}
              <button className="btn btn-primary btn-block" style={{ marginTop:'0.5rem', borderRadius:10, padding:'0.9rem' }}
                onClick={() => { if(plan===null){alert('Please select a plan.');return} setStep(2) }}>
                Continue →
              </button>
            </>
          )}

          {step===2 && (
            <>
              <p style={{ fontSize:'0.88rem', color:'var(--color-muted)', marginBottom:'1.25rem', lineHeight:1.6 }}>
                Your email will be used to unlock course access and generate your certificate.
              </p>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" value={email} placeholder="you@example.com" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Full Name <span style={{ fontWeight:400, opacity:0.6 }}>(for certificate)</span></label>
                <input type="text" className="form-input" value={name} placeholder="Your full name" onChange={e => setName(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-block" style={{ borderRadius:10, padding:'0.9rem' }}
                onClick={() => { if(!email.trim()||!name.trim()){alert('Please fill all fields.');return} setStep(3) }}>
                Proceed to Payment →
              </button>
              <button onClick={() => setStep(1)} style={{ width:'100%', marginTop:'0.75rem', background:'none', border:'none', color:'var(--color-muted)', cursor:'pointer', fontSize:'0.85rem', fontFamily:'var(--font-sans)' }}>
                ← Back
              </button>
            </>
          )}

          {step===3 && (
            <>
              <p style={{ fontSize:'0.85rem', color:'var(--color-muted)', marginBottom:'1.25rem', lineHeight:1.65 }}>
                Transfer payment below. After payment, send your receipt on WhatsApp and we will unlock your course access.
              </p>
              <div className="account-box" style={{ marginBottom:'1.25rem' }}>
                <div className="bank-name">🏦 {BANK.bankName}</div>
                <div className="acc-holder">{BANK.accountName}</div>
                <div className="acc-number">{BANK.accountNo}</div>
                <button className="btn-copy" onClick={copyAcc}><i className="fas fa-copy" /> Copy Number</button>
              </div>
              <button className="btn-done-wa" style={{ marginBottom:'0.75rem' }} onClick={sendWA}>
                <i className="fab fa-whatsapp" style={{ fontSize:'1.2rem' }} /> Send Receipt on WhatsApp
              </button>
              <button onClick={onClose} style={{ width:'100%', background:'var(--color-off-white)', color:'var(--color-text)', border:'none', borderRadius:10, padding:'0.85rem', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)' }}>
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
