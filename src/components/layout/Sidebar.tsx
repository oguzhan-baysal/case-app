import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setSort, toggleBrand, toggleModel, sortOptions } from '../../features/productsSlice'
import type { SortOption } from '../../features/productsSlice'

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { filters, availableBrands, availableModels } = useAppSelector((state) => state.products)
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  const handleSortClick = (value: SortOption['value']) => (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(setSort(value))
  }

  const filteredBrands = availableBrands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  )

  const filteredModels = availableModels.filter(model => 
    model.toLowerCase().includes(modelSearch.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={handleSortClick(option.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={filters.sort === option.value}
                readOnly
              />
              <span className="text-gray-700">{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Brands ({filteredBrands.length})</h3>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
            {filteredBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={filters.brands.includes(brand)}
                  onChange={() => dispatch(toggleBrand(brand))}
                />
                <span className="text-gray-700 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Models ({filteredModels.length})</h3>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search models..."
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
            {filteredModels.map((model) => (
              <label key={model} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={filters.models.includes(model)}
                  onChange={() => dispatch(toggleModel(model))}
                />
                <span className="text-gray-700 text-sm">{model}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 