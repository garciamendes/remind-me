import { Task } from '@prisma/client'
import {
  CreateTask,
  FiltersGetAllTasks,
  IGetAllTasksResponse,
  UpdateTask,
} from '../utils/types'

export interface TaskRepository {
  getAllTasks: (
    userID: string,
    filters: FiltersGetAllTasks
  ) => Promise<IGetAllTasksResponse>
  createTask: (userID: string, data: CreateTask) => Promise<Task>
  updateTask: (
    userID: string,
    taskID: string,
    data: UpdateTask
  ) => Promise<Task>
  destroyTask: (userID: string, taskID: string) => Promise<void>
  findTask: (userID: string, taskID: string) => Promise<Task | null>
}
