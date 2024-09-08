import { beforeEach, describe, expect, it } from 'vitest'
import { DestroyTaskUseCase } from '.'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { UserRepository } from '../../repositories/user-repository'
import { TaskNotFoundError } from '../errors/task-not-found-error'
import { UserNotFoundError } from '../errors/user-not-found-error'

let userRepository: UserRepository
let taskRepository: InMemoryTaskRepository
let sut: DestroyTaskUseCase
let user: InMemoryUserRepository['userItems'][0]
let task: InMemoryTaskRepository['tasks'][0]

describe('Destroy task', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    taskRepository = new InMemoryTaskRepository()
    sut = new DestroyTaskUseCase(userRepository, taskRepository)

    await userRepository.create({
      email: 'user@example.com',
      password: 'demo',
    })

    const u = await userRepository.findByEmail('user@example.com')
    user = u!

    await taskRepository.createTask(u?.id as string, {
      title: 'lorem title 2',
      description: 'lorem description 2',
    })

    const t = await taskRepository.createTask(u?.id as string, {
      title: 'lorem title 1',
      description: 'lorem description 1',
    })
    task = t
  })

  it('Should be possible to delete a task', async () => {
    await sut.execute(user.id, task.id)

    expect(taskRepository.tasks.length).toEqual(1)
  })

  it('Should not be possible to delete a task without passing Task ID', async () => {
    expect(() => sut.execute(user.id, '')).rejects.toBeInstanceOf(
      TaskNotFoundError
    )
  })

  it('Should not be possible to delete task without passing the user id', async () => {
    expect(() => sut.execute('', task.id)).rejects.toBeInstanceOf(
      UserNotFoundError
    )
  })
})
