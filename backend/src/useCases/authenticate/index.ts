import { IUserRepository } from '../../repositories/user-repository'
import { CredentialsUser } from '../../utils/types'
import { compare } from 'bcryptjs'
import { UserCredentialsError } from '../errors/user-credentials-error'

export class AuthenticateUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CredentialsUser) {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) throw new UserCredentialsError()

    const auth = await this.userRepository.findAuthByUser(user.id)

    const passwordIsMatch = await compare(data.password, auth.password)

    if (!passwordIsMatch) throw new UserCredentialsError()

    return { auth }
  }
}
