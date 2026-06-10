import { useEffect, useRef } from 'react'
import { X, ShoppingCart, Package, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import type { Kit } from '../data/kits'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { showToast } from './ToastContainer'

interface KitDetailModalProps {
  kit: Kit | null
  onClose: () => void
}

export default function KitDetailModal({ kit, onClose }: KitDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (kit && overlayRef.current && panelRef.current) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      )
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [kit])

  const handleClose = () => {
    if (overlayRef.current && panelRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
      gsap.to(panelRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  if (!kit) return null

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

  const handleAddKit = () => {
    kitProducts.forEach(({ product, quantity }) => {
      addToCart(product, quantity)
    })
    showToast({
      type: 'success',
      title: 'Kit agregado al carrito',
      message: `${kit.name} \u2014 ${kitProducts.length} productos agregados`,
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header Image */}
        <div className="relative h-48 md:h-56 flex-shrink-0">
          <img
            src={kit.image}
            alt={kit.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            {kit.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-900 text-xs font-bold mb-2">
                {kit.badge}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white">{kit.name}</h2>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-default-600 mb-6">{kit.description}</p>

          {/* Items List */}
          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-semibold text-default-500 uppercase tracking-wider">
              Productos incluidos
            </h3>
            {kitProducts.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-default-50 border border-default-100"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-default-900 text-sm truncate">{product.name}</h4>
                  <p className="text-xs text-default-500">{product.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-default-400">Cantidad: {quantity}</span>
                    <span className="text-xs text-default-300">\u00b7</span>
                    <span className="text-xs font-medium text-primary-600">
                      ${product.price.toFixed(2)} c/u
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-default-900">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-default-50 rounded-2xl p-4 border border-default-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-default-400" />
                <span className="text-sm text-default-600">{kitProducts.length} productos</span>
              </div>
              <span className="text-sm text-default-500">
                {kitProducts.reduce((sum, { quantity }) => sum + quantity, 0)} unidades
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-default-200">
              <div>
                <span className="text-xs text-default-500">Total del kit</span>
                <p className="text-2xl font-bold text-default-900">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 md:p-6 border-t border-default-100 bg-white flex-shrink-0">
          <button
            onClick={handleAddKit}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 active:bg-primary-800 transition-colors"
          >
            <ShoppingCart size={20} strokeWidth={2} />
            <span>Agregar kit completo</span>
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
