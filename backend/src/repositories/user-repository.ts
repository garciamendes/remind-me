import { User } from '@prisma/client'
import { CreateUser } from '../utils/types'

export interface IUserRepository {
  create: (data: CreateUser) => Promise<void>
  findByEmail: (email: string) => Promise<User | null>
  // login: (data: Login) => Promise<null>
  // logout: (data: Logout) => Promise<null>
}
