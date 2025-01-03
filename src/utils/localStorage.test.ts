import { saveToStorage, loadFromStorage } from './localStorage'

describe('localStorage utils', () => {
  beforeEach(() => {
    // localStorage'ı temizle
    localStorage.clear()
  })

  it('should save and load data from localStorage', () => {
    const testData = { test: 'data' }
    saveToStorage('test-key', testData)
    
    const loadedData = loadFromStorage('test-key')
    expect(loadedData).toEqual(testData)
  })

  it('should return null for non-existent key', () => {
    const loadedData = loadFromStorage('non-existent')
    expect(loadedData).toBeNull()
  })
}) 