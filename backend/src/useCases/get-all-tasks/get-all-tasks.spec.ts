import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllTasksUseCase } from '.'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'

let taskRepository: InMemoryTaskRepository
let sut: GetAllTasksUseCase

describe('Get all tasks Use Case', () => {
  beforeEach(async () => {
    taskRepository = new InMemoryTaskRepository()
    sut = new GetAllTasksUseCase(taskRepository)
  })

  it('Should be possible to bring all the tasks having pagination if the result is greater than 20 items being passed the first page', async () => {
    for (let i = 0; i <= 40; i++) {
      taskRepository.tasks.push({
        id: String(i + 1),
        title: `Task ${i + 1}`,
        description: 'Task description',
        completedAt: null,
        userId: '',
        createdAt: new Date(),
        modifiedAt: new Date(),
      })
    }

    const result = await sut.execute({ page: 1 })

    expect(result.results.length).toEqual(20)
    expect(result.currentPage).toEqual(1)
    expect(result.next).toEqual(2)
    expect(result.previous).toEqual(null)
  })

  it('Should be possible to look for a task for its title', async () => {
    taskRepository.tasks.unshift({
      id: String('test_' + 1),
      title: 'Task 5',
      description: 'Task description',
      completedAt: null,
      userId: '',
      createdAt: new Date(),
      modifiedAt: new Date(),
    })

    for (let i = 0; i <= 40; i++) {
      taskRepository.tasks.push({
        id: String(i + 1),
        title: `Task ${i + 1}`,
        description: 'Task description',
        completedAt: null,
        userId: '',
        createdAt: new Date(),
        modifiedAt: new Date(),
      })
    }

    const result = await sut.execute({ page: 1, search: 'Task 5' })

    expect(result.results.length).toEqual(2)
    expect(result.currentPage).toEqual(1)
    expect(result.next).toEqual(null)
    expect(result.previous).toEqual(null)
  })

  it('Should be possible to go through the pages', async () => {
    for (let i = 0; i <= 43; i++) {
      taskRepository.tasks.push({
        id: String(i + 1),
        title: `Task ${i + 1}`,
        description: 'Task description',
        completedAt: null,
        userId: '',
        createdAt: new Date(),
        modifiedAt: new Date(),
      })
    }

    const result = await sut.execute({ page: 2 })

    expect(result.results.length).toEqual(20)
    expect(result.currentPage).toEqual(2)
    expect(result.next).toEqual(3)
    expect(result.previous).toEqual(1)
  })
})
