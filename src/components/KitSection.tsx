import { useState, useEffect, useRef } from 'react'
import { kits } from '../data/kits'
import KitCardApple from './KitCardApple'
import KitDetailModal from './KitDetailModal'
import gsap from 'gsap'

interface KitSectionProps {
  title?: string
  subtitle?: string
  description?: string
  showAll?: boolean
}

export default function KitSection({
  title = 'Conjuntos Comunes',
  subtitle = '\u00bfQu\u00e9 necesit\u00e1s hacer?',
  description = 'Te armamos los conjuntos de productos seg\u00fan la necesidad. Agreg\u00e1 todo de una y empez\u00e1 tu proyecto.',
  showAll = false,
}: KitSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [selectedKit, setSelectedKit] = useState<string | null>(null)

  const displayedKits = showAll ? kits : kits.slice(0, 3)
  const selectedKitData = selectedKit ? kits.find((k) => k.id === selectedKit) ?? null : null

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsRef.current) {
            const cards = cardsRef.current.children
            gsap.fromTo(
              cards,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
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
    <>
      <section ref={sectionRef} className="py-14 md:py-20 px-4 md:px-6 bg-default-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-3">
              {title}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-default-900 mb-3">
              {subtitle}
            </h2>
            <p className="text-default-600 max-w-xl mx-auto">
              {description}
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedKits.map((kit) => (
              <KitCardApple
                key={kit.id}
                kit={kit}
                onOpen={() => setSelectedKit(kit.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <KitDetailModal
        kit={selectedKitData}
        onClose={() => setSelectedKit(null)}
      />
    </>
  )
}
