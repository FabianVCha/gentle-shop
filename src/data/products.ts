export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Auriculares Bluetooth Pro",
    price: 89.99,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description: "Auriculares inalámbricos con cancelación de ruido activa y 30h de batería.",
    rating: 4.8,
    stock: 45,
  },
  {
    id: 2,
    name: "Zapatillas Deportivas Runner",
    price: 129.50,
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    description: "Zapatillas ultraligeras con suela de espuma reactiva para máximo rendimiento.",
    rating: 4.6,
    stock: 32,
  },
  {
    id: 3,
    name: "Reloj Inteligente Series 5",
    price: 249.00,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    description: "Smartwatch con monitor de salud avanzado, GPS y resistencia al agua 5ATM.",
    rating: 4.9,
    stock: 18,
  },
  {
    id: 4,
    name: "Mochila Antirrobo Urbana",
    price: 59.99,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description: "Mochila impermeable con compartimento para laptop y puerto USB integrado.",
    rating: 4.5,
    stock: 67,
  },
  {
    id: 5,
    name: "Cafetera Espresso Automática",
    price: 199.99,
    category: "Hogar",
    image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=400&h=300&fit=crop",
    description: "Prepara café espresso, cappuccino y latte con un solo toque. 15 bares de presión.",
    rating: 4.7,
    stock: 12,
  },
  {
    id: 6,
    name: "Gafas de Sol Polarizadas UV400",
    price: 45.00,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    description: "Montura de acetato italiano con lentes polarizadas de categoría 3.",
    rating: 4.4,
    stock: 89,
  },
  {
    id: 7,
    name: "Teclado Mecánico RGB",
    price: 119.00,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    description: "Switches Cherry MX Red, iluminación RGB personalizable y reposamuñecas magnético.",
    rating: 4.8,
    stock: 25,
  },
  {
    id: 8,
    name: "Botella Térmica Acero Inox",
    price: 29.99,
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    description: "Mantiene bebidas frías 24h o calientes 12h. Acero inoxidable 18/8 sin BPA.",
    rating: 4.6,
    stock: 150,
  },
];
