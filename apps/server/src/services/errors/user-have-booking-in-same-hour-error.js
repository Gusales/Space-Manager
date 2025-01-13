export class UserHaveBookingInSameHourError extends Error {
  constructor(){
    super('You cannot be update this booking because you have a reservate in other space in same hour.')
  }
}