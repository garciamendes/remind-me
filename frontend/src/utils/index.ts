import secureStorage from 'react-secure-storage'

export const localStorage = {
  setItem: (key: string, value: string | number | boolean | object) => secureStorage.setItem(key, value),
  getItem: (key: string) => secureStorage.getItem(key),
  removeItem: (key: string) => secureStorage.removeItem(key),
}