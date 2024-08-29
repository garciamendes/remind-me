import { IUserRepository } from '../../repositories/user-repository'
import { CredentialsUser } from '../../utils/types'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { env } from '../../env'

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CredentialsUser): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email)

    if (user) throw new UserAlreadyExistsError()

    const passwordHash = await hash(data.password, env.SALT_HASH)

    await this.userRepository.create({
      email: data.email,
      password: passwordHash,
    })
  }
}
