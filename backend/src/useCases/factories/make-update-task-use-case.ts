import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { UpdateTaskUseCase } from '../update-task'

export function makeUpdateTaskUseCase() {
  const userRepository = new PrismaUserRepository()
  const tasksRepository = new PrismaTaskRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(
    userRepository,
    tasksRepository
  )

  return updateTaskUseCase
}
