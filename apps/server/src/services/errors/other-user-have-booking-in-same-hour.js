export class OtherUserHaveBookingInSameHour extends Error {
  constructor() {
    super('You cannot be update this booking because a other user has be reservated this space in same hour.')
  }
}