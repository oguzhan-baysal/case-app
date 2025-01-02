import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setSort, toggleBrand, toggleModel, sortOptions } from '../../features/productsSlice'

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector((state) => state.products)
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  // Örnek marka ve model listeleri (gerçek uygulamada API'den gelebilir)
  const brands = ['Apple', 'Samsung', 'Huawei']
  const models = ['11', '12 Pro', '13 Pro Max']

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  )

  const filteredModels = models.filter(model => 
    model.toLowerCase().includes(modelSearch.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="sort"
                className="text-blue-600"
                checked={filters.sort === option.value}
                onChange={() => dispatch(setSort(option.value))}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {filteredBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-blue-600 rounded"
                checked={filters.brands.includes(brand)}
                onChange={() => dispatch(toggleBrand(brand))}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Model</h3>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {filteredModels.map((model) => (
            <label key={model} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-blue-600 rounded"
                checked={filters.models.includes(model)}
                onChange={() => dispatch(toggleModel(model))}
              />
              <span>{model}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar 