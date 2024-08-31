import { fastify } from './app'

fastify
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running 🚀')
  })
