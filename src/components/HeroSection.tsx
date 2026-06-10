import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
      )
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text */}
        <div ref={textRef} className="text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium mb-4">
            Envío gratis en compras mayores a $50
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Todo para tus{' '}
            <span className="text-secondary-300">proyectos</span>
          </h1>
          <p className="text-base md:text-lg text-primary-100 mb-8 max-w-lg mx-auto md:mx-0">
            La ferretería más completa de Bogotá. Herramientas profesionales, pintura, materiales y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/"
              onClick={() => {
                const el = document.getElementById('productos')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-secondary-900 font-bold text-sm hover:bg-secondary-400 transition-colors"
            >
              <span>Ver productos</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link
              to="/product/1"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              <span>Oferta del día</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cordless_electric_%28screw%29_drill.jpg/640px-Cordless_electric_%28screw%29_drill.jpg"
            alt="Herramientas profesionales"
            className="relative z-10 w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
