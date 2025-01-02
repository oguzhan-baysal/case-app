import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { searchProducts } from '../../features/productsSlice'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold shrink-0">
            Vardabit
          </Link>
          
          <div className="flex-1 max-w-xl">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-1.5 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <span className="font-medium">{total.toLocaleString('tr-TR')}₺</span>
            <span className="font-medium">Kerem</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 