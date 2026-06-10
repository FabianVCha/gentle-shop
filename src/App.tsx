import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ToastContainer from './components/ToastContainer'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-default-50">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <TopBar />
        <Header onCartOpen={() => setCartOpen(true)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <ToastContainer />
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </PageTransition>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
