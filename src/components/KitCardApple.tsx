import { useRef, useCallback } from 'react'
import { ShoppingCart, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import type { Kit } from '../data/kits'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { showToast } from './ToastContainer'

interface KitCardAppleProps {
  kit: Kit
  onOpen: () => void
}

export default function KitCardApple({ kit, onOpen }: KitCardAppleProps) {
  const { addToCart } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const kitProducts = kit.items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter(Boolean) as { product: typeof products[0]; quantity: number }[]

  const totalPrice = kitProducts.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  )

  const handleAddKit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    kitProducts.forEach(({ product, quantity }) => {
      addToCart(product, quantity)
    })

    showToast({
      type: 'success',
      title: 'Kit agregado',
      message: `${kit.name} \u2014 ${kitProducts.length} productos`,
    })

    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.9 },
        { scale: 1.05, duration: 0.2, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      )
    }
  }, [addToCart, kit, kitProducts])

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer border border-default-100"
      style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Image Area */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-b from-default-50 to-white">
        <img
          src={kit.image}
          alt={kit.name}
          className="w-full h-full object-cover"
        />
        {kit.badge && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-secondary-900 text-xs font-bold">
            {kit.badge}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent h-20" />
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-xl font-semibold text-default-900 mb-1">{kit.name}</h3>
        <p className="text-sm text-default-500 mb-4 leading-relaxed">{kit.description}</p>

        {/* Items preview */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {kitProducts.slice(0, 3).map(({ product }) => (
              <div
                key={product.id}
                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-default-400">
            {kitProducts.length} items
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-default-100">
          <div>
            <span className="text-xs text-default-400">Desde</span>
            <p className="text-lg font-semibold text-default-900">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-600 font-medium flex items-center gap-0.5">
              Ver más
              <ChevronRight size={14} />
            </span>
            <button
              ref={btnRef}
              onClick={handleAddKit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 active:bg-primary-800 transition-colors"
            >
              <ShoppingCart size={14} strokeWidth={2.5} />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
