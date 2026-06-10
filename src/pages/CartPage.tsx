import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card, Separator } from '@heroui/react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const itemsRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemsRef.current && items.length > 0) {
      const cards = itemsRef.current.querySelectorAll('.cart-item')
      gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' })
    }
    if (summaryRef.current) {
      gsap.fromTo(summaryRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' })
    }
  }, [items])

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-default-50 py-20 px-4">
        <ShoppingBag size={64} className="text-default-300 mb-4" />
        <h2 className="text-2xl font-semibold text-default-700 mb-2 text-center">Tu carrito está vacío</h2>
        <p className="text-default-500 mb-6 text-center">Explora nuestros productos y encuentra algo que te guste.</p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Seguir comprando</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-default-50 py-6 md:py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-default-900 mb-6 md:mb-8">Carrito de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Items */}
          <div ref={itemsRef} className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <Card key={product.id} className="cart-item border border-default-200">
                <Card.Content className="flex flex-col sm:flex-row gap-4 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-default-900">{product.name}</h3>
                      <p className="text-sm text-default-500">{product.category}</p>
                      <p className="text-primary-700 font-bold mt-1">${product.price.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-default-300 hover:bg-default-100 active:bg-default-200 transition-colors"
                        >
                          <Minus size={16} strokeWidth={2.5} />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-default-300 hover:bg-default-100 active:bg-default-200 transition-colors"
                        >
                          <Plus size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="flex items-center justify-center w-9 h-9 rounded-lg text-danger hover:bg-danger-50 active:bg-danger-100 transition-colors"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}

            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-danger hover:bg-danger-50 active:bg-danger-100 transition-colors font-medium text-sm"
            >
              <Trash2 size={18} strokeWidth={2} />
              <span>Vaciar carrito</span>
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div ref={summaryRef}>
              <Card className="border border-default-200 sticky top-4">
                <Card.Content className="p-4 md:p-6">
                  <h2 className="text-xl font-semibold text-default-900 mb-4">Resumen</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-default-600">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-default-600">
                      <span>Envío</span>
                      <span className="text-success font-medium">Gratis</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-bold text-default-900 mb-6">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 active:bg-primary-800 transition-colors">
                    Finalizar compra
                  </button>
                  <Link
                    to="/"
                    className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-default-600 hover:text-default-900 hover:bg-default-100 transition-colors text-sm font-medium"
                  >
                    <ArrowLeft size={18} strokeWidth={2} />
                    <span>Seguir comprando</span>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
