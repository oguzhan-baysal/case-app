import axios from 'axios'
import { Product } from '../types/product'

const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io'

const api = axios.create({
  baseURL: API_URL,
})

// Araba markalarının doğru eşleşmeleri
const carBrandModels = {
  'Bentley': ['Continental', 'Flying Spur', 'Bentayga'],
  'Ford': ['Focus', 'Fiesta', 'Mustang', 'Taurus', 'F-150', 'Explorer', 'XC90'],
  'BMW': ['3 Series', '5 Series', 'X5', 'M3', 'X3', 'X7'],
  'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'RS6', 'A8'],
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Tundra'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot'],
  'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Atlas'],
  'Ferrari': ['458', '488', 'F8', 'Portofino', 'SF90'],
  'Rolls Royce': ['Phantom', 'Ghost', 'Cullinan', 'Dawn'],
  'Land Rover': ['Range Rover', 'Discovery', 'Defender', 'Evoque'],
  'Chevrolet': ['Camaro', 'Corvette', 'Malibu', 'Silverado', 'Tahoe'],
  'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y'],
  'Nissan': ['Altima', 'Maxima', 'Rogue', 'Sentra', 'GT-R'],
  'Porsche': ['911', 'Cayenne', 'Panamera', 'Macan'],
  'Cadillac': ['Escalade', 'CT4', 'CT5', 'XT5', 'CTS'],
  'Fiat': ['500', 'Panda', 'Tipo', '500X'],
  'Jaguar': ['F-PACE', 'XF', 'XE', 'I-PACE']
}

// İsimdeki arabaları ayıran fonksiyon
const splitCarName = (name: string): string[] => {
  const words = name.split(' ')
  return words.filter(word => 
    Object.keys(carBrandModels).includes(word) || 
    Object.values(carBrandModels).flat().includes(word)
  )
}

// Veriyi dönüştüren fonksiyon
const transformProduct = (product: any): Product[] => {
  const carNames = splitCarName(product.name)
  
  if (carNames.length <= 1) {
    // Tek araba varsa direkt döndür
    return [product]
  }

  // İki farklı araba varsa iki kart oluştur
  return carNames.map((carName, index) => {
    let brand = ''
    let model = carName

    // Marka mı model mi kontrol et
    if (Object.keys(carBrandModels).includes(carName)) {
      brand = carName
      model = product.model
    } else {
      // Model ise markasını bul
      Object.entries(carBrandModels).forEach(([carBrand, models]) => {
        if (models.includes(carName)) {
          brand = carBrand
          model = carName
        }
      })
    }

    return {
      ...product,
      id: `${product.id}-${index + 1}`,
      name: `${brand} ${model}`,
      brand: brand,
      model: model
    }
  })
}

export const productService = {
  getProducts: async (page: number = 1, limit: number = 12) => {
    const response = await api.get<any[]>(`/products`, {
      params: {
        page,
        limit,
      },
    })

    // Transform işleminden sonra veriyi kontrol et
    const transformedProducts = response.data.flatMap(transformProduct)
    
    // Toplam ürün sayısını transform sonrası ürün sayısına göre hesapla
    const totalTransformedProducts = transformedProducts.length
    
    return {
      products: transformedProducts.slice((page - 1) * limit, page * limit), // Sayfalama için doğru slice
      total: totalTransformedProducts // Gerçek toplam ürün sayısı
    }
  },

  getProductById: async (id: string) => {
    // ID'den "-1" veya "-2" ekini kaldır
    const originalId = id.split('-')[0]
    const response = await api.get<any>(`/products/${originalId}`)
    
    // Tüm transformasyonu yap ve istenen ID'ye sahip ürünü bul
    const transformedProducts = transformProduct(response.data)
    const requestedProduct = transformedProducts.find(p => p.id === id)
    
    if (!requestedProduct) {
      throw new Error('Product not found')
    }
    
    return requestedProduct
  },
} 