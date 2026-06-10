import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

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
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium px-2 py-1">
            Inicio
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-900 font-semibold text-sm hover:bg-secondary-400 transition-colors"
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-danger text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
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
        <div className="md:hidden bg-primary-700 px-4 py-4 space-y-2 border-t border-primary-500">
          <Link
            to="/"
            className="block text-white/90 hover:text-white py-2 px-2 rounded-lg hover:bg-primary-600"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-900 font-semibold hover:bg-secondary-400 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-danger text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  )
}
