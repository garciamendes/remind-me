// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

// Project
import { UserCredentialsError } from '../../../useCases/errors/user-credentials-error'
import { makeAuthenticateUseCase } from '../../../useCases/factories/authenticate-user-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticareBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticareBody.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { auth } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({ sign: { sub: auth.id } })
    return reply.status(200).send({ token: token })
  } catch (error) {
    if (error instanceof UserCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
