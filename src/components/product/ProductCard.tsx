import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { addToCart } from '../../features/cartSlice'
import { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pb-[75%] mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand} {product.model}</p>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-blue-600">
              {product.price.toLocaleString('tr-TR')}₺
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard 