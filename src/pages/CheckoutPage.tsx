import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '@heroui/react'
import { ArrowLeft, Check, CreditCard, Truck, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/ToastContainer'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const formRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (summaryRef.current) {
      gsap.fromTo(summaryRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' })
    }
  }, [])

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-default-50 py-20 px-4">
        <h2 className="text-2xl font-semibold text-default-700 mb-2 text-center">Tu carrito está vacío</h2>
        <p className="text-default-500 mb-6 text-center">Agrega productos antes de finalizar la compra.</p>
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

  if (orderPlaced) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-default-50 py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
          <Check size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-default-900 mb-2 text-center">¡Pedido realizado!</h2>
        <p className="text-default-600 mb-2 text-center max-w-md">
          Gracias por tu compra, {form.fullName || 'cliente'}. Te enviaremos un correo con los detalles.
        </p>
        <p className="text-sm text-default-500 mb-6 text-center">
          Total: <span className="font-bold text-default-900">${totalPrice.toFixed(2)}</span>
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Volver al inicio</span>
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city) {
      showToast({ type: 'error', title: 'Completa todos los campos', message: 'Por favor llena la información de envío.' })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderPlaced(true)
      clearCart()
      showToast({ type: 'success', title: '¡Pedido confirmado!', message: 'Te enviaremos un email con los detalles.' })
    }, 1500)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-default-300 bg-white text-default-900 placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'

  return (
    <div className="flex-1 bg-default-50 py-6 md:py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-default-600 hover:text-default-900 mb-6 px-2 py-1 rounded-lg hover:bg-default-100 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Volver</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-default-900 mb-6 md:mb-8">Finalizar compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-2 space-y-6">
            {/* Datos de envío */}
            <Card className="border border-default-200">
              <Card.Content className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Truck size={20} className="text-primary-600" />
                  <h2 className="text-lg font-semibold text-default-900">Datos de envío</h2>
                </div>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-1">Nombre completo</label>
                      <input
                        type="text"
                        placeholder="Juan Pérez"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-1">Correo electrónico</label>
                      <input
                        type="email"
                        placeholder="juan@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-1">Teléfono</label>
                      <input
                        type="tel"
                        placeholder="+57 300 123 4567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-1">Ciudad</label>
                      <input
                        type="text"
                        placeholder="Bogotá"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-default-700 mb-1">Dirección completa</label>
                    <input
                      type="text"
                      placeholder="Calle 123 # 45-67, Apartamento 8B"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </form>
              </Card.Content>
            </Card>

            {/* Método de pago */}
            <Card className="border border-default-200">
              <Card.Content className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <CreditCard size={20} className="text-primary-600" />
                  <h2 className="text-lg font-semibold text-default-900">Método de pago</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Tarjeta crédito/débito' },
                    { id: 'transfer', label: 'Transferencia bancaria' },
                    { id: 'cash', label: 'Pago contra entrega' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setForm({ ...form, paymentMethod: method.id })}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors text-center ${
                        form.paymentMethod === method.id
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-default-300 bg-white text-default-700 hover:bg-default-50'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-default-500 mt-3">
                  <ShieldCheck size={14} className="inline mr-1" />
                  Pagos seguros. Tus datos están protegidos.
                </p>
              </Card.Content>
            </Card>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div ref={summaryRef}>
              <Card className="border border-default-200 sticky top-4">
                <Card.Content className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-default-900 mb-4">Resumen del pedido</h2>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-default-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-default-500">
                            {quantity} x ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-default-900">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-default-200 pt-4 space-y-2">
                    <div className="flex justify-between text-default-600">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-default-600">
                      <span>Envío</span>
                      <span className="text-success font-medium">Gratis</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-default-900 pt-2 border-t border-default-200">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-4 rounded-lg bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 active:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Check size={20} strokeWidth={2} />
                        <span>Confirmar pedido</span>
                      </>
                    )}
                  </button>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
