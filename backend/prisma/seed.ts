import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {
  console.log(
    '--- Starting the popular process the bank for TASKs and Demo user ---'
  )

  const userDemo = await prisma.user.create({
    data: {
      name: 'demo',
    },
  })

  await prisma.auth.create({
    data: {
      email: 'demo@demo.com',
      password: await hash('demo', env.SALT_HASH),
      user: {
        connect: { id: userDemo.id },
      },
    },
  })

  const tasks: Prisma.TaskCreateManyInput[] = []
  for (let i = 1; i <= 100; i++) {
    tasks.push({
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      completedAt: null,
      userId: userDemo.id,
      createdAt: new Date(),
      modifiedAt: new Date(),
    })
  }

  await prisma.task.createMany({ data: tasks })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
