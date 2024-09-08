import { CreateTask } from '../../utils/types'
import { TaskRepository } from '../../repositories/task-repository'
import { TaskFieldsError } from '../errors/task-fields-error'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

export class CreateTaskUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository
  ) {}

  async execute(userID: string, data: CreateTask) {
    const user = await this.userRepository.findUserById(userID)

    if (!user) throw new UserNotFoundError()

    if (!data.title || !data.description) throw new TaskFieldsError()

    const tasks = await this.taskRepository.createTask(userID, data)

    return tasks
  }
}
