import React from 'react'
import { fmt } from '../utils/constants'

export default function CartSidebar({ open, onClose, cartItems, cartTotal, onChangeQty, onRemove, onCheckout }) {
  return (
    <>
      <div className={`backdrop ${open?'is-open':''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${open?'is-open':''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>🛒 Your Cart</h3>
          <button onClick={onClose} style={{ border:'none', background:'var(--blue-50)', borderRadius:8, width:32, height:32, cursor:'pointer', color:'var(--color-muted)', fontSize:'1rem' }} aria-label="Close">✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-cart" />
              <p style={{ fontWeight:600 }}>Your cart is empty</p>
              <p style={{ fontSize:'0.82rem', marginTop:'0.4rem' }}>Add gadgets to get started</p>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-icon">{item.emoji || '📦'}</div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => onChangeQty(item.id,-1)} aria-label="Decrease">−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onChangeQty(item.id, 1)} aria-label="Increase">+</button>
                </div>
                <button className="remove-item-btn" onClick={() => onRemove(item.id)}>✕ Remove</button>
              </div>
              <div className="cart-item-price">{fmt(item.subtotal)}</div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span className="cart-total-amount">{fmt(cartTotal)}</span>
            </div>
            <button className="btn btn-primary btn-block" style={{ borderRadius:10, padding:'0.9rem' }} onClick={onCheckout}>
              Proceed to Payment
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
