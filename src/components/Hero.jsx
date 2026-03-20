import React from 'react'
import { SITE } from '../utils/constants'
import logoImg from '../assets/logo.jpg'
import '../styles/hero.css'

export default function Hero({ onExploreCourses, onShopGadgets }) {
  return (
    <section className="hero" id="home">
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content anim-fade-up">
          <div className="hero__badge">
            <span className="hero__badge-dot anim-pulse" />
            Est. {SITE.founded} · {SITE.location}
          </div>
          <h1 className="hero__heading">
            Growing the Next <span className="hero__heading-grad">Digital Generation</span>
          </h1>
          <p className="hero__desc">
            A forward-thinking tech company committed to building a thriving technological ecosystem —
            raising world-class professionals empowered to <strong>innovate, earn, and lead.</strong>
          </p>
          <div className="hero__actions">
            <button className="btn btn-primary btn-lg" onClick={onExploreCourses}>
              <i className="fas fa-graduation-cap" /> Explore Courses
            </button>
            <button className="btn btn-outline btn-lg" onClick={onShopGadgets}>
              <i className="fas fa-mobile-alt" /> Shop Gadgets
            </button>
          </div>
          <div className="hero__stats">
            {[['500+','Students'],['20+','Courses'],['95%','Success']].map(([v,l]) => (
              <div key={l} className="hero__stat">
                <div className="hero__stat-value">{v}</div>
                <div className="hero__stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual anim-fade-up-2 hide-mobile">
          <div className="hero__card">
            <div className="hero__card-top">
              <img src={logoImg} alt="Digitree" className="hero__card-logo" />
              <div>
                <div className="hero__card-name">Digitree Innovation</div>
                <div className="hero__card-loc">{SITE.location}</div>
              </div>
            </div>
            <p className="hero__card-desc">
              Tech education meets practical innovation — equipping individuals with in-demand skills for the global tech economy.
            </p>
            <div className="hero__pillars">
              {[['💻','Training'],['🚀','Incubation'],['📱','Gadgets']].map(([icon,lbl]) => (
                <div key={lbl} className="hero__pillar"><span>{icon}</span><span>{lbl}</span></div>
              ))}
            </div>
          </div>
          <div className="hero__float-tag hero__float-tag--1 anim-float">🎓 New cohort open!</div>
          <div className="hero__float-tag hero__float-tag--2 anim-float-2">🚀 Incubation Hub Active</div>
        </div>
      </div>
    </section>
  )
}
