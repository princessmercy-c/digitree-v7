import React from 'react'
import { BANK, SITE, fmt } from '../utils/constants'

export default function PaymentPage({ cartItems, cartTotal, onBack, onDone }) {
  const copyAcc = () => navigator.clipboard.writeText(BANK.accountNo).then(() => alert('Account number copied!'))

  const sendWA = () => {
    const lines = cartItems.map(i => `• ${i.name} x${i.qty} = ${fmt(i.subtotal)}`).join('\n')
    const msg = `Hello Digitree! 🛒\n\nI have made payment for:\n${lines}\n\nTotal: ${fmt(cartTotal)}\n\nReceipt attached. Please confirm my order. Thank you!`
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    onDone()
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'#fff', zIndex:5000, overflowY:'auto', animation:'fadeIn 0.25s ease' }}>
      <div style={{ maxWidth:560, margin:'0 auto', padding:'3rem 1.5rem' }}>
        <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:'none', border:'none', cursor:'pointer', color:'var(--color-muted)', fontFamily:'var(--font-sans)', fontSize:'0.9rem', marginBottom:'2rem', padding:0 }}>
          <i className="fas fa-arrow-left" /> Back to Cart
        </button>
        <h2 style={{ fontSize:'1.8rem', fontWeight:800, marginBottom:'0.5rem' }}>Complete Your Order</h2>
        <p style={{ color:'var(--color-muted)', marginBottom:'2rem' }}>Review your order, then transfer to the account below.</p>

        <div style={{ background:'var(--color-off-white)', borderRadius:14, padding:'1.5rem', marginBottom:'2rem', border:'1px solid var(--color-border)' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 0', borderBottom:'1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontSize:'0.9rem', fontWeight:600 }}>{item.name}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--color-muted)' }}>Qty: {item.qty}</div>
              </div>
              <div style={{ fontWeight:700, color:'var(--color-primary)' }}>{fmt(item.subtotal)}</div>
            </div>
          ))}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1rem', marginTop:'0.5rem', borderTop:'2px solid var(--color-border)', fontSize:'1.1rem', fontWeight:800 }}>
            <span>Total Amount</span>
            <span style={{ color:'var(--color-primary)', fontFamily:'var(--font-mono)' }}>{fmt(cartTotal)}</span>
          </div>
        </div>

        <div className="account-box">
          <div className="bank-name">🏦 {BANK.bankName}</div>
          <div className="acc-holder">{BANK.accountName}</div>
          <div className="acc-number">{BANK.accountNo}</div>
          <button className="btn-copy" onClick={copyAcc}><i className="fas fa-copy" /> Copy Account Number</button>
        </div>

        <p style={{ fontSize:'0.82rem', color:'var(--color-muted)', textAlign:'center', marginBottom:'1.5rem', lineHeight:1.6 }}>
          After making the transfer, click the button below to send your receipt on WhatsApp for instant confirmation.
        </p>
        <button className="btn-done-wa" onClick={sendWA}>
          <i className="fab fa-whatsapp" style={{ fontSize:'1.3rem' }} />
          DONE — Send Receipt on WhatsApp
        </button>
      </div>
    </div>
  )
}
