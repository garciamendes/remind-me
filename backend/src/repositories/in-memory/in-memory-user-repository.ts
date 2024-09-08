import { Auth, User } from '@prisma/client'
import { CredentialsUser } from '../../utils/types'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public userItems: User[] = []
  private authUser: Auth[] = []

  async create(data: CredentialsUser) {
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
    if (!auth) return null

    const user = this.userItems.find((user) => user.id === auth?.userId)

    return user as User
  }

  async findAuthByUser(userId: string) {
    const auth = this.authUser.find((auth) => auth.userId === userId)

    return auth as Auth
  }

  async findUserById(userId: string) {
    const user = this.userItems.find((user) => user.id === userId)

    if (!user) return null

    return user
  }
}
