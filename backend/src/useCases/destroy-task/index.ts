import { TaskRepository } from '../../repositories/task-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { TaskNotFoundError } from '../errors/task-not-found-error'

export class DestroyTaskUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository
  ) {}

  async execute(userID: string, taskID: string) {
    const user = await this.userRepository.findUserById(userID)
    const task = await this.taskRepository.findTask(userID, taskID)

    if (!user) throw new UserNotFoundError()

    if (!task) throw new TaskNotFoundError()

    await this.taskRepository.destroyTask(user.id, task.id)
  }
}
