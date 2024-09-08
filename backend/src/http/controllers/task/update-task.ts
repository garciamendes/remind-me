import { FastifyReply, FastifyRequest } from 'fastify'
import { TaskIDParamsSchema, updateTaskSchema } from '../../../utils/types'
import { makeUpdateTaskUseCase } from '../../../useCases/factories/make-update-task-use-case'

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskBody = updateTaskSchema.parse(request.body)
  const taskSchemaParams = TaskIDParamsSchema.parse(request.params)

  try {
    const updateTaskUseCase = makeUpdateTaskUseCase()

    const task = await updateTaskUseCase.execute(
      request.user.sign.sub,
      taskSchemaParams.taskID,
      updateTaskBody
    )

    return reply.status(200).send(task)
  } catch (error) {
    return reply.status(500).send({ error })
  }
}
