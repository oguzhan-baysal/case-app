import { productService } from './api'

// API çağrılarını mock'la
jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn().mockImplementation((url: string) => {
      if (url === '/products') {
        return Promise.resolve({
          data: [
            {
              id: '1',
              name: 'Test Product',
              price: 100,
              description: 'Test Description',
              image: 'test.jpg',
              brand: 'Test Brand',
              model: 'Test Model',
              category: 'Otomobil'
            }
          ]
        })
      }
      // Tekil ürün için mock response ekleyelim
      if (url.includes('/products/')) {
        return Promise.resolve({
          data: {
            id: '1',
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            image: 'test.jpg',
            brand: 'Test Brand',
            model: 'Test Model',
            category: 'Otomobil'
          }
        })
      }
    })
  })
}))

describe('Product Service', () => {
  it('should fetch products', async () => {
    const response = await productService.getProducts()
    expect(response.products).toHaveLength(1)
    expect(response.products[0].name).toBe('Test Product')
  })

  it('should fetch product by id', async () => {
    const response = await productService.getProductById('1')
    expect(response.id).toBe('1')
    expect(response.name).toBe('Test Product')
  })
}) 