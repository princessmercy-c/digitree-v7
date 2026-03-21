import React, { useState } from 'react'
import { BLOG_POSTS, SITE } from '../utils/constants'
import '../styles/blog.css'

export default function BlogSection() {
  const [activePost, setActivePost] = useState(null)

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Insights & Tips</div>
          <h2 className="section-title">From the Digitree Blog</h2>
          <p className="section-subtitle">Tech career advice, gadget guides, and community stories — written for the next generation of Nigerian tech professionals.</p>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <article key={post.id} className={`blog-card ${i===0?'blog-card--featured':''}`}>
              <div className="blog-card__thumb" style={{ backgroundImage: 'url(' + post.image + ')', backgroundSize: 'cover' }}>
                <span className="blog-card__emoji" aria-hidden="true">{post.emoji}</span>
                <span className="blog-card__category">{post.category}</span>
              </div>
              <div className="blog-card__body">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__meta">
                  <div className="blog-card__author">
                    <div className="blog-card__avatar">{post.author.charAt(0)}</div>
                    <div>
                      <div className="blog-card__author-name">{post.author}</div>
                      <div className="blog-card__date">{post.date}</div>
                    </div>
                  </div>
                  <div className="blog-card__read-time">
                    <i className="far fa-clock" />{post.readTime}
                  </div>
                </div>
                <button className="blog-card__read-btn"
                  onClick={() => setActivePost(post)}>
                  Read Article <i className="fas fa-arrow-right" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-footer">
          <p className="blog-footer__text">Want more tips and resources? Follow us on social media for daily tech content.</p>
          <div className="blog-footer__socials">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="blog-social-btn blog-social-btn--ig"><i className="fab fa-instagram" /> Instagram</a>
            <a href={SITE.tiktok}    target="_blank" rel="noreferrer" className="blog-social-btn blog-social-btn--tt"><i className="fab fa-tiktok"    /> TikTok</a>
            <a href={SITE.facebook}  target="_blank" rel="noreferrer" className="blog-social-btn blog-social-btn--fb"><i className="fab fa-facebook-f" /> Facebook</a>
          </div>
        </div>
      </div>

      {/* Blog Article Modal */}
      {activePost && (
        <div className="blog-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setActivePost(null) }}>
          <div className="blog-modal">
            <button className="blog-modal__close" onClick={() => setActivePost(null)} aria-label="Close">✕</button>
            <div className="blog-modal__header">
              {activePost.category && <span className="blog-modal__category">{activePost.category}</span>}
              <h2 className="blog-modal__title">{activePost.title}</h2>
              <div className="blog-modal__meta">
                <span>{activePost.author}</span>
                <span>{activePost.date}</span>
                {activePost.readTime && <span>{activePost.readTime}</span>}
              </div>
            </div>
            <div className="blog-modal__content" dangerouslySetInnerHTML={{ __html: activePost.content }} />
            {activePost.tags && activePost.tags.length > 0 && (
              <div className="blog-modal__tags">
                {activePost.tags.map(tag => <span key={tag} className="blog-modal__tag">{tag}</span>)}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
