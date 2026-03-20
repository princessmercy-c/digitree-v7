// ============================================================
// useStore.jsx — Cart, Auth, MyCourses
// All state persisted to localStorage automatically.
// ============================================================
import { useState, useEffect, useCallback } from 'react'

const readLS     = (key, fb) => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fb } catch { return fb } }
const writeLS    = (key, v)  => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }
const readUsers  = ()        => readLS('dt_users', {})
const writeUsers = (u)       => writeLS('dt_users', u)

export function useStore() {
  const [cart,        setCart]        = useState(() => readLS('dt_cart',       []))
  const [currentUser, setCurrentUser] = useState(() => readLS('dt_user',       null))
  const [myCourses,   setMyCourses]   = useState(() => readLS('dt_my_courses', []))

  useEffect(() => writeLS('dt_cart',       cart),      [cart])
  useEffect(() => writeLS('dt_my_courses', myCourses), [myCourses])

  // ── Cart ──────────────────────────────────────────────────
  // price is stored at time of adding so the cart total is always accurate
  const addToCart = useCallback((id, name, price, emoji) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === id)
      if (ex) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, name, price, emoji: emoji || '📦', qty: 1 }]
    })
  }, [])

  const changeQty  = useCallback((id, delta) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  , [])

  const removeItem = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), [])
  const clearCart  = useCallback(() => setCart([]), [])

  // Derived values (computed so they're always fresh)
  const cartQty   = cart.reduce((s, i) => s + i.qty, 0)
  const cartItems = cart.map(i => ({ ...i, subtotal: i.price * i.qty }))
  const cartTotal = cartItems.reduce((s, i) => s + i.subtotal, 0)

  // ── Auth ──────────────────────────────────────────────────
  const login  = useCallback((user) => { setCurrentUser(user); writeLS('dt_user', user) }, [])
  const logout = useCallback(() => { setCurrentUser(null); localStorage.removeItem('dt_user') }, [])

  const registerUser = useCallback(({ name, email, password }) => {
    const users = readUsers()
    users[email] = { name, password }
    writeUsers(users)
    login({ name, email })
  }, [login])

  const loginUser = useCallback(({ email, password }) => {
    const users = readUsers()
    const user  = users[email]
    if (!user)                  return { ok: false, error: 'No account found with this email.' }
    if (user.password !== password) return { ok: false, error: 'Incorrect password.' }
    login({ name: user.name, email })
    return { ok: true }
  }, [login])

  const loginWithGoogle = useCallback((emailOverride) =>
    login({ name: 'Google User', email: emailOverride || 'googleuser@gmail.com' })
  , [login])

  // ── Courses ───────────────────────────────────────────────
  const enrollCourse = useCallback(({ courseId, name, email }) =>
    setMyCourses(prev =>
      prev.find(m => m.courseId === courseId)
        ? prev
        : [...prev, { courseId, name, email, progress: 0, completed: false }]
    )
  , [])

  const markComplete = useCallback((courseId) =>
    setMyCourses(prev =>
      prev.map(m => m.courseId === courseId ? { ...m, progress: 100, completed: true } : m)
    )
  , [])

  return {
    // Cart
    cart, cartItems, cartQty, cartTotal,
    addToCart, changeQty, removeItem, clearCart,
    // Auth
    currentUser, login, logout, registerUser, loginUser, loginWithGoogle,
    // Courses
    myCourses, enrollCourse, markComplete,
  }
}
