import Fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { userControllerRoutes } from './http/controllers/user/routes'
import fastifyCors from '@fastify/cors'

export const fastify = Fastify()

fastify.register(fastifyCors, {
  origin: env.ALLOW_CORS,
})
fastify.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

fastify.register(userControllerRoutes, { prefix: '/api' })

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  reply.status(500).send({ message: 'Internal Server Error' })
})
