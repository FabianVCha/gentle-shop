import { Link } from 'react-router-dom'
import { Wrench, Mail, Phone, MapPin, CreditCard, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-default-900 text-default-200 mt-auto">
      {/* Newsletter mini bar */}
      <div className="border-b border-default-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
              <Wrench size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Ferretería El Tornillo</p>
              <p className="text-xs text-default-500">Tu ferretería de confianza desde 2004</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <CreditCard size={14} className="text-default-500" />
              <span className="text-default-500">Pagos seguros</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-default-500" />
              <span className="text-default-500">Garantía 30 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <Wrench className="text-secondary-400" size={28} strokeWidth={2} />
            <span>El Tornillo</span>
          </Link>
          <p className="text-sm text-default-400 leading-relaxed">
            Tu ferretería de confianza. Herramientas, materiales y todo para tus proyectos de construcción y bricolaje.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Categorías</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Eléctrico</Link></li>
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Herramientas</Link></li>
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Pintura</Link></li>
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Fontanería</Link></li>
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Jardín</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Enlaces</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-default-400 hover:text-secondary-400 transition-colors">Inicio</Link></li>
            <li><Link to="/cart" className="text-default-400 hover:text-secondary-400 transition-colors">Carrito</Link></li>
            <li><Link to="/checkout" className="text-default-400 hover:text-secondary-400 transition-colors">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-default-500 flex-shrink-0" />
              <span className="text-default-400">+57 (1) 234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-default-500 flex-shrink-0" />
              <span className="text-default-400">contacto@ferreteriaeltornillo.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-default-500 flex-shrink-0" />
              <span className="text-default-400">Bogotá, Colombia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-default-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-default-500">
          <p>© 2026 Ferretería El Tornillo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-default-300 transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-default-300 transition-colors">Términos de servicio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
