import { UpdateTask } from '../../utils/types'
import { TaskRepository } from '../../repositories/task-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { isEmpty } from '../../utils'
import { TaskWithoutFieldsError } from '../errors/task-without-fields-error'
import { TaskNotFoundError } from '../errors/task-not-found-error'

export class UpdateTaskUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository
  ) {}

  async execute(userID: string, taskID: string, data: UpdateTask) {
    const user = await this.userRepository.findUserById(userID)
    const task = await this.taskRepository.findTask(userID, taskID)

    if (!user) throw new UserNotFoundError()

    if (!task) throw new TaskNotFoundError()

    if (isEmpty(data)) throw new TaskWithoutFieldsError()

    const taskResult = await this.taskRepository.updateTask(
      user.id,
      task.id,
      data
    )

    return taskResult
  }
}
