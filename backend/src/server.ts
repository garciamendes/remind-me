import { fastify } from './app'
import { env } from './env'

fastify
  .listen({
    port: env.PORT || 3333,
  })
  .then(() => {
    console.log('HTTP Server Running 🚀')
  })
