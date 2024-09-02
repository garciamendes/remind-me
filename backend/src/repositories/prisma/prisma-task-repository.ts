/* eslint-disable prettier/prettier */
import { prisma } from '../../lib/prisma'
import { FiltersGetAllTasks, IGetAllTasksResponse } from '../../utils/types'
import { TaskRepository } from '../task-repository'

export class PrismaTaskRepository implements TaskRepository {
  async getAllTasks(filters: FiltersGetAllTasks): Promise<IGetAllTasksResponse> {
    const filterBySearch = filters.search
      ? {
        title: {
          contains: filters.search,
        },
      }
      : {}

    const [resultsTasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where: filterBySearch,
        skip: (filters.page - 1) * 20,
        take: 20
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
}
