import { Auth, User } from '@prisma/client'
import { CredentialsUser } from '../utils/types'

export interface IUserRepository {
  create: (data: CredentialsUser) => Promise<void>
  findByEmail: (email: string) => Promise<User | null>
  findAuthByUser: (userId: string) => Promise<Auth>
  findUserById: (userId: string) => Promise<User | null>
}
