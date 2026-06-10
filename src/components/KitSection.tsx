import { useEffect, useRef } from 'react'
import { kits } from '../data/kits'
import KitCard from './KitCard'
import gsap from 'gsap'

export default function KitSection() {
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
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
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
    <section ref={sectionRef} className="py-14 md:py-20 px-4 md:px-6 bg-default-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Conjuntos Comunes
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-default-900 mb-3">
            ¿Qué necesitás hacer?
          </h2>
          <p className="text-default-600 max-w-xl mx-auto">
            Te armamos los conjuntos de productos según la necesidad. Agregá todo de una y empezá tu proyecto.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    </section>
  )
}
