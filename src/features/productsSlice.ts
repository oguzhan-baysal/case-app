import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productService } from '../services/api'
import { Product } from '../types/product'

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
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    sort: null,
    brands: [],
    models: [],
    searchTerm: ''
  },
  availableBrands: [],
  availableModels: []
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productService.getProducts()
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
      applyFilters(state)
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload.toLowerCase()
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.availableBrands = Array.from(
          new Set(action.payload.map(product => product.brand))
        ).sort()
        state.availableModels = Array.from(
          new Set(action.payload.map(product => product.model))
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

  if (state.filters.brands.length > 0) {
    filtered = filtered.filter(product => 
      state.filters.brands.includes(product.brand)
    )
  }

  if (state.filters.models.length > 0) {
    filtered = filtered.filter(product => 
      state.filters.models.includes(product.model)
    )
  }

  if (state.filters.searchTerm) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(state.filters.searchTerm) ||
      product.description.toLowerCase().includes(state.filters.searchTerm)
    )
  }

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

export const { setSort, toggleBrand, toggleModel, searchProducts, setSelectedProduct } = productsSlice.actions
export default productsSlice.reducer 