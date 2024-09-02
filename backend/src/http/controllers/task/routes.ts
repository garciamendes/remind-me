import { FastifyInstance } from 'fastify'
import { getAllTasks } from './get-all-tasks'

export async function TaskControllerRoutes(app: FastifyInstance) {
  app.get('', getAllTasks)
}
