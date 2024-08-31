// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '../../../useCases/factories/make-register-user-use-case'
import { CredentialsUserSchema } from '../../../utils/types'
import { UserAlreadyExistsError } from '../../../useCases/errors/user-already-exists-error'

// Project

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = CredentialsUserSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
