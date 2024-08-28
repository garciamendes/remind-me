import { Auth, User } from '@prisma/client'
import { CreateUser } from '../../utils/types'
import { IUserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements IUserRepository {
  public userItems: User[] = []
  private authUser: Auth[] = []

  async create(data: CreateUser) {
    const user: User = {
      id: randomUUID(),
      name: '',
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const auth: Auth = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      lastLogin: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
      userId: user.id,
    }

    this.userItems.push(user)
    this.authUser.push(auth)
  }

  async findByEmail(email: string) {
    const auth = this.authUser.find((auth) => auth.email === email)
    const user = this.userItems.find((user) => user.id === auth?.userId)

    if (!user) return null

    return user
  }
}
