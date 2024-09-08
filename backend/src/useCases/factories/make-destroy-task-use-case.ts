import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { DestroyTaskUseCase } from '../destroy-task'

export function makeDestroyTaskUseCase() {
  const userRepository = new PrismaUserRepository()
  const tasksRepository = new PrismaTaskRepository()
  const destroyTaskUseCase = new DestroyTaskUseCase(
    userRepository,
    tasksRepository
  )

  return destroyTaskUseCase
}
