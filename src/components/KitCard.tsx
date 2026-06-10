import { useRef, useCallback } from 'react'
import { ShoppingCart, Package } from 'lucide-react'
import gsap from 'gsap'
import { type Kit } from '../data/kits'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { showToast } from './ToastContainer'

interface KitCardProps {
  kit: Kit
}

export default function KitCard({ kit }: KitCardProps) {
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

  const handleAddKit = useCallback(() => {
    kitProducts.forEach(({ product, quantity }) => {
      addToCart(product, quantity)
    })

    showToast({
      type: 'success',
      title: 'Kit agregado al carrito',
      message: `${kit.name} — ${kitProducts.length} productos`,
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
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-2xl border border-default-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={kit.image}
          alt={kit.name}
          className="w-full h-full object-cover"
        />
        {kit.badge && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1 rounded-lg bg-secondary text-secondary-900 text-xs font-bold shadow-md">
            {kit.badge}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{kit.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-sm text-default-600 mb-4">{kit.description}</p>

        {/* Items list */}
        <div className="space-y-2 mb-4">
          {kitProducts.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Package size={14} className="text-default-400 flex-shrink-0" />
                <span className="text-default-700 truncate">{product.name}</span>
              </div>
              <span className="text-default-500 flex-shrink-0 ml-2">
                x{quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-default-200">
          <div>
            <p className="text-xs text-default-500">Total del kit</p>
            <p className="text-xl font-bold text-primary-700">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            ref={btnRef}
            onClick={handleAddKit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 active:bg-primary-800 transition-colors"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
            <span>Agregar kit</span>
          </button>
        </div>
      </div>
    </div>
  )
}
