import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchProductById } from '../features/productsSlice'
import { addToCart } from '../features/cartSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct))
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  )

  if (error) return (
    <div className="text-center text-red-500 py-8">
      {error}
    </div>
  )

  if (!selectedProduct) return null

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div className="md:flex">
        <div className="md:w-1/2 lg:w-3/5 xl:w-2/3 2xl:w-3/4">
          <div className="aspect-w-16 aspect-h-9">
            <img
              className="w-full h-full object-cover"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>
        </div>
        <div className="p-8 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedProduct.name}
          </h1>
          <p className="text-gray-600 mb-8">
            {selectedProduct.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {selectedProduct.price.toLocaleString('tr-TR')}₺
            </span>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 