import { fastify } from './app'
import { env } from './env'

fastify
  .listen({
    host: '0.0.0.0', // Listen on all network interfaces.
    port: env.PORT || 3333,
  })
  .then(() => {
    console.log('HTTP Server Running 🚀')
  })
