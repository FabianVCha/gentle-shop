import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@heroui/react'
import { ArrowLeft, Send, MapPin, Phone, Mail, Clock, Check } from 'lucide-react'
import gsap from 'gsap'
import { showToast } from '../components/ToastContainer'

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast({ type: 'error', title: 'Completa los campos', message: 'Nombre, email y mensaje son obligatorios.' })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSent(true)
      showToast({ type: 'success', title: 'Mensaje enviado', message: 'Te responderemos en menos de 24 horas.' })
    }, 1200)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-default-300 bg-white text-default-900 placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'

  const contactInfo = [
    { icon: MapPin, label: 'Dirección', value: 'Calle 123 # 45-67, Bogotá, Colombia' },
    { icon: Phone, label: 'Teléfono', value: '+57 (1) 234 5678' },
    { icon: Mail, label: 'Email', value: 'contacto@ferreteriaeltornillo.com' },
    { icon: Clock, label: 'Horario', value: 'Lunes a Sábado: 8:00 AM - 6:00 PM' },
  ]

  return (
    <div className="flex-1 bg-default-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-default-600 hover:text-default-900 mb-6 px-2 py-1 rounded-lg hover:bg-default-100 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Volver al inicio</span>
        </Link>

        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-default-900 mb-2">Contacto</h1>
          <p className="text-default-600">
            ¿Tienes preguntas? Escríbenos y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-2">
            <Card className="border border-default-200">
              <Card.Content className="p-4 md:p-6">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
                      <Check size={32} className="text-success" />
                    </div>
                    <h2 className="text-xl font-bold text-default-900 mb-2">¡Mensaje enviado!</h2>
                    <p className="text-default-600 mb-6 max-w-sm">
                      Gracias por contactarnos, {form.name}. Te responderemos lo antes posible.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false)
                        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                      }}
                      className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-default-700 mb-1">Nombre *</label>
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-default-700 mb-1">Email *</label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
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
                        <label className="block text-sm font-medium text-default-700 mb-1">Asunto</label>
                        <input
                          type="text"
                          placeholder="Consulta, pedido, etc."
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-1">Mensaje *</label>
                      <textarea
                        placeholder="¿En qué podemos ayudarte?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 active:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} strokeWidth={2} />
                          <span>Enviar mensaje</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* Info */}
          <div ref={infoRef} className="lg:col-span-1">
            <Card className="border border-default-200 sticky top-4">
              <Card.Content className="p-4 md:p-6">
                <h2 className="text-lg font-semibold text-default-900 mb-4">Información de contacto</h2>
                <div className="space-y-5">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={18} className="text-primary-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm text-default-900 mt-0.5">{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
