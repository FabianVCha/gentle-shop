import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import type { Product } from '../data/products'
import ProductCard from './ProductCard'

interface CategorySectionProps {
  title: string
  category: string
  products: Product[]
}

export default function CategorySection({ title, category, products }: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const filteredProducts = products.filter((p) => p.category === category).slice(0, 4)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (filteredProducts.length === 0) return null

  return (
    <section ref={sectionRef} className="py-10 md:py-14 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-default-900">{title}</h2>
          <Link
            to="/"
            onClick={() => {
              const el = document.getElementById('productos')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            <span>Ver todos</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
