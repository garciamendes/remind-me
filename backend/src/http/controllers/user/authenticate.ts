import { FastifyRequest, FastifyReply } from 'fastify'
import { UserCredentialsError } from '../../../useCases/errors/user-credentials-error'
import { makeAuthenticateUseCase } from '../../../useCases/factories/make-authenticate-user-use-case'
import { CredentialsUserSchema } from '../../../utils/types'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = CredentialsUserSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { auth } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: { sub: auth.userId, expiresIn: '7d' },
    })
    return reply.status(200).send({ token: token })
  } catch (error) {
    if (error instanceof UserCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
