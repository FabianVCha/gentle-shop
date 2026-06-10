import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }
      if (panelRef.current) {
        gsap.fromTo(panelRef.current, { x: '100%' }, { x: 0, duration: 0.4, ease: 'power3.out' })
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
      }
      if (panelRef.current) {
        gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' })
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-default-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-default-900">Tu carrito</h2>
            {totalItems > 0 && (
              <span className="text-sm text-default-500">({totalItems} items)</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-default-100 active:bg-default-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-default-300 mb-4" />
              <p className="text-default-500 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-default-400 mb-6">Agrega productos y vuelve aquí.</p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl border border-default-200 hover:border-default-300 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-default-900 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-default-500 mt-0.5">{product.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex items-center justify-center w-7 h-7 rounded-md border border-default-300 hover:bg-default-100 active:bg-default-200 transition-colors"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex items-center justify-center w-7 h-7 rounded-md border border-default-300 hover:bg-default-100 active:bg-default-200 transition-colors"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary-700">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center justify-center w-7 h-7 rounded-md text-danger hover:bg-danger-50 active:bg-danger-100 transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-default-200 bg-default-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-default-600">Subtotal</span>
              <span className="text-lg font-bold text-default-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors"
              >
                <span>Finalizar compra</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors text-sm font-medium"
              >
                Ver carrito completo
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
