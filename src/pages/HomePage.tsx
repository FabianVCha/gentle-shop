import { useState } from 'react'
import { Button, Input } from '@heroui/react'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = ['Todos', 'Eléctrico', 'Herramientas', 'Pintura', 'Fontanería', 'Jardín', 'Accesorios', 'Pegamentos', 'Seguridad']

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 bg-default-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Todo para tus <span className="text-secondary-300">proyectos</span>
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            La ferretería más completa de la ciudad. Herramientas, pintura, materiales y más.
            Envío gratis en compras mayores a $50.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <Input
            placeholder="Buscar herramientas, pintura..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-default-500" />
            <span className="text-sm text-default-500">{filtered.length} resultados</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? 'primary' : 'outline'}
              onPress={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
