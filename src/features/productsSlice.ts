import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productService } from '../services/api'
import { Product } from '../types/product'
import { FILTERS_STORAGE_KEY, saveToStorage, loadFromStorage } from '../utils/localStorage'

export interface SortOption {
  value: 'old-to-new' | 'new-to-old' | 'price-high-to-low' | 'price-low-to-high'
  label: string
}

export const sortOptions: SortOption[] = [
  { value: 'old-to-new', label: 'Old to new' },
  { value: 'new-to-old', label: 'New to old' },
  { value: 'price-high-to-low', label: 'Price high to low' },
  { value: 'price-low-to-high', label: 'Price low to High' }
]

interface Filters {
  sort: SortOption['value'] | null
  brands: string[]
  models: string[]
  searchTerm: string
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
  filters: Filters
  availableBrands: string[]
  availableModels: string[]
  pagination: {
    currentPage: number
    totalPages: number
    limit: number
  }
}

// Initial state'i localStorage'dan yükle
const savedFilters = loadFromStorage(FILTERS_STORAGE_KEY)
const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: savedFilters?.filters || {
    sort: 'new-to-old',
    brands: [],
    models: [],
    searchTerm: ''
  },
  availableBrands: [],
  availableModels: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 12
  }
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number = 1) => {
    const response = await productService.getProducts(page)
    return response
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await productService.getProductById(id)
    return response
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortOption['value']>) => {
      state.filters.sort = action.payload
      saveToStorage(FILTERS_STORAGE_KEY, { filters: state.filters })
      applyFilters(state)
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload
      const index = state.filters.brands.indexOf(brand)
      if (index === -1) {
        state.filters.brands.push(brand)
      } else {
        state.filters.brands.splice(index, 1)
      }
      saveToStorage(FILTERS_STORAGE_KEY, { filters: state.filters })
      applyFilters(state)
    },
    toggleModel: (state, action: PayloadAction<string>) => {
      const model = action.payload
      const index = state.filters.models.indexOf(model)
      if (index === -1) {
        state.filters.models.push(model)
      } else {
        state.filters.models.splice(index, 1)
      }
      saveToStorage(FILTERS_STORAGE_KEY, { filters: state.filters })
      applyFilters(state)
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload.toLowerCase()
      saveToStorage(FILTERS_STORAGE_KEY, { filters: state.filters })
      applyFilters(state)
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload
    },
    updateAvailableFilters: (state) => {
      state.availableBrands = Array.from(
        new Set(state.products.map(product => product.brand))
      ).sort()

      state.availableModels = Array.from(
        new Set(state.products.map(product => product.model))
      ).sort()
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.loading = false
        state.pagination.totalPages = Math.ceil(action.payload.total / state.pagination.limit)
        state.availableBrands = Array.from(
          new Set(action.payload.products.map(product => product.brand))
        ).sort()
        state.availableModels = Array.from(
          new Set(action.payload.products.map(product => product.model))
        ).sort()
        applyFilters(state)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Bir hata oluştu'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ürün bulunamadı'
      })
  },
})

const applyFilters = (state: ProductsState) => {
  let filtered = [...state.products]

  // Marka filtresi
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter(product => 
      state.filters.brands.includes(product.brand)
    )
  }

  // Model filtresi
  if (state.filters.models.length > 0) {
    filtered = filtered.filter(product => 
      state.filters.models.includes(product.model)
    )
  }

  // Arama filtresi
  if (state.filters.searchTerm) {
    const searchTerm = state.filters.searchTerm.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    )
  }

  // Sıralama
  if (state.filters.sort) {
    filtered.sort((a, b) => {
      switch (state.filters.sort) {
        case 'old-to-new':
          return a.id.localeCompare(b.id)
        case 'new-to-old':
          return b.id.localeCompare(a.id)
        case 'price-high-to-low':
          return b.price - a.price
        case 'price-low-to-high':
          return a.price - b.price
        default:
          return 0
      }
    })
  }

  state.filteredProducts = filtered
}

export const { setSort, toggleBrand, toggleModel, searchProducts, setSelectedProduct, setPage } = productsSlice.actions
export default productsSlice.reducer
export { initialState } 