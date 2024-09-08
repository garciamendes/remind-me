import { Task } from '@prisma/client'
import { TaskRepository } from '../task-repository'
import { CreateTask, FiltersGetAllTasks, UpdateTask } from '../../utils/types'
import { randomUUID } from 'node:crypto'

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = []

  async getAllTasks(userID: string, filters: FiltersGetAllTasks) {
    let tasks = []

    if (filters.search) {
      tasks = this.tasks.filter(
        (task) =>
          task.userId === userID &&
          task.title
            .toLowerCase()
            .includes(String(filters?.search).toLowerCase())
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

  async createTask(userID: string, data: CreateTask) {
    const task: Task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      userId: userID,
      completedAt: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    this.tasks.push(task)

    return task
  }

  async updateTask(userID: string, taskID: string, dataToUpdate: UpdateTask) {
    const taskIndexToUpdate = this.tasks.findIndex(
      (task) => task.userId === userID && task.id === taskID
    )
    const taskFined = this.tasks.find(
      (task) => task.userId === userID && task.id === taskID
    )

    const dataUpdate = taskFined!

    if (dataToUpdate.title) dataUpdate['title'] = dataToUpdate.title
    if (dataToUpdate.description)
      dataUpdate['description'] = dataToUpdate.description
    if (dataToUpdate.completedAt)
      dataUpdate['completedAt'] = dataToUpdate.completedAt

    this.tasks[taskIndexToUpdate] = dataToUpdate as Task

    return taskFined as Task
  }

  async destroyTask(userID: string, taskID: string) {
    const newArray = this.tasks.filter((task) => {
      return task.userId === userID && task.id !== taskID
    })

    this.tasks = newArray
  }

  async findTask(userID: string, taskID: string) {
    const task = this.tasks.find(
      (task) => task.userId === userID && task.id === taskID
    )

    if (!task) return null

    return task
  }
}
