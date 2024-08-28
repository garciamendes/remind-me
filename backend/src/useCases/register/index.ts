import { IUserRepository } from '../../repositories/user-repository'
import { CreateUser } from '../../utils/types'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUser): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email)

    if (user) throw new UserAlreadyExistsError()

    const passwordHash = await hash(data.password, 10)

    await this.userRepository.create({
      email: data.email,
      password: passwordHash,
    })
  }
}
