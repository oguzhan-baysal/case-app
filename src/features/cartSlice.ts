import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/product'
import { CART_STORAGE_KEY, saveToStorage, loadFromStorage } from '../utils/localStorage'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: loadFromStorage(CART_STORAGE_KEY)?.items || [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      // Cart'ı localStorage'a kaydet
      saveToStorage(CART_STORAGE_KEY, state)
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveToStorage(CART_STORAGE_KEY, state)
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      saveToStorage(CART_STORAGE_KEY, state)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer 