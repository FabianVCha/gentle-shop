import { useEffect, useRef, useState } from 'react'
import { Mail, ArrowRight, Check } from 'lucide-react'
import gsap from 'gsap'
import { showToast } from './ToastContainer'

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            gsap.fromTo(
              sectionRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast({ type: 'error', title: 'Correo inválido', message: 'Ingresa un email válido.' })
      return
    }
    setSubmitted(true)
    showToast({ type: 'success', title: '¡Suscripción exitosa!', message: 'Recibirás tu 10% de descuento.' })
  }

  return (
    <section className="bg-default-100 py-14 md:py-20 px-4 md:px-6">
      <div ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
          <Mail size={24} className="text-primary-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-default-900 mb-3">
          Suscríbete a nuestro newsletter
        </h2>
        <p className="text-default-600 mb-6">
          Recibe ofertas exclusivas, novedades y un <span className="text-primary-600 font-bold">10% de descuento</span> en tu primera compra.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-success font-semibold">
            <Check size={20} />
            <span>¡Gracias! Te enviamos el cupón.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-default-300 bg-white text-default-900 placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors"
            >
              <span>Suscribirme</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
