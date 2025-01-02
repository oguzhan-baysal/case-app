import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { searchProducts } from '../../features/productsSlice'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    dispatch(searchProducts(value))
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-900">E-Ticaret</h1>
        <input
          type="search"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </header>
  )
}

export default Header 