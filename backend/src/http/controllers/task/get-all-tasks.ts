import { FastifyReply, FastifyRequest } from 'fastify'
import { FiltersGetAlltasksSchema } from '../../../utils/types'
import { makeGetAllTasksUseCase } from '../../../useCases/factories/make-get-all-tasks-use-case'

export async function getAllTasks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const filters = FiltersGetAlltasksSchema.parse(request.query)

  try {
    const getAllTasksUseCase = makeGetAllTasksUseCase()

    const tasks = await getAllTasksUseCase.execute(
      request.user.sign.sub,
      filters
    )

    return reply.status(200).send(tasks)
  } catch (error) {
    return reply.status(500).send({ error })
  }
}
