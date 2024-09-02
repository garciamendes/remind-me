import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { GetAllTasksUseCase } from '../get-all-tasks'

export function makeGetAllTasksUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const getAllTasksUseCase = new GetAllTasksUseCase(tasksRepository)

  return getAllTasksUseCase
}
