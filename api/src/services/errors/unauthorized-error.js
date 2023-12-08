export class UnauthorizedError extends Error {
  constructor(){
    super('You not authorized')
  }
}