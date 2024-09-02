import { FiltersGetAllTasks } from '../../utils/types'
import { TaskRepository } from '../../repositories/task-repository'

export class GetAllTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(filters: FiltersGetAllTasks) {
    const tasks = await this.taskRepository.getAllTasks(filters)

    return tasks
  }
}
