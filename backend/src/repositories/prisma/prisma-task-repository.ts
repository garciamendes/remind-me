/* eslint-disable prettier/prettier */
import { prisma } from '../../lib/prisma'
import { CreateTask, FiltersGetAllTasks, IGetAllTasksResponse, UpdateTask } from '../../utils/types'
import { TaskRepository } from '../task-repository'

export class PrismaTaskRepository implements TaskRepository {
  async getAllTasks(userID: string, filters: FiltersGetAllTasks): Promise<IGetAllTasksResponse> {
    const filterBySearch = filters.search
      ? {
        title: {
          contains: filters.search,
        },
      }
      : {}

    const [resultsTasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where: { userId: userID, ...filterBySearch },
        skip: (filters.page - 1) * 20,
        take: 20,
        orderBy: { createdAt: 'desc' }
      }),

      prisma.task.count({ where: filterBySearch }),
    ])

    return {
      results: resultsTasks,
      currentPage: filters.page,
      next: filters.page < totalTasks ? filters.page + 1 : null,
      previous: filters.page > totalTasks ? filters.page - 1 : null,
    }
  }

  async createTask(userID: string, data: CreateTask) {
    const task = await prisma.task.create({data: {
      title: data.title,
      description: data.description,
      userId: userID,
    }})

    return task
  }

  async updateTask(userID: string, taskID: string, dataToUpdate: UpdateTask) {
    const dataUpdate: Record<string, unknown> = {}

    if (dataToUpdate.title) dataUpdate['title'] = dataToUpdate.title
    if (dataToUpdate.description) dataUpdate['description'] = dataToUpdate.description
    if (dataToUpdate.completedAt) dataUpdate['completedAt'] = dataToUpdate.completedAt

    const task = await prisma.task.update({
      where: { userId: userID, id: taskID }, data: dataUpdate,
    })

    return task
  }

  async findTask(userID: string, taskID: string) {
    const task = await prisma.task.findUnique({
      where: { userId: userID, id: taskID },
    })

    if (!task) return null

    return task
  }

  async destroyTask(userID: string, taskID: string) {
    await prisma.task.delete({ where: { userId: userID, id: taskID } })
  }
}
