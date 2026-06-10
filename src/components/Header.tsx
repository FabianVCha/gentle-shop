import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@heroui/react'
import { ShoppingCart, Wrench, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition-opacity">
          <Wrench className="text-secondary-300" size={28} />
          <span className="hidden sm:inline">Ferretería El Tornillo</span>
          <span className="sm:hidden">El Tornillo</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
            Inicio
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-900 font-semibold text-sm hover:bg-secondary-400 transition-colors"
          >
            <Badge
              content={String(totalItems)}
              color="danger"
              placement="top-right"
              className={totalItems === 0 ? 'hidden' : ''}
            >
              <ShoppingCart size={18} />
            </Badge>
            <span>Carrito</span>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-700 px-4 py-4 space-y-3 border-t border-primary-500">
          <Link
            to="/"
            className="block text-white/90 hover:text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-900 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={18} />
            <span>Carrito ({totalItems})</span>
          </Link>
        </div>
      )}
    </header>
  )
}
