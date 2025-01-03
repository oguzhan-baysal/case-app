// Local Storage Keys
export const CART_STORAGE_KEY = 'vardabit_cart'
export const FILTERS_STORAGE_KEY = 'vardabit_filters'

// Local Storage Helpers
export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const loadFromStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
} 