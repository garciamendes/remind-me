import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTaskUseCase } from '.'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { UserRepository } from '../../repositories/user-repository'
import { TaskWithoutFieldsError } from '../errors/task-without-fields-error'
import { TaskNotFoundError } from '../errors/task-not-found-error'
import { UserNotFoundError } from '../errors/user-not-found-error'

let userRepository: UserRepository
let taskRepository: InMemoryTaskRepository
let sut: UpdateTaskUseCase
let user: InMemoryUserRepository['userItems'][0]
let task: InMemoryTaskRepository['tasks'][0]

describe('Update task', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    taskRepository = new InMemoryTaskRepository()
    sut = new UpdateTaskUseCase(userRepository, taskRepository)

    await userRepository.create({
      email: 'user@example.com',
      password: 'demo',
    })

    const u = await userRepository.findByEmail('user@example.com')
    user = u!

    const t = await taskRepository.createTask(u?.id as string, {
      title: 'lorem title',
      description: 'lorem description',
    })
    task = t
  })

  it('Should be possible to update a task', async () => {
    const taskTitleUpdated = 'lorem title updated'
    const taskDescriptionUpdated = 'lorem description updated'
    const taskCompletedAtUpdated = new Date()

    const taskUpdated = await sut.execute(user.id, task.id, {
      title: taskTitleUpdated,
      description: taskDescriptionUpdated,
      completedAt: taskCompletedAtUpdated,
    })

    expect(taskUpdated.title).toBe(taskTitleUpdated)
    expect(taskUpdated.description).toBe(taskDescriptionUpdated)
    expect(taskUpdated.completedAt).toBe(taskCompletedAtUpdated)
  })

  it('Should not be possible to update TASK without passing at least one', async () => {
    expect(() => sut.execute(user.id, task.id, {})).rejects.toBeInstanceOf(
      TaskWithoutFieldsError
    )
  })

  it('Should not be possible to update a task without passing the ID of the same', async () => {
    const taskTitleUpdated = 'lorem title updated'
    const taskDescriptionUpdated = 'lorem description updated'
    const taskCompletedAtUpdated = new Date()

    expect(() =>
      sut.execute(user.id, '', {
        title: taskTitleUpdated,
        description: taskDescriptionUpdated,
        completedAt: taskCompletedAtUpdated,
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })

  it('Should not be possible to update a task without passing the user id', async () => {
    const taskTitleUpdated = 'lorem title updated'
    const taskDescriptionUpdated = 'lorem description updated'
    const taskCompletedAtUpdated = new Date()

    expect(() =>
      sut.execute('', task.id, {
        title: taskTitleUpdated,
        description: taskDescriptionUpdated,
        completedAt: taskCompletedAtUpdated,
      })
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
