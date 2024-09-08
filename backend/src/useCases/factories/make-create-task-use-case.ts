import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { CreateTaskUseCase } from '../create-task'

export function makeCreateTaskUseCase() {
  const userRepository = new PrismaUserRepository()
  const tasksRepository = new PrismaTaskRepository()
  const createTaskUseCase = new CreateTaskUseCase(
    userRepository,
    tasksRepository
  )

  return createTaskUseCase
}
