export class UserNotDesactivatedError extends Error {
  constructor(){
    super('This user is not desactivated in the system.')
  }
}