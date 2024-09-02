import { FiltersGetAllTasks, IGetAllTasksResponse } from '../utils/types'

export interface TaskRepository {
  getAllTasks: (filters: FiltersGetAllTasks) => Promise<IGetAllTasksResponse>
}
