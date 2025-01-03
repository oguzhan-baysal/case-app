import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../store'
import ProductCard from './ProductCard'

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

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('100₺')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sepete ekle/i })).toBeInTheDocument()
  })

  it('handles add to cart click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: /sepete ekle/i }))
    // Sepete eklendiğinde store'da ürün olmalı
    expect(store.getState().cart.items).toHaveLength(1)
  })
}) 