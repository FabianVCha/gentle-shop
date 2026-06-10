export interface KitItem {
  productId: number
  quantity: number
}

export interface Kit {
  id: string
  name: string
  description: string
  icon: string
  items: KitItem[]
  image: string
  badge?: string
}

export const kits: Kit[] = [
  {
    id: 'kit-pintor',
    name: 'Kit Pintor',
    description: 'Todo lo que necesitas para pintar una habitación completa.',
    icon: 'Paintbrush',
    badge: 'Más vendido',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Paint_bucket_and_brush.jpg/640px-Paint_bucket_and_brush.jpg',
    items: [
      { productId: 3, quantity: 1 },   // Pintura Latex Interior 20L
      { productId: 9, quantity: 1 },   // Cinta Métrica 5m
    ],
  },
  {
    id: 'kit-plomero',
    name: 'Kit Plomero',
    description: 'Herramientas esenciales para reparaciones de fontanería.',
    icon: 'Wrench',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Stillson_Pipe_Wrench_of_Stephen_and_Elmer_Braun.jpg/640px-Stillson_Pipe_Wrench_of_Stephen_and_Elmer_Braun.jpg',
    items: [
      { productId: 7, quantity: 1 },   // Kit Fontanería Básico
      { productId: 11, quantity: 1 },  // Pegamento Epoxi 5 Min
    ],
  },
  {
    id: 'kit-electricista',
    name: 'Kit Electricista',
    description: 'Herramientas para trabajos eléctricos e instalaciones.',
    icon: 'Zap',
    badge: 'Popular',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/High_power_torch.jpg/640px-High_power_torch.jpg',
    items: [
      { productId: 1, quantity: 1 },   // Taladro Percutor 750W
      { productId: 4, quantity: 1 },   // Linterna LED Recargable
      { productId: 2, quantity: 1 },   // Set Destornilladores 6 Piezas
    ],
  },
  {
    id: 'kit-jardinero',
    name: 'Kit Jardinero',
    description: 'Mantenimiento y cuidado de jardín y exteriores.',
    icon: 'Flower2',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Melnor_Garden_Hose_Water_Nozzle_5_LR.jpg/640px-Melnor_Garden_Hose_Water_Nozzle_5_LR.jpg',
    items: [
      { productId: 10, quantity: 1 },  // Manguera Jardín 30m
      { productId: 12, quantity: 1 },  // Guantes Protección Industrial
    ],
  },
  {
    id: 'kit-carpintero',
    name: 'Kit Carpintero',
    description: 'Para cortar, lijar y pegar madera con precisión.',
    icon: 'Hammer',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/DeWalt_circular_saw_in_use.jpg/640px-DeWalt_circular_saw_in_use.jpg',
    items: [
      { productId: 5, quantity: 1 },   // Sierra Circular 1400W
      { productId: 6, quantity: 1 },   // Lija Orbital 125mm
      { productId: 11, quantity: 2 },  // Pegamento Epoxi 5 Min
    ],
  },
  {
    id: 'kit-bricolaje',
    name: 'Kit Bricolaje',
    description: 'El kit perfecto para proyectos de casa y reparaciones.',
    icon: 'Home',
    badge: 'Recomendado',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cordless_electric_%28screw%29_drill.jpg/640px-Cordless_electric_%28screw%29_drill.jpg',
    items: [
      { productId: 1, quantity: 1 },   // Taladro Percutor 750W
      { productId: 2, quantity: 1 },   // Set Destornilladores 6 Piezas
      { productId: 8, quantity: 1 },   // Caja Herramientas Metálica
      { productId: 9, quantity: 1 },  // Cinta Métrica 5m
    ],
  },
]
