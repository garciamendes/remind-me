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
