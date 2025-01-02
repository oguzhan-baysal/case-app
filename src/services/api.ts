import axios from 'axios'
import { Product } from '../types/product'

const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io'

const api = axios.create({
  baseURL: API_URL,
})

export const productService = {
  getProducts: async (page: number = 1, limit: number = 12) => {
    const response = await api.get<Product[]>(`/products`, {
      params: {
        page,
        limit,
      },
    })
    return response.data
  },

  getProductById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },
} 