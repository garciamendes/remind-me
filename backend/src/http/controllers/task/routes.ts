import { FastifyInstance } from 'fastify'
import { getAllTasks } from './get-all-tasks'
import { verifyJwt } from '../../middleware/verify-token'
import { createTask } from './create-task'
import { updateTask } from './update-task'
import { destroyTask } from './destroy-task'

export async function TaskControllerRoutes(app: FastifyInstance) {
  app.get('', { onRequest: [verifyJwt] }, getAllTasks)
  app.post('', { onRequest: [verifyJwt] }, createTask)
  app.patch('/:taskID', { onRequest: [verifyJwt] }, updateTask)
  app.delete('/:taskID', { onRequest: [verifyJwt] }, destroyTask)
}
