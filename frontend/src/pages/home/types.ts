import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }),
  description: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type CreateTask = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: 'O campo não pode ser vazio' }).optional(),
  description: z.string().min(1, { message: 'O campo não pode ser vazio' }).optional(),
  completedAt: z.string().optional(),
})

export type UpdateTask = z.infer<typeof updateTaskSchema>

export const taskIDParamsSchema = z.object({
  taskID: z.string().uuid(),
})
export type TaskIDParams = z.infer<typeof taskIDParamsSchema>