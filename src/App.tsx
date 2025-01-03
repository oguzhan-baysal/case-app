import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  )
}

export default App
