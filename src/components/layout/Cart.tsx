import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { increaseQuantity, decreaseQuantity } from '../../features/cartSlice'

interface CartProps {
  onClose?: () => void
}

const Cart = ({ onClose }: CartProps) => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">Cart</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="space-y-3 mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
              <p className="text-xs text-gray-600">{item.price.toLocaleString('tr-TR')}₺</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button 
                onClick={() => handleDecrease(item.id)}
                className="w-5 h-5 flex items-center justify-center rounded border border-blue-200 text-blue-600 hover:bg-blue-50 bg-white transition-colors"
              >
                <span className="text-sm">−</span>
              </button>
              <span className="text-gray-800 w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => handleIncrease(item.id)}
                className="w-5 h-5 flex items-center justify-center rounded border border-blue-200 text-blue-600 hover:bg-blue-50 bg-white transition-colors"
              >
                <span className="text-sm">+</span>
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Sepetiniz boş
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between mb-3 text-sm">
          <span className="font-medium text-gray-800">Total:</span>
          <span className="font-bold text-blue-600">{total.toLocaleString('tr-TR')}₺</span>
        </div>
        <button 
          className="w-full py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart 