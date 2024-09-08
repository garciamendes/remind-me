import { FastifyReply, FastifyRequest } from 'fastify'
import { TaskIDParamsSchema } from '../../../utils/types'
import { makeDestroyTaskUseCase } from '../../../useCases/factories/make-destroy-task-use-case'

export async function destroyTask(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskSchemaParams = TaskIDParamsSchema.parse(request.params)

  try {
    const destroyTaskUseCase = makeDestroyTaskUseCase()

    await destroyTaskUseCase.execute(
      request.user.sign.sub,
      taskSchemaParams.taskID
    )

    return reply.status(204).send()
  } catch (error) {
    return reply.status(500).send({ error })
  }
}
