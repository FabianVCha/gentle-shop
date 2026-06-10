import { Link } from 'react-router-dom'
import { Wrench, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-default-900 text-default-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <Wrench className="text-secondary-400" size={28} />
            <span>Ferretería El Tornillo</span>
          </Link>
          <p className="text-sm text-default-400">
            Tu ferretería de confianza. Herramientas, materiales y todo para tus proyectos de construcción y bricolaje.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary-400 transition-colors">Inicio</Link></li>
            <li><Link to="/cart" className="hover:text-secondary-400 transition-colors">Carrito</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> contacto@eltornillo.com</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Bogotá, Colombia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-default-800 mt-8 pt-6 text-center text-sm text-default-500">
        © 2026 Ferretería El Tornillo. Todos los derechos reservados.
      </div>
    </footer>
  )
}
