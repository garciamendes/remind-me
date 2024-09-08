import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskUseCase } from '.'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { TaskFieldsError } from '../errors/task-fields-error'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

let userRepository: UserRepository
let taskRepository: InMemoryTaskRepository
let sut: CreateTaskUseCase
let user: InMemoryUserRepository['userItems'][0]

describe('Create task', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    taskRepository = new InMemoryTaskRepository()
    sut = new CreateTaskUseCase(userRepository, taskRepository)

    await userRepository.create({
      email: 'user@example.com',
      password: 'demo',
    })

    const u = await userRepository.findByEmail('user@example.com')
    user = u!
  })

  it('Should be possible to create a new task', async () => {
    const task = await sut.execute(user.id, {
      title: 'lorem title',
      description: 'lorem description',
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task.title).toBe('lorem title')
    expect(task.description).toBe('lorem description')
    expect(task.completedAt).toBeNull()
    expect(task.userId).toBe(user.id)
    expect(task.createdAt).toBeInstanceOf(Date)
    expect(task.modifiedAt).toBeInstanceOf(Date)
  })

  it('Should not be possible to create TASK without passing the user id', async () => {
    expect(() =>
      sut.execute('', {
        title: 'lorem title',
        description: 'lorem description',
      })
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('Should not be possible to create a new task without the title', async () => {
    expect(() =>
      sut.execute(user.id, {
        title: '',
        description: 'lorem description',
      })
    ).rejects.toBeInstanceOf(TaskFieldsError)
  })

  it('Should not be possible to create a new task without the description', async () => {
    expect(() =>
      sut.execute(user.id, {
        title: 'lorem title',
        description: '',
      })
    ).rejects.toBeInstanceOf(TaskFieldsError)
  })
})
