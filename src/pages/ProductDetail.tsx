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
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-96"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {selectedProduct.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-600">
                ${selectedProduct.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 