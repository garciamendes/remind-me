export class TaskWithoutFieldsError extends Error {
  constructor() {
    super('Update must have at least one field!')
  }
}
