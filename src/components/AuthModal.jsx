import React, { useState } from 'react'
import { auth } from '../utils/firebase'; 


import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "firebase/auth";

// 1. SIGN UP FUNCTION
const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    // You can now save extra info (like their role) to Firestore here
  } catch (error) {
    console.error("Signup Error:", error.message);
  }
};

// 2. LOGIN FUNCTION
const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};



export default function AuthModal({ open, onClose, onLogin, onRegister, onGoogleLogin }) {
  const [mode,  setMode]  = useState('login')
  const [form,  setForm]  = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }))

  const handleLogin = () => {
    const result = onLogin({ email:form.email, password:form.password })
    if (result && !result.ok) { setError(result.error); return }
    onClose()
  }

  const handleRegister = () => {
    if (!form.name||!form.email||!form.password) { setError('Please fill in all fields.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    onRegister({ name:form.name, email:form.email, password:form.password })
    onClose()
  }

  const handleGoogle = () => { onGoogleLogin(form.email||undefined); onClose() }
  const switchMode   = (m) => { setMode(m); setError(''); setForm({ name:'', email:'', password:'' }) }

  if (!open) return null

  return (
    <div className="modal-overlay is-open" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{mode==='login' ? '👋 Welcome Back' : '🚀 Create Account'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div className="form-notice">🔐 Your session is saved — you won't need to log in every time.</div>
          {error && <div className="form-error">{error}</div>}

          {mode==='register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={form.name} placeholder="Your full name" autoComplete="name" onChange={e => set('name',e.target.value)} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={form.email} placeholder="you@example.com" autoComplete="email" onChange={e => set('email',e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={form.password}
              placeholder={mode==='login' ? 'Enter your password' : 'Create a strong password'}
              autoComplete={mode==='login' ? 'current-password' : 'new-password'}
              onChange={e => set('password',e.target.value)}
              onKeyDown={e => e.key==='Enter' && (mode==='login' ? handleLogin() : handleRegister())} />
          </div>

          <button className="btn btn-primary btn-block" style={{ borderRadius:10, padding:'0.9rem' }}
            onClick={mode==='login' ? handleLogin : handleRegister}>
            {mode==='login' ? 'Login to My Account' : 'Create My Account'}
          </button>

          <div className="form-divider">or continue with</div>

          <button className="btn-google" onClick={handleGoogle}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" />
            Sign {mode==='login' ? 'in' : 'up'} with Google
          </button>

          <div className="auth-switch">
            {mode==='login'
              ? <>Don't have an account? <a onClick={() => switchMode('register')}>Sign up free</a></>
              : <>Already have an account? <a onClick={() => switchMode('login')}>Login</a></>}
          </div>
        </div>
      </div>
    </div>
  )
}
