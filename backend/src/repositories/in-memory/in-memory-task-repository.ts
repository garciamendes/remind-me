import { Task } from '@prisma/client'
import { TaskRepository } from '../task-repository'
import { FiltersGetAllTasks } from '../../utils/types'

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = []

  async getAllTasks(filters: FiltersGetAllTasks) {
    let tasks = []

    if (filters.search) {
      tasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(String(filters?.search).toLowerCase())
      )
    } else {
      tasks = this.tasks
    }

    return {
      results: tasks.slice((filters.page - 1) * 20, filters.page * 20),
      currentPage: filters.page,
      next:
        Math.ceil(tasks.length / 20) > filters.page ? filters.page + 1 : null,
      previous: filters.page > 1 ? filters.page - 1 : null,
    }
  }
}
