import { Link } from 'react-router-dom'
import { Card, Button, Badge } from '@heroui/react'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 border border-default-200">
      <Card.Content className="p-0 relative">
        <Badge color="accent" className="absolute top-2 left-2 z-10">
          {product.category}
        </Badge>
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
        <div className="p-4">
          <Link to={`/product/${product.id}`} className="block hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-1 mb-2">
              <Star size={16} className="text-secondary fill-secondary" />
              <span className="text-sm text-default-600">{product.rating}</span>
              <span className="text-xs text-default-400">({product.stock} disponibles)</span>
            </div>
            <h3 className="font-semibold text-lg text-default-900 mb-1">{product.name}</h3>
            <p className="text-sm text-default-500 line-clamp-2">{product.description}</p>
          </Link>
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-between items-center px-4 pb-4 pt-0">
        <span className="text-xl font-bold text-primary-700">${product.price.toFixed(2)}</span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={18} />
          <span className="ml-1">Añadir</span>
        </Button>
      </Card.Footer>
    </Card>
  )
}
