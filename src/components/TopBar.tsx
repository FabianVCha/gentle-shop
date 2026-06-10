import { Phone, Mail } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-primary-800 text-white text-xs py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Phone size={12} strokeWidth={2.5} />
            <span>+57 (1) 234 5678</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={12} strokeWidth={2.5} />
            <span>contacto@ferreteriaeltornillo.com</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-300">Síguenos:</span>
          {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-white/80 hover:text-white transition-colors"
              aria-label={social}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
