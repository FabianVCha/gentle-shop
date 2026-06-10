import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge } from '@heroui/react'
import { ShoppingCart, Star } from 'lucide-react'
import gsap from 'gsap'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card className="w-full hover:shadow-xl transition-shadow duration-300 border border-default-200">
        <Card.Content className="p-0 relative">
          <Badge color="accent" className="absolute top-2 left-2 z-10">
            {product.category}
          </Badge>
          <Link to={`/product/${product.id}`} className="block overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 md:h-56 object-cover rounded-t-lg hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <div className="p-4">
            <Link to={`/product/${product.id}`} className="block hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-1.5 mb-2">
                <Star size={16} className="text-secondary fill-secondary flex-shrink-0" />
                <span className="text-sm text-default-600">{product.rating}</span>
                <span className="text-xs text-default-400">({product.stock} disp.)</span>
              </div>
              <h3 className="font-semibold text-base md:text-lg text-default-900 mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-default-500 line-clamp-2">{product.description}</p>
            </Link>
          </div>
        </Card.Content>
        <Card.Footer className="flex items-center justify-between px-4 pb-4 pt-0 gap-2">
          <span className="text-lg md:text-xl font-bold text-primary-700 flex-shrink-0">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 active:bg-primary-800 transition-colors flex-shrink-0"
          >
            <ShoppingCart size={16} strokeWidth={2.5} className="flex-shrink-0" />
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </Card.Footer>
      </Card>
    </div>
  )
}
