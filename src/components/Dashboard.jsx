import React from 'react'
import { COURSES } from '../utils/constants'

export default function Dashboard({ currentUser, myCourses, onClose, onMarkDone, onViewCert }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'var(--color-off-white)', zIndex:4000, overflowY:'auto', animation:'fadeIn 0.2s ease' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'2rem 1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,var(--color-primary),var(--color-primary-bright))', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'1.3rem', fontWeight:700, flexShrink:0 }}>
              {(currentUser?.name||'U')[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:'1.1rem' }}>{currentUser?.name}</div>
              <div style={{ fontSize:'0.82rem', color:'var(--color-muted)' }}>{currentUser?.email}</div>
            </div>
          </div>
          <button className="btn btn-outline" onClick={onClose}>← Back to Site</button>
        </div>

        <div className="section-label" style={{ marginBottom:'1.5rem' }}>My Enrolled Courses</div>

        {myCourses.length===0 ? (
          <div className="card" style={{ padding:'2.5rem', textAlign:'center', color:'var(--color-muted)' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📚</div>
            <p style={{ fontWeight:600 }}>No courses yet</p>
            <p style={{ fontSize:'0.82rem', marginTop:'0.5rem' }}>Enroll in a course and complete payment. Your access will appear here once confirmed.</p>
          </div>
        ) : (
          <div className="grid-auto-300">
            {myCourses.map(mc => {
              const course = COURSES.find(c => c.id===mc.courseId)
              if (!course) return null
              return (
                <div key={mc.courseId} className="card" style={{ padding:'1.5rem' }}>
                  {mc.completed && <div className="badge-complete">✓ Completed</div>}
                  <div style={{ fontSize:'1.6rem', marginBottom:'0.5rem' }}>{course.icon}</div>
                  <h4 style={{ fontSize:'0.97rem', fontWeight:700, marginBottom:'0.5rem' }}>{course.title}</h4>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--color-muted)', marginBottom:'0.4rem' }}>
                    <span>Progress</span><span>{mc.progress}%</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom:'1rem' }}>
                    <div className="progress-fill" style={{ width:`${mc.progress}%` }} />
                  </div>
                  {mc.completed ? (
                    <button onClick={() => onViewCert(mc.courseId)} style={{ width:'100%', background:'var(--color-accent)', color:'#fff', border:'none', borderRadius:9, padding:'0.65rem', fontWeight:700, cursor:'pointer', fontSize:'0.85rem', fontFamily:'var(--font-sans)' }}>
                      🎓 View & Download Certificate
                    </button>
                  ) : (
                    <button onClick={() => onMarkDone(mc.courseId)} style={{ width:'100%', background:'var(--blue-50)', color:'var(--color-primary)', border:'1px solid var(--color-border)', borderRadius:9, padding:'0.65rem', fontWeight:700, cursor:'pointer', fontSize:'0.85rem', fontFamily:'var(--font-sans)' }}>
                      ✓ Mark as Complete
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
