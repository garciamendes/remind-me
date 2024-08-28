import { fastify } from './app'
import { env } from './env'

fastify
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running 🚀')
  })
