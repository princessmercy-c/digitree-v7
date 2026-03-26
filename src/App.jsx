import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from './hooks/useStore';
import { FEATURED_GADGET } from './utils/constants';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth } from './utils/firebase';

import Navbar  from './components/Navbar'
import Footer  from './components/Footer'

import Hero            from './components/Hero'
import About           from './components/About'
import Services        from './components/Services'
import CoursesSection  from './components/CoursesSection'
import FeaturedProduct from './components/FeaturedProduct'
import RequestGadget   from './components/RequestGadget'
import MeetTheTeam     from './components/MeetTheTeam'
import BlogSection     from './components/BlogSection'
import Testimonials    from './components/Testimonials'

import CartSidebar from './components/CartSidebar'
import PaymentPage from './components/PaymentPage'
import AuthModal   from './components/AuthModal'
import EnrollModal from './components/EnrollModal'
import Dashboard   from './components/Dashboard'
import CertOverlay from './components/CertOverlay'

/* ── Loading Screen ── */
function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark) 100%)',
      color: '#fff',
      textAlign: 'center',
      gap: '1.5rem',
    }}>
      <div style={{
        width: 48, height: 48,
        border: '4px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontSize: '1.1rem', fontWeight: 600, opacity: 0.9 }}>Loading...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Protected Route wrapper ── */
function ProtectedRoute({ user, authReady, children }) {
  if (!authReady) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

/* ── Login Screen ── */
function LoginScreen({ onOpenAuth }) {
  useEffect(() => { onOpenAuth(); }, []);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark) 100%)',
      color: '#fff',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-1px' }}>
        Welcome to Digitree Innovation
      </h1>
      <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem', maxWidth: 500 }}>
        Sign in to access our courses, gadgets, and exclusive content.
      </p>
      <button
        className="btn btn-primary btn-lg"
        style={{ background: '#fff', color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.05rem', padding: '1rem 2.5rem', borderRadius: 12 }}
        onClick={onOpenAuth}
      >
        Sign In / Create Account
      </button>
    </div>
  );
}

export default function App() {
  /* ── All hooks at the very top — no conditional calls ── */
  const store = useStore()
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [cartOpen,    setCartOpen]    = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [authOpen,    setAuthOpen]    = useState(false)
  const [dashOpen,    setDashOpen]    = useState(false)
  const [enrollingId, setEnrollingId] = useState(null)
  const [certData,    setCertData]    = useState({ open: false, courseId: null, studentName: '' })
  const location = useLocation();
  const navigate = useNavigate();

  /* ── Auth: handle redirect result + listen to state changes ── */
  useEffect(() => {
    let unsubscribe;

    // Start listening to auth state immediately (don't wait for redirect)
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (currentUser) {
        store.setCurrentUser(currentUser);
        if (window.location.pathname === '/') {
          navigate('/home', { replace: true });
        }
      }
    });

    // Also handle redirect result (non-blocking)
    getRedirectResult(auth).catch(() => {});

    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  /* ── Helpers (defined after hooks, before JSX) ── */
  const openEnroll = (courseId) => {
    if (!store.currentUser) { setAuthOpen(true); return }
    setEnrollingId(courseId)
  }

  const handleAddFeaturedToCart = () => {
    store.addToCart(
      FEATURED_GADGET.id,
      FEATURED_GADGET.name,
      FEATURED_GADGET.price,
      FEATURED_GADGET.emoji
    )
    setCartOpen(true)
  }

  const handleCheckout    = () => { setCartOpen(false); setPaymentOpen(true) }
  const handlePaymentBack = () => { setPaymentOpen(false); setCartOpen(true) }
  const handlePaymentDone = () => { store.clearCart(); setPaymentOpen(false) }

  const handleShowCert = (courseId) => {
    const mc = store.myCourses.find(m => m.courseId === courseId)
    setCertData({
      open:        true,
      courseId,
      studentName: mc?.name || store.currentUser?.name || 'Student',
    })
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  /* ── Home page content ── */
  const HomePage = (
    <main>
      <Hero
        onExploreCourses={() => scrollTo('courses')}
        onShopGadgets   ={() => scrollTo('gadgets')}
      />
      <About />
      <Services />
      <CoursesSection onEnroll={openEnroll} />
      <FeaturedProduct onAddToCart={handleAddFeaturedToCart} />
      <RequestGadget />
      <MeetTheTeam />
      <BlogSection />
      <Testimonials />
    </main>
  );

  return (
    <>
      {/* Only show Navbar & Footer when authenticated */}
      {user && (
        <Navbar
          cartQty     = {store.cartQty}
          currentUser = {store.currentUser}
          onOpenCart  = {() => setCartOpen(true)}
          onOpenLogin = {() => setAuthOpen(true)}
          onOpenDash  = {() => setDashOpen(true)}
        />
      )}

      <Routes>
        {/* Login gate: show loading while auth resolves, then login or redirect */}
        <Route path="/" element={
          !authReady
            ? <LoadingScreen />
            : user
              ? <Navigate to="/home" replace />
              : <LoginScreen onOpenAuth={() => setAuthOpen(true)} />
        } />

        {/* Protected home route */}
        <Route path="/home" element={
          <ProtectedRoute user={user} authReady={authReady}>
            {HomePage}
          </ProtectedRoute>
        } />

        {/* Protected courses route */}
        <Route path="/courses" element={
          <ProtectedRoute user={user} authReady={authReady}>
            <main>
              <CoursesSection onEnroll={openEnroll} />
            </main>
          </ProtectedRoute>
        } />

        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {user && <Footer />}

      {/* Cart sidebar */}
      <CartSidebar
        open        = {cartOpen}
        onClose     = {() => setCartOpen(false)}
        cartItems   = {store.cartItems}
        cartTotal   = {store.cartTotal}
        onChangeQty = {store.changeQty}
        onRemove    = {store.removeItem}
        onCheckout  = {handleCheckout}
      />

      {/* Payment page */}
      {paymentOpen && (
        <PaymentPage
          cartItems = {store.cartItems}
          cartTotal = {store.cartTotal}
          onBack    = {handlePaymentBack}
          onDone    = {handlePaymentDone}
        />
      )}

      {/* Auth modal */}
      <AuthModal
        open          = {authOpen}
        onClose       = {() => setAuthOpen(false)}
        onLogin       = {store.loginUser}
        onRegister    = {store.registerUser}
        onGoogleLogin = {store.loginWithGoogle}
      />

      {/* Course enroll modal */}
      <EnrollModal
        open        = {!!enrollingId}
        courseId    = {enrollingId}
        currentUser = {store.currentUser}
        onClose     = {() => setEnrollingId(null)}
        onEnrolled  = {store.enrollCourse}
      />

      {/* Student dashboard */}
      {dashOpen && (
        <Dashboard
          currentUser = {store.currentUser}
          myCourses   = {store.myCourses}
          onClose     = {() => setDashOpen(false)}
          onMarkDone  = {store.markComplete}
          onViewCert  = {handleShowCert}
        />
      )}

      {/* Certificate */}
      <CertOverlay
        open        = {certData.open}
        courseId    = {certData.courseId}
        studentName = {certData.studentName}
        onClose     = {() => setCertData({ open: false, courseId: null, studentName: '' })}
      />
    </>
  )
}
