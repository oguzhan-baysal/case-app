import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchProducts, setPage } from '../features/productsSlice'
import ProductCard from '../components/product/ProductCard'
import Pagination from '../components/common/Pagination'

const ProductList = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error, pagination } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts(pagination.currentPage))
  }, [dispatch, pagination.currentPage])

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Ürün bulunamadı
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination'ı her zaman göster */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ProductList 