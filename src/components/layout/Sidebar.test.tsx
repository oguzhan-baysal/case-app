import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../features/store'
import Sidebar from './Sidebar'

const mockProducts = [
  {
    id: '1',
    name: 'Bentley CTS',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    brand: 'Bentley',
    model: 'CTS',
    category: 'Otomobil'
  },
  {
    id: '2',
    name: 'Ford Focus',
    price: 50,
    description: 'Test Description',
    image: 'test.jpg',
    brand: 'Ford',
    model: 'Focus',
    category: 'Otomobil'
  }
]

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Store'u mock data ile doldur
    store.dispatch({ 
      type: 'products/fetchProducts/fulfilled',
      payload: { products: mockProducts, total: 2 }
    })
  })

  it('should handle brand filter', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    const brandInput = screen.getByPlaceholderText('Search brands...')
    fireEvent.change(brandInput, { target: { value: 'Bentley' } })

    const brandCheckbox = screen.getByLabelText('Bentley')
    fireEvent.click(brandCheckbox)
    expect(brandCheckbox).toBeChecked()
  })

  it('should handle model filter', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    const modelInput = screen.getByPlaceholderText('Search models...')
    fireEvent.change(modelInput, { target: { value: 'CTS' } })

    const modelCheckbox = screen.getByLabelText('CTS')
    fireEvent.click(modelCheckbox)
    expect(modelCheckbox).toBeChecked()
  })

  it('should handle sort options', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    // Önce div'i bulalım
    const sortOptionDiv = screen.getByText('Price high to low').closest('div')
    expect(sortOptionDiv).toBeInTheDocument()

    // Div içindeki radio butonu bulalım
    const radio = sortOptionDiv?.querySelector('input[type="radio"]') as HTMLInputElement
    expect(radio).toBeInTheDocument()

    // Click işlemi
    fireEvent.click(sortOptionDiv as HTMLElement)
    expect(radio.checked).toBe(true)
  })
}) 