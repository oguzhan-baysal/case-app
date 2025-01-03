import cartReducer, { addToCart, removeFromCart } from './cartSlice'

describe('Cart Reducer', () => {
  const initialState = {
    items: []
  }

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    brand: 'Test Brand',
    model: 'Test Model',
    category: 'Otomobil'
  }

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addToCart', () => {
    const actual = cartReducer(initialState, addToCart(mockProduct))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0].quantity).toBe(1)
  })

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ ...mockProduct, quantity: 1 }]
    }
    const actual = cartReducer(stateWithItem, removeFromCart('1'))
    expect(actual.items).toHaveLength(0)
  })
}) 