import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { GetAllTasksUseCase } from '../get-all-tasks'

export function makeGetAllTasksUseCase() {
  const userRepository = new PrismaUserRepository()
  const tasksRepository = new PrismaTaskRepository()
  const getAllTasksUseCase = new GetAllTasksUseCase(
    userRepository,
    tasksRepository
  )

  return getAllTasksUseCase
}
