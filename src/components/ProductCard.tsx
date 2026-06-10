import { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@heroui/react'
import { ShoppingCart, Star, Check } from 'lucide-react'
import gsap from 'gsap'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/ToastContainer'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [added, setAdded] = useState(false)

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

  const handleAddToCart = useCallback(() => {
    addToCart(product)
    setAdded(true)
    showToast({
      type: 'success',
      title: 'Agregado al carrito',
      message: `${product.name} x 1`,
    })

    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.85 },
        { scale: 1.08, duration: 0.15, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      )
    }

    const timer = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [addToCart, product])

  return (
    <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card className="w-full hover:shadow-xl transition-shadow duration-300 border border-default-200">
        <Card.Content className="p-0 relative">
          {/* Badge de categoría - altamente visible */}
          <span className="absolute top-2 left-2 z-20 inline-flex items-center px-3 py-1 rounded-lg bg-primary-700 text-white text-xs font-bold shadow-lg border border-primary-500">
            {product.category}
          </span>

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
            ref={btnRef}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-colors flex-shrink-0 ${
              added
                ? 'bg-success text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
            }`}
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={2.5} className="flex-shrink-0" />
                <span className="hidden sm:inline">Agregado</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} strokeWidth={2.5} className="flex-shrink-0" />
                <span className="hidden sm:inline">Añadir</span>
              </>
            )}
          </button>
        </Card.Footer>
      </Card>
    </div>
  )
}
