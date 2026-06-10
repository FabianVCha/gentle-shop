import { useState, useEffect, useRef } from 'react'
import { Input } from '@heroui/react'
import { SlidersHorizontal } from 'lucide-react'
import gsap from 'gsap'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

const categories = ['Todos', 'Eléctrico', 'Herramientas', 'Pintura', 'Fontanería', 'Jardín', 'Accesorios', 'Pegamentos', 'Seguridad']

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [isLoading, setIsLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (cardsRef.current && !isLoading) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [filtered, isLoading])

  return (
    <div className="flex-1 bg-default-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16 px-4 md:px-6">
        <div ref={heroRef} className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Todo para tus <span className="text-secondary-300">proyectos</span>
          </h1>
          <p className="text-base md:text-lg text-primary-100 max-w-2xl mx-auto px-2">
            La ferretería más completa de la ciudad. Herramientas, pintura, materiales y más.
            Envío gratis en compras mayores a $50.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <Input
            placeholder="Buscar herramientas, pintura..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-md"
          />
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal size={18} className="text-default-500" />
            <span className="text-sm text-default-500">{filtered.length} resultados</span>
          </div>
        </div>

        {/* Categories - scrollable on mobile */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 md:pb-0 md:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap flex-shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-default-700 border border-default-200 hover:bg-default-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-default-500">No se encontraron productos.</p>
          </div>
        )}
      </section>
    </div>
  )
}
