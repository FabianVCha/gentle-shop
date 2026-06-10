import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Wrench, Menu, X, ShoppingCart } from 'lucide-react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'

interface HeaderProps {
  onCartOpen: () => void
}

export default function Header({ onCartOpen }: HeaderProps) {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const prevTotal = useRef(totalItems)
  const location = useLocation()

  useEffect(() => {
    if (badgeRef.current && totalItems > 0 && totalItems !== prevTotal.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)' }
      )
    }
    prevTotal.current = totalItems
  }, [totalItems])

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/catalog', label: 'Catálogo' },
    { to: '/contact', label: 'Contacto' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition-opacity">
          <Wrench className="text-secondary-300" size={28} />
          <span className="hidden sm:inline">Ferretería El Tornillo</span>
          <span className="sm:hidden">El Tornillo</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={onCartOpen}
            className="flex items-center gap-2 ml-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-900 font-semibold text-sm hover:bg-secondary-400 transition-colors"
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span ref={badgeRef} className="flex items-center justify-center w-5 h-5 rounded-full bg-danger text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-primary-700 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-700 px-4 py-4 space-y-1 border-t border-primary-500">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-white/20 text-white'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onCartOpen(); setMenuOpen(false) }}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-900 font-semibold hover:bg-secondary-400 transition-colors"
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-danger text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  )
}
