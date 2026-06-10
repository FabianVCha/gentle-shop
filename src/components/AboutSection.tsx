import { useEffect, useRef } from 'react'
import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react'
import gsap from 'gsap'

const features = [
  {
    icon: Truck,
    title: 'Envío rápido',
    description: 'Entregamos en Bogotá en 24-48 horas. Envío gratis en compras mayores a $50.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de calidad',
    description: 'Todos nuestros productos tienen garantía de 30 días. Si no te gusta, lo cambiamos.',
  },
  {
    icon: Headphones,
    title: 'Atención personalizada',
    description: 'Nuestro equipo de expertos te asesora en todo momento. Llámanos o escríbenos.',
  },
  {
    icon: RotateCcw,
    title: 'Devoluciones fáciles',
    description: '¿No te sirvió? Devuélvelo sin complicaciones en los primeros 15 días.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsRef.current) {
            const cards = cardsRef.current.children
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-default-900 mb-3">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-default-600 max-w-xl mx-auto">
            Llevamos más de 20 años siendo la ferretería de confianza de los bogotanos.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-default-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold text-default-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-default-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
