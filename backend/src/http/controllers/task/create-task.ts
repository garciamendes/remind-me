import { FastifyReply, FastifyRequest } from 'fastify'
import { createTaskSchema } from '../../../utils/types'
import { makeCreateTaskUseCase } from '../../../useCases/factories/make-create-task-use-case'

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBody = createTaskSchema.parse(request.body)

  try {
    const createTaskUseCase = makeCreateTaskUseCase()

    const task = await createTaskUseCase.execute(
      request.user.sign.sub,
      createTaskBody
    )

    return reply.status(201).send(task)
  } catch (error) {
    return reply.status(500).send({ error })
  }
}
