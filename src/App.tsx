import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-default-50">
        <Header />
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </PageTransition>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
