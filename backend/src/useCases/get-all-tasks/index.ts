import { FiltersGetAllTasks } from '../../utils/types'
import { TaskRepository } from '../../repositories/task-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

export class GetAllTasksUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository
  ) {}

  async execute(userID: string, filters: FiltersGetAllTasks) {
    const user = await this.userRepository.findUserById(userID)

    if (!user) throw new UserNotFoundError()

    const tasks = await this.taskRepository.getAllTasks(userID, filters)

    return tasks
  }
}
