import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button, Card, Badge } from '@heroui/react'
import { ArrowLeft, ShoppingCart, Star, Package, Check } from 'lucide-react'
import gsap from 'gsap'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const imageRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const product = products.find((p) => p.id === Number(id))

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' })
    }
  }, [id])

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-default-50 py-20 px-4">
        <h2 className="text-2xl font-semibold text-default-700 mb-2 text-center">Producto no encontrado</h2>
        <p className="text-default-500 mb-6 text-center">El producto que buscas no existe en nuestro catálogo.</p>
        <Button
          onPress={() => navigate('/')}
          variant="primary"
          className="bg-primary-600 text-white"
        >
          <ArrowLeft size={18} className="mr-2" />
          Volver al inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-default-50 py-6 md:py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onPress={() => navigate(-1)}
          className="mb-4 md:mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Image */}
          <div ref={imageRef} className="bg-white rounded-xl border border-default-200 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Info */}
          <div ref={infoRef} className="flex flex-col justify-between">
            <div>
              <Badge color="accent" className="mb-3 md:mb-4">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-default-900 mb-3 md:mb-4">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
                <div className="flex items-center gap-1">
                  <Star size={20} className="text-secondary fill-secondary" />
                  <span className="font-semibold text-default-900">{product.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-default-500">
                  <Package size={18} />
                  <span>{product.stock} unidades disponibles</span>
                </div>
              </div>

              <p className="text-base md:text-lg text-default-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-3 mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success flex-shrink-0" />
                  <span>Envío gratis en compras mayores a $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success flex-shrink-0" />
                  <span>Garantía de 30 días en todos los productos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success flex-shrink-0" />
                  <span>Devoluciones sin complicaciones</span>
                </div>
              </div>
            </div>

            <Card className="border border-default-200">
              <Card.Content className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-primary-700">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-default-500">
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full bg-primary-600 text-white font-semibold py-4 md:py-6"
                  onPress={() => addToCart(product)}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Añadir al carrito
                </Button>
                <Link
                  to="/cart"
                  className="mt-3 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors text-sm font-medium"
                >
                  Ver carrito
                </Link>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
