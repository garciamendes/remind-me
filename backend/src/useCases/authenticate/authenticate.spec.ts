import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from '.'
import { UserCredentialsError } from '../errors/user-credentials-error'
import { env } from '../../env'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('Should be possible to authenticate in the system', async () => {
    await userRepository.create({
      email: 'emailTest@email.com',
      password: await hash('dev123', env.SALT_HASH),
    })

    const { auth } = await sut.execute({
      email: 'emailTest@email.com',
      password: 'dev123',
    })

    expect(auth.id).toEqual(expect.any(String))
  })

  it('Should not be possible to authenticate in the system with incorrect credentials(email)', async () => {
    expect(() =>
      sut.execute({
        email: 'emailTest@gmail.com',
        password: 'dev123',
      })
    ).rejects.toBeInstanceOf(UserCredentialsError)
  })

  it('Should not be possible to authenticate in the system with incorrect credentials(password)', async () => {
    await userRepository.create({
      email: 'teste@gmail.com',
      password: await hash('dev12345', env.SALT_HASH),
    })

    await expect(() =>
      sut.execute({
        email: 'garcia1@gmail.com',
        password: 'dev',
      })
    ).rejects.toBeInstanceOf(UserCredentialsError)
  })
})
