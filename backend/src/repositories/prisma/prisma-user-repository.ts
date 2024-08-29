import { Auth } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CredentialsUser } from '../../utils/types'
import { IUserRepository } from '../user-repository'

export class PrismaUserRepository implements IUserRepository {
  async create(data: CredentialsUser) {
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

  async findAuthByUser(userId: string) {
    const auth = await prisma.auth.findUnique({
      where: { userId },
    })

    return auth as Auth
  }

  async findUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) return null

    return user
  }
}
