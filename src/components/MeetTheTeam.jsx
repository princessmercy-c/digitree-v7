import React, { useRef, useState, useEffect } from 'react'
import { TEAM_MEMBERS } from '../utils/constants'
import '../styles/meet-the-team.css'

function getInitials(name) {
  const p = name.trim().split(' ')
  return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length-1][0]).toUpperCase()
}

export default function MeetTheTeam() {
  const trackRef = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)
  const drag = useRef({ active:false, startX:0, scrollLeft:0 })

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive:true })
    window.addEventListener('resize', updateArrows)
    return () => { el.removeEventListener('scroll', updateArrows); window.removeEventListener('resize', updateArrows) }
  }, [])

  const STEP = 300
  const scrollLeft  = () => trackRef.current?.scrollBy({ left:-STEP, behavior:'smooth' })
  const scrollRight = () => trackRef.current?.scrollBy({ left: STEP, behavior:'smooth' })

  const onMouseDown  = e => { drag.current = { active:true, startX:e.pageX - trackRef.current.offsetLeft, scrollLeft:trackRef.current.scrollLeft }; trackRef.current.style.cursor='grabbing' }
  const onMouseLeave = () => { drag.current.active=false; if(trackRef.current) trackRef.current.style.cursor='grab' }
  const onMouseUp    = () => { drag.current.active=false; if(trackRef.current) trackRef.current.style.cursor='grab' }
  const onMouseMove  = e => {
    if (!drag.current.active) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4
  }

  return (
    <section id="team" className="team-section">
      <div className="container">
        <div className="team-header">
          <div>
            <div className="section-label">Our People</div>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle" style={{ maxWidth:480 }}>
              The passionate professionals behind Digitree Innovation — builders, educators, and community leaders.
            </p>
          </div>
          <div className="team-arrows">
            <button className={`team-arrow ${!canLeft?'team-arrow--disabled':''}`} onClick={scrollLeft} aria-label="Scroll left" disabled={!canLeft}>
              <i className="fas fa-chevron-left" />
            </button>
            <button className={`team-arrow ${!canRight?'team-arrow--disabled':''}`} onClick={scrollRight} aria-label="Scroll right" disabled={!canRight}>
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="team-track" ref={trackRef} style={{ cursor:'grab' }}
          onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {TEAM_MEMBERS.map(member => (
            <div key={member.name} className="team-card">
              <div className="team-card__avatar" style={{ background:`linear-gradient(135deg,${member.color},${member.color}cc)` }}>
                {member.photo
                  ? <img src={member.photo} alt={member.name} className="team-card__photo" />
                  : <span className="team-card__initials">{getInitials(member.name)}</span>
                }
              </div>
              <div className="team-card__info">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
              <div className="team-card__bar" style={{ background:`linear-gradient(90deg,${member.color},${member.color}44)` }} />
            </div>
          ))}
          <div className="team-track__spacer" aria-hidden="true" />
        </div>

        <p className="team-hint">
          <i className="fas fa-hand-point-right" /> Drag or use arrows to explore the team
        </p>
      </div>
    </section>
  )
}
