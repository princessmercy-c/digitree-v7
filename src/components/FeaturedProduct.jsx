import React, { useState } from 'react'
import { FEATURED_GADGET, SITE, fmt } from '../utils/constants'
import featuredImg from '../assets/gadgets/gadget1.jpg'
import '../styles/featured-product.css'

export default function FeaturedProduct({ onAddToCart }) {
  const g = FEATURED_GADGET
  const [imgLoaded, setImgLoaded] = useState(false)
  const [added,     setAdded]     = useState(false)

  const handleAdd = () => {
    if (onAddToCart) onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section id="gadgets" className="featured-section">
      <div className="featured-section__bg" aria-hidden="true" />
      <div className="container">
        <div className="section-header">
          <div className="section-label">Shop Tech</div>
          <h2 className="section-title">Featured Product</h2>
          <p className="section-subtitle">Our hand-picked staff favourite this month. Visit our Shopify store to browse the full catalogue.</p>
        </div>

        <div className="featured-card">
          {/* Image panel */}
          <div className="featured-card__image-panel">
            {!imgLoaded && <div className="featured-card__skeleton" />}
            <img
              src={featuredImg}
              alt={g.name}
              className={`featured-card__img ${imgLoaded ? 'featured-card__img--loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
            <span className="featured-badge featured-badge--tag">{g.tag}</span>
            <span className="featured-badge featured-badge--staff">{g.badge}</span>
            <div className="featured-card__price-pill">{fmt(g.price)}</div>
          </div>

          {/* Info panel */}
          <div className="featured-card__info">
            <h3 className="featured-card__name">{g.name}</h3>

            <div className="featured-card__specs">
              {g.specs.map(spec => (
                <div key={spec.label} className="spec-item">
                  <div className="spec-item__icon"><i className={spec.icon} /></div>
                  <div>
                    <div className="spec-item__label">{spec.label}</div>
                    <div className="spec-item__value">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <ul className="featured-card__highlights">
              {g.highlights.map(h => (
                <li key={h} className="highlight-item">
                  <span className="highlight-item__tick">✓</span>{h}
                </li>
              ))}
            </ul>

            <div className="featured-card__actions">
              <button className="btn btn-primary btn-lg" onClick={handleAdd} style={{ minWidth:185 }}>
                <i className={added ? 'fas fa-check' : 'fas fa-shopping-cart'} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <a href={SITE.shopifyStore} target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
                <i className="fas fa-store" /> See Full Store
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello Digitree! I'm interested in the ${g.name} (${fmt(g.price)}). Please share availability. Thank you!`)}`}
                target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg"
              >
                <i className="fab fa-whatsapp" /> WhatsApp Enquiry
              </a>
            </div>

            <div className="featured-card__trust">
              {[
                { icon:'fas fa-shield-alt',    text:'Verified Genuine' },
                { icon:'fas fa-shipping-fast', text:'Fast Delivery'    },
                { icon:'fas fa-comments',      text:'WhatsApp Support' },
              ].map(t => (
                <div key={t.text} className="trust-item"><i className={t.icon} /><span>{t.text}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="featured-browse">
          <p className="featured-browse__text">We also stock iPhones, MacBooks, tablets, and accessories — visit our Shopify store for the full range.</p>
          <a href={SITE.shopifyStore} target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Browse Full Catalogue →</a>
        </div>
      </div>
    </section>
  )
}
