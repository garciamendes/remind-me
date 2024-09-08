import { Task } from '@prisma/client'
import z from 'zod'

export const CredentialsUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type CredentialsUser = z.infer<typeof CredentialsUserSchema>

export const FiltersGetAlltasksSchema = z.object({
  page: z.coerce.number().int(),
  search: z.string().optional(),
})

export type FiltersGetAllTasks = z.infer<typeof FiltersGetAlltasksSchema>

export interface IGetAllTasksResponse {
  results: Task[]
  currentPage: number
  next: number | null
  previous: number | null
}

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }),
  description: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type CreateTask = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completedAt: z.string().optional(),
})

export type UpdateTask = z.infer<typeof updateTaskSchema>

export const TaskIDParamsSchema = z.object({
  taskID: z.string().uuid(),
})
