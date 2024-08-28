import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from '.'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('Should be possible to create a new user', async () => {
    await sut.execute({ email: 'teste@gmail.com', password: 'dev123' })

    expect(userRepository.userItems.length).toEqual(1)
  })
  it('Should not be possible to create two users with the same email address', async () => {
    await userRepository.create({
      email: 'teste@gmail.com',
      password: 'dev123',
    })

    await expect(() =>
      sut.execute({ email: 'teste@gmail.com', password: 'dev123' })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
