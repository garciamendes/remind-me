import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function userControllerRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', authenticate)
}
