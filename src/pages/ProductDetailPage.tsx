import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button, Card, Badge } from '@heroui/react'
import { ArrowLeft, ShoppingCart, Star, Package, Check } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-default-50 py-20">
        <h2 className="text-2xl font-semibold text-default-700 mb-2">Producto no encontrado</h2>
        <p className="text-default-500 mb-6">El producto que buscas no existe en nuestro catálogo.</p>
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
    <div className="flex-1 bg-default-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onPress={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-white rounded-xl border border-default-200 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge color="accent" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-default-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={20} className="text-secondary fill-secondary" />
                  <span className="font-semibold text-default-900">{product.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-default-500">
                  <Package size={18} />
                  <span>{product.stock} unidades disponibles</span>
                </div>
              </div>

              <p className="text-lg text-default-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success" />
                  <span>Envío gratis en compras mayores a $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success" />
                  <span>Garantía de 30 días en todos los productos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Check size={18} className="text-success" />
                  <span>Devoluciones sin complicaciones</span>
                </div>
              </div>
            </div>

            <Card className="border border-default-200">
              <Card.Content className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary-700">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-default-500">
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full bg-primary-600 text-white font-semibold py-6"
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
