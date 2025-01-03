import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../features/store'
import Cart from './Cart'
import { addToCart } from '../../features/cartSlice'

describe('Cart Component', () => {
  it('should render empty cart message', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )
    expect(screen.getByText('Sepetiniz boş')).toBeInTheDocument()
  })

  it('should handle quantity increase/decrease', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
      description: 'Test',
      image: 'test.jpg',
      brand: 'Test',
      model: 'Test',
      category: 'Test'
    }

    store.dispatch(addToCart(mockProduct))

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    const increaseButton = screen.getByRole('button', { name: '+' })
    fireEvent.click(increaseButton)
    expect(screen.getByText('2')).toBeInTheDocument()

    const decreaseButton = screen.getByRole('button', { name: '-' })
    fireEvent.click(decreaseButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should calculate total correctly', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 2,
      description: 'Test',
      image: 'test.jpg',
      brand: 'Test',
      model: 'Test',
      category: 'Test'
    }

    store.dispatch(addToCart(mockProduct))

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    )

    expect(screen.getByText('200₺')).toBeInTheDocument()
  })
}) 