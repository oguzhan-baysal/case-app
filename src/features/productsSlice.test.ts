import productsReducer, { 
  setSort, 
  toggleBrand, 
  searchProducts,
  initialState
} from './productsSlice'
import { Product } from '../types/product'

// Mock ürünler
const mockProduct1: Product = {
  id: '1',
  name: 'Bentley CTS',
  price: 100,
  description: 'Test Description 1',
  image: 'test1.jpg',
  brand: 'Bentley',
  model: 'CTS',
  category: 'Otomobil'
}

const mockProduct2: Product = {
  id: '2',
  name: 'Ford Focus',
  price: 50,
  description: 'Test Description 2',
  image: 'test2.jpg',
  brand: 'Ford',
  model: 'Focus',
  category: 'Otomobil'
}

describe('Products Reducer', () => {
  it('should handle setSort', () => {
    const testState = {
      ...initialState,
      products: [mockProduct1, mockProduct2]
    }
    const actual = productsReducer(testState, setSort('price-high-to-low'))
    expect(actual.filteredProducts[0].price).toBeGreaterThan(actual.filteredProducts[1].price)
  })

  it('should handle toggleBrand', () => {
    const testState = {
      ...initialState,
      products: [mockProduct1, mockProduct2]
    }
    const actual = productsReducer(testState, toggleBrand('Bentley'))
    expect(actual.filters.brands).toContain('Bentley')
    expect(actual.filteredProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ brand: 'Bentley' })
      ])
    )
  })

  it('should handle searchProducts', () => {
    const testState = {
      ...initialState,
      products: [mockProduct1, mockProduct2]
    }
    const actual = productsReducer(testState, searchProducts('Bentley'))
    expect(actual.filteredProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.stringContaining('Bentley') })
      ])
    )
  })

  it('should handle search products', () => {
    // Test search functionality
  })

  it('should handle pagination', () => {
    // Test pagination
  })

  it('should handle API errors', () => {
    // Test error handling
  })
}) 