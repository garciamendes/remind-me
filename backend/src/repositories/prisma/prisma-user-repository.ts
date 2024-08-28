import { prisma } from '../../lib/prisma'
import { CreateUser } from '../../utils/types'
import { IUserRepository } from '../user-repository'

export class PrismaUserRepository implements IUserRepository {
  async create(data: CreateUser) {
    await prisma.auth.create({
      data: {
        email: data.email,
        password: data.password,
        user: {
          create: {},
        },
      },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { auth: { email } },
    })

    if (!user) return null

    return user
  }
}
