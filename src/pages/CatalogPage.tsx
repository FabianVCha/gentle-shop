import { useState, useEffect, useRef } from 'react'
import { Input } from '@heroui/react'
import { SlidersHorizontal, Search } from 'lucide-react'
import gsap from 'gsap'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

const categories = ['Todos', 'Eléctrico', 'Herramientas', 'Pintura', 'Fontanería', 'Jardín', 'Accesorios', 'Pegamentos', 'Seguridad']

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [isLoading, setIsLoading] = useState(true)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (cardsRef.current && !isLoading) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
      )
    }
  }, [filtered, isLoading])

  return (
    <div className="flex-1 bg-default-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-default-900 mb-2">
            Catálogo de productos
          </h1>
          <p className="text-default-600">
            Explora nuestra colección completa de herramientas y materiales.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-default-500" />
            <span className="text-sm text-default-500">{filtered.length} resultados</span>
          </div>
        </div>

        {/* Categories */}
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
            <Search size={48} className="text-default-300 mx-auto mb-4" />
            <p className="text-xl text-default-500 mb-2">No se encontraron productos.</p>
            <p className="text-sm text-default-400">Intenta con otra búsqueda o categoría.</p>
          </div>
        )}
      </div>
    </div>
  )
}
