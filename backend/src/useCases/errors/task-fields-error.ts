export class TaskFieldsError extends Error {
  constructor() {
    super('All fields are mandatory!')
  }
}
