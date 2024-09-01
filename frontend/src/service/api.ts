import axios from 'axios'
import { localStorage } from '@/utils'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') as string}`
  }
})