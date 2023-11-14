export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User alredy exists.')
  }
}