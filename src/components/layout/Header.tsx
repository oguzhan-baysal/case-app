import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { searchProducts } from '../../features/productsSlice'
import Cart from './Cart'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    dispatch(searchProducts(value))
  }

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 max-w-[1920px]">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold shrink-0 text-white hover:text-blue-100 transition-colors">
            Vardabit
          </Link>
          
          <div className="flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-1.5 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-blue-600">{total.toLocaleString('tr-TR')}₺</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isCartOpen ? 'rotate-180' : ''} text-blue-600`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={() => setIsCartOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[450px] lg:w-[480px] z-50 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                    <Cart onClose={() => setIsCartOpen(false)} />
                  </div>
                </>
              )}
            </div>
            <span className="font-medium">Kerem</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 