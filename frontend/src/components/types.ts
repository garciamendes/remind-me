export interface ITask {
  id: string
  title: string
  description: string
  completedAt: Date | string
  userId: string
  createdAt: Date | string
  modifiedAt: Date | string
}