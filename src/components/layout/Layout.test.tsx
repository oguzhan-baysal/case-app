import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../features/store'
import Layout from './Layout'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/product/1-1'
  })
}))

describe('Layout Component', () => {
  it('should not show sidebar on product detail page', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </Provider>
      )
    })
    
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
  })
}) 