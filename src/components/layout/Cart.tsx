import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { increaseQuantity, decreaseQuantity } from '../../features/cartSlice'

const Cart = () => {
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
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Cart</h2>
      
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.price.toLocaleString('tr-TR')}₺</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleDecrease(item.id)}
                className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-100"
              >
                <span className="text-gray-900 text-lg font-bold leading-none">−</span>
              </button>
              <span className="text-gray-800 w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => handleIncrease(item.id)}
                className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-100"
              >
                <span className="text-gray-900 text-lg font-bold leading-none">+</span>
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

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium text-gray-800">Total Price:</span>
          <span className="font-bold text-gray-900">{total.toLocaleString('tr-TR')}₺</span>
        </div>
        <button 
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart 