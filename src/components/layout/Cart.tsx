import { useAppSelector } from '../../hooks/redux'

const Cart = () => {
  const { items } = useAppSelector((state) => state.cart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>
      
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price}₺</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center rounded border">-</button>
              <span>{item.quantity}</span>
              <button className="w-6 h-6 flex items-center justify-center rounded border">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total Price:</span>
          <span className="font-bold">{total}₺</span>
        </div>
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart 